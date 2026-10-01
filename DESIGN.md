---
name: Bet367 Royale
description: Luxury Vietnamese Casino & Gaming Simulation Design System
colors:
  imperial-gold: "#d4af37"
  radiant-aureolin: "#ffd700"
  champagne-sheen: "#fef08a"
  burnished-bronze: "#aa820a"
  emerald-fortune: "#10b981"
  ruby-danger: "#ef4444"
  obsidian-void: "#08090c"
  night-surface: "#0f1118"
  elevated-slate: "#151824"
  glass-card: "rgba(20, 24, 36, 0.94)"
  text-pure: "#ffffff"
  text-silver: "#e2e8f0"
  text-muted: "#94a3b8"
typography:
  display:
    fontFamily: "Cinzel, 'Playfair Display', Georgia, serif"
    fontSize: "3.2rem"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.5px"
  headline:
    fontFamily: "Cinzel, 'Playfair Display', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.25
  title:
    fontFamily: "Montserrat, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Montserrat, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Montserrat, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "1px"
rounded:
  sm: "4px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.radiant-aureolin}"
    textColor: "{colors.obsidian-void}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.champagne-sheen}"
    textColor: "{colors.obsidian-void}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.text-pure}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-outline-hover:
    backgroundColor: "rgba(212, 175, 55, 0.1)"
    textColor: "{colors.radiant-aureolin}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-deposit:
    backgroundColor: "{colors.elevated-slate}"
    textColor: "{colors.text-pure}"
    rounded: "{rounded.lg}"
    padding: "8px 18px"
  card-royal:
    backgroundColor: "{colors.glass-card}"
    textColor: "{colors.text-pure}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
  chip-pill:
    backgroundColor: "rgba(212, 175, 55, 0.1)"
    textColor: "{colors.radiant-aureolin}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
---

# Design System: Bet367 Royale

## Overview

**Creative North Star: "The High-Roller Crown Club"**

Bet367 Royale is a luxury gaming design system designed to evoke the opulence, prestige, and high-stakes grandeur of private VIP gaming salons in Macau and Monaco, curated specifically for Vietnamese high-rollers. The visual atmosphere is anchored in deep obsidian blacks (`#08090c`) with multi-layered gold gradients, delicate hairline gold borders, and ambient golden backglows. The emotional register is uncompromisingly aristocratic, seductive, and authoritative.

Rather than relying on sterile corporate fintech minimalism or cheap, garish casino neon popups, Bet367 Royale treats betting rituals—such as peeking under the dice bowl ("nặn bát") or tracking lottery boards—as ceremonial experiences. Surfaces utilize dense obsidian layering with radial golden light leaks, giving the interface three-dimensional depth, physical presence, and instant feedback.

**Key Characteristics:**
- **Imperial Contrast**: Deep velvet black canvas contrasted with warm, shimmering metallic golds.
- **Sovereign Typographic Hierarchy**: Classical serif headlines (`Playfair Display`) reserved for prestige moments and jackpots; robust geometric sans-serif (`Montserrat`) powering high-speed data, odds, and countdown timers.
- **Tactile High-Feedback Affordances**: Responsive click depths, golden bloom state transitions, and celebratory particle showers.
- **Dignified Restraint**: No flashing rainbow carnival banners; neon clutter is prohibited in favor of refined gold, emerald, and ruby accents.

## Colors

The palette balances absolute obsidian depth with tiered metallic golds and functional indicators.

### Primary
- **Imperial Gold** (`#d4af37`): The foundational brand gold. Used for key active borders, navigation accents, VIP crest badges, and primary iconography.
- **Radiant Aureolin** (`#ffd700`): The high-energy highlight gold. Used on primary action buttons, hover states, countdown warning timers, and jackpot counters.
- **Champagne Sheen** (`#fef08a`): The specular highlight gold in gradients (`--gold-gradient`), providing metallic gleam and light source reflections.
- **Burnished Bronze** (`#aa820a`): The deep gold anchor in linear gradients and shadows to prevent yellow washouts.

### Secondary
- **Emerald Fortune** (`#10b981`): The prosperity and winning indicator. Used for payout notifications, positive balance additions, win tags, and Lô Đề badges.
- **Ruby Danger** (`#ef4444`): The alert and high-tension indicator. Used for countdown urgency (<5s remaining), bet loss indications, and destructive actions.

### Neutral
- **Obsidian Void** (`#08090c`): The global backdrop. A profound, light-absorbing black that provides maximum contrast for golden elements.
- **Night Surface** (`#0f1118`): The secondary background layer used for drawers, tables, and underlays.
- **Elevated Slate** (`#151824`): The tertiary container layer for interactive panels, bet entry docks, and chip trays.
- **Glass Card** (`rgba(20, 24, 36, 0.94)`): Semi-translucent frosted glass backing for modal dialogs and game hero cards.
- **Text Pure** (`#ffffff`): The primary heading and critical data reading color.
- **Text Silver** (`#e2e8f0`): The secondary body text color for high legibility without piercing brightness.
- **Text Muted** (`#94a3b8`): The tertiary label and timestamp color.

### Named Rules
**The 10% Gold Rule.** Gold is a precious metal, not wall paint. Gold accents must occupy no more than 10-15% of any viewport's surface area. Its rarity creates prestige; overusing gold cheapens the aesthetic to tacky brass.

**The Functional Emerald Rule.** Green is strictly reserved for financial prosperity, winning outcomes, and live status indicators. It is never used as general decorative trim.

## Typography

**Display Font:** Cinzel, 'Playfair Display' (with Georgia, 'Times New Roman', serif fallback)  
**Body Font:** Montserrat (with -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif fallback)  
**Label/Mono Font:** Montserrat (font-weight: 800, uppercase, letter-spacing: 1px)

**Character:** Sovereign Contrast. Cinzel and Playfair Display deliver old-world aristocrat luxury and monumental presence, while Montserrat provides hyper-legible, crisp clarity for complex Vietnamese betting terms, odds ratios, and rapid currency calculations.

### Hierarchy
- **Display** (`font-weight: 900`, `3.2rem` / `51px`, `line-height: 1.15`, `letter-spacing: -0.5px`): Mega hero headlines, jackpot totals, and victory announcements.
- **Headline** (`font-weight: 800`, `2.0rem` / `32px`, `line-height: 1.25`): Game lobby section titles, modal headers, and tier awards.
- **Title** (`font-weight: 700`, `1.25rem` / `20px`, `line-height: 1.4`): Game card titles, bet gate names ("Tài", "Xỉu"), and user balances.
- **Body** (`font-weight: 400/500`, `0.95rem` / `15.2px`, `line-height: 1.6`): Narrative instructions, promotional descriptions, and transaction logs.
- **Label** (`font-weight: 800`, `0.75rem` / `12px`, `letter-spacing: 1px`, `text-transform: uppercase`): Pill tags, category headers, live odds chips, and table headers.

### Named Rules
**The Sovereign Contrast Rule.** Never use Playfair Display for numbers in rapid betting tables, dice scores, or small form inputs. Playfair belongs solely to ceremonial announcements; Montserrat handles operational data.

**The Pure Vietnamese Diacritic Rule.** Font stacks must explicitly support Vietnamese Unicode ranges (`Montserrat` and `Playfair Display` loaded via Google Fonts with `vietnamese` subset). Fallback fonts must never break diacritics into disparate glyphs.

## Layout

**Container Grid & Max Width:**
- Core container has a maximum width of `1280px` (`max-width: 1280px`) with fluid inline padding (`0 24px`).
- Mobile breakpoints shift padding to `0 12px` below `768px`.

**Breakpoints:**
- Desktop Wide: `≥ 1280px` (Full 2-column or 3-column gaming grids, expanded ticker bar).
- Tablet / Desktop Compact: `1024px` (Collapses secondary promo rails, tightens chip trays).
- Mobile Landscape & Phablet: `768px` (Nav menu converts into the royal off-canvas sliding drawer; betting gates stack vertically).
- Mobile Portrait: `< 480px` (Full-bleed betting controls, single-column game lobbies).

**Spatial Rhythm:**
- Layout operates on a strict `8px` spatial grid (`8px`, `16px`, `24px`, `32px`, `48px`).
- Card gaps and inner padding adhere to `16px` (compact) or `24px` (generous).

## Elevation & Depth

Bet367 Royale avoids flat flatness in favor of **Layered Luxury & Ambient Gold Bloom**. Depths are constructed via three distinct tiers:

1. **Canvas Foundation**: The body utilizes fixed radial gradients (`radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.14) 0%, transparent 60%)`) to create an overhead golden spotlight effect over the obsidian void.
2. **Elevated Panels**: Frosted obsidian glass (`rgba(20, 24, 36, 0.94)`) with backdrop blur (`backdrop-filter: blur(12px)`) and hairline gold borders (`1px solid rgba(212, 175, 55, 0.28)`).
3. **Floating Controls & Modals**: Raised off the surface with deep ambient shadows and luminous edge glows.

### Shadow Vocabulary
- **Ambient Gold Bloom** (`box-shadow: 0 0 20px rgba(212, 175, 55, 0.4)`): Applied to active chips, highlighted buttons, and winning bet gates.
- **Deep Velvet Drop** (`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7)`): Structural depth on floating modals, sticky navigation bars, and large jackpot containers.
- **Inset Bevel Sheen** (`box-shadow: inset 0 1px 1px rgba(255, 215, 0, 0.3)`): Applied to metallic buttons and chip rims to simulate physical coin beveling.
- **Drawer Occlusion** (`box-shadow: 15px 0 40px rgba(0, 0, 0, 0.85)`): Depth casting for the left-hand navigation slide-out drawer.

### Named Rules
**The Ambient Bloom Rule.** Hover and active states do not merely change background color; they emit an ambient gold or emerald bloom (`box-shadow: 0 0 15px rgba(...)`) simulating illuminated physical gaming tables.

## Shapes

- **Micro Shapes (`4px` radius)**: Status tags, small indicator pills, and table score badges.
- **Standard Controls (`8px` radius)**: Standard buttons (`.btn`), navigation links, and input fields.
- **Elevated Controls (`10px` radius)**: Primary CTA buttons (`.btn-royal-deposit`, `.btn-mega-gold`), and quick-chip tokens.
- **Containers & Modals (`14px` radius)**: Game cards, jackpot boxes, dialog modals, and bet slip panels.
- **Pills & Chips (`9999px` / `50%` radius)**: Betting chips, VIP crown avatars, and floating status tags.
- **Border Architecture**: Every container features a subtle `1px` or `1.5px` border in `rgba(212, 175, 55, 0.28)` to establish clear architectural containment without harsh grid lines.

## Components

### Buttons
- **Primary Gold Button (`.btn-royal-gold`, `.btn-mega-gold`)**:
  - **Shape**: `8px` or `10px` radius.
  - **Background**: Three-stop gold gradient (`linear-gradient(135deg, #fef08a 0%, #ffd700 45%, #b45309 100%)`).
  - **Text**: Obsidian black (`#0b0c10`), font-weight: 800.
  - **Hover/State**: Lifts `translateY(-2px)`, shadow increases to `0 6px 22px rgba(212, 175, 55, 0.6)`.
- **Royal Outline Button (`.btn-royal-outline`)**:
  - **Shape**: `8px` radius.
  - **Background**: Translucent white (`rgba(255, 255, 255, 0.04)`), border `1px solid rgba(255, 255, 255, 0.08)`.
  - **Hover/State**: Border illuminates to Imperial Gold (`#d4af37`), text shifts to Radiant Aureolin (`#ffd700`).
- **VIP Deposit Button (`.btn-royal-deposit`)**:
  - **Shape**: `10px` radius.
  - **Background**: Dark dual-gradient with gold border and embedded metallic coin crest icon.

### Chips & Badges
- **Betting Chips (`.tx-chip`)**: Circular (`46px x 46px`), metallic ring borders, embossed denomination values (`10K`, `50K`, `100K`, `500K`, `1M`, `5M`, `10M`, `50M`). Active chip emits a pulsing golden glow.
- **VIP Status Tag (`.royal-tag`, `.hot-pill`)**: Fully rounded pill shape with gold border, semi-translucent backdrop, and micro uppercase text.

### Cards & Game Modules
- **Game Showcase Card**: Dark glass background (`rgba(20, 24, 36, 0.94)`), `14px` rounded corners, thin gold border (`rgba(212, 175, 55, 0.28)`), and image banner with hover zoom (`transform: scale(1.04)`).
- **Jackpot Ticker Box**: Metallic border framing with embedded animated gold numbers and radial light beam.

### Inputs & Betting Controls
- **Bet Amount Input**: Deep obsidian background, gold active focus ring (`0 0 12px rgba(212, 175, 55, 0.4)`), right-aligned currency display, and quick multiplier buttons (`x2`, `/2`, `Tất tay / All-in`).

### Navigation
- **Top Ticker Bar**: Pinned black banner with live scrolling VIP ticker text, clock (`GMT+7`), and hotline support indicator.
- **Royal Header**: Sticky obsidian glass bar featuring the 3-bar hamburger icon, gold "367" crown crest, lobby tab items, and direct balance/deposit widgets.
- **Sliding Royal Drawer**: Left-anchored off-canvas drawer with categorized gaming portals, quick user info, and VIP tier progression bar.

### Signature Component: Tài Xỉu MD5 Shaking Bowl ("Bát Nặn MD5")
- **Visual Design**: Circular red and gold lacquered bowl resting on a golden ornamental plate.
- **Interactive Ritual**: Supports automatic countdown shake as well as manual tactile bowl dragging/revealing ("Nặn Bát") with real-time dice score exposure, MD5 verification hash strings, and historical bead road ("Soi cầu").

## Do's and Don'ts

### Do:
- **Do** maintain deep obsidian black (`#08090c`) as the dominant background tone across all game lobbies.
- **Do** reserve Playfair Display exclusively for grand headlines, hero banners, and jackpot win announcements.
- **Do** provide instant visual and acoustic feedback (using the Web Audio API chimes) for every bet placement and victory.
- **Do** use exact currency formatting in Vietnamese Dong (`10.000.000 ₫`) with proper thousands separators.
- **Do** maintain smooth, high-performance CSS transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) for all hover and modal states.

### Don't:
- **Don't** use flashing neon rainbow borders, animated confetti GIFs, or tacky carnival-style popups.
- **Don't** use Playfair Display for small tabular data, dice points, odds ratios, or form inputs.
- **Don't** allow gold accent elements to exceed 15% of the total screen density.
- **Don't** use generic flat gray backgrounds; depth must always be conveyed through subtle obsidian gradients and gold light blooms.
- **Don't** invent external JavaScript library dependencies; keep all interactivity native, responsive, and lightweight.
