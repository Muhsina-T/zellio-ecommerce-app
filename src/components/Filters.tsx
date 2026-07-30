type Props = {
  brand: string;
  setBrand: (brand: string) => void;
  sort: string;
  setSort: (sort: string) => void;
};

export default function Filters({
  brand,
  setBrand,
  sort,
  setSort,
}: Props) {
  return (
    <div className="space-y-6 mb-8">
  {/* Brand */}
  <div>
    <h3 className="text-sm font-semibold text-[#7A7E73] uppercase tracking-wide mb-3">
      Brand
    </h3>

    <select
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="
        w-full
        rounded-2xl
        border
        border-[#D7D7CD]
        bg-[#FFFFFF]
        px-4
        py-3
        text-[#13160F]
        shadow-sm
        transition-all
        duration-200
        focus:outline-none
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    >
      <option value="All">All Brands</option>
      <option value="Apple">Apple</option>
      <option value="Samsung">Samsung</option>
      <option value="OnePlus">OnePlus</option>
      <option value="Xiaomi">Xiaomi</option>
    </select>
  </div>

  {/* Sort */}
  <div>
    <h3 className="text-sm font-semibold text-[#7A7E73] uppercase tracking-wide mb-3">
      Sort By
    </h3>

    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="
        w-full
        rounded-2xl
        border
        border-[#D7D7CD]
        bg-[#FFFFFF]
        px-4
        py-3
        text-[#13160F]
        shadow-sm
        transition-all
        duration-200
        focus:outline-none
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    >
      <option value="">Default</option>
      <option value="low">Price: Low → High</option>
      <option value="high">Price: High → Low</option>
    </select>
  </div>
</div>
  );
}