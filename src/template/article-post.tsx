import { graphql, Link, PageProps } from "gatsby"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import Layout from "../components/Layout"
import LeftIcon from '../images/icon/arrow-left.svg'
import RightIcon from '../images/icon/arrow-right.svg'

export const query = graphql`
  query StrapiArticle($slug: String) {
    strapiArticle(slug: { eq: $slug }) {
      id
      slug
      title
      content {
        data {
          content
        }
      }
      keywords
      tags {
        name
      }
    }
  }
`

interface PageContext<T> {
  id: string;
  previous: T | null;
  next: T | null;
}

const AriclePage: React.FC<PageProps<Queries.StrapiArticleQuery, PageContext<Queries.STRAPI_ARTICLE>>> = ({
  data,
  pageContext
}) => {
  const { title, keywords, slug, tags, content } = data.strapiArticle!
  const { previous, next } = pageContext
  const [contentMinH, setContentMinH] = useState('calc(100vh - 72px)')

  const hanldeContentMinH = () => {
    const screenH = window.innerHeight || document.documentElement.clientHeight
    const bannerH = document.querySelector('.banner-wrap')?.clientHeight
    const paginationWrapH = document.querySelector('.pagination-wrap')?.clientHeight
    const footerH = document.querySelector('.v-footer')?.clientHeight
    const minH = `${screenH - bannerH! - paginationWrapH! - footerH! - 32}px`

    setContentMinH(minH)
  }

  useEffect(() => {
    hanldeContentMinH()
  })

  return (
    <Layout>
      <main>
        <section className="banner-wrap h-80 w-full text-white bg-gray-700 relative">
          <div className="banner-inner-box text-left overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg">
            <div className="u-tags-box text-xs">
              { tags && tags.length && tags.map(tag => (
                <Link to={`/tag/${tag?.name}`} className=" text-green-50 font-extralight inline-block px-2 py-1 mr-3 border border-green-50 rounded-2xl" key={`article banner tag ${tag?.name}`}>{tag?.name}</Link>
              ))}
            </div>
            <h2 className="u-title text-4xl mt-3.5 font-bold">{title}</h2>
            <div className="u-summary italic text-green-50 mt-3.5">{slug}</div>
          </div>
        </section>
        <article className="main-container m-auto w-2/3 my-3" dangerouslySetInnerHTML={{__html: content?.data?.content! }} style={{ minHeight: contentMinH }}>
        </article>
        <div className="pagination-wrap m-auto h-14 w-2/3 mt-2 mb-4">
          { 
            previous && <div className=" w-max-1/2 previous-box h-14 overflow-hidden">
              <div className="u-top pl-6 text-gray-500" >?????????</div>
              <Link to={`/article/${previous?.id}`} className="u-bottom mt-2 float-left block font-bold text-purple-700 whitespace-nowrap">
                <LeftIcon className=" w-5 mr-1 align-middle fill-purple-700 inline-block" />
                <span className=" align-middle">{previous?.title}</span>
              </Link>
            </div>
          }
          {
            next && <div className="float-right w-max-1/2 next-box h-14 overflow-hidden">
              <div className="u-top pr-6 text-gray-500">
                <span className="float-right">?????????</span>
              </div>
              <Link to={`/article/${next?.id}`} className="u-bottom mt-2 float-right block font-bold text-purple-700 whitespace-nowrap">
                <span className="align-middle">{next?.title}</span>
                <RightIcon className="w-5 align-middle ml-1 fill-purple-700 inline-block" />
              </Link>
            </div>
          }
        </div>
      </main>
    </Layout>
  )
}

export default AriclePage