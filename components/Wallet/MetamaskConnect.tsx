import { FC, CSSProperties, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import { Typography, Button, Col, Row, Tooltip } from "antd";
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
import Image from 'next/image'

const { Title } = Typography;

const metamaskButtonStyle: CSSProperties = {
  height: '60px',
  fontSize: '24px',
}

const MetamaskConnect = () => {
  const { activate, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [loadingNetwork, setLoadingNetwork] = useState(false);

  const expectedChain = supportedChains.find((chain) => chain.value === ESupportedNetworks.GOERLI) as ISupportedChains;
  const walletConnected = useWalletConnected(expectedChain?.chainId);

  const handleConnect = async () => {
    setLoading(true);
    await connectMetamask(activate);
    setLoading(false);
  };

  const handleChangeNetworks = async () => {
    setLoading(true);
    await changeNetwork(expectedChain)
    setLoading(false)
  };

  const handleAddNetwork = async () => {
    setLoadingNetwork(true);
    await addNetwork(expectedChain)
    setLoadingNetwork(false)
  };

  return (
    <Col style={{ margin: '2rem' }}>
      <Row style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image src="/favicon.ico" alt="Ethereum Logo" width={64} height={64} />
        <Title level={2} style={{ margin: '0 1rem' }}>Goerli Network</Title>
        <Tooltip title="Add Network">
          <Button
            shape="circle"
            icon={<PlusCircleOutlined />}
            loading={loadingNetwork}
            onClick={handleAddNetwork}
          />
        </Tooltip>
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
          <Title level={2} style={{ marginTop: '1rem' }}>$QUIZ : {0}</Title>
          <Button
            type="primary"
            size="large"
            style={{ whiteSpace: 'normal' }}
            block
          >
            Do you wish to begin with the survey?
          </Button>
        </Row>
      )}
    </Col>
  )
}

export default MetamaskConnect;