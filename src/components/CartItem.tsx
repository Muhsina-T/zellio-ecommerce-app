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
    rounded-3xl
    p-5
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-5
    shadow-sm
    hover:shadow-md
    transition-all
    duration-300
  "
>
  {/* Product */}
  <div className="flex items-center gap-4">
    <div
      className="
        w-24
        h-24
        rounded-2xl
        bg-[#F2F2EC]
        border
        border-[#E5E5DD]
        flex
        items-center
        justify-center
        p-3
      "
    >
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-full h-full object-contain"
      />
    </div>

    <div>
      <h2 className="text-lg font-semibold text-[#13160F]">
        {item.product.name}
      </h2>

      <p className="text-sm text-[#7A7E73] mt-1">
        Premium Smartphone
      </p>

      <p className="mt-2 text-xl font-bold text-[#5C8A05]">
        ₹{item.product.price.toLocaleString()}
      </p>
    </div>
  </div>

  {/* Quantity & Actions */}
  <div className="flex items-center gap-4 flex-wrap md:justify-end">
    <div
      className="
        flex
        items-center
        rounded-2xl
        border
        border-[#D7D7CD]
        bg-[#FAFAF7]
        overflow-hidden
      "
    >
      <button
        onClick={() => decrease(item.product.id)}
        className="
          w-11
          h-11
          text-[#3F443A]
          hover:bg-[#F2F2EC]
          transition
          text-lg
          font-semibold
        "
      >
        −
      </button>

      <span
        className="
          w-12
          text-center
          font-semibold
          text-[#13160F]
        "
      >
        {item.quantity}
      </span>

      <button
        onClick={() => increase(item.product.id)}
        className="
          w-11
          h-11
          bg-[#AAD10A]
          text-[#0A0D0A]
          hover:bg-[#C8EE2C]
          transition
          font-bold
          text-lg
        "
      >
        +
      </button>
    </div>

    <button
      onClick={() => removeFromCart(item.product.id)}
      className="
        px-4
        py-2
        rounded-xl
        border
        border-red-200
        text-red-600
        hover:bg-red-50
        transition
        font-medium
      "
    >
      Remove
    </button>
  </div>
</div>
  );
}