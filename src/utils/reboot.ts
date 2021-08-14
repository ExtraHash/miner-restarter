import os from "os";
import log from "electron-log";
import { exec } from "child_process";
import path from "path";

export async function reboot(): Promise<void> {
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
