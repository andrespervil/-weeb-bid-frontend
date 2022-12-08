import '../common/styles/main.css'

import SnackbarProvider from 'react-simple-snackbar'

import BaseLayout from '../common/layouts/BaseLayout/BaseLayout'

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SnackbarProvider>
  )
}

export default MyApp
