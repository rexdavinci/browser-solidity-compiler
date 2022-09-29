"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompileInput = void 0;
var createCompileInput = function (name, content) {
    var _a;
    if (name === void 0) { name = 'Agnostico_Compiled_Contract'; }
    var CompileInput = {
        language: 'Solidity',
        sources: (_a = {},
            _a[name] = {
                content: content
            },
            _a),
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };
    return JSON.stringify(CompileInput);
};
exports.createCompileInput = createCompileInput;
//# sourceMappingURL=helpers.js.map