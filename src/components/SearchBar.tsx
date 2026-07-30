import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#7A7E73]
        "
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search mobiles..."
        className="
          w-full
          rounded-2xl
          border
          border-[#D7D7CD]
          bg-[#FFFFFF]
          py-3
          pl-12
          pr-4
          text-[#13160F]
          placeholder:text-[#7A7E73]
          shadow-sm
          outline-none
          transition-all
          duration-200
          hover:border-[#AAD10A]
          focus:border-[#AAD10A]
          focus:ring-4
          focus:ring-[rgba(170,209,10,0.18)]
        "
      />
    </div>
  );
}