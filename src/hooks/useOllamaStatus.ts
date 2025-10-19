import {useState, useEffect} from 'react';

export function useOllamaStatus() {
  const [isOllamaRunning, setIsOllamaRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOllamaStatus = async () => {
      try {
        const response = await fetch('/api/ollama-status');
        const data = await response.json();
        setIsOllamaRunning(data.isRunning);
      } catch (error) {
        setIsOllamaRunning(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOllamaStatus();
  }, []);

  return {isOllamaRunning, isLoading};
}
