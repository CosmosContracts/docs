---
order: 5
description: How to query and execute commands on your shiny new contract
---

# Querying the contract

Now you can check that the contract has assigned the right amount to the self-delegate address:

```sh
junod query wasm contract-state smart <contract-address> '{"balance":{"address":"<validator-self-delegate-address>"}}'
```

From the example above, it will return:

```
data:
  balance: "12345678000"
```

Using the commands supported by `execute` work the same way. The incantation for executing commands on a contract via the CLI is:

```sh
junod tx wasm execute [contract_addr_bech32] [json_encoded_send_args] --amount [coins,optional] [flags]
```

You can omit `--amount` if not needed.

## Passing arguments

As before, you can encode whatever JSON arguments you need via the node CLI (or another tool of your choice). But how do you know what arguments to use?

Every contract specifies the arguments that can be used for each action exposed to `execute`. Their types are also specified.

This specification, or spec, for short, can be found in the schema for the contract.

In the folder `contracts/erc20` within `cosmwasm-examples`, for example, you can see the schemas:

```sh
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
