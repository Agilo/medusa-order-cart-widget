import { AdminPaymentSession } from "@medusajs/framework/types";
import { PlusMini } from "@medusajs/icons";
import { IconButton, StatusBadge, Text } from "@medusajs/ui";
import React from "react";
import { formatAmount } from "../utils/format-amount";
import JsonViewSection from "./JsonViewSection";

type AccordionProps = {
  title: string;
  paymentSessions: AdminPaymentSession[];
};

const getPaymentSessionBadgeColor = (status: string) => {
  switch (status) {
    case "authorized":
    case "captured":
      return "green";
    case "pending":
    case "requires_more":
      return "orange";
    case "error":
      return "red";
    case "canceled":
      return "grey";
    default:
      return "grey";
  }
};

const PaymentSessionsAccordion = ({
  title,
  paymentSessions,
}: AccordionProps) => {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <Text weight="plus" size="small">
        {title}
      </Text>

      <div className="flex flex-col border border-ui-border-base rounded-lg divide-y">
        {(
          paymentSessions as (AdminPaymentSession & {
            created_at: string | Date;
          })[]
        ).map((s) => (
          <div key={s.id} className="flex flex-col px-4 divide-y">
            <div className="flex justify-between items-center gap-4 py-2">
              <Text
                className="flex gap-2 items-center text-ui-fg-subtle"
                weight="plus"
                size="small"
              >
                {s.provider_id}
              </Text>

              <div className="flex items-center gap-4">
                <StatusBadge color={getPaymentSessionBadgeColor(s.status)}>
                  {s.status}
                </StatusBadge>

                <IconButton
                  variant="transparent"
                  size="small"
                  onClick={() =>
                    setActive((prev) => (prev === s.id ? null : s.id))
                  }
                >
                  <PlusMini
                    className={`transition-transform duration-200 ${
                      active === s.id ? "rotate-45" : ""
                    }`}
                  />
                </IconButton>
              </div>
            </div>

            <div
              className={`flex flex-col px-4 gap-2 overflow-hidden transition-all duration-200 ${
                active === s.id
                  ? "max-h-40 py-2 opacity-100"
                  : "max-h-0 py-0 opacity-0"
              }`}
            >
              <div className="grid w-full grid-cols-2 gap-4">
                <Text className="text-ui-fg-subtle" weight="plus" size="xsmall">
                  Amount
                </Text>
                <Text className="text-ui-fg-muted break-words" size="xsmall">
                  {formatAmount(s.amount, s.currency_code)}
                </Text>
              </div>

              <div className="grid w-full grid-cols-2 gap-4">
                <Text className="text-ui-fg-subtle" weight="plus" size="xsmall">
                  Created at
                </Text>
                <Text className="text-ui-fg-muted break-words" size="xsmall">
                  {new Date(s.created_at!).toLocaleString()}
                </Text>
              </div>

              <div className="grid w-full grid-cols-2 gap-4">
                <Text className="text-ui-fg-subtle" weight="plus" size="xsmall">
                  Authorized at
                </Text>
                <Text className="text-ui-fg-muted break-words" size="xsmall">
                  {s.authorized_at
                    ? new Date(s.authorized_at).toLocaleString()
                    : "-"}
                </Text>
              </div>

              <div className="w-full items-center gap-4 mt-4">
                <JsonViewSection data={s} size="xsmall" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSessionsAccordion;
