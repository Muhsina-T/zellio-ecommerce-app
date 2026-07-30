import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-4
      "
    >

      <div
        className="
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          p-10
          shadow-sm
        "
      >

        <h1
          className="
            text-8xl
            font-bold
            text-[#13160F]
          "
        >
          404
        </h1>


        <p
          className="
            mt-4
            text-[#7A7E73]
            text-lg
          "
        >
          Page Not Found
        </p>



        <Link
          to="/"
          className="
            inline-flex
            mt-8
            bg-[#AAD10A]
            text-[#0A0D0A]
            px-6
            py-3
            rounded-2xl
            font-semibold
            hover:bg-[#C8EE2C]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          Go Home
        </Link>


      </div>


    </div>
  );
}