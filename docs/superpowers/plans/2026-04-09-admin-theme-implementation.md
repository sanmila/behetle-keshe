# Admin Panel White & Pink Theme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire admin panel from a dark theme to a clean white-and-pink theme with the brand's feminine DNA, removing the storefront's announcement bar from all admin pages.

**Architecture:** One-time visual redesign covering 10 files. Start with the global CSS (which defines all design tokens), then update each component file. All admin pages share a consistent set of CSS classes defined in `admin.css`. Inline `style={{}}` attributes are updated directly on each component.

**Tech Stack:** Next.js App Router, Tailwind CSS, CSS custom properties, Framer Motion

---

## Files Modified

| File | Change |
|---|---|
| `app/admin/admin.css` | Complete rewrite with new color tokens, layout, all component styles |
| `app/admin/layout.tsx` | Strip AnnouncementBar import |
| `app/admin/components/AdminShell.tsx` | Class name updates for new colors |
| `app/admin/components/AdminSidebar.tsx` | Full redesign with pink gradient, active states |
| `app/admin/components/AdminPageHeader.tsx` | Class name updates |
| `app/admin/page.tsx` | Update hardcoded color classes throughout |
| `app/admin/products/page.tsx` | Update hardcoded color classes, modal styling |
| `app/admin/orders/page.tsx` | Update hardcoded color classes, slide-panel styling |
| `app/admin/customers/page.tsx` | Update hardcoded color classes |
| `app/admin/settings/page.tsx` | Update hardcoded color classes, form styling |

---

## Task 1: Rewrite `admin.css` — New Design System

**Files:**
- Modify: `app/admin/admin.css` (complete rewrite)

- [ ] **Step 1: Replace entire file content**

Write the new CSS file with all design tokens and component styles:

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

.admin-root {
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
  min-height: 100vh;
  background: var(--admin-bg);
  color: var(--admin-text);
  font-family: var(--font-dm-sans), "DM Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.admin-shell {
  display: flex;
  min-height: 100vh;
}

.admin-main {
  flex: 1;
  margin-left: 280px;
  padding: 32px 36px 48px;
}

.admin-content {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: linear-gradient(180deg, #FFF0F7 0%, #FDF2F8 100%);
  border-right: 1px solid var(--admin-border);
  border-left: 4px solid var(--admin-accent);
  box-shadow: 4px 0 24px -8px rgba(200, 150, 180, 0.15);
  z-index: 40;
  overflow-y: auto;
}

.admin-panel {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 28px;
  box-shadow: 0 4px 24px -8px rgba(200, 150, 180, 0.15);
}

.admin-panel-soft {
  background: #FFF8F5;
  border: 1px solid var(--admin-border);
  border-radius: 24px;
}

.admin-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 30px;
}

.admin-page-copy { max-width: 760px; }

.admin-kicker {
  color: var(--admin-muted);
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.admin-title {
  font-size: clamp(2.25rem, 4vw, 4.25rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 500;
  color: var(--admin-text);
}

.admin-description {
  margin-top: 14px;
  max-width: 62ch;
  color: var(--admin-muted);
  font-size: 15px;
  line-height: 1.7;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.admin-button-primary,
.admin-button-secondary,
.admin-button-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.24s, background-color 0.24s,
              color 0.24s, box-shadow 0.24s;
  cursor: pointer;
}

.admin-button-primary {
  background: var(--admin-accent);
  color: #2D2620;
  border: 1px solid var(--admin-border-strong);
  box-shadow: 0 4px 16px -4px rgba(248, 200, 220, 0.5);
}

.admin-button-secondary {
  background: #FFFAF8;
  color: #2D2620;
  border: 1px solid var(--admin-border);
}

.admin-button-ghost {
  background: transparent;
  color: var(--admin-muted);
  border: 1px solid transparent;
}

.admin-button-primary:hover { transform: translateY(-1px); background: var(--admin-accent-dark); }
.admin-button-secondary:hover { transform: translateY(-1px); background: #FDF2F8; }
.admin-button-ghost:hover { transform: translateY(-1px); color: #2D2620; background: var(--admin-accent-subtle); }
.admin-button-primary:active { transform: translateY(0); }
.admin-button-secondary:active { transform: translateY(0); }
.admin-button-ghost:active { transform: translateY(0); }

.admin-input,
.admin-textarea,
.admin-select {
  width: 100%;
  border-radius: 18px;
  border: 1px solid var(--admin-border);
  background: #FFFAF8;
  color: var(--admin-text);
  padding: 14px 16px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.24s, background-color 0.24s, box-shadow 0.24s;
}

.admin-input:focus,
.admin-textarea:focus,
.admin-select:focus {
  border-color: var(--admin-border-strong);
  box-shadow: 0 0 0 4px rgba(248, 200, 220, 0.12);
}

.admin-input::placeholder,
.admin-textarea::placeholder { color: var(--admin-soft); }

.admin-label {
  display: block;
  margin-bottom: 8px;
  color: var(--admin-muted);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.admin-helper {
  margin-top: 8px;
  color: var(--admin-soft);
  font-size: 12px;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table thead th {
  padding: 14px 18px;
  color: var(--admin-muted);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-align: left;
  border-bottom: 1px solid var(--admin-border);
  background: #FFF8F5;
}

.admin-table tbody td {
  padding: 16px 18px;
  border-bottom: 1px solid var(--admin-border);
  vertical-align: top;
  color: var(--admin-text);
}

.admin-table tbody tr { transition: background-color 0.2s ease; }
.admin-table tbody tr:nth-child(even) { background: #FFFAF8; }
.admin-table tbody tr:hover { background: var(--admin-accent-subtle); }

.admin-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.admin-empty {
  padding: 42px 24px;
  text-align: center;
  color: var(--admin-muted);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--admin-bg); }
::-webkit-scrollbar-thumb { background: var(--admin-accent); border-radius: 999px; }

::selection { background-color: rgba(248, 200, 220, 0.34); color: #2D2620; }
:focus-visible { outline: 1px solid var(--admin-border-strong); outline-offset: 2px; }

input, textarea, select, button { font: inherit; }
button { cursor: pointer; }

@media (max-width: 1100px) {
  .admin-main { margin-left: 0; padding: 96px 18px 28px; }
  .admin-sidebar {
    width: 100%; height: auto; bottom: auto;
    padding: 12px 14px; gap: 12px;
    border-right: 0; border-bottom: 1px solid var(--admin-border);
    flex-direction: row; align-items: center;
  }
  .admin-page-header { flex-direction: column; align-items: flex-start; padding: 22px 20px; }
  .admin-actions { justify-content: flex-start; }
}
```

- [ ] **Step 2: Verify file is saved correctly**

Run: `head -20 app/admin/admin.css`
Expected: Starts with `* { box-sizing: border-box;`

---

## Task 2: Clean Admin Layout — Remove Announcement Bar

**Files:**
- Modify: `app/admin/layout.tsx`

- [ ] **Step 1: Verify current imports and strip storefront components**

The current `app/admin/layout.tsx` is:
```tsx
import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = { title: "HAPPY MAN Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
```

Confirm it has NO storefront imports (Navbar, AnnouncementBar, etc.) — it should already be clean based on the file we read. The storefront's `AnnouncementBar` is in `app/layout.tsx`, which does NOT wrap `/admin/*` routes since they have their own `admin/layout.tsx`. No changes needed to this file. Verify by reading it and confirming it only has `admin.css` import.

- [ ] **Step 2: Confirm admin root has no ticker overlap**

The admin layout renders `<div className="admin-root">{children}</div>` directly. The `admin.css` sets `min-height: 100vh; background: var(--admin-bg)` which should cover everything. No further changes.

---

## Task 3: Redesign AdminSidebar — Pink Gradient & Active States

**Files:**
- Modify: `app/admin/components/AdminSidebar.tsx`

- [ ] **Step 1: Replace icon container styles**

Old `SidebarIcon` component:
```tsx
function SidebarIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/6 bg-white/[0.03] text-[#f2bfd1] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {children}
    </span>
  );
}
```

Replace with:
```tsx
function SidebarIcon({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
      active
        ? "border-[#E8C0DC] bg-[#F8C8DC] text-[#2D2620]"
        : "border-[#F5E0ED] bg-[#FFFAF8] text-[#8A7D70]"
    }`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Replace sidebar outer container class**

Change `className="admin-sidebar"` → `className="admin-sidebar"` (same class, already in CSS) — the CSS handles the pink gradient.

- [ ] **Step 3: Replace sidebar brand header area**

Old:
```tsx
<div className="admin-panel relative overflow-hidden p-5">
  <div className="relative z-10">
    <Image src="/logo.png" alt="Бахетле кеше" width={199} height={48} className="h-auto w-[170px]" />
    <div className="mt-5 flex items-center justify-between gap-4 rounded-[22px] border border-white/6 bg-black/10 px-4 py-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#846f67]">Admin panel</p>
        <p className="mt-1 text-sm text-[#f6efe8]">Управление магазином</p>
      </div>
      <span className="inline-flex h-3 w-3 rounded-full bg-[#e9859d] shadow-[0_0_0_6px_rgba(233,133,157,0.12)]" />
    </div>
  </div>
</div>
```

Replace with:
```tsx
<div className="admin-panel relative overflow-hidden p-5">
  <div className="relative z-10">
    <Image src="/logo.png" alt="Бахетле кеше" width={199} height={48} className="h-auto w-[170px]" />
    <div className="mt-5 flex items-center justify-between gap-4 rounded-[22px] border border-[#F5E0ED] bg-white px-4 py-3">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#8A7D70]">Admin panel</p>
        <p className="mt-1 text-sm text-[#2D2620]">Управление магазином</p>
      </div>
      <span className="inline-flex h-3 w-3 rounded-full bg-[#E8635A] shadow-[0_0_0_6px_rgba(232,99,90,0.15)]" />
    </div>
  </div>
</div>
```

- [ ] **Step 4: Replace sidebar soft panel class name and nav label**

Old:
```tsx
<div className="admin-panel-soft px-3 py-3">
  <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.26em] text-[#846f67]">Навигация</p>
```

Replace with:
```tsx
<div className="admin-panel-soft px-3 py-3">
  <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.26em] text-[#8A7D70]">Навигация</p>
```

- [ ] **Step 5: Replace nav item styling**

Old nav item (inside the map):
```tsx
<Link
  key={item.href}
  href={item.href}
  className={`group flex items-center gap-3 rounded-[22px] px-3 py-3 transition-all duration-300 ${
    active
      ? "bg-[linear-gradient(135deg,rgba(242,191,209,0.16),rgba(242,191,209,0.06))] text-[#f6efe8] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      : "text-[#b9a59b] hover:bg-white/[0.03] hover:text-[#f6efe8]"
  }`}
>
  <SidebarIcon>{item.icon}</SidebarIcon>
  <span className="min-w-0">
    <span className="flex items-center gap-2">
      <span className="block text-sm font-medium">{item.label}</span>
      {item.href === "/admin/orders" && getNewOrdersCount() > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#F8C8DC] px-1.5 text-xs font-semibold text-[#1C1814]">
          {getNewOrdersCount()}
        </span>
      )}
    </span>
    <span className={`block text-xs ${active ? "text-[#d8b9c4]" : "text-[#846f67]"}`}>{item.description}</span>
  </span>
</Link>
```

Replace with:
```tsx
<Link
  key={item.href}
  href={item.href}
  className={`group flex items-center gap-3 rounded-[22px] px-3 py-3 transition-all duration-300 ${
    active
      ? "bg-[#F8C8DC] text-[#2D2620] border-l-4 border-[#E8635A]"
      : "text-[#8A7D70] hover:bg-[#FDF2F8] hover:text-[#2D2620]"
  }`}
>
  <SidebarIcon active={active}>{item.icon}</SidebarIcon>
  <span className="min-w-0">
    <span className="flex items-center gap-2">
      <span className="block text-sm font-medium">{item.label}</span>
      {item.href === "/admin/orders" && getNewOrdersCount() > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E8635A] px-1.5 text-xs font-semibold text-white">
          {getNewOrdersCount()}
        </span>
      )}
    </span>
    <span className={`block text-xs ${active ? "text-[#8A7D70]" : "text-[#C4A8B0]"}`}>{item.description}</span>
  </span>
</Link>
```

- [ ] **Step 6: Replace sidebar footer section**

Old:
```tsx
<div className="mt-auto admin-panel-soft p-4">
  <div className="flex items-center justify-between rounded-[20px] border border-white/6 bg-white/[0.02] px-4 py-3">
    <div>
      <p className="text-[10px] uppercase tracking-[0.26em] text-[#846f67]">Витрина</p>
      <p className="mt-1 text-sm text-[#f6efe8]">Проверить сайт</p>
    </div>
    <Link href="/" className="admin-button-ghost !min-h-10 !px-0 text-[#f2bfd1]">
      На сайт
    </Link>
  </div>
</div>
```

Replace with:
```tsx
<div className="mt-auto admin-panel-soft p-4">
  <div className="flex items-center justify-between rounded-[20px] border border-[#F5E0ED] bg-white px-4 py-3">
    <div>
      <p className="text-[10px] uppercase tracking-[0.26em] text-[#8A7D70]">Витрина</p>
      <p className="mt-1 text-sm text-[#2D2620]">Проверить сайт</p>
    </div>
    <Link href="/" className="admin-button-ghost !min-h-10 !px-0 text-[#E8635A] hover:text-[#2D2620]">
      На сайт
    </Link>
  </div>
</div>
```

---

## Task 4: Update AdminPageHeader

**Files:**
- Modify: `app/admin/components/AdminPageHeader.tsx`

- [ ] **Step 1: Verify component structure**

The `AdminPageHeader` component uses existing CSS classes. The component structure stays the same — the CSS changes in Task 1 handle all visual updates. No class changes needed in this file. Confirm by reading it.

---

## Task 5: Update AdminShell

**Files:**
- Modify: `app/admin/components/AdminShell.tsx`

- [ ] **Step 1: Verify class names**

Current:
```tsx
export default function AdminShell({
  children,
  contentClassName = "",
}: {
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <div className={`admin-content ${contentClassName}`.trim()}>{children}</div>
      </main>
    </div>
  );
}
```

The classes `admin-shell`, `admin-main`, `admin-content` are all defined in the new CSS from Task 1. No changes needed. Confirm the file matches this structure.

---

## Task 6: Update Admin Dashboard (`admin/page.tsx`)

**Files:**
- Modify: `app/admin/page.tsx`

- [ ] **Step 1: Replace status color variables**

Old:
```tsx
const statusTone: Record<string, string> = {
  pending: "bg-[#f2bfd1]/14 text-[#f2bfd1]",
  confirmed: "bg-[#f4d5c2]/14 text-[#f4d5c2]",
  shipped: "bg-[#e9859d]/14 text-[#e9859d]",
  delivered: "bg-[#d7b29d]/14 text-[#f6efe8]",
};
```

Replace with:
```tsx
const statusTone: Record<string, string> = {
  pending: "bg-[#FDF2F8] text-[#C870A0]",
  confirmed: "bg-[#FDF0E8] text-[#C87050]",
  shipped: "bg-[#FDF2F8] text-[#8A7D70]",
  delivered: "bg-[#F0FAF4] text-[#4CAF7D]",
};
```

- [ ] **Step 2: Replace page header section**

Old:
```tsx
<div className="mb-8">
  <p className="text-sm text-[#846f67]">
    {formatDateRu(today)}
  </p>
  <h1 className="mt-1 text-3xl font-medium text-[#f6efe8]">
    Добро пожаловать, Дилара
  </h1>
</div>
```

Replace with:
```tsx
<div className="mb-8">
  <p className="text-sm text-[#8A7D70]">
    {formatDateRu(today)}
  </p>
  <h1 className="mt-1 text-3xl font-medium text-[#2D2620]">
    Добро пожаловать, Дилара
  </h1>
</div>
```

- [ ] **Step 3: Replace dashboard tile section**

Old stats tiles class `className: "admin-panel p-6 ..."` — these use `.admin-panel` which is now white. Update the stat value colors from `text-[#F8C8DC]` to `text-[#E8635A]` (coral for urgency) and `text-[#f6efe8]` to `text-[#2D2620]`:

```tsx
const tiles = useMemo(
  () => [
    {
      label: "Новых заказов сегодня",
      value: String(newOrdersToday),
      note: "Требуют обработки",
      className: "md:col-span-3",
      accent: true, // new orders = coral accent
    },
    {
      label: "Выручка за 7 дней",
      value: formatPrice(revenue7Days),
      note: "За неделю",
      className: "md:col-span-4",
      accent: false,
    },
    {
      label: "Товаров в наличии",
      value: String(stats.products),
      note: "Активных карточек",
      className: "md:col-span-2",
      accent: false,
    },
    {
      label: "Клиентов всего",
      value: String(stats.customers),
      note: "Зарегистрированных",
      className: "md:col-span-3",
      accent: false,
    },
  ],
  [newOrdersToday, revenue7Days, stats.customers, stats.products],
);
```

Then in the tile rendering, change:
```tsx
// Old
<p className="text-2xl font-light tracking-[-0.03em] text-[#F8C8DC]">{tile.value}</p>
<p className="text-xs text-[#846f67]">{tile.note}</p>

// New
<p className={`text-2xl font-light tracking-[-0.03em] ${tile.accent ? "text-[#E8635A]" : "text-[#2D2620]"}`}>{tile.value}</p>
<p className="text-xs text-[#8A7D70]">{tile.note}</p>
```

- [ ] **Step 4: Replace recent orders section**

Old:
```tsx
<div className="admin-panel overflow-hidden">
  <div className="flex items-center justify-between border-b border-white/6 px-6 py-5">
    <div>
      <p className="admin-kicker !mb-2">Свежие заказы</p>
      <h2 className="text-xl font-medium text-[#f6efe8]">Последние 5 заказов</h2>
    </div>
    <Link href="/admin/orders" className="admin-button-ghost text-[#f2bfd1]">
      Все заказы
    </Link>
  </div>
```

Replace with:
```tsx
<div className="admin-panel overflow-hidden">
  <div className="flex items-center justify-between border-b border-[#F5E0ED] px-6 py-5">
    <div>
      <p className="admin-kicker !mb-2">Свежие заказы</p>
      <h2 className="text-xl font-medium text-[#2D2620]">Последние 5 заказов</h2>
    </div>
    <Link href="/admin/orders" className="admin-button-ghost text-[#E8635A] hover:text-[#2D2620]">
      Все заказы
    </Link>
  </div>
```

- [ ] **Step 5: Replace table cell colors**

Old:
```tsx
<div className="font-medium text-[#f2bfd1]">{order.orderNumber}</div>
<div className="mt-1 text-xs text-[#846f67]">{order.email}</div>
...
<td className="text-[#f6efe8]">{order.name}</td>
<td className="font-medium text-[#f6efe8]">{formatPrice(Number(order.totalAmount))}</td>
```

Replace with:
```tsx
<div className="font-medium text-[#E8635A]">{order.orderNumber}</div>
<div className="mt-1 text-xs text-[#8A7D70]">{order.email}</div>
...
<td className="text-[#2D2620]">{order.name}</td>
<td className="font-medium text-[#2D2620]">{formatPrice(Number(order.totalAmount))}</td>
```

- [ ] **Step 6: Replace empty state, border, and low stock section**

Old:
```tsx
// Empty state
<div className="admin-empty">
  <p className="text-lg text-[#f6efe8]">Заказов пока нет</p>
  <p className="mt-2 text-sm text-[#846f67]">Когда появятся первые продажи...</p>
</div>

// Bottom link
<div className="border-t border-white/6 px-6 py-4">
  <Link href="/admin/orders" className="text-sm text-[#f2bfd1] hover:text-[#f6efe8] transition-colors">
    Посмотреть все →
  </Link>
</div>

// Low stock
<section className="admin-panel border-l-4 border-[#E8635A] p-6">
  <p className="admin-kicker !mb-4">Внимание</p>
  <h3 className="mb-3 text-lg font-medium text-[#f6efe8]">Низкий остаток</h3>
  ...
  <span className="text-[#f6efe8] truncate pr-2">{product.nameRu}</span>
  <span className="whitespace-nowrap font-medium text-[#E8635A]">осталось {product.stockQty} шт.</span>
  ...
```

Replace with:
```tsx
// Empty state
<div className="admin-empty">
  <p className="text-lg text-[#2D2620]">Заказов пока нет</p>
  <p className="mt-2 text-sm text-[#8A7D70]">Когда появятся первые продажи...</p>
</div>

// Bottom link
<div className="border-t border-[#F5E0ED] px-6 py-4">
  <Link href="/admin/orders" className="text-sm text-[#E8635A] hover:text-[#2D2620] transition-colors">
    Посмотреть все →
  </Link>
</div>

// Low stock
<section className="admin-panel border-l-4 border-[#E8635A] p-6">
  <p className="admin-kicker !mb-4">Внимание</p>
  <h3 className="mb-3 text-lg font-medium text-[#2D2620]">Низкий остаток</h3>
  ...
  <span className="text-[#2D2620] truncate pr-2">{product.nameRu}</span>
  <span className="whitespace-nowrap font-medium text-[#E8635A]">осталось {product.stockQty} шт.</span>
  ...
```

- [ ] **Step 7: Replace quick actions section**

Old:
```tsx
<section className="admin-panel p-6">
  <p className="admin-kicker !mb-4">Быстрые действия</p>
  ...
  <Link href="/admin/products" className="... text-[#f6efe8] ... text-[#f2bfd1]">
    <span className="block text-sm font-medium text-[#f6efe8]">...</span>
    <span className="mt-1 block text-xs text-[#846f67]">...</span>
  </Link>
  ...
</section>

<section className="admin-panel p-6">
  <p className="admin-kicker !mb-4">Состояние</p>
  <div className="... border border-white/6 ... bg-white/[0.02] ...">
    <p className="text-sm font-medium text-[#f6efe8]">Панель активна</p>
    <p className="mt-3 text-sm leading-6 text-[#846f67]">...</p>
  </div>
  <div className="... border border-white/6 ...">
    <p className="text-3xl font-semibold tracking-[-0.05em] text-[#f6efe8]">...</p>
    <p className="mt-2 text-sm leading-6 text-[#846f67]">...</p>
  </div>
</section>
```

Replace with:
```tsx
<section className="admin-panel p-6">
  <p className="admin-kicker !mb-4">Быстрые действия</p>
  ...
  <Link href="/admin/products" className="... text-[#2D2620] ... text-[#E8635A]">
    <span className="block text-sm font-medium text-[#2D2620]">...</span>
    <span className="mt-1 block text-xs text-[#8A7D70]">...</span>
  </Link>
  ...
</section>

<section className="admin-panel p-6">
  <p className="admin-kicker !mb-4">Состояние</p>
  <div className="... border border-[#F5E0ED] ... bg-white ...">
    <p className="text-sm font-medium text-[#2D2620]">Панель активна</p>
    <p className="mt-3 text-sm leading-6 text-[#8A7D70]">...</p>
  </div>
  <div className="... border border-[#F5E0ED] ...">
    <p className="text-3xl font-semibold tracking-[-0.05em] text-[#2D2620]">...</p>
    <p className="mt-2 text-sm leading-6 text-[#8A7D70]">...</p>
  </div>
</section>
```

- [ ] **Step 8: Replace quick operations buttons**

Old:
```tsx
<Link href="/admin/products/add" className="inline-flex items-center gap-2 rounded-[22px] bg-[#F8C8DC] px-5 py-3 text-sm font-medium text-[#1C1814] transition-colors hover:bg-[#f2bfd1]">
  ...
</Link>
<Link href="/admin/orders" className="... border border-white/12 bg-white/[0.02] ... text-[#f6efe8] ...">
  ...
</Link>
```

Replace with:
```tsx
<Link href="/admin/products/add" className="admin-button-primary">
  <span>+</span> Добавить товар
</Link>
<Link href="/admin/orders" className="admin-button-secondary">
  Посмотреть все заказы
</Link>
<Link href="/" target="_blank" className="admin-button-secondary">
  На сайт
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
</Link>
```

---

## Task 7: Update Products Admin Page

**Files:**
- Modify: `app/admin/products/page.tsx`

- [ ] **Step 1: Replace tag color tones**

Old:
```tsx
const tagTone: Record<string, string> = {
  new: "bg-[#e9859d]/14 text-[#f2bfd1]",
  bestseller: "bg-[#f4d5c2]/14 text-[#f4d5c2]",
  sale: "bg-[#d7b29d]/14 text-[#f6efe8]",
};
```

Replace with:
```tsx
const tagTone: Record<string, string> = {
  new: "bg-[#F8C8DC] text-[#2D2620]",
  bestseller: "bg-[#FDF2F8] text-[#C87050]",
  sale: "bg-[#FEF0F0] text-[#E8635A]",
};
```

- [ ] **Step 2: Replace header description text colors**

Old:
```tsx
<p className="admin-kicker !mb-2">Фильтр каталога</p>
<h2 className="text-xl font-medium text-[#f6efe8]">Список товаров</h2>
<p className="admin-label">Поиск</p>
...
<p className="text-[10px] uppercase tracking-[0.2em] text-[#846f67]">Низкий остаток</p>
<p className="mt-1 text-lg font-medium text-[#f6efe8]">{lowStockCount}</p>
```

Replace with:
```tsx
<p className="admin-kicker !mb-2">Фильтр каталога</p>
<h2 className="text-xl font-medium text-[#2D2620]">Список товаров</h2>
<p className="admin-label">Поиск</p>
...
<p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7D70]">Низкий остаток</p>
<p className="mt-1 text-lg font-medium text-[#E8635A]">{lowStockCount}</p>
```

- [ ] **Step 3: Replace table row and cell colors**

Old:
```tsx
<div className="h-16 rounded-[20px] border border-white/6 bg-white/[0.03]" />
...
<div className="admin-empty">
  <p className="text-lg text-[#f6efe8]">Товары не найдены</p>
  <p className="mt-2 text-sm text-[#846f67]">...</p>
</div>
...
<div className="relative h-16 w-14 overflow-hidden rounded-[16px] border border-white/6 bg-white/[0.03]">
  ...
</div>
<p className="font-medium text-[#f6efe8]">{product.nameRu}</p>
<p className="mt-1 text-xs text-[#846f67]">{product.nameEn}</p>
...
<td className="text-[#b9a59b]">{product.category}</td>
<td className="font-medium text-[#f6efe8]">{formatPrice(Number(product.price))}</td>
<td className={product.stockQty <= 5 ? "text-[#e9859d]" : "text-[#b9a59b]"}>{product.stockQty}</td>
<td><span className="text-sm text-[#846f67]">Без метки</span></td>
```

Replace with:
```tsx
<div className="h-16 rounded-[20px] border border-[#F5E0ED] bg-[#FFFAF8]" />
...
<div className="admin-empty">
  <p className="text-lg text-[#2D2620]">Товары не найдены</p>
  <p className="mt-2 text-sm text-[#8A7D70]">...</p>
</div>
...
<div className="relative h-16 w-14 overflow-hidden rounded-[16px] border border-[#F5E0ED] bg-[#FFFAF8]">
  ...
</div>
<p className="font-medium text-[#2D2620]">{product.nameRu}</p>
<p className="mt-1 text-xs text-[#8A7D70]">{product.nameEn}</p>
...
<td className="text-[#8A7D70]">{product.category}</td>
<td className="font-medium text-[#2D2620]">{formatPrice(Number(product.price))}</td>
<td className={product.stockQty <= 5 ? "text-[#E8635A] font-medium" : "text-[#8A7D70]"}>{product.stockQty}</td>
<td><span className="text-sm text-[#C4A8B0]">Без метки</span></td>
```

- [ ] **Step 4: Replace modal styles**

Old:
```tsx
<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8635a]/15">
  <svg ... stroke="#e8635a" ...>
  ...
</div>
<h3 className="text-lg font-medium text-[#f6efe8]">Удалить товар?</h3>
<p className="mt-3 text-sm text-[#b9a59b]">
  ...
  <span className="text-[#f6efe8]">&laquo;{deleteModal.product.nameRu}&raquo;</span>
  ...
</p>
<button ... className="flex h-12 items-center gap-2 rounded-full border border-[rgba(248,200,220,0.12)] px-6 text-[#f6efe8] hover:border-[#f2bfd1]">
  Отмена
</button>
<button ... className="flex h-12 items-center gap-2 rounded-full bg-[#e8635a] px-6 text-white ...">
  ...
</button>
```

Replace with:
```tsx
<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF0F0]">
  <svg ... stroke="#E8635A" ...>
  ...
</div>
<h3 className="text-lg font-medium text-[#2D2620]">Удалить товар?</h3>
<p className="mt-3 text-sm text-[#8A7D70]">
  ...
  <span className="text-[#2D2620]">&laquo;{deleteModal.product.nameRu}&raquo;</span>
  ...
</p>
<button ... className="admin-button-secondary h-12">
  Отмена
</button>
<button ... className="admin-button-primary h-12">
  ...
</button>
```

---

## Task 8: Update Orders Admin Page

**Files:**
- Modify: `app/admin/orders/page.tsx`

- [ ] **Step 1: Replace stats card text colors**

Old:
```tsx
<p className="admin-kicker !mb-5">Всего заказов</p>
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#f6efe8]">{stats.total}</p>
...
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#F8C8DC]">{stats.new}</p>
<span className="mb-1 inline-block rounded-full bg-[#F8C8DC]/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#F8C8DC]">Требуют внимания</span>
...
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#f6efe8]">{formatPrice(stats.todayRevenue)}</p>
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#f6efe8]">{formatPrice(stats.monthRevenue)}</p>
```

Replace with:
```tsx
<p className="admin-kicker !mb-5">Всего заказов</p>
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#2D2620]">{stats.total}</p>
...
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#E8635A]">{stats.new}</p>
<span className="mb-1 inline-block rounded-full bg-[#FEF0F0] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#E8635A]">Требуют внимания</span>
...
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#2D2620]">{formatPrice(stats.todayRevenue)}</p>
<p className="text-4xl font-semibold tracking-[-0.05em] text-[#2D2620]">{formatPrice(stats.monthRevenue)}</p>
```

- [ ] **Step 2: Replace table row colors**

Old:
```tsx
<div className="font-medium text-[#f2bfd1]">{order.orderNumber}</div>
<td className="text-[#b9a59b] whitespace-nowrap">{formatDate(order.date)}</td>
<div className="text-[#f6efe8]">{order.name}</div>
<div className="mt-0.5 text-xs text-[#846f67]">{order.email}</div>
<span className="block truncate text-sm text-[#b9a59b]" title={truncated}>{truncated}</span>
<td className="whitespace-nowrap font-medium text-[#f6efe8]">{formatPrice(order.total)}</td>
```

Replace with:
```tsx
<div className="font-medium text-[#E8635A]">{order.orderNumber}</div>
<td className="text-[#8A7D70] whitespace-nowrap">{formatDate(order.date)}</td>
<div className="text-[#2D2620]">{order.name}</div>
<div className="mt-0.5 text-xs text-[#8A7D70]">{order.email}</div>
<span className="block truncate text-sm text-[#8A7D70]" title={truncated}>{truncated}</span>
<td className="whitespace-nowrap font-medium text-[#2D2620]">{formatPrice(order.total)}</td>
```

- [ ] **Step 3: Replace slide-in panel styling (inline styles)**

The slide-in panel uses many inline `style={{}}` attributes. Replace the entire panel div:

Old:
```tsx
<div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[520px] flex-col bg-[#1C1814] shadow-[-8px_0_40px_rgba(0,0,0,0.5)]"
  style={{ animation: "slideInRight 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
>
```

Replace with:
```tsx
<div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[520px] flex-col bg-white border-l border-[#F5E0ED] shadow-[-8px_0_40px_rgba(200,150,180,0.2)]"
  style={{ animation: "slideInRight 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
>
```

- [ ] **Step 4: Replace panel header and content colors**

Old:
```tsx
<div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-7 py-6">
  <div>
    <p className="admin-kicker !mb-1">Заказ</p>
    <h2 className="text-2xl font-medium text-[#f6efe8]">{selectedOrder.orderNumber}</h2>
    <p className="mt-1.5 text-sm text-[#846f67]">{formatDate(selectedOrder.date)}</p>
  </div>
  <button type="button" onClick={closePanel} className="admin-button-ghost !min-h-10 !px-3 flex-shrink-0 text-[#b9a59b]">
    <svg ...>
  </button>
</div>
```

Replace with:
```tsx
<div className="flex items-start justify-between gap-4 border-b border-[#F5E0ED] px-7 py-6">
  <div>
    <p className="admin-kicker !mb-1">Заказ</p>
    <h2 className="text-2xl font-medium text-[#2D2620]">{selectedOrder.orderNumber}</h2>
    <p className="mt-1.5 text-sm text-[#8A7D70]">{formatDate(selectedOrder.date)}</p>
  </div>
  <button type="button" onClick={closePanel} className="admin-button-ghost !min-h-10 !px-3 flex-shrink-0 text-[#8A7D70] hover:text-[#2D2620]">
    <svg ...>
  </button>
</div>
```

- [ ] **Step 5: Replace customer/delivery/order item card colors**

Old:
```tsx
<div className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-5">
  <p className="admin-kicker !mb-3">Покупатель</p>
  <p className="text-sm font-medium text-[#f6efe8]">{selectedOrder.name}</p>
  <p className="text-sm text-[#b9a59b]">{selectedOrder.email}</p>
  <p className="text-sm text-[#b9a59b]">{selectedOrder.phone}</p>
</div>

<div className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-5">
  <p className="admin-kicker !mb-3">Адрес доставки</p>
  <div className="space-y-1 text-sm leading-6 text-[#b9a59b]">
    <p className="text-[#f6efe8]">{selectedOrder.address}</p>
    ...
  </div>
</div>

<div className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-5">
  <p className="admin-kicker !mb-4">Состав заказа</p>
  <div className="flex items-center gap-3 rounded-[18px] border border-white/[0.06] bg-white/[0.02] p-3">
    <div className="flex-shrink-0 h-[60px] w-[60px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#2D2620]">
    ...
    <p className="truncate text-sm font-medium text-[#f6efe8]">{item.name}</p>
    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#846f67]">
      <span>Размер: <span className="text-[#b9a59b]">{item.size}</span></span>
      ...
    </div>
    <p className="flex-shrink-0 text-sm font-medium text-[#f6efe8]">{formatPrice(item.price * item.quantity)}</p>
  </div>
  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
    <span className="text-sm font-medium text-[#b9a59b]">Итого</span>
    <span className="text-2xl font-semibold tracking-[-0.04em] text-[#f6efe8]">{formatPrice(selectedOrder.total)}</span>
  </div>
</div>
```

Replace with:
```tsx
<div className="rounded-[22px] border border-[#F5E0ED] bg-[#FFFAF8] p-5">
  <p className="admin-kicker !mb-3">Покупатель</p>
  <p className="text-sm font-medium text-[#2D2620]">{selectedOrder.name}</p>
  <p className="text-sm text-[#8A7D70]">{selectedOrder.email}</p>
  <p className="text-sm text-[#8A7D70]">{selectedOrder.phone}</p>
</div>

<div className="rounded-[22px] border border-[#F5E0ED] bg-[#FFFAF8] p-5">
  <p className="admin-kicker !mb-3">Адрес доставки</p>
  <div className="space-y-1 text-sm leading-6 text-[#8A7D70]">
    <p className="text-[#2D2620]">{selectedOrder.address}</p>
    ...
  </div>
</div>

<div className="rounded-[22px] border border-[#F5E0ED] bg-[#FFFAF8] p-5">
  <p className="admin-kicker !mb-4">Состав заказа</p>
  <div className="flex items-center gap-3 rounded-[18px] border border-[#F5E0ED] bg-white p-3">
    <div className="flex-shrink-0 h-[60px] w-[60px] overflow-hidden rounded-[14px] border border-[#F5E0ED] bg-[#FFFAF8]">
    ...
    <p className="truncate text-sm font-medium text-[#2D2620]">{item.name}</p>
    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#8A7D70]">
      <span>Размер: <span className="text-[#2D2620]">{item.size}</span></span>
      ...
    </div>
    <p className="flex-shrink-0 text-sm font-medium text-[#2D2620]">{formatPrice(item.price * item.quantity)}</p>
  </div>
  <div className="mt-5 flex items-center justify-between border-t border-[#F5E0ED] pt-4">
    <span className="text-sm font-medium text-[#8A7D70]">Итого</span>
    <span className="text-2xl font-semibold tracking-[-0.04em] text-[#2D2620]">{formatPrice(selectedOrder.total)}</span>
  </div>
</div>
```

- [ ] **Step 6: Replace status selector and panel footer**

Old:
```tsx
<div className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-5">
  <p className="admin-kicker !mb-3">Статус заказа</p>
  ...
  <p className="mt-2 text-xs text-[#846f67]">
    Текущий статус: <span className={`font-medium ${STATUS_CONFIG[selectedOrder.status].text}`}>{STATUS_CONFIG[selectedOrder.status].label}</span>
  </p>
</div>

<div className="flex-shrink-0 border-t border-white/[0.07] px-7 py-5">
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-center gap-2 rounded-full bg-[#22C55E]/15 py-2.5 text-sm font-medium text-[#22C55E]">...</div>
    <button type="button" onClick={handleSave} className="admin-button-primary w-full !min-h-12 text-sm">Сохранить</button>
    <button type="button" onClick={handlePrint} className="admin-button-secondary w-full !min-h-12 text-sm">Распечатать</button>
  </div>
</div>
```

Replace with:
```tsx
<div className="rounded-[22px] border border-[#F5E0ED] bg-[#FFFAF8] p-5">
  <p className="admin-kicker !mb-3">Статус заказа</p>
  ...
  <p className="mt-2 text-xs text-[#8A7D70]">
    Текущий статус: <span className={`font-medium ${STATUS_CONFIG[selectedOrder.status].text}`}>{STATUS_CONFIG[selectedOrder.status].label}</span>
  </p>
</div>

<div className="flex-shrink-0 border-t border-[#F5E0ED] px-7 py-5">
  <div className="flex flex-col gap-3">
    <div className="flex items-center justify-center gap-2 rounded-full bg-[#F0FAF4] py-2.5 text-sm font-medium text-[#4CAF7D]">...</div>
    <button type="button" onClick={handleSave} className="admin-button-primary w-full !min-h-12 text-sm">Сохранить</button>
    <button type="button" onClick={handlePrint} className="admin-button-secondary w-full !min-h-12 text-sm">Распечатать</button>
  </div>
</div>
```

- [ ] **Step 7: Replace STATUS_CONFIG text colors**

Old status text colors in `mock-orders.ts` — check and update. Old:
```tsx
const STATUS_CONFIG = {
  new: { label: "Новый", bg: "bg-[#f2bfd1]/14", text: "text-[#f2bfd1]" },
  ...
}
```

Replace with (for dark backgrounds):
Actually — the slide-in panel is now white. The `STATUS_CONFIG` colors need dark text. Update in `mock-orders.ts`:
```tsx
const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  new: { label: "Новый", bg: "bg-[#F8C8DC]", text: "text-[#2D2620]" },
  processing: { label: "В обработке", bg: "bg-[#FDF0E8]", text: "text-[#C87050]" },
  shipped: { label: "Отправлен", bg: "bg-[#FDF2F8]", text: "text-[#8A7D70]" },
  delivered: { label: "Доставлен", bg: "bg-[#F0FAF4]", text: "text-[#4CAF7D]" },
  cancelled: { label: "Отменён", bg: "bg-[#FEF0F0]", text: "text-[#E8635A]" },
};
```

---

## Task 9: Update Customers Admin Page

**Files:**
- Modify: `app/admin/customers/page.tsx`

- [ ] **Step 1: Replace header action pills and table colors**

Old:
```tsx
<div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 text-right">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#846f67]">Администраторы</p>
  <p className="mt-1 text-lg font-medium text-[#f6efe8]">{summary.admins}</p>
</div>
<div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 text-right">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#846f67]">С заказами</p>
  <p className="mt-1 text-lg font-medium text-[#f6efe8]">{summary.withOrders}</p>
</div>

<div className="admin-empty">
  <p className="text-lg text-[#f6efe8]">Клиентов пока нет</p>
  <p className="mt-2 text-sm text-[#846f67]">...</p>
</div>

<p className="font-medium text-[#f6efe8]">{customer.name}</p>
<p className="mt-1 text-xs text-[#846f67]">ID: {customer.id.slice(-8)}</p>
...
<td className="text-[#b9a59b]">{customer.email}</td>
<td className="text-[#b9a59b]">{new Intl...}</td>
<td className="font-medium text-[#f6efe8]">{customer._count.orders}</td>
<span className={`admin-badge ${customer.isAdmin ? "bg-[#f2bfd1]/14 text-[#f2bfd1]" : "bg-white/5 text-[#b9a59b]"}`}>
```

Replace with:
```tsx
<div className="rounded-full border border-[#F5E0ED] bg-white px-4 py-3 text-right">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7D70]">Администраторы</p>
  <p className="mt-1 text-lg font-medium text-[#2D2620]">{summary.admins}</p>
</div>
<div className="rounded-full border border-[#F5E0ED] bg-white px-4 py-3 text-right">
  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7D70]">С заказами</p>
  <p className="mt-1 text-lg font-medium text-[#2D2620]">{summary.withOrders}</p>
</div>

<div className="admin-empty">
  <p className="text-lg text-[#2D2620]">Клиентов пока нет</p>
  <p className="mt-2 text-sm text-[#8A7D70]">...</p>
</div>

<p className="font-medium text-[#2D2620]">{customer.name}</p>
<p className="mt-1 text-xs text-[#8A7D70]">ID: {customer.id.slice(-8)}</p>
...
<td className="text-[#8A7D70]">{customer.email}</td>
<td className="text-[#8A7D70]">{new Intl...}</td>
<td className="font-medium text-[#2D2620]">{customer._count.orders}</td>
<span className={`admin-badge ${customer.isAdmin ? "bg-[#F8C8DC] text-[#2D2620]" : "bg-[#F5E0ED] text-[#8A7D70]"}`}>
```

---

## Task 10: Update Settings Admin Page

**Files:**
- Modify: `app/admin/settings/page.tsx`

- [ ] **Step 1: Replace info card and form colors**

Old:
```tsx
<div className="mt-8 rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
  <p className="text-sm leading-7 text-[#b9a59b]">Сохраняйте только проверенные...</p>
</div>

<button type="submit" disabled={saving} className="admin-button-primary disabled:opacity-50">
  {saving ? "Сохранение..." : "Сохранить"}
</button>
{saved ? <span className="text-sm text-[#f2bfd1]">Изменения сохранены</span> : null}
```

Replace with:
```tsx
<div className="mt-8 rounded-[24px] border border-[#F5E0ED] bg-[#FFFAF8] p-5">
  <p className="text-sm leading-7 text-[#8A7D70]">Сохраняйте только проверенные...</p>
</div>

<button type="submit" disabled={saving} className="admin-button-primary disabled:opacity-50">
  {saving ? "Сохранение..." : "Сохранить"}
</button>
{saved ? <span className="text-sm text-[#4CAF7D]">Изменения сохранены</span> : null}
```

---

## Task 11: Update Admin Login Page

**Files:**
- Modify: `app/admin/login/page.tsx`

- [ ] **Step 1: Read the login page**

Check `app/admin/login/page.tsx` for any hardcoded colors. Update them to use the new palette.

---

## Task 12: Verify — Build and Check

- [ ] **Step 1: Run TypeScript check**

Run: `cd neura-fashion && npx tsc --noEmit 2>&1 | head -30`
Expected: No errors related to our changes

- [ ] **Step 2: Run ESLint**

Run: `cd neura-fashion && npx eslint app/admin --max-warnings 0 2>&1 | grep -E "(error|Error)" | head -10`
Expected: No errors

- [ ] **Step 3: Visit admin pages in browser**

Visit: `http://localhost:3000/admin`
Expected: Clean white/pink theme, no dark background, no storefront ticker, readable text

Visit: `http://localhost:3000/admin/products`
Expected: Products table with pink accents, white cards, pink border-radius

Visit: `http://localhost:3000/admin/orders`
Expected: Orders with coral accent on new orders, slide panel in white with pink border

---

## Implementation Order

1. Task 1 — Rewrite `admin.css` (design system foundation)
2. Task 2 — Clean layout (verify no changes needed)
3. Task 3 — Redesign `AdminSidebar`
4. Task 4 — `AdminPageHeader` (no changes needed)
5. Task 5 — `AdminShell` (no changes needed)
6. Task 6 — Dashboard page
7. Task 7 — Products page
8. Task 8 — Orders page
9. Task 9 — Customers page
10. Task 10 — Settings page
11. Task 11 — Login page
12. Task 12 — Verify
