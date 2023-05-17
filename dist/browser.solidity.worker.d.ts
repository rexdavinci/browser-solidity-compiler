declare global {
    interface Worker {
        Module: any;
    }
}
declare function browserSolidityCompiler(): void;
export { browserSolidityCompiler };
