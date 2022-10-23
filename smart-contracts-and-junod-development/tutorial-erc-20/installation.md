---
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (1) (20).png
coverY: 0
---

# Installation

Follow the steps on the [installation page](../installation.md).

The short version is that you will need rust and `junod` available.

## Rust

Assuming you have never worked with rust, you will first need to install some tooling. The standard approach is to use `rustup` to maintain dependencies and handle updating multiple versions of `cargo` and `rustc`, which you will be using.

### Installing Rust in Linux and Mac

First, [install rustup (opens new window)](https://rustup.rs/). Once installed, make sure you have the wasm32 target:

```
rustup default stable
cargo version
# If this is lower than 1.49.0+, update
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

## Using Juno Testnets

A Juno testnet [https://github.com/CosmosContracts/Juno](https://github.com/CosmosContracts/Juno) has been launched to save you the hassle of running a local network and speed up your development.

That said, many users will want to run a local node. Check out this guide to get set up with a single command:

{% content-ref url="../junod-local-dev-setup.md" %}
[junod-local-dev-setup.md](../junod-local-dev-setup.md)
{% endcontent-ref %}

Use go 1.16.3+ for compiling`junod`executable if you are building from source. If you already are running a validator node, it's likely `junod` is already accessible. If `which junod` shows output, then you're probably good to go.

```bash
# clone juno repo
git clone https://github.com/CosmosContracts/juno.git && cd juno

git fetch --tags
git checkout v10.1.0

# build juno executable
make install
```

You will probably also want to ensure you have `jq` installed.
