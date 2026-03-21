# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Production site

Deployed site:

- https://sova-petrykivka-art.vercel.app

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Telegram leads setup

Forms on `/contacts` and `/request` send data to `POST /api/telegram-lead`.

Required server environment variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` (optional, if you use forum topics in Telegram)

Steps:

1. Copy `.env.example` values to your hosting environment.
2. Deploy where serverless API routes are supported (for example, Vercel).
3. Submit the forms and check your Telegram chat for new messages.

For local development (`npm start`), create `.env` in the project root with:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_THREAD_ID` (optional)

## WayForPay checkout setup

Checkout on `/checkout` creates a WayForPay invoice and redirects the customer to the hosted payment page.

Required server environment variables:

- `WAYFORPAY_MERCHANT_ACCOUNT`
- `WAYFORPAY_SECRET_KEY`

Optional:

- `WAYFORPAY_DOMAIN` (public domain used in signatures and callbacks)
- `WAYFORPAY_SERVICE_BASE_URL` (explicit public base URL, for example `https://sova-petrykivka-art.vercel.app`)
- `VITE_WAYFORPAY_API_URL` (custom frontend API URL)

After adding the variables:

1. Set the same public domain in your WayForPay merchant settings.
2. Deploy the project to Vercel.
3. Open `/checkout`, click `Оплатити`, and confirm that the redirect goes to WayForPay.
