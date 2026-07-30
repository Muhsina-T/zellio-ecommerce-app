import ProductGallery from "./ProductGallery";
import ReviewCard from "./ReviewCard";

import type { Product } from "../types/Product";

import useCart from "../hooks/useCart";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";


type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {

  const [added, setAdded] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(
  product.variants[0]
);

  const navigate = useNavigate();

  const { addToCart } = useCart();
  return (
    <div
  className="
  grid
  md:grid-cols-2
  gap-12
  "
>


  <ProductGallery

    variants={product.variants}

    selectedVariant={selectedVariant}

    onSelectVariant={setSelectedVariant}

  />




  <div>



    {/* Brand */}

    <span
      className="
      bg-[#AAD10A]/15
      text-[#5C8A05]
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      "
    >
      {product.brand}
    </span>






    {/* Product Name */}

    <h1
      className="
      text-5xl
      font-bold
      mt-6
      py-3
      text-[#13160F]
      "
    >
      {product.name}
    </h1>






    {/* Description */}

    <p
      className="
      text-[#7A7E73]
      mt-5
      leading-7
      py-3
      "
    >
      {product.description}
    </p>







    {/* Price */}

    <h2
      className="
      text-4xl
      font-bold
      text-[#5C8A05]
      mt-8
      py-2
      "
    >

      ₹{Number(selectedVariant.price).toLocaleString()}

    </h2>







    {/* Variant Details */}

    <div
      className="
      mt-5
      space-y-2
      text-[#3F443A]
      "
    >

      <p>
        <strong>
          Storage:
        </strong>

        {" "}

        {selectedVariant.storage}

      </p>



      <p>

        <strong>
          Colour:
        </strong>

        {" "}

        {selectedVariant.color}

      </p>


    </div>








    {/* Buttons */}

    <div
      className="
      flex
      gap-5
      mt-8
      "
    >



      <button

        onClick={() => {

          addToCart({

            ...product,

            image:selectedVariant.image,

            price:Number(selectedVariant.price),

            storage:selectedVariant.storage,

            color:selectedVariant.color,

          });


          toast.success(
            `${product.name} added to cart!`
          );


          setAdded(true);


          setTimeout(()=>{

            setAdded(false);

          },1500);


        }}


        className="
        bg-[#AAD10A]
        text-[#0A0D0A]
        px-8
        py-4
        rounded-2xl
        font-semibold
        hover:bg-[#C8EE2C]
        transition
        "
      >

        {
          added
          ?
          "✓ Added to Cart"
          :
          "Add To Cart"
        }


      </button>







      <button


        onClick={() => {


          addToCart({

            ...product,

            image:selectedVariant.image,

            price:Number(selectedVariant.price),

            storage:selectedVariant.storage,

            color:selectedVariant.color,

          });


          navigate("/checkout");


        }}



        className="
        bg-[#13160F]
        text-white
        px-8
        py-4
        rounded-2xl
        font-semibold
        hover:bg-[#3F443A]
        transition
        "

      >

        Buy Now


      </button>




    </div>







    {/* Reviews */}

    <div
      className="
      space-y-4
      mt-8
      "
    >

      {
        product.reviews.map((review)=>(

          <ReviewCard

            key={review.id}

            {...review}

          />

        ))
      }


    </div>



  </div>


</div>
  );
}
