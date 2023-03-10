---
description: How to convert between different aspects of data for
---

# Conversions

## Token Denominations

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

## Address Conversions

### Valoper -> Base

Convert the validator operator wallet to a standard base address

```typescript
// npm i @cosmjs/encoding
import {toBech32, fromBech32} from '@cosmjs/encoding'

let toPrefix = "juno"

let initial = "junovaloper196ax4vc0lwpxndu9dyhvca7jhxp70rmcqcnylw"
let converted = toBech32(toPrefix, fromBech32(initial).data)

console.log(converted)
// juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh
```

### Juno -> Other Chain&#x20;

{% hint style="info" %}
You can only convert between the same cointype, so converting a JUNO (118) to EVM address such as Terra's 330 will not properly convert. This is not possible to do without their private key
{% endhint %}

#### Web UI

* &#x20;[https://bech32.scrtlabs.com/](https://bech32.scrtlabs.com/)&#x20;

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

#### CLI

```sh
junod debug bech32-convert juno196ax4vc0lwpxndu9dyhvca7jhxp70rmcl99tyh -p cosmos
# cosmos196ax4vc0lwpxndu9dyhvca7jhxp70rmcfhxsrt
```

### Hex -> Valcons

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

With this, you can now make a mapping between a junovaloper and signing junovalcons address

### Hex -> Bech32

Convert juno address between `hex` and `bech32` format.

```
junod debug addr [address] [flags]
```

{% hint style="info" %}
**TIP**

The command will accept either `hex` or `bech32` coded address as the `[address]` argument. The command will return the same output for either.
{% endhint %}

{% hint style="info" %}
**TIP**

Your `bech32` encoded juno local addresses can be queried with `junod keys list`
{% endhint %}

Example usage:

```sh
# query bech32 encoded address
junod debug addr juno1ludczrvlw36fkur9vy49lx4vjqhppn30h42ufg

# query hex address
junod debug addr FF1B810D9F74749B7065612A5F9AAC902E10CE2F
```

Returns:

```
Address: [255 27 129 13 159 116 116 155 112 101 97 42 95 154 172 144 46 16 206 47]
Address (hex): FF1B810D9F74749B7065612A5F9AAC902E10CE2F
Bech32 Acc: juno1ludczrvlw36fkur9vy49lx4vjqhppn30h42ufg
Bech32 Val: junovaloper1ludczrvlw36fkur9vy49lx4vjqhppn30ggunj3
```

### Raw Bytes -> Hex

Convert raw bytes output (eg. \[10 21 13 127]) to `hex`.

```
junod debug raw-bytes <raw-bytes>
```

Example command:

```
junod debug raw-bytes "10 21 13 127"
```

Returns:

```
0A150D7F
```

### Public Key -> Valcons

Convert a validators public key to the validator consensus tendermint address

{% hint style="info" %}
```
You can get the Public Key from the REST/LCD endpoint:
    cosmos/staking/v1beta1/validators

https://api.juno.strange.love/cosmos/staking/v1beta1/validators
&
https://.../cosmos/staking/v1beta1/validators/<junovaloper...>
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

### PubKey -> Hex, Base64, or Bech32

Decode a ED25519[^1] pubkey from `hex`, `base64`, or `bech32`.

```
junod debug pubkey [pubkey] [flags]
```

{% hint style="info" %}
**TIP**

The command will accept `hex`, `base64` or `bech32` coded keys as `[pubkey]` argument. The command will return the same output for any of these inputs.
{% endhint %}

{% hint style="info" %}
**TIP**

Your `bech32` encoded validator pubkey can be queried with `junod tendermint show-validator`
{% endhint %}

Example usage:

```
# query hex address
junod debug pubkey F2AF5F796A1626C8BB51535E361F2E4B66A61B9AAD177B83452E0FCD5A14690DE

# query base64 encoded address
junod debug pubkey 8q9feWoWJsi7UVNeNh8uS2amG5qtF3uDRS4PzVoUaQ0=

# query base32 encoded address
junod debug pubkey junopub1zcjduepq72h477t2zcnv3w632d0rv8ewfdn2vxu645thhq699c8u6ks5dyxs7f2qt6Returns something similar to:
```

Returns:

```
Address: A50DF747BBF892E0FB0BCBAE6C3E2A5AE4A17D5A
Hex: F2AF5F796A1626C8BB51535E361F2E4B66A61B9AAD177B83452E0FCD5A14690D
JSON (base64): {"type":"tendermint/PubKeyEd25519","value":"8q9feWoWJsi7UVNeNh8uS2amG5qtF3uDRS4PzVoUaQ0="}
Bech32 Acc: junopub1zcjduepq72h477t2zcnv3w632d0rv8ewfdn2vxu645thhq699c8u6ks5dyxs7f2qt6
Bech32 Validator Operator: junovaloperpub1zcjduepq72h477t2zcnv3w632d0rv8ewfdn2vxu645thhq699c8u6ks5dyxssaf8x6
Bech32 Validator Consensus: junovalconspub1zcjduepq72h477t2zcnv3w632d0rv8ewfdn2vxu645thhq699c8u6ks5dyxsahwpfj
```

[^1]: 
