---
cover: ../.gitbook/assets/Discord Invite (1).png
coverY: 261
---

# Submitting a Proposal (CLI)

[Governance proposals](https://hub.cosmos.network/main/resources/gaiad.html) target the parameters of specific modules. Go to the [list of modules](https://docs.cosmos.network/master/modules/), and go to the 'parameters' tab for the module you are interested in.

You can query the current setting for that parameter with `junod query params subspace [module] [parameter]`. For example, to query [the `communitytax` param in `distribution`](https://docs.cosmos.network/master/modules/distribution/07\_params.html), you would do:

```bash
junod query params subspace distribution communitytax
```

> NB: if you have not set it in config, you will need to add chain-id: `--chain-id uni`.

This will return:

```bash
key: communitytax
subspace: distribution
value: '"0.020000000000000000"'
```

You can query [`BaseApp`](https://docs.cosmos.network/master/core/baseapp.html) parameters as well:

```bash
junod query params subspace baseapp BlockParams
```

This will return:

```bash
key: BlockParams
subspace: baseapp
value: '{"max_bytes":"22020096","max_gas":"80000000"}'
```

Let's take this BlockParams parameter as an example. Say we want to create a proposal that increases this value.

We can encode the parameter change in a JSON proposal like so:

```json
{
  "title": "Governance Proposal to add maximum per block gas",
  "description": "To stop potential attacks against the network via the use of malicious smart contracts, we need to set a max per block gas limit. From testing on the Uni testnet, the core team feel this value is a good starting point, and it can be increased in future if necessary.",
  "changes": [{
    "key": "BlockParams",
    "subspace": "baseapp",
    "value": {
      "max_gas": "100000000"
    }
  }],
  "deposit": "10000000ujuno"
}
```

We can then submit it:

```bash
junod tx gov submit-proposal param-change ./max_block_gas_proposal.json --from needlecast --fees 5000ujuno --gas auto
```

(Note: this example is [Juno Mainnet Proposal 6](https://www.mintscan.io/juno/proposals/6)).

Other types of proposals include [`community-pool-spend`](https://hub.cosmos.network/main/governance/community-pool-spend/best\_practices.html) and `software-upgrade`/`cancel-software-upgrade`.
