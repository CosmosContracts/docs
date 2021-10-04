---
description: Instructions to setup relayers on the mainnet channels
---

# Relayers

## IBC Channels

To enable transfers of the Juno token between various cosmos blockchains, the Juno team will create official IBC channels which will be used for integrations. The channels designated for IBC connections are summarised below:

<table>
  <thead>
    <tr>
      <th style="text-align:left">
        <p>host</p>
        <p>chain-id</p>
      </th>
      <th style="text-align:left">
        <p>host</p>
        <p>channel</p>
      </th>
      <th style="text-align:left">
        <p>juno-1</p>
        <p>channel</p>
      </th>
      <th style="text-align:left">juno token
        <br />IBC address on host network</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">osmosis-1</td>
      <td style="text-align:left">channel-42</td>
      <td style="text-align:left">channel-1</td>
      <td style="text-align:left">ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2</td>
    </tr>
    <tr>
      <td style="text-align:left">cosmoshub-4</td>
      <td style="text-align:left">TBA</td>
      <td style="text-align:left">channel-0</td>
      <td style="text-align:left">ibc/13B770F3AA627CCD99D3275DEF01D74199472BDCAEE01E4C2646059143B47309</td>
    </tr>
  </tbody>
</table>

## Relayer Tutorials

To assist operators in setting up relayers, the Juno team have provided tutorials for the following IBC relayers:

{% page-ref page="ibc-go.md" %}

{% page-ref page="hermes.md" %}

{% hint style="info" %}
Network configurations for relayers are stored in the mainnet Github repository.
{% endhint %}

