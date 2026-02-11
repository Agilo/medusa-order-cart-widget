import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  if (!id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Order ID is required.",
    );
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: orderCarts } = await query.graph({
    entity: "order_cart",
    fields: [
      "id",
      "cart.*",
      "cart.payment_collection.*",
      "cart.payment_collection.payment_sessions.*",
      "cart.payment_collection.payments.*",
    ],
    filters: { order_id: id },
  });

  const cart = orderCarts?.[0]?.cart;

  if (!cart) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `No Cart Found For This Order`,
    );
  }

  res.json(cart);
}
