# 💎 TaleemOne ERP — Frontend Web Absolute UI & Architecture Constitution
> **Supreme Authority:** [`c:\TaleemOne\zrules\FRONTEND_RULES.md`](file:///c:/TaleemOne/zrules/FRONTEND_RULES.md) | **Standard:** FAANG+ L8 Principal Architect

Yeh rules frontend web (`frontend/`) ke kisi bhi file ko touch karte waqt **100% Non-Negotiable** hain. 0.01% bhi deviation par PR/Code instant reject hoga:

---

## 🏛️ 1. Architecture: Feature-Sliced Design (FSD)
1. **Directory Slicing & Downward Imports:**
   - `app` (Thin page wrappers < 50 lines, 0 business logic, 0 fetch) ➔ `widgets` ➔ `features` ➔ `entities` ➔ `shared`.
   - Ek feature doosre feature ko directly import nahi karega (Strict DRY via `@/entities` ya `@/shared`).
2. **Component Length Law:** Kisi bhi component file ki length strictly **< 150-200 lines** hogi. Badi files ko sub-widgets ya custom hooks me divide karna compulsory hai.
3. **Master UI Primitives (`@/shared/ui/*`):**
   - Direct native `<input>`, `<select>`, `<textarea>` likhna **STRICTLY BANNED** hai. Sirf `@/shared/ui/*` primitives use honge.
   - Universal Corner Radius: Har input, button, card, modal par strictly **`0.625rem` (10px)** radius enforce rahega.
4. **Typography & Icons:**
   - Text & Headings: `Geist Sans`
   - Numeric Data, Amounts, Dates & IDs: `Geist Mono`
   - Icons: Strictly `lucide-react` aur `remix-icon`.

---

## 🎨 2. Universal Liquid Crystal Glassmorphism (Zero Solid Cards Law)
1. **❌ ABSOLUTELY BANNED:**
   - Pure UI mein kahin bhi flat opaque solid color (`bg-white`, solid dark `#121c16`, flat gray boxes) lagana **100% BANNED** hai.
2. **Glass Formula:**
   - Translucent Glass: `bg-white/20` to `bg-white/40` (Light Mode), `bg-black/20` to `bg-black/40` (Dark Mode).
   - Backdrop Blur: `backdrop-blur-2xl` mandatory across all cards, dialogs, sidebars, tables.
   - Frosted Luminous Borders: `border-white/60` to `border-white/80`.
   - Underlying Mesh Glow: Subtle dynamic mesh gradient smoothly glow karega.

---

## 🔌 3. Networking, State & Connection Armor
1. **Centralized Axios (`@/shared/api/httpClient.ts`):**
   - Direct `fetch` ya multiple axios instances **BANNED** hain.
   - `withCredentials: true` (HttpOnly cookie auto-transmit).
2. **Server State via TanStack Query v5:**
   - Query Key Factory pattern use karein (`studentKeys.lists()`).
   - `staleTime: 60s` default enforce rahega.
   - Auto-Abort: Har query/mutation me `signal: AbortController.signal` pass karna mandatory hai.
   - `useEffect` data fetching **STRICTLY BANNED** hai.
3. **Form Handling:**
   - `react-hook-form` + `Zod` validation schemas. `useState` for form inputs is **BANNED**.
4. **Silent Token Refresh Mutex:**
   - 401 response aane par Axios FIFO queue pause karegi, token refresh karegi, aur requests replay karegi (0 user logout loop).
5. **Idempotency Armor:**
   - Har mutating request (POST, PUT, DELETE) par header `X-Idempotency-Key: crypto.randomUUID()` pass hoga.

---

## ⏱️ 4. Temporal & Formatting Standards
1. **Dates Display:** UI par date strictly `@/shared/lib/dateUtils.ts` se **`DD MMM YYYY`** (e.g. `17 Sep 2026`) format me render hogi. Time strictly **`hh:mm A`** (e.g. `09:30 AM`).
2. **Currency:** Symbol (₹, $, AED) aur amounts dynamically backend `/api/v1/institute/settings` se format honge (Indian grouping: `1,50,000.00`).
3. **Dynamic Branding:** Institute details dynamically render hongi. Permanent footer signature: **"Powered by Barkat Tech"**.

---

## 🚫 5. The Frontend 15-Point Blacklist (Instant PR Rejection)
| # | Banned Anti-Pattern | Mandatory Solution |
|---|---|---|
| 1 | `any`, `as any`, `@ts-ignore`, `!` | Strict TypeScript interfaces & Type Guards. |
| 2 | Opaque Solid Color Cards (`bg-white`, solid boxes) | Universal Liquid Crystal Glassmorphism (`backdrop-blur-2xl`). |
| 3 | Component File > 150-200 Lines | Split into sub-components & custom hooks. |
| 4 | Raw `useState` for Form Input Handling | `react-hook-form` + `Zod` schemas. |
| 5 | Direct `fetch` / Raw Axios in components | Centralized `@/shared/api/httpClient.ts` + TanStack Query. |
| 6 | `useEffect` for Data Fetching | TanStack Query (`useQuery`, `useMutation`). |
| 7 | Hardcoded Institute Names / Branding | Dynamic fetch from `/api/v1/institute/settings`. |
| 8 | Hardcoded Currency Symbols (`₹`, `$`) | Dynamic currency from institute settings API. |
| 9 | Raw Unformatted Dates (`2026-09-17T...`) | Formatted via `@/shared/lib/dateUtils.ts` as `DD MMM YYYY`. |
| 10 | Missing Skeletons / Broken Hydration | Shimmer replica skeletons with exact layout dimensions (CLS = 0). |
| 11 | `window.location.reload()` | React Query cache invalidation + router navigation. |
| 12 | Student/Parent Login Routes on Web | Strictly 3 internal institutional roles (`SUPER_ADMIN`, `ADMIN`, `STAFF`). |
| 13 | Raw HTML Inputs (`<input>`, `<select>`) | Master primitives from `@/shared/ui/*`. |
| 14 | DOM Event Casting (`as HTMLInputElement`) | Runtime Type Narrowing via `instanceof HTMLInputElement`. |
| 15 | Ad-Hoc Custom Radius / Random Icons | Standard `0.625rem` (10px) radius & `lucide-react` / `remix-icon`. |

---

## 🧪 6. Pre-Completion Quality Gates
- `npx tsc --noEmit` ➔ **0 Errors, 0 Warnings.**
- `npm run lint` ➔ **0 Lint Errors.**
- `npm run build` ➔ Next.js production build passes with chunks < 200 KB.
- Browser Console: **0 red errors, 0 hydration warnings.**

---

## 🚨 7. Zero Assumption Mandate (The Supreme Crime Law)
- **Assumption is Strictly Prohibited:** UI fields, forms, dropdown options, layout styling, ya API response integration mein apne dimaag se **andaza (assumption) lagana SABSE BADA CRIME hai**.
- **Rules First Check:** Pehle FSD layers, master primitives, aur Zod schemas ko check karein.
- **Doubt = Stop & Ask:** Agar kisi field, validation rule, ya design mein thoda sa bhi shaq ya missing context lage, toh guess karke code likhna **STRICTLY BANNED** hai. Agent turant wahin ruk kar **User se clarifying question poochhega**.
