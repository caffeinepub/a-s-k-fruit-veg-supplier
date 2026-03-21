# A.S.K Fruit & Veg Supplier

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Hero section with business name 'A.S.K Fruit and Vegetable Supplier', green/orange color scheme, tagline
- Product inventory section with 6 items: Aloo ₹15/kg, Onion ₹26/kg, Tomato ₹28/kg, Carrot ₹28/kg, Ginger ₹80/kg, Lemon ₹80/kg
- Each product card includes a quantity selector (kg increment/decrement)
- WhatsApp order button: compiles selected items + quantities into a message and opens https://wa.me/918700722663
- Sticky floating WhatsApp order button always visible
- About Us section: highlights freshness, quality, reliable delivery
- Contact/footer section with WhatsApp number 8700722663
- Fruit/vegetable themed icons or illustrations
- Clean modern green color palette

### Modify
- None

### Remove
- None

## Implementation Plan
1. Minimal Motoko backend (no backend state needed for this app)
2. Frontend React app with:
   - Hero section
   - Products section with quantity state management
   - WhatsApp message builder function
   - Sticky WhatsApp CTA button
   - About Us section
   - Footer with contact info
