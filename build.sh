#!/bin/sh

npm run build && cp -rfv ./build/* ../ampache.github.io/docs/
