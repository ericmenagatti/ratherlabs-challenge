import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Typography, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { ISurveyQuestion } from "@/utils/survey";
import { ISurveyAnswer } from "@/store/surveyContext";
import Image from 'next/image';

const { Title } = Typography;

interface ISurveyQuestionProps {
  question: ISurveyQuestion;
  updateCurrentAnswer: Dispatch<SetStateAction<ISurveyAnswer | undefined>>;
  nextQuestion: () => void;
}

const SurveyQuestion: FC<ISurveyQuestionProps> = ({ question, updateCurrentAnswer, nextQuestion }) => {
  const [value, setValue] = useState(1);
  const [timer, setTimer] = useState<number>(question.lifetimeSeconds);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    updateCurrentAnswer({
      id: e.target.value,
      question: question.text,
      answer: question.options[e.target.value - 1].text,
    })
  };

  useEffect(() => {
    updateCurrentAnswer({
      id: 1,
      question: question.text,
      answer: question.options[0].text,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    setTimer(question.lifetimeSeconds);
    setValue(1);
  }, [question]);

  useEffect(() => {
    if (!timer) {
      nextQuestion();
      setTimer(question.lifetimeSeconds);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [question, timer, nextQuestion]);

  return (
    <>
      <Space style={{ display: 'flex', width: '100%' }}>
        <Title level={3} style={{ marginTop: '0' }}>{question.text}</Title>
        <Title level={3} style={{ marginTop: '0', textAlign: 'right' }}>{timer}</Title>
      </Space>
      <Image
        src={question.image}
        alt={question.text}
        width='0'
        height='0'
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
      />
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical" style={{ marginTop: '1rem' }}>
          {question.options.map((option, index) => (
            <Radio key={option.text + index} value={index + 1}>{option.text}</Radio>
          ))}
        </Space>
      </Radio.Group>
    </>
  )
}

export default SurveyQuestion;