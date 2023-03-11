# Get & Decode Transactions

## Get Transactions

You can get a blocks transactions both via the RPC and REST API. You can find other public endpoints on the [https://cosmos.directory/juno/nodes](https://cosmos.directory/juno/nodes) website

### Get with RPC:&#x20;

URL: [https://rpc.juno.strange.love/block](https://rpc.juno.strange.love/block)\
Transaction Array: result.block.data.txs\[]

### Get with REST API:

URL: [https://api.juno.strange.love/cosmos/base/tendermint/v1beta1/blocks/latest](https://api.juno.strange.love/cosmos/base/tendermint/v1beta1/blocks/latest)\
Transaction Array: block.data.txs\[]

### Get with CLI:

```sh
# apt install jq     |  pacman -S jq
junod q block | jq .block.data.txs
```

## Decode: Command Line

You can decode transaction data using the `junod` command:

```sh
junod tx decode <base64-amino-byte-string> --output=json
```

For example

```sh
junod tx decode CoMECvwBCiQvY29zbXdhc20ud2FzbS52MS5Nc2dFeGVjdXRlQ29udHJhY3QS0wEKK2p1bm8xaHRzOGdnMHdudXhxazl4ZXJ1a3djNHB4ZG1ncmdoZG5qdjhnZGcSP2p1bm8xZzVqOXZkNzZjcXQ3ZnNxMjJuZTdqcWZrejR2OXB0a3ZoNGprbnN2d2NocGo3NTNhdHdmczk0MmEyNRpOeyJzd2FwIjp7ImlucHV0X3Rva2VuIjoiVG9rZW4yIiwiaW5wdXRfYW1vdW50IjoiNDUyOTAwMDAwMCIsIm1pbl9vdXRwdXQiOiIwIn19KhMKBXVqdW5vEgo0NTI5MDAwMDAwCoECCiQvY29zbXdhc20ud2FzbS52MS5Nc2dFeGVjdXRlQ29udHJhY3QS2AEKK2p1bm8xaHRzOGdnMHdudXhxazl4ZXJ1a3djNHB4ZG1ncmdoZG5qdjhnZGcSP2p1bm8xZThuNmNoN21za3M0ODdlY3pueWVhZ216ZDVtbDJwcTl0Z2VkcXQydTYzdnJhMHEwcjltcXJqeTZ5cxpUeyJzd2FwIjp7ImlucHV0X3Rva2VuIjoiVG9rZW4xIiwiaW5wdXRfYW1vdW50IjoiNDUyOTAwMDAwMCIsIm1pbl9vdXRwdXQiOiI2MDAwMDAwIn19KhIKBXVqdW5vEgk5NjkwMDAwMDASZgpQCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohA2IKqvhI5iJwjhzNfy90VKT/UKcn7hQtmJD2WtPxiIY5EgQKAggBGEsSEgoMCgV1anVubxIDNjAwEMOaDBpAh+kKHSm07sTOYe8K/m7GhSGgmciMjGPD7eTLtLHX2x1Rp5e0m+cHK2rFB9f9ZNRITrf0L7E/emsOKjdFkUFbnA== --output json
```

returns

```json
{
   "body":{
      "messages":[
         {
            "@type":"/cosmwasm.wasm.v1.MsgExecuteContract",
            "sender":"juno1hts8gg0wnuxqk9xerukwc4pxdmgrghdnjv8gdg",
            "contract":"juno1g5j9vd76cqt7fsq22ne7jqfkz4v9ptkvh4jknsvwchpj753atwfs942a25",
            "msg":{
               "swap":{
                  "input_token":"Token2",
                  "input_amount":"4529000000",
                  "min_output":"0"
               }
            },
            "funds":[
               {
                  "denom":"ujuno",
                  "amount":"4529000000"
               }
            ]
         },
         {
            "@type":"/cosmwasm.wasm.v1.MsgExecuteContract",
            "sender":"juno1hts8gg0wnuxqk9xerukwc4pxdmgrghdnjv8gdg",
            "contract":"juno1e8n6ch7msks487ecznyeagmzd5ml2pq9tgedqt2u63vra0q0r9mqrjy6ys",
            "msg":{
               "swap":{
                  "input_token":"Token1",
                  "input_amount":"4529000000",
                  "min_output":"6000000"
               }
            },
            "funds":[
               {
                  "denom":"ujuno",
                  "amount":"969000000"
               }
            ]
         }
      ],
      "memo":"",
      "timeout_height":"0",
      "extension_options":[
         
      ],
      "non_critical_extension_options":[
         
      ]
   },
   "auth_info":{
      "signer_infos":[
         {
            "public_key":{
               "@type":"/cosmos.crypto.secp256k1.PubKey",
               "key":"A2IKqvhI5iJwjhzNfy90VKT/UKcn7hQtmJD2WtPxiIY5"
            },
            "mode_info":{
               "single":{
                  "mode":"SIGN_MODE_DIRECT"
               }
            },
            "sequence":"75"
         }
      ],
      "fee":{
         "amount":[
            {
               "denom":"ujuno",
               "amount":"600"
            }
         ],
         "gas_limit":"200003",
         "payer":"",
         "granter":""
      }
   },
   "signatures":[
      "h+kKHSm07sTOYe8K/m7GhSGgmciMjGPD7eTLtLHX2x1Rp5e0m+cHK2rFB9f9ZNRITrf0L7E/emsOKjdFkUFbnA=="
   ]
}
```

## Decode with Python (junod)

Using junod and python, we can save this JSON data for later using the following example.\
This excerpt was taken from the [juno-analysis repo](https://github.com/Reecepbcups/juno-analysis/blob/main/main.py)

```python
# python3 -m pip install httpx
import httpx, json, os

RPC_URL = "https://rpc.juno.strange.love:443"
height = 7_000_000

client = httpx.Client()
tx_data: dict[int, dict] = {}

def run_cmd(cmd) -> str:
    return os.popen(cmd).read()


def get_block_transactions(height: int) -> list[str]:
    block = client.get(f"{RPC_URL}/block?height={height}").json()
    block_txs = block["result"]["block"]["data"]["txs"]
    return block_txs


def main():
    version = run_cmd("junod version")
    if len(version) == 0:
        print("Junod not installed. Please install junod and try again.")
        exit(1)

    txs = get_block_transactions(height=height)

    for tx in txs:
        txs_json = json.loads(run_cmd(f"junod tx decode {tx} --output json"))
        tx_data[height] = txs_json.get("body", {}).get("messages", [])

    # Do something with that tx data here
    print(tx_data)

if __name__ == "__main__":
    main()
```

## Decode with Python (protobuf)

If you have experience with protobuf, you can use cosmospy to decode transaction data and decode is from base64 strings

```python
# python -m pip install cosmospy-protobuf
import base64
import cosmospy_protobuf.cosmos.tx.v1beta1.tx_pb2 as tx_pb2

tx = "CpMBCpABChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnAKLWNvc21vczEweGw5cXV1Z2N2amhsMGdsamplaG1oeHhhN3cwaDM5ZTJ2aGFndhItY29zbW9zMThsemp0NWpwcjdtd3U0dHlkbGNmZ2N1dHI2Z25ycGsweWo4ZnNjGhAKBXVhdG9tEgcxMDAwMDAwEmcKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQM+g5XXnqLLelLxz8CTy+vG5aO7SohNKS78OtL9ysdcEhIECgIIARgCEhMKDQoFdWF0b20SBDIyNzUQ+MYFGkBbTDHP0mn8d2hxQnNUE/SeudBrXMgjyRO5Bv12D4iWgk4cPsczc6EaDQD3v7cqqD22HL8ZZXVMF3GKi1SNAGNT"
decode64 = base64.b64decode(tx)
tx = tx_pb2.Tx()
tx.ParseFromString(decode64)

print(tx)
# print(tx.body.messages)
```

