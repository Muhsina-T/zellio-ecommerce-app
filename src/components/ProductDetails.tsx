import ProductGallery from "./ProductGallery";
import ReviewCard from "./ReviewCard";

import type { Product, Variant } from "../types/Product";

import useCart from "../hooks/useCart";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const [added, setAdded] = useState(false);

  const initialVariant: Variant = product.variants?.[0] ?? {
    id: Number(product.id ?? 0),
    storage: product.storage,
    color: product.color,
    price: product.price,
    image: product.image,
  };

  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant);

  const navigate = useNavigate();

  const { addToCart } = useCart();
  const reviews = product.reviews ?? [];
  return (
    <div
      className="
  grid
  md:grid-cols-2
  gap-12
  "
    >
      <ProductGallery
        variants={product.variants || []}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
      />

      <div>
        {/* Brand */}

        <span
          className="
      bg-[#AAD10A]/15
      text-[#5C8A05]
      px-3
      py-1
      lg:px-4
      lg:py-2
      rounded-full
      text-xs
      lg:text-sm
      font-semibold
      "
        >
          {product.brand}
        </span>

        {/* Product Name */}

        <h1
          className="
      text-3xl
      lg:text-5xl
      font-bold
      mt-4
      lg:mt-6
      py-1
      lg:py-3
      text-[#13160F]
      "
        >
          {product.name}
        </h1>

        {/* Description */}

        <p
          className="
      text-[#7A7E73]
      text-sm
      lg:text-base
      mt-3
      lg:mt-5
      leading-6
      lg:leading-7
      py-1
      lg:py-3
      "
        >
          {product.description}
        </p>

        {/* Price */}

        <h2
          className="
      text-2xl
      lg:text-4xl
      font-bold
      text-[#5C8A05]
      mt-4
      lg:mt-8
      py-1
      lg:py-2
      "
        >
          ₹{Number(selectedVariant?.price || product.price).toLocaleString()}
        </h2>

        {/* Variant Details */}

        <div
          className="
      mt-4
      lg:mt-5
      space-y-1
      lg:space-y-2
      text-sm
      lg:text-base
      text-[#3F443A]
      "
        >
          <p>
            <strong>Storage:</strong>{" "}
            {selectedVariant?.storage || product.storage}
          </p>

          <p>
            <strong>Colour:</strong> {selectedVariant?.color || product.color}
          </p>
        </div>

        {/* Buttons */}

        <div
          className="
      flex
      gap-3
      lg:gap-5
      mt-6
      lg:mt-8
      "
        >
          <button
            onClick={() => {
              addToCart({
                ...product,

                image: selectedVariant.image,

                price: Number(selectedVariant.price),

                storage: selectedVariant.storage,

                color: selectedVariant.color,
              });

              toast.success(`${product.name} added to cart!`);

              setAdded(true);

              setTimeout(() => {
                setAdded(false);
              }, 1500);
            }}
            className="
        bg-[#AAD10A]
        text-[#0A0D0A]
        px-4
        py-3
        lg:px-8
        lg:py-4
        rounded-xl
        lg:rounded-2xl
        font-semibold
        text-sm
        lg:text-base
        hover:bg-[#C8EE2C]
        transition
        flex-1
        "
          >
            {added ? "✓ Added to Cart" : "Add To Cart"}
          </button>

          <button
            onClick={() => {
              addToCart({
                ...product,

                image: selectedVariant.image,

                price: Number(selectedVariant.price),

                storage: selectedVariant.storage,

                color: selectedVariant.color,
              });

              navigate("/checkout");
            }}
            className="
        bg-[#13160F]
        text-white
        px-4
        py-3
        lg:px-8
        lg:py-4
        rounded-xl
        lg:rounded-2xl
        font-semibold
        text-sm
        lg:text-base
        hover:bg-[#3F443A]
        transition
        flex-1
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
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review._id || review.id} {...review} />
            ))
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
