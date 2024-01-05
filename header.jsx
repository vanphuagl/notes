import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const Header = () => {
  // const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const [checked, setChecked] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)
  const [size, setSize] = useState({
    width: 0,
    height: 0
  })

  // ===== toggle theme =====

  useEffect(() => {
    let currentTheme = localStorage.getItem('data-theme')
    if (!currentTheme) currentTheme = 'dark'

    if (toggleRef.current) {
      toggleRef.current.checked = currentTheme === 'dark'
      setChecked(toggleRef.current.checked)
    }

    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [])

  const handleChange = (e) => {
    setChecked(e.target.checked)

    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('data-theme', 'light')
    }
  }

  // ===== toggle menu =====

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (size.width > 1023 && openMenu) {
      setOpenMenu(false)
    }
  }, [size.width, openMenu])

  const toggleMenu = (e) => {
    // e.preventDefault()
    setOpenMenu(!openMenu)
  }

  // ===== click link =====

  // const scrollToTop = () => {
  //   if (pathname === '/') {
  //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  //   }
  // }

  // ====== height 100vh =====

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${document.documentElement.clientHeight}px`)
      // height menu
      const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      document.querySelector('.c-header__menu').style.height = windowHeight + 'px'
      if (document.querySelector('.intro')) {
        document.querySelector('.intro').style.height = windowHeight + 'px'
      }
    }
    appHeight()
    window.addEventListener('resize', appHeight)
    return () => window.removeEventListener('resize', appHeight)
  }, [])

  // ===== return =====
  return (
    <>
      <header className='c-header'>
        <Link to='/' className='c-header__left'>
          <h1>anew inc.</h1>
        </Link>

        <div className='c-header__center'>
          {/* <Link to='/#projects'>projects,</Link>
          <Link to='/#philosophy'>philosophy,</Link>
          <Link to='/#company'>company</Link> */}
          <a href='#projects'>projects,</a>
          <a href='#philosophy'>philosophy,</a>
          <a href='#company'>company</a>
        </div>

        <div className='c-header__right'>
          <p onClick={toggleMenu}>{!openMenu ? 'menu' : 'close'}</p>
          <label htmlFor='toggle'>
            <span>{checked ? 'dark' : 'light'}</span>
          </label>
          <input
            id='toggle'
            ref={toggleRef}
            className='toggle'
            checked={checked}
            type='checkbox'
            onChange={handleChange}
          />
        </div>
      </header>

      <div className={` ${'c-header__menu'} ${openMenu && size.width < 1023 ? `${'active'}` : ''} `}>
        <div className='top'>
          <Link
            to='/#projects'
            onClick={() => {
              toggleMenu()
            }}
          >
            projects
          </Link>
          <Link
            to='/#philosophy'
            onClick={() => {
              toggleMenu()
            }}
          >
            philosophy
          </Link>
          <Link
            to='/#company'
            onClick={() => {
              toggleMenu()
            }}
          >
            company
          </Link>
        </div>

        <div className='bottom'>
          <Link to='https://instagram.com/anew__inc/' target='_blank' className='instagram'>
            INSTAGRAM
          </Link>
          <Link to='https://www.websitecarbon.com/' target='_blank' className='carbon'>
            * This website emits 0.00g of CO2 per view.
          </Link>
          <p>©︎ 2023 anew inc.</p>
        </div>
      </div>
    </>
  )
}

export default Header
