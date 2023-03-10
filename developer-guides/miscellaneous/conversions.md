---
description: How to convert between different aspects of data for
---

# Conversions

## Denominations

In Cosmos, every denomination amount is formatted as an unsigned integer. With this, the chain does not have to deal with fractions. For an EVM chain this amount is typically `10**18` power, while Juno and other native Cosmos chains use the `10**6` power. This means if I want to send you 1 JUNO, I am actually sending 1,000,000 of the smaller token.\
\
You can figure out which power a token uses by its prefix character in the denomination. In the case of JUNO, the actual denomination is shown as `ujuno`. This u signals that it is using any amount times `10**6` to get the human readable amount.

{% hint style="info" %}
10JUNO = 10,000,000ujuno\
0.5 JUNO = 500,000ujuno\
0.00001 JUNO = 10ujuno\
\
This means the smallest amount anyone can send is 0.000001 JUNO
{% endhint %}

## Hex address to valcons (validator consensus)

Sometimes you may want to convert from a hex address found from one of Juno's endpoints to a more readable validators consensus address to get their signing blocks and link to other data. TO do so, here is a Typescript snippet

```typescript
// npm i @cosmjs/encoding
import {fromHex, toBech32} from '@cosmjs/encoding'

// where junovalcons is the wallet prefix for the chain + valcons
const prefix = "junovalcons"

let addr = toBech32(prefix, fromHex("1470B9237056641663CB4DFDEC86B064578B29BF"))
console.log(addr)

// This outputs junovalcons1z3ctjgms2ejpvc7tfh77ep4sv3tck2dl30r3mx 
// which matches their page
// https://ping.pub/juno/staking/junovaloper196ax4vc0lwpxndu9dyhvca7jhxp70rmcqcnylw
```

With this, you can now make a mapping between a junovaloper and junovalcons address

## Public Key to Valcons (Validator Consensus)

{% hint style="info" %}
```
You can get the Public Key from the REST/LCD endpoint:
    cosmos/staking/v1beta1/validators

https://api.juno.strange.love/cosmos/staking/v1beta1/validators
&
https://.../cosmos/staking/v1beta1/validators/junovalopera_address_here
```
{% endhint %}

```typescript
// npm i @cosmjs/encoding
import {fromBase64, toBech32} from '@cosmjs/encoding'
// npm i @cosmjs/crypto
import { sha256 } from '@cosmjs/crypto'

let prefix = "junovalcons"

// Chain Format: 
// {
//    "@type":"/cosmos.crypto.ed25519.PubKey",
//    "key":"/O7BtNW0pafwfvomgR4ZnfldwPXiFfJs9mHg3gwfv5Q="
// }

// we just need the .key string from the object
let pubKey = "/O7BtNW0pafwfvomgR4ZnfldwPXiFfJs9mHg3gwfv5Q="
const addr = toBech32(prefix, sha256(fromBase64(pubKey)).slice(0, 20))

console.log(addr)
// junovalcons1z3ctjgms2ejpvc7tfh77ep4sv3tck2dl30r3mx
```

## Validator Operator (Valoper) to normal account

```typescript
// npm i @cosmjs/encoding
import {toBech32, fromBech32} from '@cosmjs/encoding'

let toPrefix = "juno"

let initial = "junovaloper196ax4vc0lwpxndu9dyhvca7jhxp70rmcqcnylw"
let converted = toBech32(toPrefix, fromBech32(initial).data)

console.log(converted)
// juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh
```

## JUNO Address to another chain

For an easy UI, you can use [https://bech32.scrtlabs.com/](https://bech32.scrtlabs.com/) for address conversions. If you need a more programmatic version

#### Typescript

```typescript
// Typescript
// npm i @cosmjs/encoding
import {toBech32, fromBech32} from '@cosmjs/encoding'

let toPrefix = "cosmos"

let initial = "juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh"
let converted = toBech32(toPrefix, fromBech32(initial).data)

console.log(converted)
// cosmos196ax4vc0lwpxndu9dyhvca7jhxp70rmcfhxsrt
```

#### Python

```python
# pip install bech32 - https://pypi.org/project/bech32/
import bech32

address = "juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh"

def address_convert(address=address, prefix="cosmos"):
    _, data = bech32.bech32_decode(address)
    return bech32.bech32_encode(prefix, data)

converted_addr = address_convert(address, "cosmos")
print(converted_addr)
# cosmos196ax4vc0lwpxndu9dyhvca7jhxp70rmcfhxsrt
```

Here we take SG-1's JUNO address and convert it to a cosmoshub address since these are both 118 coin types. Other 118 coin types include Juno, Osmosis, Chihuahua, and others. You can only convert between the same cointype, so converting a JUNO to EVM address such as EVMOS or INJECTIVE will not function.\
\
Once converted, [you can see that SG-1 cosmos address](https://www.mintscan.io/cosmos/account/cosmos196ax4vc0lwpxndu9dyhvca7jhxp70rmcfhxsrt) also has funds just like their JUNO account by using a UI explorer like mintscan.

