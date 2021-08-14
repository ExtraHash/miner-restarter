import log from "electron-log";
import { loadEnv } from "./utils/loadEnv";
import axios from "axios";
import { sleep } from "./utils/sleep";
import { isOnline } from "./utils/isOffline";
import { reboot } from "./utils/reboot";
import { ETH_ADDRESS, WORKER_NAME } from "./constants";

async function main() {
    log.info(`Beginning monitoring of ${ETH_ADDRESS} ${WORKER_NAME}`);
    
    while (true) {
        if (!(await isOnline())) {
            log.warn("Worker is offline. Checking again in ten minutes.");
            await sleep(60000 * 10);
            if (!(await isOnline())) {
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
