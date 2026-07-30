import type { ReturnRequest } from "../../types/Return";
import ReturnStatusBadge from "./ReturnStatusBadge";


type Props = {

  request: ReturnRequest;

  updateReturnStatus: (
    id: string,
    status: ReturnRequest["status"]
  ) => void;

};



export default function ReturnRow({
  request,
  updateReturnStatus,
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
        font-medium
        text-[#13160F]
        "
      >
        {request.orderId}
      </td>




      <td
        className="
        text-[#3F443A]
        "
      >
        {request.order.address.name}
      </td>




      <td
        className="
        text-[#3F443A]
        "
      >
        {request.order.items.length}
      </td>




      <td
        className="
        text-[#7A7E73]
        "
      >
        {request.reason}
      </td>




      <td>

        <ReturnStatusBadge
          status={request.status}
        />

      </td>




      <td>


        <select

          value={request.status}

          onChange={(e) =>
            updateReturnStatus(
              request.id,
              e.target.value as ReturnRequest["status"]
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
          "

        >


          <option>
            Pending
          </option>


          <option>
            Approved
          </option>


          <option>
            Rejected
          </option>


          <option>
            Completed
          </option>


        </select>


      </td>



    </tr>

  );

}