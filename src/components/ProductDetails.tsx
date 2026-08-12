import ProductGallery from "./ProductGallery";
// import ReviewCard from "./ReviewCard";

import type { Product, Variant } from "../types/Product";

import useCart from "../hooks/useCart";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import useAuth from "../hooks/useAuth";

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
    costPrice: product.costPrice,
    price: product.price,
    image: product.image,
  };

  const [selectedVariant, setSelectedVariant] =
    useState<Variant>(initialVariant);

  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();
  const isOutOfStock = Number(product.stock || 0) <= 0;

  // const reviews = product.reviews ?? [];
  return (
    <div
      className="
  grid
  md:grid-cols-2
  gap-12
  "
    >
      <ProductGallery
        variants={
          product.variants?.length ? product.variants : [initialVariant]
        }
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

        {isOutOfStock && (
          <div className="mt-4">
            <span
              className="
        inline-flex
        items-center
        rounded-full
        bg-red-50
        border
        border-red-200
        px-4
        py-2
        text-sm
        font-semibold
        text-red-600
      "
            >
              Out of Stock
            </span>
          </div>
        )}

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

        {/* <div className="mt-4">
          {isOutOfStock ? (
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold">
              Out of Stock
            </span>
          ) : (
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
              In Stock
            </span>
          )}
        </div> */}

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
            disabled={isOutOfStock}
            onClick={() => {
              if (isOutOfStock) {
                toast.error("This product is out of stock");
                return;
              }

              if (!user) {
                toast.error("Please login first");
                navigate("/login");
                return;
              }

              addToCart(
                {
                  ...product,
                  image: selectedVariant.image,
                  price: Number(selectedVariant.price),
                  storage: selectedVariant.storage,
                  color: selectedVariant.color,
                },
                selectedVariant.id,
              );

              toast.success(`${product.name} added to cart!`);

              setAdded(true);

              setTimeout(() => {
                setAdded(false);
              }, 1500);
            }}
            className={`
    px-4
    py-3
    lg:px-8
    lg:py-4
    rounded-xl
    lg:rounded-2xl
    font-semibold
    text-sm
    lg:text-base
    transition
    flex-1

    ${
      isOutOfStock
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#AAD10A] text-[#0A0D0A] hover:bg-[#C8EE2C]"
    }
  `}
          >
            {isOutOfStock
              ? "Out of Stock"
              : added
                ? "✓ Added to Cart"
                : "Add To Cart"}
          </button>

          <button
            disabled={isOutOfStock}
            onClick={() => {
              if (isOutOfStock) {
                toast.error("This product is out of stock");
                return;
              }

              if (!user) {
                toast.error("Please login first");
                navigate("/login");
                return;
              }

              addToCart(
                {
                  ...product,
                  image: selectedVariant.image,
                  price: Number(selectedVariant.price),
                  storage: selectedVariant.storage,
                  color: selectedVariant.color,
                },
                selectedVariant.id,
              );

              navigate("/checkout");
            }}
            className={`
    px-4
    py-3
    lg:px-8
    lg:py-4
    rounded-xl
    lg:rounded-2xl
    font-semibold
    text-sm
    lg:text-base
    transition
    flex-1

    ${
      isOutOfStock
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#13160F] text-white hover:bg-[#3F443A]"
    }
  `}
          >
            {isOutOfStock ? "Buy Now" : "Buy Now"}
          </button>
        </div>

        {/* Reviews */}

        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}
