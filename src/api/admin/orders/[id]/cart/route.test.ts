import { MedusaError } from "@medusajs/framework/utils";
import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

describe("GET /admin/orders/:id/cart", () => {
  it("throws when the order id is missing", async () => {
    const req = {
      params: {},
      scope: { resolve: vi.fn() },
    };

    await expect(GET(req as never, { json: vi.fn() } as never)).rejects.toThrow(
      "Order ID is required.",
    );
  });

  it("returns the linked cart when it exists", async () => {
    const graph = vi.fn().mockResolvedValue({
      data: [
        {
          cart: {
            id: "cart_123",
            locale: "en",
            payment_collection: {
              payment_sessions: [],
            },
          },
        },
      ],
    });
    const resolve = vi.fn().mockReturnValue({ graph });
    const json = vi.fn();

    const req = {
      params: { id: "order_123" },
      scope: { resolve },
    };

    await GET(req as never, { json } as never);

    expect(resolve).toHaveBeenCalledWith("query");
    expect(graph).toHaveBeenCalledWith({
      entity: "order_cart",
      fields: [
        "id",
        "cart.*",
        "cart.payment_collection.*",
        "cart.payment_collection.payment_sessions.*",
        "cart.payment_collection.payments.*",
      ],
      filters: { order_id: "order_123" },
    });
    expect(json).toHaveBeenCalledWith({
      id: "cart_123",
      locale: "en",
      payment_collection: {
        payment_sessions: [],
      },
    });
  });

  it("throws not found when no linked cart exists", async () => {
    const req = {
      params: { id: "order_404" },
      scope: {
        resolve: vi.fn().mockReturnValue({
          graph: vi.fn().mockResolvedValue({ data: [] }),
        }),
      },
    };

    await expect(
      GET(req as never, { json: vi.fn() } as never),
    ).rejects.toMatchObject({
      type: MedusaError.Types.NOT_FOUND,
      message: "No Cart Found For This Order",
    });
  });
});
