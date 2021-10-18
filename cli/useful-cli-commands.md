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

Set the default chain for commands to use:\\

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
