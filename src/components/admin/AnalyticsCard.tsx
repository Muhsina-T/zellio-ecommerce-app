import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  size?: "small" | "default";
};


export default function AnalyticsCard({
  title,
  value,
  icon,
  color,
  size = "default",
}: Props) {
  const isSmall = size === "small";

  return (

    <div
      className={`
      bg-white
      rounded-3xl
      ${isSmall ? "p-2 sm:p-3" : "p-6"}
      border
      border-[#E5E5DD]
      shadow-sm
      hover:-translate-y-1
      hover:shadow-md
      transition-all
      duration-300
      `}
    >


      <div
        className={`
        flex
        ${isSmall ? "flex-col 2xl:flex-row gap-2 2xl:gap-0 items-start 2xl:items-center justify-between" : "justify-between items-center"}
        `}
      >


        <div>

          <p
            className={`
            text-[#7A7E73]
            ${isSmall ? "text-[10px] sm:text-xs" : "text-sm"}
            font-medium
            `}
          >
            {title}
          </p>


          <h2
            className={`
            ${isSmall ? "text-base sm:text-lg mt-0.5" : "text-4xl mt-3"}
            font-bold
            text-[#13160F]
            `}
          >
            {value}
          </h2>


        </div>



        <div
          className={`
          ${isSmall ? "p-2 rounded-lg" : "p-4 rounded-2xl"}
          bg-[#AAD10A]/10
          ${color}
          `}
        >

          {icon}

        </div>



      </div>


    </div>

  );
}