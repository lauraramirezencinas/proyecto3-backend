#!/bin/bash
cd /Users/lauramirez/Desktop/ironhack/Sugar Place/sugar-place-frontend
echo "Start building"
npm run build
echo "Cleaning public folder"
rm -rf /Users/lauramirez/Desktop/ironhack/Sugar Place/sugar-place-backend/public/*
echo "Copying build"
cp -r /Users/lauramirez/Desktop/ironhack/Sugar Place/sugar-place-frontend/build/* /Users/lauramirez/Desktop/ironhack/Sugar Place/sugar-place-backend/public/
cd /Users/lauramirez/Desktop/ironhack/Sugar Place/sugar-place-backend
git add .
git commit -m "deploy"
git push 
git push heroku master