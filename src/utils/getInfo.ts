import axios from "axios";
import log from "electron-log";
import { ETH_ADDRESS, WORKER_NAME } from "../constants";
import { WorkerInfo } from "../types";

const emptyWorker: WorkerInfo = {
    name: WORKER_NAME,
    isOnline: false,
    count: 1,
    reportedHashrate: 0,
    currentEffectiveHashrate: 0,
    averageEffectiveHashrate: 0,
    validShares: 0,
    staleShares: 4,
    invalidShares: 1,
    lastSeen: 0,
};

export async function getInfo(): Promise<WorkerInfo> {
    try {
        const res = await axios.get(
            `https://api.flexpool.io/v2/miner/workers?coin=eth&address=${ETH_ADDRESS}`
        );

        if (res.data.error !== null) {
            log.warn("Flexpool API returned error");
            return emptyWorker;
        }

        // check if given worker name is greater than 0
        for (const worker of res.data.result) {
            if (worker.name === WORKER_NAME) {
                return worker;
            }
        }

        return emptyWorker;
    } catch (err) {
        log.error(err.toString());
        return emptyWorker;
    }
}
