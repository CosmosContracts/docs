---
description: "Securing the Juno Network \U0001F512 \U0001F511"
---

# Staking

![](../../.gitbook/assets/juno-hub.png)

Staking is the process of locking up a digital asset non custodially \(JUNO in the case of the Juno Network\) to provide economic security to a public blockchain.

⚪️ **Secure the network**

With **JUNO**, you have the power to contribute to the security and governance of the Juno Network.

⚪️ **Earn rewards**

Select one or more validators of the Juno Network and start earning rewards.

⚪️ **Vote for the future**

Staking **JUNO** grants the right to vote on proposals and make decisions on the future of the network.



✅ **Staking rewards** 

When the staking \(delegation\) transaction is complete, rewards will start to be generated immediately on a block per block basis. At any time, stakers can claim their accumulated rewards, via their supported wallet.

**Where do rewards come from?** 

Staking rewards are distributed to staked **JUNO** in two ways:

1. **Transaction fees** 

Transaction fees collected on the Juno Network are distributed to staked JUNO.

   2. **Newly distributed JUNO**

The JUNO supply is distributed to stakers over the first 12 years.

Learn more about the reward Schedule: [https://docs.junochain.com/juno/economic-overview/incentive-structure](https://docs.junochain.com/juno/economic-overview/incentive-structure)



⚪️ **Staking safely** 

Staking JUNO is not risk-free. If a validator has downtime or underperforms, a percentage of JUNO delegated to them may be forfeited. To mitigate potential soft and hard slash risks we have listed some general safety guidelines below.

## Selecting a Validator

There are many validator candidates to select from when it comes to delegating your Juno. The following discussion aims to provide you with some points for consideration when selecting a validator for your staked Juno. It is important that you do a little research before delegating your Juno.

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

There are a limited number of validators in the active set for the network. Each validator will vote on consensus for proposed each block. The more tokens a validator has staked to them increases the power of the validators vote. It is therefore important that no one validator gains too much power over the network. To help with decentralization of voting power, you may consider delegating to validators lower on the list of total delegation. 

### Reputation of the validator

Each validator is responsible to provide as much information as possible to potential delegators. Many validator operators have representation in the official Juno Discord and Telegrams channels.

You may want to investigate validators you are planning on delegating to. Most validators will provide some extra information such as a bio and website that will be available by clicking on the validator name in the [http://junoscan.com](http://junoscan.com) interface.

Some validators run telegram, discord, or twitter channels where you can directly contact the operators and receive updates so that you are informed about the validators operations and maintenance activities. 

You may want to ask about particular validators in the Juno discord channels. If the validator does not have their own social channels they may be available here.

### Reachability of the validator

Apart from some validators running a telegram, discord ect. consider how reachable a validator is. For instance when you want to know certain specifics mentioned in this chapter or an active governance proposal, his or her validator setup (hardware used or security measures taken ect.). Try getting in touch with the validators you like to stake to.

### The Validator setup

When you delegate to a validator nobody wants that validator to be comprimised in some way in order to prevent any form of slashing. A validator can take many precautions to mitigate this. For example: they can make a difference by upholding a good hardware standard for their validator, implementing a sentry, setting up good monitoring and making sure they have a good security setup configured.

### Project and Community involvement

Everyone can start a validator if technically capable. A difference apart from the technical aspects can be made by their involvement in the project and the community. Some are very actively trying to help the community in different ways. Helping the community will help the community grow and keep the community happy. Validators that are involved with the project means that they are up-to-date on the progress of the project, what is happening and they can use that to help educate the community and the rest of the world. As well as know when they have to upgrade their validator when new upgrades are being released. Not doing this in time will also lead a validator to be slashed if action is not taken in time.

### Value added by the validator

Some validators are able to add value for delegators in various ways. This information should be available on the validators websites.

### Commission taken by the validator

Each validator has the freedom to set their own commission rates. Validators have the power to alter their commission rates as they desire.

You should consider that each validator do have ongoing costs for running their validator and it is fair that they are compensated for their resources and time committed to running their validators. In addition, some validator operators commit significant amount of their time to assisting the community.

You may consider that some validators will provide the bare minimum infrastructure to run a validator while others will run enterprise grade hardware and security which comes with higher operating costs. Sometimes a higher commission rate may represent the higher costs for some operators. Other times, this may not be the case.

### Slashing history and validator uptime

Each validator must strive to provide the highest uptime possible. From time to time, a validator may be jailed for too much downtime of double signing a block. If a validator is jailed, they and their delegators are penalized by losing a portion of their staked tokens \(known as "slashing"\).

You will be able to see a validators jail history by browsing their transaction history in the block explorer. Look out for "unjail" transactions.

Under certain circumstances, a validator may be permanently jailed. This means they can never release themselves from jail and will no longer receive block rewards or be able to vote.

## Staking Tutorials

The following tutorials aim to provide step by instructions to stake your juno to a validator of your choice.

{% page-ref page="omniflix-platform.md" %}

## Command Line Reference

{% page-ref page="../../cli/modules/staking.md" %}

{% page-ref page="../../cli/modules/distribution.md" %}



