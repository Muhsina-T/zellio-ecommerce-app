import ProductGrid from "../components/ProductGrid";
import useWishlist from "../hooks/useWishlist";

import { motion } from "framer-motion";


export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (

    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        p-4
        sm:p-6
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}
        className="
          max-w-[1200px]
          mx-auto
        "
      >


        <h1
          className="
            text-3xl
            lg:text-4xl
            font-bold
            text-[#13160F]
            mb-8
          "
        >
          Your Wishlist
        </h1>



        {wishlist.length === 0 ? (

          <div
            className="
              bg-[#FFFFFF]
              border
              border-[#E5E5DD]
              rounded-3xl
              p-10
              text-center
              shadow-sm
            "
          >

            <p
              className="
                text-lg
                text-[#7A7E73]
              "
            >
              Your wishlist is empty.
            </p>


          </div>


        ) : (

          <ProductGrid products={wishlist} />

        )}


      </motion.div>


    </div>

  );
}