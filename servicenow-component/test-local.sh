#!/bin/bash

# ServiceNow Component Local Testing Script
# Quick script to start local development server

echo "🚀 Starting ServiceNow Component Local Test Server..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "   Install Node.js v18 or v20: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Check if now-cli is installed
if ! command -v now-cli &> /dev/null; then
    echo "❌ ServiceNow CLI is not installed"
    echo "   Install: npm install -g @servicenow/cli"
    exit 1
fi

echo "✅ ServiceNow CLI is installed"
echo ""

# Check for recommended Node version
MAJOR_VERSION=$(node --version | cut -d'.' -f1 | sed 's/v//')
if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js v18 or v20 is recommended"
    echo "   Current version: $NODE_VERSION"
    echo "   Switch with: nvm use 20"
    echo ""
fi

# Check if we're in the right directory
if [ ! -f "now-ui.json" ]; then
    echo "❌ Error: now-ui.json not found"
    echo "   Make sure you're in the servicenow-component directory"
    exit 1
fi

echo "✅ Component files found"
echo ""
echo "📝 Starting local development server..."
echo "   Browser will open at: http://localhost:8081"
echo ""
echo "💡 Tips:"
echo "   - Hot reload is enabled (save files to see changes)"
echo "   - Use sample-data.json for test data"
echo "   - Check browser console for events and errors"
echo "   - Press Ctrl+C to stop the server"
echo ""
echo "🎯 Testing Checklist:"
echo "   1. Test all properties in the right panel"
echo "   2. Paste data from sample-data.json"
echo "   3. Resize browser for responsive testing"
echo "   4. Click buttons to test interactions"
echo "   5. Check console for dispatched events"
echo ""
echo "Starting in 3 seconds..."
sleep 1
echo "2..."
sleep 1
echo "1..."
sleep 1
echo ""

# Start the development server
now-cli develop --open

echo ""
echo "👋 Development server stopped"
