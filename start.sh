#!/bin/sh

echo "Waiting for MySQL database to be ready..."

# Wait for database to be ready
while ! nc -z db 3306; do
  sleep 1
done

echo "Database is ready!"

# Run database sync
echo "Syncing database..."
npm run sync

# Seed data
echo "Seeding data..."
npm run seed

# Start the application
echo "Starting application..."
npm start
