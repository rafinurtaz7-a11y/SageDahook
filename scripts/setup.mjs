#!/usr/bin/env node
import {exec} from 'child_process';
import os from 'os';
import readline from 'readline';

const OLLAMA_URL = 'https://ollama.com/download';
const MODEL_NAME = 'llama3';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function isOllamaInstalled() {
  try {
    await runCommand('ollama --version');
    return true;
  } catch (error) {
    return false;
  }
}

async function pullModel() {
  console.log(`Pulling '${MODEL_NAME}' model. This may take a while...`);
  try {
    await runCommand(`ollama pull ${MODEL_NAME}`);
    console.log(`'${MODEL_NAME}' model pulled successfully.`);
  } catch (error) {
    console.error(`Error pulling model: ${error.message}`);
    console.error(
      'Please ensure Ollama is running and try running the script again.'
    );
  }
}

async function main() {
  console.log('Checking for Ollama installation...');
  if (await isOllamaInstalled()) {
    console.log('Ollama is installed.');
    await pullModel();
  } else {
    console.log('Ollama is not installed.');
    const platform = os.platform();
    if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
      console.log(`Please download and install Ollama from: ${OLLAMA_URL}`);
      rl.question('Press Enter to open the download page...', () => {
        import('open').then(open => {
          open.default(OLLAMA_URL);
          console.log(
            'After installing Ollama, please run this script again.'
          );
          rl.close();
        });
      });
    } else {
      console.log(
        `Unsupported platform: ${platform}. Please install Ollama manually from ${OLLAMA_URL}`
      );
      rl.close();
    }
  }
}

main();
