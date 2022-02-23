import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'

import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { ToastyProvider } from '../src/contexts/Toasty'
import '../styles/globals.css'
import CheckAuth from '../src/components/CheckAuth'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
export default function MyApp({   
    Component, 
    emotionCache = clientSideEmotionCache, 
    pageProps:{ session, ...pageProps},
})

{

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Anunx</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>          
          <ToastyProvider>
            <CssBaseline />
            {
              Component.requireAuth
              ? <CheckAuth Component={Component} pageProps={pageProps}/>
              : <Component {...pageProps} />
            }            
          </ToastyProvider>          
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
