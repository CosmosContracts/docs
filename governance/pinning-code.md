Pinning a code ID adds it to validators' cach. In effect, this removes startup fees associated with invoking contracts that use that code ID.

Frequently-used contracts can be pinned in the mainnet by governance proposal.

To do so, create a [`PinCodesProposal`](https://github.com/CosmWasm/wasmd/blob/master/proto/cosmwasm/wasm/v1/proposal.proto#L94-L104)

For example:

```
{
  "title": "Pin cw20 contract",
  "description": "Reduce startup fees associated with invoking cw-20",
  "code_ids": [ [your-cw20-code-id] ]
}
```

Likewise, `UnpinCodes` can unpin already-pinned contracts. The specified `code_ids` will be unpinned.

*Note*: For now, you will need to submit these proposals with protobuf as we [await upstream CLI](https://github.com/CosmWasm/wasmd/issues/686) support in wasmd. 

*How does this work?* CosmWasm uses an LRU cache to store recently used
contracts in memory. Contracts in cache have considerably lower startup times,
saving gas. Pinning a contract ensures it doesn't leave validators' caches.
Doing so consumes about 20MB per contract on every node, but guarantees startup
costs for the contract will be negligible.
