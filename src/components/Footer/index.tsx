import React from 'react'
import { Link } from 'gatsby-link'
import WaveToTop from '../../images/icon/wave-to-top.svg'
import GongAn from '../../images/icon/gongan.png'

type FooterProp = {
  colorClassName?: string;
}

const Footer: React.FC<FooterProp> = (props) => {
  const { colorClassName = 'purple-900' } = props
  return (
    <footer className="v-footer text-white">
      <WaveToTop className={`text-${colorClassName} w-full`} />
      <div className={`copyright pb-6 text-center bg-${colorClassName} -mt-px`}>
        <div className="whitespace-nowrap m-auto md:inline-block">
          <p className="inline-block">Copyright&copy; linxianglive.cn</p>
          <span>｜</span>
          <Link to="https://beian.miit.gov.cn/">
            <img src={GongAn} style={{ display: 'inline-block', margin: '0px 6px 4px 2px' }} />
            湘ICP备2022001339号
          </Link>
        </div>
        <span className="hidden md:inline-block">｜</span>
        <p className="block md:inline-block">Powered By WangTao</p>
      </div>
    </footer>
  )
}

export default Footer
