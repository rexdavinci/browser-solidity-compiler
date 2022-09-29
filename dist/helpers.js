var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var createCompileInput = function (contractBody, options) {
    if (options === void 0) { options = {}; }
    var CompileInput = {
        language: 'Solidity',
        sources: {
            'Compiled_Contracts': {
                content: contractBody
            }
        },
        settings: __assign(__assign({}, options), { outputSelection: {
                '*': {
                    '*': ['*'],
                },
            } }),
    };
    return JSON.stringify(CompileInput);
};
//# sourceMappingURL=helpers.js.map