import { Heart, Star } from "lucide-react";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const isLiked = wishlist.some((p) => p._id === product._id);

  const imageSrc =
  product.image ||
  product.images?.[0] ||
  `${import.meta.env.BASE_URL}images/Iphone16.png`;

  
  return (
    <div
  onClick={() => navigate(`/product/${product._id || product.id}`)}
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
  p-3
  lg:p-4
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
      text-[10px]
      font-semibold
      px-2.5
      py-0.5
      rounded-full
      "
    >
      {product.brand}
    </span>




    <button
      onClick={(e)=>{

        e.stopPropagation();
        
        if (!user) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        toggleWishlist(product);

      }}

      className={`
      h-8
      w-8
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

      <Heart size={16}/>

    </button>


  </div>






  {/* Product Image */}

  <img

    src={imageSrc}

    alt={product.name}

    className="
    mx-auto
    h-32
    lg:h-44
    object-contain
    group-hover:scale-105
    transition
    duration-300
    "

  />






  {/* Content Area */}
  <div className="mt-2 px-1">
    
    {/* Row 1: Name and Price */}
    <div className="flex justify-between items-start gap-2">
      <h3 className="text-[13px] sm:text-sm lg:text-base text-[#13160F] font-bold line-clamp-2 leading-tight">
        {product.name}
      </h3>
      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-[#5C8A05] whitespace-nowrap shrink-0">
        ₹{product.price.toLocaleString()}
      </h2>
    </div>

    {/* Row 2: Details and Rating */}
    <div className="flex justify-between items-center mt-1.5 lg:mt-2.5">
      <p className="text-[10px] sm:text-xs lg:text-sm text-[#7A7E73] truncate pr-2">
        {product.storage} • {product.color}
      </p>
      
      <div className="flex items-center gap-1 shrink-0 bg-[#F5F5F0] px-1.5 py-0.5 rounded-md lg:px-2 lg:py-1">
        <Star size={10} className="fill-[#B88A2D] text-[#B88A2D] lg:w-3.5 lg:h-3.5" />
        <span className="text-[10px] sm:text-xs lg:text-sm text-[#3F443A] font-medium">
          {product.rating}
        </span>
      </div>
    </div>

  </div>




</div>
  );
}
