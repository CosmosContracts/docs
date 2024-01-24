---
description: Submit the code of a smart contract to chain and get its code id
---

# Deploy a Contract

## PreRequisite

Make sure you follow the [compile a contract](compile-a-contract.md) guide first for your project. Once you have a contract compiled in the artifacts/\*.wasm directory, you are ready for this guide.

This guide will show you how to deploy and interact with a contract using CLI. For scripting using Rust, you can use [cw-orchestrator](./cw-orchestrator.md).


## Upload

You need to upload the contract via the CLI to chain. To do this, perform the following

```bash
TXFLAGS="--chain-id=uni-6 --gas-prices=0.025ujunox --gas=auto --gas-adjustment 1.3"

junod tx wasm store artifacts/CONRTACT_NAME.wasm \
    --from <KEY> $TXFLAGS -y --broadcast-mode=block
```

This will then return a transaction hash. With this data, you need to query it to get the code id of the contract on chain

```bash
junod q tx 38330E909CD219B80927009DA37FD69D334D19B2AD4EC47456A24E85034F0085 --output=json
```

This will return the data about the transaction, and give us the code id of our contract

```json
{
  "height": "294601",
  "txhash": "38330E909CD219B80927009DA37FD69D334D19B2AD4EC47456A24E85034F0085",
  "codespace": "",
  "code": 0,
  "data": "0A460A1E2F636F736D7761736D2E7761736D2E76312E4D736753746F7265436F64651224080D12203318E74E8C68DBCC6E0317C42B8DB0AB642B61AEFAD487DEDB6ECB54FFED4D72",
  "raw_log": "[{\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/cosmwasm.wasm.v1.MsgStoreCode\"},{\"key\":\"module\",\"value\":\"wasm\"},{\"key\":\"sender\",\"value\":\"juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl\"}]},{\"type\":\"store_code\",\"attributes\":[{\"key\":\"code_checksum\",\"value\":\"3318e74e8c68dbcc6e0317c42b8db0ab642b61aefad487dedb6ecb54ffed4d72\"},{\"key\":\"code_id\",\"value\":\"13\"}]}]}]",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "/cosmwasm.wasm.v1.MsgStoreCode"
            },
            {
              "key": "module",
              "value": "wasm"
            },
            {
              "key": "sender",
              "value": "juno1hj5fveer5cjtn4wd6wstzugjfdxzl0xps73ftl"
            }
          ]
        },
        {
          "type": "store_code",
          "attributes": [
            {
              "key": "code_checksum",
              "value": "3318e74e8c68dbcc6e0317c42b8db0ab642b61aefad487dedb6ecb54ffed4d72"
            },
            {
              "key": "code_id",
              "value": "13"
            }
          ]
        }
      ]
    }
  }]
}
```

We can see both raw\_log and also logs\[0].events\[1].store\_code shows the code\_id being 13. If you wish the automate this return code in bash to a variable, you can&#x20;

```bash
# ensure jq is installed
UPLOAD_TX_HASH=38330E909CD219B80927009DA37FD69D334D19B2AD4EC47456A24E85034F0085
CODE_ID=$(junod q tx $UPLOAD_TX_HASH --output json | jq -r '.logs[0].events[] | select(.type == "store_code").attributes[] | select(.key == "code_id").value') && echo "Code Id: $CODE_ID"
```

## Instantiate

With the code now being up on chain, we can now run logic to setup our own copy of the contract which we control. This will then give us a unique contract address for others to interact with in accordance with the contract logic. This example is from the [cosmwasm/cw-template](https://github.com/CosmWasm/cw-template).

Ensure you change CODE\_ID to match your code id from the store code

<pre class="language-sh"><code class="lang-sh"># Manual
CODE_ID=1
junod tx wasm instantiate "$CODE_ID" '{"count":0}' --label "some-contract" $FLAGS -y --admin &#x3C;your-address-here>
<strong># then query the tranasaction hash as we do above.
</strong><strong>
</strong># Automated return of the contract address
CODE_ID=1
TX_INIT=$(junod tx wasm instantiate "$CODE_ID" '{"count":0}' --label "contract" $FLAGS -y --admin &#x3C;your-address-here> | jq -r '.txhash') &#x26;&#x26; echo $TX_INIT
CONTRACT_ADDR=$($BINARY query tx $TX_INIT --output json | jq -r '.logs[0].events[0].attributes[0].value') &#x26;&#x26; echo "CONTRACT_ADDR: $CONTRACT_ADDR"
</code></pre>
