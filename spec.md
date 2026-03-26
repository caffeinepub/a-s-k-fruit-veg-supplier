# A.S.K Fruit & Veg Supplier

## Current State
Version 13 live. All product cards and buttons link to MyBillBook store (https://mybillbook.in/store/a_s_k_company). Top banner promotes the digital store. Smart Cart was previously removed. Leadership section and Golden Eagle logo are present.

## Requested Changes (Diff)

### Add
- Smart Cart system: each product card gets an 'Add to Cart' / quantity input
- Floating 'View My Order' sticky button
- Customer name input field
- 'Send Order to WhatsApp' button that composes a message in format:
  New Order for A.S.K:
  - Item Name: [Quantity]
  -----------------------
  Customer Name: [Name]
- WhatsApp number: +91 8700722663

### Modify
- Remove MyBillBook store banner at top
- Remove all MyBillBook store links from product cards and nav/hero buttons
- Replace 'Order Now' buttons with 'Add to Cart' that adds item to cart
- Product cards show quantity selector and Add to Cart

### Remove
- MyBillBook store banner
- All href links to mybillbook.in/store/a_s_k_company

## Implementation Plan
1. Remove MyBillBook banner and all store links
2. Restore Smart Cart state: cartItems map (itemName -> {qty, unit})
3. Each product card: quantity number input + Kg/Bag toggle + Add to Cart button
4. Floating 'View My Order' button (sticky bottom-right) showing item count
5. Order modal/drawer: list of items, customer name input, Send to WhatsApp button
6. WhatsApp message format as specified
7. Keep Leadership section, Golden Eagle logo, all PWA features unchanged
