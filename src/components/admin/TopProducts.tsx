const products = [
  {
    name: "iPhone 16 Pro",
    sales: 250,
  },
  {
    name: "Galaxy S25",
    sales: 180,
  },
  {
    name: "Pixel 10",
    sales: 150,
  },
];

export default function TopProducts() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Top Selling Products

      </h2>

      {products.map((product) => (

        <div
          key={product.name}
          className="flex justify-between py-4 border-b border-slate-800"
        >

          <p>{product.name}</p>

          <p className="text-cyan-400">

            {product.sales} Sold

          </p>

        </div>

      ))}

    </div>
  );
}