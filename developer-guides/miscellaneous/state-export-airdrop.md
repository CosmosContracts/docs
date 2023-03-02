---
description: Getting all balances with some token held. Useful for airdrops.
---

# State Export / Airdrop

{% hint style="info" %}
This guide will require you to understand some basic scripting through JSON files to calculate the logic you want for tokens in the format you wish. If you need a website version of this, you can use [https://juno.tools/airdrops/](https://juno.tools/airdrops/)
{% endhint %}

## Native (JUNO) Export

To airdrop, you will need a state export file. These come from a full node that is synced up to the network and stopped. These nodes typically only hold 30 days' worth of data, so ensure you take an export between now and 30 days ago. You can ensure your height is within this time by checking [Mintscan](https://hub.mintscan.io/).

Automatic exports can be found here for convenience [https://exports.reece.sh/juno/](https://exports.reece.sh/juno/). Downloading from here allows you to skip the rest of this guide.\
\
[For this guide, you will need to setup a node from this guide](../../validators/joining-mainnet/#junod-installation). You do not need a validator to do this. Once your node is running and at the latest block, do the following.

```sh
# stop the juno node from running then
cd ~/.juno/
junod export HEIGHT-HERE > juno_state_export.json
# Where HEIGHT-HERE is the block height you want, for example 7000000
```

{% hint style="info" %}
Some exports require > and others require 2>, this is due to an SDK bug that outputs it to STDERR. If you see it throwing out the text to your screen, try using the other ">" or "2>" operator. We want it to get formatted into the file.\
\
This can take upwards of 30 minutes to complete, so be patient.
{% endhint %}

Once the command exits, check your file size. It should be large. If it only shows 4KB, then you have not exported the state correctly due to an issue with height or version. This will have been output in the file itself, so follow the error to fix the reason it could not export correctly. You can check the file size like so

```
du -sh juno_state_export.json
```

Then check to ensure the file is valid and no extra logs got into your JSON. If the below fails, there is likely text at the top of your file that you need to remove from logs

```
cat juno_state_export.json | python -c "import sys,json;json.loads(sys.stdin.read());print 'OK'"
```

Once the above is complete, you are ready to follow the write scripts to parse, edit, and get the data into a format for your needs. You most likely need to stream the file in most languages due to the size. [Here is an example in python for streaming the sections](https://github.com/Reecepbcups/airdrop-tools/blob/main/export-sort/utils.py).

## CW20 Balances

This section will require you to run 2 scripts which gets all balances held at a select block on chain.\


```sh
# script1.sh
CW20_CONTRACT="juno1hnftys64ectjfynm6qjk9my8jd3f6l9dq9utcd3dy8ehwrsx9q4q7n9uxt"
LIMIT="500"
REST_NODE="https://api.juno.strange.love:443"

# make dir CW20s if not already made
mkdir -p CW20s

# the block height we want to query at
HEIGHT=7131467

next_pag_key=""
urlencode() {
    # urlencode <string>
    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C
    
    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:$i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf '%s' "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done

    LC_COLLATE=$old_lc_collate
}

# Loop through until we dont have any more pages
while true; do
    # get a random UUID for this file to merge later
    UUID=$(uuidgen) && FILENAME="CW20s/cw20-$UUID.json"

    # check if next_pag_key is empty
    if [[ -z $next_pag_key ]]; then
        echo "no key = 1st run"        
        curl -X GET "$REST_NODE/cosmwasm/wasm/v1/contract/$CW20_CONTRACT/state?pagination.limit=$LIMIT" -H  "accept: application/json" -H "x-cosmos-block-height: $HEIGHT" > $FILENAME
    else
        echo "Running with page key: $next_pag_key"
        URL_CODE=$(urlencode $next_pag_key)        
        curl -X GET "$REST_NODE/cosmwasm/wasm/v1/contract/$CW20_CONTRACT/state?pagination.key=$URL_CODE&pagination.limit=$LIMIT" -H  "accept: application/json" -H "x-cosmos-block-height: $HEIGHT" > $FILENAME        
    fi

    # echo "Getting all keys from $FILENAME"
    next_pag_key=`jq -r '.pagination.next_key' $FILENAME`
    # if next_pag_key if null, then we are done
    if [[ $next_pag_key == "null" ]]; then
        echo "No more pages, Finished!"
        break
    fi
done

echo "Please run script2.py now to convert the CW20s folder files -> balances.json"
```

```python
# script2.py
import base64
import json
import os

current_dir = os.path.dirname(os.path.realpath(__file__))
CW20s = os.path.join(current_dir, "CW20s")
def hex_string_to_uft8(hex_string):
    return bytearray.fromhex(hex_string).decode()
def base64_to_uft8(base64_string):
    return base64.b64decode(base64_string).decode()


balances = {}
total_balances = 0
for file in os.listdir(CW20s):
    # read the file
    with open(os.path.join(CW20s, file), "r") as f:
        data = json.load(f)
        # get models key if found
        if "models" not in data:
            continue
        modules = list(data["models"])
        for m in modules:
            key = hex_string_to_uft8(m["key"])
            if "balance" not in key:
                break
            address = str(
                # you may have to edit the replace statement depending on the contract
                key.replace("balance", "").replace("\u0000\u0007", "")
            )  # balancejuno1000xz25ydz8h9rwgnv30l9p0x500dvj0s9yyc9 -> juno1000xz25ydz8h9rwgnv30l9p0x500dvj0s9yyc9

            balance = int(
                base64_to_uft8(m["value"]).replace('"', "")
            )
            if balance <= 0:
                continue

            balances[address] = balance
            total_balances += balance

# save balances to a file as JSON
with open(os.path.join(current_dir, "balances.json"), "w") as f:
    balances = {
        k: v for k, v in sorted(balances.items(), key=lambda x: x[1], reverse=True)
    }
    json.dump(balances, f, indent=2)
    print("Balances saved to balances.json. Total Value: {total_balances:.0f}")
```
