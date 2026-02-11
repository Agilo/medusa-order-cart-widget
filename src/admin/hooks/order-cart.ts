import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { FetchError } from "@medusajs/js-sdk";
import { GetOrderCartResponse } from "../../types/order-cart";

export const useOrderCart = (
  order_id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      GetOrderCartResponse,
      FetchError,
      GetOrderCartResponse,
      (string | undefined)[]
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["order-cart", order_id],
    queryFn: async () => {
      const orderCart = await sdk.client.fetch<GetOrderCartResponse>(
        `/admin/orders/${order_id}/cart`,
      );

      return orderCart;
    },
    ...options,
  });
};
