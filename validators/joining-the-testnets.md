---
description: General instructions on how to join the Juno testnets
---

# Joining a Testnet

## Current testnets

Below is the list of Juno testnets and their current status. You will need to know the version tag for installation of the `junod` binary. 

| chain-id | Description | Status |
| :--- | :--- | :---: |
| lucina | This testnet has an implementation of cosmwasm and is used for the [hack-juno](https://github.com/CosmosContracts/hack-juno) competition. This testnet will be upgraded as new versions of cosmwasm are released and will be the primary testing area for smart contract development for the Juno chain after the mainnet has launched. | current |
| hera | The final testnet before mainnet launch. This testnet is intended as a final test for the custom inflation module as well as other genesis parameters to ensure a smooth mainnet launch. | pending |

{% hint style="info" %}
Note that the chain-id for the testnets is used as the GitHub version tag.
{% endhint %}

## Minimum Hardware Requirements

The minimum recommended hardware requirements for running a validator for the Juno testnets are:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Chain-id</th>
      <th style="text-align:left">Requirements</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">lucina</td>
      <td style="text-align:left">
        <p></p>
        <ul>
          <li>2GB RAM</li>
          <li>100GB of disk space</li>
          <li>1.4 GHz CPU</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">hera</td>
      <td style="text-align:left">
        <p></p>
        <ul>
          <li>2GB RAM</li>
          <li>25GB of disk space</li>
          <li>1.4 GHz CPU</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% hint style="info" %}
Note that the testnets accumulate data as the blockchain continues. This means that you will need to expand your storage as the blockchain database gets larger with time. 
{% endhint %}

## junod Installation

To get up and running with the junod binary, please follow the instructions [here](getting-setup.md)

## Configuration of Shell Variables

For this guide, we will be using shell variables. This will enable the use of the client commands verbatim. It is important to remember that shell commands are only valid for the current shell session, and if the shell session is closed, the shell variables will need to be re-defined. 

If you want variables to persist for multiple sessions, then set them explicitly in your shell .profile, as you did for the Go environment variables.

To clear a variable binding, use `unset $VARIABLE_NAME` . Shell variables should be named with ALL CAPS.

### Choose a testnet

Choose the `<chain-id>` testnet you would like to join from [here](joining-the-testnets.md#current-testnets). Set the `CHAIN_ID`:

```bash
CHAIN_ID=<chain-id>

#Example
CHAIN_ID=lucina
```

### Set your moniker name

Choose your `<moniker-name>`, this can be any name of your choosing and will identify your validator in the explorer. Set the `MONIKER_NAME`:

```bash
MONIKER_NAME=<moniker-name>

#Example
MONIKER_NAME="Validatron 9000"
```

### **Set persistent peers**

Persistent peers will be required to tell your node where to connect to other nodes and join the network. To retrieve the peers for the chosen testnet:

```bash
#Set the base repo URL for the testnet & retrieve peers
CHAIN_REPO="https://raw.githubusercontent.com/CosmosContracts/testnets/main/$CHAIN_ID" && \
export PEERS="$(curl -s "$CHAIN_REPO/persistent_peers.txt")"
```

{% hint style="info" %}
NB: If you are unsure about this, you can ask in discord for the current peers and explicitly set them in `~/.juno/config/config.toml` instead.
{% endhint %}

## Setting up the Node

These instructions will direct you on how to initialise your node, synchronise to the network and upgrade your node to a validator. 

### **Initialize the chain**

```bash
junod init $MONIKER_NAME --chain-id $CHAIN_ID
```

This will generate the following files in `~/.juno/config/`

* `genesis.json` 
* `node_key.json` 
* `priv_validator_key.json`

### Download the genesis file

```text
curl https://raw.githubusercontent.com/CosmosContracts/testnets/main/$CHAIN_ID/genesis.json > ~/.juno/config/genesis.json
```

This will replace the genesis file created using `junod init` command with the genesis file for the testnet. ****

### **Set persistent peers**

Using the peers variable we set earlier, we can set the `persistent_peers` in `~/.juno/config/config.toml`: 

```bash
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.juno/config/config.toml
```

### **Create a local key pair**

Create a new key pair for your validator:

```bash
junod keys add <key-name>

# Query the keystore for your public address
junod keys show <key-name> -a
```

Replace `<key-name>` with a key name of your choosing.

{% hint style="danger" %}
After creating a new key, the key information and seed phrase will be shown. It is essential to write this seed phrase down and keep it in a safe place. The seed phrase is the only way to restore your keys.
{% endhint %}

### **Get some testnet tokens**

Testnet tokens can be requested from the `#faucet` channel on [Discord](https://discord.gg/HnHKpzd3Db).

To request tokens type `$request <your-public-address>` in the message field and press enter.

## Setup cosmovisor

Follow [these](setting-up-cosmovisor.md) instructions to setup cosmovisor and start the node.

## Syncing the node

After starting the junod daemon, the chain will begin to sync to the network. The time to sync to the network will vary depending on your setup, but could take a very long time. To query the status of your node:

```bash
# Query via the RPC (default port: 26657)
curl http://localhost:26657/status | jq .result.sync_info.catching_up
```

If this command returns `true` then your node is still catching up. If it returns `false` then your node has caught up to the network current block and you are safe to proceed to upgrade to a validator node.

## Upgrade to a validator

To upgrade the node to a validator, you will need to submit a `create-validator` transaction:

```bash
junod tx staking create-validator \
  --amount 9000000ujuno \
  --commission-max-change-rate "0.1" \
  --commission-max-rate "0.20" \
  --commission-rate "0.1" \
  --min-self-delegation "1" \
  --details "validators write bios too" \
  --pubkey=$(junod tendermint show-validator) \
  --moniker $MONIKER_NAME \
  --chain-id $CHAIN_ID \
  --gas-prices 0.025ujuno \
  --from <key-name>
```

