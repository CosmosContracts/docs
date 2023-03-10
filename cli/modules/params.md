# params

Params module allows you to query the system parameters which can be governed (except the gov params) by the [gov module](gov.md).

```
junod query params subspace [subspace] [key] [flags]
```

Among them, the parameters available for query for each subspace are as follows:

### auth <a href="#auth" id="auth"></a>

| key                      | description                                                     | default |
| ------------------------ | --------------------------------------------------------------- | ------- |
| `MaxMemoCharacters`      | Maximum number of characters in the memo field in a transaction | 256     |
| `TxSigLimit`             | Maximum number of signatures per transaction                    | 7       |
| `TxSizeCostPerByte`      | The amount of gas consumed per byte of the transaction          | 10      |
| `SigVerifyCostED25519`   | Gas spent on edd2519 algorithm signature verification           | 590     |
| `SigVerifyCostSecp256k1` | Gas spent on secp256k1 algorithm signature verification         | 1000    |

### bank <a href="#bank" id="bank"></a>

| key                  | description                                        | default |
| -------------------- | -------------------------------------------------- | ------- |
| `SendEnabled`        | Tokens that support transfer                       | {}      |
| `DefaultSendEnabled` | Whether to enable the transfer function by default | true    |

### staking <a href="#staking" id="staking"></a>

| key                 | description                                                     | default |
| ------------------- | --------------------------------------------------------------- | ------- |
| `UnbondingTime`     | Mortgage redemption time                                        | ??      |
| `MaxValidators`     | Maximum number of validators                                    | 125     |
| `MaxEntries`        | The maximum number of unbinding/redelegation orders in progress | 7       |
| `BondDenom`         | Bond denom                                                      | ujuno   |
| `HistoricalEntries` | The number of historical entries                                | 10000   |

### mint <a href="#mint" id="mint"></a>

| key             | description                 | default |
| --------------- | --------------------------- | ------- |
| `Inflation`     | Token issuance frequency    | ??      |
| `MintDenom`     | Denom of the token mintable | ujuno   |
| `BlocksPerYear` | Blocks produced per year    | 6311520 |

### distribution <a href="#distribution" id="distribution"></a>

| key                   | description                                       | default |
| --------------------- | ------------------------------------------------- | ------- |
| `communitytax`        | Fees charged for withdrawal                       | 0.02    |
| `baseproposerreward`  | The base reward rate of the block proposer        | 0.01    |
| `bonusproposerreward` | Reward rate for block proposers                   | 0.04    |
| `withdrawaddrenabled` | Whether to support setting the withdrawal address | true    |

### slashing <a href="#slashing" id="slashing"></a>

| key                       | description                           | default |
| ------------------------- | ------------------------------------- | ------- |
| `SignedBlocksWindow`      | Sliding window for downtime slashing  | 100     |
| `MinSignedPerWindow`      | Minimum signature rate in each window | 0.5     |
| `DowntimeJailDuration`    | Maximum downtime (continuous)         | ???     |
| `SlashFractionDoubleSign` | Penalty coefficient for double sign   | 0.05    |
| `SlashFractionDowntime`   | Penalty coefficient for downtime      | 0.01    |

### gov <a href="#gov" id="gov"></a>

| key             | description                                      | default                                                   |
| --------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `depositparams` | Related parameters of the deposit mortgage phase | `min_deposit`: 10000000ujuno; `max_deposit_period`: ??    |
| `votingparams`  | Related parameters of the voting mortgage phase  | `voting_period`: 2d(days)                                 |
| `tallyparams`   | Related parameters of the voting tally phase     | `quorum`: 0.25; `threshold`: 0.5; `veto_threshold`: 0.334 |

### crisis <a href="#crisis" id="crisis"></a>

| key           | description  | default   |
| ------------- | ------------ | --------- |
| `ConstantFee` | Constant Fee | 1000ujuno |

## feeshare

| key               | description                               | default    |
| ----------------- | ----------------------------------------- | ---------- |
| `EnableFeeShare`  | If Enabled                                | true       |
| `DeveloperShares` | Percent of fees dAPPs contracts get       | 0.50       |
| `AllowedDenoms`   | Gas fees which are shared with developers | \["ujuno"] |

## tokenfactory

| key              | description         | default                                 |
| ---------------- | ------------------- | --------------------------------------- |
| DenomCreationFee | Create SubDenom Fee | \[{"denom":"ujuno","amount":"1000000"}] |
