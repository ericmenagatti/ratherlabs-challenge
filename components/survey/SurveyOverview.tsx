import { FC, useContext } from "react";
import { SurveyContext } from "@/store/surveyContext";
import { Typography, Space } from "antd";

const { Title } = Typography;

const SurveyOverview: FC = () => {
  const { answers } = useContext(SurveyContext);

  return (
    <>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Title level={2} style={{ marginTop: '0' }}>Overview</Title>
        {answers.map((answer, index) => (
          <div key={answer.question + index} style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
            <Title level={4} style={{ marginTop: '0' }}>{answer.question}:</Title>
            <Title level={4} style={{ marginTop: '0' }}>{answer.answer}</Title>
          </div>
        ))}
      </Space>
    </>
  )
}

export default SurveyOverview;