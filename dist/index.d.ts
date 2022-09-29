export declare const solidityCompiler: ({ version, contractBody }: {
    version: string;
    contractBody: string;
}) => Promise<unknown>;
export declare const getCompilerVersions: () => Promise<unknown>;
