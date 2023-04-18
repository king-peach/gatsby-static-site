import React from 'react'
import 'github-markdown-css/github-markdown.css'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm' // fixed react-markdown can't render table、footer、strikethrough……
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import '../styles/markdown.css'
import { useEffect } from 'react'
import { useState } from 'react'

const Markdown: React.FC<{ md: string}> = (prop: { md: string }) => {
  const [tocTop, setTocTop] = useState('20rem')

  useEffect(() => {
    const handleTocListScroll = () => {
      const scrollY = window.scrollY
      const bannerH = +(document.querySelector('.banner-wrap')?.clientHeight!)
      const navH = +(document.querySelector('header')?.clientHeight!)
      const top = bannerH - scrollY
      setTocTop(`${top > navH ? top : navH }px`)
    }

    window.addEventListener('scroll', handleTocListScroll, false)

    return (() => {
      window.removeEventListener('scroll', handleTocListScroll)
    })
  }, [])

  return (
    <div className="markdown-wrap flex">
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[RemarkGfm]}>{prop.md}</ReactMarkdown>
      </div>
      <div className="markdown-navbar bg-white fixed right-2 top-80" style={{ top: tocTop }}>
        <MarkNav
          className="toc-list"
          source={prop.md}
          ordered={true}
        />
      </div>
    </div>
  )
}

export default Markdown