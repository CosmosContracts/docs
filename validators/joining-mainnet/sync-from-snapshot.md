---
description: Shortcut to sync a node to the mainnet from a snapshot
---

# Sync from Snapshot

To restore a node from a snapshot we need to follow instructions for [.](./ "mention") up to installing and configuring cosmovisor, but DO NOT start the node.&#x20;

We will then download a snapshot and start cosmovisor...

### Download and extract snapshot

Polkachu Validator provides the community with daily snapshots for the Juno Network. The snapshot server is periodically state-synced, so the snapshots do not contain full history, but are small in size.

To download and extract a snapshot, follow the instructions provided at [https://polkachu.com/tendermint\_snapshots/juno](https://polkachu.com/tendermint\_snapshots/juno)

### Start Cosmovisor

Finally, enable the Cosmovisor service and start it.

```bash
sudo systemctl daemon-reload
sudo systemctl enable cosmovisor
sudo systemctl start cosmovisor
```

Check it is running using:

```
sudo systemctl status cosmovisor
```

If you need to monitor the service after launch, you can view the logs using:

```bash
journalctl -fu cosmovisor -o cat
```
