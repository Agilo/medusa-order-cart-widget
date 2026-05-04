# @agilo/medusa-order-cart-widget

Medusa plugin that adds an Order Cart widget to the order details view in Medusa Admin.

The widget fetches the cart linked to an order and shows:

- cart identifiers and timestamps
- locale information
- raw cart JSON in an inspector drawer
- payment sessions with status, amount, timestamps, PSP reference, and raw JSON

## Compatibility

Tested with Medusa v2.12.4.

## Installation

```bash
yarn add @agilo/medusa-order-cart-widget
```

Register the plugin in your Medusa config:

```ts
import { defineConfig } from "@medusajs/framework/utils";

module.exports = defineConfig({
  plugins: [
    {
      resolve: "@agilo/medusa-order-cart-widget",
    },
  ],
});
```

Restart the Medusa server and open any order in Medusa Admin. The widget is injected into the `order.details.side.after` zone.

## What It Adds

The plugin ships two pieces:

1. An admin widget that renders the linked cart on the order details page.
2. An admin API route at `/admin/orders/:id/cart` that retrieves the order's linked cart and payment collection data.

If an order does not have a linked cart, the route returns a `NOT_FOUND` error and the widget shows the failure state.

## Development

```bash
yarn dev
```

Useful checks before publishing:

```bash
yarn lint
yarn typecheck
yarn build
npm pack --dry-run
```

## Publishing

This package is configured for public npm publishing.

```bash
npm publish
```

## License

MIT
