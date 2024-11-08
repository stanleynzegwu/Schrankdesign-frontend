import Header from "./AppLayout/Header"
import Footer from "./AppLayout/Footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
