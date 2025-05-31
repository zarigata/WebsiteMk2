#!/bin/bash

# Exit on error
set -e

# Install dependencies
npm install

# Build the project
npm run build

# Export the static site
npm run export

# Create a temporary directory for the deployment
DEPLOY_DIR=deploy
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy the static files to the deployment directory
cp -R out/* $DEPLOY_DIR/

# Create a .nojekyll file to prevent GitHub Pages from using Jekyll
touch $DEPLOY_DIR/.nojekyll

# Create a CNAME file if you're using a custom domain
# echo "yourdomain.com" > $DEPLOY_DIR/CNAME

# Initialize a new Git repository in the deployment directory
cd $DEPLOY_DIR
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Add the GitHub repository as a remote
git remote add origin https://github.com/zarigata/WebsiteMk2.git

# Force push the contents of the deployment directory to the gh-pages branch
git push -f origin main:gh-pages

# Clean up
cd ..
rm -rf $DEPLOY_DIR

echo "Deployment successful! Your site should be live at https://zarigata.github.io/WebsiteMk2"
