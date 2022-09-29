"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solcWorker = void 0;
function solcWorker() {
    var ctx = self;
    ctx.addEventListener('message', function (_a) {
        var data = _a.data;
        importScripts(data.version);
        // const solc = wrapper((ctx as any).Module);
        var soljson = ctx.Module;
        if ('_solidity_compile' in soljson) {
            var compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number']);
            var output = JSON.parse(compile(data.input));
            postMessage(output);
        }
    });
}
exports.solcWorker = solcWorker;
function importScripts(arg0) {
    throw new Error('Function not implemented.');
}
if (window !== self) {
    solcWorker();
}
//# sourceMappingURL=solc.worker.js.map