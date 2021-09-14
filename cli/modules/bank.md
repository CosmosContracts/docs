---
description: >-
  bank module allows you to manage assets for accounts loaded into the local
  keys module
---

# bank

## Available Commands

| Name | Description |
| :--- | :--- |
| [balances](bank.md#iris-query-bank-balances) | Query for account balances by address |
| [total](bank.md#junod-query-bank-total) | Query the total supply of coins of the chain |
| [send](bank.md#junod-tx-bank-send) | Create and/or sign and broadcast a MsgSend transaction |

### junod query bank balances <a id="iris-query-bank-balances"></a>

Query the total balance of an account or of a specific denomination.

```text
junod query bank balances [address] [flags]
```

**Flags:**

| Name, shorthand | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| -h, --help |  |  |  | Help for coin-type |
| --denom | string |  |  | The specific balance denomination to query for |
| --count-total |  |  |  | Count total number of records in all balances to query for |

### junod query bank total

Query total supply of coins that are held by accounts in the chain.

```text
junod query bank total [flags]
```

**Flags:**

| Name, shorthand | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| -h, --help |  |  |  | Help for coin-type |
| --denom | string |  |  | The specific balance denomination to query for |

### junod tx bank send

Sending tokens to another address, this command includes `generate`, `sign` and `broadcast` steps.

```text
iris tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

**Flags:**

| Name, shorthand | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| -h, --help |  |  |  | Help for balances |

