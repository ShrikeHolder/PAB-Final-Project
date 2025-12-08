#!/bin/bash

# Nusa Media - Quick Start Setup Script
# Jalankan script ini untuk setup project dengan cepat

echo "🚀 Nusa Media - Project Setup"
echo "================================"
echo ""

# Check if npm installed
if ! command -v npm &> /dev/null; then
    echo "❌ NPM tidak terinstall. Silakan install Node.js terlebih dahulu."
    exit 1
fi

echo "✅ NPM tersedia"
echo ""

# Install dependencies
echo "📦 Menginstall dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Gagal menginstall dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies terinstall"
echo ""

# Check Expo CLI
if ! command -v expo &> /dev/null; then
    echo "📥 Menginstall Expo CLI globally..."
    npm install -g expo-cli
fi

echo ""
echo "✅ Setup selesai!"
echo ""
echo "🎯 Langkah selanjutnya:"
echo ""
echo "1. Mulai development server:"
echo "   npm start"
echo ""
echo "2. Jalankan di Android:"
echo "   npm run android"
echo ""
echo "3. Jalankan di iOS:"
echo "   npm run ios"
echo ""
echo "4. Jalankan di Web:"
echo "   npm run web"
echo ""
echo "📱 Atau scan QR code dengan Expo Go app"
echo ""
echo "📚 Dokumentasi: baca README.md dan IMPLEMENTATION_GUIDE.md"
echo ""
echo "Happy coding! 🎉"
