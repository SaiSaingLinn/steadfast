import Home from '../pages/home'
import AboutUs from '../pages/aboutus'
import ContactUs from '../pages/contactus'
import Terms from '../pages/terms'
import Profile from '../pages/profile'
import Result from '../pages/result'
import Category from '../pages/category'
import Products from '../pages/products'
import Tickets from '../pages/serviceticket'
import HomeService from '../pages/homeservice'
import ExpressService from '../pages/expressservice'
import Auth from '../pages/auth'

const Routes = [
  {
    path: "/",
    component: Home.Home
  },
  {
    path: '/aboutus',
    component: AboutUs.AboutUs
  },
  {
    path: '/contactus',
    component: ContactUs.ContactUs
  },
  {
    path: '/termsandconditions',
    component: Terms.TermsConditions
  },
  {
    path: '/privacypolicy',
    component: Terms.PrivacyPolicy
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/products/list',
    component: Products.ProductList
  },
  {
    path: '/product/detail/:id',
    component: Products.ProductDetail
  },
  
  {
    path: '/products/search',
    component: Products.ProductSearch
  },
  {
    path: '/promotions',
    component: Products.AllPromo
  },
  {
    path: '/promotions/product-list/:id',
    component: Products.PromoList
  },
  {
    path: '/shoppingcart/:id',
    component: Products.ShoppingCart
  },
  {
    path: '/payment/:id',
    component: Products.Payment
  },
  {
    path: '/checkout/:id',
    component: Products.CheckOut
  },
  {
    path: '/product-order-success',
    component: Products.ProductOrderSuccess
  },
  {
    path: '/profile',
    component: Profile.ProfileInfo,
    protect: true
  },
  {
    path: '/profile/profileedit',
    component: Profile.ProfileEdit,
    protect: true
  },
  {
    path: '/changepassword',
    component: Profile.ChangePass,
    protect: true
  },
  {
    path: '/orderhistory',
    component: Profile.OrderHistory,
    protect: true
  },
  {
    path: '/orderhistory/orderdetail/:id',
    component: Profile.OrderDetail,
    protect: true
  },
  {
    path: '/myservice',
    component: Profile.MyService,
    protect: true
  },
  {
    path: '/myservice/myservicedetail/:id',
    component: Profile.MyServiceDetail,
    protect: true
  },
  {
    path: '/wishlist',
    component: Profile.Wishlist,
    protect: true
  },
  {
    path: '/service-ticket',
    component: Tickets.Ticket
  },
  {
    path: '/service-ticket/detail/:id',
    component: Tickets.TicketDetail
  },
  {
    path: '/service-ticket/checkout/:id',
    component: Tickets.TicketCheckout
  },
  {
    path: '/service-ticket/ticket-order-success',
    component: Tickets.TicketOrderSuccess
  },
  {
    path: '/home-service',
    component: HomeService.form
  },
  {
    path: '/home-service/confirm',
    component: HomeService.confirmation
  },
  {
    path: '/home-service/home-order-success',
    component: HomeService.HomeOrderSuccess
  },
  {
    path: '/express-service',
    component: ExpressService.form
  },
  {
    path: '/express-service/confirm',
    component: ExpressService.confirmation
  },
  {
    path: '/express-service/express-order-success',
    component: ExpressService.ExpressOrderSuccess
  },
  {
    path: '/signup',
    component: Auth.SignUp
  },
  {
    path: '/signin',
    component: Auth.SignIn
  },
  {
    path: '/forgetpassword',
    component: Auth.ForgetPass
  },
  {
    path: '*',
    component: Result.NotFound
  }
]

export default Routes