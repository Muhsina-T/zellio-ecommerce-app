import {
  ShoppingCart,
  Package,
  Users,
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

  const totalCustomers = 0;


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
        p-8
        "
      >


        <h1
          className="
          text-5xl
          font-bold
          mb-10
          text-[#13160F]
          "
        >
          Dashboard
        </h1>



        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          "
        >


          <AnalyticsCard
            title="Total Sales"
            value={`₹${totalSales.toLocaleString()}`}
            icon={<IndianRupee size={36}/>}
            color="text-[#5C8A05]"
          />


          <AnalyticsCard
            title="Orders"
            value={totalOrders}
            icon={<ShoppingCart size={36}/>}
            color="text-[#AAD10A]"
          />


          <AnalyticsCard
            title="Products"
            value={totalProducts}
            icon={<Package size={36}/>}
            color="text-[#B88A2D]"
          />


          <AnalyticsCard
            title="Customers"
            value={totalCustomers}
            icon={<Users size={36}/>}
            color="text-[#13160F]"
          />


        </div>



        <div
          className="
          grid
          xl:grid-cols-2
          gap-8
          mt-10
          "
        >
           
          <RecentOrders />

          <InventoryAlert />

        </div>


      </main>


    </div>

  );
}