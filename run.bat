@echo off
echo Starting the application server...
echo The application will open in your browser automatically.
echo You can also access it at http://localhost:9002

REM Start the server in the background
start "Next.js Server" npm run dev

REM Give the server a few seconds to start up
timeout /t 5 /nobreak > nul

REM Open the URL in the default browser
start "" http://localhost:9002

pause
