import { Home, Heart, Package, RotateCcw } from "lucide-react";
import { NavLink } from "react-router-dom";

import Filters from "./Filters";

type Props = {
  brand?: string;
  setBrand?: (brand: string) => void;
  sort?: string;
  setSort?: (sort: string) => void;
};

export default function Sidebar({
  brand = "All",
  setBrand,
  sort = "",
  setSort,
}: Props) {
  const menus = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Wishlist", icon: Heart, path: "/wishlist" },
    { name: "Orders", icon: Package, path: "/orders" },
    { name: "Returns", icon: RotateCcw, path: "/returns" },
  ];

  return (
   <aside
  className="
  hidden
  lg:block
  w-64
  bg-white
  min-h-screen
  p-6
  border-r
  border-[#E5E5DD]
  "
>


  <nav
    className="
    space-y-3
    "
  >

    {
      menus.map((menu)=>{

        const Icon = menu.icon;


        return (

          <NavLink

            key={menu.name}

            to={menu.path}


            className={({isActive}) =>

              `
              flex
              items-center
              gap-4
              p-3
              rounded-xl
              transition-all
              duration-300

              ${
                isActive

                ?

                "bg-[#AAD10A] text-[#0A0D0A] font-semibold"

                :

                "text-[#3F443A] hover:bg-[#F2F2EC]"
              }

              `

            }

          >


            <Icon size={20}/>


            <span
              className="
              font-medium
              "
            >
              {menu.name}
            </span>


          </NavLink>

        );

      })
    }


  </nav>






  {
    (setBrand || setSort) && (

      <div
        className="
        mt-6
        border-t
        border-[#E5E5DD]
        pt-6
        "
      >

        <Filters

          brand={brand}

          setBrand={
            setBrand ?? (()=>{})
          }

          sort={sort}

          setSort={
            setSort ?? (()=>{})
          }

        />


      </div>

    )
  }




</aside>
  );
}