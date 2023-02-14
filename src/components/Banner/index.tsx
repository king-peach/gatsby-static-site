import React, {useState, useEffect} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectFade, Pagination, Navigation } from "swiper"
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Link } from "gatsby-link"

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

type Maybe<T> = T | null;

export interface BannerProps {
  slides: Maybe<ReadonlyArray<Maybe<Queries.STRAPI__COMPONENT_SHARED_BLOCK>>> | undefined;
  className?: string;
}

const Banner: React.FC<BannerProps> = (props) => {
  const [show, setShow] = useState(false)
  let swiperInstance: any

  const swiperInit = function (swiper: any) {
    setShow(true)
    swiperInstance = swiper
  }
  const slideChangeTransitionStart = function() {
    setShow(false)
  }
  const transitionEnd = function () {
    setShow(true)
  }

  const getStyle = (json: Queries.STRAPI__COMPONENT_SHARED_BLOCK_STYLECSS_JSONNODE, key: keyof Queries.STRAPI__COMPONENT_SHARED_BLOCK_STYLECSS_JSONNODE) => {
    return json && json[key] ? json[key] : {}
  }

  SwiperCore.use([Autoplay, Pagination, Navigation])

  useEffect(() => {
    // pagination click event handle
    const pagination = document.querySelector('.swiper-pagination')
    pagination?.addEventListener('click', (e) => {
      const target = e.target as Element
      if (target.className.includes('swiper-pagination-clickable') && swiperInstance) {
        const index = +(target.getAttribute('data-index') as string)
        swiperInstance.slideTo(index)
      }
    }, false)
  })
  return (
    <div className={`swiper-container ${props.className}`}>
      <Swiper
        modules={[EffectFade]}
        autoplay={{ delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        speed={700}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        height={500}
        navigation
        pagination={{
          clickable: true,
          type: 'custom',
          clickableClass: 'swiper-pagination-clickable',
          renderCustom: (swiper: SwiperCore, current: number, total: number) => `
          <div className="swiper-pagination" style="position: absolute; bottom: 2em; width: 100%; text-align: center; z-index: 999;">
            ${
              Array(total).fill('').map((item, idx) => '<div class="swiper-pagination-clickable" data-index="' + idx + '" style="display: inline-block; width: 40px; height: 2px; background: black; opacity: ' + ((current - 1) === idx ? '1' : '0.2') + '; margin-right: 6px; cursor: pointer;"></div>').join('')
            }
          </div>`
        }}
        onInit={swiperInit}
        onSlideChangeTransitionStart={slideChangeTransitionStart}
        onTransitionEnd={transitionEnd}
      >
        {
          props?.slides?.map((item, idx: number) => (
            <SwiperSlide key={`swiper slides key ${idx}`} className={`relative`} style={swiperStyle}>
              <div className="banner-bg absolute top-0 left-0" style={{ ...bannerBgStyle, backgroundImage: `url(${item?.poster?.url!})` }}>
                <video className="w-full h-full object-cover" autoPlay muted loop src={item?.animation?.url!} />
              </div>
              <Link to={item?.href || '#'} className="banner-content absolute w-full left-1/2 -translate-x-1/2 max-w-7xl m-auto h-full">
                <div className="banner-content-main mt-52 ml-5">
                  <div className={`banner-content-inner opacity-${show ? 1 : 0} translate-y-${show ? '0' : '52'} transition-all duration duration-300`} style={getStyle(item?.styleCss, 'wrapStyle')}>
                    <div className="u-title font-bold text-5xl" style={getStyle(item?.styleCss, 'titleStyle')}>{item?.title}</div>
                    <div className={`u-summary text-xl transition-all duration-500 ${show ? 'mt-4 opacity-1' : 'mt-0 opacity-0'}`}  style={getStyle(item?.styleCss, 'summaryStyle')}>{item?.summary}</div>
                    <div className={`u-btn-wrap mt-0 transition-all duration-700 ${show ? 'mt-8 opacity-1' : 'mt-0 opacity-0'}`} style={getStyle(item?.styleCss, 'btnWrapStyle')}>
                      <button className="u-btn px-2 py-1 border border-gray-600 text-base">{item?.slug?.split(';')[1]} </button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default Banner