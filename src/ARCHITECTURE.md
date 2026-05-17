# Frontend Architecture

This document describes the target folder layout being adopted in the refactor.
Existing `src/user/` and `src/admin/` directories continue to work until each
page is migrated.

## Layout

```
src/
  api/                 # Axios client + endpoint constants (single source of truth for URLs)
  services/            # Domain services calling api/. One file per resource.
  hooks/               # Reusable React hooks (useDisclosure, useApiCall, ...)
  contexts/            # React contexts (Auth, Language, ...)
  types/               # Shared TypeScript interfaces, one file per domain
  constants/           # Static config (membership types, payment methods, ...)
  lib/
    validation/        # zod primitives + form schemas + server-error mapper
    utils.ts
    certificate-export.ts
  components/
    ui/                # shadcn primitives — do not edit
    common/            # LoadingSpinner, EmptyState, ErrorState, SectionHeader
    forms/             # TextField, PasswordField, SelectField, CheckboxField, ...
    modals/            # BaseModal, ConfirmActionModal, feature-specific modals
    layout/            # Navbar, Footer, Layout
    cards/             # Reusable display cards
    sections/          # Reusable large page sections
  pages/               # Thin route components — assembly only
  user/                # (legacy) feature pages, being migrated to features/
  admin/               # (legacy) admin pages, being migrated to features/
  features/            # (target) feature-scoped code: auth, membership, ...
```

## Conventions

### Naming
- Components: `PascalCase.tsx` (e.g. `MembershipStatusCard.tsx`).
- Hooks: `useCamelCase.ts`.
- Services: `kebab-or-camel.service.ts` exporting a single object.

### Components
- A page file should mainly assemble sections; aim for under ~120 lines.
- Modals always live in `components/modals/` and consume `BaseModal`.
- Forms use `react-hook-form` + zod schemas from `lib/validation`.
- Form fields use the wrappers in `components/forms/` for consistent error UI.

### Validation
- Define schemas once in `src/lib/validation/schemas.ts`.
- Errors render inline **before** any network call (client-side via zod).
- On submission, map server validation errors back onto fields with
  `applyServerErrors(error, setError)`.

### API & Services
- Never call `axios` or hard-code endpoint strings inside components.
- Import the singleton `api` from `@/api/client`.
- All endpoint paths live in `@/api/endpoints`.
- Domain services own the request/response shape and return typed data.

### Hooks
- `useDisclosure()` — open/close state for any modal/popover.
- `useApiCall(fn)` — one-shot imperative API call with loading/error state.
- Use TanStack Query (`useQuery`/`useMutation`) for cached server state.

## Migration status

| Page                       | Refactored |
|---------------------------|-----------|
| SignupPage                 | Pending   |
| LoginPage                  | Pending   |
| ProfilePage                | Pending   |
| ConferenceDetailPage       | Pending   |
| WorkshopsPage              | Pending   |
| CertificateViewPage        | Pending   |
| MembershipSubscribePage    | Pending   |
| Admin pages                | Pending   |

This file is updated as each page is migrated.
