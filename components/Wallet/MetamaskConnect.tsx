import { FC, CSSProperties, useState, useEffect, useContext } from "react";
import { useWeb3React } from '@web3-react/core';
import { Typography, Button, Col, Row, Tooltip, Divider } from "antd";
import { WalletOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  connectMetamask,
  changeNetwork,
  addNetwork,
  useWalletConnected,
  supportedChains,
  ESupportedNetworks,
  ISupportedChains
} from "@/utils/metamask";
import { ESurveyStatus, onBalanceOf } from "@/utils/survey";
import SurveySummary from "@/components/survey/SurveySummary";
import Image from 'next/image'
import { SurveyContext } from "@/store/surveyContext";

const { Title } = Typography;

const metamaskButtonStyle: CSSProperties = {
  height: '60px',
  fontSize: '24px',
}

const MetamaskConnect: FC = () => {
  const { activate, account } = useWeb3React();
  const { surveyStatus, updateAnswers, updateSurveyStatus } = useContext(SurveyContext);
  const [quizBalance, setQuizBalance] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingNetwork, setLoadingNetwork] = useState(false);

  const expectedChain = supportedChains.find((chain) => chain.value === ESupportedNetworks.GOERLI) as ISupportedChains;
  const walletConnected = useWalletConnected(expectedChain?.chainId);

  const resetStore = () => {
    updateAnswers([]);
    updateSurveyStatus(ESurveyStatus.AVAILABLE);
  }

  const handleConnect = async () => {
    setLoading(true);
    await connectMetamask(activate);
    resetStore();
    setLoading(false);
  };

  const handleChangeNetworks = async () => {
    setLoading(true);
    await changeNetwork(expectedChain);
    resetStore();
    setLoading(false)
  };

  const handleAddNetwork = async () => {
    setLoadingNetwork(true);
    await addNetwork(expectedChain);
    setLoadingNetwork(false)
  };

  useEffect(() => {
    (async () => {
      const balance = await onBalanceOf(account as string);
      setQuizBalance(balance);
    })();
  }, [account, surveyStatus]);

  return (
    <Col style={{ margin: '2rem' }}>
      <Row style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image src="/favicon.ico" alt="Ethereum Logo" width={64} height={64} />
        <Title level={2} style={{ margin: '0 1rem' }}>Goerli Network</Title>
        {walletConnected !== -1 ? (
          <Tooltip title="Add Network">
            <Button
              shape="circle"
              icon={<PlusCircleOutlined />}
              loading={loadingNetwork}
              onClick={handleAddNetwork}
            />
          </Tooltip>
        ) : null}
      </Row>
      {walletConnected !== 1 ? (
        <Row>
          <Button
            type="primary"
            icon={<WalletOutlined />}
            size="large"
            style={metamaskButtonStyle}
            block
            loading={loading}
            onClick={walletConnected === -1 ? handleConnect : handleChangeNetworks}
          >
            {walletConnected === -1 ? 'Metamask Connect' : 'Change Network'}
          </Button>
        </Row>
      ) : (
        <Row>
          <Title level={2} style={{ marginTop: '1rem' }}>Welcome</Title>
          <Title level={5} style={{ marginTop: '0rem' }}>{account}</Title>
          {quizBalance ? (
            <Title level={2} style={{ marginTop: '0', marginBottom: '0' }}>$QUIZ : {quizBalance}</Title>
          ) : null}
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <SurveySummary />
        </Row>
      )}
    </Col>
  )
}

export default MetamaskConnect;