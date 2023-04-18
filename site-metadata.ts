interface PageMetaData {
  id: string
  type: string
  pathName?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  breadcrumb?: string
}

export const pages: Record<string, PageMetaData> = {
  home: {
    id: `home`,
    pathName: `/`,
    title: `Jane Doe`,
    description: `Wang Tao's place on the web`,
    image: `./src/images/icon.png`,
    imageAlt: `Two corgis sitting next to each other`,
    breadcrumb: `Home`,
    type: `WebPage`,
  },
  blog: {
    id: `categpry`,
    pathName: `/categpry`,
    title: `Categpry`,
    description: `Wang Tao's blog about software engineering`,
    image: `./src/images/icon.png`,
    imageAlt: `Cute brown Retriever is licking it's nose`,
    breadcrumb: `Blog`,
    type: `Blog`,
  },
  about: {
    id: `about`,
    pathName: `/about`,
    title: `About`,
    description: `Wang Tao's biography`,
    image: `./src/images/icon.png`,
    imageAlt: `French bulldog is hanging out on the playground`,
    breadcrumb: `About`,
    type: `AboutPage`,
  },
  article: {
    id: `article`,
    type: `Article`,
  },
}

const metadata = {
  siteName: 'Gatsby Site',
  siteUrl: `https://tidu.io/`,
  title: `My Gatsby Site`,
  description: `This is where I write my thoughts.`,
  socialMedia: {
    github: `https://github.com/allex`,
    twitter: `https://twitter.com/allex_wang`,
  },
  logo: {
    pathName: `logo.png`,
    width: 640,
    height: 640,
  },
  language: `en_US`,
  pages,
}

export default metadata
