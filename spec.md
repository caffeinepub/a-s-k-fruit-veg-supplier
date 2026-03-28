# A.S.K Fruit & Veg Supplier

## Current State
The site has the Midnight Royalty theme (black/gold), Smart Cart, WhatsApp ordering, full inventory, Leadership section, and a REGISTER/LOGIN button in the navigation that currently does nothing.

The backend is a minimal Motoko actor with only a `greet` function. No authentication or user management exists yet.

## Requested Changes (Diff)

### Add
- VVIP Partner Register/Login flow using Internet Identity (authorization component)
- A modal or dedicated page triggered by the REGISTER/LOGIN nav button
- After login, show a VVIP Partner dashboard/welcome area with:
  - Partner name/identity greeting
  - Access to partner-only pricing ("Partner Price" revealed for products)
  - Logout button
- Backend: register a logged-in user as a VVIP Partner, store their principal, track registration timestamp

### Modify
- REGISTER/LOGIN button in nav now triggers the Internet Identity login flow
- After successful login + registration as VVIP Partner, update the product cards to reveal the partner price (can be a fixed discount, e.g. 15% off retail, or just show a "VVIP Partner" badge on cards)

### Remove
- Nothing removed

## Implementation Plan
1. Add authorization component (Internet Identity)
2. Generate backend with `registerVVIPPartner`, `getVVIPPartnerStatus`, `getAllVVIPPartners` (admin) functions
3. Frontend: wire REGISTER/LOGIN button to Internet Identity login
4. After login, show registration dialog if not yet registered as VVIP Partner
5. Once registered, show VVIP badge and unlock partner pricing on product cards
6. Add logout button to nav when logged in
