# Local-First AI Application

This is a Next.js starter application for a local-first, offline AI application. It uses Genkit and Ollama to run open-source models directly on your machine.

## Features

- **Offline AI Chat:** Chat with a powerful language model without an internet connection.
- **Local Models:** Powered by Ollama, allowing you to use a variety of open-source models.
- **Extensible:** Built with Genkit, making it easy to add new AI flows and capabilities.

## Getting Started

> [!IMPORTANT]
> **You must install [Node.js](https://nodejs.org/en/download) (version 20 or later) and [Ollama](https://ollama.com/) before proceeding.**
> The setup scripts will not work without them.

### Installation (Windows)

For Windows users, the process is simple:
1.  Double-click `setup.bat` to install dependencies and configure your AI model.
2.  Once setup is complete, double-click `run.bat` to start the application.

The application will be available at [http://localhost:9002](http://localhost:9002).

### Installation (macOS/Linux)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the environment:**

    This script will check if you have any Ollama models installed.
    - If you do, it will configure the app to use your first installed model.
    - If you don't, it will download `deepseek-llm` and configure it for you.

    ```bash
    npm run setup
    ```

4.  **Start the application:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).
