# Submitting a Proposal (CLI)

First, you need to find out what param you are targeting. Go to the [list of modules](https://docs.cosmos.network/master/modules/), and go to the 'parameters' tab for the module you are interested in.

To query the current setting for params, query by subspace, e.g.:

```bash
junod query params subspace baseapp BlockParams
```

NB: if you have not set it in config, you will need to add chain id, like `--chain-id uni`.

This will return:

```json
key: BlockParams
subspace: baseapp
value: '{"max_bytes":"22020096","max_gas":"80000000"}'
```

To increase this, encode a parameter change as JSON:

```json
{
  "title": "Governance Proposal to add maximum per block gas",
  "description": "To stop potential attacks against the network via the use of malicious smart contracts, we need to set a max per block gas limit. From testing on the Uni testnet, the core team feel this value is a good starting point, and it can be increased in future if necessary.",
  "changes": [{
    "subspace": "baseapp",
    "key": "BlockParams",
    "value": {
      "max_gas": "100000000"
    }
  }],
  "deposit": "10000000ujuno"
}
```

And then submit it:

```bash
junod tx gov submit-proposal param-change ./max_block_gas_proposal.json --from needlecast --fees 5000ujuno --gas auto
```

You will notice that this is [Juno Mainnet Proposal 6](https://www.mintscan.io/juno/proposals/6).
