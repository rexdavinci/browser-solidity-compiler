# Browser Solidity Compiler
Inspired by https://github.com/ethereum/solc-js, This browser solidity compiler works in your browser environments built with Reactjs, vueJS etc.

### Installation
```
npm i @agnostico/solidity-compiler
```

or with yarn
```
yarn add @agnostico/solidity-compiler
```

### Then import your application
```
import { solidityCompiler, getCompilerVersions } from "@agnostico/solidity-compiler";
```
##### To load available solidity versions from https://binaries.soliditylang.org/bin/list.json

```
await getCompilerVersions()
```
This returns an object containing
1. Release versions
2. Latest release version
3. Builds (releases + nightly versions)

##### To compile a contract
```
await solidityCompiler({
  version: `https://binaries.soliditylang.org/bin/${version}`,
  contractBody: content,
  options,
})
```

| Name | Type | Required | Default
|-|-|-|-|
| version | `string` | Yes | 
| contractBody | `string` | Yes |
| options | `object` | No | { } |

The options parameter currently ONLY supports the choice to add optimization

```
options.optimizer = {
  enabled: boolean,
  runs: number,
}
```

[example](https://github.com/rexdavinci/browser-solidity-compiler/tree/example)




