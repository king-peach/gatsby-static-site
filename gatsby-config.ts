import type { GatsbyConfig } from "gatsby"
import * as dotenv from 'dotenv'

dotenv.config()

const strapiPrefix = process.env.STRAPI_API_URL || 'http://localhost:1337'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `http://localhost:1338`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,

  // local proxy
  proxy: [
    {
      prefix: '/uploads',
      url: strapiPrefix
    }
  ],

  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: 'article',
            queryParams: {
              publicationState: process.env.GATSBY_IS_PREVIEW === 'true' ? 'preview' : 'live',
              populate: 'deep'
            }
          },
          {
            singularName: 'tag'
          },
        ],
        singleTypes: [
          {
            singularName: 'home',
            queryParams: {
              populate: {
                banner: {
                  populate: {
                    title: '*',
                    componentName: '*',
                    slides: {
                      populate: '*'
                    }
                  }
                },
                title: '*',
                componentName: '*'
              }
            }
          }
        ]
      }
    },
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `none`, // property param ['tracedSVG', 'dominantColor', 'blurred', 'none']
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark'
  ],
}

export default config
