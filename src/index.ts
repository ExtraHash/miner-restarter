import log from "electron-log";
import { loadEnv } from "./utils/loadEnv";
import axios from "axios";
import { sleep } from "./utils/sleep";
import { getInfo } from "./utils/getInfo";
import { reboot } from "./utils/reboot";
import {
    ETH_ADDRESS,
    EXPECTED_MIN_HASHRATE,
    MINUTE,
    WORKER_NAME,
} from "./constants";
import { Stack } from "./Stack";
import chalk from "chalk";
import { average } from "./utils/average";

async function main() {
    log.info(`Beginning monitoring of ${ETH_ADDRESS} ${WORKER_NAME}`);

    const onlineStack = new Stack<boolean>(10);
    const hashrateStack = new Stack<number>(10);

    while (true) {
        const workerInfo = await getInfo();
        onlineStack.push(workerInfo.isOnline);
        hashrateStack.push(workerInfo.reportedHashrate);

        // check if worker is offline last 10 checks
        if (
            onlineStack.isFull() &&
            onlineStack.getArray().every((value) => {
                return value === false;
            })
        ) {
            log.warn(chalk.red.bold("Worker is offline."));
            await reboot();
        }

        const avgHashrate = average(hashrateStack.getArray());

        if (
            hashrateStack.isFull() &&
            average(hashrateStack.getArray()) < EXPECTED_MIN_HASHRATE
        ) {
            log.warn(
                chalk.yellow.bold(
                    "Worker is reporting lower than expected hashrate."
                )
            );
            await reboot();
        }

        log.info(
            chalk.bold.cyan(
                `Average ETH speed: ${(avgHashrate / 1000000).toFixed(2)} MH/s`
            )
        );
        await sleep(0.1 * MINUTE);
    }
}

main();
