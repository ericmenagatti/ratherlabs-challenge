import { FC, PropsWithChildren, CSSProperties } from "react";
import { Layout, Space } from "antd";
import Link from 'next/link';

const headerStyle: CSSProperties = {
  width: '100%',
  height: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#1c49dd',
  padding: '0 10%'
}

const logoStyle: CSSProperties = {
  fontSize: '2rem',
  color: 'white',
  fontWeight: 'bold',
}

const mainStyle: CSSProperties = {
  margin: '3rem auto',
  width: '90%',
  maxWidth: '30rem',
}

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { Header } = Layout;

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Layout style={{ background: 'white' }}>
        <Header style={headerStyle}>
          <Link href="/" style={logoStyle}>$QUIZ Surveys</Link>
        </Header>
        <main style={mainStyle}>
          {children}
        </main>
      </Layout>
    </Space>
  )
}

export default MainLayout;