import useProducts from "../../hooks/useProducts";

export default function LowStockTable() {

  const { products } = useProducts();

  const lowStock = products.filter(
    (product) => product.stock <= 5
  );

  return (
   <div className="bg-white border border-[#E5E5DD] rounded-3xl p-6 shadow-sm">

  <h2 className="text-xl lg:text-2xl font-bold mb-6 text-[#13160F]">
    Low Stock
  </h2>

  {lowStock.length === 0 ? (
    <p className="text-[#6B6F63]">
      No Low Stock Products
    </p>
  ) : (
    lowStock.map((product) => (
      <div
        key={product._id}
        className="
          flex
          justify-between
          items-center
          py-3
          border-b
          border-[#E5E5DD]
        "
      >
        <p className="text-[#13160F]">
          {product.name}
        </p>

        <p className="text-red-500 font-medium">
          {product.stock} Left
        </p>
      </div>
    ))
  )}

</div>
  );
}