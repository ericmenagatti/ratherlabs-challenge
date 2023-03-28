import { FC, useContext, useEffect } from "react";
import { SURVEY_SAMPLE, ISurvey } from '@/utils/survey';
import MetamaskConnect from "@/components/Wallet/MetamaskConnect";
import { SurveyContext } from "@/store/surveyContext";

interface IHomePageProps {
  survey: ISurvey;
}

const HomePage: FC<IHomePageProps> = ({ survey }) => {
  const { updateSurvey } = useContext(SurveyContext);

  useEffect(() => {
    updateSurvey(survey);
  }, [survey, updateSurvey]);

  return <MetamaskConnect />;
};

export const getStaticProps = async () => {
  return {
    props: {
      survey: SURVEY_SAMPLE,
    },
    revalidate: 3600,
  };
}

export default HomePage;