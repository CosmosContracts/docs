---
description: >-
  A node can be queried for up to date information such as node info, sync info
  and validator info, specific to that node.
---

# status

**Flags:**

| Name, shorthand | Default | Description | Required |
| :--- | :--- | :--- | :--- |
| --node, -n | tcp://localhost:26657 | &lt;host&gt;:&lt;port&gt; to tendermint rpc interface for this chain | optional |

### Query node status <a id="query-node-status"></a>

```text
junod status
```

Returns something similar to:

```text
{
    "NodeInfo": {
        "protocol_version": {
            "p2p": "8",
            "block": "11",
            "app": "0"
        },
        "id": "ec730773944fbdc6a8c4918984f571aa57c975a3",
        "listen_addr": "tcp://0.0.0.0:26656",
        "network": "lucina",
        "version": "",
        "channels": "40202122233038606100",
        "moniker": "nullmames",
        "other": {
            "tx_index": "on",
            "rpc_address": "tcp://127.0.0.1:26657"
        }
    },
    "SyncInfo": {
        "latest_block_hash": "43696FA61488792B8B0EB755AA40F9CDB326E7EAC38166B79B22F750D7FF0903",
        "latest_app_hash": "2005DF2BD8FF92EE8FDEEB9CA02219B0C6647CB50BA6422F044B93BB89D2467D",
        "latest_block_height": "822419",
        "latest_block_time": "2021-08-16T09:10:34.815795516Z",
        "earliest_block_hash": "BCF71C425ECEA8BE4E11B67FBFE86B02F38FD818A21F796AE60C6411E1C9BA83",
        "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "earliest_block_height": "1",
        "earliest_block_time": "2021-06-23T16:00:00Z",
        "catching_up": false
    },
    "ValidatorInfo": {
        "Address": "313EDF382E938D41E787B3C6366719009640C6F1",
        "PubKey": {
            "type": "tendermint/PubKeyEd25519",
            "value": "+vZPP6QFMUUkCO+MyMdOZGUzuNLAB98ruw6Rjfvnk60="
        },
        "VotingPower": "10358"
    }
}
```

