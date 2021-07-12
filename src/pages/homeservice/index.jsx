import { lazy } from 'react'

const form = lazy(() => import('./homeservice'))
const confirmation = lazy(() => import('./confirmation'))
const HomeOrderSuccess = lazy(() => import('./homeordersuccess'))

const HomeService = {
  form,
  confirmation,
  HomeOrderSuccess
}

export default HomeService