import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
  className="
  bg-white
  border-t
  border-[#E5E5DD]
  mt-20
  "
>

  <div
    className="
    max-w-8xl
    mx-auto
    px-4
    md:px-12
    py-8
    lg:py-12
    "
  >


    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-4
      gap-6
      lg:gap-10
      "
    >



      {/* Brand */}

      <div className="mb-4 lg:mb-0">


        <h2
          className="
          text-2xl
          lg:text-3xl
          font-bold
          text-[#AAD10A]
          "
        >
          Zellio
        </h2>



        <p
          className="
          mt-3
          lg:mt-4
          text-[#7A7E73]
          text-sm
          lg:text-base
          leading-6
          lg:leading-7
          "
        >
          Discover the latest smartphones, accessories, and premium
          gadgets at unbeatable prices.
        </p>


      </div>





      {/* Rest of the links in a row on mobile */}
      <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-10 lg:col-span-3">


      {/* Quick Links */}

      <div>


        <h3
          className="
          text-base
          lg:text-lg
          font-semibold
          text-[#13160F]
          mb-3
          lg:mb-4
          "
        >
          Quick Links
        </h3>



        <div className="flex flex-col gap-3">


          {
            [
              ["Home","/"],
              ["Wishlist","/wishlist"],
              ["Cart","/cart"],
              ["Orders","/orders"]
            ].map(([name,path])=>(


              <Link

                key={name}

                to={path}

                className="
                text-[#7A7E73]
                text-sm
                lg:text-base
                hover:text-[#AAD10A]
                transition
                "

              >

                {name}

              </Link>


            ))
          }


        </div>


      </div>







      {/* Support */}

      <div>


        <h3
          className="
          text-base
          lg:text-lg
          font-semibold
          text-[#13160F]
          mb-3
          lg:mb-4
          "
        >
          Support
        </h3>




        <div className="space-y-4">


          <div
            className="
            flex
            items-center
            gap-3
            text-[#7A7E73]
            text-sm
            lg:text-base
            "
          >

            <Mail
              size={18}
              className="text-[#AAD10A]"
            />

            <span>
              support@zellio.com
            </span>

          </div>




          <div
            className="
            flex
            items-center
            gap-3
            text-[#7A7E73]
            text-sm
            lg:text-base
            "
          >

            <Phone
              size={18}
              className="text-[#AAD10A]"
            />

            <span>
              +91 98765 43210
            </span>

          </div>




          <div
            className="
            flex
            items-start
            gap-3
            text-[#7A7E73]
            text-sm
            lg:text-base
            "
          >

            <MapPin
              size={18}
              className="
              text-[#AAD10A]
              mt-1
              "
            />

            <span>
              Kerala, India
            </span>

          </div>



        </div>


      </div>







      {/* Social */}

      <div>


        <h3
          className="
          text-base
          lg:text-lg
          font-semibold
          text-[#13160F]
          mb-3
          lg:mb-4
          "
        >
          Follow Us
        </h3>




        <div className="flex gap-4">



          <a
            href="#"
            className="
            w-9
            h-9
            lg:w-11
            lg:h-11
            rounded-full
            bg-[#F2F2EC]
            hover:bg-[#AAD10A]
            hover:text-[#0A0D0A]
            transition
            flex
            items-center
            justify-center
            "
          >

            <FaFacebookF size={16} className="lg:w-[18px] lg:h-[18px]" />

          </a>





          <a
            href="#"
            className="
            w-9
            h-9
            lg:w-11
            lg:h-11
            rounded-full
            bg-[#F2F2EC]
            hover:bg-[#AAD10A]
            hover:text-[#0A0D0A]
            transition
            flex
            items-center
            justify-center
            "
          >

            <FaInstagram size={16} className="lg:w-[18px] lg:h-[18px]" />

          </a>





          <a
            href="#"
            className="
            w-9
            h-9
            lg:w-11
            lg:h-11
            rounded-full
            bg-[#F2F2EC]
            hover:bg-[#AAD10A]
            hover:text-[#0A0D0A]
            transition
            flex
            items-center
            justify-center
            "
          >

            <FaXTwitter size={16} className="lg:w-[18px] lg:h-[18px]" />

          </a>



        </div>


      </div>




      </div>
      </div>







    {/* Bottom */}

    <div
      className="
      border-t
      border-[#E5E5DD]
      mt-10
      pt-6
      flex
      flex-col
      md:flex-row
      justify-between
      items-center
      gap-4
      "
    >



      <p
        className="
        text-[#7A7E73]
        text-xs
        lg:text-sm
        text-center
        md:text-left
        "
      >
        © 2026 Zellio. All Rights Reserved.
      </p>





      <div
        className="
        flex
        flex-wrap
        justify-center
        gap-4
        lg:gap-6
        text-xs
        lg:text-sm
        "
      >


        {
          [
            ["Privacy Policy","/privacy"],
            ["Terms & Conditions","/terms"],
            ["Contact Us","/contact"]
          ].map(([name,path])=>(


            <Link

              key={name}

              to={path}

              className="
              text-[#7A7E73]
              hover:text-[#AAD10A]
              transition
              "

            >

              {name}

            </Link>


          ))
        }


      </div>



    </div>


  </div>


</footer>
  );
}