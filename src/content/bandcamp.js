// window.wrappedJsObject.EmbedData
window.addEventListener("load", notifyExtension)

browser.runtime.onMessage.addListener((message) => {
  if (message.event !== "GET_DATA_FOR_SPOTIFY") return

  getDataForSpotify()
})

function notifyExtension() {
  browser.runtime.sendMessage({ event: "LOADED" })
}

function getDataForSpotify() {
  browser.runtime.sendMessage({ event: "GOT_DATA_FOR_SPOTIFY",
                                payload: albumPayload() || artistPayload() })
}

function albumPayload() {
  const rawPayload = window.wrappedJSObject.EmbedData

  if (!rawPayload) return

  return { artist: rawPayload.artist, albumTitle: rawPayload.album_title }
}

function artistPayload() {
  return null // TODO
}
