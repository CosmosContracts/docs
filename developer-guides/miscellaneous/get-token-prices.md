---
description: Get the price of a token from a variety of sources
---

# Get Token Prices

In your webapp, you may want to show the current price of a token in the ecosystem or other ecosystems. Here are a few ways to get these prices to display. These should **NOT** be used for logic. If you wish to use token prices for logic, you will need to use an Oracle from multiple sources.

## Coingecko

Coingecko is the most popular source for Crypto price feeds. It is free to use, and allows 1 query per 6 seconds by default. This should only be used for decoration, and no logic should be built off of it.

### Python

```python
# https://pypi.org/project/pycoingecko/
# pip install pycoingecko
from pycoingecko import CoinGeckoAPI

ids = "juno-network,bitcoin"
currencies = "usd,eur"

def main():
    cg = Coingecko()
    print(cg.pretty_prices())

class Coingecko:
    # https://www.coingecko.com/en/api/documentation
    def __init__(self):
        api_key = ""
        if len(api_key) > 0:
            self.cg = CoinGeckoAPI(api_key=api_key)
        else:
            self.cg = CoinGeckoAPI()

    def __get_symbols(self):
        values = {}
        for _id in ids.split(","):
            data = self.cg.get_coin_by_id(_id)
            symbol = data.get("symbol", "")
            values[_id] = symbol
        return values

    def get_prices(self) -> dict:
        return self.cg.get_price(ids=ids, vs_currencies=currencies)

    def pretty_prices(self):
        updated_coins = {}
        symbols = self.__get_symbols()
        for k, v in self.get_prices().items():
            symbol = str(symbols.get(k, k)).upper()
            updated_coins[symbol] = {"coingecko-id": k, "prices": v}
        return updated_coins


if __name__ == "__main__":
    main()
```

```json
{
    'BTC': {
        'coingecko-id': 'bitcoin', 
        'prices': {'usd': 23270, 'eur': 21999}}, 
    'JUNO': {
        'coingecko-id': 'juno-network', 
        'prices': {'usd': 1.13, 'eur': 1.068}
    }
}
```

### Typescript

{% hint style="info" %}
Example Typescript price Querier program\
[https://github.com/Reecepbcups/wasm-oracle/tree/main/data-feeders-examples/crypto-prices](https://github.com/Reecepbcups/wasm-oracle/tree/main/data-feeders-examples/crypto-prices)
{% endhint %}

```typescript
// npm i coingecko-api-v3
import { CoinGeckoClient } from 'coingecko-api-v3';

export interface Data {
    id: string;
    value: number;
}
export interface Provider {
    name: string;
    getPrices(): Promise<Data[]>;    
    isEnabled(): boolean;
}

const REQUESTED_SYMBOLS = {"juno-network":"JUNO","bitcoin":"BTC"}

export class CoinGeckoProvider implements Provider {
    name: string;
    coingecko: CoinGeckoClient;

    constructor() {
        this.name = "CoinGecko";
        this.coingecko = new CoinGeckoClient({
            timeout: 10000,
            autoRetry: true,
        });
    }

    isEnabled(): boolean {
        return true;
    }

    async getPrices(): Promise<Data[]> {
        const ids = Object.keys(REQUESTED_SYMBOLS).join(',');

        const v = await this.coingecko.simplePrice({ vs_currencies: 'usd', ids });

        let data_arr: Data[] = []
        for (const key of Object.keys(v)) {
            let value = Number(v[key].usd);

            // if key not in COINGECKO_DENOM_MAP, then use key as id
            let id = key;
            if (key in REQUESTED_SYMBOLS) {
                id = REQUESTED_SYMBOLS[key];
            }                    

            data_arr.push({
                id,
                value
            });
        }

        return data_arr;
    }
}

```

## Wynd Dex (Juno)

{% embed url="https://api.wynddao.com/assets/prices" %}

## Osmosis Dex

{% embed url="https://api-osmosis.imperator.co/tokens/v2/juno" %}
