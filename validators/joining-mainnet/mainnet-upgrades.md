---
description: >-
  Details of mainnet upgrades, installation block height and links to
  instructions.
---

# Mainnet Upgrades

## Mainnet Upgrades

{% hint style="info" %}
Release procedures for validators and node operators are explained [here](https://github.com/CosmosContracts/juno/blob/main/RELEASES.md). The `RELEASES.md` file in Juno's GitHub repo is the canonical source of truth for release processes.
{% endhint %}

The Juno Network mainnet is regularly upgraded to provide the latest security patches, Cosmos SDK module integrations and performance improvements.

Some upgrades are able to be undertaken automatically with Cosmovisor while other upgrades need to be manually installed at specified block heights. Others can be installed at any time after their predecessor.

### Upgrade types

There are two types of upgrades that happen on Juno Network. They are:

1. **Planned** feature upgrades or planned patches
2. **Unplanned** security upgrades.

#### Planned upgrade (via governance)

Planned upgrades, as the name suggests, are upgrades that are developed and proposed via governance. If approved by the community, these upgrades are undertaken by the chain automatically halting at the planned upgrade height.

Node operators are then required to swap the binary for the planned upgrade binary. After all node operators have upgraded and started their nodes the network will continue in the upgraded state.

#### Unplanned upgrade

Where emergency security patches are required, node operators are notified via the official discord validator channels. Node operators will be required to halt their nodes manually at the required upgrade height, swap the patched binary and restart their nodes. After all node operators have upgraded and started their nodes the network will continue in the upgraded state.

## Upgrade path

In order to sync a node with the current Juno mainnet, you will need to follow these steps:

#### Genesis binary (Phoenix 2)

go 1.18

The genesis binary of the current iteration of Juno Network mainnet is [v9.0.0](https://github.com/CosmosContracts/juno/releases/tag/v9.0.0). This binary should be used with the Phoenix 2 genesis file. Refer to instructions detailed in [Joining Mainnet](./).

Block height at Phoenix genesis is [4136532](https://www.mintscan.io/juno/blocks/4136532) with . (It can take a long time (multiple hours) before the sync starts)

#### Planned upgrade V10 (28 September 2022)

go 1.18

An upgrade to V10 of Juno happened at block [5004269](https://www.mintscan.io/juno/blocks/5004269), up to version [v10.0.2](https://github.com/CosmosContracts/juno/releases/tag/v10.0.2) of Juno.

This upgrade was voted in via governance proposal [#40](https://www.mintscan.io/juno/proposals/40)

Upgrade instructions are available [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2100\_v10\_UPGRADE.md).

#### Dragonberry security patch (15 October 2022)

The blockchain was upgraded with the dragonberry patch which resolved a security issue related to IBC. The upgrade version is to [v10.1.0](https://github.com/CosmosContracts/juno/releases/tag/v10.1.0) of Juno. The upgrade can be performed any time after [#planned-upgrade-v10-28-september-2022](mainnet-upgrades.md#planned-upgrade-v10-28-september-2022 "mention").

Upgrade instructions are available [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2200\_v10\_1\_0\_PATCH.md).

#### Planned upgrade to v11 (31 October 2022)

go 1.19

An upgrade to v11 of Juno at block 5480000.

This was covered in gov prop [47](https://www.mintscan.io/juno/proposals/47).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2300\_v11\_UPGRADE.md).

_Don't forget the extra configurations as described in the upgrade with the iavl cache. It can take a long time (1 hour) before the sync starts._

#### Planned upgrade to v12 (20 Feb 2023)

go 1.18

An upgrade to v12 of Juno at block [7075551](https://www.mintscan.io/juno/block/7075551).

This was covered in gov prop [249](https://www.mintscan.io/juno/proposals/249).

Upgrade instructions are[ here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2400\_v12\_UPGRADE.md).

#### Planned upgrade to v13 (13 March 2023)

go 1.19

An upgrade to v13 of Juno at block [7374801](https://www.mintscan.io/juno/block/7374801).

This was covered in gov prop [271](https://www.mintscan.io/juno/proposals/271).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2500\_v13\_UPGRADE.md).

#### Planned upgrade to v14.1.0 (18 April 2023)

go 1.19

An upgrade to v14 of Juno at block [7875721](https://www.mintscan.io/juno/block/7875721).

This was covered in gov prop [282](https://www.mintscan.io/juno/proposals/282).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2600\_v14\_UPGRADE.md).&#x20;

* Set `minimum-gas-prices = "0ujuno"` in app.toml
* make sure to `rm -rf $HOME/.juno/wasm/cache`)

#### Planned upgrade to v15 (13 March 2023)

go 1.19

An upgrade to v15 of Juno at block [8577241](https://www.mintscan.io/juno/block/8577241).

This was covered in gov prop [295](https://www.mintscan.io/juno/proposals/295).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2700\_v15\_UPGRADE.md).

* make sure to `rm -rf $HOME/.juno/wasm/cache`)

#### Planned upgrade to v16 (7 August 2023)

go 1.20

An upgrade to v16 of Juno at block [9481382](https://www.mintscan.io/juno/block/9481382).

This was covered in gov prop [311](https://www.mintscan.io/juno/proposals/311).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/2700\_v16\_UPGRADE.md).

* make sure to `rm -rf $HOME/.juno/wasm/cache`)

#### Planned upgrade to v17.1.0 (7 August 2023)

go 1.20

An upgrade to v17 of Juno at block [10078449](https://www.mintscan.io/juno/blocks/10078449).

This was covered in gov prop [317](https://www.mintscan.io/juno/proposals/317).

Upgrade instructions are [here](https://github.com/CosmosContracts/mainnet/pull/106).

