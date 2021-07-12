import { combineReducers } from 'redux'

import emit from './emit.reducer'

import profile from './profile.reducer'

import order from './order.reducer'

import myserviceticket from './myserviceticket.reducer'

import wishlist from './wishlist.reducer'

import ecommerce from './ecommerce.reducer'

import location from './location.reducer'

import about from './about.reducer'

import contact from './contact.reducer'

import auth from './auth.reducer'

import translation from './translation.reducer'

import product from './product.reducer'

import terms from './terms.reducer'

import meta from './meta.reducer'

import ads from './ads.reducer'

import promotion from './promotion.reducer'

import slider from './slider.reducer'

import services from './service.reducer'

import websiteGallery from './websitegallery.reducer'

import homecontent from './homecontent.reducer'

export default combineReducers({
  emit,
  profile,
  order,
  myserviceticket,
  wishlist,
  ecommerce,
  location,
  about,
  contact,
  auth,
  translation,
  product,
  terms,
  meta,
  ads,
  promotion,
  slider,
  services,
  websiteGallery,
  homecontent
})