import type { ReturnRequest } from "../types/Return";

type Props = {
  request: ReturnRequest;
};

export default function ReturnCard({
  request,
}: Props) {
  const statusStyle = {
    Pending:
      "bg-[#FFF7E6] text-[#B88A2D] border border-[#F1DFC2]",

    Approved:
      "bg-[rgba(170,209,10,0.12)] text-[#5C8A05] border border-[#AAD10A]",

    Rejected:
      "bg-red-50 text-red-600 border border-red-200",

    Completed:
      "bg-[#F2F2EC] text-[#3F443A] border border-[#D7D7CD]",
  };

  return (
    <div
      className="
        group
        rounded-3xl
        bg-[#FFFFFF]
        border
        border-[#E5E5DD]
        p-6
        shadow-sm
        hover:shadow-lg
        hover:border-[#AAD10A]
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#13160F]">
            Order #{request.orderId}
          </h2>

          <p className="mt-1 text-sm text-[#7A7E73]">
            {new Date(request.requestDate).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${statusStyle[request.status]}
          `}
        >
          {request.status}
        </span>
      </div>

      <div className="mt-6 border-t border-[#E5E5DD] pt-5">
        <p className="text-sm font-medium uppercase tracking-wide text-[#7A7E73]">
          Return Reason
        </p>

        <p className="mt-2 text-[#3F443A] leading-7">
          {request.reason}
        </p>
      </div>
    </div>
  );
}