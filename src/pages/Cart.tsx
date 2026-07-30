import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        px-4
        py-6
        lg:px-8
      "
    >

      <h1
        className="
          text-3xl
          lg:text-4xl
          font-bold
          mb-8
          text-[#13160F]
        "
      >
        My Cart
      </h1>


      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >

        {/* Cart Items */}

        <div
          className="
            lg:col-span-2
            space-y-5
          "
        >

          {cart.length === 0 ? (

            <div
              className="
                bg-[#FFFFFF]
                border
                border-[#E5E5DD]
                rounded-3xl
                p-8
                text-center
                text-[#7A7E73]
                shadow-sm
              "
            >
              Cart is empty
            </div>

          ) : (

            cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
              />
            ))

          )}

        </div>



        {/* Summary */}

        <CartSummary />


      </div>


    </div>
  );
}