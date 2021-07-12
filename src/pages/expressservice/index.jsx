import { lazy } from 'react'

const form = lazy(() => import('./expressservice'))
const confirmation = lazy(() => import('./confirmation'))
const ExpressOrderSuccess = lazy(() => import('./expressordersuccess'))

const HomeService = {
  form,
  confirmation,
  ExpressOrderSuccess
}

export default HomeService