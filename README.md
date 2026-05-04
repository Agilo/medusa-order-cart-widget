# @agilo/medusa-order-cart-widget

Medusa plugin that adds an Order Cart widget to the order details view in Medusa Admin.

The widget fetches the cart linked to an order and shows:

- cart identifiers and timestamps
- locale information
- raw cart JSON in an inspector drawer
- payment sessions with status, amount, timestamps, PSP reference, and raw JSON

## Compatibility

Compatible with Medusa >=2.12.0 and <3.0.0.

Verified locally with Medusa v2.12.4.

## Requirements

- Node.js 20 or newer
- A Medusa backend on v2.12.x or newer

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

## Testing

```bash
yarn test
```

## License

MIT
