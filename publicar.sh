#!/bin/sh
# Publica la web: la arma (carpeta out/) y la sube a la rama gh-pages, que GitHub Pages muestra en puntoappco.com.
set -e
cd "$(dirname "$0")"
npm run build
touch out/.nojekyll
REPO=$(git remote get-url origin)
cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Publicación del $(date '+%Y-%m-%d %H:%M')"
git push -q --force "$REPO" gh-pages
rm -rf .git
echo "Publicada."
