---
description: "It's \U0001F680 time!"
---

# Mainnet Setup and Tooling

All of the hard work of the community has paid off, and now it's time to take the network live. Preparing your validator for mainnet involves a few extra considerations. They are detailed below, but a sensible checklist is:

* How will you handle chain upgrades?
  * consider: **Cosmovisor**
* How will you know your node is up?
  * consider: **Monitoring and alerts**
* How will you mitigate DDOS attacks?
  * consider: **Sentry Nodes**
* How much storage will you need?

Answering these questions can be daunting, so there is some advice below.

### Chain upgrades

In order to streamline chain upgrades and minimise downtime, you may want to set up [cosmovisor](https://docs.cosmos.network/master/run-node/cosmovisor.html) to manage your node. A [guide for this is provided](setting-up-cosmovisor.md) in the Juno docs.

### Alerting and monitoring

Alerting and monitoring is desirable as well - you are encouraged to explore solutions and find one that works for your setup. Prometheus is available out-of-the box, and there are a variety of open-source tools. Recommended reading:

* [https://medium.com/solar-labs-team/cosmos-how-to-monitoring-your-validator-892a46298722](https://medium.com/solar-labs-team/cosmos-how-to-monitoring-your-validator-892a46298722)
* [https://medium.com/simply-vc/cosmos-monitoring-and-alerting-for-validators-8e3f016c9567](https://medium.com/simply-vc/cosmos-monitoring-and-alerting-for-validators-8e3f016c9567)
* [https://chainflow.io/cosmos-validator-mission-control/](https://chainflow.io/cosmos-validator-mission-control/)

### Avoiding DDOS attacks

{% hint style="info" %}
If you are comfortable with server ops, you might want to build out a [Sentry Node Architecture](https://docs.tendermint.com/master/nodes/validators.html) validator to protect against DDOS attacks.
{% endhint %}

The current best practice for running mainnet nodes is a Sentry Node Architecture. There are various approaches, as [detailed here](https://medium.com/@kidinamoto/tech-choices-for-cosmos-validators-27c7242061ea). Some validators advocate co-locating all three nodes in virtual partitions on a single box, using Docker or other virtualisation tools. However, if in doubt, just run each node on a different server.

Bear in mind that Sentries can have pruning turned on, as outlined [here](https://hub.cosmos.network/main/gaia-tutorials/join-mainnet.html#pruning-of-state). It is desirable, but not essential, to have pruning disabled on the validator node itself.

### Managing storage

{% hint style="info" %}
If you are using a cloud services provider, you may want to mount `$HOME` on an externally mountable storage volume, as you may need to shuffle the data onto a larger storage device later. You can specify the `home` directory in most commands, or just use symlinks.
{% endhint %}

Disk space is likely to fill up, so having a plan for managing storage is key.

If you are running sentry nodes:

* 1TB storage for the full node will give you a lot of runway
* 200GB for the sentries with pruning should be sufficient

To give you an idea of cost, on AWS EBS \(other cloud providers are available, or you can run your own hardware\), with two backups a day, this runs to roughly:

* $150 for 1TB
* $35 for 200GB
* Total cost: $220

What approach you take for this will depend on whether you are running on physical hardware co-located with you, running in a data centre, or running on virtualised hardware.

