---
description: Securing the Juno Network by staking JUNO🔒 🔑
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (1) (38).png
coverY: 0
---

# Staking

Staking is the process of locking up a digital asset non custodially (JUNO in the case of the Juno Network) to provide economic security to a public blockchain.

⚪️ **Secure the network -** With **JUNO**, you have the power to contribute to the security and governance of the Juno Network through staking and voting on governance proposals.

⚪️ **Earn rewards -** By staking to a validator, you are contributing to the security of the network and are rewarded with **JUNO** through staking rewards.

⚪️ **Vote for the future -** Staking **JUNO** grants the wallet owner the right to vote on governance proposals and contribute to making decisions on the future and direction of the network.

### ✅ **Staking rewards**

When the staking (delegation) transaction is complete, rewards will start to be generated immediately on a block per block basis. At any time, stakers can claim their accumulated rewards, via their supported wallet.

**Where do rewards come from?**

Staking rewards are distributed to staked **JUNO** in two ways:

1. **Transaction fees** - transaction fees collected on the Juno Network are distributed to staked JUNO.
2. **Newly distributed JUNO -** New JUNO created through the network inflation is distributed to JUNO stakers each block over the first 12 years of the Juno Network operation.

Learn more about the reward Schedule: [https://docs.junochain.com/juno/economic-overview/incentive-structure](https://docs.junochain.com/juno/economic-overview/incentive-structure)

### ⚪️ **Staking safely**

Staking JUNO is not risk-free. If a validator has downtime or underperforms, a percentage of JUNO delegated to them may be forfeited. This process is termed "slashing". To mitigate potential slashing risks to stakers, we have provided a guideline to assist delegators in selecting a validator with a low risk of slashing.

## Selecting a Validator

There are many validator candidates to select from when it comes to delegating your JUNO token. The following discussion aims to provide you with some points for consideration when selecting a validator for staking your JUNO. It is important that you do a little research before delegating your JUNO to a validator.

Some points to consider when selecting a validator:

* [Decentralization of the network](./#decentralization-of-the-network)
* [Reputation of the validator](./#reputation-of-the-validator)
* [Reachability of the validator](./#reachability-of-the-validator)
* [The validator setup](./#The-validator-setup)
* [Project and Community involvement](./#project-and-community-involvement)
* [Value added by the validator](./#value-added-by-the-validator)
* [Commission taken by the validator](./#commission-taken-by-the-validator)
* [Slashing history and validator uptime](./#slashing-history-and-validator-uptime)

### Decentralization of the network

There are a limited number of validators in the active set for the network. Each validator will vote on consensus for each proposed block. The more tokens a validator has staked to them increases the power of the validators vote. It is therefore important that no one validator gains too much voting power over the network, and thus becoming centralized. To help with decentralization of voting power, you may consider delegating to validators lower on the list of total delegation.

### Reputation of the validator

Each validator is responsible to provide as much information as possible to potential delegators.

You may want to investigate validators you are planning on delegating to. Most validators will provide some extra information such as a bio and website that will be available by clicking on the validator's name in the [https://junoscan.com](https://junoscan.com), or [https://mintscan.io/juno](https://mintscan.io/juno) blockchain explorer interface.

Some validators run telegram, discord, or twitter channels where you can directly contact the operators and receive updates so that you are informed about the validators operations and maintenance activities.

Many validator operators have representation in the official Juno Discord and Telegrams channels.

You may want to ask about particular validators in the Juno Discord channels and/or Telegram chat.

### Reachability of the validator

Apart from some validators running a telegram, discord etc. consider how reachable a validator is. For instance when you want to know certain specifics mentioned in this chapter or an active governance proposal, his or her validator setup (hardware used or security measures taken etc.). Try getting in touch with the validators you like to stake to.

### The Validator setup

When you delegate to a validator nobody wants that validator to be compromised in some way in order to prevent any form of slashing. A validator can take many precautions to mitigate this. For example: they can make a difference by upholding a good hardware standard for their validator, implementing a sentry, setting up good monitoring and alerting infrastructure and making sure they have appropriate security configuration.

### Project and Community involvement

Anyone can start a validator if technically capable. A difference apart from the technical aspects can be made by their involvement in the project and the community. Some are very actively trying to help the community in many different ways. Helping the community will help provide an excellent end user experience to Juno network users and will in turn help the Juno network grow. This in turn will help drive adoption of the Juno network.

Validators that are involved with the project means that they are up-to-date on the progress of the project, what is happening and they can use that knowledge to help educate the community and the rest of the world.

Active validators are also more likely to be well informed of network upgrades. If validators were to miss software upgrades, they would be unable to reach consensus with the rest of the network. It is most likely that the validator would end up being jailed and thus slashed for downtime.

A list of active Juno Network contributors is maintained [here](../../juno/juno-developers.md).

### Value added by the validator

Some validators are able to add value for delegators in various ways. This information should be available on the validators websites.

### Commission taken by the validator

Validator commission is a percentage of the JUNO rewards earned that is provided to the validator in return for their service. Validators have ongoing costs for running their validator service and it is fair that they are compensated for their time, resources and knowledge that they commit to running their validators. In addition, some validator operators commit a significant amount of their time and resources to assisting the community through the various social platforms.

Each validator has the freedom to set their own commission rates. Validators have the power to alter their commission rates as they desire within the range each validator sets when they create their validator.

When considering the amount of commission are willing to pay, you may consider that some validators will provide the bare minimum infrastructure to run a validator while others will run enterprise grade hardware and security which comes with higher operating costs. Sometimes a higher commission rate may represent the higher costs for some operators to provide a higher level of service. However, this may not always be the case.

### Slashing history and validator uptime

Each validator must strive to provide the highest uptime possible. From time to time, a validator may be jailed for too much downtime or double signing a block. If a validator is jailed, they and their delegators are penalized by losing a portion of their staked tokens (known as "slashing").

You will be able to see a validators jail history by browsing their transaction history in the block explorer. Look out for "unjail" transactions.

Under certain circumstances, a validator may be permanently jailed (aka "tombstoned". This means they can never release themselves from jail and will no longer receive block rewards or be able to vote.

## Staking Tutorials

The following tutorials aim to provide step by instructions to stake your JUNO to a validator of your choice.

{% content-ref url="omniflix-platform.md" %}
[omniflix-platform.md](omniflix-platform.md)
{% endcontent-ref %}

## Command Line Reference

{% content-ref url="../../cli/modules/staking.md" %}
[staking.md](../../cli/modules/staking.md)
{% endcontent-ref %}

{% content-ref url="../../cli/modules/distribution.md" %}
[distribution.md](../../cli/modules/distribution.md)
{% endcontent-ref %}
