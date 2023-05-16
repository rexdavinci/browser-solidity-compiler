import { browserSolidityCompiler } from './browser.solidity.worker'
import { createCompileInput } from './helpers'

const worker = new Worker(URL.createObjectURL(new Blob([`(${browserSolidityCompiler})()`], { type: 'module' })));

export const solidityCompiler = async ({ version, contractBody, options }: { version: string; contractBody: string; options?: { optimizer?: { enabled: boolean; runs: number } } }) => {
  const input = createCompileInput(contractBody, options)
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