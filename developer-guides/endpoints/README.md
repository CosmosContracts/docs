---
description: Connecting to the Juno chain (RPC and REST endpoints)
---

# Endpoints

## Public Endpoints

Juno network has excellent public infrastructure providers listed on [https://cosmos.directory/juno/nodes](https://cosmos.directory/juno/nodes), offering RPC, REST and GRPC endpoints. However, note that public providers may limit queries and transactions per user. Consider the impact of your application on the provider's stress level.

In the context of the Juno blockchain, both RPC (Remote Procedure Call) and REST (Representational State Transfer) APIs are used to interact with nodes in the blockchain network.&#x20;

### RPC

RPCs are typically used to interact with nodes at a lower level, providing direct access to the underlying blockchain data. The RPC interface exposes a set of functions that allow the client to query the blockchain data, such as retrieving transaction information, querying block data, or creating a new transaction. These RPC calls use Protobuf under the hood which is more efficient in terms of bandwidth and processing speed.&#x20;

To interact with an RPC, you will need an RPC node from cosmos.directory, as well as [CosmJS](https://github.com/cosmos/cosmjs) or the [`CosmWasmJS`](https://github.com/CosmWasm/CosmWasmJS) libraries in Javascript / Typescript.

### REST / LCD API

The REST/LCD API on the other hand, is more focused on providing a higher-level interface that abstracts away the underlying blockchain data. REST APIs use HTTP requests to access blockchain data, and the data is returned in JSON. This is typically easier for developers to use who are not familiar with the RPC yet. This is especially common for bots which are written in other languages such as Python.

You can get the OpenAPI schema for this endpoint in the following sections, or in the SwaggerUI documentation found with most public provided nodes.

\


