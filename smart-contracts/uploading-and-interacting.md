---
description: >-
  We have the binary ready. Now it is time to see some wasm action. You can use
  Go CLI or Node Console as you wish.
---

# Uploading and Interacting

### Go CLI <a id="go-cli"></a>

We generated a wasm binary executable in the previous chapter. Let's put it into use. Now, we will upload the code to the blockchain. Afterwards, you can download the bytecode to verify it is proper. The contract.wasm is the compiled version and is directory dependant in the command. So make sure you include the path in to the command.

```text
# see how many codes we have now
junod query wasm list-code $NODE

# gas is huge due to wasm size... but auto-zipping reduced this from 1.8M to around 600k
# you can see the code in the result

junod tx wasm store contract.wasm  --from <moniker> --chain-id=<chain-id-here> --gas auto

# you can list the code by running
junod query wasm list-code --chain-id <chain-id-here>

# no contracts yet, this should return `null`
junod query wasm list-contract-by-code $CODE_ID --chain-id <chain-id-here>

# you can also download the wasm from the chain and check that the diff between them is empty
junod query wasm code $CODE_ID --chain-id juno-testnet-5 download.wasm
diff contract.wasm download.wasm

```

#### Instantiating the Contract \(\*TO BE CONTINUED\) <a id="instantiating-the-contract"></a>

We can now create an instance of this wasm contract. Here the verifier will fund an escrow, that will allow fred to control payout and upon release, the funds go to bob.

```text
# instantiate contract and verify
INIT=$(jq -n --arg highlander2 $(junod keys show -a fred) --arg bob $(junod keys show -a bob) '{"arbiter":$fred,"recipient":$bob}')

```



