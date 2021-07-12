import React, { useEffect } from 'react'
import AppLayout from './layouts'
import { useDispatch, useSelector } from 'react-redux'
import { translation } from './store/actions'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './styles/App.scss'

const App = () => {
  const dispatch = useDispatch()
  const { langStore } = useSelector(state => state.translation)

  useEffect(() => {
    dispatch(translation.getTranslation())
    document.documentElement.lang = langStore?.code
  }, [dispatch, langStore?.code])

  return (
    <AppLayout />
  )
}

export default App