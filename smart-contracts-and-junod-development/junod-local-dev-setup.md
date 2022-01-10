---
description: 🖥🛠
---

# Junod Local Dev Setup

Want to use `junod` locally for development, or to work with smart contracts? You're in the right place.

## Run Juno

There is a prebuilt docker image [for you to use](https://github.com/CosmosContracts/juno/pkgs/container/juno). This will start a container with a seeded user. The address and mnemonic used here can be found in the `docker/` directory of the repo. When you're done, you can use `ctrl+c` to stop the container running.

```
docker run -it \
  -p 26656:26656 \
  -p 26657:26657 \
  ghcr.io/cosmoscontracts/juno:latest \
  ./setup_and_run.sh juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y
```

## Quick(est) start dev build

The quickest way to get up-and-running for development purposes, as is documented in the main repo, is to run `docker-compose up`.

This builds and runs the node and:

* Creates and initialises a validator
* Adds a default user with a known address (`juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y`)

## Quick(ish) start dev build

Okay, so you want more control, or you want more info. Maybe both!

#### Option 1: Using Docker

This uses`docker exec`, which eliminates the need to install the binary.

1. Open two terminal tabs at the root of this repo.
2. In tab one, build and run Juno: `docker-compose up`
3. Switch to tab two and exec into the container: `docker exec -it juno_node_1 /bin/sh`
4. Run `junod status`. You should see JSON status for the Juno node running in Docker.

NB:

* to force rebuild the container, use: `docker-compose up --build`
* to run in daemon mode, use: `docker-compose up -d`

#### Option 2: Using junod (advanced/dev use)

This assumes you will connect to it via `junod` from outside the container.

1. Open two terminal tabs at the root of the `junod` repo.
2. In tab one, build and run Juno in blocking mode: `./scripts/build_and_run_blocking.sh`. Once it has compiled, you should see blocks appearing.
3. Switch to tab two and build juno outside the container if you haven't already: `make build && make install`.
4. Run `junod status`. You should see JSON status for the Juno node running in Docker.

The RPC port for Juno is forwarded to your host, so as long as Docker is correctly set up, you can send it commands via the Juno binary, `junod` on your host.

Protip: running one of these scripts is also a decent sense-check that:

1. The build is still working
2. The Docker build is still working
3. The code is in a runnable state

## Quickstart on the testnet with a public node

If you don't want to go through the process of setting up a node and just want to experiment with the Juno uni testnet:

1. Get a public node's RPC address.
2. In `~/.juno/config/client.toml` set `node="<public node RCP address>"` and `chain-id="uni-1"`.
3. Create a key to use by running `junod keys add <key-name>`.
4. Get that key's public address by running `junod keys show <key-name> -a`.
5. Get some test Juno by sending `$request <key-address>` in the #faucet Discord channel.

You can then verify that you have funds by running `junod query bank balances <key-address>`. Happy hacking!
