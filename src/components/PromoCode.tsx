import { useState } from "react";

type Props = {
  setDiscount: (value: number) => void;
};

export default function PromoCode({ setDiscount }: Props) {
  const [code, setCode] = useState("");

  function apply() {
    if (code.trim().toUpperCase() === "ZELLIO10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter promo code"
        className="
          flex-1
          px-4
          py-3
          rounded-2xl
          bg-[#FFFFFF]
          border
          border-[#D7D7CD]
          text-[#13160F]
          placeholder:text-[#7A7E73]
          shadow-sm
          outline-none
          transition-all
          duration-200
          focus:border-[#AAD10A]
          focus:ring-4
          focus:ring-[rgba(170,209,10,0.18)]
        "
      />

      <button
        onClick={apply}
        className="
          px-6
          py-3
          rounded-2xl
          bg-[#AAD10A]
          border
          border-[#AAD10A]
          text-[#0A0D0A]
          font-semibold
          shadow-sm
          transition-all
          duration-300
          hover:bg-[#C8EE2C]
          hover:border-[#C8EE2C]
          hover:-translate-y-0.5
          hover:shadow-md
          active:translate-y-0
        "
      >
        Apply
      </button>
    </div>
  );
}