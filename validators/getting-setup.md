---
description: Instruction to install the junod binary
cover: ../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (8).png
coverY: 0
---

# Junod Installation and setup

## Choose an Operating System

The operating system you use for your node is entirely your personal preference. You will be able to compile the `junod` daemon on most modern linux distributions and recent versions of macOS (11.4 "Big Sur" and up).

{% hint style="info" %}
For the tutorial, it is assumed that you are using an Ubuntu LTS release.

If you have chosen a different operating system, you will need to modify your commands to suit your operating system.
{% endhint %}

## Install pre-requisites
If you're using Linux, the following commands apply:
```bash
# update the local package list and install any available upgrades
sudo apt-get update && sudo apt upgrade -y

# install toolchain and ensure accurate time synchronization
sudo apt-get install make build-essential gcc git jq chrony -y
```
If you're using macOS, Homebrew must be installed. If installed, use the following:
```bash
# install toolchain
brew install build-essential
```


## Install Go

Follow the instructions [here](https://golang.org/doc/install) to install Go.

For an Ubuntu LTS, you can probably use:

```bash
wget https://golang.org/dl/go1.18.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz
```

For Mac, instructions can be followed at the [GoLang website](https://go.dev/doc/install) above to install Go.

Please install Go v1.18 or later.

Unless you want to configure in a non standard way, then set these in the `.profile` in the user's home (i.e. `~/`) folder.

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

After updating your `~/.profile` you will need to source it:

```bash
source ~/.profile
```

On macOS, `~/.profile` is by default `~/.bash_profile`, so the following command can be used:

```bash
source ~/.bash_profile
```

## Build Juno from source

```bash
# from $HOME dir
git clone https://github.com/CosmosContracts/juno
cd juno
git fetch
git checkout <version-tag>
```

The `<version-tag>` will need to be set to either a [testnet `chain-id`](joining-the-testnets.md#current-testnets) or the latest [mainnet version tag](joining-mainnet.md).

{% hint style="warning" %}
For the most recent version (as of 15 Aug 2022), the mainnet version tag is be `v9.0.0` - i.e:

```bash
git checkout v9.0.0
```
{% endhint %}

To check the most recent release, visit the repository [here](https://github.com/CosmosContracts/juno/releases).

Once you're on the correct tag, you can build:

```bash
# from juno dir
make install
```

To confirm that the installation has succeeded, you can run:

```bash
junod version

# v3.0.0
```

