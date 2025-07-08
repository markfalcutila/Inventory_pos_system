#!/bin/sh
# Install dependencies (if not already installed)
npm install
# Run migrations
npm run migration:run
# Seed the database
npm run seed
# Start the application
npm start
