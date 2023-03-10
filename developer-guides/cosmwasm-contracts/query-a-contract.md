---
description: Describes how to query a cosmwasm smart contract with the CLI & REST API.
---

# Query A Contract

## Command Line Interface

The most common way to query a cosmwasm smart contract is within the junod wasm smart query command. This follows the following format where query is a JSON string with no spaces. By default, the least amount of data this can be is an empty JSON payload `'{}'.`

```
junod query wasm contract-state smart [contract_bech32] [query] [flags]
```

For this example, we are going to use a random NFT contract on the juno chain. This will show you how to brute force query a contract if you have no idea what the query schema of the contract is. At this time, there is no way to query the format of a contract's requests, but this is something many are actively working on.

Now we attempt to query this contract address and extract some data from it and get which queries are allowed. As you can see, we pass through a random payload for abcde so that the contract will return actual valid query requests

**NOTE**: A Query can never be empty such as `'{}'` given you need to specify the path of data you want to reach.

<pre class="language-sh"><code class="lang-sh">CONTRACT=juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj
junod q wasm contract-state smart $CONTRACT '{"abcde":{}}'

<strong># Error parsing into type 
</strong><strong>#    cw721_base::msg::QueryMsg&#x3C;cosmwasm_std::results::empty::Empty>
</strong>#    unknown variant `abcde`, 
#    expected one of `owner_of`, `approval`, `approvals`, `all_operators`, 
#    `num_tokens`, `contract_info`, `nft_info`, `all_nft_info`, `tokens`, 
#    `all_tokens`, `minter`, `extension`
</code></pre>

{% hint style="info" %}
The query shows CW721 Base is this contracts name. As this is a standard contract, all messages can be found in the CosmWasm/cw-nfts repository on github\
\
[https://github.com/CosmWasm/cw-nfts/blob/main/contracts/cw721-base/src/msg.rs](https://github.com/CosmWasm/cw-nfts/blob/main/contracts/cw721-base/src/msg.rs)
{% endhint %}

From this, we now know all of the query endpoints and can requests something more specific from the contract for our usage. Let's get

```sh
CONTRACT=juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj
junod q wasm contract-state smart $CONTRACT '{"all_tokens":{}}'

data:
  tokens:
  - "0"
  - "1"
  - "2"
  - "3"
  - "4"
  - "5"
  - "6"
  - "7"
  - "8"
  
# You can use --output=json to read it via JSON form
# junod q wasm contract-state smart $CONTRACT '{"all_tokens":{}}' --output=json | jq .data
```

Here we can see there are 8 tokens in this set. Lets query one of the NFTs information

```bash
CONTRACT=juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj
junod q wasm contract-state smart $CONTRACT '{"nft_info":{}}'

# missing field `token_id`: query wasm contract failed
```

Just like the first query, we can see that the payload needs more information. It returned an error that we need to specify the token\_id we want the nft\_info for. Note, Uint128 sized numbers are read as a string

```bash
CONTRACT=juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj
junod q wasm contract-state smart $CONTRACT '{"nft_info":{"token_id":"8"}}'

# data:
#   extension: null
#   token_uri: ipfs://bafyreib42csdu7426ki7mxk6firvbz4uk3fo4dxpjy2kkskzdhtgj3rriq/metadata.json
```

## Rest API Query

If you wish to query the data more programmatically with an application such as Python, you may be better suited to use the rest API. You can find these endpoints on [https://cosmos.directory/juno/nodes](https://cosmos.directory/juno/nodes) in the REST section.

This query endpoint can be found via Juno's SwaggerUI. However, some modules you will not be able to easily find the endpoint. To do this, you will need to search through the proto files. Here we know we want to query the cosmwasm module, which is called wasmd on chain. This repo is found at [https://github.com/cosmwasm/wasmd](https://github.com/cosmwasm/wasmd).\
\
In this module, you can see the proto folder in the root of the repo. This will house the endpoints the module exposes so we can find the above path which. This is a query so we find the query proto file\
[https://github.com/CosmWasm/wasmd/blob/main/proto/cosmwasm/wasm/v1/query.proto](https://github.com/CosmWasm/wasmd/blob/main/proto/cosmwasm/wasm/v1/query.proto)\\

```protobuf
option go_package = "github.com/CosmWasm/wasmd/x/wasm/types";
option (gogoproto.goproto_getters_all) = false;
option (gogoproto.equal_all) = false;

// Query provides defines the gRPC querier service
service Query {
   ...
  // SmartContractState get smart query result from the contract
  rpc SmartContractState(QuerySmartContractStateRequest)
      returns (QuerySmartContractStateResponse) {
    option (google.api.http).get =
        "/cosmwasm/wasm/v1/contract/{address}/smart/{query_data}";
  }
  ...
```

{% hint style="info" %}
You must base64 encode the JSON payload for REST API Request. Just take your JSON payload and\
\
\- put it into [https://www.base64encode.org/](https://www.base64encode.org/)\
\- or use Mac / Linux built in command\
\
echo '{"all\_tokens":{\}}' | base64\
\# eyJhbGxfdG9rZW5zIjp7fX0K
{% endhint %}

With this, we can now query the contract and gather the data. You can use your web browser, or a library like httpx / requests in Python for automated bots. Be aware that many API providers will late limit the number of requests you can make.\
\
[https://api.juno.strange.love/cosmwasm/wasm/v1/contract/juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj/smart/eyJhbGxfdG9rZW5zIjp7fX0K](https://api.juno.strange.love/cosmwasm/wasm/v1/contract/juno1anh4pf98fe8uh64uuhaasqdmg89qe6kk5xsklxuvtjmu6rhpg53sj9uejj/smart/eyJhbGxfdG9rZW5zIjp7fX0K)

```json
{
    "data": {
        "tokens": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8"
        ]
    }
}
```

## Cosmology Smart Contract Query

Using [CosmWasm/ts-codegen](https://github.com/CosmWasm/ts-codegen), you can create an NPM module to make interactions and queries into dev-friendly Typescript classes to allow you to focus on shipping code.

Here are a few tutorials from cosmology:

* [ts-codegen overview for CosmWasm](https://cosmology.tech/learn/video/overview-of-cosmwasm-ts-codegen)
* [CosmWasm Contract to Typescript npm module](https://cosmology.tech/learn/video/turn-your-cosmwasm-smart-contracts-into-a-typescript-npm-module)
* [Configure CosmWasm ts-codegen in your Contracts repo](https://cosmology.tech/learn/video/configuring-cosmwasm-ts-codegen-to-create-sdks-for-your-smart-contracts)
* [Query a CosmWasm smart contract from ts-codegen](https://cosmology.tech/learn/video/how-to-query-cosmwasm-smart-contracts)
* [Enable React Query](https://cosmology.tech/learn/video/how-to-use-react-query-for-interacting-with-cosmwasm-smart-contracts)
* [Enable Recoil](https://cosmology.tech/learn/video/how-to-use-recoil-for-interacting-with-cosmwasm-smart-contracts)
* [Integrate Telescope with ts-codegen](https://cosmology.tech/learn/video/integrating-telescope-and-cosmwasm-ts-codegen)

## CosmJS Query

TODO: Add how to query a smart contract data with Typescript + Example through the RPC endpoint (proto encoded) & httpbatch tendermint client

## Internal

TODO: internal rust impl of how to WasmQuery a contract and get some data back.
