const setLanguage = data => {
  localStorage.setItem('lang_store', JSON.stringify(data))
}

const getLanguage = () => {
  return JSON.parse(localStorage.getItem('lang_store'))
}

const language = {
  setLanguage, getLanguage
}

export default language