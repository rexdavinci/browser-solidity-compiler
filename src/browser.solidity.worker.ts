declare global {
  interface Worker {
    Module: any;
  }
}

function browserSolidityCompiler() {
  const ctx: Worker = self as any;

  ctx.addEventListener('message', ({ data }) => {
    const { id, input, version } = data;
    if (input === 'fetch-compiler-versions') {
      fetch('https://binaries.soliditylang.org/bin/list.json')
        .then((response) => response.json())
        .then((result) => {
          postMessage({ id, result });
        })
        .catch((error) => {
          postMessage({ id, error: error.message });
        });
    } else {
      importScripts(version);
      const soljson = ctx.Module;

      if ('_solidity_compile' in soljson) {
        const compile = soljson.cwrap('solidity_compile', 'string', [
          'string',
          'number',
        ]);
        const output = JSON.parse(compile(input));
        postMessage({ id, result: output });
      }
    }
  });
}

if (
  typeof WorkerGlobalScope !== 'undefined' &&
  self instanceof WorkerGlobalScope
) {
  browserSolidityCompiler();
}

export { browserSolidityCompiler };
