import { User, Mail, Phone, Shield } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div
       className="
    min-h-screen
    bg-[#FAFAF7]
    px-4
    py-10
    flex
    items-center
    justify-center"

      >
        <div
         className="
    w-full
    max-w-3xl
    bg-[#FFFFFF]
    border
    border-[#E5E5DD]
    rounded-3xl
    shadow-sm
    p-6
    sm:p-10
  "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-[#13160F]
              mb-4
            "
          >
            Please Login
          </h2>


          <p
            className="
              text-[#7A7E73]
              mb-6
            "
          >
            Login to view your profile details.
          </p>


          <Link
            to="/login"
            className="
              inline-flex
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
            Login
          </Link>

        </div>
      </div>
    );
  }


  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        px-4
        py-10
      "
    >

      <div
        className="
          max-w-3xl
          mx-auto
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          shadow-sm
          p-6
          sm:p-10
        "
      >

        {/* Profile Header */}

        <div className="flex flex-col items-center text-center">


          <div
            className="
              w-24
              h-24
              rounded-full
              bg-[rgba(170,209,10,0.12)]
              flex
              items-center
              justify-center
            "
          >
            <User
              size={45}
              className="text-[#5C8A05]"
            />
          </div>



          <h1
            className="
              text-3xl
              font-bold
              text-[#13160F]
              mt-5
            "
          >
            {user.name}
          </h1>


          <p className="text-[#7A7E73] mt-2">
            Zellio Customer
          </p>


        </div>




        {/* Details */}

        <div className="mt-10 space-y-5">


          <div
            className="
              flex
              items-center
              gap-4
              bg-[#F2F2EC]
              border
              border-[#E5E5DD]
              rounded-2xl
              p-4
            "
          >

            <Mail
              className="text-[#5C8A05]"
            />

            <div>

              <p className="text-sm text-[#7A7E73]">
                Email
              </p>

              <p className="font-semibold text-[#3F443A]">
                {user.email}
              </p>

            </div>

          </div>




          <div
            className="
              flex
              items-center
              gap-4
              bg-[#F2F2EC]
              border
              border-[#E5E5DD]
              rounded-2xl
              p-4
            "
          >

            <Phone
              className="text-[#5C8A05]"
            />

            <div>

              <p className="text-sm text-[#7A7E73]">
                Phone
              </p>

              <p className="font-semibold text-[#3F443A]">
                {user.phone || "Not added"}
              </p>

            </div>

          </div>




          <div
            className="
              flex
              items-center
              gap-4
              bg-[#F2F2EC]
              border
              border-[#E5E5DD]
              rounded-2xl
              p-4
            "
          >

            <Shield
              className="text-[#5C8A05]"
            />


            <div>

              <p className="text-sm text-[#7A7E73]">
                Account Status
              </p>


              <p className="font-semibold text-[#5C8A05]">
                Active
              </p>


            </div>

          </div>


        </div>




        {/* Actions */}

        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <button
            onClick={logout}
            className="
              flex-1
              bg-red-50
              border
              border-red-200
              text-red-600
              py-3
              rounded-2xl
              font-semibold
              hover:bg-red-100
              transition-all
            "
          >
            Logout
          </button>


        </div>


      </div>

    </div>
  );
}