import { loadEnv } from "./utils/loadEnv";

// load the environment variables
loadEnv();
export const { WORKER_NAME, ETH_ADDRESS } = process.env as {
    WORKER_NAME: string;
    ETH_ADDRESS: string;
};
