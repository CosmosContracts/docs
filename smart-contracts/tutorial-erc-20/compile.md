---
description: >-
  Now we're going to download a contract, compile it, and upload it to the Juno
  chain.
---

# Download, Compile, Store

## Download

We're going to grab the `cosmwasm-examples` repo and compile our chosen contract.

```bash
# get the code
git clone https://github.com/CosmWasm/cosmwasm-examples
cd cosmwasm-examples
git fetch
git checkout 44d6a256cd99e66849e550185c98671d4109d78b # current at time of writing, should be cw 1.0.0-beta
cd contracts/erc20
```

## Compile

We can compile our contract like so:

```
# compile the wasm contract with stable toolchain
rustup default stable
cargo wasm
```

However, we want to create an optimised version to limit gas usage, so we're going to run:

```bash
sudo docker run --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    cosmwasm/rust-optimizer:0.11.4
```

This will result in an artifact called `cw_erc20.wasm` being created in the `artifacts` directory.

## Uploading

You can now upload, or 'store' this to the chain via your local node.

```bash
cd artifacts
junod tx wasm store cw_erc20.wasm  --from <your-key> --chain-id=<chain-id> --gas auto
```

{% hint style="info" %}
You will need to look in the output for this command for the code ID of the contract. In the JSON, it will look like `{"key":"code_id","value":"6"}` in the output.
{% endhint %}

Alternatively, you can capture the output of the command run above, by doing these steps instead, and use the `jq` tool installed earlier to get the `code_id` value:

```bash
cd artifacts
RES=$(junod tx wasm store cw_erc20.wasm  --from <your-key> --chain-id=<chain-id> --gas auto -y)
CODE_ID=$(echo $RES | jq -r '.logs[0].events[0].attributes[-1].value')
```

You can now see this value with:

```bash
echo $CODE_ID
```
