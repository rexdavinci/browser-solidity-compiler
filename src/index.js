// solidityCompiler.js
import { browserSolidityCompiler } from './browser.solidity.worker';
import { createCompileInput } from './helpers';

let currentId = 0;

export const solidityCompiler = async ({ version, contractBody, options }) => {
  const worker = new Worker(URL.createObjectURL(new Blob([`(${browserSolidityCompiler})()`], { type: 'module' })));
  const input = createCompileInput(contractBody, options);
  const id = currentId++;

  return new Promise((resolve, reject) => {
    const handleMessage = ({ data }) => {
      const { id: responseId, result } = data;
      if (responseId === id) {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        worker.terminate();
        resolve(result);
      }
    };

    const handleError = (err) => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      worker.terminate();
      reject(err);
    };

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);

    worker.postMessage({ id, input, version });
  });
};

export const getCompilerVersions = async () => {
  const worker = new Worker(URL.createObjectURL(new Blob([`(${browserSolidityCompiler})()`], { type: 'module' })));
  const id = currentId++;
  return new Promise((resolve, reject) => {
    const handleMessage = ({ data }) => {
      const { id: responseId, result } = data;
      if (responseId === id) {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        worker.terminate();
        resolve(result);
      }
    };

    const handleError = (err) => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      worker.terminate();
      reject(err);
    };

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);

    worker.postMessage({ id, command: 'fetch-compiler-versions'  });
  });
};
