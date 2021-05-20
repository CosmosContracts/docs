---
order: 4
description: Now it's time for the fun stuff. Let's configure and get this contract up-and-running.
---

# Initialise the contract

Now we've uploaded the contract, we need to initialise it.

We're using the Poodle Coin example here - `$POOD` was the first meme coin deployed to a Juno testnet.

{% hint style="info" %}
Choose another name rather than Poodle Coin/POOD, as this is likely already taken on the testnet.
{% endhint %}

## Generate JSON with arguments

To generate the JSON, you can use `jq`, or, if you're more familiar with JS/node, write a hash and encode it using the node CLI.

```js
> const initHash = {
  name: "Poodle Coin",
  symbol: "POOD",
  decimals: 6,
  initial_balances: [
    { address: "<validator-self-delegate-address>", amount: "12345678000"},
  ],
  mint: {
    minter: "<validator-self-delegate-address>",
    cap: "99900000000"
  },
};
< undefined
> JSON.stringify(initHash);
< '{"name":"Poodle Coin","symbol":"POOD","decimals":6,"initial_balances":[{"address":"<validator-self-delegate-address>","amount":"12345678000"}],"mint":{"minter":"<validator-self-delegate-address>","cap":"99900000000"}}'
```

## Instantiate the contract

Note also that the `--amount` is used to initialise the new account.

```sh
junod tx wasm instantiate 6 \
    '{"name":"Poodle Coin","symbol":"POOD","decimals":6,"initial_balances":[{"address":"<validator-self-delegate-address>","amount":"12345678000"}],"mint":{"minter":"<validator-self-delegate-address>","cap":"99900000000"}}' \
    --amount=50000stake  --label "Poodlecoin erc20" --from <your-key> --chain-id=<chain-id> --gas auto -y
```

If this succeeds, look in the output and get contract address from output e.g `juno1a2b....` or run:

```sh
CONTRACT_ADDR=$(junod query wasm list-contract-by-code $CODE_ID | jq -r '.[0].address')
```

This will allow you to query using the value of `$CONTRACT_ADDR`

```sh
junod query wasm contract $CONTRACT_ADDR
```