@echo off

REM Check for Node.js and npm
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Node.js is required to run this application.
    echo.
    echo Please download and install it from the official website.
    echo The download page will now be opened in your browser...
    start "" "https://nodejs.org/en/download"
    pause
    exit /b
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in your PATH.
    echo npm is required to run this application and is usually installed with Node.js.
    echo.
    echo Please download and install Node.js from the official website.
    echo The download page will now be opened in your browser...
    start "" "https://nodejs.org/en/download"
    pause
    exit /b
)

echo Installing project dependencies...
call npm install

echo Running setup script to check for Ollama and download models...
call npm run setup

echo.
echo Setup complete!
echo You can now start the application by double-clicking the 'run.bat' file.
pause
