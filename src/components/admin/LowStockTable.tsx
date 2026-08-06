import useProducts from "../../hooks/useProducts";

export default function LowStockTable() {

  const { products } = useProducts();

  const lowStock = products.filter(
    (product) => product.stock <= 5
  );

  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Low Stock

      </h2>

      {lowStock.length === 0 ? (

        <p>No Low Stock Products</p>

      ) : (

        lowStock.map((product) => (

          <div
            key={product._id}
            className="flex justify-between py-3"
          >

            <p>{product.name}</p>

            <p className="text-red-400">

              {product.stock} Left

            </p>

          </div>

        ))

      )}

    </div>
  );
}