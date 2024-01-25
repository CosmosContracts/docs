---
description: Integrate you smart-contract with cw-orch and facilitate testing/development and maintenance of your project.
---

# Speed up your development with cw-orchestrator <!-- omit in toc -->

## Introduction

cw-orchestrator is the most advanced scripting, testing, and deployment framework for CosmWasm smart-contracts. It makes it easy to write cross-environment compatible code for [cw-multi-test](https://github.com/CosmWasm/cw-multi-test), [Test Tube](https://github.com/osmosis-labs/test-tube), [Starship](https://github.com/cosmology-tech/starship) (alpha), and live networks, significantly reducing code duplication and test-writing time.

Get ready to change the way you interact with contracts and simplify you smart-contracts journey. The following steps will allow you to integrate `cw-orch` and write clean code such as:

```rust,ignore
counter.upload()?;
counter.instantiate(&InstantiateMsg { count: 0 }, None, None)?;
counter.increment()?;

let count = counter.get_count()?;
assert_eq!(count.count, 1);
```

In this quick-start guide, we will review the necessary steps in order to integrate [`cw-orch`](https://github.com/AbstractSDK/cw-orchestrator) into a simple contract crate. [We review integration of rust-workspaces (multiple contracts) at the end of this page](#integration-in-a-workspace).

> **NOTE**: *Quicker than the quick start*
>
>If you're moving quicker than everybody else, we suggest looking at <a href="https://github.com/AbstractSDK/cw-orch-counter-example/compare/e0a54b074ca1a894bb6e58276944cf2013d152f2..main" target="_blank">a before-after review of this example integration</a>. This will help you catch the additions you need to make to your contract to be able to interact with it using cw-orchestrator.


> **NOTE**: If you want to go more in depth, [browse the full `cw-orch` documentation](https://orchestrator.abstract.money/).

## Summary

- [Introduction](#introduction)
- [Summary](#summary)
- [Single Contract Integration](#single-contract-integration)
  - [Adding `cw-orch` to your `Cargo.toml` file](#adding-cw-orch-to-your-cargotoml-file)
  - [Creating an Interface](#creating-an-interface)
  - [Interaction helpers](#interaction-helpers)
  - [Using the integration](#using-the-integration)
- [Integration in a workspace](#integration-in-a-workspace)
  - [Handling dependencies and features](#handling-dependencies-and-features)
  - [Creating an interface crate](#creating-an-interface-crate)
  - [Integrating single contracts](#integrating-single-contracts)
- [More examples and scripts](#more-examples-and-scripts)

## Single Contract Integration

Throughout this example, we will be using `cw-orch` to interact with a simple counter contract. All the steps below apply to any smart contract, no matter the complexity.

### Adding `cw-orch` to your `Cargo.toml` file

To use cw-orchestrator, you need to add `cw-orch` to your contract's TOML file. Run the command below in your contract's directory:

```shell
cargo add --optional cw-orch
```

Alternatively, you can add it manually in your `Cargo.toml` file as shown below:

```toml
[dependencies]
cw-orch = {version = "0.19.1", optional = true } # Latest version at time of writing
```

Now that we have added `cw-orch` as an optional dependency we will want to enable it through a feature-flag. This ensures that the code added by `cw-orch` is **not** included in the wasm artifact of the contract.

To do this add an `interface` feature to the `Cargo.toml` and enable `cw-orch` when it is enabled like so:

```toml
[features]
interface = ["dep:cw-orch"] # Enables cw-orch when the feature is enabled
```

> **NOTE**: If you are using `rust-analyzer`, you can add the following two lines in your `settings.json` to make sure the features get taken into account when checking the project:
>
>    ```json
>     "rust-analyzer.cargo.features": "all",
>     "rust-analyzer.check.features": "all",
>    ```

### Creating an Interface

When using a single contract, we advise creating an `interface.rs` file inside your contract's directory. You then need to add this module to your `lib.rs` file. Don't forget to *feature-flag* the module in order to be able to use `cw-orch` inside it.

```rust,ignore
#[cfg(feature = "interface")]
mod interface;
```

Then, inside that `interface.rs` file, you can define the interface for your contract:

```rust,ignore
use cw_orch::{interface, prelude::*};

use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};

pub const CONTRACT_ID: &str = "counter_contract";

#[interface(InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, id = CONTRACT_ID)]
pub struct CounterContract;

impl<Chain: CwEnv> Uploadable for CounterContract<Chain> {
    /// Return the path to the wasm file corresponding to the contract
    fn wasm(&self) -> WasmPath {
        artifacts_dir_from_workspace!()
            .find_wasm_path("counter_contract")
            .unwrap()
    }
    /// Returns a CosmWasm contract wrapper
    fn wrapper(&self) -> Box<dyn MockContract<Empty>> {
        Box::new(
            ContractWrapper::new_with_empty(
                crate::contract::execute,
                crate::contract::instantiate,
                crate::contract::query,
            )
            .with_migrate(crate::contract::migrate),
        )
    }
}

```

Learn more about the content of the interface creation specifics in the [`cw-orch` documentation](https://orchestrator.abstract.money/contracts/interfaces.html#creating-an-interface)

> **NOTE**: It can be useful to re-export this struct to simplify usage (in `lib.rs`):
>
>    ```rust,ignore
>    #[cfg(feature = "interface")]
>    pub use crate::interface::CounterContract;
>    ```

### Interaction helpers

cw-orchestrator provides a additional macros that simplify contract calls and queries. The macro implements functions on the interface for each variant of the contract's `ExecuteMsg` and `QueryMsg`.

Enabling this functionality is very straightforward. Find your `ExecuteMsg` and `QueryMsg` definitions (in `msg.rs` in our example) and add the `ExecuteFns` and `QueryFns` derive macros to them like below:

```rust,ignore
#[cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::ExecuteFns))] // Function generation
/// Execute methods for counter
pub enum ExecuteMsg {
    /// Increment count by one
    Increment {},
    /// Reset count
    Reset {
        /// Count value after reset
        count: i32,
    },
}

#[cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::QueryFns))] // Function generation
#[derive(QueryResponses)]
/// Query methods for counter
pub enum QueryMsg {
    /// GetCount returns the current count as a json-encoded number
    #[returns(GetCountResponse)]
    GetCount {},
}

// Custom response for the query
#[cw_serde]
/// Response from get_count query
pub struct GetCountResponse {
    /// Current count in the state
    pub count: i32,
}
```

Find out more about the interaction helpers in the [`cw-orch` documentation](https://orchestrator.abstract.money/contracts/interfaces.html#entry-point-function-generation)

> **NOTE**: Again, it can be useful to re-export these generated traits to simplify usage (in `lib.rs`):
>
>    ```rust,ignore
>    #[cfg(feature = "interface")]
>    pub use crate::msg::{ExecuteMsgFns as CounterExecuteMsgFns, QueryMsgFns as CounterQueryMsgFns};
>    ```

### Using the integration

Now that all the setup is done, you can use your contract in tests, integration-tests or scripts.

Start by importing your crate, with the `interface` feature enabled. Depending on your use-case this will be in `[dependencies]` or `[dev-dependencies]`:

```toml
counter-contract = { path = "../counter-contract", features = ["interface"] }
```

You can now use:

```rust,ignore
use counter_contract::{
    msg::InstantiateMsg, CounterContract, CounterExecuteMsgFns, CounterQueryMsgFns,
};
use cw_orch::{anyhow, prelude::*, tokio};
use tokio::runtime::Runtime;

const LOCAL_MNEMONIC: &str = "clip hire initial neck maid actor venue client foam budget lock catalog sweet steak waste crater broccoli pipe steak sister coyote moment obvious choose";
pub fn main() -> anyhow::Result<()> {
    std::env::set_var("LOCAL_MNEMONIC", LOCAL_MNEMONIC);
    dotenv::dotenv().ok(); // Used to load the `.env` file if any
    pretty_env_logger::init(); // Used to log contract and chain interactions

    let rt = Runtime::new()?;
    let network = networks::LOCAL_JUNO;
    let chain = DaemonBuilder::default()
        .handle(rt.handle())
        .chain(network)
        .build()?;


    let counter = CounterContract::new(chain);

    counter.upload()?;
    counter.instantiate(&InstantiateMsg { count: 0 }, None, None)?;

    counter.increment()?;

    let count = counter.get_count()?;
    assert_eq!(count.count, 1);

    Ok(())
}
```

## Integration in a workspace

In this paragraph, we will use the `cw-plus` repository as an example. You can review:

- <a href="https://github.com/AbstractSDK/cw-plus" target="_blank">The full integration code</a> with `cw-orch` added
- <a href="https://github.com/cosmwasm/cw-plus/compare/main...abstractsdk:main" target="_blank">The complete diff</a> that shows you all integration spots (if you want to go fast)

### Handling dependencies and features

When using workspaces, you need to do the 2 following actions on all crates that include `ExecuteMsg` and `QueryMsg` used in your contracts:

1. Add `cw-orch` as an optional dependency
2. Add an `interface` feature (ensures `cw-orch` is not compiled into your `wasm` contract)

Refer above to [Adding `cw-orch` to your `Cargo.toml` file](#adding-cw-orch-to-your-cargotoml-file) for more details on how to do that.

For instance, for the `cw20_base` contract, you need to execute those 2 steps on the `cw20-base` contract (where the `QueryMsg` are defined) as well as on the `cw20` package (where the `ExecuteMsg` are defined).

### Creating an interface crate

When using a workspace, we advise you to create a new crate inside your workspace for defining your contract's interfaces. In order to do that, use:

```shell
cargo new interface --lib
cargo add cw-orch --package interface 
```

Add the interface package to your workspace `Cargo.toml` file

```toml
[workspace]
members = ["packages/*", "contracts/*", "interface"]
```

Inside this `interface` crate, we advise to integrate all your contracts 1 by 1 in separate files. Here is the structure of the `cw-plus` integration for reference:

```path
interface (interface collection)
├── Cargo.toml
└── src
    ├── cw1_subkeys.rs
    ├── cw1_whitelist.rs
    ├── cw20_base.rs
    ├── cw20_ics20.rs
    └── ..
```

When importing your crates to get the messages types, you can use the following command in the interface folder. Don't forget to activate the interface feature to be able to use the cw_orch functionalities.

```shell
cargo add cw20-base --path ../contracts/cw20-base/ --features=interface
cargo add cw20 --path ../packages/cw20 --features=interface
```

### Integrating single contracts

Now that you workspace is setup, you can [integrate with single contracts](#single-contract-integration) using the above section

## More examples and scripts

You can find more example interactions on the `counter-contract` example directly in the `cw-orchestrator` repo:  

- Some examples <a href="https://github.com/AbstractSDK/cw-orchestrator/blob/main/contracts/counter/examples/deploy.rs" target="_blank">showcase interacting with live chains</a>.
- Some other examples show <a href="https://github.com/AbstractSDK/cw-orchestrator/tree/main/contracts/counter/tests" target="_blank">how to use the library for testing your contracts</a>.

> **FINAL ADVICE**: Learn more and explorer our [full `cw-orch` documentation !](https://orchestrator.abstract.money)
