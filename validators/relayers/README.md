---
description: Instructions to setup relayers on the mainnet channels
cover: ../../.gitbook/assets/Gitbook Banner large 6 (5).png
coverY: 0
---

# Relayers

## IBC Channels

To enable transfers of the Juno token between various cosmos blockchains, the Juno team will create official IBC channels which will be used for integrations. The channels designated for IBC connections are summarised below:

| <p>host</p><p>chain-id</p> | <p>host </p><p>channel</p> | <p>juno-1</p><p>channel</p> | <p>juno token<br>IBC address on host network</p>                     |
| -------------------------- | -------------------------- | --------------------------- | -------------------------------------------------------------------- |
| osmosis-1                  | channel-42                 | channel-1                   | ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2 |
| cosmoshub-4                | TBA                        | channel-0                   | ibc/13B770F3AA627CCD99D3275DEF01D74199472BDCAEE01E4C2646059143B47309 |

## Relayer Tutorials

To assist operators in setting up relayers, the Juno team have provided tutorials for the following IBC relayers:

{% content-ref url="ibc-go.md" %}
[ibc-go.md](ibc-go.md)
{% endcontent-ref %}

{% content-ref url="hermes.md" %}
[hermes.md](hermes.md)
{% endcontent-ref %}

{% hint style="info" %}
Network configurations for relayers are stored in the mainnet Github repository.
{% endhint %}
