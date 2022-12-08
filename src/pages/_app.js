import 'react-toastify/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

import '../common/styles/main.css'

import BaseLayout from '../common/layouts/BaseLayout/BaseLayout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default MyApp
