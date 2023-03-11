---
description: >-
  Your own native token on the JUNO chain! Better UI, UX, and Developer
  Experience
---

# TokenFactory

The Cosmos stack has a native x/bank module which allows for the minting and sending of tokens without having to follow the CW20 (from ERC20) spec.&#x20;

#### CW20 Migrations & Contract Minting

If you already have a tokenfactory denomination made OR want to migrate your CW20 token, then you can [skip to this section here](tokenfactory.md#tokenfactory-core-contract) for the Core Middleware contract.&#x20;

## Improvements

* Airdrops are many times easier for users holding DAO tokens from a state export, rather than slow paginated CW20 queries
* Frontends such as Keplr and Mintscan will be able to show off your tokens via a single query, rather than RPC querying every CW20 contract (inefficient!)
* Contract developers no longer have to add support for CW20 when all contracts already have native tokens support built in to work with Juno!
* CLI based users will be able to send any token via the standard _junod tx bank send_ instead of wasm execute CW20 message passthroughs with base64 encoded data

## Create A Native Token Transaction

To get started, you will need to create a new denomination from the factory. At the time of writing (March 3, 2023) the cost to create a new token is 1 JUNO. This is to deter spamming of tokens. You can create this token like so:

```
junod tx tokenfactory create-denom [denom-name] [flags]
```

This will create a denomination you are the admin of which will follow the format `factory/juno1addresshere/denom1`. This ensures there are no namespace conflicts.&#x20;

## What tokens do I control

You can view the tokens you control with the following:

```shellscript
junod q tokenfactory denoms-from-creator juno1address... [flags]
```

This command will return a list of all denominations created by the account with address

## Update Token Metadata

You can modify the token metadata to include a human readable ticker symbol, description, and the exponent of the token. We recommend setting these for your denomination before deploying out into production.

```shellscript
junod tx tokenfactory modify-metadata \
    factory/juno1/denom1 SYMBOL "https://description.com" 6 [flags]
```

Where `SYMBOL` is the Ticker symbol for your token. Usually this should be the all capitalized version after the last / in your factory. Example: If your token is `factory/juno1/ugold` your tokens symbol should likely be `GOLD` for it to show up as `$GOLD` in frontends such as Mintscan and Keplr.

The description is an area to link to your website, ipfs, discord, or any other data which is useful to describe what the token does.

Finally the exponent section is helpful for frontends to display your token as expected. Typically this will be `6` for most cosmos tokens. If you do not know what value to give it, stay with `6`. This means 1TOKEN in human readable form is actually 1x(10^6) tokens (1\_000\_000) to allow for fractional tokens. Without this, each token has no ability to handle fraction like values.

{% hint style="info" %}
If you are creating this token to be used as a GAMM, Liquidity Pool, or EVM compatible denomination, you should use**`18`**.
{% endhint %}

## Query Token Metadata

You can query the token metadata via the x/bank module query

```
junod query bank denom-metadata --denom [denom-name] --output=json [flags]
```

Where denom-name is the entire denomination value `factory/juno1.../denom`.&#x20;

```json
{
  "metadatas": [
    {
      "description": "my description here https://domain.com",
      "denom_units": [
        {
          "denom": "factory/juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl/denom1",
          "exponent": 0,
          "aliases": [
            "SYMBOL"
          ]
        },
        {
          "denom": "SYMBOL",
          "exponent": 6,
          "aliases": [
            "factory/juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl/denom1"
          ]
        }
      ],
      "base": "factory/juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl/denom1",
      "display": "factory/juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl/denom1",
      "name": "factory/juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl/denom1",
      "symbol": "SYMBOL"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

## Mint Token

You can only mint a token you control. To allow a contract to mint tokens for you / your DAO, skip to the [contract section.](tokenfactory.md#tokenfactory-core-contract)

```sh
junod tx tokenfactory mint 100factory/juno1.../denom1 --from key [flags]
```

## Send Token

```shellscript
junod tx bank send [key] juno1addresshere 10factory/juno1.../denom1 [flags]
```

## Tokenfactory Core Contract

One of the biggest use cases for a tokenfactory token is to allow a contract to mint on the behalf of other contracts / DAOs. This is possible with the [Token Factory Core Middleware Contract](https://github.com/CosmosContracts/tokenfactory-contracts/tree/main/contracts/tokenfactory\_core) on github. This contract can:

* Mint tokens on behalf of whitelisted contracts addresses via WasmMsg
* Allows an address to add / remove addresses from minting on its behalf
* Burn tokenfactory tokens

This means a DAO/SubDAO/Mutlisig is the manager of the contract. On its behalf, the middleware contract is the direct admin of the tokenfactory denominations so it can mint tokens. Then the DAO/SubDAO/Multisig can add or remove deployed contracts from minting tokens on its behalf. Without this, every contract you control would need its own denomination, which is too limiting if you want to use the same denomination on 2 or more contracts.

[To add support for your contract to mint tokens, just follow the Middleware guide found on the github.](https://github.com/CosmosContracts/tokenfactory-contracts/tree/main/contracts/tokenfactory\_core) This also includes contracts to convert CW20 tokens to native tokens in a 1:1 ratio.

An [example contract can be found HERE](https://github.com/CosmosContracts/tokenfactory-contracts/tree/main/contracts/tf\_example/src) which showcases the direct implementation of the middleware contract.

