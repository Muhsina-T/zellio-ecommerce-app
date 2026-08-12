import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { Order } from "../../types/Order";

type RevenueChartProps = {
  orders: Order[];
};

export default function RevenueChart({
  orders,
}: RevenueChartProps) {
  // Create last 6 months
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (5 - index),
      1
    );

    return {
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      year: date.getFullYear(),
      monthNumber: date.getMonth(),
    };
  });

  // Calculate revenue for each month
  const data = months.map((month) => {
    const monthlyRevenue = orders
      .filter((order) => {
        const orderDate = new Date(
          order.createdAt || order.date
        );

        return (
          orderDate.getFullYear() === month.year &&
          orderDate.getMonth() === month.monthNumber
        );
      })
      .reduce(
        (sum, order) =>
          sum + Number(order.total || 0),
        0
      );

    return {
      month: month.month,
      sales: monthlyRevenue,
    };
  });

  return (
    <div className="w-full rounded-2xl lg:rounded-3xl bg-white border border-[#E5E5DD] p-4 sm:p-5 lg:p-6 shadow-sm">

      <h2 className="mb-4 text-lg font-bold text-[#13160F] sm:text-xl lg:mb-6 lg:text-2xl">
        Monthly Revenue
      </h2>

      <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
                fill: "#6B6F63",
              }}
              tickMargin={8}
              axisLine={{
                stroke: "#E5E5DD",
              }}
              tickLine={{
                stroke: "#E5E5DD",
              }}
            />

            <YAxis
              tick={{
                fontSize: 11,
                fill: "#6B6F63",
              }}
              width={55}
              tickFormatter={(value) =>
                `₹${Number(value) / 1000}k`
              }
              axisLine={{
                stroke: "#E5E5DD",
              }}
              tickLine={{
                stroke: "#E5E5DD",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5DD",
                borderRadius: "12px",
                color: "#13160F",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#5C8A05"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#5C8A05",
              }}
              activeDot={{
                r: 6,
                fill: "#AAD10A",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}