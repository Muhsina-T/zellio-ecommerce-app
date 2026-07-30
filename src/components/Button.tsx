type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  text,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        px-6
        py-3
        rounded-2xl
        bg-[#AAD10A]
        text-[#0A0D0A]
        font-semibold
        border
        border-[#AAD10A]
        shadow-sm
        transition-all
        duration-300
        hover:bg-[#C8EE2C]
        hover:border-[#C8EE2C]
        hover:-translate-y-0.5
        hover:shadow-md
        active:translate-y-0
        focus:outline-none
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:shadow-sm
        ${className}
      `}
    >
      {text}
    </button>
  );
}