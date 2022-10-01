import React, { useState, useEffect } from 'react';
import {
  getCompilerVersions,
  solidityCompiler,
} from '@agnostico/browser-solidity-compiler';
import './App.css';

type BuildType = { version: string; path: string };
type VersionType = { [version: string]: string };

function App() {
  const [solcVersions, setSolcVersions] = useState<any>(null);
  const [compiledContract, setCompiledContract] = useState<{
    errors: { formattedMessage: string }[];
    sources: any;
    contracts: any;
  }>({ errors: [], sources: null, contracts: null });
  const [optimizeOption, setOptimizer] = useState({
    optimize: false,
    runs: 200,
  });
  const [usingVersion, setUsingVersion] = useState('');
  const [content, setContent] = useState(
    `
    contract C { 
      function f() public { } 
    }

    contract D {
      function g() public { }
    }
    `
  );

  // loads the available versions of solidity compilers from https://binaries.soliditylang.org/bin/list.json
  const loadVersions = async () => {
    const { releases, latestRelease, builds } =
      (await getCompilerVersions()) as {
        releases: VersionType;
        latestRelease: string;
        builds: BuildType[];
      };

    setSolcVersions({
      releases,
      latestRelease,
      builds: builds.map(({ version, path }) => ({ [version]: path })),
    });
    setUsingVersion(releases[latestRelease]);
  };

  useEffect(() => {
    (async () => {
      await loadVersions();
    })();
  }, []);

  const handleDeployment = async () => {
    let options = {} as any;

    if (optimizeOption.optimize) {
      options.optimizer = {
        enabled: optimizeOption.optimize,
        runs: optimizeOption.runs,
      };
    }

    let trimContent = content.trim();

    const contractsAvailable = trimContent.match(/contract/g)?.length || 0;

    if (contractsAvailable > 0) {
      const contractNames: string[] = [];

      let index = trimContent.match(/contract/)?.index;

      while (typeof index != 'undefined') {
        trimContent = trimContent.slice(index + 1);
        const fromContract = trimContent.slice(index);
        const contractSelector = trimContent.slice(
          trimContent.indexOf(fromContract),
          fromContract.indexOf('{')
        );
        contractNames.push(contractSelector.trim().split(' ')[1]);
        index = trimContent.match(/contract/)?.index;
      }

      
      try {
        const compiled = (await solidityCompiler({
          version: `https://binaries.soliditylang.org/bin/${usingVersion}`,
          contractBody: content,
          options,
        })) as any;
        
        console.log(compiled);
        setCompiledContract(() => compiled);
      } catch (e: any) {
        if (e.message.includes('failed to load')) {
          setCompiledContract((prev) => ({
            ...prev,
            errors: [
              {
                formattedMessage: `Error: Failed To Load This Compiler's versions`,
              },
            ],
          }));
        }
      }
    }
  };

  return (
    <main>
      <div className="app">
        <div className="raw">
          <textarea defaultValue={content} onChange={(e)=> setContent(e.target.value)}></textarea>
        </div>

        <div className="deployment">
          <button onClick={handleDeployment}>Compile</button>
        </div>

        <div className="compiled">
          <div className="contracts">
            <em>Compiled</em>
            { compiledContract?.contracts?.Compiled_Contracts && Object.keys(compiledContract?.contracts?.Compiled_Contracts).map(
              (cont) => (
                <div key={cont}>
                  <p>{cont}</p>

                  <span>Bytecode</span>: <small>
                    {
                      compiledContract?.contracts?.Compiled_Contracts[cont]?.evm?.bytecode?.object
                    }
                  </small>
                </div>
              )
            )}
          </div>
          <div className="errors">
            <em>Errors</em>
            {compiledContract.errors.length > 0 && (
              <ul>
                {compiledContract?.errors.map((err) => (
                  <li key={err.formattedMessage}>{err.formattedMessage}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="optimizer-setting">
          <em>Settings</em>
          <label className="container">
            Enable Optimization
            <input
              type="checkbox"
              name="runs"
              onChange={(e) =>
                setOptimizer((prev) => ({
                  ...prev,
                  optimize: e.target.checked,
                }))
              }
            />
            <span className="checkmark"></span>
          </label>

          {optimizeOption.optimize && (
            <>
              <label>Enter Number of Runs: </label>
              <input
                type="number"
                defaultValue={optimizeOption.runs}
                onChange={(e) =>
                  setOptimizer((prev) => ({ ...prev, runs: +e.target.value }))
                }
              />
            </>
          )}
        </div>
        <div className="select-version">
          <p>Select Solidity Version</p>
          <label className="container">
            Release Versions only
            <input
              type="checkbox"
              name="only-release-versions"
              checked
              disabled
              onChange={(e) =>
                setOptimizer((prev) => ({
                  ...prev,
                  optimize: e.target.checked,
                }))
              }
            />
            <span className="checkmark"></span>
          </label>
          {solcVersions?.releases && (
            <select
              name="version"
              onChange={(e) =>
                setUsingVersion(solcVersions.releases[e.target.value])
              }
            >
              {Object.keys(solcVersions?.releases).map((option) => (
                <option key={option} value={option}>
                  {option} ({solcVersions.releases[option]})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
