import React, { useState, useEffect } from 'react'
import 'github-markdown-css/github-markdown.css'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm' // fixed react-markdown can't render table、footer、strikethrough……
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import '../styles/markdown.scss'
import rehypeRaw from 'rehype-raw'

const Markdown: React.FC<{ md: string}> = (props: { md: string, bannerClassName?: string }) => {
  const [tocTop, setTocTop] = useState('20rem')

  useEffect(() => {
    const handleTocListScroll = () => {
      const scrollY = window.scrollY
      const bannerH = +(document.querySelector(`.${props?.bannerClassName || 'm-common-banner-wrap'}`)?.clientHeight!)
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
    <div className="markdown-wrap md:flex">
      <div className="markdown-body w-full">
        <ReactMarkdown children={props.md} remarkPlugins={[RemarkGfm]} rehypePlugins={[rehypeRaw]} />
      </div>
      <div className="markdown-navbar fixed right-4 top-80 hidden xl:block" style={{ top: tocTop }}>
        <MarkNav
          className="toc-list"
          source={props.md}
          ordered={true}
        />
      </div>
    </div>
  )
}

export default Markdown