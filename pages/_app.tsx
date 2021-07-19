import React, {FC} from 'react'
import {AppProps} from 'next/app'
import {wrapper} from "../store"
import '../styles/globals.scss'
import {AuthProvider} from '../context/auth'
import {ThemeProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { theme } from '../theme'


const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {

   React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles)
      }
   }, [])

   return (
     <AuthProvider>
        <ThemeProvider theme={theme}>
           <CssBaseline/>
           <Component {...pageProps} />
        </ThemeProvider>
     </AuthProvider>
   )
}

export default wrapper.withRedux(WrappedApp)

