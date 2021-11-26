---
description: A detailed guide to deploy a Juno node on Akash decentralised cloud
cover: ../.gitbook/assets/Gitbook Banner large 6 (4).png
coverY: 0
---

# Deploying a Node on Akash

## Introduction

This guide is intended to provide the steps required to deploy a Juno chain node onto the Akash network. The setup is intended for education and testing purposes. Due to current limitations of the Akash network, it is not recommended to use this setup for any mission critical purpose. Potential uses are personal RPC nodes or non critical sentry nodes.&#x20;

This guide assumes the user is familiar with the linux command line, has Akash installed on the workstation ([install Akash](https://docs.akash.network/guides/install)), and has funded an Akash wallet.&#x20;

{% hint style="info" %}
You will require at least 5 AKT for the deployment escrow amount, this will be used to pay for the provider services, as well as, say another 1 AKT for transaction fees.&#x20;
{% endhint %}

This guide utilises the docker images built by the ovrclk/cosmos-omnibus repository. These images are built to be deployed to Akash, and manage node identity files on S3 storage. Furthermore, chain settings can be configured via environment variables set in the `deploy.yml`

## Configuration of Shell Variables

For this guide, we will be using shell variables. This will enable the use of the client commands verbatim. It is important to remember that shell commands are only valid for the current shell session, and if the shell session is closed, the shell variables will need to be re-defined. \
If you make a mistake and set a shell variable to the wrong value, or just need to change the value of a shell variable, you will need to first clear the shell variable `unset $VARIABLE_NAME` . Shell variables should be named with ALL CAPS.

### Define Akash network

Define the Akash network variables. The following command will source the current network information from the Akash Gitgub repository.

```bash
AKASH_NET="https://raw.githubusercontent.com/ovrclk/net/master/mainnet" && \
export AKASH_CHAIN_ID="$(curl -s "$AKASH_NET/chain-id.txt")" && \
export AKASH_NODE="$(curl -s "$AKASH_NET/rpc-nodes.txt" | head -1)"
```

Confirm the variables have been set, and are something similar to:

`akashnet-2 http://135.181.60.250:26657`

```bash
echo $AKASH_NODE $AKASH_CHAIN_ID
```

### Keyring backend

Set the keyring backend used to store your key. The default is `os` and will store the key in your operating system, protected by your login password.

```bash
AKASH_KEYRING_BACKEND=os

echo $AKASH_KEYRING_BACKEND
```

### Configure your Account Key

Configure the name of your key. The command below will set thee name of your key to `john`, run the below command and replace `john` with a name of your choice:

```bash
AKASH_KEY_NAME=john
```

Verify you have the key set up . The below command should return the name you've used:

```bash
echo $AKASH_KEY_NAME
```

Populate `AKASH_ACCOUNT_ADDRESS` from `AKASH_KEY_NAME` and verify:

```bash
export AKASH_ACCOUNT_ADDRESS="$(akash keys show $AKASH_KEY_NAME -a)"
```

Verify your address has been stored:

```bash
echo $AKASH_ACCOUNT_ADDRESS
```

Check your account balance:

```bash
akash query bank balances --node $AKASH_NODE $AKASH_ACCOUNT_ADDRESS
```

You should have a response similar to:

```bash
balances:
- amount: "55280590"
  denom: uakt
pagination:
  next_key: null
  total: "0"
```

Note the balance indicated is denominated in uAKT (AKT x 10^-6), in the above example, the account has a balance of approximately 55 AKT.

## Configure your deploy.yml

Firstly start by creating a blank `deploy.yml` file:

```bash
mkdir myakashdeployment && cd myakashdeployment
touch deploy.yml
```

Then open `deploy.yml` for editing:

```bash
nano deploy.yml
```

The following code block is a good starting point. You may use this configuration as-is or modify it to suit your needs:

```bash
---
version: "2.0"

services:
  node:
    image: ghcr.io/ovrclk/cosmos-omnibus:v0.0.6-juno-lucina
    env:
      - MONIKER=my_juno_node
      - CHAIN_URL=https://raw.githubusercontent.com/nullMames/juno-on-akash/main/chain.json
    expose:
      - port: 26657
        as: 80
        to:
          - global: true
      - port: 26656
        to:
          - global: true

profiles:
  compute:
    node:
      resources:
        cpu:
          units: 2
        memory:
          size: 2Gi
        storage:
          size: 60Gi
  placement:
    dcloud:
      attributes:
        host: akash
      signedBy:
        anyOf:
          - "akash1365yvmc4s7awdyj3n2sav7xfx76adc6dnmlx63"
      pricing:
        node:
          denom: uakt
          amount: 100

deployment:
  node:
    dcloud:
      profile: node
      count: 1

```

### Service image

The `image:` for this deployment will be `v0.0.6` from the overclk/cosmos-omnibus repository, `ghcr.io/ovrclk/cosmos-omnibus:v0.0.6-juno-lucina`

```bash
services:
  node:
    image: ghcr.io/ovrclk/cosmos-omnibus:v0.0.6-juno-lucina
```

### Setting the environment

Metadata for the Juno lucina testnet is sourced from:

`https://raw.githubusercontent.com/nullMames/juno-on-akash/main/chain.json`

You will need to set the `MONIKER` for the node. For this example, we have used `my_juno_node`

```bash
env:
   - MONIKER=my_juno_node
   - CHAIN_URL=https://raw.githubusercontent.com/nullMames/juno-on-akash/main/chain.json
```

{% hint style="info" %}
Detailed information regarding environment variables can be found on the [ovrclk/cosmos-omnibus](https://github.com/ovrclk/cosmos-omnibus) github repository.
{% endhint %}

#### Restore from snapshot (optional)

You can optionally restore a publicly hosted snapshot to speed up the node deployment. A sample `env:` is as follows:

```javascript
env:
   - MONIKER=my_juno_node
   - CHAIN_URL=https://raw.githubusercontent.com/nullMames/juno-on-akash/main/chain.json
   - SNAPSHOT_URL=https://drzerp.com/data/lucina_2021-07-28.tar.gz
   - SNAPSHOT_FORMAT=tar.gz
```

This configuration will restore a compressed tar archive `lucina_2021--7-28.tar.gz`

## Create a Certificate

Before you can create a deployment, a [certificate](https://docs.akash.network/decentralized-cloud/mtls) must first be created. **Your certificate needs to be created only once per account** and can be used across all deployments.To do this, run:

```
akash tx cert create client --chain-id $AKASH_CHAIN_ID --keyring-backend $AKASH_KEYRING_BACKEND --from $AKASH_KEY_NAME --node $AKASH_NODE --fees 5000uakt
```

You should see a response similar to:

```javascript
{
  "body": {
    "messages": [
      {
        "@type": "/akash.cert.v1beta1.MsgCreateCertificate",
        "owner": "akash1vns5ka3x69ekm3ecp8my8d5zfu8j23p5qew0w3",
        "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUJ3RENDQVdXZ0F3SUJBZ0lJRm1pcUJWcWZDVmt3Q2dZSUtvWkl6ajBFQXdJd1NqRTFNRE1HQTFVRUF4TXMKWVd0aGMyZ3hkbTV6Tld0aE0zZzJPV1ZyYlRObFkzQTRiWGs0WkRWNlpuVTRhakl6Y0RWeFpYY3dkek14RVRBUApCZ1ZuZ1FVQ0JoTUdkakF1TUM0eE1CNFhEVEl4TURNd01qSXpNak15TmxvWERUSXlNRE13TWpJek1qTXlObG93ClNqRTFNRE1HQTFVRUF4TXNZV3RoYzJneGRtNXpOV3RoTTNnMk9XVnJiVE5sWTNBNGJYazRaRFY2Wm5VNGFqSXoKY0RWeFpYY3dkek14RVRBUEJnVm5nUVVDQmhNR2RqQXVNQzR4TUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowRApBUWNEUWdBRUtaSTlmWGVPVzRCYXRwcU1mb1VTekx2b01lWGlpbEZTMnJhZlhKdUNObUlMVjJMaWhIZW5JdjJTCjV5Uzh1Zkh5QmNMSUI5aFE1VE81THRHSUpPdzIvYU0xTURNd0RnWURWUjBQQVFIL0JBUURBZ1F3TUJNR0ExVWQKSlFRTU1Bb0dDQ3NHQVFVRkJ3TUNNQXdHQTFVZEV3RUIvd1FDTUFBd0NnWUlLb1pJemowRUF3SURTUUF3UmdJaApBSjJzQ3ZodGNzWkRXUkQ2MU03ZkVCRUk5eEt5Z0UzRkd3K2tIYVhZYXl0TUFpRUE4cUZtb3FEc1Z0ZzhPSHc1Ck5iOEljd0hiNHVkc0RpTzRxaWhoL0owNWZKaz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
        "pubkey": "LS0tLS1CRUdJTiBFQyBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFS1pJOWZYZU9XNEJhdHBxTWZvVVN6THZvTWVYaQppbEZTMnJhZlhKdUNObUlMVjJMaWhIZW5JdjJTNXlTOHVmSHlCY0xJQjloUTVUTzVMdEdJSk93Mi9RPT0KLS0tLS1FTkQgRUMgUFVCTElDIEtFWS0tLS0tCg=="
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

## Create a Deployment

To deploy your node to Akash, run:

```javascript
akash tx deployment create deploy.yml --from $AKASH_KEY_NAME --node $AKASH_NODE --chain-id $AKASH_CHAIN_ID --fees 5000uakt -yYou will see output similar to:
```

```javascript
{
    "height": "2035900",
    "txhash": "42D9B99D67B1B933161CC25C83F5F4C0D57CC32B9D85D767B0F964A7F5F4E129",
    "codespace": "",
    "code": 0,
    "data": "0A130A116372656174652D6465706C6F796D656E74",
    "raw_log": "[{\"events\":[{\"type\":\"akash.v1\",\"attributes\":[{\"key\":\"module\",\"value\":\"deployment\"},{\"key\":\"action\",\"value\":\"deployment-created\"},{\"key\":\"version\",\"value\":\"fab78c21499e2b81d0ee4f5ca137f560da20ca383227f01d5d1fed0775f40f38\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"order-created\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"create-deployment\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"amount\",\"value\":\"5000uakt\"},{\"key\":\"recipient\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"amount\",\"value\":\"5000000uakt\"}]}]}]",
    "logs": [
        {
            "msg_index": 0,
            "log": "",
            "events": [
                {
                    "type": "akash.v1",
                    "attributes": [
                        {
                            "key": "module",
                            "value": "deployment"
                        },
                        {
                            "key": "action",
                            "value": "deployment-created"
                        },
                        {
                            "key": "version",
                            "value": "fab78c21499e2b81d0ee4f5ca137f560da20ca383227f01d5d1fed0775f40f38"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "module",
                            "value": "market"
                        },
                        {
                            "key": "action",
                            "value": "order-created"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "oseq",
                            "value": "1"
                        }
                    ]
                },
                {
                    "type": "message",
                    "attributes": [
                        {
                            "key": "action",
                            "value": "create-deployment"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        }
                    ]
                },
                {
                    "type": "transfer",
                    "attributes": [
                        {
                            "key": "recipient",
                            "value": "akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "amount",
                            "value": "5000uakt"
                        },
                        {
                            "key": "recipient",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "amount",
                            "value": "5000000uakt"
                        }
                    ]
                }
            ]
        }
    ],
    "info": "",
    "gas_wanted": "200000",
    "gas_used": "91757",
    "tx": null,
    "timestamp": ""
}
```

## Setting the Deployment Sequence

From the previous command output, you must locate the `"key":"value"` pairs for the `dseq`, `gseq` and `oseq` keys, similar to the following:

```javascript
{
    "key": "dseq",
    "value": "2035898"
},
{
    "key": "gseq",
    "value": "1"
},
{
    "key": "oseq",
    "value": "1"
}
```

Copy these values and set the `AKASH_DSEQ`, `AKASH_DSEQ` and `AKASH_DSEQ` shell variables:

```javascript
AKASH_DSEQ=2035898 && \
AKASH_DSEQ=1 && \
AKASH_DSEQ=1
```

{% hint style="info" %}
If you have accidentally set the `$AKASH_DSEQ` variable to the wrong value,  use `unset $AKASH_DSEQ` to remove the variable and try again.
{% endhint %}

## Query the Market Bids and Select a Provider

You can now query the market for bids to run your deployment:

```javascript
akash query market bid list --owner=$AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ
```

You will be given an output similar to the following:

```javascript
bids:
- bid:
    bid_id:
      dseq: "2035898"
      gseq: 1
      oseq: 1
      owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
      provider: akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    created_at: "2035901"
    price:
      amount: "10"
      denom: uakt
    state: open
  escrow_account:
    balance:
      amount: "50000000"
      denom: uakt
    id:
      scope: bid
      xid: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg/2035898/1/1/akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    owner: akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal
    settled_at: "2035901"
    state: open
    transferred:
      amount: "0"
      denom: uakt
- bid:
    bid_id:
      dseq: "2035898"
      gseq: 1
      oseq: 1
      owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
      provider: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    created_at: "2035901"
    price:
      amount: "17"
      denom: uakt
    state: open
  escrow_account:
    balance:
      amount: "50000000"
      denom: uakt
    id:
      scope: bid
      xid: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg/2035898/1/1/akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    owner: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    settled_at: "2035901"
    state: open
    transferred:
      amount: "0"
      denom: uakt
pagination:
  next_key: null
  total: "0"
```

After you have studied the bids, you may select a bid from the list. Copy the provider hash and set the `AKASH_PROVIDER` shell variable:

```javascript
AKASH_PROVIDER=akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
```

## Create a Lease

Now that we have selected a provider we are able to create a lease with the provider:

```javascript
akash tx market lease create --chain-id $AKASH_CHAIN_ID --node $AKASH_NODE --owner $AKASH_ACCOUNT_ADDRESS --dseq $AKASH_DSEQ --gseq $AKASH_GSEQ --oseq $AKASH_OSEQ --provider $AKASH_PROVIDER --from $AKASH_KEY_NAME --fees 5000uakt
```

Your output will be similar to:

```javascript
{
    "height": "2035920",
    "txhash": "75AD9D2680711535438B1D341C54B5D9713B025024A4A05792AF3CFF40BFC120",
    "codespace": "",
    "code": 0,
    "data": "0A0E0A0C6372656174652D6C65617365",
    "raw_log": "[{\"events\":[{\"type\":\"akash.v1\",\"attributes\":[{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"lease-created\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"},{\"key\":\"provider\",\"value\":\"akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7\"},{\"key\":\"price-denom\",\"value\":\"uakt\"},{\"key\":\"price-amount\",\"value\":\"17\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"create-lease\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"amount\",\"value\":\"5000uakt\"},{\"key\":\"recipient\",\"value\":\"akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"amount\",\"value\":\"50000000uakt\"}]}]}]",
    "logs": [
        {
            "msg_index": 0,
            "log": "",
            "events": [
                {
                    "type": "akash.v1",
                    "attributes": [
                        {
                            "key": "module",
                            "value": "market"
                        },
                        {
                            "key": "action",
                            "value": "lease-created"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "oseq",
                            "value": "1"
                        },
                        {
                            "key": "provider",
                            "value": "akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7"
                        },
                        {
                            "key": "price-denom",
                            "value": "uakt"
                        },
                        {
                            "key": "price-amount",
                            "value": "17"
                        }
                    ]
                },
                {
                    "type": "message",
                    "attributes": [
                        {
                            "key": "action",
                            "value": "create-lease"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        }
                    ]
                },
                {
                    "type": "transfer",
                    "attributes": [
                        {
                            "key": "recipient",
                            "value": "akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "amount",
                            "value": "5000uakt"
                        },
                        {
                            "key": "recipient",
                            "value": "akash10cl5rm0cqnpj45knzakpa4cnvn5amzwp4lhcal"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "amount",
                            "value": "50000000uakt"
                        }
                    ]
                }
            ]
        }
    ],
    "info": "",
    "gas_wanted": "200000",
    "gas_used": "129998",
    "tx": null,
    "timestamp": ""
}
```

{% hint style="info" %}
If you get an error while trying to create the lease similar to:

```javascript
{"height":"1361880",
"txhash":"554579ED6917847777B645DDEB8B338C4ABC077DFF69517C9F17D55516296832",
"codespace":"market","code":12,"data":""
,"raw_log":"failed to execute message; message index: 0: bid not open"
,"logs":[],"info":"","gas_wanted":"200000","gas_used":"52035"
,"tx":null,"timestamp":""}
```

you have probably waited too long between creating the deployment and accepting a bid. You will need to close the deployment and start the deployment process again.
{% endhint %}

After creating a lease we can query the lease with:

```javascript
akash query market lease list --owner $AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ
```

Which should give you an output similar to:

```javascript
leases:
- escrow_payment:
    account_id:
      scope: deployment
      xid: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg/2035898
    balance:
      amount: "0"
      denom: uakt
    owner: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    payment_id: 1/1/akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    rate:
      amount: "17"
      denom: uakt
    state: open
    withdrawn:
      amount: "0"
      denom: uakt
  lease:
    created_at: "2035920"
    lease_id:
      dseq: "2035898"
      gseq: 1
      oseq: 1
      owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
      provider: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    price:
      amount: "17"
      denom: uakt
    state: active
pagination:
  next_key: null
  total: "0"
```

## Deploy the Mainfest

Now that we have created a lease with the provider, we can deploy the manifest:

```javascript
akash provider send-manifest deploy.yml --node $AKASH_NODE --dseq $AKASH_DSEQ --provider $AKASH_PROVIDER --home ~/.akash --from $AKASH_KEY_NAME
```

If your manifest deployment is successful, you should have an output similar to:

```javascript
provider: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
	status: PASS
```

## View your Logs

Now that your manifest is deployed, your instance should be up and running. You can now query you instance logs:

```javascript
akash provider lease-logs --node $AKASH_NODE --from $AKASH_KEY_NAME  --provider $AKASH_PROVIDER --dseq $AKASH_DSEQ
```

For this example instance, the initial logs output:

```javascript
 {"app_message":{"auth":{"accounts":[],"params":{"max_memo_characters":"256","sig_verify_cost_ed25519":"590","sig_verify_cost_secp256k1":"1000","tx_sig_limit":"7","tx_size_cost_per_byte":"10"}},"bank":{"balances":[],"denom_metadata":[],"params":{"default_send_enabled":true,"send_enabled":[]},"supply":[]},"capability":{"index":"1","owners":[]},"crisis":{"constant_fee":{"amount":"1000","denom":"stake"}},"distribution":{"delegator_starting_infos":[],"delegator_withdraw_infos":[],"fee_pool":{"community_pool":[]},"outstanding_rewards":[],"params":{"base_proposer_reward":"0.010000000000000000","bonus_proposer_reward":"0.040000000000000000","community_tax":"0.020000000000000000","withdraw_addr_enabled":true},"previous_proposer":"","validator_accumulated_commissions":[],"validator_current_rewards":[],"validator_historical_rewards":[],"validator_slash_events":[]},"evidence":{"evidence":[]},"genutil":{"gen_txs":[]},"gov":{"deposit_params":{"max_deposit_period":"172800s","min_deposit":[{"amount":"10000000","denom":"stake"}]},"deposits":[],"proposals":[],"starting_proposal_id":"1","tally_params":{"quorum":"0.334000000000000000","threshold":"0.500000000000000000","veto_threshold":"0.334000000000000000"},"votes":[],"voting_params":{"voting_period":"172800s"}},"ibc":{"channel_genesis":{"ack_sequences":[],"acknowledgements":[],"channels":[],"commitments":[],"next_channel_sequence":"0","receipts":[],"recv_sequences":[],"send_sequences":[]},"client_genesis":{"clients":[],"clients_consensus":[],"clients_metadata":[],"create_localhost":false,"next_client_sequence":"0","params":{"allowed_clients":["06-solomachine","07-tendermint"]}},"connection_genesis":{"client_connection_paths":[],"connections":[],"next_connection_sequence":"0"}},"juno":{},"mint":{"minter":{"annual_provisions":"0.000000000000000000","inflation":"0.130000000000000000"},"params":{"blocks_per_year":"6311520","goal_bonded":"0.670000000000000000","inflation_max":"0.200000000000000000","inflation_min":"0.070000000000000000","inflation_rate_change":"0.130000000000000000","mint_denom":"stake"}},"params":null,"slashing":{"missed_blocks":[],"params":{"downtime_jail_duration":"600s","min_signed_per_window":"0.500000000000000000","signed_blocks_window":"100","slash_fraction_double_sign":"0.050000000000000000","slash_fraction_downtime":"0.010000000000000000"},"signing_infos":[]},"staking":{"delegations":[],"exported":false,"last_total_power":"0","last_validator_powers":[],"params":{"bond_denom":"stake","historical_entries":10000,"max_entries":7,"max_validators":100,"unbonding_time":"1814400s"},"redelegations":[],"unbonding_delegations":[],"validators":[]},"transfer":{"denom_traces":[],"params":{"receive_enabled":true,"send_enabled":true},"port_id":"transfer"},"upgrade":{},"vesting":{},"wasm":{"codes":[],"contracts":[],"gen_msgs":[],"params":{"code_upload_access":{"address":"","permission":"Everybody"},"instantiate_default_permission":"Everybody","max_wasm_code_size":"614400"},"sequences":[]}},"chain_id":"lucina","gentxs_dir":"","moniker":"node_69","node_id":"0cb026681d97f567b309e1e14f7f3582ff1ed990"}
 Downloading genesis
 File at /root/.juno/config/genesis.json is a valid genesis file
 Node ID:
 0cb026681d97f567b309e1e14f7f3582ff1ed990
 5:47AM INF starting ABCI with Tendermint
 5:47AM INF Starting multiAppConn service impl=multiAppConn module=proxy
 5:47AM INF Starting localClient service connection=query impl=localClient module=abci-client
 5:47AM INF Starting localClient service connection=snapshot impl=localClient module=abci-client
 5:47AM INF Starting localClient service connection=mempool impl=localClient module=abci-client
 5:47AM INF Starting localClient service connection=consensus impl=localClient module=abci-client
 5:47AM INF Starting EventBus service impl=EventBus module=events
 5:47AM INF Starting PubSub service impl=PubSub module=pubsub
 5:47AM INF Starting IndexerService service impl=IndexerService module=txindex
 5:47AM INF ABCI Handshake App Info hash= height=0 module=consensus protocol-version=0 software-version=
 5:47AM INF ABCI Replay Blocks appHeight=0 module=consensus stateHeight=0 storeHeight=0
```

We can see the node has downloaded the genesis file and is starting the node. A short time later we can see the node is syncing to the network:

```javascript
 6:14AM INF committed state app_hash=44431E573B7675BE3CADC76FFF9CBCC030D65104422BC120B9D034D9DC943DF6 height=988 module=state num_txs=0
 6:14AM INF indexed block height=988 module=txindex
 6:14AM INF minted coins from module account amount=1520783ujuno from=mint module=x/bank
 6:14AM INF executed block height=989 module=state num_invalid_txs=0 num_valid_txs=0
 6:14AM INF commit synced commit=436F6D6D697449447B5B3332203138352034312035203231312032323220323238203231322032203139392031373620363720313138203131372035302034392038203132342031313920313534203232203135203131382036203133382031342033312032313220353520323035203830203233355D3A3344447D
 6:14AM INF committed state app_hash=20B92905D3DEE4D402C7B04376753231087C779A160F76068A0E1FD437CD50EB height=989 module=state num_txs=0
 6:14AM INF indexed block height=989 module=txindex
 6:14AM INF minted coins from module account amount=1520784ujuno from=mint module=x/bank
 6:14AM INF executed block height=990 module=state num_invalid_txs=0 num_valid_txs=0
```

## Making Changes to Your Deployment Manifest

If you find that you have made a mistake in your `deploy.yml` and your instance has not started up as expected, you are able to make changes to the `deploy.yml `update your deployment lease:

```javascript
akash tx deployment update deploy.yml --dseq $AKASH_DSEQ --from $AKASH_KEY_NAME --chain-id $AKASH_CHAIN_ID --node $AKASH_NODE --fees=5000uakt
```

And re-deploy the manifest:

```javascript
akash provider send-manifest deploy.yml --keyring-backend $AKASH_KEYRING_BACKEND --node $AKASH_NODE --from $AKASH_KEY_NAME --provider $AKASH_PROVIDER --dseq $AKASH_DSEQ --log_level info --home ~/.akash
```

## Query the Deployment Lease Status

You are able to query the status of the lease at any time:

```javascript
akash query deployment get --owner $AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ
```

You will be given an output similar to:

```javascript
deployment:
  created_at: "2035900"
  deployment_id:
    dseq: "2035898"
    owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
  state: active
  version: gtOQplMxCfvcyStE6+dDdwl+wL20XbHuNEw0mK0prjE=
escrow_account:
  balance:
    amount: "5000000"
    denom: uakt
  id:
    scope: deployment
    xid: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg/2035898
  owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
  settled_at: "2035920"
  state: open
  transferred:
    amount: "0"
    denom: uakt
groups:
- created_at: "2035900"
  group_id:
    dseq: "2035898"
    gseq: 1
    owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
  group_spec:
    name: dcloud
    requirements:
      attributes:
      - key: host
        value: akash
      signed_by:
        all_of: []
        any_of: []
    resources:
    - count: 1
      price:
        amount: "100"
        denom: uakt
      resources:
        cpu:
          attributes: []
          units:
            val: "2000"
        endpoints:
        - kind: SHARED_HTTP
        - kind: RANDOM_PORT
        memory:
          attributes: []
          quantity:
            val: "2147483648"
        storage:
          attributes: []
          quantity:
            val: "64424509440"
  state: open
```

## Query the Deployment URL

You can query the deployment to show the URL assigned:

```javascript
akash provider lease-status --node $AKASH_NODE --home ~/.akash --dseq $AKASH_DSEQ --from $AKASH_KEY_NAME --provider $AKASH_PROVIDER
```

This will produce an output similar to:

```javascript
{
  "services": {
    "node": {
      "name": "node",
      "available": 1,
      "total": 1,
      "uris": [
        "qevnurlff586fdl00simo2b9uc.ingress.ewr1p0.mainnet.akashian.io"
      ],
      "observed_generation": 2,
      "replicas": 1,
      "updated_replicas": 1,
      "ready_replicas": 1,
      "available_replicas": 1
    }
  },
  "forwarded_ports": {
    "node": [
      {
        "host": "cluster.ewr1p0.mainnet.akashian.io",
        "port": 26656,
        "externalPort": 31335,
        "proto": "TCP",
        "available": 1,
        "name": "node"
      }
    ]
  }
}
```

## Closing Your Lease

You can close your lease at any time by executing:

```javascript
akash tx deployment close --node $AKASH_NODE --chain-id $AKASH_CHAIN_ID --dseq $AKASH_DSEQ  --owner $AKASH_ACCOUNT_ADDRESS --from $AKASH_KEY_NAME --keyring-backend $AKASH_KEYRING_BACKEND -y --fees 5000uakt
```

You will be given an output similar to:

```javascript
{
    "height": "2036292",
    "txhash": "B5EBD4F1B6B9B5F37EDD569DA73DD82877ACEC2897C4DBBA9C4B8109911C4A77",
    "codespace": "",
    "code": 0,
    "data": "0A120A10636C6F73652D6465706C6F796D656E74",
    "raw_log": "[{\"events\":[{\"type\":\"akash.v1\",\"attributes\":[{\"key\":\"module\",\"value\":\"deployment\"},{\"key\":\"action\",\"value\":\"deployment-closed\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"module\",\"value\":\"deployment\"},{\"key\":\"action\",\"value\":\"group-closed\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"order-closed\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"},{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"bid-closed\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"},{\"key\":\"provider\",\"value\":\"akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7\"},{\"key\":\"price-denom\",\"value\":\"uakt\"},{\"key\":\"price-amount\",\"value\":\"17\"},{\"key\":\"module\",\"value\":\"market\"},{\"key\":\"action\",\"value\":\"lease-closed\"},{\"key\":\"owner\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"dseq\",\"value\":\"2035898\"},{\"key\":\"gseq\",\"value\":\"1\"},{\"key\":\"oseq\",\"value\":\"1\"},{\"key\":\"provider\",\"value\":\"akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7\"},{\"key\":\"price-denom\",\"value\":\"uakt\"},{\"key\":\"price-amount\",\"value\":\"17\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"close-deployment\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8\"},{\"key\":\"sender\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"amount\",\"value\":\"5000uakt\"},{\"key\":\"recipient\",\"value\":\"akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"amount\",\"value\":\"4993676uakt\"},{\"key\":\"recipient\",\"value\":\"akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"amount\",\"value\":\"6324uakt\"},{\"key\":\"recipient\",\"value\":\"akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7\"},{\"key\":\"sender\",\"value\":\"akash14pphss726thpwws3yc458hggufynm9x77l4l2u\"},{\"key\":\"amount\",\"value\":\"50000000uakt\"}]}]}]",
    "logs": [
        {
            "msg_index": 0,
            "log": "",
            "events": [
                {
                    "type": "akash.v1",
                    "attributes": [
                        {
                            "key": "module",
                            "value": "deployment"
                        },
                        {
                            "key": "action",
                            "value": "deployment-closed"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "module",
                            "value": "deployment"
                        },
                        {
                            "key": "action",
                            "value": "group-closed"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "module",
                            "value": "market"
                        },
                        {
                            "key": "action",
                            "value": "order-closed"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "oseq",
                            "value": "1"
                        },
                        {
                            "key": "module",
                            "value": "market"
                        },
                        {
                            "key": "action",
                            "value": "bid-closed"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "oseq",
                            "value": "1"
                        },
                        {
                            "key": "provider",
                            "value": "akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7"
                        },
                        {
                            "key": "price-denom",
                            "value": "uakt"
                        },
                        {
                            "key": "price-amount",
                            "value": "17"
                        },
                        {
                            "key": "module",
                            "value": "market"
                        },
                        {
                            "key": "action",
                            "value": "lease-closed"
                        },
                        {
                            "key": "owner",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "dseq",
                            "value": "2035898"
                        },
                        {
                            "key": "gseq",
                            "value": "1"
                        },
                        {
                            "key": "oseq",
                            "value": "1"
                        },
                        {
                            "key": "provider",
                            "value": "akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7"
                        },
                        {
                            "key": "price-denom",
                            "value": "uakt"
                        },
                        {
                            "key": "price-amount",
                            "value": "17"
                        }
                    ]
                },
                {
                    "type": "message",
                    "attributes": [
                        {
                            "key": "action",
                            "value": "close-deployment"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        }
                    ]
                },
                {
                    "type": "transfer",
                    "attributes": [
                        {
                            "key": "recipient",
                            "value": "akash17xpfvakm2amg962yls6f84z3kell8c5lazw8j8"
                        },
                        {
                            "key": "sender",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "amount",
                            "value": "5000uakt"
                        },
                        {
                            "key": "recipient",
                            "value": "akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "amount",
                            "value": "4993676uakt"
                        },
                        {
                            "key": "recipient",
                            "value": "akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "amount",
                            "value": "6324uakt"
                        },
                        {
                            "key": "recipient",
                            "value": "akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7"
                        },
                        {
                            "key": "sender",
                            "value": "akash14pphss726thpwws3yc458hggufynm9x77l4l2u"
                        },
                        {
                            "key": "amount",
                            "value": "50000000uakt"
                        }
                    ]
                }
            ]
        }
    ],
    "info": "",
    "gas_wanted": "200000",
    "gas_used": "182262",
    "tx": null,
    "timestamp": ""
}
```

From examining these logs, we can see that this deployment had a total cost of 6324 uAKT:

```javascript
{
    "key": "amount",
    "value": "6324uakt"
}
```

You can now query the lease to ensure it has been closed:

```javascript
akash query market lease list --owner $AKASH_ACCOUNT_ADDRESS --node $AKASH_NODE --dseq $AKASH_DSEQ
```

Which will give you an output similar to:

```javascript
leases:
- escrow_payment:
    account_id:
      scope: deployment
      xid: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg/2035898
    balance:
      amount: "0"
      denom: uakt
    owner: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    payment_id: 1/1/akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    rate:
      amount: "17"
      denom: uakt
    state: closed
    withdrawn:
      amount: "6324"
      denom: uakt
  lease:
    created_at: "2035920"
    lease_id:
      dseq: "2035898"
      gseq: 1
      oseq: 1
      owner: akash1j2wkr3hshu44dxug4n3f27redumw0732p5sazg
      provider: akash1f6gmtjpx4r8qda9nxjwq26fp5mcjyqmaq5m6j7
    price:
      amount: "17"
      denom: uakt
    state: closed
pagination:
  next_key: null
  total: "0"
```

## Further Reading

If you would like further information for various environment configurations for your Juno `deployment.yml` please visit the [cosmos-omnibus repository](https://github.com/ovrclk/cosmos-omnibus).

For further information regarding Akash deployments and the Akash CLI, please refer to the [Akash documentation](https://docs.akash.network).

