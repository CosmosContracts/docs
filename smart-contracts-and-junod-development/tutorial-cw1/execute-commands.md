---
description: >-
  Now we complete the task - sending some tokens that have been delegated to a
  key
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (1) (1) (34).png
coverY: 0
---

# Execute commands

## Running commands

As mentioned in the introduction, now we want to:

1. As the admin key (**A**)†, set an allowance for a key (**B**)
2. As the key with an allowance, send tokens from key (**B**) to key (**C**)
3. See tokens arrive at key (**C**)
4. See allowance decrease for key (**B**)

† this is the key that you used to instantiate, and set as an admin. If you are running a validator in the testnet, then it is probably your self-delegate key.

### 1. Add allowance for key B

Using `node`, you can again encode the following arguments:

```javascript
{
  increase_allowance: {
    spender: '<key-B>',
    amount: {
      denom: "ujuno",
      amount: "2000000"
    }
  }
}
```

Then, as the admin key (**A**), increase key (**B**)'s allowance:

```bash
junod tx wasm execute <contract-addr> \
  '{"increase_allowance":{"spender":"<key-B>","amount":{"denom":"ujunox","amount":"2000000"}}}' \
  --from <admin-key-A> \
  --chain-id <chain-id> \
  --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 -b block
```

If you query its allowance, you should see a value of `2000000`:

```bash
junod query wasm contract-state smart <contract-addr> '{"allowance":{"spender":"<key-B>"}}' --chain-id <chain-id>
```

Should return:

```bash
data:
  balance:
  - amount: "2000000"
    denom: ujunox
  expires:
    never: {}
```

### 2. Send tokens from key B to key C

First, query the balance of another key, that we did not allocate any tokens to (**C**):

```bash
junod q bank balances <key-C>
```

Let's say it already has a balance of `500ujuno` - the command will return:

```bash
balances:
- amount: "500"
  denom: ujunox
pagination:
  next_key: null
  total: "0"
```

Then, we again need to encode some arguments to JSON for the send:

```javascript
{
  execute: {
    msgs: [{
      bank: {
        send: {
          to_address: "<key-C>",
          amount: [{
            denom: "ujunox",
            amount: "500"
          }]
        }
      }
    }]
  }
};
```

Once we have the JSON, we can shape an `execute` command:

```bash
junod tx wasm execute <contract-addr> \
  '{"execute":{"msgs":[{"bank":{"send":{"to_address":"<key-C>","amount":[{"denom":"ujunox","amount":"500"}]}}}]}}' \
  --from <key-B> \
  --chain-id <chain-id> \
  --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 -b block
```

Note that the `--from` flag is now signing this from the key (**B**) that the admin key (**A**) gave a token balance to. This CW1 Subkeys contract will only work with the native token of the chain, in this case `ujuno`.

### 3. Check balance of key C

If we query balance again:

```bash
junod q bank balances <key-C>
```

We expect to see the balance incremented by `500ujuno`:

```bash
balances:
- amount: "1000"
  denom: ujunox
pagination:
  next_key: null
  total: "0"
```

### 4. See allowance decrease for key B

Now, if we query the allowance for key B, we should see it has decreased by `500ujuno`:

```bash
junod query wasm contract-state smart <contract-addr> '{"allowance":{"spender":"<key-B>"}}' --chain-id <chain-id>
```

```bash
data:
  balance:
  - amount: "1999500"
    denom: ujunox
  expires:
    never: {}
```

We're done!

Play around some more with increasing and decreasing allowances, or even adding expiries to allowances, to get a better feel for how this works.
