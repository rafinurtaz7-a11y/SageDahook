# Local-First AI Application

This is a Next.js starter application for a local-first, offline AI application. It uses Genkit and Ollama to run open-source models directly on your machine.

## Features

- **Offline AI Chat:** Chat with a powerful language model without an internet connection.
- **Local Models:** Powered by Ollama, allowing you to use a variety of open-source models.
- **Extensible:** Built with Genkit, making it easy to add new AI flows and capabilities.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [Ollama](https://ollama.com/)

### Installation (Windows)

For Windows users, simply double-click the `setup.bat` file in the repository's root directory. This will automatically install all necessary dependencies and guide you through the Ollama model setup.

Once the setup is complete, you can start the application by running:

```bash
npm run dev
```

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

    This script will check if you have Ollama installed. If not, it will guide you to the download page. It will then download the `llama3` model for you.

    ```bash
    npm run setup
    ```

4.  **Start the application:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).
