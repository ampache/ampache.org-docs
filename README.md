# Updating ampache.org-api

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Requirements

* npm/node

## How to

* Clone this repo
* Run ```npm install``` / ```npm update```
* Make changes to the files in the /docs/ folder
* Build ```npm run build```
* Copy the /build folder to the /api folder in [ampache.github.io](https://github.com/ampache/ampache.github.io)
  * ```cp -rfv ./build/* ../ampache.github.io/api/```
* Commit to this repo and ampache.github.io after changes
