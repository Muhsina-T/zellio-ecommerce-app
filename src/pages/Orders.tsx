import useOrder from "../hooks/useOrder";
import type { Order } from "../types/Order";
import OrderCard from "../components/OrderCard";
import { motion } from "framer-motion";

export default function Orders() {
  const { orders } = useOrder();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        min-h-screen
        bg-[#FAFAF7]
        px-4
        py-6
        lg:px-8
        overflow-x-hidden
      "
    >

      <h1
        className="
          text-3xl
          lg:text-4xl
          font-bold
          text-[#13160F]
          mb-8
        "
      >
        My Orders
      </h1>



      {orders.length === 0 ? (

        <div
          className="
            bg-[#FFFFFF]
            border
            border-[#E5E5DD]
            rounded-3xl
            p-10
            text-center
            shadow-sm
          "
        >

          <p
            className="
              text-[#7A7E73]
              text-lg
            "
          >
            No orders found
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order: Order) => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))}

        </div>

      )}


    </motion.div>
  );
}