import { Link } from "react-router-dom";
import {
  Home,
  Heart,
  ShoppingCart,
  Package,
  User,
} from "lucide-react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileMenu({ open, setOpen }: Props) {
  const menuItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/orders", label: "Orders", icon: Package },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div
      className={`
        md:hidden
        fixed
        top-16
        left-0
        w-full
        bg-[#FFFFFF]
        border-t
        border-[#E5E5DD]
        shadow-lg
        transition-all
        duration-300
        z-40
        ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="p-5 space-y-2">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-[#3F443A]
              hover:bg-[rgba(170,209,10,0.12)]
              hover:text-[#13160F]
              transition-all
              duration-200
              group
            "
          >
            <Icon
              size={20}
              className="
                text-[#7A7E73]
                group-hover:text-[#5C8A05]
                transition-colors
              "
            />

            <span className="font-medium">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}