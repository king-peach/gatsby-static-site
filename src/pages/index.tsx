import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Banner from "../components/Banner"

export const query = graphql`
  query allStrapiArticle {
    allStrapiArticle {
      nodes {
        title
        slug
        keywords
        descrition
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

  return (
    <Layout>
      <main className="v-main-container min-h-screen">
        <section className="bg-purple-900 text-center relative w-full py-40 overflow-hidden">
          <aside>
            <h2 className="text-white font-bold text-6xl">{title}</h2>
            <p className="text-gray-300 text-lg mt-4">{description}</p>
          </aside>
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
