import { graphql, HeadFC, Link, PageProps } from 'gatsby'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout'

export const query = graphql`
  query CategoryData {
    allStrapiTag {
      nodes {
        name
        articles {
          title
          author
          slug
          id
          keywords
          updatedAt(formatString: "YYYY-MM-DD HH:mm:ss")
          createdAt
        }
      }
    }
  }
`

type QueryProps = {
  allStrapiTag: Queries.STRAPI_TAGConnection
}

const Category: React.FC<PageProps<QueryProps>> = ({ data }) => {
  const [tagsStyle, setTagsStyle] = useState({ display: 'hidden' })
  const [canvasWrapStyle, setCanvasWrapStyle] = useState({})
  const [type, setType] = useState('')
  const [postList, setPostList] = useState<Queries.STRAPI_ARTICLE[]>([])
  const { allStrapiTag } = data
  const nodes = allStrapiTag.nodes

  useEffect(() => {
    try {
      const TagCanvas = (window as any).TagCanvas
      TagCanvas.Start('tag-canvas', 'tags', {
        initial: 1,
        textFont: null,
        textColour: null,
        weight: true,
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05
      })
      setTagsStyle({ display: 'hidden' })
    } catch (e) {
      setCanvasWrapStyle({ display: 'hidden' })
    }

    const index = Math.ceil(nodes.length / 2) - 1
    const type = nodes[index].name
    setType(type!)
  }, [canvasWrapStyle])

  const clickPreventDefault = (event: any) => {
    const target = event.target as HTMLElement
    const type = target.textContent!
    setType(type)
    event.preventDefault()
  }

  useEffect(() => {
    // query article list
    const list = nodes.filter(node => node.name === type)
    if (list.length) {
      setPostList(list[0].articles)
    }
  }, [type])

  return (
    <Layout>
      <section className="bg-purple-900 w-full">
        <div className="tag-canvas h-72 pt-10" style={canvasWrapStyle}>
          <canvas className="h-full mx-auto lg:w-1/3" id="tag-canvas">
            <p>Anything in here will be replaced on browsers that support the canvas element</p>
          </canvas>
        </div>
        <div className="py-4 text-white text-center">
          当前归档：<button className="bg-yellow-300 text-blue-900 px-2 rounded">{type}</button>
        </div>
        <div id="tags" className="hidden" style={tagsStyle}>
          <ul>
            { nodes.map((node, index) => (
              <li key={`tag key ${index}`}>
                <a href="#" onClick={clickPreventDefault} className="text-gray-100">{ node.name }</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="v-post-list-wrap py-10">
        <ul className="post-list my-3 m-auto w-4/5 lg:w-1/2">
          { 
            postList.length ? postList.map((article, index) => (
              <li className="v-article mb-8" key={`home article key ${index}`}>
                <Link to={`/article/${article.id}`}>
                  <div className="u-title font-bold text-purple-700 text-2xl">{article.title}</div>
                  <div className="u-public-date text-gray-800 text-sm font-medium mt-2">{`${article.author} 发布于 ${article.updatedAt!}`}</div>
                  <div className="u-slug text-gray-800 text-base font-medium mt-2">{article.slug}</div>
                </Link>
              </li>
            )) : '' 
          }
          { !postList.length && <li className="text-center text-gray-600">暂无数据</li>}
        </ul>
      </section>
    </Layout>
  )
}

export default Category

export const Head: HeadFC = () => (
  <>
    <title>分类</title>
    <script src="/tagcanvas.min.js"></script>
  </>
)