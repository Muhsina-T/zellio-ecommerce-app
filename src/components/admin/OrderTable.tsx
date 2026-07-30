import type { Order } from "../../types/Order";
import useOrder from "../../hooks/useOrder";
import OrderRow from "./OrderRow";
import StatusBadge from "./StatusBadge";

export default function OrderTable() {
  const {
    orders,
    updateStatus,
  } = useOrder();

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-4
      sm:p-6
      border
      border-[#E5E5DD]
      shadow-sm
      "
    >
      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr
              className="
              text-left
              border-b
              border-[#E5E5DD]
              text-[#7A7E73]
              text-sm
              "
            >
              <th className="pb-4 px-3">Order ID</th>
              <th className="px-3">Customer</th>
              <th className="px-3">Payment</th>
              <th className="px-3">Total</th>
              <th className="px-3">Status</th>
              <th className="px-3">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                updateStatus={updateStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4 mt-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-4 border border-[#E5E5DD] shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7E73]">
                  Order ID
                </p>
                <p className="mt-2 text-base font-medium text-[#13160F]">
                  {order.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7E73]">
                  Total
                </p>
                <p className="mt-2 text-base font-semibold text-[#5C8A05]">
                  ₹{order.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-[#3F443A]">
              <div>
                <p className="text-[#7A7E73]">Customer</p>
                <p className="mt-1">{order.address.name}</p>
              </div>
              <div>
                <p className="text-[#7A7E73]">Payment</p>
                <p className="mt-1">{order.payment}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="inline-flex rounded-2xl bg-[#F3F4EE] px-3 py-2 text-sm font-medium text-[#5C8A05]">
                <StatusBadge status={order.status} />
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                className="w-full bg-white border border-[#D7D7CD] rounded-xl px-3 py-2 text-sm text-[#13160F] outline-none cursor-pointer focus:border-[#AAD10A]"
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}