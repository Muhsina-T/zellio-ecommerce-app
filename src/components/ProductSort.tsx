type Props = {
  sort: string;
  onChange: (value: string) => void;
};

export default function ProductSort({
  sort,
  onChange,
}: Props) {
  return (
    <select
      value={sort}
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
        cursor-pointer
        transition-all
        duration-200
        hover:border-[#AAD10A]
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    >
      <option value="">Sort By</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
    </select>
  );
}