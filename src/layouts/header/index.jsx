import React, { useLayoutEffect } from 'react'
import PrimaryNav from './primarynav'
import SecondaryNav from './secondarynav'
import { openDrawer, NavSticky } from '../../utils/utils'
import { HeaderDiv } from './style/headerstyle'

export default function Header() {
  useLayoutEffect(() => {
    window.addEventListener('openDrawer', openDrawer())

    window.addEventListener('scroll', () => NavSticky())

    return () => {
      window.removeEventListener('openDrawer', openDrawer())
      window.removeEventListener('scroll', NavSticky())
    }
  }, [])
  return (   
    <HeaderDiv>
      <SecondaryNav />
      <PrimaryNav />
    </HeaderDiv>
  )
}