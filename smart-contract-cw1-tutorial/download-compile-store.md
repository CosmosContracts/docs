---
description: Walking before we can run...
---

# Download, Compile, Store

First, we need to download the code from [cosmwasm-plus](https://github.com/CosmWasm/cosmwasm-plus).

### Download

Run the following to download the `v0.6.2` tag and extract it. `ls` should show you the folder is present once it's unpacked. You can also use `git` instead of `wget` if you prefer.

```bash
wget https://github.com/CosmWasm/cosmwasm-plus/archive/refs/tags/v0.6.2.tar.gz

tar -xvf v0.6.2.tar.gz

ls

cd cosmwasm-plus-0.6.2
```

### Compile

Unlike before, where we compiled just the one contract, we'll compile all of them, since we may want to experiment with others. Run this at the root of the `cosmwasm-plus` folder:

```bash
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.11.3
```

### Store

When compiling is complete \(it will take a while\) `cd` into the `artifacts` directory. `ls` should show you binaries for each of the contracts have been created. The one we care about is `cw1_subkeys.wasm`.

To store this on-chain, we use a similar command to last time:

```bash
junod tx wasm store cw1_subkeys.wasm  --from <your-key> --chain-id <chain-id> --gas auto
```

Also like last time, look in the JSON output for the `code_id` value. If you would prefer to capture this as a shell variable, for the previous step you can instead do:

```bash
cd artifacts
RES=$(junod tx wasm store cw1_subkeys.wasm  --from <your-key> --chain-id=<chain-id> --gas auto -y)
CODE_ID=$(echo $RES | jq -r '.logs[0].events[0].attributes[-1].value')
```

