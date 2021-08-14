import axios from "axios";
import log from "electron-log";
import { ETH_ADDRESS, WORKER_NAME } from "../constants";

export async function isOnline(): Promise<boolean> {
    const res = await axios.get(
        `https://api.flexpool.io/v2/miner/workers?coin=eth&address=${ETH_ADDRESS}`
    );

    if (res.data.error !== null) {
        log.warn("Flexpool API returned error");
        return false;
    }

    // check if given worker name is greater than 0
    for (const worker of res.data.result) {
        if (worker.name === WORKER_NAME) {
            return worker.isOnline;
        }
    }

    return false;
}
