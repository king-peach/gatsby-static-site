import { graphql, PageProps } from 'gatsby'
import React from 'react'
import Layout, { CommonHead } from '../components/Layout'
import ReactMarkdown from 'react-markdown'
import Banner from '../components/Banner/common'
import rehypeRaw from 'rehype-raw'
import RemarkGfm from 'remark-gfm'
import { HeadFC } from 'gatsby'

export const query = graphql`
  query strapiPersonal {
    strapiPersonal(slug: {eq: "personal"}) {
      title
      content {
        data {
          content
        }
      }
      slug
      summary
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
        <Banner title={data.strapiPersonal.title!} summary={data.strapiPersonal.summary!} />
        <div className="w-3/5 m-auto">
          <ReactMarkdown remarkPlugins={[RemarkGfm]} rehypePlugins={[rehypeRaw]}>{data.strapiPersonal.content?.data?.content!}</ReactMarkdown>
        </div>
      </main>
    </Layout>
  )
}

export default About

export const Head: HeadFC = () => (
  <>
    <title>About Me</title>
    <CommonHead />
  </>
)