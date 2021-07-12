export const routes = {
  // auth
  signIn: `get:api/auth/token`,
  faceBookSignIn: `post:api/user/login_with_facebook`,
  googleSignIn: `post:user/login_with_social_media`,
  signOut: `delete:api/auth/token`,
  signUp: `post:api/user/signup`,
  sellerSignUp: `post:seller/signup`,
  changePassword: `post:api/password/change`,
  resetPassword: `post:api/user/reset_password`,
  userOtp: `post:api/user/otp_verify`,

  // for resend otp
  resendOtp: `post:api/user/check`,

  // profile
  getProfile: `get:api/get/profile`,
  updateProfile: `post:api/save/profile/information`,

  // location
  getCityList: `get:api/list/city`,
  getCountryList: `get:api/country_origin`,

  // order
  getOrder: `get:api/saleorder`,
  getOrderById: `get:api/sale_order/detail`,

  // myservice
  getMyServiceTicketSummary: `get:api/serviceticket/summary`,
  getMyServiceTicket: `get:api/service_ticket`,

  // wishlist
  createWishlist: `post:api/wishlist/add`,
  getWishlist: `get:api/wishlist`,
  getExistsWishlist: `get:api/exist/wishlist`,
  removeWishlist: `post:api/wishlist/remove`,

  // ecommerce
  createCart: `post:api/save/cart`,
  getCart: `get:api/get/cart`,
  deleteCart: `delete:api/delete/cart`,
  deleteAllInCart: `delete:api/clear/cart`,
  createShipping: `post:api/save/shipping/information`,
  getDeliveryInformation: `get:api/list/delivery_information`,
  getPaymentList: `get:api/payment/list`,
  payNow: `post:api/paynow`,
  PayNow_2c2p: `post:api/send/payload/data/2c2p/v4`,

  // translation
  getTranslation: `get:api/text/translation`,

  // contact
  getContact: `get:api/contactusform`,
  sentContactUs: `post:api/save/contactinformation`,

  //product
  getProduct: `get:api/list/product`,
  getProductById: `get:api/detail/product/list`,
  getProductByCategory: `get:api/product/categories`,
  getProductBrand: `get:api/product/brand`,
  checkProductQty: `get:api/product/quantity`,

  // promotion
  getPromotion: `get:api/list/promotion`,
  getPromoDetailList: `get:api/detail/promotion`,

  // about us
  getAbout: `get:api/ecommerce/aboutus`,

  // term & condition
  getWebsiteUnfo: `get:api/website/information`,

  // meta data
  getMetaData: `get:api/application/meta`,

  // ads
  getAds: `get:api/list/advertising`,

  // get website slider
  getWebsiteSlider: `get:api/website/slider`,

  // services
  sentHomeService: `post:api/homecallservice`,
  getHomeService: `get:api/homecallservice`,
  getHomeServiceType: `get:api/homecall/service/types`,
  
  sentExpressService: `post:api/expressservice`,
  getExpressService: `get:api/expressservice`,
  getExpressServiceType: `get:api/express/service/types`,

  getServiceLocation: `get:api/location/division`,

  getServiceSetting: `get:api/service_setting`,

  // website gallery list
  getWebsiteGalleryDetail: `get:api/list/website/gallery/detail`,
  getLatestProduct: `get:api/list/website/gallery/detail`,
  getFeaturedCategory: `get:api/list/website/gallery/detail`,
  getFeaturedProduct: `get:api/list/website/gallery/detail`,

  // home page content
  getHomePageContent: `get:api/homepagecontent`
}