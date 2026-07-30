type InputProps = {
  type?: string;
  placeholder?: string;
};

export default function Input({
  type = "text",
  placeholder = "",
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
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
  );
}