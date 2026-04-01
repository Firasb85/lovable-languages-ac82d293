

## Homepage Redesign Plan

### Overview
Improve the homepage with richer imagery, modern animations, and polished styling. Add new visual sections (testimonials, process/methodology, team photos) and enhance existing sections with better motion and layout.

### Changes

#### 1. Fix Build Errors First
- **TickerBanner.tsx**: Remove unused `getTranslation` import
- **ServicesPage.tsx**: Remove unused `getTranslation` import  
- **AdminLanguagesPage.tsx**: Remove unused `getTranslation` and `t` declarations
- **video.tsx**: Add `declare module` for missing types or remove the file if unused
- **qrcodedataurl.tsx**: Add `declare module 'qrcode'` to `src/global.d.ts`
- **test files**: Add vitest and jest-dom type declarations to tsconfig

#### 2. Enhanced Hero Section
- Add a subtle animated gradient background replacing the static navy grid
- Add floating geometric shapes (gold accent circles/lines) with CSS keyframe animations
- Improve hero image with a parallax-like scroll effect
- Add a staggered fade-in animation for hero text elements (heading → subheading → buttons → stats, each delayed)

#### 3. New "Why Meridian" / Social Proof Section (after TickerBanner)
- Full-width section with 3 high-quality stock images in a masonry/offset grid layout
- Images sourced from Unsplash (business/consulting themed)
- Overlaid with key metrics or client logos
- Smooth scroll-triggered fade and scale animations

#### 4. New Process / Methodology Section
- Horizontal timeline or numbered step cards (Discover → Analyze → Strategize → Execute)
- Each step with an icon and brief description
- Connected by animated lines/dots that draw on scroll
- Dark card styling consistent with existing domain cards

#### 5. Improved Industries Section
- Replace emoji icons with professional Lucide icons
- Add hover animations: card scales up slightly, border glows gold
- Add a subtle background pattern or gradient mesh

#### 6. Improved Domains Section
- Add staggered entrance animations (cards appear one by one on scroll)
- Add a subtle shine/glow effect on hover
- Improve card spacing and typography hierarchy

#### 7. New Testimonials / Results Section (before CTA)
- 2-3 testimonial cards in a carousel or grid
- Professional headshot placeholder images
- Quote marks, client name, company
- Subtle slide-in animations

#### 8. Enhanced CTA Band
- Add a background image with dark overlay instead of flat color
- Add a subtle pulsing glow effect on the CTA button
- Parallax background effect

#### 9. CSS & Animation Additions (index.css)
- Add new keyframes: `float`, `shimmer`, `draw-line`, `glow-pulse`
- Add stagger delay utility classes
- Add gradient mesh background utility

### Technical Details
- All new images will use high-quality Unsplash URLs
- Animations use CSS keyframes + IntersectionObserver (existing pattern)
- Lucide React icons replace emoji for industries
- No new dependencies needed
- Changes confined to: `HomePage.tsx`, `CTABand.tsx`, `TickerBanner.tsx`, `index.css`, and build-error files

