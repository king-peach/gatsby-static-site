import Footer from './Footer'
import React, { ReactNode } from 'react'
import Header from './Header'

interface LayourProps {
  children: React.ReactNode,
  themeColor?: string;
}

const Layout: React.FC<React.PropsWithChildren<LayourProps>> = ({children, themeColor}) => {
  return (
    <div className="page-container">
      <Header />
      {children}
      <Footer colorClassName={themeColor} />
    </div>
  )
}

export default Layout