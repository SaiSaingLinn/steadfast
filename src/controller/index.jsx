import httpClient from './constant/HttpClient'

// export * from './constant/Config'
export * from './constant/Routes'

const controller = async (endpoint, ...data) => {
  let tmp = endpoint.split(':')
  return await httpClient[tmp[0]](tmp[1], ...data)
    .then(res => res && res)
    .catch(error => error)
}

export default controller