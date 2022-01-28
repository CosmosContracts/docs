# Sync a Mainnet Node

In order to run a validator on mainnet, you will have to sync it from genesis, up to the present block. This means replaying all of the chain's history, as well as navigating the upgrades that have happened.

The [mainnet repo](https://github.com/CosmosContracts/mainnet) contains a history of everything that has happened on mainnet.

{% hint style="danger" %}
When configuring your node, make sure that your validator's commission is set to at least 5%, and make sure that minimum gas fees are set to at least `0.0025ujuno` in `app.toml`
{% endhint %}

First, configure fees:

```bash
sed -i.bak -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.0025ujuno\"/" ~/.juno/config/app.toml
```

### Genesis

The first binary to use for genesis is `v1.0.0`:

```bash
git clone https://github.com/CosmosContracts/juno
cd juno
git checkout v1.0.0
make build && make install
junod version --long
```

The final command will return:

```bash
name: juno
server_name: junod
version: HEAD-e507450f2e20aa4017e046bd24a7d8f1d3ca437a
commit: e507450f2e20aa4017e046bd24a7d8f1d3ca437a
```

### Moneta

Then, you will need to set up the `moneta` upgrade. We will assume that you are using cosmovisor, because you should be. You will hit this upgrade at block `1055000` and the chain will halt.

```bash
# get the new version (from inside the juno repo)
git checkout main && git pull
git checkout v2.0.6
make build && make install

# check the version - should be v2.0.6
# junod version --long will be commit d9c8ee6d13076f549688662aaeade4499e108d15
junod version --long
```

Full instructions for the upgrade can be found [here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/MONETA\_UPGRADE.md).

### Moneta Security Patch

At height `1165200` the chain will stop again. A patched version of the binary was used to armor the validator set against an attack, so building yourself is not recommended. When this is no longer the current version, for sync purposes you will be able to build it yourself.

The instructions for getting and verifying the patched binary [are here](https://github.com/CosmosContracts/mainnet/blob/main/juno-1/v2\_1\_0\_PATCH.md).
