# Browser Solidity Compiler
Browser solidity compiler lets you use [solidity compiler](https://github.com/ethereum/solidity) in your javascript libraries such as reactjs.


### Installation
`npm i browser-solidity-compiler`

### Usage with reactjs
```
import { useEffect } from 'react'
import { solidityCompiler, getCompilerVersions } from "browser-solidity-compiler";

interface SolidityVersions {
  releases: { [version: number]: [path: string] };
  latestRelease: string;
  builds: { version: number, path: string }[];
}



  // load the available versions of solidity compilers from https://binaries.soliditylang.org/bin/list.json
  useEffect(() => {
    (async () => {
      const { releases, latestRelease, builds } =
        (await getCompilerVersions()) as SolidityVersions;
      setSolcVersions({
        releases,
        latestRelease,
        builds: builds.map(({ version, path }) => ({ [version]: path })),
      });

    })();
  }, []);


const ContractDeployer = () => {
  const [solcVersions, setSolcVersions] = useState({
    releases: {},
    latestRelease: "",
    builds: [],
  });
  const [compiledContract, setCompiledContract] = useState({ sources: null, contracts: null, errors: null })

  const handleCompile = () => {
    const compiled = await solidityCompiler({
      version: `https://binaries.soliditylang.org/bin/${solcVersions.releases[0.8.0]}`,
      contractBody: 'contract C { function f() public { } }',
    })

    setCompiledContract(compiled)
  }

  return(
    <button onClick={handleCompile}>Deploy</button>
  )


}



```


