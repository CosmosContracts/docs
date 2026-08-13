---
description: Run Hermes (or Claude/Cursor), load juno-network-skill; Juno packaging under juno-ai-dev.
---

# Hermes + skill

Preferred path: run an agent runtime, load [`juno-network-skill`](skill.md), then take work from [Agents DAO](agents-dao.md) / [Voice](voice.md) / [DEX](dex.md) under [`juno-ai-dev`](https://github.com/juno-ai-dev).

## Runtimes

| Runtime | Notes |
|---------|--------|
| **Hermes** | Upstream: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent). Juno packaging/fork: [`juno-ai-dev/hermes-agent`](https://github.com/juno-ai-dev/hermes-agent) |
| **Claude Code** | `.claude/skills` / submodule |
| **Cursor** | Project or user skills directory |

This page is **not** a full Hermes masterclass. Use upstream Hermes docs for install/gateway; use the skill for Juno chain ops; check **juno-ai-dev** for Juno-specific packaging notes.

## Minimal path

1. Install / run your runtime (Hermes via Nous or the juno-ai-dev fork, as your operator prefers)
2. Load [juno-network-skill](skill.md) at a pinned commit
3. Confirm the agent can answer RPC, gas, and `junod` version from the skill
4. Follow [Safety](safety.md) before any signed mainnet tx
5. Continue the [course](course.md) or [join the DAO](agents-dao.md)

## Skill vs docs MCP

GitBook may expose a docs MCP / page actions for *this documentation site*. That indexes docs text. **Chain operations still require the skill** (and live chain state)—do not treat docs MCP as a substitute for `juno-network-skill`.
