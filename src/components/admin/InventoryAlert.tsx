import useProducts from "../../hooks/useProducts";


export default function InventoryAlert() {

  const { products } = useProducts();


  const alerts = products.filter(
    product => product.stock <= 10
  );


  return (

    <div
      className="
      bg-white
      rounded-3xl
      p-6
      border
      border-[#E5E5DD]
      shadow-sm
      "
    >


      <div className="flex justify-between items-center mb-6">


        <h2
          className="
          text-2xl
          font-bold
          text-[#13160F]
          "
        >
          Inventory Alert
        </h2>



        <span
          className="
          bg-[#AAD10A]/20
          text-[#5C8A05]
          px-3
          py-1
          rounded-full
          text-sm
          font-semibold
          "
        >
          {alerts.length} Alerts
        </span>


      </div>



      {
        alerts.length === 0 ?

        (

          <div
            className="
            text-center
            py-10
            text-[#5C8A05]
            "
          >
            ✅ All products have sufficient stock.
          </div>

        )

        :

        (

        <div className="space-y-4">


        {
          alerts.map(product => (

          <div
            key={product._id}
            className={`
            flex
            justify-between
            items-center
            p-4
            rounded-2xl

            ${
              product.stock <=5
              ?
              "bg-red-50"
              :
              "bg-[#AAD10A]/10"
            }

            `}
          >



            <div className="flex items-center gap-4">


              <img
                src={product.image}
                alt={product.name}
                className="
                w-14
                h-14
                rounded-xl
                object-cover
                "
              />


              <div>


                <h3
                  className="
                  font-semibold
                  text-[#13160F]
                  "
                >
                  {product.name}
                </h3>


                <p
                  className="
                  text-sm
                  text-[#7A7E73]
                  "
                >
                  {product.brand}
                </p>


              </div>


            </div>



            <span
              className={`
              font-semibold

              ${
                product.stock <=5
                ?
                "text-red-600"
                :
                "text-[#B88A2D]"
              }

              `}
            >

              {product.stock} left

            </span>


          </div>

          ))
        }


        </div>

        )

      }


    </div>

  );
}