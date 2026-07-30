import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      name: "Returns",
      icon: RotateCcw,
      path: "/admin/returns",
    },
  ];


  return (
    <>


      {/* Desktop Sidebar */}

      <aside
        className="
        hidden
        lg:flex
        w-64
        min-h-screen
        bg-white
        border-r
        border-[#E5E5DD]
        p-6
        flex-col
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-[#AAD10A]
          mb-12
          "
        >
          Zellio
        </h1>


        <nav className="space-y-3">

          {
            menus.map(menu => {

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
                    px-5
                    py-4
                    rounded-2xl
                    transition-all
                    duration-300

                    ${
                      isActive
                      ?
                      "bg-[#AAD10A] text-[#0A0D0A]"
                      :
                      "text-[#7A7E73] hover:bg-[#F2F2EC]"
                    }
                    `
                  }
                >

                  <Icon size={22}/>

                  <span>
                    {menu.name}
                  </span>


                </NavLink>

              )

            })
          }

        </nav>


        <div
          className="
          mt-auto
          bg-[#F2F2EC]
          rounded-3xl
          p-5
          "
        >

          <p className="text-sm text-[#7A7E73]">
            Admin Mode
          </p>

          <h3 className="font-bold mt-2 text-[#13160F]">
            Control Center
          </h3>

        </div>


      </aside>





      {/* Mobile Bottom Menu */}

      <div
        className="
        lg:hidden
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-[#E5E5DD]
        px-4
        py-3
        z-50
        "
      >

        <nav
          className="
          flex
          justify-around
          "
        >

          {
            menus.map(menu => {

              const Icon = menu.icon;


              return (

                <NavLink
                  key={menu.name}
                  to={menu.path}

                  className={({isActive}) =>

                  `
                  flex
                  flex-col
                  items-center
                  gap-1
                  text-xs
                  transition

                  ${
                    isActive
                    ?
                    "text-[#5C8A05]"
                    :
                    "text-[#7A7E73]"
                  }

                  `
                  }

                >

                  <Icon size={22}/>

                  <span>
                    {menu.name}
                  </span>


                </NavLink>


              )

            })
          }


        </nav>

      </div>


    </>
  );
}