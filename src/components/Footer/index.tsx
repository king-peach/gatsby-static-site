import React from 'react'
import { Link } from 'gatsby-link'

const Footer: React.FC = () => {
  return (
    <footer className="v-footer py-6 bg-black text-white">
      <div className="copyright text-center">
        <div className="whitespace-nowrap m-auto md:inline-block">
          <p className="inline-block">Copyright&copy; linxianglive.cn</p>
          <span>｜</span>
          <Link to="https://beian.miit.gov.cn/">湘ICP备2022001339号</Link>
        </div>
        <span className="hidden md:inline-block">｜</span>
        <p className="block md:inline-block">Powered By WangTao</p>
      </div>
    </footer>
  )
}

export default Footer