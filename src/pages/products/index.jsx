import { lazy } from 'react'

const ProductList = lazy(() => import('./productlist'))
const ProductDetail = lazy(() => import('./productdetail'))
const ProductSearch = lazy(() => import('./productsearch'))
const ShoppingCart = lazy(() => import('./shoppingcart'))
const CheckOut = lazy(() => import('./checkout'))
const Payment = lazy(() => import('./payment'))
const ProductOrderSuccess = lazy(() => import('./productordersuccess'))

// promotions
const AllPromo = lazy(() => import('./allpromotion'))
const PromoList = lazy(() => import('./promotionlist'))

const Products = {
  ProductList,
  ProductDetail,
  ProductSearch,
  ShoppingCart,
  CheckOut,
  Payment,
  ProductOrderSuccess,
  AllPromo,
  PromoList
}

export default Products