import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade } from "swiper"
import 'swiper/css'
import 'swiper/css/effect-fade'
import { useState } from "react"
import { Link } from "gatsby-link"

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

const swiperStyle = {
  width: '100%',
  height: '650px'
}

const bannerBgStyle = {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}


const IndexPage: React.FC<PageProps<QueryProps>> = ({ data }) => {
  console.log(data)
  const { strapiHome, strapiTag } = data


  const [swiperSlides, setSwiperSlides] = useState([
    {
      poster: 'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/advertisement/Fixed/banner/1656573247101788579.jpg',
      animate: strapiTag.icon?.url,
      showAnima: true,
      content: 'sss',
      class: 'bg-purple-700'
    },
    {
      poster: 'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/advertisement/Fixed/banner/1656573668760757087.jpg',
      animate: '1' + strapiTag.icon?.url,
      showAnima: true,
      content: 'assa',
      class: 'bg-pink-700'
    },
    {
      poster: 'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/advertisement/Fixed/banner/1649397806437599755.jpg',
      animate: 'x' + strapiTag.icon?.url,
      showAnima: true,
      content: 'sxxx',
      class: 'bg-red-700'
    }
  ])

  SwiperCore.use([Autoplay])
  return (
    <Layout>
      <main className="v-main-container min-h-screen">
        <section className="bg-purple-900 text-center relative w-full py-40 overflow-hidden">
          <aside>
            <h2 className="text-white font-bold text-6xl">{strapiHome.title}</h2>
            <p className="text-gray-300 text-lg mt-4">{strapiHome.description}</p>
          </aside>
        </section>
        {/* <div className="video-wrap">
          <video autoPlay muted loop src={data.strapiTag.icon?.url!} />
        </div> */}
        <div className="swiper-container">
          <Swiper
            modules={[EffectFade]}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            loop
            speed={800}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            height={500}
          >
            {
              swiperSlides.map((item, idx: number) => (
                <SwiperSlide key={`swiper slides key ${idx}`} className={`${item.class} relative`} style={swiperStyle}>
                  <div className="banner-bg absolute top-0 left-0" style={{ ...bannerBgStyle, backgroundImage: `url(${item.poster})` }}>
                    <video className="w-full h-full object-cover" autoPlay muted loop src={item.animate!} />
                  </div>
                  <Link to={item?.href || '#'} className="banner-content">
                    <div className="banner-content-main">
                      <div className="banner-content-inner">
                        <div className="u-title">Banner Titile</div>
                        <div className="u-summary">Banner Summary</div>
                        <div className="u-btn-wrap">
                          <button className="u-btn">Enter Immediately </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
