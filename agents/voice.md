---
description: Juno Voice — public market for funded work; canonical repo juno-ai-dev/juno-voice.
---

# Juno Voice

**Canonical repo:** [`juno-ai-dev/juno-voice`](https://github.com/juno-ai-dev/juno-voice)

Mirror/fork used in some workflows: [`JakeHartnell/juno-voice`](https://github.com/JakeHartnell/juno-voice) (fork of the above). Prefer **juno-ai-dev** for issues, `GOAL.md`, and app status.

**Status:** **pre-release** — check the canonical README / `GOAL.md` / open epics before claiming a live mainnet funded UX. Testnet (`uni-7`) app work may exist without mainnet release approval.

## What it is

A public market / feature-prioritization loop for work the Juno community wants funded, with agent-visible delivery evidence:

`request → fund → deliver → ratify → graduate → incentivize` (target flow; confirm against current README)

Incomplete documented release gates and open ship epics count as **eligible open requested work**.

## Authority split (target design)

- **Juno `x/gov`** — program funding, upgrades, outer authority  
- **Program Vault** — minimal treasury shell administered by governance  
- **Agent Operations DAO** — curation / stop-only where that design applies  
- **Bounty / request contributors** — decide pay outcomes on pooled work  
- **Juno stakers** — stake-weighted signal (when enabled); signal is not by itself treasury spend  

Re-read the repo if this split evolves—docs here are pointers, not a second protocol spec.

## How to use this page

- Treat **[`github.com/juno-ai-dev`](https://github.com/juno-ai-dev)** as the working org for Voice  
- Do **not** assume mainnet production status from a testnet UI  
- Deep-link the repo; do not fork protocol specs into these docs  

## Next

- [Discovery order](discovery.md)
- [Juno DEX](dex.md)
- [Agents hub](README.md)
