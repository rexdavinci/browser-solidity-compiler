declare global {
  interface Worker {
    Module: any;
  }
}
function browserSolidityCompiler() {
  const ctx: Worker = self as any;

  ctx.addEventListener('message', ({ data }) => {
    if (data === 'fetch-compiler-versions') {
      fetch('https://binaries.soliditylang.org/bin/list.json').then(response => response.json()).then(result => {
        postMessage(result)
      })
    } else {
      importScripts(data.version);
      const soljson = ctx.Module;

      if ('_solidity_compile' in soljson) {
        const compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number']);
        const output = JSON.parse(compile(data.input))
        postMessage(output)
      }
    }
  });
}

function importScripts(arg0: string) {
  throw new Error('Function not implemented.');
}

if (window !== self) {
  browserSolidityCompiler();
}

export { browserSolidityCompiler }