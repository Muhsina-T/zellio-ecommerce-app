import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Variant } from "../types/Product";

type Props = {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: Dispatch<SetStateAction<Variant>>;
};

export default function ProductGallery({
  variants,
  selectedVariant,
  onSelectVariant,
}: Props) {
  const [active, setActive] = useState(selectedVariant.image);

  useEffect(() => {
    setActive(selectedVariant.image);
  }, [selectedVariant.image]);

  return (
    <div>
      {/* Main Image */}
      <div
        className="
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          p-6
          shadow-sm
        "
      >
        <img
          src={active}
          alt="Product"
          className="
            w-full
            h-[450px]
            object-contain
          "
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-4 mt-6">
        {variants.map((variant) => {
          const isActive = active === variant.image;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => {
                setActive(variant.image);
                onSelectVariant(variant);
              }}
              className={`
                w-20
                h-20
                rounded-2xl
                overflow-hidden
                border-2
                transition-all
                duration-200
                bg-[#F2F2EC]
                shadow-sm
                ${
                  isActive
                    ? "border-[#AAD10A] ring-4 ring-[rgba(170,209,10,0.18)]"
                    : "border-[#E5E5DD] hover:border-[#AAD10A]"
                }
              `}
            >
              <img
                src={variant.image}
                alt=""
                className="w-full h-full object-contain p-2"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}