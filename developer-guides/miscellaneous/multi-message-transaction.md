---
description: Understand how to perform multiple actions at the same time in a single block.
---

# Multi Message Transaction

## Transactions Vs Messages

A message is a unit of data that represents a single action or intent to perform an action, such as sending tokens from one account to another, creating a new validator, or executing a smart contract function. Messages are the basic building blocks of transactions and are used to describe the specific action that is being requested. (You can think of these as "sub transactions or commits" bundled up into 1 master transaction push).

A transaction, on the other hand, is a collection of one or more messages that are grouped together and signed by a single account. When a transaction is broadcast to the network, it is validated by the nodes on the blockchain, and if it is deemed valid, the requested actions specified in the messages are executed. Transactions provide a way to ensure that multiple actions can be performed atomically, meaning that either all of the actions are executed successfully or none of them are.

One transaction per block, with a transaction being multiple messages.

## Transaction Limitation / Account Sequence

By default, you can only submit 1 transaction per block. In doing this, it will increase your wallets account sequence by one. If you try to submit multiple transactions in the same block, it will error with a account sequence mismatch error. This means there is a pending transaction for your account already in the on chain pending pool (mempool of transactions). Once this transaction goes through and all messages are successfully executed, you can submit another transaction in the following block.

## Multi Message Transaction (bank)

To generate a multiple message transaction, you will need to slight scripting knowledge to assist for your needs. This works for any module in Juno, and you can add as many different messages to the same transaction within the gas limit. (Gas is a deterministic number describing the amount of computer a given action takes on a node).

First, you need to generate a default single message transaction from the command line. Ensure that the from address is an address you have the key access too.

{% hint style="info" %}
NOTE: ujunox is used on the uni-6 chain-id, while ujuno is used on the mainnet juno1 chain-id.\
\
You can find uni-6 testnet nodes on [https://testnet.cosmos.directory/junotestnet/nodes](https://testnet.cosmos.directory/junotestnet/nodes)
{% endhint %}

```sh
junod tx bank send juno16g2r... juno1t8e... 1000000ujunox \
    --generate-only --fees=5000ujunox \
    --chain-id=uni-6 --node=https://rpc.uni.junonetwork.io:443 [flags] > bankmsgs.json
```

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
        "to_address": "juno1t8ehvswxjfn3ejzkjtntcyrqwvmvuknzy3ajxy",
        "amount": [
          {
            "denom": "ujuno",
            "amount": "1000000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [
          {
              "denom": "ujunox",
              "amount": "5000"
          }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

Here we are interested in the body -> messages section. In this array, we can put any amount of actions (within the gas limitation) for this transaction to execute with a single execute. So if I wanted to send another amount to a different address at the same time as well, we can manually alter the array of messages to add this new message like so

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
        "to_address": "juno1t8ehvswxjfn3ejzkjtntcyrqwvmvuknzy3ajxy",
        "amount": [
          {
            "denom": "ujuno",
            "amount": "1000000"
          }
        ]
      },
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
        "to_address": "juno1ka8v934kgrw6679fs9cuu0kesyl0ljjy4tmycx",
        "amount": [
          {
            "denom": "ujuno",
            "amount": "5000000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [
          {
              "denom": "ujunox",
              "amount": "5000"
          }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

In this case, we send 5JUNO to juno1ka... as well as the original account, at the same time. (Reminder: ujuno is a 6th exponent representation of human readable form). So in the above messages, we in total send 6JUNO.

**NOTE**: If our account only has less than 6JUNO, the entire above transaction would fail (non 0 return code) for not enough balance. Even through the first message is only 1JUNO, all messages in a transaction do not execute unless they are all successful. This is a safety mechanism!

Then we can sign and broadcast it

```bash
# Sign the message from the account who is sending the tokens
# This creates a new file which adds a signature to the signatures array
junod tx sign bankmsgs.json \
    --chain-id=uni-6 --from KEY [flags]
    

# take the output from here and paste it into a file named
# signed_bankmsgs.json. 
# You can also try doing &> signed_bankmsgs.json or > signed_bankmsgs.json
touch signed_bankmsgs.json # create the file


# Broadcast the message to the chain after it is successfully signed
junod tx broadcast signed_bankmsgs.json \
    --from KEY --chain-id=uni-6 [flags]

# Query to ensure it went through well (enough gas and fees)
junod q tx 12A4D888F6737130CE03CEC6BBAFD98855462E81D5AF871949E1EDE1B0B1A14B --node https://rpc.uni.junonetwork.io:443
```

## Multi Message NFT Mint (CosmWasm)

After reading the above guide, the same steps can be applied to mint cosmwasm based NFTs (CW721s). This requires you to submit an NFT contract to chain first, and setup with your collections values before moving on to this step. We will link to that guide HERE in the future.

```sh
# generate the initial Transaction structure
junod tx wasm execute juno1za0uemnhzwkjrqwguy34w45mqdlzfm9hl4s5gp5jtc0e4xvkrwjs6s2rt4 \
    '{"mint":{"token_id":"1","owner":"juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y","token_uri":"https://domain.com/image1.png"}}' \
    --output json --chain-id=uni-6 --yes --generate-only --from juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y
```

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
        "sender": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
        "contract": "juno1za0uemnhzwkjrqwguy34w45mqdlzfm9hl4s5gp5jtc0e4xvkrwjs6s2rt4",
        "msg": {
            "mint": {
                "token_id": "1",
                "owner": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
                "token_uri": "https://domain.com/image1.png"
            }
        },
        "funds": []
      },
      {
        "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
        "sender": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
        "contract": "juno1za0uemnhzwkjrqwguy34w45mqdlzfm9hl4s5gp5jtc0e4xvkrwjs6s2rt4",
        "msg": {
            "mint": {
                "token_id": "2",
                "owner": "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y",
                "token_uri": "https://domain.com/image2.png"
            }
        },
        "funds": []
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [
          {
              "denom": "ujunox",
              "amount": "5000"
          }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

## Automate Minting Example

Here is a python example for how to automate minting NFTs for a contract based off some parameters. This is only the base logic to get you started in the right direction

```python
import json, os

# VARIABLES
START_IDX = 1
NFT_CW721_ADDRESS = "juno1za0uemnhzwkjrqwguy34w45mqdlzfm9hl4s5gp5jtc0e4xvkrwjs6s2rt4"
OWNER_WALLET = "juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y"
links = [
    "https://ipfs.io/ipfs/QmNLoezbXkk37m1DX5iYADRwpqvZ3yfu5UjMG6sndu1AaQ",
    "https://ipfs.io/ipfs/QmNLjZSFV3GUMcusj8keEqVtToEE3ceTSguNom7e4S6pbJ",
    "https://ipfs.io/ipfs/QmNLijobERK4VhSDZdKjt5SrezdRM6k813qcSHd68f3Mqg",
]

current_dir = os.path.dirname(os.path.abspath(__file__))

# LOGIC
msgFmt: dict = {
    "body": {
        "messages": [],
        "memo": f"Minting {len(links)} NFTs",
        "timeout_height": "0",
        "extension_options": [],
        "non_critical_extension_options": [],
    },
    "auth_info": {
        "signer_infos": [],
        "fee": {"amount": [], "gas_limit": "10000000", "payer": "", "granter": ""},
        "tip": None,
    },
    "signatures": [],
}

for idx, link in enumerate(links, START_IDX):
    msgFmt["body"]["messages"].append(
        {
            "@type": "/cosmwasm.wasm.v1.MsgExecuteContract",
            # The wallet who has permission to mint on the CW721 contract
            "sender": f"{OWNER_WALLET}",
            "contract": f"{NFT_CW721_ADDRESS}",
            "msg": {
                "mint": {
                    # Token ID Should be a number starting at 1 and incrementing
                    "token_id": f"{idx}",
                    # Who owns this NFT originally at the time of mint.
                    "owner": f"{OWNER_WALLET}",
                    # the link to the image itself (IPFS, etc.)
                    "token_uri": f"{link}",
                }
            },
            "funds": [],
        }
    )

with open(os.path.join(current_dir, "mint_nfts.json"), "w") as f:
    json.dump(msgFmt, f, indent=4)
```

This saves a file named `mint_nfts.json` to the directory this script is saved in. From here you can do the following to execute it on chain

```sh
# Sign the message from the account who is minting
junod tx sign mint_nfts.json \
    --chain-id=uni-6 --from KEY [flags] &> signed_mint_images.json

# Broadcast the message to the chain after it is successfully signed
junod tx broadcast signed_mint_images.json \
    --from KEY --chain-id=uni-6 [flags]
```
