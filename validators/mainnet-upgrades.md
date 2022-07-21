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

## Upgrade path

In order to sync a node with the current Juno mainnet, you will need to follow these steps:

### Genesis binary (Phoenix)

The genesis binary of the current itteration of Juno Network mainnet is [v3.0.0](https://github.com/CosmosContracts/juno/releases/tag/v3.0.0). This binary should be used with the Phoenix genesis file and associated wasm data folder. Refer to instructions detailed in [Joining Mainnet](joining-mainnet.md).

Block height at Phoenix genesis is **2578099**.

### Unnamed security upgrade

Binary version [v3.1.0](https://github.com/CosmosContracts/juno/releases/tag/v3.1.0).&#x20;

Upgrade height **2616300**.

This security upgrade was undertaken on April 10th 2022.

The upgrade bumps wasmvm from beta7 to beta10. This version bump patches a major security vulnerability.

### Unnamed security upgrade

Binary version [v3.1.1](https://github.com/CosmosContracts/juno/releases/tag/v3.1.1).&#x20;

This is a non-breaking upgrade and can be completed by installing the binary any time after the v3.1.0 binary upgrade.

This security upgrade was released on April 10th 2022.

### Unity upgrade

Binary version [v4.0.0](https://github.com/CosmosContracts/juno/releases/tag/v4.0.0).&#x20;

Upgrade height **2951100**.&#x20;

Refer to upgrade instructions [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/1300_UNITY_UPGRADE.md).

This upgrade was undertaken on May 4th 2022.

This upgrade executed code that would remove tokens from the CCN (whale) account and store them into a smart contract. This action was taken as a result of the community governance vote on proposal 20. [JUNO Proposal#20](https://www.mintscan.io/juno/proposals/20).

An error in the code resulted in the tokens being stored in an un-initiated address. A further upgrade was required to move the tokens to the correct smart contract address.

### Veritas upgrade

Binary version [v5.0.1](https://github.com/CosmosContracts/juno/releases/tag/v5.0.1).

Upgrade height **3035000**.

Refer to upgrade instructions [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/1400_VERITAS_UPGRADE.md).

This upgrade was undertaken on May 10th 2022.

This was a scheduled upgrade that re-moved the funds to the intended target address.

### Unnamed security upgrade

Binary version [v6.0.0](https://github.com/CosmosContracts/juno/releases/tag/v6.0.0).

Upgrade height **3159650**.

This upgrade was undertaken on May 19 2022.

### Multiverse upgrade

Binary version [v8.0.0](https://github.com/CosmosContracts/juno/releases/tag/v8.0.0).

Upgrade height **3851750**.

Refer to upgrade instructions [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/1600_MULTIVERSE_UPGRADE.md).

This upgrade was undertaken on July 7th 2022.

This was a scheduled upgrade that adds ICA Host functionality to the Juno chain. The multiverse upgrade was initially supposed to be released in v7.0.0 but due to a bug was released in v8.0.0 instead.
