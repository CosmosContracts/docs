---
description: Query an accounts past transactions
---

# Get Account Transactions

{% hint style="info" %}
Most cosmos nodes will only hold 30 days worth of data. If you need more, you will have to run your own node with > 1TB of storage, or talk with node providers to pay for a private service.
{% endhint %}

Here is the rest endpoint which queries transactions from a given user. It is URL Encoded so single quotes become %27\
[https://api-juno.pupmos.network/cosmos/tx/v1beta1/txs?events=transfer.recipient=%27juno12fzv0wrkllkzkwfv9tch07s3gj9ajhyesersy4%27](https://api-juno.pupmos.network/cosmos/tx/v1beta1/txs?events=transfer.recipient=%27juno12fzv0wrkllkzkwfv9tch07s3gj9ajhyesersy4%27)

### Other Event Types

Other event types can be found in the tendermint 34 documentation [https://docs.tendermint.com/v0.34/rpc/](https://docs.tendermint.com/v0.34/rpc/) such as `tm.event='NewBlock'` if you subscribe via the websocket.
