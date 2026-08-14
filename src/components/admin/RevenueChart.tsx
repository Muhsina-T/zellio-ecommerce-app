import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import api from "../../api/api";

type DailyAnalytics = {
  date: string;
  revenue: number;
  profit: number;
};

export default function RevenueChart() {
  const [data, setData] = useState<DailyAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyAnalytics = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/analytics/weekly"
        );

        setData(
          response.data.map(
            (item: DailyAnalytics) => ({
              date: item.date,
              revenue: Number(item.revenue || 0),
              profit: Number(item.profit || 0),
            })
          )
        );
      } catch (error) {
        console.error(
          "Failed to fetch weekly analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchWeeklyAnalytics();
  }, []);

  return (
    <div
      className="
        w-full
        rounded-2xl
        lg:rounded-3xl
        bg-white
        border
        border-[#E5E5DD]
        p-4
        sm:p-5
        lg:p-6
        shadow-sm
      "
    >
      <h2
        className="
          mb-4
          text-lg
          font-bold
          text-[#13160F]
          sm:text-xl
          lg:mb-6
          lg:text-2xl
        "
      >
        Daily Revenue & Profit
      </h2>

      {loading ? (
        <div
          className="
            h-[250px]
            sm:h-[280px]
            lg:h-[320px]
            flex
            items-center
            justify-center
            text-[#7A7E73]
          "
        >
          Loading analytics...
        </div>
      ) : (
        <div
          className="
            w-full
            h-[250px]
            sm:h-[280px]
            lg:h-[320px]
          "
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
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
                dataKey="date"
                tick={{
                  fontSize: 12,
                  fill: "#6B6F63",
                }}
                tickMargin={8}
                axisLine={{
                  stroke: "#E5E5DD",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                  fill: "#6B6F63",
                }}
                width={60}
                tickFormatter={(value) =>
                  `₹${Number(value) / 1000}k`
                }
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E5DD",
                  borderRadius: "12px",
                  color: "#13160F",
                }}
                formatter={(value, name) => [
                  `₹${Number(value).toLocaleString(
                    "en-IN"
                  )}`,
                  name === "revenue"
                    ? "Revenue"
                    : "Profit",
                ]}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#5C8A05"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#B88A2D"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}