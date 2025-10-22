#!/usr/bin/env node
import { exec, spawn } from 'child_process';
import os from 'os';
import readline from 'readline';
import fs from 'fs';
import path from 'path';

const OLLAMA_URL = 'https://ollama.com/download';
const DEFAULT_MODEL = 'deepseek-llm';
const CONFIG_PATH = path.resolve(process.cwd(), 'config.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: options.stdio || 'inherit' });
    let stdout = '';
    if (options.stdio === 'pipe') {
      child.stdout.on('data', (data) => (stdout += data.toString()));
    }
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    child.on('error', (err) => reject(err));
  });
}

async function isOllamaInstalled() {
  try {
    await new Promise((resolve, reject) => {
      exec('ollama --version', (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function getInstalledModels() {
  try {
    const output = await runCommand('ollama', ['list'], { stdio: 'pipe' });
    const lines = output.split('\n').slice(1); // Skip header
    return lines.map(line => line.split(/\s+/)[0]).filter(Boolean);
  } catch (error) {
    console.error('Could not check for installed models. Is Ollama running?');
    return [];
  }
}

async function pullModel(modelName) {
  console.log(`Pulling '${modelName}' model. This may take a while...`);
  try {
    await runCommand('ollama', ['pull', modelName]);
    console.log(`'${modelName}' model pulled successfully.`);
    return true;
  } catch (error) {
    console.error(`Error pulling model: ${error.message}`);
    console.error('Please ensure Ollama is running and try running the script again.');
    return false;
  }
}

function saveConfig(modelName) {
  const config = { model: modelName };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(`Application configured to use '${modelName}'.`);
}

async function main() {
  console.log('Checking for Ollama installation...');
  if (!(await isOllamaInstalled())) {
    console.log('Ollama is not installed.');
    console.log(`Please download and install Ollama from: ${OLLAMA_URL}`);
    await new Promise(resolve => {
        rl.question('Press Enter to open the download page...', () => {
        import('open').then(open => {
          open.default(OLLAMA_URL);
          console.log('After installing Ollama, please run this script again.');
          rl.close();
          resolve();
        });
      });
    })
    return;
  }

  console.log('Ollama is installed.');
  const installedModels = await getInstalledModels();
  let modelToUse;

  if (installedModels.length > 0) {
    modelToUse = installedModels[0];
    console.log(`Found installed model: '${modelToUse}'. Using it as the default.`);
  } else {
    console.log(`No local models found. Downloading the default model: '${DEFAULT_MODEL}'.`);
    const success = await pullModel(DEFAULT_MODEL);
    if (success) {
      modelToUse = DEFAULT_MODEL;
    } else {
      console.error('Failed to download the default model. Please try again.');
      rl.close();
      return;
    }
  }

  saveConfig(modelToUse);
  rl.close();
}

main();
