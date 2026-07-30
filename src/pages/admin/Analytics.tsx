import {
  DollarSign,
  ShoppingCart,
  Users,
  RotateCcw,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";

import AnalyticsCard from "../../components/admin/AnalyticsCard";

import RevenueChart from "../../components/admin/RevenueChart";

import TopProducts from "../../components/admin/TopProducts";

import LowStockTable from "../../components/admin/LowStockTable";

import RecentActivity from "../../components/admin/RecentActivity";

import useOrder from "../../hooks/useOrder";

import useReturn from "../../hooks/useReturn";

export default function Analytics() {

  const { orders } = useOrder();

  const { returns } = useReturn();

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-5xl font-bold mb-10">

          Analytics

        </h1>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">

          <AnalyticsCard
            title="Revenue"
            value={`₹${revenue.toLocaleString()}`}
            icon={<DollarSign size={35} />}
            color="text-cyan-400"
          />

          <AnalyticsCard
            title="Orders"
            value={orders.length}
            icon={<ShoppingCart size={35} />}
            color="text-green-400"
          />

          <AnalyticsCard
            title="Customers"
            value="245"
            icon={<Users size={35} />}
            color="text-yellow-400"
          />

          <AnalyticsCard
            title="Returns"
            value={returns.length}
            icon={<RotateCcw size={35} />}
            color="text-red-400"
          />

        </div>

        <RevenueChart />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          <TopProducts />

          <LowStockTable />

          <RecentActivity />

        </div>

      </main>

    </div>

  );
}