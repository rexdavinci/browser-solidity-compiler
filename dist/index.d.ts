export declare const solidityCompiler: ({ version, contractBody, options }: {
    version: string;
    contractBody: string;
    options?: {
        optimizer?: {
            enabled: boolean;
            runs: number;
        } | undefined;
    } | undefined;
}) => Promise<unknown>;
export declare const getCompilerVersions: () => Promise<unknown>;
