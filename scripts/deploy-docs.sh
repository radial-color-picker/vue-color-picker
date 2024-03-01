#!/usr/bin/env sh

# abort on errors
set -e

bun run docs:build
cd docs/.vuepress/dist

git init
git add -A

author=$1

if [[ -n "$author" ]]; then
    git config user.email "$author"
fi

git commit -m 'deploy'

git push -f git@github.com:radial-color-picker/vue-color-picker.git master:gh-pages

cd -
