---
description: >-
  In this section, we will gear up your workspace for developing, deploying and
  enjoying smart contracts on Cosmos SDK.
---

# Installation

## Go

You can setup golang by following the [official documentation](https://github.com/golang/go/wiki#working-with-go). The latest versions of `junod` require go version `v1.16`.

## Rust

Assuming you have never worked with rust, you will first need to install some tooling. The standard approach is to use `rustup` to maintain dependencies and handle updating multiple versions of `cargo` and `rustc`, which you will be using.

## Installing Rust in Linux and Mac

First, [install rustup](https://rustup.rs/). Once installed, make sure you have the wasm32 target:

```bash
rustup default stable
cargo version
# If this is lower than 1.49.0+, update
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

## Installing Rust in Windows 10

{% hint style="info" %}
If working on a validator or a server, you should use Linux if possible. You will have a much better time...
{% endhint %}

First, download and execute `rustup-init.exe` from [rustup.rs](https://rustup.rs/) or [rust-lang.org](https://www.rust-lang.org/tools/install).

If requested, manually download and install Visual C++ Build Tools 2019, from [here](https://visualstudio.microsoft.com/visual-cpp-build-tools). Make sure "Windows 10 SDK" and "English language pack" are selected.

Continue running `rustup-init.exe`, and proceed with the installation.

Optionally:

* Download and install [gvim](https://www.vim.org/download.php#pc), and modify the Env vars to add &lt;gvim folder&gt; to the PATH.
* Download and install [git for windows](https://git-scm.com/download/win). Modify the Env vars to add &lt;git folder&gt;\bin to PATH.
* Turn on Developer Mode \(Settings -&gt; Update and Security: For Developers\) and enable Device Discovery, to be able to [access the Windows 10 server through ssh](https://www.ctrl.blog/entry/how-to-win10-ssh-service.html#section-mssshserv-enable).

Install the wasm32 target:Copy

```bash
rustup default stable
cargo version
# If this is lower than 1.49.0, update
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

For those new to rust, the `stable` channel comes out every 6 weeks with a stable release.

## Building Juno for testnet use

A testnet running [the Juno chain](https://github.com/CosmosContracts/Juno) has been launched to save you of the hassle of running a local network and speed up your development.

Use go 1.16.3 for compiling the `junod`executable if you are building from source. If you already are running a validator node, it's likely `junod` is already accessible. If `which junod` shows output, then you're probably good to go.

```bash
# clone juno repo
git clone https://github.com/CosmosContracts/juno.git && cd juno

# build juno executable
make install

which juno
```

{% hint style="info" %}
If you have any problems here, check your `PATH`. `make install` will copy `junod` to `$HOME/go/bin` by default, please make sure that is set up in your `PATH` as well, which should be the case in general for building Go code from source.
{% endhint %}

