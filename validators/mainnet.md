---
description: "It's \U0001F680 time!"
---

# Mainnet

All of the hard work of the community has paid off, and now it's time to take the network live.

### Chain upgrades

In order to streamline chain upgrades and minimise downtime, you may want to set up [cosmovisor](https://docs.cosmos.network/master/run-node/cosmovisor.html) to manage your node. A [guide for this is provided](setting-up-cosmovisor.md) in the Juno docs.

### Alerting and monitoring

Alerting and monitoring is desirable as well - you are encouraged to explore solutions and find one that works for your setup.

### Avoiding DDOS attacks

{% hint style="info" %}
If you are comfortable with server ops, you might want to build out a [Sentry Node Architecture](https://docs.tendermint.com/master/nodes/validators.html) validator to protect against DDOS attacks.
{% endhint %}

### Managing storage

Disk space is likely to fill up, so having a plan for managing storage is key.

What approach you take for this will depend on whether you are running on physical hardware co-located with you, running in a data centre, or running on virtualised hardware.

{% hint style="info" %}
If you are using a cloud services provider, you may want to mount `$HOME` on an externally mountable storage volume, as you may need to shuffle the data onto a larger storage device later. You can specify the `home` directory in most commands, or just use symlinks.
{% endhint %}

