import { useEffect, useState } from "react";

import {
  Download,
  Share2,
} from "lucide-react";

import DateSelector from "./DateSelector";

import api from "../../api/api";

import {
  generateDailyReportPDF,
} from "../../utils/generateDailyReportPDF";

import {
  shareDailyReportPDF,
} from "../../utils/shareDailyReportPDF";

export default function DailyReport() {
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [report, setReport] = useState({
    orders: 0,
    revenue: 0,
    profit: 0,
  });

  const [loading, setLoading] =
    useState(false);

  // Fetch report whenever selected date changes
  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        setLoading(true);

        const date = [
          selectedDate.getFullYear(),
          String(
            selectedDate.getMonth() + 1
          ).padStart(2, "0"),
          String(
            selectedDate.getDate()
          ).padStart(2, "0"),
        ].join("-");

        const response = await api.get(
          "/analytics/daily",
          {
            params: {
              date,
            },
          }
        );

        setReport({
          orders: Number(
            response.data.orders || 0
          ),
          revenue: Number(
            response.data.revenue || 0
          ),
          profit: Number(
            response.data.profit || 0
          ),
        });
      } catch (error) {
        console.error(
          "Failed to fetch daily report:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchDailyReport();
  }, [selectedDate]);

  // Download PDF
  const handleDownload = () => {
    const doc = generateDailyReportPDF({
      date: selectedDate,
      orders: report.orders,
      revenue: report.revenue,
      profit: report.profit,
    });

    const fileName =
      `zellio-daily-report-${selectedDate
        .toISOString()
        .split("T")[0]}.pdf`;

    doc.save(fileName);
  };

  // Share PDF
  const handleShare = async () => {
    try {
      await shareDailyReportPDF({
        date: selectedDate,
        orders: report.orders,
        revenue: report.revenue,
        profit: report.profit,
      });
    } catch (error) {
      console.error(
        "Failed to share PDF:",
        error
      );
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-[#E5E5DD]
        p-5
        sm:p-6
        shadow-sm
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
          <h2 className="text-xl font-bold text-[#13160F]">
            Daily Report
          </h2>

          <p className="text-sm text-[#7A7E73] mt-1">
            Revenue, profit and orders
          </p>
        </div>

        <DateSelector
          date={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {/* Summary */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mt-6
        "
      >
        {/* Orders */}

        <div
          className="
            rounded-2xl
            bg-[#FAFAF7]
            p-4
          "
        >
          <p className="text-sm text-[#7A7E73]">
            Orders
          </p>

          <p className="text-2xl font-bold mt-1">
            {loading
              ? "..."
              : report.orders}
          </p>
        </div>

        {/* Revenue */}

        <div
          className="
            rounded-2xl
            bg-[#FAFAF7]
            p-4
          "
        >
          <p className="text-sm text-[#7A7E73]">
            Revenue
          </p>

          <p className="text-2xl font-bold mt-1">
            ₹{report.revenue.toLocaleString()}
          </p>
        </div>

        {/* Profit */}

        <div
          className="
            rounded-2xl
            bg-[#FAFAF7]
            p-4
          "
        >
          <p className="text-sm text-[#7A7E73]">
            Gross Profit
          </p>

          <p className="text-2xl font-bold mt-1">
            ₹{report.profit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Actions */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
          mt-6
        "
      >
        <button
          onClick={handleDownload}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-[#5C8A05]
            text-white
            font-medium
            hover:bg-[#4d7604]
            transition
            disabled:opacity-50
          "
        >
          <Download size={18} />

          Download PDF
        </button>

        <button
          onClick={handleShare}
          disabled={loading}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            border
            border-[#E5E5DD]
            text-[#13160F]
            font-medium
            hover:bg-[#FAFAF7]
            transition
            disabled:opacity-50
          "
        >
          <Share2 size={18} />

          Share PDF
        </button>
      </div>
    </div>
  );
}