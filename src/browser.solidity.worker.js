(function () {
  if (typeof global === "object") {
    if (!global.Worker) {
      global.Worker = {};
    }
    global.Worker.Module = undefined;
  }

  function browserSolidityCompiler() {
    // eslint-disable-next-line no-restricted-globals
    var ctx = self;

    ctx.addEventListener('message', ({ data }) => {
      const { id, input, version } = data;
      if (input === 'fetch-compiler-versions') {
        fetch('https://binaries.soliditylang.org/bin/list.json')
          .then(response => response.json())
          .then(result => {
            postMessage({ id, result });
          })
          .catch(error => {
            postMessage({ id, error: error.message });
          });
      } else {
        ctx.importScripts(version);
        const soljson = ctx.Module;
        if ('_solidity_compile' in soljson) {
          const compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number']);
          const output = JSON.parse(compile(input));
          postMessage({ id, result: output });
        }
      }
    });
  }


  function importScripts(_arg0) {
    throw new Error("Function not implemented.");
  }
  // eslint-disable-next-line no-restricted-globals
  if (window !== self) {
    browserSolidityCompiler();
  }

  if (typeof exports === "object") {
    exports.browserSolidityCompiler = browserSolidityCompiler;
  }
})();
