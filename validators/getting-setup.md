---
description: Instruction to install and configure the junod binary
cover: ../.gitbook/assets/Discord Invite (1) (1) (1) (20).png
coverY: 259
---

# Junod Installation and setup

### Choose an Operating System

The operating system you use for your node is entirely your personal preference. You will be able to compile the `junod` daemon on most modern linux distributions and recent versions of macOS.

{% hint style="info" %}
For the tutorial, it is assumed that you are using an Ubuntu LTS release.

If you have chosen a different operating system, you will need to modify your commands to suit your operating system.
{% endhint %}

### Install pre-requisites

```bash
# update the local package list and install any available upgrades
sudo apt-get update && sudo apt upgrade -y

# install toolchain and ensure accurate time synchronization
sudo apt-get install make build-essential gcc git jq chrony -y
```

### Install Go

Follow the instructions [here](https://golang.org/doc/install) to install Go.

For an Ubuntu, you can probably use:

```bash
wget https://golang.org/dl/go1.19.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.19.2.linux-amd64.tar.gz
```

Please install Go v1.19.2 or later.

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

### Build Juno from source

```bash
# from $HOME dir
git clone https://github.com/CosmosContracts/juno
cd juno
git fetch
git checkout <version-tag>
```

The `<version-tag>` will need to be set to either a [testnet `chain-id`](joining-the-testnets.md#current-testnets) or the latest [mainnet version tag](joining-mainnet/).

{% hint style="warning" %}
For genesis (Phoenix 2), the mainnet genesis version tag will be `v10.0.2` - i.e:

```bash
git checkout v10.0.2
```
{% endhint %}

{% hint style="warning" %}
If you plan to use a snapshot or state sync to sync your node, you will need the latest binary. Check [#mainnet-upgrades](joining-mainnet/mainnet-upgrades.md#mainnet-upgrades "mention") for the latest upgraded binary version.
{% endhint %}

Once you're on the correct tag, you can build:

```bash
# from juno dir
make install
```

To confirm that the installation has succeeded, you can run:

```bash
junod version

# v10.0.2
```

## Configure \`junod\` to connect to public RPC

Follow these instructions to configure your `junod` binary to connect to public RPC for submitting transactions and making queries to the Juno network if you will not be syncing a node.

Set the `chain-id`

```bash
junod config chain-id juno-1
```

Set the public RPC `node`

```bash
junod config node https://rpc-juno.itastakers.com:443
```

You will now be able to make transactions and queries with `junod`. For more information on junod commands see [modules](../cli/modules/ "mention") or execute `junod --help`
