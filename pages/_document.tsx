import React from 'react'
import {ServerStyleSheets} from '@material-ui/styles'
import Document, {Html, Head, Main, NextScript} from "next/document"

export default class MyDocument extends Document {

   render() {
      return (
        <Html>
           <Head/>
           <body>
              <Main/>
              <NextScript/>
           </body>
        </Html>
      )
   }
}


MyDocument.getInitialProps = async (ctx) => {
   const sheets = new ServerStyleSheets()
   const originalRenderPage = ctx.renderPage

   ctx.renderPage = () =>
     originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
     })

   const initialProps = await Document.getInitialProps(ctx)

   return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
   }

}
