/* global getCookie */

const BASE_SEARCH_URL = "https://api.spotify.com/v1/search"

function buildSearchUrl(artist, album, track) {
  let types = "artist"
  let query = `artist:${artist}`
  if (album) {
    types += ",album"
    query += ` album:${album}`
  }
  if (track) {
    types += ",track"
    query += ` track:${track}`
  }

  return `${BASE_SEARCH_URL}?type=${types}&q=${query}\
&decorate_restrictions=false&best_match=true\
&include_external=audio&limit=1&userless=true\
&market=US`
}

function search(cookie, artist, album = null, track = null) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Origin: "open.spotify.com",
    Authorization: `Bearer ${cookie.value}`
  })

  const request = new Request(buildSearchUrl(artist, album, track))
  const options = { method: "GET", headers: headers }
  
  return fetch(request, options)
    .then(function(response) {
      return response.json()
        .then((json) => json.best_match.items[0].uri)
    })
}

function convertUriToOpenSpotifyUri(uri) {
  return uri.replace(/^spotify:/, "spotify://")
}

function openSpotify(uri) {
  browser.tabs.create({ active: false, url: uri })
}

browser.browserAction.disable()
browser.runtime.onMessage.addListener(receiveMessage)

function receiveMessage(message, sender) {
  switch (message.event) {
    case "LOADED":
      handleLoadedScript(sender)
      break;
    case "GOT_DATA_FOR_SPOTIFY":
      handleDataReceived(sender, message.payload)
      break;
  }
}

function handleLoadedScript(sender) {
  browser.browserAction.enable(sender.tab.id)
  browser.browserAction.onClicked.addListener(handleClick)
}

function handleDataReceived(sender, payload) {
  getCookie()
    .then((cookie) => {
      return search(cookie, payload.artist, payload.albumTitle)
    })
    .then((uri) => openSpotify(convertUriToOpenSpotifyUri(uri)))

  // TODO: close tab when loaded
}

function handleClick(tab) {
  browser.tabs.sendMessage(tab.id, { event: "GET_DATA_FOR_SPOTIFY" })
}
