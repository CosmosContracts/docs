---
description: 'Juno''s x/FeeShare module: Gas Fee Split for Contract Developers'
---

# FeeShare

## x/FeeShare

The FeeShare module was [proposed in prop 51](https://www.mintscan.io/juno/proposals/51). If you’re a smart contract developer on Juno, you can now earn a cut of all gas fees generated on your contract.

If a transaction interacts with a smart contract, half of the transaction’s fees are set aside for any contract(s) a wallet has interacted with. The first 50% goes to delegators as usual (community pool), with the other 50% being split among each opted-in contract. _This opt-in requirement is only for tax purposes, it is permission-less to do_. You can opt-in and set the withdrawal contract to any other wallet, for example, a personal wallet, a DAO treasury, or a module account.\
\
These fees are paid instantly to the withdraw wallet every block (6 seconds) as interactions take place.

{% hint style="info" %}
At this time, sub messages are not applicable to feesharing due to possible abuse. The team is working to find a solution to this use case for a future version of the module.
{% endhint %}

## Spec

You can view latest specification in the [Juno github](https://github.com/CosmosContracts/juno/tree/main/x/feeshare/spec). Here it describes how to register and update your contract. It also provides the details on queries, events, and different parameters which can be changed by Juno's governance system.

## Register A Contract

The `junod tx feeshare register` command allows you to register the withdrawal address for a contract. This means that any interaction fees generated by the contract will be sent to the specified address.

To use this command, you need to specify the following parameters:

* `contract_bech32`: The bech32 address of the contract whose interaction fees will be shared.
* `withdraw_bech32`: The bech32 address where the interaction fees will be sent every block.
* `--from [key]`: The name or address of the key to sign the transaction.

The withdraw\_bech32 parameter cannot be set to the community pool address because of an SDK limitation. For contracts created or administered by a contract factory, the withdrawal address must be the same as the contract address, which is unchangeable. This is useful for SubDAOs or public goods to save fees in the treasury.

If you create a contract this way, it's best to add an execution method to withdraw fees to an account. To do this, save the withdrawal address in the contract's state before uploading a non-migratable contract.

Only the contract's admin can use this command. If there's no admin, only the creator can use it.

## Update Contract Withdraw Address

The `junod tx feeshare update` command lets you update a contract's withdrawal address, so any interaction fees go to the new address. You must provide:

* `contract`: The address of the contract whose withdrawal address will be updated.
* `new_withdraw_address`: The new bech32 address where the interaction fees will be sent every block.

Only the contract's admin or creator can use this command. It cannot be used if the contract was created or administered by another factory contract (like a DAO), and contracts cannot change their own withdrawal address directly. If ownership changes, the new owner can update the withdrawal address.

## Governance Action for FeeShare

Juno's FeeShare module lets governance control the distribution of transaction fees to developers of contracts. Key actions include:

1. Enable/Disable: Governance can turn the FeeShare module on/off, stopping fees from going to developers and preventing updates to contracts.
2. Set Developer Shares: Governance can set the percentage of fees that developers receive, encouraging contract creation and maintenance. The default is 50%.
3. Define Allowed Denominations: Governance can specify which coins are allowed for fees and paid to developers. Without any specifications, all fees are split among developers. Currently, only JUNO token is shared.

By managing fees, governance incentivizes developers to create and maintain high-quality contracts, increasing the network's value and attracting more users.