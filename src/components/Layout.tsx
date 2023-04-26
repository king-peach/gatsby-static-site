import Footer from './Footer'
import React, { ReactNode } from 'react'
import Header from './Header'
import { HeadFC } from 'gatsby'

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

export const CommonHead = () => <link rel="icon" href="/favicon.ico"></link>