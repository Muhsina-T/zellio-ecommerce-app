import { generateDailyReportPDF } from "./generateDailyReportPDF";

type ShareDailyReportParams = {
  date: Date;
  orders: number;
  revenue: number;
  profit: number;
};

export async function shareDailyReportPDF({
  date,
  orders,
  revenue,
  profit,
}: ShareDailyReportParams) {
  const doc = generateDailyReportPDF({
    date,
    orders,
    revenue,
    profit,
  });

  const pdfBlob = doc.output("blob");

  const fileName =
    `zellio-daily-report-${date
      .toISOString()
      .split("T")[0]}.pdf`;

  const file = new File(
    [pdfBlob],
    fileName,
    {
      type: "application/pdf",
    }
  );

  // Native device sharing
  if (
    typeof navigator !== "undefined" &&
    navigator.share &&
    navigator.canShare &&
    navigator.canShare({
      files: [file],
    })
  ) {
    await navigator.share({
      title: "Zellio Daily Sales Report",
      text: `Daily sales report for ${date.toLocaleDateString(
        "en-IN"
      )}`,
      files: [file],
    });

    return;
  }

  // Browser fallback
  doc.save(fileName);
}