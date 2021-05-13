---
description: Send it!
---

# Transactions

You can send a transaction on the juno network by using the following format:

```sh
junod tx bank send <sender_key_name_or_address> <recipient_address> 10token --chain-id=<chain_id>
```

# Unjailing

Occasionally, your validator might get jailed. Unjail it with:

```sh
junod tx slashing unjail --from <your-key-here> --chain-id juno-testnet-n --gas auto --fees 5000stake
```

On a testnet, you can be more relaxed, but on a mainnet you want to have set up monitoring so that blocks don't get missed and you don't get jailed!

## Fees and gas

You'll often need to specify fees and gas in order for a command to work. Trying something like `--gas auto --fees 5000stake` will usually force something to work - just adjust how much you're willing to pay. Often, the error message will specify the minimum fee.

# Getting help

Almost every command will have docs available. You can access these by appending the `-h` flag.

For example, running:

```sh
junod tx bank send -h
```

Results in:

```text
Send funds from one account to another. Note, the'--from' flag is
ignored as it is implied from [from_key_or_address].

Usage:
  junod tx bank send [from_key_or_address] [to_address] [amount] [flags]

Flags:
  -a, --account-number uint      The account number of the signing account (offline mode only)
  -b, --broadcast-mode string    Transaction broadcasting mode (sync|async|block) (default "sync")
      --dry-run                  ignore the --gas flag and perform a simulation of a transaction, but don't broadcast it
      --fees string              Fees to pay along with transaction; eg: 10uatom
      --from string              Name or address of private key with which to sign
      --gas string               gas limit to set per-transaction; set to "auto" to calculate sufficient gas automatically (default 200000)
      --gas-adjustment float     adjustment factor to be multiplied against the estimate returned by the tx simulation; if the gas limit is set manually this flag is ignored  (default 1)
      --gas-prices string        Gas prices in decimal format to determine the transaction fee (e.g. 0.1uatom)
      --generate-only            Build an unsigned transaction and write it to STDOUT (when enabled, the local Keybase is not accessible)
  -h, --help                     help for send
      --keyring-backend string   Select keyring's backend (os|file|kwallet|pass|test) (default "test")
      --keyring-dir string       The client Keyring directory; if omitted, the default 'home' directory will be used
      --ledger                   Use a connected Ledger device
      --memo string              Memo to send along with transaction
      --node string              <host>:<port> to tendermint rpc interface for this chain (default "tcp://localhost:26657")
      --offline                  Offline mode (does not allow any online functionality
  -s, --sequence uint            The sequence number of the signing account (offline mode only)
      --sign-mode string         Choose sign mode (direct|amino-json), this is an advanced feature
      --timeout-height uint      Set a block timeout height to prevent the tx from being committed past a certain height
  -y, --yes                      Skip tx broadcasting prompt confirmation

Global Flags:
      --chain-id string     The network chain ID (default "juno-testnet-3")
      --home string         directory for config and data (default "/home/needlecast/.juno")
      --log_format string   The logging format (json|plain) (default "plain")
      --log_level string    The logging level (trace|debug|info|warn|error|fatal|panic) (default "info")
      --trace               print out full stack trace on errors
```

Appending the `-h` flag is a good way of learning how the various CLI commands work.
