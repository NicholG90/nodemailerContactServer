#!/bin/bash
set -e

echo "Deploying application ..."

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

# Pull the latest changes from GitHub
cd ..
git pull

# Start the application through docker
docker compose up -d --build

echo "🚀 Application deployed!"

