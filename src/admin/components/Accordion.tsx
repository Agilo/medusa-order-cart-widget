import { AdminPaymentSession } from "@medusajs/framework/types";
import { PlusMini } from "@medusajs/icons";
import { IconButton, StatusBadge, Text } from "@medusajs/ui";
import React from "react";

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

const Accordion = ({ title, paymentSessions }: AccordionProps) => {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <Text className="text-ui-fg-subtle" weight="plus" size="small">
        {title}
      </Text>

      <div className="flex flex-col border border-ui-border-base rounded-lg px-6 py-4">
        {(
          paymentSessions as (AdminPaymentSession & {
            created_at: string | Date;
          })[]
        ).map((s) => (
          <div key={s.id} className="flex flex-col">
            <div className="flex justify-between items-center gap-4">
              <Text
                className="flex gap-2 items-center text-ui-fg-subtle"
                weight="plus"
                size="small"
              >
                {s.provider_id}
              </Text>

              <div className="flex items-center gap-4">
                <StatusBadge
                  className="first-letter:uppercase"
                  color={getPaymentSessionBadgeColor(s.status)}
                >
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

            {active === s.id && (
              <div className="flex flex-col px-6 py-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  <Text
                    className="text-ui-fg-subtle"
                    weight="plus"
                    size="small"
                  >
                    Created at
                  </Text>
                  <Text className="text-ui-fg-muted break-words" size="small">
                    {new Date(s.created_at!).toLocaleString()}
                  </Text>
                </div>

                <div className="grid w-full grid-cols-2 gap-4">
                  <Text
                    className="text-ui-fg-subtle"
                    weight="plus"
                    size="small"
                  >
                    Authorized at
                  </Text>
                  <Text className="text-ui-fg-muted break-words" size="small">
                    {s.authorized_at
                      ? new Date(s.authorized_at).toLocaleString()
                      : "-"}
                  </Text>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
