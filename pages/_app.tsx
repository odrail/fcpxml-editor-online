import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import ReactGA from 'react-ga'
import { useEffect } from 'react'

// ReactGA.initialize('G-LQGNV7QMEV')
ReactGA.initialize('UA-187959591-1')

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('pageview')
    ReactGA.pageview(window.location.pathname)
  })

  return (
    <Provider store={store}>
      <Head>
        <title>FCPXML EDITOR ONLINE</title>
        <meta name="description" content="Fcpxml editor online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
