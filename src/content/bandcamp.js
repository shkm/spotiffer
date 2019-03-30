// window.wrappedJsObject.EmbedData
window.addEventListener("load", maybeNotifyExtension)

browser.runtime.onMessage.addListener((message) => {
  if (message.event !== "GET_DATA_FOR_SPOTIFY") return

  getDataForSpotify()
})

function maybeNotifyExtension() {
  if (!getPayload()) return // can't do anything with this page

  browser.runtime.sendMessage({ event: "LOADED" })
}

function getPayload() {
  return albumPayload() || artistPayload()
}

function getDataForSpotify() {
  browser.runtime.sendMessage({
    event: "GOT_DATA_FOR_SPOTIFY",
    payload: getPayload() }
  )
}

function albumPayload() {
  const rawPayload = window.wrappedJSObject.EmbedData

  if (!rawPayload) return

  return { artist: rawPayload.artist, albumTitle: rawPayload.album_title }
}

function artistPayload() {
  const rawPayload = window.wrappedJSObject.BandData

  if (!rawPayload) return

  return { artist: rawPayload.name }
}
