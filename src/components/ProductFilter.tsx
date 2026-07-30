type Props = {
  brand: string;
  onChange: (value: string) => void;
};

export default function ProductFilter({
  brand,
  onChange,
}: Props) {
  return (
    <select
      value={brand}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        md:w-56
        rounded-2xl
        border
        border-[#D7D7CD]
        bg-[#FFFFFF]
        px-4
        py-3
        text-[#13160F]
        shadow-sm
        outline-none
        transition-all
        duration-200
        cursor-pointer
        hover:border-[#AAD10A]
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    >
      <option value="All">All Brands</option>
      <option value="Apple">Apple</option>
      <option value="Samsung">Samsung</option>
      <option value="Google">Google</option>
      <option value="Nothing">Nothing</option>
    </select>
  );
}