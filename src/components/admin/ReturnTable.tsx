import useReturn from "../../hooks/useReturn";
import ReturnRow from "./ReturnRow";
import ReturnStatusBadge from "./ReturnStatusBadge";

export default function ReturnTable() {
  const {
    returns,
    updateReturnStatus,
  } = useReturn();

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      border
      border-[#E5E5DD]
      shadow-sm
      "
    >
      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full">
          <thead>
            <tr
              className="
              border-b
              border-[#E5E5DD]
              text-[#7A7E73]
              "
            >
              <th
                className="
                pb-4
                text-left
                font-medium
                "
              >
                Order ID
              </th>
              <th
                className="
                text-left
                font-medium
                "
              >
                Customer
              </th>
              <th
                className="
                text-left
                font-medium
                "
              >
                Products
              </th>
              <th
                className="
                text-left
                font-medium
                "
              >
                Reason
              </th>
              <th
                className="
                text-left
                font-medium
                "
              >
                Status
              </th>
              <th
                className="
                text-left
                font-medium
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {returns.map((request) => (
              <ReturnRow
                key={request._id}
                request={request}
                updateReturnStatus={updateReturnStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {returns.map((request) => (
          <div
            key={request._id}
            className="rounded-3xl border border-[#E5E5DD] bg-[#F8FAF3] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7E73]">
                  Order ID
                </p>
                <p className="mt-2 text-base font-semibold text-[#13160F]">
                  {request.order?.orderNumber || request.order?._id || "-"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A7E73]">
                  Products
                </p>
                <p className="mt-2 text-base font-semibold text-[#5C8A05]">
                  {request.order?.items?.length ?? 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-[#3F443A]">
              <div>
                <p className="text-[#7A7E73]">Customer</p>
                <p className="mt-1">{request.order?.address?.name || "-"}</p>
              </div>
              <div>
                <p className="text-[#7A7E73]">Reason</p>
                <p className="mt-1">{request.reason}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="inline-flex rounded-2xl bg-white px-3 py-2 text-sm font-medium shadow-sm">
                <ReturnStatusBadge status={request.status} />
              </div>
              <select
                value={request.status}
                onChange={(e) =>
                  updateReturnStatus(
                    request._id,
                    e.target.value as any
                  )
                }
                className="w-full bg-white border border-[#D7D7CD] rounded-xl px-3 py-2 text-sm text-[#13160F] outline-none cursor-pointer focus:border-[#AAD10A]"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}