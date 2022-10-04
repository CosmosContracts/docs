---
cover: >-
  ../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1) (1)
  (23).png
coverY: 0
---

# Useful CLI Commands

Get standard debug info from the `juno` daemon:

```bash
junod status
```

Check if your node is catching up:

```bash
# Query via the RPC (default port: 26657)
curl http://localhost:26657/status | jq .result.sync_info.catching_up
```

Get your node ID:

```bash
junod tendermint show-node-id
```

{% hint style="info" %}
Your peer address will be the result of this plus host and port, i.e. `<id>@<host>:26656` if you are using the default port.
{% endhint %}

Check if you are jailed or tombstoned:

```bash
junod query slashing signing-info $(junod tendermint show-validator)
```

Set the default chain for commands to use:

```bash
junod config chain-id juno-1
```

Get your `valoper` address:

```bash
junod keys show <your-key-name> -a --bech val
```

See keys on the current box:

```bash
junod keys list
```

Import a key from a mnemonic:

```bash
junod keys add <new-key-name> --recover
```

Export a private key (warning: don't do this unless you know what you're doing!)

```bash
junod keys export <your-key-name> --unsafe --unarmored-hex
```

Withdraw rewards (including validator commission), where `junovaloper1...` is the validator address:

```bash
junod tx distribution withdraw-rewards <junovaloper1...> --from <your-key>  --commission
```

Stake:

```bash
junod tx staking delegate <junovaloper1...> <AMOUNT>ujuno --from <your-key>
```

Find out what the JSON for a command would be using `--generate-only`:

```bash
junod tx bank send $(junod keys show <your-key-name> -a) <recipient addr> <AMOUNT>ujuno --generate-only
```

Query the results of a gov vote that has ended, from a remote RPC (NB - you have to specify a height before the vote ended):

```bash
 junod q gov votes 1 --height <height-before-vote-ended> --node https://rpc-archive.junonetwork.io:443
```

Query the validator set (and jailed status) via CLI:

```bash
junod query staking validators --limit 1000 -o json | jq -r '.validators[] | [.operator_address, (.tokens|tonumber / pow(10; 6)), .description.moniker, .jail, .status] | @csv' | column -t -s"," | sort -k2 -n -r | nl
```

Get contract state:

```bash
junod q wasm contract-state all <contract-address>
```
