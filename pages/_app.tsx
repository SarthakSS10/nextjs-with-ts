import '../styles/globals.css'
import type { AppProps } from 'next/app'
// const { wrapper } = require("../lib/store");
import {wrapper} from '../lib/store'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
