import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 20000 },
  { month: "Feb", sales: 45000 },
  { month: "Mar", sales: 35000 },
  { month: "Apr", sales: 70000 },
  { month: "May", sales: 95000 },
  { month: "Jun", sales: 85000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Monthly Revenue

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis dataKey="month" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#06b6d4"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}