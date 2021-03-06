# spotiffer

Firefox extension which attempts to open music from the current page in Spotify.

Currently only working with Bandcamp, but others may be added later.

## Installation

Install from [Firefox Addons](https://addons.mozilla.org/en-GB/firefox/addon/spotiffer/).  Alternatively, [Download the latest xpi](https://github.com/shkm/spotiffer/tree/master/releases/) and [follow these instructions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Distribution_options/Sideloading_add-ons#Using_Install_Add-on_From_File).

Once it's more complete I'll add it to the Firefox extension site.

## Usage

1. Browse to an album on Bandcamp
2. Click the Spotiffer button

## Development

Use [web-ext](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext) and run `cd src && web-ext run`.

## Packaging

Create a file named `mozilla.env` and populate with the following:

```
API_KEY=YOUR_API_KEY
API_SECRET=YOUR_API_SECRET
```

Now just run `./package.sh`, which will zip and sign the extension, and you'll get an XPI in `releases`.

## TODO

- Open current track in Spotify if playing
- Gracefully handle no search results
- More providers
