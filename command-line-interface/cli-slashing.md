---
description: The slashing module can unjail your validator
---

# slashing

## Available Commands

| Name | Description |
| :--- | :--- |
| [unjail](https://www.irisnet.org/docs/cli-client/slashing.html#iris-tx-slashing-unjail) | Unjail validator previously jailed for downtime or double-sign. |

### junod tx slashing unjail

Unjail validator previously jailed for downtime.

```text
juno tx slashing unjail [flags]
```

#### Unjail a validator

The following example will unjail a validator using its validator operator \(owner\) key :

```text
junod tx slashing unjail --from juno1ludczrvlw36fkur9vy49lx4vjqhppn30h42ufg --chain-id juno
```

{% hint style="info" %}
**TIP**

The validator operator key must be stored in the local keystore. 
{% endhint %}

