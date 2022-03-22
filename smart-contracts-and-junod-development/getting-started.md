# Getting started

To get started with smart contract development, we recommend running on a laptop until you are ready to deploy to a public testnet.

{% hint style="info" %}
The default local test user address is `juno16g2rahf5846rxzp3fwlswy08fz8ccuwk03k57y` and the default local `chain-id` is `testing`.
{% endhint %}

To get up-and-running, the steps are:

1. Run Juno on your laptop - [follow the instructions here](junod-local-dev-setup.md)
2. Run the [starter-kit frontend app](https://github.com/cosmoscontracts/starter-kit)
3. Open a browser with Keplr installed and go to `localhost:3000`
4. Click 'connect wallet' and add `Juno Local Test` blockchain
5. Import the seed user to Keplr from [this page](junod-local-dev-setup.md) - remember this mnemonic is public!
6. Execute or query the contract using [CosmJS and the local chain RPC](interacting-with-smart-contracts.md)

You're now set up with a Juno local development environment!

For more advanced usage, [check out deploy scripts like the one used for The Decentralized Name Service](https://github.com/envoylabs/whoami/blob/main/scripts/deploy\_local.sh). You can adapt this for your own use.
