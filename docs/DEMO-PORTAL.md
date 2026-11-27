# NGI Portal — demo mode

The admin and student portal (`/login`, `/dashboard/*`) runs entirely on sample
data stored in the visitor's browser. Nothing is sent to a server, so a demo
can't be broken by another person's clicks and works on any static host.

## Demo accounts

| Role | Email | Password | Sees |
|---|---|---|---|
| Super Admin | admin@ngi.demo | Admin@123 | Everything, all colleges |
| College Admin (NIBM) | nibm.admin@ngi.demo | Demo@123 | NIBM records only |
| Admission Counsellor | counsellor@ngi.demo | Demo@123 | Enquiries, applications, notices |
| Accounts Officer | accounts@ngi.demo | Demo@123 | Students, fees, receipts |
| Student (enrolled) | student@ngi.demo | Student@123 | Own progress, fees, receipts |
| Student (applicant) | applicant@ngi.demo | Student@123 | Application in progress |

The login page has one-click buttons for each.

## Suggested demo flow (about 10 minutes)

1. **Settings → Reset demo data** before you start.
2. On the public site, submit the homepage admission form.
3. Sign in as Super Admin → **Enquiries**: the new lead is at the top.
   Assign a counsellor, add a note, **Convert to application**.
4. **Applications**: fill date of birth and marks, tick the documents,
   then *Mark documents verified → Allot seat → Enrol student*.
   Enrolling creates the student record and the fee invoice.
5. **Fees**: open the invoice, record a UPI payment, open and print the receipt.
6. **Overview**: the KPIs, funnel and activity feed reflect what you just did.
7. Sign in as `nibm.admin@ngi.demo` to show college-level scoping, and as
   `student@ngi.demo` to show the student portal and online payment.
8. **Apply online** (`/register`) to show a new applicant's portal.

Password reset works too: the demo shows the 6-digit code on screen
instead of sending an SMS.

## Connecting the database later

Screens only call functions in `src/lib/services.ts`. To go live:

1. Keep each function's signature and replace its body with a call to an API
   route backed by Postgres (`prisma/schema.prisma` needs tables for
   programmes, applications, students, invoices, payments, notices and notes
   in addition to the existing ones).
2. Move every validation in `services.ts` to the server as well — the browser
   can't be trusted to enforce seat limits, payment amounts or permissions.
3. Replace the demo session (`src/lib/demo/store.ts`) with real sessions:
   hashed passwords (bcrypt/argon2), an httpOnly cookie, and role checks in
   the API routes. Use `src/lib/demo/permissions.ts` as the role matrix.
4. Wire a payment gateway and SMS/email OTP provider where the demo shows
   "Demo mode" notices.

Seed data lives in `src/lib/demo/seed.ts`. NIBM's seats and fees are the
official figures; other colleges' programmes, seats and fees are illustrative
until the colleges confirm them.
