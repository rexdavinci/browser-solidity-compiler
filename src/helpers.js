export const createCompileInput = (contractBody, options) => {
  const CompileInput = {
    language: 'Solidity',
    sources: {
      'Compiled_Contracts': {
        content: contractBody
      }
    },
    settings: {
      ...options,
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
  return JSON.stringify(CompileInput);
}