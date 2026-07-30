import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
};


export default function AnalyticsCard({
  title,
  value,
  icon,
  color,
}: Props) {

  return (

    <div
      className="
      bg-white
      rounded-3xl
      p-6
      border
      border-[#E5E5DD]
      shadow-sm
      hover:-translate-y-1
      hover:shadow-md
      transition-all
      duration-300
      "
    >


      <div
        className="
        flex
        justify-between
        items-center
        "
      >


        <div>

          <p
            className="
            text-[#7A7E73]
            text-sm
            font-medium
            "
          >
            {title}
          </p>


          <h2
            className="
            text-4xl
            font-bold
            mt-3
            text-[#13160F]
            "
          >
            {value}
          </h2>


        </div>



        <div
          className={`
          p-4
          rounded-2xl
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