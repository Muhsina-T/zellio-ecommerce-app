export default function Skeleton() {
  return (
    <div className="animate-pulse">
      {/* Product Image */}
      <div
        className="
          h-56
          rounded-3xl
          bg-[#F2F2EC]
          border
          border-[#E5E5DD]
        "
      />

      {/* Product Title */}
      <div
        className="
          h-6
          mt-5
          w-3/4
          rounded-lg
          bg-[#E5E5DD]
        "
      />

      {/* Subtitle */}
      <div
        className="
          h-4
          mt-3
          w-2/3
          rounded-lg
          bg-[#E5E5DD]
        "
      />

      {/* Button */}
      <div
        className="
          h-11
          mt-5
          rounded-2xl
          bg-[#D7D7CD]
        "
      />
    </div>
  );
}