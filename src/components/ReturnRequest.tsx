import { useState } from "react";

import useReturn from "../hooks/useReturn";

import useOrder from "../hooks/useOrder.ts";
import type { Order } from "../types/Order";


type Props = {
  orderId: string;
  productId?: string | number;
  quantity?: number;
};

export default function ReturnRequest({
  orderId,
  productId,
}: Props) {
  const { orders } = useOrder();

  const { requestReturn, returns } = useReturn();

  const [reason, setReason] = useState("");

  async function submitReturn() {
    const order = orders.find((o: Order) => (o._id || o.orderNumber) === orderId);

    if (!order) return;

    if (order.status !== "Delivered") {
      alert("Order is not delivered yet. Return not allowed.");
      return;
    }

    if (!order.deliveredDate) {
      alert("Delivered date not found. Return not allowed.");
      return;
    }

    const deliveredAt = new Date(order.deliveredDate).getTime();
    const now = new Date().getTime();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (now - deliveredAt > sevenDays) {
      alert("Return period (7 days) has expired for this order.");
      return;
    }

    // prevent duplicate return requests for same item
    if (productId) {
      const exists = returns.some(
        (r) =>
          r.order?._id === order._id &&
          r.product?._id === productId
      );

      if (exists) {
        alert("Return already requested for this product.");
        return;
      }
    }

    if (!productId) {
      alert("Please select a product to request a return.");
      return;
    }

    const orderObjectId = order._id || order.id;

    if (!orderObjectId) {
      alert("Unable to resolve order id for return request.");
      return;
    }

    const req = {
      order: orderObjectId,
      product: String(productId),
      reason,
      status: "Pending" as const,
    };

    try {
      await requestReturn(req);
      setReason("");
      alert("Return request submitted successfully.");
    } catch (error) {
      alert("Failed to submit return request. Please try again.");
    }
  }

  return (
    <div
  className="
    bg-[#FFFFFF]
    border
    border-[#E5E5DD]
    rounded-3xl
    p-6
    shadow-sm
  "
>
  <h2 className="text-2xl font-bold text-[#13160F] mb-6">
    Request Return
  </h2>

  <label className="block text-sm font-medium text-[#7A7E73] mb-2">
    Return Reason
  </label>

  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Tell us why you'd like to return this product..."
    rows={5}
    className="
      w-full
      rounded-2xl
      bg-[#FFFFFF]
      border
      border-[#D7D7CD]
      px-4
      py-3
      text-[#13160F]
      placeholder:text-[#7A7E73]
      shadow-sm
      resize-none
      outline-none
      transition-all
      duration-200
      focus:border-[#AAD10A]
      focus:ring-4
      focus:ring-[rgba(170,209,10,0.18)]
    "
  />

  <button
    onClick={submitReturn}
    className="
      mt-6
      inline-flex
      items-center
      justify-center
      px-6
      py-3
      rounded-2xl
      bg-[#AAD10A]
      border
      border-[#AAD10A]
      text-[#0A0D0A]
      font-semibold
      shadow-sm
      transition-all
      duration-300
      hover:bg-[#C8EE2C]
      hover:border-[#C8EE2C]
      hover:-translate-y-0.5
      hover:shadow-md
      active:translate-y-0
    "
  >
    Submit Request
  </button>
</div>
  );
}