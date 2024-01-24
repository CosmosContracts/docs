---
description: Welcome to this tutorial on deploying a smart contract to the Juno testnet. This guide will show you how to deploy and interact with a contract using CLI. For scripting using Rust, you can use [cw-orchestrator](./cw-orchestrator.md).
---

# Guide: How to Upload a Smart Contract on the Juno Chain

{% embed url="https://youtu.be/e_-xxpfQfwU" %}



## **Preparation:**

**Required Materials:** A computer with an internet connection, familiarity with GitHub, and basic knowledge of smart contracts.

## **Steps:**



1. **Find an Example Smart Contract:**&#x20;

(Note: The steps here mainly involve browsing, no specific bash commands.)&#x20;

In this tutorial we will be using [https://github.com/Reecepbcups/cw-clock-exampl](https://github.com/Reecepbcups/cw-clock-example)



2. **Connect to the Juno Testnet:**&#x20;

Check out our new video that shows you how to deploy a local env&#x20;

[https://github.com/Reecepbcups/cw-clock-example](https://github.com/Reecepbcups/cw-clock-example)



3. &#x20;**Create a Juno Wallet:**&#x20;

```json
bash junod keys add MyWalletName
```



**5. Claim junox Test Tokens:**&#x20;

Head to Juno Discord [https://discord.com/invite/caEBtA4QDb](https://discord.com/invite/caEBtA4QDb) and find FAUCET section. In there you can get some using the API provided and inputting the wallet address you created in the previous step. [https://faucet.reece.sh/uni-6/JUNO\_ADDRESS\_HERE](https://faucet.reece.sh/uni-6/JUNO\_ADDRESS\_HERE)&#x20;



**6. Verify Token Receipt:**&#x20;

```
junod query bank balances [YOUR_WALLET_ADDRESS]
```



**7. Configure the Juno Command Line:**&#x20;

```json
bash junod config node [NODE_URL] 
junod config chain-id [CHAIN_ID] 
junod config gas auto 
junod config gas-prices 0.025ujuno
```



**8. Deploy the Smart Contract:**&#x20;

Assuming you've downloaded clock\_example.wasm to your current directory&#x20;

```
junod tx wasm store clock_example.wasm --from MyWalletName --gas 1500000 --chain-id [CHAIN_ID]
```



**9. Instantiate the Smart Contract:**&#x20;

Replace \[CODE\_ID] with the code ID obtained from the previous step e.g 3785

```json
 junod tx wasm instantiate [CODE_ID] '{"count": 0}' --label "my-clock-instance" --from MyWalletName --amount 100ujuno
```



**10. Interact with the Smart Contract:**&#x20;

Query the smart contract (replace \[CONTRACT\_ADDRESS] with the address from instantiation) junod query wasm contract \[CONTRACT\_ADDRESS]

```json

junod tx wasm execute [CONTRACT_ADDRESS] '{"increment": {}}' --from MyWalletName --amount 10ujuno
```



### **Conclusion:**

* You've now successfully uploaded, instantiated, and interacted with a smart contract on the Juno testnet.
* If you have further questions or ideas, join the Juno community on Discord, particularly the "developer lounge".

***

**Note:** Adjust the bash commands to fit your specific situation, and always double-check them, especially when working with real tokens or live environments.\
