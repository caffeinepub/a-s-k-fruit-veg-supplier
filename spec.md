# A.S.K Fruit & Veg Supplier

## Current State
App.tsx imports and renders three private panel components:
- `AdminPanel` (CEO/Finance login + order management)
- `MDDashboard` (MD Strategic login + stats)
- `TrackingPage` (client order tracking — depends on admin panels for data)
- `VVIPAuth` component also exists

Footer contains two low-opacity links: `Admin Panel` (#admin) and `MD Dashboard` (#md-dashboard).
Nav contains a 📦 TRACK ORDER button linking to #track.

Service Worker is at v9.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `App.tsx`: Remove imports of AdminPanel, MDDashboard, TrackingPage, VVIPAuth. Remove their JSX usage. Remove footer admin/MD links. Remove TRACK ORDER nav link if present. Bump SW version.
- `public/sw.js` (or equivalent): Bump cache version to v10 to force all users to get clean reload.

### Remove
- `src/frontend/src/components/AdminPanel.tsx` — delete entirely
- `src/frontend/src/components/MDDashboard.tsx` — delete entirely
- `src/frontend/src/components/TrackingPage.tsx` — delete entirely
- `src/frontend/src/components/VVIPAuth.tsx` — delete entirely

## Implementation Plan
1. Read App.tsx fully to find all panel references and TRACK ORDER nav link
2. Edit App.tsx: remove 3 imports, remove 3 JSX blocks (TrackingPage, AdminPanel, MDDashboard), remove footer admin links div
3. Delete the 4 component files
4. Find and update service worker file — bump version to v10
5. Validate (lint + build)
