import { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { data, errors } = await graphql<Queries.PageBuilderQuery>(`
  query PageBuilder {
    allStrapiArticle {
      nodes {
        title
        slug
        keywords
        id
      }
      pageInfo {
        totalCount
        pageCount
        currentPage
        itemCount
      }
    }
  }
`)

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = data?.allStrapiArticle.nodes!

  const articleTemp = path.resolve('./src/template/article-post.tsx')

  posts.forEach((post, index: number) => {
    const previous = index === (posts.length - 1) ? null : posts[index + 1]
    const next = (index === 0) ? null : posts[0]

    actions.createPage({
      path: `/article/${post.id}`,
      component: articleTemp,
      context: {
        slug: post.slug,
        previous,
        next
      }
    })

  })
}