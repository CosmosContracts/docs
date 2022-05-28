---
description: Shortcut to sync a node to the mainnet from a snapshot
---

# Sync from Snapshot

To setup a node from a snapshot we will need to:

1. Install the latest production binary, `v6.0.0` at time of writing. Refer to [Mainnet Upgrades](mainnet-upgrades.md) to confirm current latest binary.
2. Set variables and initialise the node.
3. Download the Phoenix genesis.json
4. Install Cosmovisor (Do not start)
5. Download and extract a recent snapshot.
6. Start Cosmovisor.

## Junod Installation

To get up and running with the junod binary, please follow the instructions [here](getting-setup.md).

{% hint style="warning" %}
Install the latest production binary,`v6.0.0` at time of writing. Refer to [Mainnet Upgrades](mainnet-upgrades.md) to confirm current latest binary.
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

These instructions will direct you on how to initialize your node, synchronize to the network.

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

## Setup Cosmovisor

Follow [these](setting-up-cosmovisor.md) instructions to setup cosmovisor. Do not start the node while following the setup instructions.

{% hint style="info" %}
Using cosmovisor is completely optional. If you choose not to use cosmovisor, you will need to be sure to attend network upgrades to ensure your validator does not have downtime and get jailed.
{% endhint %}

## Download and extract snapshot

Polkachu Validator provides the community with daily snapshots for the Juno Network. The snapshot server is periodically state-synced, so the snapshots do not contain full history.

To download and extract a snapshot, follow the instructions provided at  [https://polkachu.com/tendermint\_snapshots/juno](https://polkachu.com/tendermint\_snapshots/juno)

## Start Cosmovisor

Finally, enable the Cosmovisor service and start it.

```bash
sudo -S systemctl daemon-reload
sudo -S systemctl enable cosmovisor
sudo systemctl start cosmovisor
```

Check it is running using:

```
sudo systemctl status cosmovisor
```

If you need to monitor the service after launch, you can view the logs using:

```bash
journalctl -u cosmovisor -f
```
