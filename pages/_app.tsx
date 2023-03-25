import '@/styles/globals.css'
import Head from 'next/head'
import MainLayout from '@/components/layout/MainLayout';
import EagerConnectGuard from '@/components/guard/EagerConnectGuard';
import type { AppProps } from 'next/app'
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core'

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Goerli Survey</title>
        <meta name="description" content="Gain QUIZ Token rewards by taking our surveys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Web3ReactProvider getLibrary={getLibrary}>
          <EagerConnectGuard>
            <Component {...pageProps} />
          </EagerConnectGuard>
        </Web3ReactProvider>
      </MainLayout>
    </>
  );
};

export default App;