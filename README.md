# L&M Confort

Run `node preview.mjs`, then open http://127.0.0.1:4173/fr. Run `node check.mjs` for structural and state checks.

This dependency-free storefront uses localized client routes, translation dictionaries, logical CSS properties, persistent shopping bag and wishlist, product size selection, category/search/price filtering, sorting, accessible drawers, and a checkout review interface. Supplied photographs are preserved; promotional copy is HTML. French is the initial default. Arabic uses Noto Sans Arabic and RTL. Fonts require access to Google Fonts, with system fallbacks.

Commercial launch still requires an order backend, inventory/variant confirmation, authentication, shipping configuration, official contact details, newsletter provider, and verified legal policies. No real order, payment, account creation, contact message, or newsletter subscription is submitted. Checkout details stay in memory; shopping preferences stay in localStorage. Product specifications and unconfirmed discounts are not fabricated.

The implementation uses plain JavaScript and CSS rather than the framework stack suggested in the attached reference. SEO tags are updated client-side; a server-rendered implementation is needed for robust crawler coverage. Photography includes printed brand slogans, intentionally preserved in all languages.
