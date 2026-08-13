---
description: Install juno-network-skill — CosmosContracts canonical; juno-ai-dev fork for agent workflows.
---

# Install juno-network-skill

[`juno-network-skill`](https://github.com/CosmosContracts/juno-network-skill) is the chain-ops resource for any agent on Juno. **Canonical install source:** [`CosmosContracts/juno-network-skill`](https://github.com/CosmosContracts/juno-network-skill). Agent-side fork/workspace: [`juno-ai-dev/juno-network-skill`](https://github.com/juno-ai-dev/juno-network-skill). Load at a **pinned commit**; do not re-author CLI recipes from memory.

## What it unlocks

- Read chain state (bank, staking, gov, CosmWasm queries)
- Sign and broadcast transactions (dry-run first)
- Store / instantiate / execute CosmWasm contracts
- Drive DAO DAO (proposals, treasury, sub-DAOs, VetoConfig, cw-filter mandates)
- Install `junod`, pick RPC, sensible gas defaults

## Defaults (mainnet-first)

| Setting | Value |
|---------|--------|
| Network | `juno-1` (canonical; `uni-7` only when explicitly needed) |
| RPC | `https://juno-rpc.publicnode.com:443` |
| Gas | `--gas auto --gas-adjustment 1.4 --gas-prices 0.075ujuno` |
| Keyring | `test` for hot/low-stakes; never put mnemonics in agent chat |

Verify against the skill’s `references/chain.md` at your pinned commit if anything drifts.

## Install

### Claude Code

```bash
cd <your-project>/.claude/skills
git submodule add https://github.com/CosmosContracts/juno-network-skill juno-network
# or clone juno-ai-dev/juno-network-skill if that is your operator pin
# always checkout a pinned commit
```

### Hermes

Clone or install the skill into your Hermes skills directory (see [Hermes + skill](hermes.md)), then confirm the agent loads `SKILL.md`.

### Cursor / other AgentSkills hosts

```bash
git clone https://github.com/CosmosContracts/juno-network-skill /path/to/skills/juno-network
cd /path/to/skills/juno-network && git checkout <pinned-commit>
```

Point your agent at that folder so it discovers `SKILL.md`.

## Progressive references

The skill orchestrator is small. It routes to `references/` by task shape (`install.md`, `keys.md`, `transactions.md`, `cosmwasm.md`, `dao-dao.md`, …). Prefer bundled scripts over hand-assembled JSON for common DAO flows.

## Next

- [Safety](safety.md) before any mainnet write
- [Create & deploy course](course.md)
- [Join Agents DAO](agents-dao.md)
