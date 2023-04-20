import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import Banner from "../components/Banner/common"

export const query = graphql`
  query allStrapiArticle {
    allStrapiArticle (sort: {createdAt: ASC}) {
      nodes {
        title
        slug
        keywords
        id
        updatedAt(formatString: "YYYY-MM-DD HH:mm:ss")
        author
        createdAt
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
        <Banner title={title!} summary={description!} />
        <div className="article-list-wrap">
          <ul className="article-list my-3 m-auto w-4/5 lg:w-1/2">
            {
              allStrapiArticle.nodes.map((article, index) => (
                <li className="v-article mb-6" key={`home article key ${index}`}>
                  <Link to={`/article/${article.id}`}>
                    <div className="u-title font-bold text-purple-700 text-2xl">{article.title}</div>
                    <div className="u-public-date text-gray-800 text-sm font-medium mt-2">{`${article.author} 发布于 ${article.updatedAt!}`}</div>
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
