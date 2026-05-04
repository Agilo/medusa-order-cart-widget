import type { PropsWithChildren, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import OrderCartWidget from "./order-cart-widget";
import { useOrderCart } from "../hooks/order-cart";

vi.mock("@medusajs/admin-sdk", () => ({
  defineWidgetConfig: (config: unknown) => config,
}));

vi.mock("../hooks/order-cart", () => ({
  useOrderCart: vi.fn(),
}));

vi.mock("../components/JsonViewSection", () => ({
  default: ({ data }: { data: unknown }) => (
    <div data-testid="json-view">{JSON.stringify(data)}</div>
  ),
}));

vi.mock("../components/PaymentSessionsAccordion", () => ({
  default: ({
    title,
    paymentSessions,
  }: {
    title: string;
    paymentSessions: unknown[];
  }) => (
    <div data-testid="payment-sessions">
      {title}:{paymentSessions.length}
    </div>
  ),
}));

vi.mock("@medusajs/icons", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

vi.mock("@medusajs/ui", () => ({
  Container: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Copy: ({ content }: { content: string }) => (
    <button type="button">copy:{content}</button>
  ),
  Heading: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  Text: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

const mockedUseOrderCart = vi.mocked(useOrderCart);

describe("OrderCartWidget", () => {
  beforeEach(() => {
    mockedUseOrderCart.mockReset();
  });

  it("renders a loading state", () => {
    mockedUseOrderCart.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as ReturnType<typeof useOrderCart>);

    render(<OrderCartWidget data={{ id: "order_123" } as never} />);

    expect(screen.getByText("Cart")).not.toBeNull();
    expect(screen.getByTestId("spinner")).not.toBeNull();
  });

  it("renders an error state", () => {
    mockedUseOrderCart.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch cart"),
    } as ReturnType<typeof useOrderCart>);

    render(<OrderCartWidget data={{ id: "order_123" } as never} />);

    expect(screen.getByText("Failed to fetch cart")).not.toBeNull();
  });

  it("renders cart details and payment sessions", () => {
    mockedUseOrderCart.mockReturnValue({
      data: {
        id: "cart_123",
        region_id: "reg_123",
        customer_id: "cus_123",
        sales_channel_id: "sc_123",
        email: "customer@example.com",
        currency_code: "usd",
        locale: "en",
        metadata: null,
        completed_at: null,
        created_at: "2026-05-04T10:00:00.000Z",
        updated_at: "2026-05-04T10:00:00.000Z",
        deleted_at: null,
        shipping_address_id: "addr_ship",
        billing_address_id: "addr_bill",
        payment_collection: {
          payment_sessions: [{ id: "ps_123" }],
        },
      },
      isLoading: false,
      error: null,
    } as ReturnType<typeof useOrderCart>);

    render(<OrderCartWidget data={{ id: "order_123" } as never} />);

    expect(screen.getByText("cart_123")).not.toBeNull();
    expect(screen.getByText("en")).not.toBeNull();
    expect(screen.getByTestId("json-view")).not.toBeNull();
    expect(screen.getByTestId("payment-sessions").textContent).toContain(
      "Payment sessions:1",
    );
  });
});
