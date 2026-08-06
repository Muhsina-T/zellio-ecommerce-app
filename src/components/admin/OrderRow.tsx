import type { Order } from "../../types/Order";
import StatusBadge from "./StatusBadge";


type Props = {
  order: Order;
  updateStatus: (
    id: string,
    status: Order["status"]
  ) => void;
};


export default function OrderRow({
  order,
  updateStatus,
}: Props) {


  return (

    <tr
      className="
      border-b
      border-[#E5E5DD]
      hover:bg-[#FAFAF7]
      transition
      "
    >


      <td
        className="
        py-4
        px-3
        text-[#13160F]
        font-medium
        "
      >
        {order._id}
      </td>



      <td
        className="
        px-3
        text-[#3F443A]
        "
      >
        {order.address.name}
      </td>



      <td
        className="
        px-3
        text-[#3F443A]
        "
      >
        {order.payment}
      </td>



      <td
        className="
        px-3
        font-semibold
        text-[#5C8A05]
        "
      >
        ₹{order.total.toLocaleString()}
      </td>



      <td
        className="px-3"
      >
        <StatusBadge status={order.status} />
      </td>



      <td
        className="
        px-3
        "
      >

        <select

          value={order.status}

          onChange={(e) =>
            updateStatus(
              order._id || order.orderNumber,
              e.target.value as Order["status"]
            )
          }

          className="
          bg-white
          border
          border-[#D7D7CD]
          rounded-xl
          px-3
          py-2
          text-sm
          text-[#13160F]
          outline-none
          cursor-pointer
          focus:border-[#AAD10A]
          w-full
          "

        >

          <option>
            Processing
          </option>

          <option>
            Shipped
          </option>

          <option>
            Delivered
          </option>

          <option>
            Cancelled
          </option>


        </select>

      </td>


    </tr>

  );

}