import { AdminPaymentCollection } from "@medusajs/framework/types";

export type GetOrderCartResponse = {
  id: string;
  region_id: string;
  customer_id: string;
  sales_channel_id: string;
  email: string;
  currency_code: string;
  locale: string | null;
  metadata: null;
  completed_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
  shipping_address_id: string;
  billing_address_id: string;
  payment_collection: AdminPaymentCollection;
};
