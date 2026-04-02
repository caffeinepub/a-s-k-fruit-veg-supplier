# A.S.K Fruit & Veg Supplier

## Current State
The site is a fully built Open Catalog with sections: Hero, A.S.K Edge, MD Standard, Sectors We Serve, Quality Policy, Exotic Collection, Our Corporate Infrastructure, Our Elite Clients, Client Spotlight, VIP Rate Card, Team A.S.K / Leadership, Contact, and Footer. All panels removed; pure public catalog.

## Requested Changes (Diff)

### Add
- New section: **"A.S.K Equity Partnership – Growing Together"** placed just before the Footer (after the Contact section)
  - Gold-and-Black theme (black background #0a0a0a or #111, gold accents #D4AF37) to give 'Corporate Leadership' feel — distinct from the navy blue used elsewhere
  - Handshake or Growth Graph icon at the top of the section (SVG or emoji icon, styled in gold)
  - A prominent premium-styled box (gold border, subtle gold gradient background) containing the full Hindi/English mix text:
    - Bold heading: "A.S.K Equity Partnership – Hamara Saajha Bhavishya"
    - Body text: Full paragraph as provided by user (Hindi/Roman-Hindi)
  - Legal Commitment Clause line below the box: "We are fully committed to this vision and are ready to sign a Legal Agreement with our founding partners to ensure transparency and trust."
  - CTA button: "Contact MD Sufiyan to Join the Vision" → links to WhatsApp wa.me/918700722663 with pre-filled message
  - Mobile-friendly: font sizes readable on small screens, generous padding, no overflow

### Modify
- Nothing else changes

### Remove
- Nothing removed

## Implementation Plan
1. Insert a new `<section>` component block in App.tsx between the Contact section closing tag and the Footer.
2. Section uses black/deep-charcoal background (#0d0d0d) with gold (#D4AF37) borders and accents.
3. Section heading: "A.S.K Equity Partnership – Growing Together" in gold, with a handshake SVG icon.
4. Premium box: gold border (1–2px solid gold), subtle dark gold tint background, rounded corners, padding.
5. Inside box: bold Hindi heading, full body text in readable font (Open Sans or system), slightly larger line-height for Hindi readability.
6. Below box: legal clause line in smaller italic gold text.
7. CTA button styled in gold background, black text, linking to WhatsApp Sufiyan with pre-filled message about Partnership Vision.
8. Full mobile responsiveness with proper font sizing (min 16px body).
