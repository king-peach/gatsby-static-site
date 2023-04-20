import React from 'react'
import { Link } from 'gatsby-link'
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash-es'

const Header: React.FC = () => {
  const navItem = [{
    name: '首页',
    link: '/'
  }, {
    name: '归档',
    link: '/category'
  }, {
    name: '关于',
    link: '/about'
  }]

  const [fixed, setFixed] = useState(false)

  const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollHeight

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.offsetWidth < 768) return

      const currentScrollTop = getScrollTop() === document.body.scrollHeight ? 0 : getScrollTop()

      setFixed(currentScrollTop > 20)
    }

    window.addEventListener('scroll', debounce(handleScroll, 300))

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <header className={`flex items-center ${fixed ? 'md:text-gray-800 md:bg-white md:bg-opacity-80 md:shadow-sm md:shadow-gray-400 md:fixed' : 'absolute text-white bg-transparent'} justify-between px-4 inset-0 h-16 bg-transparent z-9999`}>
      <Link  to="/" className="u-logo inline-block">
        <h2 className="inline-block font-bold">WangTao</h2>
      </Link>
      <div className="v-navbar-wrap hidden float-right md:inline-block">
        {
          navItem.map(item => (
            <div key={item.name} className="v-navbar-item font-medium inline-block h-full px-10 hover:opacity-50 cursor-pointer">
              <Link target="_blank" to={item.link}>{item.name}</Link>
            </div>)
          )
        }
      </div>
      <div className="v-mobile-toggle inline-block float-right md:hidden">
        <Menu>
          <MenuHandler>
            <Button variant="gradient">
              <svg className="fill-white" width="28" height="32"><rect x="2" y="8" rx="2" ry="4" width="24" height="2"></rect><rect x="2" y="15" rx="2" ry="4" width="24" height="2"></rect><rect x="2" y="22" rx="2" ry="4" width="24" height="2"></rect></svg>
            </Button>
          </MenuHandler>
          <MenuList>
            {
            navItem.map(item => (
              <MenuItem key={item.name} className=" border-t bg-white border-gray-500 border-top-none block px-10 py-2 text-gray-800 font-normal from-neutral-500">
                <Link target="_blank" to={item.link}>{item.name}</Link>
              </MenuItem>))
            }
          </MenuList>
        </Menu>
      </div>
    </header>
  )
}

export default Header