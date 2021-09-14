---
description: The distribution module allows you to manage your staking rewards
---

# distribution

## Available Commands

| Name | Description |
| :--- | :--- |
| [commission](distribution.md#junod-query-distribution-commission) | Query distribution validator commission |
| [community-pool](distribution.md#iris-query-distribution-community-pool) | Query the amount of coins in the community pool |
| [params](distribution.md#iris-query-distribution-rewards) | Query distribution params |
| [rewards](distribution.md#iris-query-distribution-rewards) | Query all distribution delegator rewards or rewards from a particular validator |
| [slashes](distribution.md#iris-query-distribution-slashes) | Query distribution validator slashes. |
| [validator-outstanding-rewards](distribution.md#iris-query-distribution-validator-outstanding-rewards) | Query distribution outstanding \(un-withdrawn\) rewards for a validator and all their delegations |
| [fund-community-pool](distribution.md#iris-tx-distribution-fund-community-pool) | Funds the community pool with the specified amount |
| [set-withdraw-addr](distribution.md#iris-tx-distribution-set-withdraw-addr) | Set the withdraw address for rewards associated with a delegator address |
| [withdraw-all-rewards](distribution.md#iris-tx-distribution-withdraw-all-rewards) | Withdraw all rewards for a single delegator |
| [withdraw-rewards](distribution.md#iris-tx-distribution-withdraw-rewards) | Withdraw rewards from a given delegation address, and optionally withdraw validator commission if the delegation address given is a validator operator |

### junod query distribution commission

Query validator commission rewards from delegators to that validator.

```text
junod query distribution commission [validator] [flags]
```

### junod query distribution community-pool <a id="iris-query-distribution-community-pool"></a>

Query all coins in the community pool which is under Governance control.

```text
junod query distribution community-pool [flags]
```

### junod query distribution params <a id="iris-query-distribution-params"></a>

Query distribution params.

```text
 junod query distribution params [flags]
```

### junod query distribution rewards <a id="iris-query-distribution-rewards"></a>

Query all rewards earned by a delegator, optionally restrict to rewards from a single validator.

```text
junod query distribution rewards [delegator-addr] [validator-addr] [flags]
```

### junod query distribution slashes <a id="iris-query-distribution-slashes"></a>

Query all slashes of a validator for a given block range.

```text
junod query distribution slashes [validator] [start-height] [end-height] [flags]
```

### junod query distribution validator-outstanding-rewards <a id="iris-query-distribution-validator-outstanding-rewards"></a>

Query distribution outstanding \(un-withdrawn\) rewards for a validator and all their delegations.

```text
junod query distribution validator-outstanding-rewards [validator] [flags]
```

### junod tx distribution fund-community-pool <a id="iris-tx-distribution-fund-community-pool"></a>

Funds the community pool with the specified amount.

```text
junod tx distribution fund-community-pool [amount] [flags]
```

### junod tx distribution set-withdraw-addr <a id="iris-tx-distribution-set-withdraw-addr"></a>

Set the withdraw address for rewards associated with a delegator address.

```text
junod tx distribution set-withdraw-addr [withdraw-addr] [flags]
```

### junod tx distribution withdraw-all-rewards <a id="iris-tx-distribution-withdraw-all-rewards"></a>

Withdraw all rewards for a single delegator.

```text
junod tx distribution withdraw-all-rewards [flags]
```

### junod tx distribution withdraw-rewards <a id="iris-tx-distribution-withdraw-rewards"></a>

Withdraw rewards from a given delegation address, and optionally withdraw validator commission if the delegation address given is a validator operator.

```text
junod tx distribution withdraw-rewards [validator-addr] [flags]
```

