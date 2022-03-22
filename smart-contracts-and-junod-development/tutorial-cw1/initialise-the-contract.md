---
description: It's go time!
cover: ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (5).png
coverY: 0
---

# Initialise the Contract

{% hint style="danger" %}
We don't specify it here, but in almost all cases you should provide an `--admin` address when instantiating a contract. If you do not, you will not be able to migrate the contract later.
{% endhint %}

CosmWasm Smart Contracts take their arguments as serialised JSON. This can be created a number of ways, but as we showed in the previous examples, it may well be easiest to use the `node` command line, if that is available to you.

{% hint style="info" %}
There is a Typescript helpers file for most contracts, and extensions for CosmJS, but at the time of writing, they are broken. This will no doubt be fixed soon, providing an alternative way of interacting with contracts other than the CLI.
{% endhint %}

To use the node REPL, type `node` in the terminal.

```javascript
const initobj = {
  admins: ["<your-validator-self-delegate-key>"],
  mutable: false
};

< undefined

JSON.stringify(initobj);

< '{"admins":["<your-validator-self-delegate-key>"],"mutable":false}'
```

With these encoded arguments, you can now instantiate the contract, using the `code_id` from the previous step.

```bash
junod tx wasm instantiate <code-id> '{"admins":["<your-validator-self-delegate-key>"],"mutable":false}' --amount 50000ujunox --label "CW1 example contract" --from <your-key> --chain-id <chain-id> --gas auto -y
```

Once the contract is instantiated, you can find out its contract address:

```bash
junod query wasm list-contract-by-code <code-id>
```

You will need this to interact with the contract.
