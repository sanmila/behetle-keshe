# Admin Panel — White & Pink Theme Redesign

## Status
Approved for implementation.

---

## Overview

Redesign the entire admin panel (`/admin/*`) from the current dark theme (`#1C1814` background, low-contrast cream/pink text) to a clean white-and-pink theme that feels modern, branded, and professional. The storefront's `AnnouncementBar` must not appear on any admin page.

---

## Design Direction

**Aesthetic:** Pink-forward, warm, branded, feminine — like an editorial pink magazine meets modern SaaS. Heavier use of the brand's pink than the storefront.

---

## Color System

### Page & Background
| Token | Value | Usage |
|---|---|---|
| `--admin-bg` | `#FFF5F8` | Page background (soft pink-tinged white) |
| `--admin-surface` | `#FFFFFF` | Card/panel surfaces |

### Borders
| Token | Value | Usage |
|---|---|---|
| `--admin-border` | `#F5E0ED` | Card borders, dividers |
| `--admin-border-strong` | `#E8C0DC` | Focused inputs, active states |

### Text
| Token | Value | Usage |
|---|---|---|
| `--admin-text` | `#2D2620` | Primary text, headings |
| `--admin-muted` | `#8A7D70` | Secondary text, labels, placeholders |
| `--admin-soft` | `#C4A8B0` | Tertiary, disabled states |

### Accents
| Token | Value | Usage |
|---|---|---|
| `--admin-accent` | `#F8C8DC` | Primary pink — buttons, active nav, highlights |
| `--admin-accent-dark` | `#E8A8C8` | Hover state for accent |
| `--admin-accent-subtle` | `#FDF2F8` | Subtle pink fills, sidebar gradient |
| `--admin-urgent` | `#E8635A` | Coral — alerts, low stock, delete actions |
| `--admin-urgent-subtle` | `#FEF0F0` | Coral light background |
| `--admin-success` | `#4CAF7D` | Success states |
| `--admin-success-subtle` | `#F0FAF4` | Success background |

---

## Layout

### Admin Root (`admin/layout.tsx`)
- Must **not** include the storefront's `AnnouncementBar` or `Navbar` components
- No `<html>` scrollbar interference — admin has its own isolated scroll
- Import `admin.css` for global styles

### Admin Shell (`AdminShell.tsx`)
- Two-column layout: fixed left sidebar (280px) + fluid main content area
- Sidebar is sticky, main area scrolls independently
- Mobile: sidebar collapses to top header bar

### Main Content Area (`admin-main`)
- Max-width: `1440px`, centered
- Padding: `32px 36px 48px`
- Sections separated by `gap: 24px`

---

## Sidebar (`AdminSidebar.tsx`)

### Structure
1. **Brand header** — logo + "Панель управления" label + live indicator dot
2. **Navigation** — 5 nav items with icons, labels, descriptions
3. **Footer** — "На сайт" link to storefront

### Visual Design
- Background: linear gradient from `#FFF0F7` (top) to `#FDF2F8` (bottom)
- Left border: `4px solid #F8C8DC`
- Subtle box-shadow for depth
- Border-radius: `28px` for outer container, `20px` for inner sections
- Rounded corners: `20px` for nav items

### Nav Item States
| State | Background | Text | Border |
|---|---|---|---|
| Default | transparent | `#8A7D70` | none |
| Hover | `#FDF2F8` | `#2D2620` | none |
| Active | `#F8C8DC` | `#2D2620` | none, left `4px solid #E8635A` accent bar |
| Active + badge | same | same | same |

### Icons
- Container: `40px × 40px`, `border-radius: 14px`
- Default: `border: 1px solid #F5E0ED`, `background: #FFFAF8`
- Active: `background: #F8C8DC`, border becomes accent

### Brand Header
- Logo: same as storefront, white with inverted filter on dark bg not needed — on pink gradient, use normal logo or `brightness(0)` filter
- Live indicator: pulsing coral dot `#E8635A`

---

## Page Header (`AdminPageHeader.tsx`)

A reusable header block at the top of each admin page.

### Visual Design
- Background: white with `1px solid #F5E0ED` border
- Border-radius: `28px`
- Padding: `28px 30px`
- Flex layout: copy (eyebrow + title + description) left, actions right
- Actions: pink primary button + stat pills

### Elements
- **Eyebrow:** 11px, uppercase, `letter-spacing: 0.28em`, color `#8A7D70`
- **Title:** clamp `2.25rem → 4.25rem`, `letter-spacing: -0.04em`, `font-weight: 500`, color `#2D2620`
- **Description:** 15px, `line-height: 1.7`, color `#8A7D70`, max 62ch

---

## Cards / Panels

All content sections use the `.admin-panel` class.

### Default Panel
- Background: `#FFFFFF`
- Border: `1px solid #F5E0ED`
- Border-radius: `28px`
- Box-shadow: `0 4px 24px -8px rgba(200, 150, 180, 0.15)` — subtle pink-tinted shadow
- Padding: `24px` to `28px`

### Soft Panel (sidebar sections)
- Background: `#FFF8F5`
- Border: `1px solid #F5E0ED`
- Border-radius: `24px`

---

## Buttons

### Primary Button
- Background: `#F8C8DC`
- Color: `#2D2620`
- Border: `1px solid #E8C0DC`
- Border-radius: `999px` (pill)
- Box-shadow: `0 4px 16px -4px rgba(248,200,220,0.5)`
- Hover: `translateY(-1px)`, shadow deepens
- Active: `translateY(0)`, background darkens slightly to `#E8A8C8`

### Secondary Button
- Background: `#FFFAF8`
- Color: `#2D2620`
- Border: `1px solid #F5E0ED`
- Border-radius: `999px`
- Hover: background `#FDF2F8`

### Ghost Button
- Background: transparent
- Color: `#8A7D70`
- Border: `1px solid transparent`
- Hover: color `#2D2620`, background `#FDF2F8`

### Danger Button
- Background: `#E8635A`
- Color: `#FFFFFF`
- Border-radius: `999px`

---

## Form Inputs

### Input / Textarea / Select
- Background: `#FFFAF8`
- Border: `1px solid #F5E0ED`
- Border-radius: `18px`
- Color: `#2D2620`
- Padding: `14px 16px`
- Font-size: `14px`
- Focus: border `#E8C0DC`, shadow `0 0 0 4px rgba(248,200,220,0.12)`

### Label
- Color: `#8A7D70`
- Font-size: `11px`
- Letter-spacing: `0.2em`
- Text-transform: uppercase

---

## Tables

### Table Styles
- Header row: background `#FFF8F5`, text `#8A7D70`, uppercase, `letter-spacing: 0.2em`, 10px font
- Header border-bottom: `1px solid #F5E0ED`
- Body rows: alternating white / `#FFFAF8`
- Row hover: background `#FDF2F8` (soft pink tint)
- Row border-bottom: `1px solid #F5E0ED`
- Cell padding: `16px 18px`

---

## Badges / Status Pills

| Type | Background | Text |
|---|---|---|
| Default | `#F5E0ED` | `#8A7D70` |
| Accent (new) | `#F8C8DC` | `#2D2620` |
| Urgent (low stock) | `#FEF0F0` | `#E8635A` |
| Success (delivered) | `#F0FAF4` | `#4CAF7D` |
| Coral (confirmed) | `#FDF0E8` | `#C87050` |
| Pink (pending) | `#FDF2F8` | `#C870A0` |

All badges: `border-radius: 999px`, `padding: 6px 12px`, `font-size: 10px`, `letter-spacing: 0.16em`, `text-transform: uppercase`

---

## Empty States
- Padding: `42px 24px`
- Centered text
- Muted color `#8A7D70`

---

## Scrollbars
- Track: `#FFF5F8`
- Thumb: `#F8C8DC` (brand pink)
- Border-radius: `999px`

---

## CSS Variables Summary (`admin.css`)

```css
:root {
  --admin-bg: #FFF5F8;
  --admin-surface: #FFFFFF;
  --admin-border: #F5E0ED;
  --admin-border-strong: #E8C0DC;
  --admin-text: #2D2620;
  --admin-muted: #8A7D70;
  --admin-soft: #C4A8B0;
  --admin-accent: #F8C8DC;
  --admin-accent-dark: #E8A8C8;
  --admin-accent-subtle: #FDF2F8;
  --admin-urgent: #E8635A;
  --admin-urgent-subtle: #FEF0F0;
  --admin-success: #4CAF7D;
  --admin-success-subtle: #F0FAF4;
}
```

---

## Affected Files

| File | Change |
|---|---|
| `app/admin/admin.css` | Complete rewrite — new color system, layout, all component styles |
| `app/admin/layout.tsx` | Strip storefront imports (Navbar, AnnouncementBar) |
| `app/admin/components/AdminShell.tsx` | Minor class name updates |
| `app/admin/components/AdminSidebar.tsx` | New visual design, active states, icon styles |
| `app/admin/components/AdminPageHeader.tsx` | Already component-based — just CSS changes |
| `app/admin/page.tsx` | Update all hardcoded color classes to use new palette |
| `app/admin/products/page.tsx` | Update color classes and modal styling |
| `app/admin/orders/page.tsx` | Update color classes and slide-panel styling |
| `app/admin/customers/page.tsx` | Update color classes |
| `app/admin/settings/page.tsx` | Update color classes, form styling |

---

## Implementation Notes

1. The `.admin-root` div wraps everything — it overrides the storefront's `--admin-*` vars that leaked into global scope
2. Admin pages use global CSS classes + some inline `style={{ color: ... }}` — both need updating
3. The order detail slide-in panel (orders page) uses inline `style` attributes extensively — update those directly
4. Replace `text-[#f6efe8]` → `text-[#2D2620]`, `text-[#846f67]` → `text-[#8A7D70]`, `text-[#b9a59b]` → `text-[#8A7D70]`, etc.
5. Replace `bg-[#1C1814]` → `#FFFFFF`, `bg-[#2D2620]` → `#2D2620` (for dark text on images)
6. Replace `border-white/6` → `border-[#F5E0ED]`, `border-white/8` → `border-[#F5E0ED]`
7. Scrollbar styles should target `::-webkit-scrollbar` in admin.css only (already scoped by `.admin-root` parent)
