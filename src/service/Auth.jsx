const setSignUp = data => {
  localStorage.setItem('signUp_store', JSON.stringify(data))
  let CryptoJS = require('crypto-js')

  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'signup_info')
  localStorage.setItem('signUp_store', ciphertext.toString())
}

const getSignUp = () => {
  let CryptoJS = require('crypto-js')
  let sessi = localStorage.getItem('signUp_store')
  if (!sessi) return false
  let bytes = CryptoJS.AES.decrypt(sessi, 'signup_info')
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const setSignIn = data => {
  localStorage.setItem('signIn_store', JSON.stringify(data))
}

const getSignIn = () => {
  return JSON.parse(localStorage.getItem('signIn_store'))
}

const setAuth = data => {
  let CryptoJS = require('crypto-js')

  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'user_info')
  localStorage.setItem('auth_store', ciphertext.toString())
}

const getAuth = () => {
  let CryptoJS = require('crypto-js')
  let sessi = localStorage.getItem('auth_store')
  if (!sessi) return false
  let bytes = CryptoJS.AES.decrypt(sessi, 'user_info')
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const setRememberMe = data => {
  localStorage.setItem('rememberMe_store', JSON.stringify(data))
}

const getRememberMe = () => {
  return JSON.parse(localStorage.getItem('rememberMe_store'))
}

const removeAuth = () => {
  localStorage.removeItem('signUp_store')
  localStorage.removeItem('signIn_store')
  localStorage.removeItem('auth_store')
  localStorage.removeItem('rememberMe_store')
}

export default {
  setSignUp, 
  getSignUp,
  setSignIn,
  getSignIn,
  setAuth,
  getAuth,
  removeAuth,
  setRememberMe,
  getRememberMe
}