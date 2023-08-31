import Header from '../Header'
import Navigation from '../Navigation'

const Layout = ({ children, showHeader = true }) => {
  return (
    <>
        {showHeader && <Header />}
          <div className='py-28 container mx-auto px-4'>
            {children}
          </div>
        <Navigation />
    </>
  )
}

export default Layout