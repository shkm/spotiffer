/* exported getCookie */

// TODO: deal with expiry
const COOKIE_URL = "https://open.spotify.com"
const COOKIE_NAME = "wp_access_token"

function getCookie() {
  return browser.cookies
    .get({ url: COOKIE_URL, name: COOKIE_NAME })
    .then((cookie) => cookie)
    .catch(() => console.log("TODO Go login…"))
}
