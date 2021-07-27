---
description: 'Smart Contracts, Evolved!'
---

# Getting Setup

Welcome To The _Wild West_ 🤠

So you want to get your hands dirty and become a validator?

The best way for you to learn the tools of the trade is to join a Juno testnet. Here you will run into real-world issues, learning how to overcome them. 

This will prepare you for the experience of running a validator, and dealing with production dangers and bugs. Now is the time to battle harden your validator!

{% hint style="info" %}
Testnets come and go, so to find out which is the latest, please go to our discord validator-lounge channel: [Discord-Validator-Lounge](https://discord.gg/QcWPfK4gJ2%20)
{% endhint %}

{% hint style="danger" %}
## Minimum hardware requirements 🖥

* 2GB RAM
* 25GB of disk space
* 1.4 GHz CPU
{% endhint %}

## Ubuntu 18.04 - setup

### Install pre-requisites

```bash
sudo apt-get update
sudo apt-get install make build-essential gcc git git-lfs jq -yqq 
git lfs install --skip-repo
```

### Install Go

Follow the instructions [here](https://golang.org/doc/install) to install Go.

### Install Starport

**Prerequisites:** If you want to install Starport locally, make sure to have [Golang &gt;=1.16](https://golang.org/). The latest version of Starport also requires [Protocol Buffer compiler](https://grpc.io/docs/protoc-installation/) to be installed. [Node.js &gt;=12.19.0](https://nodejs.org/) is used to build the welcome screen, block explorer and to run the web scaffold.

{% hint style="info" %}
Starport uses [Git LFS](https://git-lfs.github.com/). **Please make sure that it is installed before cloning Starport.** If you have installed Git LFS after cloning Starport, checkout to your preferred branch to trigger a pull for large files or run **`git lfs pull`**
{% endhint %}

You need to ensure your gopath configuration is correct. If the following **'make'** step does not work then you might have to add these lines to your .profile or .zshrc in the user's home \(i.e. `~` or `$HOME`\) folder:

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

> Now build the `starport` binary into `$GOBIN`.

```bash
git clone https://github.com/tendermint/starport
cd starport && git checkout develop
make
```

**Note**: When building from source, it is important to have your `$GOPATH` set correctly. When in doubt, the following should do:

```bash
mkdir ~/go
export GOPATH=~/go
```

{% hint style="danger" %}
It is up to you as a validator to secure your server, and to keep it secure. Failure to do so could have dire consequences! Testnets are an ideal place to learn the basics of securing your validator. At a minimum, you should read and understand [these](https://hub.cosmos.network/main/validators/security.html) basics. Another good article on general best practices is [here](https://www.digitalocean.com/community/tutorials/recommended-security-measures-to-protect-your-servers).
{% endhint %}

## Build Juno from source

```bash
git clone https://github.com/CosmosContracts/Juno.git
cd juno
git fetch
git checkout <current-testnet-tag>
```

If you don't know what the current testnet is, then jump into the discord and ask!

Once you're on the correct tag, you can build:

```bash
# in juno dir
make install
```

To confirm that the installation has succeeded, you can run:

```bash
junod version
```

