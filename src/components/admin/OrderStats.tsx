import useOrder from "../../hooks/useOrder";


export default function OrderStats() {

  const { orders } = useOrder();


  const processing =
    orders.filter(
      o => o.status === "Processing"
    ).length;


  const shipped =
    orders.filter(
      o => o.status === "Shipped"
    ).length;


  const delivered =
    orders.filter(
      o => o.status === "Delivered"
    ).length;



  return (

    <div
  className="
  grid
  grid-cols-2
  sm:grid-cols-2
  lg:grid-cols-4
  gap-3
  sm:gap-6
  mb-6
  sm:mb-8
  "
>


      {/* Total Orders */}

      <div
        className="
        bg-white
        rounded-2xl
        p-3
        sm:p-6
        border
        border-[#E5E5DD]
        shadow-sm
        "
      >

        <p
          className="
          text-sm
          sm:text-base
          text-[#7A7E73]
          "
        >
          Total Orders
        </p>


        <h2
          className="
          text-3xl
          sm:text-4xl
          font-bold
          mt-2
          text-[#13160F]
          "
        >
          {orders.length}
        </h2>

      </div>





      {/* Processing */}

      <div
        className="
        bg-[#B88A2D]/10
        rounded-2xl
        p-4
        sm:p-6
        border
        border-[#B88A2D]/20
        "
      >

        <p
          className="
          text-sm
          sm:text-base
          text-[#B88A2D]
          "
        >
          Processing
        </p>


        <h2
          className="
          text-3xl
          sm:text-4xl
          font-bold
          mt-2
          "
        >
          {processing}
        </h2>

      </div>





      {/* Shipped */}

      <div
        className="
        bg-blue-50
        rounded-2xl
        p-4
        sm:p-6
        border
        border-blue-100
        "
      >

        <p
          className="
          text-sm
          sm:text-base
          text-blue-600
          "
        >
          Shipped
        </p>


        <h2
          className="
          text-3xl
          sm:text-4xl
          font-bold
          mt-2
          "
        >
          {shipped}
        </h2>


      </div>





      {/* Delivered */}

      <div
        className="
        bg-[#5C8A05]/10
        rounded-2xl
        p-4
        sm:p-6
        border
        border-[#5C8A05]/20
        "
      >

        <p
          className="
          text-sm
          sm:text-base
          text-[#5C8A05]
          "
        >
          Delivered
        </p>


        <h2
          className="
          text-3xl
          sm:text-4xl
          font-bold
          mt-2
          "
        >
          {delivered}
        </h2>


      </div>


    </div>

  );
}