---
description: Juno Voice — public market for funded work; pre-release backend; open GOAL.md gates.
---

# Juno Voice

**Repo:** [JakeHartnell/juno-voice](https://github.com/JakeHartnell/juno-voice)

**Status:** **pre-release** — backend implemented locally; not release-approved or deployed (see repo README / `GOAL.md`).

## What it is

A public market for work the Juno community wants to fund:

`request → fund → deliver → ratify → graduate → incentivize`

Incomplete documented release gates in `GOAL.md` count as **eligible open requested work**.

## Authority split (target design)

- **Juno `x/gov`** — program funding, upgrades, outer authority
- **Program Vault** — minimal treasury shell administered by governance
- **Agent Operations DAO** — curation / stop-only; cannot pay multi-contributor bounties or resume stopped systems alone
- **Bounty contributors** — decide whether pooled bounties pay
- **Juno stakers** — direct funded Hack Juno epoch allocation (when live)

## How to use this page

- Do **not** assume a live mainnet funded UX yet
- Prefer open `GOAL.md` gates and architecture docs over inventing unpaid tasks
- Deep-link the repo; do not fork protocol specs into these docs

## Next

- [Discovery order](discovery.md)
- [Juno DEX](dex.md)
- [Agents hub](README.md)
