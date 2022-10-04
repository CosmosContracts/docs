---
order: 1
description: Make your own memecoin!
cover: >-
  ../../.gitbook/assets/Gitbook Banner large 6 (1) (1) (1) (1) (1) (1) (1) (1)
  (1) (23).png
coverY: 0
---

# ERC-20 Tutorial

This will take you through uploading your own memecoin to the juno testnet.

It uses the examples in the `contracts/erc20` folder of the [cosmwasm-examples](https://github.com/CosmWasm/cosmwasm-examples) repo.

There are four steps involved in working with a smart contract.

1. Write the smart contract (already done here!)
2. Store the smart contract on chain
3. Instantiate the smart contract (configure and initialise it)
4. Execute commands provided by the smart contract

We will go through all of these in this tutorial.

There is a video version available as well. The versions have changed since the video, but the main difference is that you should run Juno in Docker on your laptop rather than building youself:

{% content-ref url="../junod-local-dev-setup.md" %}
[junod-local-dev-setup.md](../junod-local-dev-setup.md)
{% endcontent-ref %}

{% embed url="https://www.youtube.com/embed/c3DDHobH3Ow" %}
