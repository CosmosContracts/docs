---
cover: ../../.gitbook/assets/Discord Invite.png
coverY: 260
---

# Incentive structure

### Reward Schedule <a href="#8ab1" id="8ab1"></a>

The Juno rewards model distributes a fixed amount of JUNO per block, which is calculated by the network and depends on the inflation rate as well as network block time. Variation in the network block time will cause variation in the calculable annual percentage rate (APR).

JUNO inflation rate and target supply were defined at genesis for each _phase_ of the network, as you can read below or check yourself from this [code of the x/mint module](https://github.com/CosmosContracts/juno/blob/main/x/mint/types/minter.go).

⚪️ **Phase 1**: Fixed inflation 40%

New Juno in year 1 = (+25.961.297)

Total supply after year 1 = 90.864.540 JUNO

⚪️ **Phase 2**: Fixed inflation 20%

New Juno in year 2 = (+18.172.908)

Total supply after year 2 = 109.037.449 JUNO

⚪️ **Phase 3**: Fixed inflation 10%

New Juno in year 3= (+10.903.744)

Total supply after year 3 = 119.941.194 JUNO

> Once the inflation reaches 10% it gradually reduces on a fixed 1% basis each year.

⚪️ **Phase 4** = Fixed 9% (+10.794.707) Total supply = 130.735.901 JUNO

⚪️ **Phase 5** = Fixed 8% (+10.458.872) Total supply = 141.194.773 JUNO

⚪️ **Phase 6** = Fixed 7% (+9.883.634) Total supply = 151.078.407 JUNO

⚪️ **Phase 7** = Fixed 6% (+9.064.704) Total supply = 160.143.112 JUNO

⚪️ **Phase 8** = Fixed 5% (+8.007.155) Total supply = 168.150.267 JUNO

⚪️ **Phase 9** = Fixed 4% (+6.726.010) Total supply = 174.876.278 JUNO

⚪️ **Phase 10** = Fixed 3% (+5.246.288) Total supply = 180.122.566 JUNO

⚪️ **Phase 11** = Fixed 2% (+3.602.451) Total supply = 183.725.018 JUNO

⚪️ **Phase 12** = Fixed 1% (+1.837.250) Max supply = 185.562.268 JUNO


### End of phase calculation

The end of each _phase_ (commonly refereed to as the "halving") can be estimated with the formula:

```
Time left until phase_end in seconds =
blockTime * ((targetSupply - totalSupply) / (annualProvisions / blocksPerYear))
```

where:
- **blockTime** =  the time in seconds between two blocks:
    - if you have access to Mintscan API you can get it directly from: `https://api.mintscan.io/v1/juno/block/blocktime?blocks=[n_blocks]`, where `n_blocks` is the number of past blocks to take into account for the estimation
    - otherwise, infer it by subtracting the timestamps of two blocks queried from the official Juno API endpoints: 
        - most recent block time = `/cosmos/base/tendermint/v1beta1/blocks/latest`.block.header.time
        - most recent block height = `/cosmos/base/tendermint/v1beta1/blocks/latest`.block.header.height
        - time of an old block (by height) = `/cosmos/base/tendermint/v1beta1/blocks/15872771`.block.time
        - convert the times to timestamps in seconds, subtract the old from the latest and divide by the number of blocks in between (the difference between the heights);
- **targetSupply** = defined for the end of each inflation phase as above,  eg: `130735901` for Phase 4, to be multiplied by 10^6 to convert the `ujuno` ("micro juno") integer base denomination
- **totalSupply** = get it from the official _bank_ module endpoint & query for the `ujuno` native coin at `/cosmos/bank/v1beta1/supply/by_denom?denom=ujuno`.amount.amount
- **annualProvisions** = get it from the official _mint_ module endpoint at `/cosmos/mint/v1beta1/annual_provisions`.annual_provisions
- **blocksPerYear** = get it from the official _mint_ module endpoint at `/cosmos/mint/v1beta1/params`.params.blocks_per_year

{% hint style="info" %}
See all the available [API endpoints](/developer-guides/api-endpoints).
{% endhint %}