import { loadEnv } from "./utils/loadEnv";

// load the environment variables
loadEnv();

export const { WORKER_NAME, ETH_ADDRESS } = process.env as {
    WORKER_NAME: string;
    ETH_ADDRESS: string;
};

export const EXPECTED_MIN_HASHRATE = Number.parseInt(
    process.env.EXPECTED_MIN_HASHRATE!,
    10
);

export const MINUTE = 1000 * 60;
