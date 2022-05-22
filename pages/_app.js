import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layouts from '../layouts/layouts'

const layouts = {
  L1: Layouts
}

const NoLayout = ({ children }) => {
  return <>{children}</>
}


function MyApp({ Component, pageProps }) {
  const Layouts = layouts[Component.layouts] || NoLayout
  return (
    <Layouts>
      <Component {...pageProps} />
    </Layouts>
  )
}

export default MyApp
