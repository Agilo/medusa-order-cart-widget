import type { PropsWithChildren, ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PaymentSessionsAccordion from "./PaymentSessionsAccordion";

vi.mock("./JsonViewSection", () => ({
  default: () => <div data-testid="json-view" />,
}));

vi.mock("@medusajs/icons", () => ({
  ChevronDown: () => <span />,
}));

vi.mock("@medusajs/ui", () => ({
  IconButton: ({ children }: PropsWithChildren) => (
    <button type="button">{children}</button>
  ),
  StatusBadge: ({ children }: { children: ReactNode }) => (
    <span>{children}</span>
  ),
  Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

describe("PaymentSessionsAccordion", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a fallback message when there are no payment sessions", () => {
    render(
      <PaymentSessionsAccordion
        title="Payment sessions"
        paymentSessions={[]}
      />,
    );

    expect(screen.getByText("Payment sessions")).not.toBeNull();
    expect(screen.getByText("No payment sessions")).not.toBeNull();
  });

  it("renders payment sessions with their provider and status", () => {
    render(
      <PaymentSessionsAccordion
        title="Payment sessions"
        paymentSessions={
          [
            {
              id: "ps_123",
              provider_id: "pp_system_default",
              status: "authorized",
              amount: 30,
              currency_code: "eur",
              created_at: "2026-05-04T10:00:00.000Z",
              authorized_at: "2026-05-04T10:00:00.000Z",
              data: {},
            },
          ] as never
        }
      />,
    );

    expect(screen.getByText("pp_system_default")).not.toBeNull();
    expect(screen.getByText("Authorized")).not.toBeNull();
    expect(screen.queryByText("No payment sessions")).toBeNull();
  });
});
