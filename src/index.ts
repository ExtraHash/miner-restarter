import log from "electron-log";
import { loadEnv } from "./utils/loadEnv";
import axios from "axios";
import os from "os";
import { exec } from "child_process";
import path from "path";

// load the environment variables
loadEnv();

const { WORKER_NAME, ETH_ADDRESS } = process.env;
log.info(`Beginning monitoring of ${ETH_ADDRESS} ${WORKER_NAME}`);

if (!WORKER_NAME || !ETH_ADDRESS) {
    log.warn(
        "WORKER_NAME or ETH_ADDRESS missing from .env file. See readme for details."
    );
    process.exit(1);
}

async function sleep(ms: number) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

async function isOffline(): Promise<boolean> {
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
            return !worker.isOnline;
        }
    }

    return false;
}

async function reboot(): Promise<void> {
    switch (os.platform()) {
        case "linux":
            return new Promise((res, rej) => {
                log.warn("Rebooting.");
                exec(path.resolve("./scripts/reboot.sh"), (err) => {
                    if (err != null) {
                        rej(err);
                    }
                    res();
                });
            });
        case "win32":
        default:
            return new Promise((res, rej) => {
                log.warn("Rebooting.");
                exec(path.resolve("./scripts/reboot.bat"), (err) => {
                    if (err != null) {
                        rej(err);
                    }
                    res();
                });
            });
    }
}

async function main() {
    while (true) {
        if (await isOffline()) {
            log.warn("Worker is offline. Checking again in five minutes.");
            await sleep(60000 * 5);
            if (await isOffline()) {
                log.warn("Worker is still offline.");
                await reboot();
            } else {
                log.info("Worker is back online.");
            }
        } else {
            log.info("Worker is still online.");
        }
        await sleep(60000);
    }
}

main();
