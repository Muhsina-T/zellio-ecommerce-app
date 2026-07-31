import {
  ShoppingCart,
  Package,
  IndianRupee,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import RecentOrders from "../../components/admin/RecentOrders";
import InventoryAlert from "../../components/admin/InventoryAlert";

import useProducts from "../../hooks/useProducts";
import useOrder from "../../hooks/useOrder";


export default function Dashboard() {

  const { products } = useProducts();
  const { orders } = useOrder();


  const totalProducts = products.length;

  const totalSales = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const totalOrders = orders.length;
  return (

    <div
      className="
      min-h-screen
      bg-[#FAFAF7]
      text-[#13160F]
      flex
      "
    >

      <Sidebar />


      <main
        className="
        flex-1
        p-4
        sm:p-6
        lg:p-8
        pb-24
        "
      >

        <div className="flex items-center bg-white lg:bg-transparent border-b border-[#E5E5DD] lg:border-none p-4 lg:p-0 -mx-4 sm:-mx-6 lg:mx-0 sticky top-0 z-30 lg:static">
          <h1 className="text-xl lg:text-3xl font-bold text-[#13160F]">
            Dashboard
          </h1>
        </div>

        {/* Explicit mobile spacer */}
        <div className="h-6 lg:h-8"></div>

        <div
          className="
          grid
          grid-cols-3
          gap-2
          sm:gap-4
          max-w-xl
          "
        >

          <AnalyticsCard
            title="Total Sales"
            value={`₹${totalSales.toLocaleString()}`}
            icon={<IndianRupee size={18}/>}
            color="text-[#5C8A05]"
            size="small"
          />

          <AnalyticsCard
            title="Orders"
            value={totalOrders}
            icon={<ShoppingCart size={18}/>}
            color="text-[#AAD10A]"
            size="small"
          />

          <AnalyticsCard
            title="Products"
            value={totalProducts}
            icon={<Package size={18}/>}
            color="text-[#B88A2D]"
            size="small"
          />

        </div>

        {/* Explicit spacer to guarantee space between sections */}
        <div className="h-6 lg:h-8"></div>

        <div
          className="
          grid
          xl:grid-cols-2
          gap-8
          "
        >
           
          <RecentOrders />

          <InventoryAlert />

        </div>


      </main>


    </div>

  );
}