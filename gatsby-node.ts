import { GatsbyNode } from "gatsby"
import path from "path"
import { slashify } from "./src/util/slashify"
import { pages } from "./site-metadata"

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

// export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions: { createPage, deletePage } }) => {
//   // remove route trailing salashes
//   const pagesMetadata = Object.values(pages)
//     .map<[string, string]>(({ pathName, image }) => [pathName && slashify(pathName) || '', image || ''])
//     .filter(([pathName, image]) => pathName && image)

//   pagesMetadata.forEach(([pathName, image]) => {
//     if (page.path === pathName) {
//       deletePage(page)
//       createPage({
//         ...page,
//         context: {
//           image: path.join(process.cwd(), image),
//         },
//       })
//     }
//   })
// }

// export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ getConfig, actions }) => {
//   const isStaging = process.env.CI_MODE === 'staging'
//   if (isStaging) {
//     const devtool = process.env.DEV_TOOL
//     if (devtool === 'false') {
//       actions.setWebpackConfig({
//         devtool: false
//       })
//     }

//     const config = getConfig()
//     config.optimization.minimize = true

//     // This will completely replace the webpack config with the modified object.
//     actions.replaceWebpackConfig(config)
//   }
// }