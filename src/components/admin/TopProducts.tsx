import type { Order } from "../../types/Order";

type TopProductsProps = {
  orders: Order[];
};

type ProductSales = {
  name: string;
  sales: number;
};

export default function TopProducts({
  orders,
}: TopProductsProps) {
  const productSales: Record<
    string,
    ProductSales
  > = {};

  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const productName =
        item.product?.name || "Unknown Product";

      if (!productSales[productName]) {
        productSales[productName] = {
          name: productName,
          sales: 0,
        };
      }

      productSales[productName].sales +=
        Number(item.quantity || 0);
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="bg-white border border-[#E5E5DD] rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-[#13160F]">
        Top Selling Products
      </h2>

      {topProducts.length === 0 ? (
        <p className="text-[#6B6F63]">
          No sales yet
        </p>
      ) : (
        topProducts.map((product) => (
          <div
            key={product.name}
            className="
              flex
              justify-between
              items-center
              py-4
              border-b
              border-[#E5E5DD]
            "
          >
            <p className="text-[#13160F]">
              {product.name}
            </p>

            <p className="text-[#5C8A05] font-medium">
              {product.sales} Sold
            </p>
          </div>
        ))
      )}

    </div>
  );
}