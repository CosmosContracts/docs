Pinning a code ID adds it to validators' cach. In effect, this removes startup fees associated with invoking contracts that use that code ID.

## Querying pinned code

You can see which contracts are currently pinned with

```sh
junod query wasm pinned
```

This will return a list of code IDs that have been pinned:

```bash
junod query wasm pinned --node $NODE         
code_ids: []
pagination:
  next_key: null
  total: "0"
```

## Pinning and unpinning code through governance

Frequently-used contracts can be pinned in the mainnet by governance proposal. To do so, create a [`PinCodesProposal`](https://github.com/CosmWasm/wasmd/blob/master/proto/cosmwasm/wasm/v1/proposal.proto#L94-L104)

The `content` of the proposal looks like this:

```json
{
 "@type":"/cosmwasm.wasm.v1.PinCodesProposal",
 "title":"Pin Wasm Codes",
 "description":"Pin cw20, cw721 wasm codes",
 "code_ids": [1, 5]
}
```
You can now build this into a SubmitProposal message:

```
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgSubmitProposal","content":{"@type":"/cosmwasm.wasm.v1.PinCodesProposal","title":"Pin Wasm Codes","description":"Pin cw20, cw721 wasm codes","code_ids": [1, 5]},"initial_deposit":[],"proposer":"juno17p23vp5c80qmztss8aj9myrt8dc69zel0urmk5"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"ujunox","amount":"5000"}],"gas_limit":"200000","payer":"","granter":""}},"signatures":[]}
{
  "title": "Pin cw20 contract",
  "description": "Reduce startup fees associated with invoking cw-20",
  "code_ids": [ [your-cw20-code-id] ]
}
```

And sign and broadcast it:

```
junod tx sign tx_unsigned.json --from validator --chain-id=uni
junod tx broadcast tx_signed.json
```

Likewise, `UnpinCodes` can unpin already-pinned contracts. The specified `code_ids` will be unpinned.

*Note*: For now, you will need to submit these proposals manually as we [await upstream CLI](https://github.com/CosmWasm/wasmd/issues/686) support in wasmd. 

*How does this work?* CosmWasm uses an LRU cache to store recently used
contracts in memory. Contracts in cache have considerably lower startup times,
saving gas. Pinning a contract ensures it doesn't leave validators' caches.
Doing so consumes about 20MB per contract on every node, but guarantees startup
costs for the contract will be negligible.
