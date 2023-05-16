"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserSolidityCompiler = void 0;
function browserSolidityCompiler() {
    var ctx = self;
    ctx.addEventListener('message', function (_a) {
        var data = _a.data;
        if (data === 'fetch-compiler-versions') {
            fetch('https://binaries.soliditylang.org/bin/list.json').then(function (response) { return response.json(); }).then(function (result) {
                postMessage(result);
            });
        }
        else {
            importScripts(data.version);
            var soljson = ctx.Module;
            if ('_solidity_compile' in soljson) {
                var compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number']);
                var output = JSON.parse(compile(data.input));
                postMessage(output);
            }
        }
    });
}
exports.browserSolidityCompiler = browserSolidityCompiler;
function importScripts(_arg0) {
    throw new Error('Function not implemented.');
}
if (window !== self) {
    browserSolidityCompiler();
}
//# sourceMappingURL=browser.solidity.worker.js.map