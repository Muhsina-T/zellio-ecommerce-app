import { useState } from "react";
import ReturnRequest from "../components/ReturnRequest";
import useReturn from "../hooks/useReturn";

import type { Order } from "../types/Order";

import OrderTracker from "./OrderTracker";

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  const [showReturn, setShowReturn] = useState(false);
  const [showReturnProductId, setShowReturnProductId] = useState<number | null>(
    null,
  );
  const { returns } = useReturn();
  return (
    <div className="rounded-3xl w-full overflow-hidden">

  <div
    className="
    group
    bg-white
    rounded-3xl
    border
    border-[#E5E5DD]
    shadow-sm
    hover:shadow-lg
    transition-all
    duration-300
    p-3
    sm:p-4
    "
  >


    {/* Header */}

    <div
      className="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      "
    >

      <div>

        <h2
          className="
          text-lg
          font-bold
          text-[#13160F]
          "
        >
          Order #{order.orderNumber}
        </h2>


        <p
          className="
          text-xs
          sm:text-sm
          text-[#7A7E73]
          "
        >
          {new Date(order.date).toLocaleDateString()}
        </p>

      </div>




      <span
        className="
        inline-flex
        w-fit
        bg-[#AAD10A]/15
        text-[#5C8A05]
        text-xs
        font-medium
        px-3
        py-1.5
        rounded-full
        "
      >
        {order.status}
      </span>


    </div>







    {/* Items */}

    <div className="mt-4 space-y-2">


      {order.items.map((item)=>{


        const itemRequested = returns.some(
          (r)=>
          r.orderId === order.id &&
          r.productId === item.product.id
        );



        return (

          <div

            key={item.product.id}

            className="
            flex
            flex-col
            sm:flex-row
            sm:justify-between
            gap-3
            border-b
            border-[#E5E5DD]
            pb-3
            w-full
            "

          >



            <p
              className="
              font-medium
              text-sm
              text-[#3F443A]
              break-words
              leading-6
              min-w-0
              flex-1
              "
            >

              {item.product.name}

              <span
                className="
                text-[#7A7E73]
                "
              >
                {" "}× {item.quantity}
              </span>

            </p>





            <div
              className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-2
              sm:gap-4
              "
            >


              <p
                className="
                font-semibold
                text-sm
                text-[#13160F]
                "
              >
                ₹{(
                  item.product.price *
                  item.quantity
                ).toLocaleString()}
              </p>





              {

                (()=>{


                  const sevenDays =
                  7 * 24 * 60 * 60 * 1000;


                  const canRequestItem =
                  order.status === "Delivered" &&
                  order.canReturn &&
                  order.deliveredDate &&
                  new Date().getTime() -
                  new Date(order.deliveredDate).getTime()
                  <= sevenDays;




                  if(!canRequestItem)
                    return null;



                  if(itemRequested){

                    return (

                      <span
                        className="
                        text-sm
                        font-medium
                        text-red-500
                        "
                      >
                        Return Requested
                      </span>

                    );

                  }




                  return (

                    <button

                      onClick={() =>
                        setShowReturnProductId(
                          item.product.id
                        )
                      }

                      className="
                      w-full
                      sm:w-auto
                      text-xs
                      bg-[#AAD10A]
                      text-[#0A0D0A]
                      px-3
                      py-1.5
                      rounded-lg
                      font-medium
                      hover:bg-[#C8EE2C]
                      transition
                      "

                    >

                      Return

                    </button>

                  );


                })()

              }



            </div>



          </div>

        );

      })}


    </div>







    {/* Total */}

    <h3
      className="
      mt-4
      text-base
      sm:text-lg
      font-bold
      text-[#5C8A05]
      "
    >

      Total: ₹{order.total.toLocaleString()}

    </h3>






    {/* Tracker */}

    <div className="mt-4">

      <OrderTracker
        status={order.status}
      />

    </div>







    {/* Return Request */}

    {
      (()=>{


        const sevenDays =
        7 * 24 * 60 * 60 * 1000;



        const canRequest =
        order.status === "Delivered" &&
        order.canReturn &&
        order.deliveredDate &&
        new Date().getTime() -
        new Date(order.deliveredDate).getTime()
        <= sevenDays;



        return (

          canRequest && (

            <>

              {
                showReturn && (

                  <div className="mt-4">


                    <div className="flex justify-end">


                      <button

                        onClick={() =>
                          setShowReturn(false)
                        }

                        className="
                        text-sm
                        font-medium
                        text-[#7A7E73]
                        hover:text-[#AAD10A]
                        transition
                        "
                      >

                        Close

                      </button>


                    </div>



                    <ReturnRequest
                      orderId={order.id}
                    />


                  </div>

                )
              }







              {
                showReturnProductId !== null &&

                (()=>{


                  const item =
                  order.items.find(
                    i =>
                    i.product.id ===
                    showReturnProductId
                  );


                  if(!item)
                    return null;



                  return (

                    <div className="mt-4">


                      <div className="flex justify-end">


                        <button

                          onClick={() =>
                            setShowReturnProductId(null)
                          }

                          className="
                          text-[#7A7E73]
                          hover:text-[#AAD10A]
                          transition
                          "

                        >

                          Close

                        </button>


                      </div>



                      <ReturnRequest

                        orderId={order.id}

                        productId={
                          showReturnProductId
                        }

                        quantity={
                          item.quantity
                        }

                      />


                    </div>

                  );


                })()

              }


            </>

          )

        );


      })()

    }



  </div>

</div>
  );
}
