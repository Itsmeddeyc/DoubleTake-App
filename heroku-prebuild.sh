#!/bin/bash

echo "---- Building Vite frontend ----"
cd frontend
npm install
npm run build
cd ..
echo "---- Vite build complete ----"
