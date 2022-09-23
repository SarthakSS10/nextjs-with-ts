// const { default: AbortController } = require("abort-controller");
import '../styles/globals.css'
import type { AppProps } from 'next/app'
// const { wrapper } = require("../lib/store");
import {wrapper} from '../lib/store'
import 'bootstrap/dist/css/bootstrap.min.css';



function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
