#!/usr/bin/env sh
mkdir -p tmp
[ -f build.zip ] && rm build.zip

cd src
zip -r -Z store build.zip *

source ../mozilla.env
web-ext sign --api-key=$API_KEY --api-secret=$API_SECRET

mkdir ../releases
mv web-ext-artifacts/* ../releases/
rm -r web-ext-artifacts
