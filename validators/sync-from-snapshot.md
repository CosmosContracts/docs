---
description: Shortcut to sync a node to the mainnet from a snapshot
---

# Sync from Snapshot

Bare minimum instructions to sync from snapshot. These instructions will be fully detailed soon.

Setup junod with latest binary. Refer to [Mainnet Upgrades](mainnet-upgrades.md) to determine latest binary version.

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

### **Initialize the chain**

```bash
junod init "$MONIKER_NAME" --chain-id $CHAIN_ID
```

This will generate the following files in `~/.juno/config/`

* `genesis.json`
* `node_key.json`
* `priv_validator_key.json`

Download genesis.json

```bash
curl https://share.blockpane.com/juno/phoenix/genesis.json > ~/.juno/config/genesis.json
```

Setup cosmovisor with current binary installed in genesis directory.

Set peers.

follow instructions from [https://polkachu.com/tendermint\_snapshots/juno](https://polkachu.com/tendermint\_snapshots/juno)

