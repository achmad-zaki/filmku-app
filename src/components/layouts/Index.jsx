import Header from '../Header'
import Navigation from '../Navigation'

const Layout = ({ children, header = true }) => {
  return (
    <>
      {header ? <Header /> : null}
      <div className='py-28 container mx-auto px-4'>
        {children}
      </div>
      <Navigation />
    </>
  )
}

export default Layout