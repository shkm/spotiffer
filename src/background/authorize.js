/* exported getCookie */

// TODO: deal with expiry
const COOKIE_URL = "https://open.spotify.com"
const COOKIE_NAME = "wp_access_token"
const EXPIRY_TIME_OFFSET =  10

function refreshCookie() {
  return fetch(COOKIE_URL, { method: "GET", credentials: "include" })
}

function isExpired(cookie) {
  const currentTime = Math.ceil(((new Date).getTime() / 1000))
  const result = currentTime + EXPIRY_TIME_OFFSET >= cookie.expirationDate

  if (result) console.log("Cookie is expired!") // Currently testing

  return result
}

function getCookie() {
  return browser.cookies
    .get({ url: COOKIE_URL, name: COOKIE_NAME })
    .then((cookie) => {
      if (!cookie || isExpired(cookie)) return refreshCookie().then(getCookie)

      return cookie
    })
}
