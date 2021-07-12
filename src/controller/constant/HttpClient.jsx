import axios from 'axios'
import { authStore } from '../../service'

const client = axios.create()

client.interceptors.request.use(async (config) => {
   config.baseURL = process.env.REACT_APP_API_ENDPOINT

   config.headers['access-token'] = authStore.getAuth()?.access_token || ''

   return config
}, (error) => {
   console.log(error)
   return Promise.reject(error)
})

client.interceptors.response.use(async (response) => {
   if (!response.data) {
      return Promise.reject(response)
   }
   return response

}, async (error) => {
   return Promise.reject(error)
})

export default client