import '../common/styles/main.css'

import BaseLayout from '../common/layouts/BaseLayout/BaseLayout'

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default MyApp
