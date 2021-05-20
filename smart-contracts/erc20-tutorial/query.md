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
