---
description: General instructions to join the Juno mainnet after network genesis.
cover: ../../.gitbook/assets/Discord Invite (1) (50).png
coverY: 260
---

# Joining Mainnet

## Junod Installation

To get up and running with the junod binary, please follow the instructions [here](../getting-setup.md).

## Mainnet binary version

The Juno Network has undergone several upgrades since the network inception on October 1st 2021. There was a hard fork after the network was attaked with a smart contract vulnerability on July 28th 2022.

The second is the current mainnet "Juno Phoenix 2" which raised Juno from the ashes on July 28th 2022.

The correct version of the binary for mainnet at genesis (Phoenix) was `v9.0.0`.

Releases after genesis can be found in the mainnet repo.

{% hint style="info" %}
To find the current version of the binary, go to the [mainnet repo](https://github.com/cosmoscontracts/mainnet) and find the most recent upgrade.
{% endhint %}

{% hint style="info" %}
If you plan to use a snapshot or state sync to sync your node, you will need the latest binary. Check [#mainnet-upgrades](mainnet-upgrades.md#mainnet-upgrades "mention") for the latest upgraded binary version.
{% endhint %}

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

Download the the "Phoenix" geneis file. The following instructions download the genesis file hosted by [Dimi](https://twitter.com/dimiandre).

```bash
# Download genesis.json file
rm ~/.juno/config/genesis.json
wget https://download.dimi.sh/juno-phoenix2-genesis.tar.gz
tar -xvf juno-phoenix2-genesis.tar.gz
mv juno-phoenix2-genesis.json $HOME/.juno/config/genesis.json
```

This will replace the genesis file created using `junod init` command with the mainnet `genesis.json`.

### **Set seeds**

We can set the `seeds` by retrieving the list of seeds from the cosmoscontracts/mainnet repo and using `sed` to inject into `~/.juno/config/config.toml`:

```bash
# Set the base repo URL for mainnet & retrieve seeds
CHAIN_REPO="https://raw.githubusercontent.com/CosmosContracts/mainnet/main/$CHAIN_ID" && \
export SEEDS="$(curl -sL "$CHAIN_REPO/seeds.txt")"

# Add seeds to config.toml
sed -i.bak -e "s/^seeds *=.*/seeds = \"$SEEDS\"/" ~/.juno/config/config.toml
```

{% hint style="info" %}
NB: If you are unsure about this, you can ask in discord for the current peers and explicitly set them in `~/.juno/config/config.toml` instead.
{% endhint %}

### Set minimum gas prices

For RPC nodes and Validator nodes we recommend setting the following `minimum-gas-prices`. As we are a permissionless wasm chain, this setting will help protect against contract spam and potential wasm contract attack vectors.

In `$HOME/.juno/config/app.toml`, set minimum gas prices:

```bash
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

# OR

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

You will require some Juno tokens to bond to your validator. To be in the active set you will need to have enough tokens to be in the top 150 validators by delegation weight.

If you do not have any Juno tokens for you validator you can purchase tokens on [Osmosis](https://app.osmosis.zone), [WyndDex](https://app.wynddao.com/), or [kado.money](https://app.kado.money/ramp).

## Setup cosmovisor and start the node

Follow [these](../setting-up-cosmovisor.md) instructions to setup cosmovisor and start the node.

{% hint style="info" %}
Using cosmovisor is completely optional. If you choose not to use cosmovisor, you will need to be sure to attend network upgrades to ensure your validator does not have downtime and get jailed.
{% endhint %}

{% hint style="warning" %}
If syncing a node from the "Phoenix 2" genesis, the initial "invariant checks" will take many hours to complete. If you want to skip invariant checks, thart the node with `--x-crisis-skip-assert-invariants` flag. This will still take around 30+ minutes to start the node.
{% endhint %}

## Syncing the node

There are methods to sync a node to the network:

1. [#from-genesis](./#from-genesis "mention") and following the [mainnet-upgrades.md](mainnet-upgrades.md "mention") path
2. [sync-from-snapshot.md](sync-from-snapshot.md "mention")
3. [sync-with-state-sync.md](sync-with-state-sync.md "mention")

### From genesis

After starting the `junod` daemon, the chain will begin to sync to the network. The time to sync to the network will vary depending on your setup and the current size of the blockchain, but could take a very long time. To query the status of your node:

```bash
# Query via the RPC (default port: 26657)
curl http://localhost:26657/status | jq .result.sync_info.catching_up
```

If this command returns `true` then your node is still catching up. If it returns `false` then your node has caught up to the network current block and you are safe to proceed to upgrade to a validator node.

{% hint style="warning" %}
When syncing from genesis, you will need to perform upgrades while catching up to the head. `juno-1` upgrades are detailed in [mainnet-upgrades.md](mainnet-upgrades.md "mention") along with a description of each type of upgrade.
{% endhint %}

#### Binary Upgrades

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
