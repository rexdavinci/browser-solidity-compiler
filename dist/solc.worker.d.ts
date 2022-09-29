declare global {
    interface Worker {
        Module: any;
    }
}
declare function solcWorker(): void;
export { solcWorker };
