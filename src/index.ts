import { browserSolidityCompiler } from './browser.solidity.worker'
import { createCompileInput } from './helpers'

const worker = new Worker(URL.createObjectURL(new Blob([`(${browserSolidityCompiler})()`], { type: 'module' })));

export const solidityCompiler = async ({ version, contractBody }: { version: string; contractBody: string }) => {
  const input = createCompileInput(contractBody)
  return new Promise((resolve, reject) => {
    worker.postMessage({ input, version })
    worker.onmessage = function ({ data }) {
      resolve(data);
    };
    worker.onerror = reject;
  });
}

export const getCompilerVersions = async () => {
  return new Promise((resolve, reject) => {
    worker.postMessage('fetch-compiler-versions')
    worker.onmessage = function ({ data }) {
      resolve(data);
    };
    worker.onerror = reject;
  });
}