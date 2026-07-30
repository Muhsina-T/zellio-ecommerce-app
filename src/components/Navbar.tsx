import { useState } from "react";
import { Heart, ShoppingCart, Search, Menu, X } from "lucide-react";

import { Link } from "react-router-dom";

import MobileMenu from "./MobileMenu";

import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ search, setSearch }: Props) {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  const { cart } = useCart();

  return (
    <>
     <nav
  className="
  sticky
  top-0
  z-50
  bg-white
  border-b
  border-[#E5E5DD]
  shadow-sm
  "
>

  <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">

    <div
      className="
      h-16
      md:h-20
      flex
      items-center
      justify-between
      gap-4
      "
    >


      {/* Logo */}

      <Link
        to="/"
        className="
        text-2xl
        md:text-3xl
        font-bold
        text-[#AAD10A]
        shrink-0
        "
      >
        Zellio
      </Link>





      {/* Desktop Search */}

      <div className="hidden md:flex flex-1">


        <div className="relative w-full">


          <Search
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#7A7E73]
            "
          />



          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}


            className="
            w-full
            rounded-full
            border
            border-[#D7D7CD]
            bg-[#FAFAF7]
            py-3
            pl-12
            pr-5
            outline-none
            text-[#13160F]
            placeholder:text-[#7A7E73]
            focus:border-[#AAD10A]
            focus:ring-2
            focus:ring-[#AAD10A]/20
            transition
            "

          />


        </div>


      </div>






      {/* Right Section */}

      <div
        className="
        flex
        items-center
        gap-3
        md:gap-6
        "
      >




        {/* Wishlist */}

        <Link to="/wishlist">

          <Heart

            size={22}

            className="
            text-[#3F443A]
            hover:text-[#AAD10A]
            transition
            "

          />

        </Link>






        {/* Cart */}

        <Link to="/cart">

          <div className="relative">


            <ShoppingCart

              size={22}

              className="
              text-[#3F443A]
              hover:text-[#AAD10A]
              transition
              "

            />



            {
              cart.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-[#AAD10A]
                  text-[#0A0D0A]
                  text-[10px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  "
                >

                  {cart.length}

                </span>

              )
            }


          </div>


        </Link>







        {/* User */}

        {
          user ?

          (

            <div
              className="
              hidden
              lg:flex
              items-center
              gap-3
              "
            >

              <span
                className="
                text-[#3F443A]
                "
              >
                {user.name}
              </span>



              <button

                onClick={logout}

                className="
                text-[#3F443A]
                hover:text-[#AAD10A]
                transition
                "

              >
                Logout
              </button>


            </div>

          )


          :

          (

            <Link

              to="/login"

              className="
              hidden
              md:block
              bg-[#AAD10A]
              text-[#0A0D0A]
              px-5
              py-2
              rounded-xl
              font-semibold
              hover:bg-[#C8EE2C]
              transition
              "

            >

              Login

            </Link>


          )

        }






        {/* Mobile Menu */}

        <button

          className="md:hidden"

          onClick={()=>setOpen(!open)}

        >

          {
            open

            ?

            <X
              size={24}
              className="text-[#13160F]"
            />

            :

            <Menu
              size={24}
              className="text-[#13160F]"
            />

          }


        </button>



      </div>


    </div>






    {/* Mobile Search */}

    <div className="pb-4 md:hidden">


      <div className="relative">


        <Search

          size={18}

          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#7A7E73]
          "

        />



        <input

          type="text"

          placeholder="Search..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}


          className="
          w-full
          rounded-full
          border
          border-[#D7D7CD]
          bg-[#FAFAF7]
          py-2.5
          pl-11
          pr-4
          outline-none
          text-[#13160F]
          focus:border-[#AAD10A]
          "

        />


      </div>


    </div>


  </div>


</nav>


<MobileMenu
  open={open}
  setOpen={setOpen}
/>
    </>
  );
}
