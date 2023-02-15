import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import { Link } from "gatsby"

export const query = graphql`
  query allStrapiArticle {
    allStrapiArticle {
      nodes {
        title
        slug
        keywords
        id
        updatedAt
        author
      }
      pageInfo {
        totalCount
        pageCount
        currentPage
        itemCount
      }
    }
    strapiTag(name: {eq: "Typescript"}) {
      icon {
        url
      }
    }
    strapiHome {
      description
      banner {
        title
        componentName
        slides {
          summary
          title
          href
          slug
          styleCss {
            btnWrapStyle {
              marginTop
            }
            summaryStyle {
              color
              fontSize
            }
            titleStyle {
              color
              fontSize
            }
          }
          poster {
            url
          }
          animation {
            url
          }
        }
      }
      title
    }
  }
`
type QueryProps = {
  allStrapiArticle: Queries.STRAPI_ARTICLEConnection
  strapiTag: Queries.STRAPI_TAG
  strapiHome: Queries.STRAPI_HOME
}


const IndexPage: React.FC<PageProps<QueryProps>> = ({ data }) => {
  const { title, description } = data.strapiHome
  const { allStrapiArticle } = data

  return (
    <Layout>
      <main className="v-main-container min-h-screen">
        <section className="bg-purple-900 text-center relative w-full py-40 overflow-hidden">
          <aside>
            <h2 className="text-white font-bold text-6xl">{title}</h2>
            <p className="text-gray-300 text-lg mt-4">{description}</p>
          </aside>
        </section>
        <div className="article-list-wrap">
          <ul className="article-list my-3 w-1/2 m-auto">
            {
              allStrapiArticle.nodes.map((article, index) => (
                <li className="v-article mb-6" key={`home article key ${index}`}>
                  <Link to={`/article/${article.id}`}>
                    <div className="u-title font-bold text-purple-700 text-2xl">{article.title}</div>
                    <div className="u-public-date text-gray-800 text-sm font-medium mt-2">{`${article.author} 发布于 ${new Date(article.updatedAt!).toLocaleString()}`}</div>
                    <div className="u-slug text-gray-800 text-base font-medium mt-2">{article.slug}</div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
