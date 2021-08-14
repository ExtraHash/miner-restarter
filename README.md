# miner-restarter

monitors flexpool API and restarts the machine if it finds the worker is offline

## env file example

```env
WORKER_NAME = RIG_NAME_HERE
ETH_ADDRESS = ETH_ADDRESS_HERE
EXPECTED_MIN_HASHRATE = 54000000
```

The expected minimum hashrate in this example is equivalent to 54 MH/s. If the reported hashrate drops below this, or if the worker goes offline, it will check again after ten minutes. If the condition is still true, the machine will be rebooted.

Should work on windows and linux, untested on macOS.
