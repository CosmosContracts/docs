---
description: Instructions for setting up the golang relayer, ibc-go (rly)
cover: ../.gitbook/assets/Discord Invite (1) (50).png
coverY: 0
---

# Relaying

## Assumptions

One of the main advantages of Relayer (known as rly that is the implementation of ibc-go libraries) VS Hermes is that rly needs only RPC nodes to work well, instead of RPC, gRPC and RPC Web. This makes it very interesting if you don't have your own node up and running for a specific chain but you want to help relay packets versus that chain and can't find reliable gRPCs. Despite this advantage, rly can work with your own local/remote nodes to improve further his relay performance. Remember that relaying works in a first-come-first-served way, so using remote RPCs or public overloaded RPCs with high latencies will make you relaying slower than other relayers, and relying on public RPC (nodes not monitored by you) gives always a higher level of uncertainty.

We assume that you already have access to Juno, Osmosis and Cosmos nodes. These can be either local nodes, or you can access them over the network. The given example has all relayed chains run remotely by public RPCs. Feel free to change the RPCs addresses in the configuration file.

In these instructions, rly is installed under `/srv/rly`, adjust the paths according to your setup.

These instructions are based on installation on Ubuntu 20.04LTS, but should work the same on Debian 11 or Ubuntu 22.04LTS.

You will need to **go**, **build-essential** and **git** installed to follow these instructions.

## Building rly

For preparation, we will create a dedicated user to run rly. The following command will also create a home directory for the new user.

```bash
sudo useradd -m -d /srv/rly 
```

We will next switch to the rly user and create a directory where we will compile the relayer software.

```bash
sudo sudo -u rly -s
cd /srv/rly/
```

Now is the time to clone the source repository and build it. Note that we need to check out the latest release (the git checkout command below will do it for us).

```bash
git clone https://github.com/cosmos/relayer.git
cd relayer
git checkout $(git describe --tags $(git rev-list --tags --max-count=1))
make install
```

Next, we will check that the newly built rly version is the correct one (the values below are for v2.1.2):

```bash
rly version
version: 2.1.2
commit: unknown
cosmos-sdk: v0.46.0
go: go1.18 linux/amd64
```

{% hint style="warning" %}
If you get an output like \`'rly' not found\` you should probably add \`/srv/rly/go/bin\` to your PATH
{% endhint %}

## Configuring rly

First, we need to init rly so it will create the default configuration (location `~/.relayer/config/config.yaml`) maybe with a custom memo that will be written on relayed transactions

```bash
rly config init --memo "My custom memo"
```

Then we will add the chains (Juno, Cosmos and Osmosis here) on the config file with a simple command:

```bash
rly chains add juno cosmoshub osmosis
```

{% hint style="info" %}
Chains configuration will be pulled from chain-registry https://github.com/cosmos/chain-registry so if you find misconfigurations (like gas fees or other) feel free to contribute.
{% endhint %}

Also RPCs will be chosen from chain-registry, so feel free to change them to your local nodes' RPCs or to a preferred public RPC.

## Setting up wallets

We have two options to connect a wallet. The first is to create a new one (replace `<key name>` with your preferred name):

```bash
rly keys add juno <key-name>
{"mnemonic":"24 words menmonic","address":"juno address"}
```

the second option is to import it from your 24 words (key name could be the same for all chains or different for every chains)

```bash
rly keys restore cosmoshub <key-name> "<24 mnemonic words here>"
rly keys restore osmosis <key-name> "<24 mnemonic words here>"
```

In that case, you can create a new wallet, backup your keys and use the same keys to import for all the other relayed chains (if you like it).

Now edit the configuration file (under \~/.relayer/config/config.yaml) changing the `key` values according to the you had defined above. Example:

```bash
    juno:
        type: cosmos
        value:
            key: <YOUR-KEY-NAME-HERE>
            chain-id: juno-1
            rpc-addr: https://rpc-juno.itastakers.com:443
```

In the last step of wallet configuration you can fund your wallets and check balances:

```bash
rly q balance juno
rly q balance cosmoshub
rly q balance osmosis
```

## Configuring paths

You now have chains and wallets, but need to configure the paths across the chains. This is super-easy thanks to chain-registry information's:

```bash
rly paths fetch
added:  cosmoshub-juno
added:  cosmoshub-osmosis
added:  juno-osmosis
  
rly paths list
 0: juno-osmosis         -> chns(✔) clnts(✔) conn(✔) (juno-1<>osmosis-1)
 1: cosmoshub-juno       -> chns(✔) clnts(✔) conn(✔) (cosmoshub-4<>juno-1)
 2: cosmoshub-osmosis    -> chns(✔) clnts(✔) conn(✔) (cosmoshub-4<>osmosis-1)
```

And then check that all the chains' information are good to go (in that example wallets are empty)

```bash
rly chains list
 1: cosmoshub-4          -> type(cosmos) key(✔) bal(✘) path(✔)
 2: juno-1               -> type(cosmos) key(✔) bal(✘) path(✔)
 3: osmosis-1            -> type(cosmos) key(✔) bal(✘) path(✔)
```

## Testing the setup

Let's do a quick test to see if things work properly.

```bash
rly start
```

Once we see things load up correctly and there are no fatal errors or impossible to connect to RPCs (you will see a lot of warnings or even errors even if correctly configured, mainly because of temporary RPCs fetching data), we can break out of rly with **ctrl-c**.

## Configuring systemd

Now we will setup rly to be run by systemd, and to start automatically on reboots. Beware of the `After=` parameter, because if you are using local nodes instead of remote ones you should add the services name here, like `After=network.target juno.service cosmos.service osmo.service` In this example we are using remote nodes, so we specify only `After=network.target`.

{% hint style="info" %}
Using public RPCs it's the simplest way to deploy a relayer (you need only relayer hardware, so a very small VPS for example) but this exposes you to RPCs connection issues. For that reason, the service definition below uses the \`RuntimeMaxSec\` parameter (and other 2), in order to restart the rly service every 4 hours (14400s). This reduces the issues with external public RPCs (the 4 hours value it's indicative, tune it after your own tests). If you have your own private RPCs feel free to comment on that section.
{% endhint %}

Create the following configuration to **/etc/systemd/system/rly.service**. If you are still in rly user, exit to your own user (rootdemo here):

```bash
# exit from rly user
exit
sudo tee /etc/systemd/system/rly.service > /dev/null <<EOF  
[Unit]
Description=Rly IBC relayer
ConditionPathExists=/srv/rly/relayer
After=network.target
[Service]
Type=simple
User=rly
ExecStart=/srv/rly/go/bin/rly start
Restart=always
RestartSec=15
# start of parameters to improve connections with public RPCs
RuntimeMaxSec=14400s
StartLimitInterval=200
StartLimitBurst=10
# end of parameters for external RPCs
[Install]
WantedBy=multi-user.target
EOF
```

Then we well start rly with the newly created service and enable it. Note that this step is done from your normal user account that has sudo privileges, so no longer as a rly user.

```bash
systemctl enable rly
systemctl daemon-reload
systemctl start rly
```

{% hint style="info" %}
For troubleshooting you can find some information in rly Github https://github.com/cosmos/relayer/blob/main/docs/troubleshooting.md
{% endhint %}
