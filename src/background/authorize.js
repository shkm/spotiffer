/* exported getCookie */

// TODO: deal with expiry
const COOKIE_URL = "https://open.spotify.com"
const COOKIE_NAME = "wp_access_token"

function refreshCookie() {
  return fetch(COOKIE_URL, { method: "GET", credentials: "include" })
}

function getCookie() {
  return browser.cookies
    .get({ url: COOKIE_URL, name: COOKIE_NAME })
    .then((cookie) => {
      if (cookie) return cookie

      return refreshCookie().then(getCookie())
    })
}
