# A.S.K Fresh Supply – The Exotic Collection Section

## Current State
The homepage has several sections: Hero, The A.S.K Edge, The MD Standard, Sectors We Serve, Quality Policy, and Our Leadership/Team A.S.K. The site uses a Dark Navy Blue (#002366) and Gold (#D4AF37) corporate theme.

## Requested Changes (Diff)

### Add
- New section titled **'The Exotic Collection'** inserted between the Quality Policy section and the Leadership/Team A.S.K section.
- A 5-item responsive image grid showcasing: Broccoli, Red/Yellow Bell Peppers, Asparagus, Avocado, Dragon Fruit.
- Each card has: a high-quality photorealistic image, the produce name, and a golden badge label reading **'Hand-Picked & Triple-Graded'**.
- Premium, clean design matching navy/gold theme with golden glow image treatment.

### Modify
- None.

### Remove
- None.

## Implementation Plan
1. Insert `ExoticCollection` section JSX between the Quality Policy `</section>` and the Leadership `<section id="about">` in App.tsx.
2. Use generated images from `/assets/generated/` for each card:
   - Broccoli: `exotic-broccoli.dim_600x600.jpg`
   - Bell Peppers: `exotic-bell-peppers.dim_600x600.jpg`
   - Asparagus: `exotic-asparagus.dim_600x600.jpg`
   - Avocado: `exotic-avocado.dim_600x600.jpg`
   - Dragon Fruit: `exotic-dragon-fruit.dim_600x600.jpg`
3. Grid layout: `grid-cols-2` on mobile, `grid-cols-3` on md, `grid-cols-5` on xl — centered, with the 5th card centered in the last row on smaller breakpoints.
4. Each card: rounded corners, dark navy background, golden border, image with golden glow, produce name in gold bold text, and a golden badge/pill below with 'Hand-Picked & Triple-Graded'.
5. Section header: 'The Exotic Collection' in Montserrat Bold uppercase gold with a decorative golden divider and a subtitle like 'Sourced from the World's Finest Farms'.
6. Add entrance animation (framer-motion whileInView) consistent with existing sections.
