import log from "electron-log";
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
    const hashrateHistory = new Stack<number>(10);

    while (true) {
        const workerInfo = await getInfo();
        hashrateHistory.push(workerInfo.reportedHashrate);
        const avgHashrate = average(hashrateHistory.getArray());

        if (
            hashrateHistory.isFull() &&
            avgHashrate < EXPECTED_MIN_HASHRATE &&
            hashrateHistory.peek() < EXPECTED_MIN_HASHRATE
        ) {
            log.warn(
                chalk.yellow.bold(
                    "Worker is reporting lower than expected hashrate. Rebooting."
                )
            );
            await reboot();
        }

        if (hashrateHistory.peek() > EXPECTED_MIN_HASHRATE * 2) {
            log.warn("Worker is reporting >2x expected hashrate. Rebooting.");
            await reboot();
        }

        log.info(
            chalk.bold.cyan(
                `Average ETH speed: ${(avgHashrate / 1000000).toFixed(2)} MH/s`
            )
        );
        await sleep(1 * MINUTE);
    }
}

main();
