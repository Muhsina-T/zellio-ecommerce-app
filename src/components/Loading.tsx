export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#E5E5DD]" />

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-[#AAD10A]
            border-t-transparent
            animate-spin
          "
        />
      </div>
    </div>
  );
}