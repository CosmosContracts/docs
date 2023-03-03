---
description: How to Compile CosmWasm Smart Contracts
---

# Compile a Contract

[This guide is from the official CosmWasm/rust-optimizer repository](https://github.com/CosmWasm/rust-optimizer). This method of compiling the contract will optimize the final build so that it reduces gas consumption.

Example contracts for this can be found at [https://github.com/CosmWasm/cw-examples](https://github.com/CosmWasm/cw-examples). This repository [requires this section to compile](compile-a-contract.md#multiple-contract-repository-mono-repo) since multiple contracts are involved in a single repository.

{% hint style="info" %}
If you have ZERO experience with smart contracts, you need to check out [book.cosmwasm.com](https://book.cosmwasm.com) for setting up your envirioment, testnet, and the basics of CosmWasm
{% endhint %}

## Single Contract Repository

The easiest way is to simply use the [published docker image](https://hub.docker.com/r/cosmwasm/rust-optimizer). You must run this in the root of the smart contract repository you wish to compile. It will produce an `artifacts` directory with `<crate_name>.wasm` and `contracts.txt` containing the hashes. This is just one file.

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.11

# If you you use an ARM machine (Ex: Mac M1), you need to use the following
# This is experimental and should not be used for production use
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer-arm64:0.12.11
```

By running this in the root of your project, it will compile your contract into an artifacts/ folder. From here you can upload it to chain, collect the store code, and interact with it as you design

## Multiple Contract Repository (Mono Repo)

Sometime you want many contracts to be related and import common functionality. This is exactly the case of [`cosmwasm-plus`](https://github.com/CosmWasm/cosmwasm-plus). In such a case, we can often not just compile from root, as the compile order is not deterministic and there are feature flags shared among the repos. This has lead to [issues in the past](https://github.com/CosmWasm/rust-optimizer/issues/21).

For this use-case there is second docker image, which will compile all the `contracts/*` folders inside the workspace and do so one-by-one in alphabetical order. It will then add all the generated wasm files to an `artifacts` directory with a checksum, just like the basic docker image (same output format).

To compile all contracts in the workspace deterministically, you can run:

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.11

# If you you use an ARM machine (Ex: Mac M1), you need to use the following
# This is experimental and should not be used for production use
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer-arm64:0.12.11
```

**NOTE**: See the difference with **workspace-optimizer** vs **rust-optimizer** in the previous single contract example.\
