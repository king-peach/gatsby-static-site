import { graphql, PageProps } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import ReactMarkdown from 'react-markdown'
import Banner from '../components/Banner/common'

export const query = graphql`
  query strapiPersonal {
    strapiPersonal(title: {eq: "wangtao"}) {
      title
      content {
        data {
          content
        }
      }
      slug
    }
  }
`

type QueryProps = {
  strapiPersonal: Queries.STRAPI_PERSONAL
}

const About: React.FC<PageProps<QueryProps>> = ({ data }) => {
  return (
    <Layout>
      <main className="v-main-container min-h-screen">
        <Banner title={data.strapiPersonal.title!} summary="profile" />
        <div className="w-3/5 m-auto">
          <ReactMarkdown>{data.strapiPersonal.content?.data?.content!}</ReactMarkdown>
        </div>
      </main>
    </Layout>
  )
}

export default About