import Cookies from 'js-cookie'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}