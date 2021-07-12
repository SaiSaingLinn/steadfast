import { Ecommerce } from '../store/actions/ecommerce.action'

const addToCart = (postData, langCode, ticket) => async dispatch => {
  //* if you does not have order_id in orderStore_data, working this function
  if (!postData?.order_id) {
    delete postData.order_id
    delete postData?.sale_order_line[0]?.cart_status
  }

  //* if you does not have uid in authStore?.getAuth(), working this function
  if (!postData?.user_id) {
    delete postData.user_id
  }
  
  let simple_res = await dispatch(Ecommerce.createCart(postData, postData?.user_id, langCode, ticket))
  return simple_res
}

export {
  addToCart
}