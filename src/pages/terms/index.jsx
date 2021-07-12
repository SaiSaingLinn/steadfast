import { lazy } from 'react'

const TermsConditions = lazy(() => import('./termsconditions'))
const PrivacyPolicy = lazy(() => import('./privacypolicy'))

const Terms = {
  TermsConditions,
  PrivacyPolicy
}

export default Terms