---
description: How to transfer tokens from networks in Cosmos
---

# IBC Transfer

One of the highlighted features of CosmosSDK chains is the ability to transfer tokens permissionless to other chains in the network. This is also possible with Juno to and from other chains.\
\
If you are just looking for a simple frontend to transfer tokens, [Osmosis](https://app.osmosis.zone/) and [Wynd Dex](https://app.wynddao.com/) frontends both have deposit and withdraw UIs to do this. If you need to transfer tokens between Juno and another chain that does not have a frontend, or is new, you can use [ibc-anywhere](https://ibc.reece.sh/) to seamlessly transfer between networks.

## Typescript

If you wish to make a IBC transfer between chains, you will need to leverage cosmos directory & [Cosmology's stack in your webapp](https://github.com/cosmology-tech/cosmos-kit).

* [CosmJS sendIBCTokens Docs](https://cosmos.github.io/cosmjs/latest/stargate/classes/SigningStargateClient.html#sendIbcTokens)
* [Example in Action from ibc-anywhere-webapp](https://github.com/Reecepbcups/ibc-anywhere-webapp/blob/main/src/routes/%2Bpage.svelte#L290)

```typescript
// Psudo Code Example of the Flow
import { assets, chains, ibc } from 'chain-registry';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { setupIbcExtension, QueryClient } from '@cosmjs/stargate';
import type {IbcExtension} from '@cosmjs/stargate/build/modules/ibc/queries';

const JUNO_RPC = "https://rpc.juno.strange.love"

const get_wallet_for_chain = async (
    chain_id: string
): Promise<OfflineAminoSigner | OfflineDirectSigner> => {
    // open keplr
    const keplr = window as KeplrWindow;
    if (keplr === undefined) {
        toast.error(`Keplr not found`, toast_style);
        throw new Error('Keplr not found');
    }
    // ledger support
    let signer = keplr.getOfflineSignerAuto;
    if (signer === undefined) {
        throw new Error('Keplr not found');
    }
    return signer(chain_id);
};


const tm_client = await Tendermint34Client.connect(JUNO_RPC);
let temp = QueryClient.withExtensions(tm_client);
let query_client: IbcExtension = setupIbcExtension(temp);

let from_wallet = await get_wallet_for_chain("juno-1");
let to_wallet = await get_wallet_for_chain("osmosis-1");

let from_client: SigningStargateClient | undefined;
from_client = await SigningStargateClient.connectWithSigner(
    JUNO_RPC, 
    from_wallet,
    {prefix: "juno"}
);

const addr = (await wallet.getAccounts())[0].address;

const from_addr = (await from_wallet.getAccounts())[0].address;
const to_addr = (await to_wallet.getAccounts())[0].address;

const channel_id = 0 // JUNO->OSMOSIS is channel 0
const timeout_time = current_time + 300; // 5 minutes
const gas = 300000;

from_client
    .sendIbcTokens(
        from_addr,
        to_addr,
        { denom: "ujuno", amount: "1000000" },
        'transfer',
        channel_id,
        undefined,
        timeout_time,
        { amount: [], gas: gas.toString() },
        `memo: IBC Transfer of 1000000 ujuno to osmosis chain`
    )
    .then((tx) => {
        console.log(tx);
        if (tx.code == 0) {
            alert(
                `IBC transfer from ${chain.pretty_name} successful\n\nTxHash: ${tx.transactionHash}`
            )
        }				
    })
```

