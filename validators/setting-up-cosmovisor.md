---
description: >-
  For mainnet, it's recommended to use Cosmovisor to run your node. If you've
  not used it before, then run it during a testnet to check you can get it set
  up correctly.
---

# Setting up Cosmovisor

Setting up Cosmovisor is relatively straightforward. However, it does expect certain environment variables and folder structure to be set.

Cosmovisor allows you to download binaries ahead of time for chain upgrades, meaning that you can do zero (or close to zero) downtime chain upgrades. It's also useful if your local timezone means that a chain upgrade will fall at a bad time.

Rather than having to do stressful ops tasks late at night, it's always better if you can automate them away, and that's what Cosmovisor tries to do.

## Install

First, go and get cosmovisor (recommended approach):

```bash
go get github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor

# or, with go >= 1.15 you can do
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@latest

# to target a specific version:
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@v1.0.0
```

{% hint style="danger" %}
Note that the [latest version of Cosmovisor](https://github.com/cosmos/cosmos-sdk/releases/tag/cosmovisor%2Fv1.0.0) (`v1.0.0` as of 2021-09-30) has not been used in a Juno testnet. It contains important security fixes but is likely not compatible with using Cosmovisor's`DAEMON_ALLOW_DOWNLOAD_BINARIES`option. In any case, the Juno team do not recommend running with auto downloads turned on, so this should not be an issue.

To build a specific version, you can use the instructions below, or use the previous release tag for Cosmovisor [here](https://github.com/cosmos/cosmos-sdk/releases/tag/cosmovisor%2Fv0.1.0).

Once this has been deployed in production and tested, the Juno team will update this warning message.
{% endhint %}

Your installation can be confirmed with:

```bash
which cosmovisor
```

This will return something like:

```bash
/home/<your-user>/go/bin/cosmovisor
```

{% hint style="info" %}
Building from source allows you to target a specific version of Cosmovisor, in case you do not want to run 1.0.0 yet.
{% endhint %}

You can also build from source; cosmovisor is in the main `cosmos-sdk` repo on Github, so you can use Git tags to target a specific version. This example uses a tag, `v0.42.7` that refers to the Cosmos SDK, as Cosmovisor-specific tags did not exist before August 2021. The first of these was `cosmovisor/v0.1.0`, and the second is the current release, `cosmovisor/v1.0.0`.

```bash
git clone https://github.com/cosmos/cosmos-sdk
cd cosmos-sdk
git checkout v0.42.7
make cosmovisor
cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor
cd $HOME
```

## Add environment variables to your shell

In the `.profile` file, usually located at `~/.profile`, add:

```bash
export DAEMON_NAME=junod
export DAEMON_HOME=$HOME/.juno
```

Then source your profile to have access to these variables:

```bash
source ~/.profile
```

You can confirm success like so:

```
echo $DAEMON_NAME
```

It should return `junod`.

## Set up folder structure

Cosmovisor expects a certain folder structure:

```bash
.
├── current -> genesis or upgrades/<name>
├── genesis
│   └── bin
│       └── $DAEMON_NAME
└── upgrades
    └── <name>
        └── bin
            └── $DAEMON_NAME
```

Don't worry about `current` - that is simply a symlink used by Cosmovisor. The other folders will need setting up, but this is easy:

```bash
mkdir -p $DAEMON_HOME/cosmovisor/genesis/bin
mkdir -p $DAEMON_HOME/cosmovisor/upgrades
```

## Set up genesis binary

Cosmovisor needs to know which binary to use at genesis. We put this in `$DAEMON_HOME/cosmovisor/genesis/bin`.

First, find the location of the binary you want to use:

```bash
which junod
```

Then use the path returned to copy it to the directory Cosmovisor expects. Let's assume the previous command returned `/home/your-user/go/bin/junod`:

```bash
cp /home/<your-user>/go/bin/junod $DAEMON_HOME/cosmovisor/genesis/bin
```

Once you're done, check the folder structure looks correct using a tool like `tree`.

## Set up service

Commands sent to Cosmovisor are sent to the underlying binary. For example, `cosmovisor version` is the same as typing `junod version`.

Nevertheless, just as we would manage `junod` using a process manager, we would like to make sure Cosmovisor is automatically restarted if something happens, for example an error or reboot.

First, create the service file:

```bash
sudo nano /etc/systemd/system/cosmovisor.service
```

Change the contents of the below to match your setup - `cosmovisor` is likely at `~/go/bin/cosmovisor` regardless of which installation path you took above, but it's worth checking.

```
[Unit]
Description=cosmovisor
After=network-online.target

[Service]
User=<your-user>
ExecStart=/home/<your-user>/go/bin/cosmovisor start
Restart=always
RestartSec=3
LimitNOFILE=4096
Environment="DAEMON_NAME=junod"
Environment="DAEMON_HOME=/home/<your-user>/.juno"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_LOG_BUFFER_SIZE=512"

[Install]
WantedBy=multi-user.target
```

{% hint style="info" %}
A description of what the environment variables do can be found [here](https://docs.cosmos.network/master/run-node/cosmovisor.html). Change them depending on your setup.
{% endhint %}

Note also that we set buffer size explicitly because of a [live bug in Cosmovisor](https://github.com/cosmos/cosmos-sdk/pull/8590) before version `v1.0.0`. If you are using `v1.0.0`, you may omit that line.

In addition, the same issue can be fixed by reducing the log via env variable. If you are unsure, ask on Discord.

## Start Cosmovisor

Finally, enable the service and start it.

```bash
sudo -S systemctl daemon-reload
sudo -S systemctl enable cosmovisor
sudo systemctl start cosmovisor
```

Check it is running using:

```
sudo systemctl status cosmovisor
```

If you need to monitor the service after launch, you can view the logs using:

```bash
journalctl -u cosmovisor -f
```
