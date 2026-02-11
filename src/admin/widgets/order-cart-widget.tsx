import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types";
import { Container, Copy, Heading, Text } from "@medusajs/ui";
import { useOrderCart } from "../hooks/order-cart";
import JsonViewSection from "../components/JsonViewSection";
import Accordion from "../components/Accordion";

const OrderCartWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const { data: orderCartData, isLoading, error } = useOrderCart(data.id);

  return (
    <Container className="divide-y p-0">
      <Heading
        level="h2"
        className="w-full flex justify-between items-center px-6 py-4 gap-4"
      >
        Cart
      </Heading>
      <div className="grid w-full grid-cols-2 gap-4 px-6 py-4">
        <Text className="text-ui-fg-subtle" weight="plus" size="small">
          ID
        </Text>
        <div className="flex gap-4 min-w-0">
          <Text
            className="text-ui-fg-muted break-words min-w-0 flex-1"
            size="small"
          >
            {orderCartData?.id}
          </Text>
          <Copy content={orderCartData?.id || ""} />
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 px-6 py-4">
        <Text className="text-ui-fg-subtle" weight="plus" size="small">
          Completed at
        </Text>
        <Text className="text-ui-fg-muted break-words" size="small">
          {orderCartData?.completed_at
            ? new Date(orderCartData?.completed_at).toLocaleString()
            : "-"}
        </Text>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 px-6 py-4">
        <Text className="text-ui-fg-subtle" weight="plus" size="small">
          Created at
        </Text>
        <Text className="text-ui-fg-muted break-words" size="small">
          {new Date(orderCartData?.created_at!).toLocaleString()}
        </Text>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 px-6 py-4">
        <Text className="text-ui-fg-subtle" weight="plus" size="small">
          Locale
        </Text>
        <Text className="text-ui-fg-muted break-words" size="small">
          {orderCartData?.locale || "-"}
        </Text>
      </div>

      <div className="grid w-full grid-cols-2 items-center gap-4 px-6 py-4">
        <Text className="text-ui-fg-subtle" weight="plus" size="small">
          Payment session
        </Text>
        <JsonViewSection data={orderCartData || {}} />
      </div>

      <Accordion
        title="Payment sessions"
        paymentSessions={
          orderCartData?.payment_collection.payment_sessions || []
        }
      />
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
});

export default OrderCartWidget;
