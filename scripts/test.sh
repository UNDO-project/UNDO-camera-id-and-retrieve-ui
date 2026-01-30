#!/bin/bash

# cIDaR Test Runner Helper

echo "--------------------------------"
echo "   cIDaR Frontend Test Runner   "
echo "--------------------------------"
echo "Select an option:"
echo "1) Run All Tests (Bulk)"
echo "2) Run Unit Tests (Modules & Services)"
echo "3) Run Integration Tests"
echo "4) Run Video Feature Tests"
echo "5) Watch Mode (Interactive)"
echo "6) Exit"
echo "--------------------------------"
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        echo "Running all tests..."
        npm run test
        ;;
    2)
        echo "Running unit tests..."
        npm run test:unit
        ;;
    3)
        echo "Running integration tests..."
        npm run test:integration
        ;;
    4)
        echo "Running video feature tests..."
        npm run test:video
        ;;
    5)
        echo "Starting watch mode..."
        npm run test:watch
        ;;
    6)
        echo "Exiting."
        exit 0
        ;;
    *)
        echo "Invalid option."
        exit 1
        ;;
esac
