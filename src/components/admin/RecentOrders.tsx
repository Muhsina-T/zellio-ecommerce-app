import useOrder from "../../hooks/useOrder";


export default function RecentOrders() {

  const { orders } = useOrder();


  const recentOrders = [
    ...orders
  ]
  .reverse()
  .slice(0,5);



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


      <h2
        className="
        text-2xl
        font-bold
        mb-6
        text-[#13160F]
        "
      >
        Recent Orders
      </h2>



      {
        recentOrders.length === 0

        ?

        (

          <div
            className="
            text-center
            text-[#7A7E73]
            py-12
            "
          >
            No recent orders.
          </div>

        )

        :

        (

        <div className="space-y-4">


        {
          recentOrders.map((order)=>{


            const firstItem = order.items[0];


            return (

              <div
                key={order._id}
                className="
                flex
                justify-between
                items-center
                bg-[#FAFAF7]
                border
                border-[#E5E5DD]
                rounded-2xl
                p-4
                hover:bg-[#F2F2EC]
                transition
                "
              >



                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >


                  <img
                    src={firstItem.product.image}
                    alt={firstItem.product.name}
                    className="
                    w-16
                    h-16
                    rounded-xl
                    object-cover
                    "
                  />



                  <div>


                    <h3
                      className="
                      font-semibold
                      text-[#13160F]
                      "
                    >
                      {firstItem.product.name}
                    </h3>



                    <p
                      className="
                      text-sm
                      text-[#7A7E73]
                      "
                    >
                      {order.address.name}
                    </p>



                    <p
                      className="
                      text-sm
                      text-[#7A7E73]
                      "
                    >
                      Qty : {firstItem.quantity}
                    </p>



                    <p
                      className="
                      text-xs
                      text-[#7A7E73]
                      "
                    >
                      {
                        new Date(
                          order.date
                        ).toLocaleDateString()
                      }
                    </p>



                  </div>



                </div>




                <div
                  className="
                  text-right
                  "
                >


                  <h3
                    className="
                    font-bold
                    text-[#5C8A05]
                    "
                  >
                    ₹{order.total.toLocaleString()}
                  </h3>




                  <span
                    className={`

                    inline-block
                    mt-2
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold


                    ${
                      order.status === "Delivered"

                      ?

                      "bg-[#5C8A05]/20 text-[#5C8A05]"

                      :

                      order.status === "Processing"

                      ?

                      "bg-[#B88A2D]/20 text-[#B88A2D]"

                      :

                      order.status === "Shipped"

                      ?

                      "bg-blue-100 text-blue-700"

                      :

                      "bg-red-100 text-red-600"

                    }

                    `}
                  >

                    {order.status}

                  </span>


                </div>



              </div>

            );

          })
        }


        </div>

        )

      }


    </div>

  );
}