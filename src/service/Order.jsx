const setOrder = data => {
  localStorage.setItem('order_store', JSON.stringify(data))
}

const getOrder = () => {
  return JSON.parse(localStorage.getItem('order_store'))
}

const removeOrder = () => {
  localStorage.removeItem('order_store')
}

export default {
  setOrder, getOrder, removeOrder
}