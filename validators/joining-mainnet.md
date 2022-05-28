---
description: General instructions to join the Juno mainnet after network genesis.
cover: ../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1).png
coverY: 0
---

# Joining Mainnet

## Junod Installation

To get up and running with the junod binary, please follow the instructions [here](getting-setup.md).

## Mainnet binary version

The Juno Network has undergone several upgrades since the network inception on October 1st 2021. There was a hard fork after the network was attached with a smart contract vulnerability on April 5th 2022. This has resulted in two networks that can be synced.&#x20;

The first is referred to as "Juno Classic" and the blockchain is inclusive of blocks between 0 and 2578097.&#x20;

The second is the current mainnet "Juno Phoenix" which raised Juno from the ashes on April 7th 2022.

The correct version of the binary for mainnet at genesis (Phoenix) is `v3.0.0`. Its release page can be found [here](https://github.com/CosmosContracts/juno/releases/tag/v3.0.0).

For those wanting to sync a full history node to Juno Classic, please refer to instructions [here](sync-juno-classic.md).

## Recommended Minimum Hardware

The minimum recommended hardware requirements for running a validator for the Juno mainnet are:

| Requirements                                                                                   |
| ---------------------------------------------------------------------------------------------- |
| <ul><li>4 Cores (modern CPU's)</li><li>32GB RAM</li><li>1TB of storage (SSD or NVME)</li></ul> |

{% hint style="danger" %}
These specifications are the minimum recommended. As Juno Network is a smart contract platform, it can at times be very demanding on hardware. Low spec validators WILL get stuck on difficult to process blocks.

If you are running less than 32GB RAM, we recommend adding a swap on NVME storage to help process large and complex blocks.
{% endhint %}

{% hint style="warning" %}
Note that the mainnet will accumulate data as the blockchain continues. This means that you will need to expand your storage as the blockchain database gets larger with time.
{% endhint %}

## Configuration of Shell Variables

For this guide, we will be using shell variables. This will enable the use of the client commands verbatim. It is important to remember that shell commands are only valid for the current shell session, and if the shell session is closed, the shell variables will need to be re-defined.

If you want variables to persist for multiple sessions, then set them explicitly in your shell .profile, as you did for the Go environment variables.

To clear a variable binding, use `unset $VARIABLE_NAME`. Shell variables should be named with ALL CAPS.

### Choose the required mainnet chain-id

The current Juno Network `chain-id` is `juno-1`. Set the `CHAIN_ID`:

```bash
CHAIN_ID=juno-1
```

### Set your moniker name

Choose your `<moniker-name>`, this can be any name of your choosing and will identify your validator in the explorer. Set the `MONIKER_NAME`:

```bash
MONIKER_NAME=<moniker-name>

# Example
MONIKER_NAME="Validatron 9000"
```

### **Set persistent peers**

Persistent peers will be required to tell your node where to connect to other nodes and join the network. To retrieve the peers for the chosen `chain-id`:

```bash
# Set the base repo URL for mainnet & retrieve peers
CHAIN_REPO="https://raw.githubusercontent.com/CosmosContracts/mainnet/main/$CHAIN_ID" && \
export PEERS="$(curl -s "$CHAIN_REPO/persistent_peers.txt")"
```

{% hint style="info" %}
NB: If you are unsure about this, you can ask in discord for the current peers and explicitly set them in `~/.juno/config/config.toml` instead.
{% endhint %}

## Setting up the Node

These instructions will direct you on how to initialize your node, synchronize to the network and upgrade your node to a validator.

### **Initialize the chain**

```bash
junod init "$MONIKER_NAME" --chain-id $CHAIN_ID
```

This will generate the following files in `~/.juno/config/`

* `genesis.json`
* `node_key.json`
* `priv_validator_key.json`

### Download the genesis file

Download the the "Phoenix" geneis file. The following instructions download the genesis file hosted by blockpane.&#x20;

```
# Download genesis.json file
curl https://share.blockpane.com/juno/phoenix/genesis.json > ~/.juno/config/genesis.json
```

This will replace the genesis file created using `junod init` command with the mainnet `genesis.json`.&#x20;

Alternate directions to download the genesis from IPFS are provided by Simon from Confio [here](https://gist.github.com/webmaster128/af65a1d499bf246e08dac99d445dd26a).

### **Set persistent peers**

Using the peers variable we set earlier, we can set the `persistent_peers` in `~/.juno/config/config.toml`:

```bash
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.juno/config/config.toml
```

### Set minimum gas prices

For RPC nodes and Validator nodes we recommend setting the following `minimum-gas-prices`. As we are a permissionless wasm chain, this setting will help protect against contract spam and potential wasm contract attack vectors.

In `$HOME/.juno/config/app.toml`, set minimum gas prices:

```
sed -i.bak -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.0025ujuno,0.001ibc\/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9\"/" ~/.juno/config/app.toml
```

{% hint style="info" %}
The above configuration will set the validator to accept both `ujuno` and `IBC Atom` as fees for transactions. This is the recommended configuration.
{% endhint %}

### **Create (or restore) a local key pair**

Either create a new key pair, or restore an existing wallet for your validator:

```bash
# Create new keypair
junod keys add <key-name>

# Restore existing juno wallet with mnemonic seed phrase.
# You will be prompted to enter mnemonic seed.
junod keys add <key-name> --recover

# Query the keystore for your public address
junod keys show <key-name> -a
```

Replace `<key-name>` with a key name of your choosing.

{% hint style="danger" %}
After creating a new key, the key information and seed phrase will be shown. It is essential to write this seed phrase down and keep it in a safe place. The seed phrase is the only way to restore your keys.
{% endhint %}

### **Get some Juno tokens**

You will require some Juno tokens to bond to your validator. To be in the active set you will need to have enough tokens to be in the top 135 validators by delegation weight.

If you do not have any Juno tokens for you validator you can purchase tokens on [Osmosis](https://app.osmosis.zone) or [JunoSwap](https://junoswap.com).

## Setup cosmovisor and start the node

Follow [these](setting-up-cosmovisor.md) instructions to setup cosmovisor and start the node.

{% hint style="info" %}
Using cosmovisor is completely optional. If you choose not to use cosmovisor, you will need to be sure to attend network upgrades to ensure your validator does not have downtime and get jailed.
{% endhint %}

{% hint style="warning" %}
If syncing a node from the "Phoenix" genesis, the initial "invariant checks" will take many hours to complete. If you want to skip invariant checks, thart the node with `--x-crisis-skip-assert-invariants` flag. This will still take around 30+ minutes to start the node.
{% endhint %}

## Syncing the node

After starting the `junod` daemon, the chain will begin to sync to the network. The time to sync to the network will vary depending on your setup and the current size of the blockchain, but could take a very long time. To query the status of your node:

```bash
# Query via the RPC (default port: 26657)
curl http://localhost:26657/status | jq .result.sync_info.catching_up
```

If this command returns `true` then your node is still catching up. If it returns `false` then your node has caught up to the network current block and you are safe to proceed to upgrade to a validator node.

### Binary Upgrades

During the syncing process you will need to install binary upgrades at the correct height. Please refer to [Mainnet Upgrades](mainnet-upgrades.md) for further information.

## Upgrade to a validator

{% hint style="danger" %}
**Do not attempt to upgrade your node to a validator until the node is fully in sync as per the previous step.**
{% endhint %}

To upgrade the node to a validator, you will need to submit a `create-validator` transaction:

```bash
junod tx staking create-validator \
  --amount 1000000ujuno \
  --commission-max-change-rate "0.1" \
  --commission-max-rate "0.20" \
  --commission-rate "0.1" \
  --min-self-delegation "1" \
  --details "validators write bios too" \
  --pubkey=$(junod tendermint show-validator) \
  --moniker "$MONIKER_NAME" \
  --chain-id $CHAIN_ID \
  --gas-prices 0.025ujuno \
  --from <key-name>
```

{% hint style="info" %}
The above transaction is just an example. There are many more flags that can be set to customise your validator, such as your validator website, or keybase.io id, etc. To see a full list:

```bash
junod tx staking create-validator --help
```
{% endhint %}

## Backup critical files

There are certain files that you need to backup to be able to restore your validator if, for some reason, it damaged or lost in some way. Please make a secure backup of the following files located in `~/.juno/config/`:

* `priv_validator_key.json`
* `node_key.json`

It is recommended that you encrypt the backup of these files.
