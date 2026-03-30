# A.S.K Fresh Supply Ecosystem — Final Deployment

## Current State
- AdminPanel.tsx: Password-protected dashboard for Adnan & Shad. Manages orders with 4 status actions (Confirm, Sourcing, Dispatch, Delivered). Polls at 5s intervals.
- TrackingPage.tsx: Client-facing live tracking page. Polls at 3s intervals. Shows timeline steps with vehicle info.
- App.tsx: Main catalog, WhatsApp ordering, leadership section, footer with contact info.
- No MD Strategic Dashboard exists for Sufiyan.
- Contact info is scattered; not hardcoded as a central contact block.
- No truck animation on the tracking page when status is "Out for Delivery".

## Requested Changes (Diff)

### Add
- **MDDashboard.tsx**: New MD Strategic Dashboard for Sufiyan A.S.K with:
  - Secure password-protected login (password: `SUFIYAN@786`)
  - Strategic overview: total active orders, delivered today, order status distribution
  - Read-only list of all active orders with client names and statuses
  - Hardcoded contact block for CEO (Adnan) direct call and Finance (Shad) phone
  - Route accessible via `#md-dashboard` hash in App.tsx
- **Live Truck Animation**: On TrackingPage, when status is "Out for Delivery", show an animated truck SVG with horizontal sliding motion (CSS keyframe), pulsing golden trail, and a banner "Your order is on the way!"
- **Contacts Block**: Hardcoded contact cards in the Admin and MD panels:
  - MD (Sufiyan): Strategy & Support → WhatsApp link `wa.me/918700722663`
  - CEO (Adnan): 8527865856 → `tel:918527865856` direct call
  - Finance (Shad): 9318404289 → displayed as System Registry

### Modify
- **TrackingPage.tsx**: Change poll interval from 3000ms to 500ms for near-instant status updates (0.5s latency target)
- **AdminPanel.tsx**: Add a pinned contacts section at the bottom showing the 3 key contacts; update poll interval from 5s to 2s for tighter sync
- **App.tsx**: Add nav/footer link to MD Dashboard (`#md-dashboard`); add contact cards to footer with direct-call and WhatsApp links for all 3 executives
- **sw.js**: Bump Service Worker to v9 for cache refresh

### Remove
- Nothing removed; all existing features preserved

## Implementation Plan
1. Create `src/frontend/src/components/MDDashboard.tsx` with secure login, strategic stats, order list, and contacts
2. Update `src/frontend/src/components/TrackingPage.tsx`: poll interval 500ms, add truck animation component for "Out for Delivery" status
3. Update `src/frontend/src/components/AdminPanel.tsx`: poll interval 2s, add contacts footer section
4. Update `src/frontend/src/App.tsx`: add MD Dashboard hash route render, update footer contacts with direct-call links
5. Bump `src/frontend/public/sw.js` to v9
