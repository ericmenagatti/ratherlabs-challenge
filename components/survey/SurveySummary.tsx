import { FC, useContext, useEffect, CSSProperties, useState, useCallback } from "react";
import { useWeb3React } from '@web3-react/core';
import { Typography, Button, Steps, Divider } from "antd";
import { ESurveyStatus } from "@/utils/survey";
import { SurveyContext, ISurveyAnswer } from "@/store/surveyContext";
import { onLastSubmittal, onSubmit, onCooldown } from "@/utils/survey";
import Image from 'next/image';
import SurveyQuestion from '@/components/survey/SurveyQuestion';
import SurveyOverview from "@/components/survey/SurveyOverview";

const { Title } = Typography;

const stepperStyle: CSSProperties = {
  margin: '2rem 0',
}

const actionButtonStyle: CSSProperties = {
  height: '60px',
  fontSize: '24px',
  marginTop: '1rem',
  borderRadius: '0',
}

const SurveyHome: FC = () => {
  const { account } = useWeb3React();
  const { survey, answers, updateAnswers, surveyStatus, updateSurveyStatus } = useContext(SurveyContext);
  const [totalSteps, seTotalSteps] = useState(survey.questions.length);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<ISurveyAnswer>();
  const [loading, setLoading] = useState(false);
  const [refreshDate, setRefreshDate] = useState<Date | null>(null);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const handleTime = useCallback(async () => {
    const lastSubmittalDate = await onLastSubmittal(account as string);
    const currentCooldown = await onCooldown();

    const refreshDateMs = lastSubmittalDate?.setSeconds(lastSubmittalDate.getSeconds() + +currentCooldown);
    const refreshDate = new Date(refreshDateMs as number);

    const currentDate = new Date();

    const diff = Math.floor((+refreshDate - +currentDate) / 1000);

    if (currentDate < refreshDate) {
      updateSurveyStatus(ESurveyStatus.ON_COOLDOWN);
      setRefreshDate(refreshDate);
      setCooldown(diff);
    } else {
      updateSurveyStatus(ESurveyStatus.AVAILABLE);
      setRefreshDate(null);
      setCooldown(null);
    }
  }, [account, updateSurveyStatus]);

  const handleNextStep = () => {
    if (totalSteps - 1 === currentStep) {
      updateSurveyStatus(ESurveyStatus.FINISHED);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
    updateAnswers((prev) => [...prev, currentAnswer] as ISurveyAnswer[])
  }

  const handleSubmit = async () => {
    const answerIds = answers.map((answer) => answer.id);
    setLoading(true);
    await onSubmit(account as string, 1, answerIds);
    setLoading(false);
    updateSurveyStatus(ESurveyStatus.AVAILABLE);
    updateAnswers([]);
    setCurrentStep(0);
    seTotalSteps(survey.questions.length);
    handleTime();
  }

  const handleStartSurvey = () => {
    updateSurveyStatus(ESurveyStatus.STARTED);
  }

  useEffect(() => {
    handleTime();
  }, [handleTime]);

  useEffect(() => {
    if (!cooldown) {
      updateSurveyStatus(ESurveyStatus.AVAILABLE);
      return;
    }

    const intervalId = setInterval(() => {
      const min = Math.floor(cooldown % 3600 / 60);
      const sec = Math.floor(cooldown % 3600 % 60);

      const timeLeft = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
      setTimeLeft(timeLeft);
      setCooldown((prev) => prev as number - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refreshDate, cooldown, updateSurveyStatus]);

  return (
    <>
      <Title level={2} style={{ marginTop: '0' }}>{survey.title}</Title>
      <Image
        src={survey.image}
        alt={survey.title}
        width='0'
        height='0'
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
      />
      {surveyStatus === ESurveyStatus.AVAILABLE || surveyStatus === ESurveyStatus.ON_COOLDOWN ? (
        <Button
          type="primary"
          size="large"
          style={actionButtonStyle}
          block
          onClick={handleStartSurvey}
          disabled={surveyStatus === ESurveyStatus.ON_COOLDOWN}
        >
          {surveyStatus === ESurveyStatus.ON_COOLDOWN ? `ON COOLDOWN ${timeLeft}` : 'START SURVEY'}
        </Button>
      ) : null}
      {surveyStatus === ESurveyStatus.STARTED && currentStep < totalSteps ? (
        <>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <Steps
            progressDot
            initial={0}
            current={currentStep}
            items={survey.questions.map(() => ({
              title: '',
            }))}
            style={stepperStyle}
          />
          <SurveyQuestion
            question={survey.questions[currentStep]}
            updateCurrentAnswer={setCurrentAnswer}
            nextQuestion={handleNextStep}
          />
          <Button
            type="primary"
            size="large"
            block
            style={actionButtonStyle}
            onClick={handleNextStep}
          >
            {totalSteps - 1 === currentStep ? 'FINISH' : 'NEXT'}
          </Button>
        </>
      ) : null}
      {surveyStatus === ESurveyStatus.FINISHED ? (
        <>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <SurveyOverview />
          <Button
            type="primary"
            size="large"
            block
            style={actionButtonStyle}
            loading={loading}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </>
      ) : null}
    </>
  )
}

export default SurveyHome;