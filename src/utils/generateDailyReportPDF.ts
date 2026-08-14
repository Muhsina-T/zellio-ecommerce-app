import jsPDF from "jspdf";

type GenerateDailyReportParams = {
  date: Date;
  orders: number;
  revenue: number;
  profit: number;
};

export function generateDailyReportPDF({
  date,
  orders,
  revenue,
  profit,
}: GenerateDailyReportParams) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const generatedAt = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString("en-IN")}`;

  // Profit margin
  const profitMargin =
    revenue > 0
      ? ((profit / revenue) * 100).toFixed(1)
      : "0.0";

  // ----------------------------------------
  // COLORS
  // ----------------------------------------

  const green: [number, number, number] = [
    92,
    138,
    5,
  ];

//   const lightGreen: [number, number, number] = [
//     170,
//     209,
//     10,
//   ];

  const dark: [number, number, number] = [
    19,
    22,
    15,
  ];

  const gray: [number, number, number] = [
    122,
    126,
    115,
  ];

  const lightGray: [number, number, number] = [
    245,
    246,
    242,
  ];

  // ----------------------------------------
  // HEADER
  // ----------------------------------------

  doc.setFillColor(
    green[0],
    green[1],
    green[2]
  );

  doc.rect(
    0,
    0,
    pageWidth,
    42,
    "F"
  );

  // Zellio
  doc.setTextColor(255, 255, 255);

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");

  doc.text(
    "ZELLIO",
    20,
    19
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Admin Analytics",
    20,
    29
  );

  // Report title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Daily Sales Report",
    pageWidth - 20,
    19,
    {
      align: "right",
    }
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    formattedDate,
    pageWidth - 20,
    29,
    {
      align: "right",
    }
  );

  // ----------------------------------------
  // REPORT DETAILS
  // ----------------------------------------

  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );

  doc.setFontSize(10);

  doc.text(
    `Report Date: ${formattedDate}`,
    20,
    56
  );

  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );

  doc.text(
    `Generated: ${generatedAt}`,
    pageWidth - 20,
    56,
    {
      align: "right",
    }
  );

  // ----------------------------------------
  // SUMMARY TITLE
  // ----------------------------------------

  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Sales Summary",
    20,
    75
  );

  // ----------------------------------------
  // SUMMARY CARDS
  // ----------------------------------------

  const cardTop = 85;
  const cardHeight = 38;
  const gap = 6;

  const cardWidth =
    (pageWidth - 40 - gap * 2) / 3;

  const cards = [
    {
      title: "Total Orders",
      value: orders.toString(),
    },
    {
      title: "Revenue",
      value: formatCurrency(revenue),
    },
    {
      title: "Profit",
      value: formatCurrency(profit),
    },
  ];

  cards.forEach((card, index) => {
    const x =
      20 + index * (cardWidth + gap);

    // Card background
    doc.setFillColor(
      lightGray[0],
      lightGray[1],
      lightGray[2]
    );

    doc.roundedRect(
      x,
      cardTop,
      cardWidth,
      cardHeight,
      4,
      4,
      "F"
    );

    // Title
    doc.setTextColor(
      gray[0],
      gray[1],
      gray[2]
    );

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    doc.text(
      card.title,
      x + 8,
      cardTop + 11
    );

    // Value
    doc.setTextColor(
      dark[0],
      dark[1],
      dark[2]
    );

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

    doc.text(
      card.value,
      x + 8,
      cardTop + 27
    );
  });

  // ----------------------------------------
  // PROFIT MARGIN
  // ----------------------------------------

  const marginTop = 137;

  doc.setFillColor(
    236,
    245,
    218
  );

  doc.roundedRect(
    20,
    marginTop,
    pageWidth - 40,
    30,
    4,
    4,
    "F"
  );

  doc.setTextColor(
    green[0],
    green[1],
    green[2]
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Profit Margin",
    28,
    marginTop + 12
  );

  doc.setFontSize(16);

  doc.text(
    `${profitMargin}%`,
    pageWidth - 28,
    marginTop + 13,
    {
      align: "right",
    }
  );

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );

  doc.text(
    "Calculated from backend sales and cost data",
    28,
    marginTop + 23
  );

  // ----------------------------------------
  // REPORT INFORMATION
  // ----------------------------------------

  const infoTop = 188;

  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Report Information",
    20,
    infoTop
  );

  doc.setDrawColor(
    225,
    227,
    220
  );

  doc.line(
    20,
    infoTop + 6,
    pageWidth - 20,
    infoTop + 6
  );

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );

  doc.text(
    "Metric",
    25,
    infoTop + 18
  );

  doc.text(
    "Value",
    pageWidth - 25,
    infoTop + 18,
    {
      align: "right",
    }
  );

  const rows = [
    ["Total Orders", orders.toString()],
    ["Total Revenue", formatCurrency(revenue)],
    ["Total Profit", formatCurrency(profit)],
    ["Profit Margin", `${profitMargin}%`],
  ];

  rows.forEach((row, index) => {
    const y =
      infoTop + 30 + index * 13;

    doc.setTextColor(
      dark[0],
      dark[1],
      dark[2]
    );

    doc.text(
      row[0],
      25,
      y
    );

    doc.text(
      row[1],
      pageWidth - 25,
      y,
      {
        align: "right",
      }
    );

    doc.setDrawColor(
      235,
      236,
      231
    );

    doc.line(
      25,
      y + 5,
      pageWidth - 25,
      y + 5
    );
  });

  // ----------------------------------------
  // FOOTER
  // ----------------------------------------

  doc.setDrawColor(
    225,
    227,
    220
  );

  doc.line(
    20,
    pageHeight - 25,
    pageWidth - 20,
    pageHeight - 25
  );

  doc.setFontSize(8);

  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );

  doc.text(
    "Zellio Admin Analytics",
    20,
    pageHeight - 15
  );

  doc.text(
    "Generated automatically",
    pageWidth - 20,
    pageHeight - 15,
    {
      align: "right",
    }
  );

  return doc;
}