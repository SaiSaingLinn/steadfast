import React, { lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle, Main } from '../components'
import AppRoute from './../router/router'
import { OpenBurger } from './header/style/headerstyle'

const Header = lazy(() => import('./header'))
const Footer = lazy(() => import('./footer'))

export default function index() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <OpenBurger className="burger-wrap" />
      <Header />
      <Main>
        <AppRoute />
      </Main>
      <Footer />
    </BrowserRouter>
  )
}
