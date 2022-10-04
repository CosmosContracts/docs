---
description: Walking before we can run...
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (23).png
coverY: 0
---

# Download, Compile, Store

First, we need to download the code from [cosmwasm-plus](https://github.com/CosmWasm/cosmwasm-plus).

### Download

Run the following to download the correct tag and extract it. `ls` should show you the folder is present once it's unpacked. You can also use `git` instead of `wget` if you prefer.

```bash
git clone https://github.com/CosmWasm/cw-plus.git

git fetch --tags

git checkout v0.9.2

cd contracts/cw1-subkeys
```

### Compile

Unlike before, where we compiled just the one contract, we'll compile all of them, since we may want to experiment with others. Run this at the root of the `cosmwasm-plus` folder:

```bash
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.6
```

### Store

When compiling is complete (it will take a while) `cd` into the `artifacts` directory. `ls` should show you binaries for each of the contracts have been created. The one we care about is `cw1_subkeys.wasm`.

To store this on-chain, we use a similar command to last time:

```bash
junod tx wasm store cw1_subkeys.wasm  --from <your-key> --chain-id <chain-id> \
  --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 -b block -y
```

Also like last time, look in the JSON output for the `code_id` value. If you would prefer to capture this as a shell variable, for the previous step you can instead do:

```bash
cd artifacts
TX=$(junod tx wasm store cw1_subkeys.wasm  --from <your-key> --chain-id=<chain-id> --gas auto --output json -y | jq -r '.txhash')
CODE_ID=$(junod query tx $TX --output json | jq -r '.logs[0].events[-1].attributes[0].value')
```
