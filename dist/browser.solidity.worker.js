"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserSolidityCompiler = browserSolidityCompiler;
function browserSolidityCompiler() {
    var ctx = self;
    ctx.addEventListener('message', function (_a) {
        var data = _a.data;
        var id = data.id, input = data.input, version = data.version;
        if (input === 'fetch-compiler-versions') {
            fetch('https://binaries.soliditylang.org/bin/list.json')
                .then(function (response) { return response.json(); })
                .then(function (result) {
                postMessage({ id: id, result: result });
            })
                .catch(function (error) {
                postMessage({ id: id, error: error.message });
            });
        }
        else {
            importScripts(version);
            var soljson = ctx.Module;
            if ('_solidity_compile' in soljson) {
                var compile = soljson.cwrap('solidity_compile', 'string', [
                    'string',
                    'number',
                ]);
                var output = JSON.parse(compile(input));
                postMessage({ id: id, result: output });
            }
        }
    });
}
if (typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope) {
    browserSolidityCompiler();
}
//# sourceMappingURL=browser.solidity.worker.js.map