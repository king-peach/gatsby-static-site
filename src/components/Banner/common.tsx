import React from 'react'
import WaveToBottom from '../../images/icon/wave-to-bottom.svg'

export interface BannerIntro {
  title: string;
  summary?: string;
  colorClassName?: string;
}

const Banner: React.FC<BannerIntro> = (props) => {
  const { title, summary, colorClassName = 'purple-900' } = props
  return (
    <section className="m-common-banner-wrap text-center relative w-full overflow-hidden">
      <aside className={`bg-${colorClassName} pt-20`}>
        <h2 className="text-white font-bold text-2xl lg:text-5xl max-w-screen-md leading-snug m-auto">{title}</h2>
        <p className="text-gray-200 text-lg mt-4">{summary}</p>
      </aside>
      <WaveToBottom className={`w-full -mt-px text-${colorClassName}`} />
    </section>
  )
}

export default Banner