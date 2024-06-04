---
description: Follow this tutorial to incorporate CosmosKit wallet selection into your dapp.
---

# Wallet usage

{% hint style="info" %}
You can find all the code on the GitHub repository: [https://github.com/topmonks/juno-dapp-tutorial](http://localhost:5000/o/jCrX4yBFt02YOr6hTAgL/s/uwjK0eMfGoo1QBmmL4yh/)
{% endhint %}

### Installation

If you're starting a new project and prefer a streamlined process, you can use the CosmosKit starter tool called "create-cosmos-app". This tool helps you bootstrap your project with Cosmos-related dependencies in just one command. Check [https://github.com/cosmology-tech/create-cosmos-app](https://github.com/cosmology-tech/create-cosmos-app).&#x20;

We follow the explicit installation process in the tutorial using an already set up React app.

#### CosmosKit

Start by installation of the `@cosmos-kit`

```bash
npm i @cosmos-kit/react @cosmos-kit/core @cosmos-kit/keplr 
```

{% hint style="info" %}
When using Vite.js with CosmosKit, it's important to note that CosmosKit's dependencies may require the use of polyfills. You may encounter errors like `Buffer is not defined` in the browser console. To resolve this issue, you can follow these steps:

1. `npm i -D vite-plugin-node-polyfills`
2.  update the `vite.config.js` file&#x20;

    ```typescript
    import { defineConfig } from "vite";
    import { nodePolyfills } from "vite-plugin-node-polyfills";

    export default defineConfig({
      plugins: [
        // ...
        nodePolyfills({
          protocolImports: true,
        }),
      ],
    });
    ```
{% endhint %}

To ensure you have the most up-to-date Juno chain information managed by the community, install the official `chain-registry`

```bash
npm i chain-registry
```

#### UI framework

If you have already included a UI kit in your project, you will need to provide the CosmosKit function to generate the wallet modal. This modal is used for wallet integration and can be customized according to your needs. You can refer to the CosmosKit documentation for more details on how to customize the modal with the walletModal function: [https://docs.cosmoskit.com/provider/chain-provider#customize-modal-with-walletmodal](https://docs.cosmoskit.com/provider/chain-provider#customize-modal-with-walletmodal).

In this tutorial, we will be using Chakra UI as the default UI kit. Chakra UI provides pre-styled components that work well with the Cosmos-related libraries we are utilizing. Therefore, you won't need to provide the CosmosKit function for wallet modal customization in this tutorial, as we will be leveraging the default functionality provided by Chakra UI.

```bash
npm i @chakra-ui/react
```

#### State management

For state management in this tutorial, we will be using the Recoil.js library. Recoil.js is a state management library that works well with TypeScript and is supported out of the box with [ts-codegen](contract-integration.md).

```bash
npm i recoil
```

## Usage

In this project, we will focus on supporting the `uni-6` (Juno testnet) and `juno-1` (Juno mainnet). Let's define it&#x20;

{% code title="src/config.ts" %}
```typescript
export enum TESTNET {
  "JUNO" = "uni-6",
}

export enum MAINNET {
  "JUNO" = "juno-1",
}

export const ENABLED_TESTNETS: TESTNET[] = [TESTNET.JUNO];
export const ENABLED_MAINNETS: MAINNET[] = [MAINNET.JUNO];
```
{% endcode %}

Define empty Chakra theme

{% code title="src/chakra-theme.ts" %}
```typescript
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme();
```
{% endcode %}

Wrap the App component with Recoil root state management, Chakra theme, and CosmosKit chain provider.

First, make sure you have installed the necessary dependencies: `recoil`, `@chakra-ui`

{% code title="src/App.tsx" lineNumbers="true" %}
```typescript
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr-extension";
import { RecoilRoot } from "recoil";
import { assets, chains } from "chain-registry";

import { ENABLED_MAINNETS, ENABLED_TESTNETS, MAINNET, TESTNET } from "./config";

function App() {
  return (
    // State management - Recoil
    <RecoilRoot>
      {/* UI Kit - Chakra */}
      <ChakraProvider theme={theme}>
        {/* CosmosKit */}
        <ChainProvider
          chains={chains.filter(
            (c) =>
              ENABLED_TESTNETS.includes(c.chain_id as TESTNET) ||
              ENABLED_MAINNETS.includes(c.chain_id as MAINNET)
          )}
          assetLists={assets}
          wallets={[...keplrWallets]}
          wrappedWithChakra
        >
          {/* TODO! */}
        </ChainProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;

```
{% endcode %}

This approach provides us with an empty project that can be bootstrapped with the desired functionality. We will start by creating a "Connect Wallet" button that allows us to establish a connection with Keplr, retrieve the user's address, and subsequently utilize it for signing transactions.

#### Connect wallet button

To create the WalletButton component that enables user interaction with their wallet, we will start by defining a Recoil atom to hold the state of the currently used network. This will allow us to switch between multiple chains in the future, specifically the Juno Testnet and Mainnet. Here's how you can define the Recoil atom:

{% code title="src/state/cosmos.ts" %}
```typescript
import { atom } from "recoil";
import { chains } from "chain-registry";

import { TESTNET } from "../config";

type Chain = (typeof chains)[0];

export const chainState = atom<Chain>({
  key: "chainState",
  default: chains.find((c) => c.chain_id === TESTNET.JUNO),
});

```
{% endcode %}

The WalletButton component enables users to connect their wallet, copy their public address, and disconnect the wallet. One of the notable advantages of using CosmosKit is that it automatically reacts when the user switches between their accounts within the wallet. This means that our application can seamlessly respond to changes in the active account without requiring manual intervention.

{% code title="src/components/wallet-button.tsx" %}
```typescript
import { Fragment } from "react";
import { useChain } from "@cosmos-kit/react";
import { useRecoilValue } from "recoil";
import { Button, ButtonProps, useToast } from "@chakra-ui/react";

import { chainState } from "../state/cosmos";

export default function WalletButton({
  ButtonProps,
}: {
  ButtonProps?: ButtonProps;
}) {
  const chain = useRecoilValue(chainState);
  const { address, connect, disconnect, wallet, isWalletConnected } = useChain(
    chain.chain_name
  );
  const toast = useToast();

  if (!isWalletConnected) {
    return (
      <Fragment>
        <Button onClick={connect} {...ButtonProps}>
          Connect wallet
        </Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Button
        variant="outline"
        onClick={() => {
          if (address) {
            navigator.clipboard.writeText(address);
            toast({
              title: "Address copied",
              variant: "subtle",
              status: "info",
            });
          }
        }}
      >
        {wallet?.prettyName} - {addressShort(address || "")}
      </Button>
      <Button onClick={disconnect}>Logout</Button>
    </Fragment>
  );
}

function addressShort(address: string | null) {
  if (!address) {
    return address;
  }

  return `${address.slice(0, 9)}...${address.slice(-4)}`;
}

```
{% endcode %}

Now, let's utilize the recently created component.

{% code title="src/App.tsx" %}
```typescript

//...
import { Suspense, lazy } from "react";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
const WalletButton = lazy(() => import("./components/wallet-button"));

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ChainProvider ...>
          <Flex gap={2} p={2}>
            <Suspense fallback={<Spinner />}>
              <WalletButton />
            </Suspense>
          </Flex>
        </ChainProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;

```
{% endcode %}

#### Select chain

With Recoil as the state management tool, we can easily create a separate component that handles the selection of the chain, specifically between the Juno Testnet and Mainnet. By separating the logic for chain selection from the environment configuration files and incorporating it into the state management, we enable the creation of a reactive user experience

{% code title="src/components/select-chain.tsx" %}
```typescript
import { Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { chains } from "chain-registry";
import { chainState } from "../state/cosmos";
import { MAINNET, TESTNET } from "../config";

export default function SelectChain() {
  const [chain, setChain] = useRecoilState(chainState);

  return (
    <Select
      placeholder="Select chain"
      value={chain.chain_id}
      width={200}
      onChange={(e) => {
        const chain = chains.find((c) => c.chain_id === e.target.value);
        if (chain) {
          setChain(chain);
        }
      }}
    >
      <option value={TESTNET.JUNO}>Juno (Testnet)</option>
      <option value={MAINNET.JUNO}>Juno</option>
    </Select>
  );
}

```
{% endcode %}





