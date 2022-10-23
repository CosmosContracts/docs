---
description: >-
  In this section, we will gear up your workspace for developing, deploying and
  enjoying smart contracts on Cosmos SDK.
cover: >-
  ../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (20).png
coverY: 0
---

# Smart Contracts Installation

{% hint style="info" %}
For developing complex smart contracts, you will likely want to run a full node on a testnet. See the validators section under [Joining Testnets](../validators/joining-the-testnets.md) for more information.
{% endhint %}

## Go

You can setup golang by following the [official documentation](https://github.com/golang/go/wiki#working-with-go). The latest versions of `junod` require go version `v1.17`.

## Rust

Assuming you have never worked with rust, you will first need to install some tooling. The standard approach is to use `rustup` to maintain dependencies and handle updating multiple versions of `cargo` and `rustc`, which you will be using.

## Installing Rust on Linux and Mac

Even if you are on Windows, you should use WSL and Linux to develop. It will make life a lot easier.

First, [install rustup](https://rustup.rs/). Once installed, make sure you have the wasm32 target:

```bash
rustup default stable
cargo version
# If this is lower than 1.59.0+, update
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

## Building Juno

A testnet running [the Juno chain](https://github.com/CosmosContracts/Juno) is usually in operation for you to test contracts on. Generally speaking though, it's quicker to work locally. We recommend using Juno in Docker as per the instructions below.

{% content-ref url="junod-local-dev-setup.md" %}
[junod-local-dev-setup.md](junod-local-dev-setup.md)
{% endcontent-ref %}

{% hint style="info" %}
If you have any problems here, check your `PATH`. `make install` will copy `junod` to `$HOME/go/bin` by default, please make sure that is set up in your `PATH` as well, which should be the case in general for building Go code from source.
{% endhint %}

## Getting started with writing contracts

There are two tutorials provided here in the docs, which will give you an overview of working with smart contracts and their basic functions. However if you are an experienced programmer wanting to immediately start writing CosmWasm contracts, then we recommend [working through their excellent tutorial](https://docs.cosmwasm.com/dev-academy/develop-smart-contract/intro).
