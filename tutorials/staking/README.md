---
description: "Lets secure the network  \U0001F512 \U0001F511"
---

# Staking

## Selecting a Validator

There are many validator candidates to select from when it comes to delegating your Juno. The following discussion aims to provide you with some points for consideration when selecting a validator for your staked Juno. It is important that you do a little research before delegating your Juno.

Some points to consider when selecting a validator:

* [Decentralization of the network](./#decentralization-of-the-network)
* [Reputation of the validator](./#reputation-of-the-validator)
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



