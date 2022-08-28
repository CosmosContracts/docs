---
description: >-
  Details of mainnet upgrades, installation block height and links to
  instructions.
---

# Mainnet Upgrades

{% hint style="info" %}
Release procedures for validators and node operators are explained [here](https://github.com/CosmosContracts/juno/blob/main/RELEASES.md). The `RELEASES.md` file in Juno's GitHub repo is the canonical source of truth for release processes.
{% endhint %}

The Juno Network mainnet is regularly upgraded to provide the latest security patches, Cosmos SDK module integrations and performance improvements.

Some upgrades are able to be undertaken automatically with Cosmovisor while other upgrades need to be manually installed at specified block heights. Others can be installed at any time after their predecessor.

## Upgrade types

There are two types of upgrades that happen on Juno Network. They are:&#x20;

1. **Planned** feature upgrades or planned patches&#x20;
2. **Unplanned** security upgrades.

### Planned upgrade (via governance)

Planned upgrades, as the name suggests, are upgrades that are developed and proposed via governance. If approved by the community, these upgrades are undertaken by the chain automatically halting at the planned upgrade height.&#x20;

Node operators are then required to swap the binary for the planned upgrade binary. After all node operators have upgraded and started their nodes the network will continue in the upgraded state.

### Unplanned upgrade

Where emergency security patches are required, node operators are notified via the official discord validator channels. Node operators will be required to halt their nodes manually at the required upgrade height, swap the patched binary and restart their nodes. After all node operators have upgraded and started their nodes the network will continue in the upgraded state.

# Upgrade path

In order to sync a node with the current Juno mainnet, you will need to follow these steps:

### Genesis binary (Phoenix 2)

The genesis binary of the current itteration of Juno Network mainnet is [v9.0.0](https://github.com/CosmosContracts/juno/releases/tag/v9.0.0). This binary should be used with the Phoenix 2 genesis file. Refer to instructions detailed in [Joining Mainnet](joining-mainnet.md).

Block height at Phoenix genesis is **4136532**.
