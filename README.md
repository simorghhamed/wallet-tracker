<div align="center">

# Wallet Tracker

**Track any crypto wallet across chains, get notified when it moves, and keep your favorites in one watch list.**

React 19 · Redux Toolkit · Firebase Cloud Messaging · Vite · Tailwind CSS v4

</div>

---

## Overview

Wallet Tracker is a web app for following on-chain wallet activity without owning or connecting the wallet yourself. You search any address, add it to a watch list, and the app keeps an eye on it — balances, assets, and transaction history — with push notifications when something changes.

It supports both signed-in users and guests: anyone can track a limited number of wallets without an account, while signing in (email or Google) unlocks favorites, priority ordering, and full search history. All data flows through a versioned backend (`/api/tracker/v1/...`) rather than the client talking to chain explorers directly, so wallet discovery, tracking limits, and notification registration are all server-owned concerns.

## Key Features

- **Multi-chain wallet search** — look up any address on Ethereum, BSC, or PulseChain and pull up its assets and activity.
- **Track without an account** — guests can track a limited number of wallets (`tracking-limits` endpoint) before being asked to sign in for more.
- **Auth** — email/password registration with a confirmation step, login, and Google OAuth sign-in.
- **Watch list & favorites** — track wallets to a personal watch list, star favorites, and reorder both lists by drag-and-drop (priority persisted per wallet).
- **Wallet details page** — per-wallet view combining wallet info, an assets table, and transaction history, addressed by `/wallet/:network/:address`.
- **Search history** — every wallet lookup is logged per user and can be revisited or cleared.
- **Push notifications** — Firebase Cloud Messaging with a dedicated service worker (`firebase-messaging-sw.js`) registers a device token so users get notified about tracked-wallet activity even when the tab isn't open.
- **Guest → account upgrade path** — temporary tracking endpoints (`temp/track`, `temp/tracked`, `temp/untrack`) exist alongside authenticated ones, so wallets tracked as a guest carry over after signing in.
- **Top Wallets (in progress)** — a "top wallets per chain" leaderboard is scaffolded with a draggable sortable list, planned as a discovery feature for high-value wallets ("whales").

## Tech Stack

| Layer | Choices |
|---|---|
| Framework | React 19, Vite 6 |
| State / Data | Redux Toolkit, RTK Query, Axios (secondary HTTP client) |
| Auth | Cookie-based session token (`js-cookie`), `@react-oauth/google` |
| Notifications | Firebase Cloud Messaging (`firebase/messaging`), custom service worker |
| Drag & drop | `@dnd-kit` (core/sortable/modifiers), `react-dnd` |
| Styling / UI | Tailwind CSS v4, Headless UI, Framer Motion, custom "ReactBits" components (GradientText, SpotlightCard, TrueFocus, Particles) |
| UX niceties | react-hot-toast, react-toastify, SweetAlert2, react-loading-skeleton |
| Tooling | ESLint 9, Vite |

## Architecture

```
┌───────────────────┐      ┌───────────────────────────┐      ┌────────────────────┐
│   Browser / PWA    │      │   Application layer         │      │   Backend           │
│  Service worker for │◄────►│  React pages + components   │◄────►│  /api/tracker/v1     │
│  FCM push           │      │  Redux Toolkit slices        │      │  (auth, wallets,     │
└───────────────────┘      │  RTK Query API slices         │      │   favorites, search,  │
                             └───────────────────────────┘      │   notifications)      │
                                                                  └────────────────────┘
```

- **UI layer** (`src/components`, `src/pages`) — route-level pages (Home, WatchList, Favorite, WalletDetails, TopWallets, SearchHistory) built from smaller wallet-item and modal components.
- **State layer** (`src/features/*`) — one slice/API-slice pair per domain: `auth`, `wallets` (track/untrack/rename/priority), `favorites`, `network`, `notification`.
- **Route guards** (`src/router`) — `ProtectedRoute` gates account-only pages (favorites, history) behind login; `RestrictedRoute` gates wallet tracking behind the guest tracking-limit check.
- **Notifications** (`src/Utils/firebase.js`, `src/hooks/usePushNotification.jsx`) — registers a service worker, requests an FCM token, and syncs it to the backend so tracked-wallet alerts can be pushed to the device.
- **API contract** (`src/services/endpoints.js`) — a typed map of every `/api/tracker/v1/...` route the client depends on.

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of (or access to) the `/api/tracker/v1` backend
- A Firebase project configured for Cloud Messaging (for push notifications)

### Install

```bash
git clone https://github.com/simorghhamed/wallet-tracker.git
cd wallet-tracker
npm install
```

### Environment variables

The app reads Firebase and API configuration from environment variables:

```bash
VITE_APP_API_KEY=              # Firebase Web API key
VITE_APP_AUTH_DOMAIN=          # Firebase auth domain
VITE_APP_PROJECT_ID=           # Firebase project ID
VITE_APP_STORAGE_BUCKET=       # Firebase storage bucket
VITE_APP_MESSAGING_SENDER_ID=  # Firebase messaging sender ID
VITE_APP_APP_ID=               # Firebase app ID
VITE_APP_VAPID_KEY=            # Firebase Cloud Messaging VAPID key
VITE_APP_ENV=                  # App environment (e.g. development / production)
VITE_BASE_URL=                 # Base URL of the tracker backend API
```

> ⚠️ **Heads up:** a `.env` file with real values is currently committed to this repo. Firebase web config isn't a secret on its own (it ships in the client bundle either way), but committed env files are still worth rotating out of git history and replacing with a `.env.example` — see [Known Issues](#known-issues--roadmap).

### Run

```bash
npm run dev        # start the dev server
npm run build       # build for production
npm run preview     # preview the production build
npm run lint        # run ESLint
```

## Project Structure

```
src/
├─ app/                 # Redux store, typed hooks
├─ components/          # Wallet item parts, modals, header, sortable list, loaders
├─ features/             # RTK slices + API slices: auth, wallets, favorites, network, notification
├─ hooks/                # Push notification hooks (FCM token, permission, popup, toast)
├─ pages/                # Home, WatchList, Favorite, WalletDetails, TopWallets, SearchHistory, Auth-gated pages
├─ router/               # AppRouter, ProtectedRoute, RestrictedRoute
├─ services/             # API endpoint map, axios instance
├─ Utils/                # Firebase setup, color tokens, helper functions
└─ assets/               # Static data (networks, mock wallets/transactions), icons
```

## Supported Networks

| Network | Status |
|---|---|
| Ethereum | ✅ Active |
| BNB Chain (BSC) | ✅ Active |
| PulseChain | ✅ Active |
| Bitcoin, Optimism, 1inch, TUSD | Icons present in assets; not yet wired into the active network list |

## Localization

The interface uses the bundled IRANYekan typeface throughout, positioning the app for Persian-speaking users alongside English content.

## Known Issues / Roadmap

Tracked in [`src/todo`](./src/todo) and observed in the codebase:

- The "change wallet name" flow needs the raw user ID hidden from the UI, and a token-related bug fixed.
- Untracking a wallet from the wallet-details page (instead of the watch list) doesn't currently refresh tracked state correctly.
- `.env` should be removed from version control and replaced with a `.env.example` template.
- The Top Wallets ("whale") leaderboard is currently a sortable-list scaffold with mock data, not yet wired to real chain data.
- A few components exist in duplicated "copy" form (e.g. `usePushNotification copy.jsx`, `FavoriteContent copy.jsx`) that look like in-progress iterations left in the tree — worth cleaning up before this is public-facing.

## Contributing

This is currently a solo project under active development. Issues and suggestions are welcome via GitHub Issues.

## License

No license has been specified yet for this repository.
