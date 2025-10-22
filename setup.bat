@echo off
echo Installing project dependencies...
call npm install

echo Running setup script to check for Ollama and download models...
call npm run setup

echo.
echo Setup complete!
echo You can now start the application by running: npm run dev
pause
