@echo off
REM Nusa Media - Quick Start Setup Script for Windows
REM Jalankan script ini untuk setup project dengan cepat

echo.
echo ========================================
echo   Nusa Media - Project Setup
echo ========================================
echo.

REM Check if npm installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ NPM tidak terinstall. Silakan install Node.js terlebih dahulu.
    pause
    exit /b 1
)

echo ✅ NPM tersedia
echo.

REM Install dependencies
echo 📦 Menginstall dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Gagal menginstall dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies terinstall
echo.

REM Check Expo CLI
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Menginstall Expo CLI globally...
    call npm install -g expo-cli
)

echo.
echo ✅ Setup selesai!
echo.
echo 🎯 Langkah selanjutnya:
echo.
echo 1. Mulai development server:
echo    npm start
echo.
echo 2. Jalankan di Android:
echo    npm run android
echo.
echo 3. Jalankan di iOS:
echo    npm run ios
echo.
echo 4. Jalankan di Web:
echo    npm run web
echo.
echo 📱 Atau scan QR code dengan Expo Go app
echo.
echo 📚 Dokumentasi: baca README.md dan IMPLEMENTATION_GUIDE.md
echo.
echo Happy coding! 🎉
echo.
pause
