---
order: 5
description: How to query and execute commands on your shiny new contract
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (26).png
coverY: 0
---

# Query and run commands

Now you can check that the contract has assigned the right amount to the self-delegate address:

```bash
junod query wasm contract-state smart <contract-address> '{"balance":{"address":"<validator-self-delegate-address>"}}' -b block 
```

From the example above, it will return:

```
data:
  balance: "12345678000"
```

Using the commands supported by `execute` work the same way. The incantation for executing commands on a contract via the CLI is:

```bash
junod tx wasm execute [contract_addr_bech32] [json_encoded_send_args] --amount [coins,optional] [flags]
```

You can omit `--amount` if not needed for `execute` calls.

{% hint style="info" %}
You will likely need to add additional flags depending on your local node's gas settings. If in doubt, `--gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3` will work. If you also add `-b block`, then the tx will block until complete or failed, rather than executing asynchronously.
{% endhint %}

In this case, your command will look something like:

```
junod tx wasm execute <contract-addr> '{"transfer":{"amount":"200","owner":"<validator-self-delegate-address>","recipient":"<recipient-address>"}}' --from <your-key> --chain-id <chain-id>
```

## Passing arguments

As before, you can encode whatever JSON arguments you need via the node CLI (or another tool of your choice). But how do you know what arguments to use?

Every contract specifies the arguments that can be used for each action exposed to `execute`. Their types are also specified.

This specification, or spec, for short, can be found in the schema for the contract.

In the folder `contracts/erc20` within `cosmwasm-examples`, for example, you can see the schemas:

```bash
tree schema

schema
├── allowance_response.json
├── balance_response.json
├── constants.json
├── execute_msg.json
├── instantiate_msg.json
└── query_msg.json
```

Each of the JSON files above is a JSON schema, specifying the correct shape of JSON that it accepts.

Even though it is your job as a developer to provide documentation to your users, at a bare minimum, the schema will enforce argument correctness and provide basic documentation to others.
