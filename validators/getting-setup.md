---
description: Instruction to install the junod binary
---

# junod Installation and setup

## Choose an Operating System

The operating system you use for your node is entirely your personal preference. You will be able to compile the `junod` daemon on most modern linux distributions and recent versions of macOS. 

For the tutorial, it is assumed that you are using an Ubuntu LTS release.

If you have chosen a different operating system, you will need to modify your commands to suit your operating system.

## Install pre-requisites

```bash
# update the local package list and install any available upgrades
sudo apt-get update && sudo apt upgrade -y

# install toolchain 
sudo apt-get install make build-essential gcc git jq -y
```

## Install Go

Follow the instructions [here](https://golang.org/doc/install) to install Go.

Please install Go v1.17 or later.

If you are in any way unsure about how to configure Go, then set these in the `.profile` in the user's home \(i.e. `~/`\) folder.

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

## Build Juno from source

```bash
git clone https://github.com/CosmosContracts/juno
cd juno
git fetch
git checkout <version-tag>
```

The `<version-tag>` will need to be set to either a [testnet `chain-id`](joining-the-testnets.md#current-testnets) or the latest [mainnet version tag](joining-mainnet.md).

Once you're on the correct tag, you can build:

```bash
# in juno dir
make install
```

To confirm that the installation has succeeded, you can run:

```bash
junod version
```

