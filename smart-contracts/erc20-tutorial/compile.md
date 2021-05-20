---
order: 3
description: Now we're going to download a contract, compile it, and upload it to the Juno chain.
---

# Download, compile and store

## Download

We're going to grab the `cosmwasm-examples` repo and compile our chosen contract.

```bash
# get the code
git clone https://github.com/CosmWasm/cosmwasm-examples
cd cosmwasm-examples
git fetch
git checkout escrow-0.7.0 # this is a known working branch, even though we're not using escrow
cd erc20
```

## Compile

We can compile our contract like so:

```
# compile the wasm contract with stable toolchain
rustup default stable
cargo wasm
```

However, we want to create an optimised version to limit gas usage, so we're going to run:

```sh
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.10.7
```

This will result in an artifact called `cw_erc20.wasm` being created in the `artifacts` directory.

## Uploading

You can now upload, or 'store' this to the chain via your local node.

```sh
cd artifacts
junod tx wasm store cw_erc20.wasm  --from <your-key> --chain-id=<chain-id> --gas auto
```