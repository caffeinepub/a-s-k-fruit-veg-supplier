# A.S.K Fresh Supply – Admin Dashboard Password Protection

## Current State
- `AdminAnalyticsDashboard` component exists and shows visitor tracking stats
- It is accessed via `#admin-analytics` hash with NO password gate — anyone who knows the hash can access it
- No price control feature exists in the dashboard
- No admin links exist in nav or footer (already removed)

## Requested Changes (Diff)

### Add
- `AdminPanel` component: full-screen password gate that wraps the dashboard
  - Single password field (password: `[Adnan ceo`)
  - A.S.K Eagle logo on the gate screen
  - On correct password: session is stored in `sessionStorage` so it persists through the tab session
  - On wrong password: error message shown
- Price Control tab inside the admin panel (after login):
  - Lists all products with current prices
  - Owner can adjust price per item and save to `localStorage` (used by main catalog)
  - Changes reflect on the main catalog immediately
- Route: `#admin` hash triggers the admin panel (replaces old `#admin-analytics`)

### Modify
- `App.tsx`: change hash routing from `#admin-analytics` to `#admin`; wrap `AdminAnalyticsDashboard` inside the new `AdminPanel` gate
- `AdminAnalyticsDashboard`: kept as-is, rendered as a tab inside `AdminPanel`

### Remove
- Old `#admin-analytics` hash routing (replaced by `#admin`)
- No links to admin anywhere in nav, footer, or any visible UI

## Implementation Plan
1. Create `src/frontend/src/components/AdminPanel.tsx`:
   - Password gate state (`isAuthenticated` stored in `sessionStorage`)
   - If not authenticated: show login screen with Eagle logo, password input, submit button
   - If authenticated: show tabbed dashboard (Visitor Tracking tab | Price Control tab)
   - Visitor Tracking tab: renders `<AdminAnalyticsDashboard />`
   - Price Control tab: renders editable price list, saved to `localStorage` as `ask_price_overrides`
2. Update `App.tsx`:
   - Change `#admin-analytics` to `#admin` in hash routing
   - Render `<AdminPanel />` instead of `<AdminAnalyticsDashboard />` directly
3. Update `App.tsx` product price rendering to check `ask_price_overrides` from localStorage
