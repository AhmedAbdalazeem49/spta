# Architecture Refactor Plan

A staged, behavior-preserving refactor. No UI, color, or feature changes. Each phase is independently shippable so we can verify the app still works between phases.

## Guiding rules

- Same design, same flows, same routes.
- Pure structural changes: extract, split, rename, relocate.
- Every move is followed by updating imports + a build check.
- No new libraries except `zod` + `react-hook-form` + `@hookform/resolvers` for validation (react-hook-form already common with shadcn `form.tsx` we have).
- Mock data stays, but moves out of components into `src/data/` or service stubs.

## Phase 1 — Folder scaffolding (no logic moves yet)

Create the target structure and barrel files. Nothing breaks because nothing is moved yet.

```text
src/
  api/                  # axios instance + endpoint constants
  services/             # *.service.ts (already exists, expand)
  hooks/                # use* hooks
  components/
    common/             # shared atoms (LoadingSpinner, EmptyState, ErrorState)
    modals/             # all dialogs
    forms/              # form sections + field wrappers
    cards/              # *Card.tsx
    sections/           # large page sections
    layout/             # (existing)
    ui/                 # (shadcn, untouched)
  features/             # feature-scoped code (preferred over deep pages/)
    auth/
    membership/
    conferences/
    workshops/
    certificates/
    payments/
    profile/
    admin/
  pages/                # thin route components only
  data/                 # mock data extracted from components
  constants/
  types/
  utils/
  lib/                  # (existing, keep)
  contexts/             # (existing)
```

Note: keep existing `src/user/` and `src/admin/` working via re-export shims during the transition so routes don't break mid-refactor.

## Phase 2 — Shared primitives + validation infra

- Add `src/lib/validation/` with reusable zod schemas: `email`, `saudiPhone`, `password`, `nationalId`, `classificationNumber`, `promoCode`.
- Add `src/components/forms/` field wrappers built on shadcn `Form`: `TextField`, `PasswordField`, `SelectField`, `CheckboxField`, `OtpField`. Each renders label, control, inline error.
- Add `src/components/common/`: `LoadingSpinner`, `EmptyState`, `ErrorState`, `SectionHeader`, `PageHeader`.
- Add `src/components/modals/BaseModal.tsx` wrapping shadcn `Dialog` with consistent header/footer/close behavior.

All new — no replacements yet.

## Phase 3 — API + services layer

- `src/api/client.ts` — re-export of current axios instance from `services/api.ts` (single import path going forward).
- `src/api/endpoints.ts` — centralized URL constants.
- Expand `src/services/`:
  - `auth.service.ts`, `membership.service.ts`, `payment.service.ts`, `certificate.service.ts`, `conference.service.ts`, `workshop.service.ts`, `user.service.ts`, `coupon.service.ts`, `visitor.service.ts`.
- `src/types/` — request/response interfaces per domain.
- `src/hooks/` — `useAuth` (already a context), `usePayment`, `useCertificates`, `useConferences`, `useWorkshops`, `useMemberships` wrapping React Query.

Components still call services directly; hooks adopted incrementally.

## Phase 4 — Refactor priority pages (one at a time)

For each page below: extract sections → extract modals → extract forms → page becomes a thin container ≤120 lines.

Order:
1. `SignupPage` → sections: `PersonalInfoSection`, `MembershipSelectionSection`, `PaymentSection`; modals: `PromoCodeModal`; schema: `signupSchema` with inline validation before submit.
2. `LoginPage` + `ForgotPasswordPage` + `ResetPasswordPage` + `VerifyOtpPage` → shared `AuthCard` + zod schemas.
3. `ProfilePage` → `UserInfoCard`, `MembershipStatusCard`, `WorkshopParticipationSection`, `CertificatesSection`, `RenewMembershipModal`.
4. `ConferenceDetailPage` → `ConferenceHero`, `ConferenceTabs/*`, `RegistrationModal`, `PaymentModal`.
5. `ConferencesPage` → `ConferenceListSection` (upcoming/past) + `ConferenceCard`.
6. `WorkshopsPage` → `WorkshopList`, `WorkshopRegistrationModal` (3 steps as sub-components), reuse `PaymentMethodPicker`.
7. `CertificateViewPage` → `CertificateCard`, `CertificatePreviewModal`, `ShareCertificateModal`.
8. `MembershipSubscribePage` → `MembershipTypeCards`, `SubscribeForm`, `PaymentModal`.
9. Admin pages (`AdminUsersPage`, `AdminWorkshopsPage`, `AdminCertificatesPage`, `AdminCoupons`, `AdminVisitorsPage`) → `<Entity>Table`, `<Entity>FormModal`, `<Entity>FiltersBar`, `ConfirmActionModal`.

## Phase 5 — Validation pass for all forms

Each form converts to `react-hook-form + zodResolver`:
- Inline field errors render before any network call.
- Submit button disabled while `isSubmitting`.
- Server errors mapped onto fields when the API returns field errors.
- Centralized error toast for non-field errors.

Forms covered: signup, login, forgot/reset, OTP, membership subscribe, conference registration, workshop registration, contact, admin entity forms, coupon create.

## Phase 6 — Performance + cleanup

- Convert route imports in `App.tsx` to `React.lazy` + `Suspense` for non-critical pages (admin, conferences, certificates, library, news, etc.).
- Remove dead `src/user/` / `src/admin/` re-export shims once all imports point to `src/features/`.
- Sweep duplicate mock data → `src/data/`.
- ESLint pass for unused imports.

## Phase 7 — Verification

- Build passes.
- Manual smoke: home, login, signup→OTP→payment, profile, workshops register, conferences register, certificates view+download, admin pages render.
- Bilingual AR/EN + RTL/LTR unchanged.

## What this plan does NOT do

- No visual changes, no token changes, no copy changes.
- No backend changes.
- No new features.

## Suggested execution

This is large (~40–60 files touched per phase). I recommend I execute **Phase 1 + 2 + 3 scaffolding in one pass** (low risk, additive), then do Phase 4 page-by-page in follow-up messages so you can review each refactored page before moving on.

Reply "go" to start with Phases 1–3, or tell me which page from Phase 4 you want refactored first.
