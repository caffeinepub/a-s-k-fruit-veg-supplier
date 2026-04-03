# A.S.K Fresh Supply – Noida Competitive Pricing Logic

## Current State
- Products are stored in a `PRODUCTS` array in `App.tsx`, each with a `retailPrice` field that is displayed directly as the price.
- Product cards show `₹{product.retailPrice}` with a "Standard Delivery Price" label.
- No discount logic, no strikethrough pricing, no special offer tags exist.
- Aloo (id: `aloo`) has retailPrice: 25.

## Requested Changes (Diff)

### Add
- A pure helper function `getDiscountedPrice(product)` that computes the discounted price:
  - Aloo (id: `aloo`): no discount, return null (no change displayed)
  - Items with retailPrice > 50: apply ₹20 discount
  - All other items (retailPrice ≤ 50, excluding Aloo): apply ₹12 discount (midpoint of ₹10–₹15 range)
  - Return `{ originalPrice, discountedPrice }` or `null` for Aloo
- A `mandi_discount_rules` constant documenting the discount rules (code comment)
- "Special Opening Offer" badge/tag shown near the discounted price on all discounted cards
- Strikethrough display of original price in muted gold on discounted items
- Discounted price shown in bold green
- The FEATURED section prices also updated with the same discount logic (visual only)

### Modify
- `ProductCard` component: update price display block to show strikethrough original + bold green discounted price + "Special Opening Offer" tag when a discount applies
- Aloo card: no strikethrough, no discount tag — keeps normal gold price display
- Cart/WhatsApp message: use discounted price for display; the cart total amount line if shown should use discounted prices

### Remove
- Nothing removed

## Implementation Plan
1. Add `getDiscountedPrice(product: Product)` helper function above the ProductCard component
2. Update `ProductCard` price display block to use the helper — show strikethrough/green/badge for discounted items, normal for Aloo
3. Update FEATURED section to also apply the same discount display for Ginger (₹86 → ₹66), keep Tomatoes/Onions unchanged display (they are below ₹50 threshold)
4. Bump Service Worker to v13 for cache refresh
