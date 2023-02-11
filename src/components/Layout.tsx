import Footer from './Footer'
import React, { ReactNode } from 'react'
import Header from './Header'

interface LayourProps {
  children: React.ReactNode
}

const Layout: React.FC<React.PropsWithChildren<LayourProps>> = ({children}) => {
  return (
    <div className="page-container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout