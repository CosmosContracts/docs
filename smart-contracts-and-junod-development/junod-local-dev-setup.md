---
description: 🖥🛠
---

# Junod Local Dev Setup

Want to use `junod` locally for development, or to work with smart contracts? You're in the right place. Running locally is a much easier solution than interacting with a testnet.

This guide focusses on running the chain. If you want to build the binary or develop in go, then check out:

{% content-ref url="../validators/getting-setup.md" %}
[getting-setup.md](../validators/getting-setup.md)
{% endcontent-ref %}

## Using the Seed User

Juno ships with an unsafe seed user in dev mode when you run the prebuilt docker container below, or one of the options that uses `docker-compose`. You can import this user into the CLI by using the mnemonic from the Juno repo, i.e.:

```bash
junod keys add <unsafe-test-key-name> --recover
```

When prompted, add the mnemonic:

```
clip hire initial neck maid actor venue client foam budget lock catalog sweet steak waste crater broccoli pipe steak sister coyote moment obvious choose
```

You will then be returned an address to use: `juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y`

## Run Juno

There is a prebuilt docker image [for you to use](https://github.com/CosmosContracts/juno/pkgs/container/juno). This will start a container with a seeded user. The address and mnemonic used here can be found in the `docker/` directory of the repo. When you're done, you can use `ctrl+c` to stop the container running.

Always pick a tagged version to run, ideally one that matches mainnet. In the example below, it is `v2.1.0` - you should check the [Juno GitHub repository](https://github.com/CosmosContracts/juno/releases) to see which is current for you.

```
docker run -it \
  -p 26656:26656 \
  -p 26657:26657 \
  -e STAKE_TOKEN=ujunox \
  -e UNSAFE_CORS=true \
  ghcr.io/cosmoscontracts/juno:v2.3.1 \
  ./setup_and_run.sh juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y
```

## Quick(est) start dev build

The quickest way to get up-and-running for development purposes, as is documented in the main repo, is to run:

```bash
STAKE_TOKEN=ujunox UNSAFE_CORS=true docker-compose up
```

This builds and runs the node and:

* Creates and initialises a validator
* Adds a default user with a known address (`juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y`)

To use a specific version of Juno, check out a tag before running docker compose.

## Quickstart on the testnet with a public node

If you don't want to go through the process of setting up a node and just want to experiment with the Juno uni testnet:

1. Get a public node's RPC address.
2. In `~/.juno/config/client.toml` set `node="<public node RCP address>"` and `chain-id="uni-2"`.
3. Create a key to use by running `junod keys add <key-name>`.
4. Get that key's public address by running `junod keys show <key-name> -a`.
5. Get some test Juno by sending `$request <key-address>` in the #faucet Discord channel.

You can then verify that you have funds by running `junod query bank balances <key-address>`. Happy hacking!
