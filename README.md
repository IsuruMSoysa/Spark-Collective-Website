This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form email

The form on `/contact` sends enquiries over SMTP from an iCloud+ custom-domain
address (`lib/email.ts`). Copy `.env.example` to `.env` and fill it in.

iCloud rules — breaking either one gives `535 5.7.8 authentication failed`:

- `SMTP_USER` must be the Apple ID's **primary @icloud.com address**, not a
  `@sparkcollective.lk` address.
- `SMTP_PASS` must be an **app-specific password** from that same Apple ID
  (account.apple.com → Sign-In and Security → App-Specific Passwords).

`CONTACT_FROM_EMAIL` (`hello@sparkcollective.lk`) is the sender the inbox sees;
it must be a custom-domain address on the same Apple ID. Replying to an enquiry
goes to the visitor via Reply-To.

```bash
npm run email:verify   # SMTP login only, sends nothing
npm run email:test     # sends one test email to CONTACT_TO_EMAIL
```

**Vercel:** Project → Settings → Environment Variables. Add `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL` and
`CONTACT_TO_EMAIL` for Production and Preview, then redeploy.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
