#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:NaomiRadke/earthquake_app.git main:gh-pages

cd -