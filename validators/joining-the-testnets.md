---
description: Time to Connect!
---

# Joining The Testnets

{% hint style="info" %}
**IMPORTANT: Be sure to run the following on the machine you'll use for the testnet.** 🙇
{% endhint %}

## **Joining as a Validator**

{% hint style="info" %}
In the following examples, `chainId`, `chain-id`, `CHAIN_ID` etc all should be the testnet name, i.e. something like `juno-testnet-1`

If you're unsure what the current testnet chain ID is, ask on Discord.
{% endhint %}

Run the following command from a server to propose yourself as a validator:

```bash
starport network chain join [chainID] --nightly
```

Follow the prompts to provide information about the validator. You will need to create an account on the Starport Network \(SPN\), followed by one on the testnet.

Starport will download the source code of the blockchain node, build, initialize and create and send two proposals to SPN: to add an account and to add a validator with self-delegation.

By running a `join` command you act as a "validator".

When going through the setup, you can use the default values for tokens etc. Where a field says `(optional)` hit `ENTER` to continue if you are happy with the default.

When filling out the required parameters ensure to include the **'stake'** word after the required values for the inputs to be accepted. This is because for early testnets we are using the defaults rather than juno-specific names.

**Important!** if the terminal gets an error or hangs then you can also try:

```bash
starport network chain join [chainID] --nightly --keyring-backend "test"`
```

{% hint style="info" %}
**IMPORTANT:** Be sure to write down your seed phrase, you'll need to add your key to junod to interact with the chain.
{% endhint %}

When you are done, you can check your proposal with:

```bash
starport network proposal list [chainID] --nightly | grep $(curl -s ifconfig.me) -B 1
```

The output should contain your server IP address.

At this point, you should probably add the key you've just created to `junod`:

```sh
junod keys add <your-key-name> -i
```

`junod` will prompt you for the seed phrase you were given earlier. The key name you use here will be the one that you pass to the `--from` flag later.

This will allow you to transact on the testnet.

## Starting your Blockchain Node

{% hint style="info" %}
Before launching your validator, make sure that the genesis has been built and released, otherwise you will need to reset your chain and restart.
{% endhint %}

Run the following command to start your blockchain node:

```bash
starport network chain start [chainID] --nightly
```

This command will use SPN to create a correct genesis file, configure and launch your blockchain node. Once the node is started and the required number of validators are online, you will see output with incrementing block height number, which means that the blockchain has been successfully started.

Even if you are going to run with `systemd` as per the examples below, you will need to run this command first, as it fetches the genesis.

## Running in Production

Create a systemd file for your Juno service:

```bash
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

{% hint style="info" %}
**This assumes `$HOME/go_workspace` to be your Go workspace. Your actual workspace directory may vary.**

**The default port here is `26656` - this should be open via the server firewall and any external security measures \(e.g. AWS security group\)**
{% endhint %}

Enable and start the new service:

```bash
sudo systemctl enable junod
sudo systemctl start junod
```

Check status:

```bash
junod status
```

Check logs:

```bash
journalctl -u junod -f
```

When the chain is coming up, you should be able to see output for this command:

```bash
curl -s localhost:26657/consensus_state | jq '.result.round_state.height_vote_set[0].prevotes_bit_array'
```

If you see output, your node is up. Note that the command requires the `jq` tool.

