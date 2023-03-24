import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Goerli Survey</title>
        <meta name="description" content="Gain QUIZ Token rewards by taking our surveys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;