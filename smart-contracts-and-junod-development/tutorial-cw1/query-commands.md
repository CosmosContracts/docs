---
description: Some useful commands for querying contract state
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (46).png
coverY: 0
---

# Query commands

### Useful commands

The CW1 subkeys contract has several useful commands available.

You can query a specific address, to see if it has an allowance:

```bash
junod query wasm contract-state smart <contract-addr> '{"allowance":{"spender":"<address>"}}' --chain-id <chain-id>
```

You can query to see which keys are admins:

```bash
junod query wasm contract-state smart <contract-addr> '{"admin_list":{}}' --chain-id <chain-id>
```

Or query to see all allowances:

```bash
junod query wasm contract-state smart <contract-addr> '{"all_allowances":{}}' --chain-id <chain-id>
```
