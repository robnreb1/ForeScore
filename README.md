# ForeScore — Social‑First Golf Platform

> *Log live rounds with your mates, trash‑talk on a feed, and grow your handicap‑lite — all before the 19th hole.*

[![](https://img.shields.io/badge/Status-Phase%201%20%F0%9F%9A%80-lightgrey)](#roadmap) [![](https://img.shields.io/badge/Tech-React%20Native%20%EF%B8%8E%20Firebase%20%EF%B8%8E%20Stream-blue)](#tech-stack)

---

## Table of Contents
1. [Executive Overview](#executive-overview)  
2. [Roadmap](#roadmap)  
3. [Phase 1 — Consumer MVP](#phase-1--consumer-mvp)  
4. [System Architecture](#system-architecture)  
5. [Data Model](#data-model)  
6. [Project Layout & Getting Started](#project-layout--getting-started)  
7. [Milestones](#milestones)  
8. [Risk Register](#risk-register)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## Executive Overview

| Objective | Build a **social‑first golf platform** that starts as a viral consumer scoring app and, in \< 24 months, evolves into a modular WHS‑compliant club‑management suite. |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Roll‑out model | **Phase 1** free consumer app → **Phase 2** WHS licensing → **Phase 3** club admin modules → **Phase 4** paid pilots & expansion |
| North‑star KPIs (Yr 2) | ≥ 10 k MAU · Week‑4 retention ≥ 25 % · ≥ 5 pilot clubs · ≥ £150 k ARR |
| Core tech stack | React Native + Expo · Firebase Auth/Firestore/Storage · Stream Chat & Activity · Cloud Functions (Node) · Stripe Connect |
| Key constraints | Solo founder → rapid dev, keep infra < £100 / mo pre‑WHS; lean on 3rd‑party SaaS for realtime, media, infra |

---

## Roadmap

| Phase | Months | Ship‑ready features | Validation metric |
|-------|--------|---------------------|-------------------|
| **1 Consumer MVP** | 0 ‑ 6 | Round scoring (15 formats) · GPS · Live leaderboard · Group chat & photo feed · Viral invite links | 2 k installs · 1 k MAU · 20 rounds / DAU |
| **2 WHS‑ready** | 6 ‑ 12 | England Golf sandbox → prod · secure score posting · handicap calc parity · digital levy passthrough | WHS approval + 5 % daily scores via app |
| **3 Club stack α** | 12 ‑ 18 | Member CRM · tee‑sheet overlay API · Stripe bar/comp payments · public GraphQL/REST API · data‑migration CLI | 3‑5 pilot clubs live |
| **4 Club stack β & scale** | 18 ‑ 30 | Native tee‑sheet · billing engine · POS links · dynamic pricing AI · admin dashboards | 50 clubs · £1 m ARR · NRR ≥ 110 % |

---

## Phase 1 — Consumer MVP

### Personas & Jobs
| Persona | Job‑to‑be‑done |
|---------|----------------|
| **Social golfer** (25‑45) | Keep live score with friends, trash‑talk, share photos, track “index‑lite”. |
| **Group organiser** | Set up a weekend society outing, track side‑bets, invite non‑app users. |

### Core User Stories
| # | As a user I can… | Acceptance criteria |
|---|------------------|---------------------|
| 1 | Start a round in \< 10 s | Course search ≤ 3 keystrokes; tee‑time defaults “now”; “Start round” CTA visible above fold. |
| 2 | Choose a scoring format | 15 templates; UI blocks illegal combos (e.g. skins + scramble). |
| 3 | Invite friends not yet on app | Share link → deep‑link / fallback web; joiner auto‑added to leaderboard. |
| 4 | See live leaderboard | ≤ 1 s latency via Stream channel; offline cache + merge. |
| 5 | Post photos & 30 s videos | Media appears in feed ≤ 5 s; 5 GB/user quota. |
| 6 | Get “index‑lite” after ≥ 5 rounds | Approx WHS formula (no slope/CR); shows confidence bar. |

### Non‑functional
* P95 score‑save latency ≤ 200 ms  
* Data budget ≤ 150 MiB/mo for a heavy user  
* Anonymous crash rate \< 2 % per session  

---

## System Architecture

```mermaid
graph TD
  RN[React Native App] -->|Auth| FirebaseAuth
  RN -->|Rounds, Users, Scores| Firestore
  RN -->|Media| FirebaseStorage
  RN -->|Realtime Feed / Chat| StreamChat
  RN -->|Cloud Functions| CF[Node Functions]
  CF --> Firestore
  CF --> StripeConnect
  Admin[Mini‑console (Web)] --> FirebaseAuth
```

*Firebase free tier → ~3 k DAU & per‑doc security rules. Stream “Maker” plan is free \< $10 k MRR.*

---

## Data Model (simplified)

| Collection | Key fields |
|------------|------------|
| **users** | `uid`, `displayName`, `photoURL`, `handicapLite`, `createdAt` |
| **courses** | `courseId`, `name`, `tees[]`, `geo`, `rating`, `slope` |
| **rounds** | `roundId`, `courseRef`, `format`, `createdBy`, `status`, `startsAt`, `players[]` |
| **scores** *(sub‑col)* | `hole`, `strokes`, `points`, `par`, `timestamp`, `playerUid` |
| **media** | `roundId`, `uploaderUid`, `url`, `type`, `createdAt` |

---

## Project Layout & Getting Started

```
foreScore/
├─ mobile/            # React Native + Expo app
│  ├─ App.tsx
│  └─ ...screens
├─ cloud/             # Firebase Functions & rules
│  ├─ functions/src/
│  └─ firestore.rules
├─ tools/             # CLIs & migration scripts
└─ README.md          # You are here
```

### Prerequisites
* **Node ≥ 18**, **npm** or **yarn**
* **Expo CLI** `npm i -g expo-cli`
* **Firebase CLI** `npm i -g firebase-tools`

### Quick start

```bash
git clone https://github.com/<you>/ForeScore.git
cd ForeScore
# Mobile
cd mobile && yarn && expo start
# Cloud
cd ../cloud && yarn && firebase emulators:start
```

---

## Milestones

| Month | Deliverable | Effort* |
|-------|-------------|---------|
| 1 | Course DB loader + search | 4 dev‑days |
| 2 | 15‑format scoring engine | 12 |
| 3 | Live feed & chat | 6 |
| 4 | Media uploads + compression | 4 |
| 5 | Viral invites (dynamic links) | 3 |
| 6 | Alpha launch & telemetry | 5 |

\* Add 20 % buffer for BAU & bug‑fix.

---

## Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Solo‑founder bandwidth | **High** | Line up part‑time RN + backend contractors by Month 4. |
| WHS audit delays | Med | Keep consumer growth independent; ads monetisation fallback. |
| Data‑protection breach | **High** | Early DPO appointment; CIS Benchmarks; encrypt at rest & transit. |
| Incumbent feature copy | Med | Double‑down on social graph & UX; file trademarks. |

---

## Contributing

Pull requests welcome! See [`CONTRIBUTING.md`](CONTRIBUTING.md) for linting & commit‑msg guidelines.

---

## License

[MIT](LICENSE)

