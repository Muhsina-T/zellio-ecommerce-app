import { useEffect, useState } from "react";

import {
  IndianRupee,
  ShoppingCart,
  Users,
  RotateCcw,
  Package,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../../components/admin/Sidebar";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import RevenueChart from "../../components/admin/RevenueChart";
import DailyReport from "../../components/admin/DailyReport";
import TopProducts from "../../components/admin/TopProducts";
import LowStockTable from "../../components/admin/LowStockTable";
import RecentActivity from "../../components/admin/RecentActivity";

import useProducts from "../../hooks/useProducts";
import useReturn from "../../hooks/useReturn";

import api from "../../api/api";
import type { Order } from "../../types/Order";

export default function Analytics() {
  const { returns } = useReturn();
  const { products } = useProducts();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [dailyAnalytics, setDailyAnalytics] = useState({
    revenue: 0,
    profit: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const today = new Date();

        const date = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, "0"),
          String(today.getDate()).padStart(2, "0"),
        ].join("-");

        const [ordersResponse, analyticsResponse] = await Promise.all([
          api.get("/orders/admin/all"),

          api.get("/analytics/daily", {
            params: {
              date,
            },
          }),
        ]);
        console.log("Daily analytics response:", analyticsResponse.data);

        setOrders(ordersResponse.data);

        setDailyAnalytics({
          revenue: Number(analyticsResponse.data.revenue || 0),

          profit: Number(analyticsResponse.data.profit || 0),

          orders: Number(analyticsResponse.data.orders || 0),
        });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnalytics();
  }, []);

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
        {/* Header */}

        <div
          className="
            flex
            items-center
            bg-white
            lg:bg-transparent
            border-b
            border-[#E5E5DD]
            lg:border-none
            p-4
            lg:p-0
            -mx-4
            sm:-mx-6
            lg:mx-0
            sticky
            top-0
            z-30
            lg:static
          "
        >
          <h1
            className="
              text-xl
              lg:text-3xl
              font-bold
              text-[#13160F]
            "
          >
            Analytics
          </h1>
        </div>

        {/* Spacer */}

        <div className="h-6 lg:h-8"></div>

        {/* Analytics Cards */}

        <div
          className="
            grid
            grid-cols-3
            lg:grid-cols-6
            gap-3
            sm:gap-4
            lg:gap-6
            mb-8
          "
        >
          <AnalyticsCard
            title="Revenue"
            value={`₹${dailyAnalytics.revenue.toLocaleString()}`}
            icon={<IndianRupee size={18} />}
            color="text-[#5C8A05]"
            size="small"
          />

          <AnalyticsCard
            title="Profit"
            value={`₹${dailyAnalytics.profit.toLocaleString()}`}
            icon={<TrendingUp size={18} />}
            color="text-[#5C8A05]"
            size="small"
          />

          <AnalyticsCard
            title="Products"
            value={products.length}
            icon={<Package size={18} />}
            color="text-[#AAD10A]"
            size="small"
          />

          <AnalyticsCard
            title="Orders"
            value={loading ? "..." : dailyAnalytics.orders}
            icon={<ShoppingCart size={18} />}
            color="text-[#AAD10A]"
            size="small"
          />

          <AnalyticsCard
            title="Customers"
            value="245"
            icon={<Users size={18} />}
            color="text-[#B88A2D]"
            size="small"
          />

          <AnalyticsCard
            title="Returns"
            value={returns.length}
            icon={<RotateCcw size={18} />}
            color="text-red-500"
            size="small"
          />
        </div>

        {/* Daily Revenue & Profit Chart */}

        <div className="mb-8">
          <RevenueChart />
        </div>

        {/* Daily PDF Report */}

        <div className="mb-8">
          <DailyReport />
        </div>

        {/* Analytics Sections */}

        <div
          className="
            grid
            xl:grid-cols-3
            gap-8
          "
        >
          <TopProducts orders={orders} />

          <LowStockTable />

          <RecentActivity
            orders={orders}
            returns={returns}
            products={products}
          />
        </div>
      </main>
    </div>
  );
}
