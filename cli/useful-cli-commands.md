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

If you don't know the IP of the box, use `ip r | grep default`. You're probably looking for the value to the right of `src` if you're using cloud hosting.

See keys on the current box:

```bash
junod keys list
```

Import a key from a mnemonic:

```bash
junod keys add <new-key-name> --recover
```

Export a private key \(warning: don't do this unless you know what you're doing!\)

```bash
junod keys export <your-key-name> --unsafe --unarmored-hex
```

