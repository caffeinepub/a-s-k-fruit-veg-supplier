# A.S.K Fruit & Veg Supplier — Final VVIP Business Overhaul

## Current State
- Site has login/registration (VVIP Auth) with Internet Identity
- Prices shown are base prices; VVIP prices require login
- "LOGIN TO VIEW PARTNER PRICE" label below prices
- Navigation includes REGISTER/LOGIN button
- Footer lacks '3-Brothers Quality Guarantee'
- Nav has extra items beyond HOME, ABOUT, MANDI LIVE, CONTACT
- Products have auth-gated VVIP price feature

## Requested Changes (Diff)

### Add
- 'Standard Delivery Price' golden label under each price
- 'WHATSAPP VVIP RATE' button under every product (replaces login prompt)
- '3-Brothers Quality Guarantee' text in footer
- Public prices = Base price + ₹15 for all items

### Modify
- Remove all login/registration UI and auth gates — fully open catalog
- Nav: only HOME, ABOUT, MANDI LIVE, CONTACT (remove REGISTER/LOGIN and other items)
- Replace "LOGIN TO VIEW PARTNER PRICE" text with WHATSAPP VVIP RATE button
- WHATSAPP VVIP RATE link: https://wa.me/918700722663?text=Hi%20Sufiyan,%20I%20want%20the%20Wholesale%20VVIP%20Price%20for%20[Product_Name]%20for%20my%20Banquet
- Product_Name in link must be dynamically replaced with actual product name

### Remove
- All Login/Register buttons and flows
- VVIPAuth component usage
- Any auth-dependent logic

## Implementation Plan
1. Update all 34 inventory items: displayed price = base + 15
2. Add 'Standard Delivery Price' label under each price
3. Replace all login prompts/buttons with WHATSAPP VVIP RATE button linking to wa.me with dynamic product name
4. Remove REGISTER/LOGIN from nav; keep only HOME, ABOUT, MANDI LIVE, CONTACT
5. Add '3-Brothers Quality Guarantee' in footer
6. Remove VVIPAuth component and all auth imports/usage
7. Maintain Black Marble & Gold theme throughout
