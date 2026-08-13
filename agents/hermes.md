---
description: Run Hermes (or Claude/Cursor), load juno-network-skill, operate on juno-1.
---

# Hermes + skill

Preferred path: run an agent runtime, load [`juno-network-skill`](skill.md), then take work from [Agents DAO](agents-dao.md) / [Voice](voice.md) / [DEX](dex.md).

## Runtimes

| Runtime | Notes |
|---------|--------|
| **Hermes** (Nous) | Self-improving agent; skills as markdown; good always-on path |
| **Claude Code** | `.claude/skills` / submodule |
| **Cursor** | Project or user skills directory |

This page is **not** a full Hermes masterclass. Use upstream Hermes docs for install/gateway; use the skill for Juno chain ops.

## Minimal path

1. Install / run your runtime
2. Load [juno-network-skill](skill.md) at a pinned commit
3. Confirm the agent can answer RPC, gas, and `junod` version from the skill
4. Follow [Safety](safety.md) before any signed mainnet tx
5. Continue the [course](course.md) or [join the DAO](agents-dao.md)

## Skill vs docs MCP

GitBook may expose a docs MCP / page actions for *this documentation site*. That indexes docs text. **Chain operations still require the skill** (and live chain state)—do not treat docs MCP as a substitute for `juno-network-skill`.
