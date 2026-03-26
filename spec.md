# A.S.K Fruit & Veg Supplier

## Current State
Full mandi-style PWA with 18 vegetable products, retail/wholesale toggle, quantity selectors (0.5kg increments), basic WhatsApp order sending, leadership section, PWA install prompt, and golden eagle branding.

The existing order panel (bottom of products section) shows item count and total, with an "Order Now" WhatsApp button that sends a simple multi-line text message.

## Requested Changes (Diff)

### Add
- **Smart Cart** feature: A prominent "Smart Cart" section/drawer that shows all currently selected items as a cart list (item name, qty, rate, subtotal per item).
- **"Generate Order Summary" button**: Clicking it creates a professional invoice-style WhatsApp message and opens WhatsApp.
- **Professional invoice format for WhatsApp**: The message should look like a formal invoice with header (A.S.K Fruit & Vegetables Supplier), date, order type (Retail/Wholesale), itemized table (S.No | Item | Qty | Rate | Amount), total amount, and footer contact details.
- A **"Smart Cart" floating button / nav link** that scrolls to or opens the cart.

### Modify
- Retain all existing functionality (product cards, quantity selectors, sticky WhatsApp button, etc.).
- The existing sticky WhatsApp button can remain but also wire to the same smart-cart invoice action.
- The order summary panel at the bottom of products section should be upgraded to the Smart Cart panel.

### Remove
- Nothing to remove; all existing features remain.

## Implementation Plan
1. Add a `SmartCart` component rendered below the products grid (replacing/extending the current order summary panel).
2. The cart shows a table-style list: emoji, item name (Hindi/English), qty, rate, subtotal.
3. Add a `Generate Order Summary | ऑर्डर समरी बनाएं` button.
4. On click, build a professional WhatsApp message in invoice format:
   - Header: `━━━ A.S.K FRUIT & VEGETABLES SUPPLIER ━━━`
   - Subheader: address, date
   - Order type label
   - Divider
   - Items: `S.No. Item Qty Rate Amount` rows
   - Divider
   - Total
   - Thank you + contact footer
5. Add a nav link "Smart Cart" in the navbar pointing to `#smart-cart`.
6. No backend changes needed; all logic is frontend-only.
