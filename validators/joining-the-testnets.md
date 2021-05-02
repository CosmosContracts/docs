---
description: Time to Connect!
---

# Joining The Testnets

{% hint style="info" %}
**IMPORTANT: Be sure to run the following on the machine you'll use for the testnet.** 🙇
{% endhint %}

## **Joining as a Validator**

Run the following command from a server to propose yourself as a validator:

```text
starport network chain join [chainID] --nightly
```

Follow the prompts to provide information about the validator. Starport will download the source code of the blockchain node, build, initialize and create and send two proposals to SPN: to add an account and to add a validator with self-delegation. By running a `join` command you act as a "validator". When filling out the required parameters ensure to include the **'stake'** word after the required values for the inputs to be accepted. If the terminal gets an error or hangs then you can also try: `starport network chain join [chainID] --nightly --keyring-backend "test"`

Be sure to write down your seed phrase, you'll need to add your key to junod to interact with the chain.

## Starting your Blockchain Node

Run the following command to start your blockchain node:

```text
starport network chain start [chainID] --nightly
```

This command will use SPN to create a correct genesis file, configure and launch your blockchain node. Once the node is started and the required number of validators are online, you will see output with incrementing block height number, which means that the blockchain has been successfully started.

## Running in Production

Create a systemd file for your Juno service:

```text
sudo vi /etc/systemd/system/junod.service
```

Copy and paste the following and update `<YOUR_USERNAME>`, `<GO_WORKSPACE>`, and `<CHAIN_ID>`:

```text
Description=Juno daemon
After=network-online.target

[Service]
User=root
ExecStart=/home/<YOUR_USERNAME>/<GO_WORKSPACE>/go/bin/junod start --p2p.laddr tcp://0.0.0.0:26656 --home /home/<YOUR_USERNAME>/.spn-chain-homes/<CHAIN_ID>
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```

**This assumes `$HOME/go_workspace` to be your Go workspace. Your actual workspace directory may vary.**

Enable and start the new service:

```text
sudo systemctl enable junod
sudo systemctl start junod
```

Check status:

```text
junod status
```

Check logs:

```text
journalctl -u junod -f
```

