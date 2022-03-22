---
cover: ../.gitbook/assets/Gitbook Banner large 6 (1) (1) (21).png
coverY: 0
---

# Home of CosmWasm

Juno is the neutral home of CosmWasm smart contracts and the InterWasm DAO. The ecosystem is pioneering CosmWasm development and adoption.

CosmWasm, enables [WebAssembly (WASM) virtual machines (VMs) in the Cosmos SDK](https://medium.com/@interchain\_io/virtual-machines-take-off-in-the-cosmos-3d11bd6ae942).&#x20;

Adding WebAssembly to the Cosmos SDK allows software written in [many languages](https://github.com/appcypher/awesome-wasm-langs/blob/master/README.md) to run securely on a blockchain. WASM serves as an intermediate language that compiles the developer’s language of choice into a portable virtual machine. This means that you can have a simple, secure and fast virtual machine set up to sandbox or partition your application’s actions for better testing, security, performance and speed.

The entrance of a new programming language to the Cosmos Network has several benefits for the overall developer ecosystem. First, this product allows developers to write modules in Rust that integrate seamlessly with the Cosmos SDK, so they can take advantage of the mainnet-proven Cosmos-SDK modules and BPoS Tendermint consensus algorithm while developing a largely Rust-based custom application logic. Second, the ability to upload code in transactions, rather than restarting the chain, allows for a much quicker deployment of new features; the Juno Hub upgrade procedure is necessary only when making changes in the core logic. This enables application-specific zones to freeze the staking logic and iterate quickly on their core value proposition through custom smart contracts. Especially if they limit contract deployment to governance, this can provide an easy way for the chain to ship code quickly. If we launch a chain with the default permissionless uploading of smart contracts, you can build an Ethereum alternative on Tendermint.

_**The time is now**_**.**

With the [v1.0.0-beta release](https://github.com/CosmWasm/cosmwasm/tree/v1.0.0-beta), we are establishing to build the future of all [Cosmos chains](https://cosmos.network). Wasm [promises backwards compatibility](https://medium.com/cosmwasm/wen-cosmwasm-1-0-f83c3528187c) and easy upgrade paths from v1.0.0-beta to all future 1.x versions. With stable, polished APIs, and [huge performance improvements](https://medium.com/cosmwasm/wasmer-1-0-integrated-into-cosmwasm-2fa87437458c), we are providing fertile ground for a growing ecosystem of DeFi, NFTs, Governance, and more.

Don’t be too worried about the _beta_ label. The APIs are stable and have been tested heavily in various testnets and even a mainnet or two. Confio is awaiting the result of a formal audit, that will start late October. Once the audit results arrive and any issues reported are fixed, Confio will make the official v1.0.0 tag, with _no other changes_.

## Why CosmWasm? <a href="#ea4f" id="ea4f"></a>

CosmWasm runs Web Assembly (Wasm) bytecode, with very mature bindings to develop in the Rust programming language. We are looking to add support for smart contracts in Golang by Q2 next year. This provides a safe, highly performant runtime for your contracts, and the ease of using mature tooling and test frameworks in well-established languages with large developer communities.

The APIs have been designed both for ease of development, as well as preventing the majority of security issues by design. While Solidity makes it easy to write a simple contract, it is very hard to write a complex contract without any security holes. While it takes a bit longer to get started, the architecture of CosmWasm [prevents most classes of attacks present in Solidity](https://docs.cosmwasm.com/docs/0.16/architecture/smart-contracts). Furthermore, the Rust programming language prevents many coding issues at compile-time. So there is no long gap where you produce functional but exploitable contracts.

Besides exploits like reentrancy attacks, faulty implementations of the business logic are a [huge cause of DeFi hacks](https://defirate.com/opyn-hack/). Years of computer engineering have shown that testing (whether unit testing, BDD tests, fuzz tests or TDD) are the best way to avoid such errors in your programs. CosmWasm makes it easy to test your contracts at many level of complexity — from [unit testing a contract in isolation](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L786-L831) with mocked input, to native Rust tests [simulating complex cross-contract interactions](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw3-flex-multisig/src/contract.rs#L528-L572), to integration tests of a [contract inside a running blockchain](https://github.com/CosmWasm/wasmd/blob/master/x/wasm/keeper/staking\_test.go#L225-L271). You can even write tests in TypeScript [to test cross-chain contract calls](https://github.com/confio/ts-relayer/blob/main/src/lib/cosmwasm.spec.ts#L152-L298) with local blockchain nodes.

In short, CosmWasm allows you to use familiar, powerful, and safe languages to write highly performant and secure smart contracts. These smart contracts can be deployed to a number of different blockchains and even communicate across blockchains via IBC.
