import type { CartItem as Item } from "../types/Cart";
import useCart from "../hooks/useCart";

type Props = {
  item: Item;
};

export default function CartItem({ item }: Props) {
  const { increase, decrease, removeFromCart } = useCart();

  return (
   <div
  className="
    bg-[#FFFFFF]
    border border-[#E5E5DD]
    rounded-2xl
    lg:rounded-3xl
    p-3
    lg:p-5
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-3
    lg:gap-5
    shadow-sm
    hover:shadow-md
    transition-all
    duration-300
  "
>
  {/* Product */}
  <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 text-center lg:text-left">
    <div
      className="
        w-16
        h-16
        lg:w-24
        lg:h-24
        rounded-xl
        lg:rounded-2xl
        bg-[#F2F2EC]
        border
        border-[#E5E5DD]
        flex
        items-center
        justify-center
        p-2
        lg:p-3
      "
    >
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-full h-full object-contain"
      />
    </div>

    <div>
      <h2 className="text-sm lg:text-lg font-semibold text-[#13160F] leading-tight">
        {item.product.name}
      </h2>

      <p className="text-xs lg:text-sm text-[#7A7E73] mt-1 hidden lg:block">
        Premium Smartphone
      </p>

      <p className="mt-1 lg:mt-2 text-base lg:text-xl font-bold text-[#5C8A05]">
        ₹{item.product.price.toLocaleString()}
      </p>
    </div>
  </div>

  {/* Quantity & Actions */}
  <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 md:justify-end w-full lg:w-auto mt-2 lg:mt-0">
    <div
      className="
        flex
        items-center
        rounded-xl
        lg:rounded-2xl
        border
        border-[#D7D7CD]
        bg-[#FAFAF7]
        overflow-hidden
        w-full
        lg:w-auto
        justify-between
        lg:justify-center
      "
    >
      <button
        onClick={() => decrease(item.product._id || "")}
        className="
          w-8
          h-8
          lg:w-11
          lg:h-11
          text-[#3F443A]
          hover:bg-[#F2F2EC]
          transition
          text-sm
          lg:text-lg
          font-semibold
        "
      >
        −
      </button>

      <span
        className="
          w-6
          lg:w-12
          text-center
          text-sm
          lg:text-base
          font-semibold
          text-[#13160F]
        "
      >
        {item.quantity}
      </span>

      <button
        onClick={() => increase(item.product._id || "")}
        className="
          w-8
          h-8
          lg:w-11
          lg:h-11
          bg-[#AAD10A]
          text-[#0A0D0A]
          hover:bg-[#C8EE2C]
          transition
          font-bold
          text-sm
          lg:text-lg
        "
      >
        +
      </button>
    </div>

    <button
      onClick={() => removeFromCart(item.product._id || "")}
      className="
        w-full
        lg:w-auto
        px-3
        py-1.5
        lg:px-4
        lg:py-2
        rounded-lg
        lg:rounded-xl
        border
        border-red-200
        text-red-600
        hover:bg-red-50
        transition
        font-medium
        text-xs
        lg:text-sm
      "
    >
      Remove
    </button>
  </div>
</div>
  );
}