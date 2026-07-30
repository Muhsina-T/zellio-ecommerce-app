import { Heart, Star } from "lucide-react";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  const isLiked = wishlist.some((p) => p.id === product.id);

  const imageSrc =
  product.image ||
  product.images?.[0] ||
  `${import.meta.env.BASE_URL}images/Iphone16.png`;

  
  return (
    <div
  onClick={() => navigate(`/product/${product.id}`)}
  className="
  group
  bg-white
  rounded-3xl
  overflow-hidden
  border
  border-[#E5E5DD]
  shadow-sm
  hover:shadow-xl
  hover:-translate-y-1
  transition-all
  duration-300
  cursor-pointer
  px-6
  py-5
  "
>


  {/* Top Section */}

  <div
    className="
    flex
    justify-between
    items-center
    "
  >


    <span
      className="
      inline-block
      bg-[#AAD10A]/15
      text-[#5C8A05]
      text-xs
      font-semibold
      px-3
      py-1
      rounded-full
      "
    >
      {product.brand}
    </span>




    <button
      onClick={(e)=>{

        e.stopPropagation();
        toggleWishlist(product);

      }}

      className={`
      h-10
      w-10
      rounded-full
      bg-[#FAFAF7]
      border
      border-[#E5E5DD]
      flex
      items-center
      justify-center
      hover:bg-[#AAD10A]/10
      transition

      ${
        isLiked
        ?
        "text-rose-500"
        :
        "text-[#7A7E73]"
      }

      `}
      
      aria-label="toggle-wishlist"
    >

      <Heart size={18}/>

    </button>


  </div>






  {/* Product Image */}

  <img

    src={imageSrc}

    alt={product.name}

    className="
    mx-auto
    h-56
    object-contain
    group-hover:scale-105
    transition
    duration-300
    "

  />






  {/* Product Name */}

  <h3
    className="
    text-xl
    text-[#13160F]
    font-semibold
    px-2
    "
  >

    {product.name}

  </h3>





  {/* Details */}

  <p
    className="
    mt-2
    text-[#7A7E73]
    px-2
    "
  >

    {product.storage} • {product.color}

  </p>







  {/* Rating */}

  <div
    className="
    mt-3
    flex
    items-center
    gap-2
    px-2
    "
  >

    <Star
      size={18}
      className="
      fill-[#B88A2D]
      text-[#B88A2D]
      "
    />

    <span
      className="
      text-[#3F443A]
      font-medium
      "
    >

      {product.rating}

    </span>


  </div>






  {/* Price */}

  <div
    className="
    mt-5
    flex
    items-center
    justify-between
    "
  >


    <h2
      className="
      text-2xl
      font-bold
      text-[#5C8A05]
      px-2
      "
    >

      ₹{product.price.toLocaleString()}

    </h2>



  </div>




</div>
  );
}
