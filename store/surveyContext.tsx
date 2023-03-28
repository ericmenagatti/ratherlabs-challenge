import { createContext, Dispatch, FC, SetStateAction, PropsWithChildren, useState } from "react";
import { ISurvey, SURVEY_SAMPLE, ESurveyStatus } from "@/utils/survey";

export interface ISurveyAnswer {
  id: number;
  question: string;
  answer: string;
}

interface ISurveyContext {
  survey: ISurvey;
  updateSurvey: Dispatch<SetStateAction<ISurvey>>;
  surveyStatus: ESurveyStatus;
  updateSurveyStatus: Dispatch<SetStateAction<ESurveyStatus>>;
  answers: ISurveyAnswer[];
  updateAnswers: Dispatch<SetStateAction<ISurveyAnswer[]>>;
}

export const SurveyContext = createContext<ISurveyContext>({
  survey: SURVEY_SAMPLE,
  updateSurvey: () => { },
  surveyStatus: ESurveyStatus.AVAILABLE,
  updateSurveyStatus: () => { },
  answers: [],
  updateAnswers: () => { },
});

export const SurveyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [survey, updateSurvey] = useState<ISurvey>(SURVEY_SAMPLE);
  const [surveyStatus, updateSurveyStatus] = useState<ESurveyStatus>(ESurveyStatus.AVAILABLE);
  const [answers, updateAnswers] = useState<ISurveyAnswer[]>([]);

  return (
    <SurveyContext.Provider
      value={{
        survey,
        updateSurvey,
        surveyStatus,
        updateSurveyStatus,
        answers,
        updateAnswers
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
};