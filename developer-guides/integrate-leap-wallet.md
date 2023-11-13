---
description: >-
  This guide provides a step-by-step process for integrating the Leap Wallet
  into your DApp. Leap Wallet allows your DApp to interact with user accounts,
  manage transactions.
---

# Integrate Leap wallet

{% embed url="https://youtu.be/xLf1GfwHufQ?si=miRuGMAOVHoB8ARb" %}

### Prerequisites

* Basic knowledge of JavaScript and React (or similar frameworks).
* An existing DApp or a setup to create one.
* Leap Wallet extension installed in your browser.

### Step 1: Accessing the Leap Provider

1. **Install the Leap Extension**: Ensure that the Leap Wallet extension is installed in your web browser.
2. **Integrate Leap into Your DApp**: In your DApp's main JavaScript file, access the Leap provider through the global `window` object. Example: `const leapProvider = window.leap;`

### Step 2: User Account Management

1. **Fetching User Account Details**: Utilize the `leapProvider.getKey(chainID)` method to obtain the user’s account information. This should be called when the application mounts. Example: `leapProvider.getKey('Juno1');`
2. **Handling Wallet Changes**: Set up an event listener for account changes. When the event triggers, call the `getKey` method again to update the user account details in your DApp.

### Step 3: Transaction Signing and Management

1. **Setting Up CosmJS**: If using CosmJS, initialize it to handle transaction signing. Ensure it's compatible with different wallet types, including hardware wallets.
2. **Sign Transactions**: Utilize the `getOfflineSignerAuto` method for transaction signing. This method automatically determines the correct signer type based on the connected wallet.

### Step 4: Transaction Review and Broadcasting

1. **Reviewing Transactions**: When a transaction is initiated, Leap will prompt the user to review it. Users can adjust transaction fees and broadcasting modes.
2. **Handling Transaction Approval/Rejection**: Implement error handling for rejected transactions. For approved transactions, capture the signed transaction data for broadcasting.

### Step 5: Utilizing Advanced Leap Methods

1. **Sign Arbitrary Data**: Use the `signArbitrary` method for off-chain purposes like user authentication.
2. **Delegate Broadcasting**: Optionally, delegate transaction broadcasting to Leap Wallet using appropriate methods.
3. **Check Wallet Connection**: Implement a method to check the wallet’s connection status and display relevant UI elements.

### Step 6: Extending Chain Support

1. **Adding New Chains**: Use the `suggestChain` method to add unsupported blockchain networks to Leap Wallet. Provide necessary details like RPC endpoints and coin types.
2. **Chain Integration**: Test the integration by performing transactions or fetching account details on the newly added chain.

### Step 7: Testing and Deployment

1. **Testing**: Thoroughly test each functionality, especially transaction signing and account synchronization.
2. **Deployment**: Once testing is complete, deploy your DApp with Leap Wallet integration.

### Conclusion

Integrating Leap Wallet enhances your DApp’s functionality by enabling robust user account management and transaction handling. Follow this guide to ensure a smooth integration process.
