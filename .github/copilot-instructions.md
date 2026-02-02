# Mission International School Website - AI Coding Instructions

## Architecture Overview

This is a **static website** for Mission International School built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools are required.

### File Structure

- **HTML Pages**: `index.html`, `home.html`, `about.html`, `academics.html`, `admissions.html`, `contact.html`, `news-and-events.html`
- **CSS**: `css/` folder with modular stylesheets
- **JavaScript**: `js/` folder with page-specific and shared scripts
- **Images**: `images/` folder with AVIF and PNG formats

## Color Palette

The website uses a consistent color scheme defined in `css/home.css`:

- **Primary Orange/Gold**: `#ffb347` - Used for primary action buttons and accents
- **Secondary Beige/Peach**: `#ffdab9` - Used for secondary action buttons
- **Footer Brown**: `#7c4a03` - Footer background color (MUST be consistent across all pages)
- **Navy Blue**: `#003366` - Used for CTA "Apply Now" button in navbar
- **Text Dark**: `#222222` - Primary text color
- **Text Light**: `#555555` - Secondary text color
- **Background Cream**: `#fdfbf7` - Main page background (off-white/cream)
- **White**: `#ffffff` - Pure white for content backgrounds

## Critical CSS Architecture Pattern

**`css/home.css` is the FOUNDATION stylesheet** that ALL pages must load first. It contains:

- Global CSS variables (colors, fonts)
- Footer styling (brown `#7c4a03` background)
- Navigation bar styles
- Base layout patterns (hero sections, split sections)
- Mobile responsive breakpoints

### CSS Loading Order (NEVER change this):

```html
<link rel="stylesheet" href="css/home.css" />
<!-- ALWAYS first -->
<link rel="stylesheet" href="css/[page-name].css" />
<!-- Page-specific second -->
```

## Layout Patterns & Conventions

### Split Sections (used throughout site)

- Use `flex` values to control width ratios (e.g., `flex: 1.155` makes image section wider)
- Images extend with negative margins: `margin-left: -20%` and `width: 140%`
- Specific IDs target sections: `#academics`, `#about`, `#admissions-2`
- Remove `min-height` constraints: set `min-height: auto` to prevent grey spacing

Example from index.html:

```css
.split-section#academics .split-image-side {
  flex: 1.155; /* Extends to button edge */
  width: 100%;
  margin: 0;
  padding: 0;
}
```

### Image Sizing Strategy

- Hero images: `height: 750px`, `width: 250%` with `margin-left: -80px`
- Section images: `height: 920px`, `width: 140%` with `margin-left: -20%`
- Always set `object-fit: cover` and `object-position: left`

### Button/Action Bar Pattern

- Split into two: `.action-primary` (orange `#ffb347`) and `.action-secondary` (beige `#ffdab9`)
- Positioned at section bottoms with `position: absolute; bottom: 0; left: 0;`
- Images should extend to the **middle line** between buttons using flex ratios

## Footer Requirements

**All pages MUST have identical footer structure**:

- Background: `#7c4a03` (brown)
- Three columns: School info with social links, Quick Links, Contact
- Social icons: Facebook & Instagram as SVG logos (not text)
- Styling defined in `css/home.css` and optionally `css/contact.css`

## Responsive Design

Mobile breakpoint: `@media (max-width: 768px)` or `@media (max-width: 1024px)`

- Stack flex layouts vertically with `flex-direction: column`
- Hamburger menu appears below 768px
- Images get fixed heights (e.g., `height: 50vh`, `400px`)

## JavaScript Conventions

Main script is `js/script.js` (loaded on all pages):

- Hamburger menu toggle for mobile navigation
- FAQ accordion functionality
- Use `DOMContentLoaded` for initialization

## Development Workflow

**Running locally**:

```bash
npx live-server .
```

Or use the VS Code task: "Start Live Server"

## Deployment

The website is deployed to **Vercel**:

- **Configuration**: `vercel.json` handles routing (rewrites `/` to `/index.html`)
- **Deployment**: Push to main branch triggers automatic deployment
- **No build step required**: Static files are served directly
- The site uses vanilla HTML/CSS/JS, so no compilation or bundling is needed

## Common Pitfalls

1. **Horizontal scroll on mobile**: Always add `overflow-x: hidden` to both `html` and `body`
2. **Spacing between sections**: Set `margin: 0; padding: 0` on `.split-section`
3. **Grey gaps below images**: Remove `min-height` from containers with `min-height: auto`
4. **Footer spacing**: Ensure footer has `margin: 0; padding: 0` on the element itself
5. **CSS specificity**: Page-specific styles may need `!important` or higher specificity to override `home.css`

## Key Files to Reference

- **Layout patterns**: `index.html` (shows hero + multiple split sections)
- **Footer standard**: `contact.html` (canonical footer implementation)
- **CSS foundation**: `css/home.css` (lines 1-100 for footer, 275-320 for hero patterns)
- **Mobile nav**: `js/script.js` (hamburger menu logic)
