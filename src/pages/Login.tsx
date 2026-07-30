import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock, Smartphone } from "lucide-react";

import { loginSchema, type LoginFormData } from "../utils/loginSchema";
import { loginUser } from "../services/auth";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    try {
      const user = loginUser(data.email, data.password);

      setUser(user);

      navigate(user.role === "admin" ? "/dashboard" : "/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <div className="
  min-h-screen
  bg-[#FAFAF7]
  flex
  items-center
  justify-center
  p-6
">

  <div className="
    w-full
    max-w-6xl
    bg-[#FFFFFF]
    rounded-3xl
    border
    border-[#E5E5DD]
    shadow-xl
    overflow-hidden
    grid
    lg:grid-cols-2
  ">

    {/* LEFT */}

    <div className="
      hidden
      lg:flex
      flex-col
      justify-center
      bg-[#13160F]
      text-white
      p-14
    ">

      <div className="flex items-center gap-3 mb-8">
        <Smartphone
          size={40}
          className="text-[#AAD10A]"
        />

        <h1 className="text-4xl font-bold">
          Zellio
        </h1>
      </div>


      <h2 className="
        text-5xl
        font-bold
        leading-tight
        mb-6
      ">
        Welcome Back
      </h2>


      <p className="
        text-[#D7D7CD]
        text-lg
        leading-8
      ">
        Shop the latest smartphones from Apple, Samsung,
        OnePlus, Xiaomi and more with amazing offers and
        fast delivery.
      </p>


      <img
        src="../images/transparent-image.png"
        alt="Smartphone"
        className="
          w-80
          mx-auto
          mt-14
        "
      />

    </div>


    {/* RIGHT */}

    <div className="
      flex
      items-center
      justify-center
      p-8
      md:p-14
    ">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md"
      >

        <h2 className="
          text-4xl
          font-bold
          text-[#13160F]
        ">
          Login
        </h2>


        <p className="
          text-[#7A7E73]
          mt-2
          mb-8
        ">
          Sign in to continue shopping.
        </p>


        {error && (
          <div className="
            bg-red-50
            text-red-600
            border
            border-red-200
            p-3
            rounded-2xl
            mb-6
          ">
            {error}
          </div>
        )}


        {/* Email */}

        <label className="
          font-medium
          text-[#3F443A]
        ">
          Email Address
        </label>


        <div className="relative mt-2 mb-1">

          <Mail
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
            {...register("email")}
            placeholder="Enter your email"
            className="
              w-full
              border
              border-[#D7D7CD]
              rounded-2xl
              py-3
              pl-12
              pr-4
              text-[#13160F]
              outline-none
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
          />

        </div>


        <p className="text-red-500 text-sm mb-5">
          {errors.email?.message}
        </p>


        {/* Password */}

        <label className="
          font-medium
          text-[#3F443A]
        ">
          Password
        </label>


        <div className="relative mt-2 mb-1">

          <Lock
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
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="
              w-full
              border
              border-[#D7D7CD]
              rounded-2xl
              py-3
              pl-12
              pr-4
              text-[#13160F]
              outline-none
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
          />

        </div>


        <p className="text-red-500 text-sm mb-6">
          {errors.password?.message}
        </p>


        <div className="flex justify-end mb-6">
          <button
            type="button"
            className="
              text-[#5C8A05]
              hover:underline
              text-sm
            "
          >
            Forgot Password?
          </button>
        </div>


        {/* Login Button */}

        <button
          className="
            w-full
            bg-[#AAD10A]
            hover:bg-[#C8EE2C]
            text-[#0A0D0A]
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-300
            shadow-sm
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          Login
        </button>


        {/* Divider */}

        <div className="flex items-center my-8">

          <div className="
            flex-1
            h-px
            bg-[#E5E5DD]
          "/>

          <span className="
            mx-4
            text-[#7A7E73]
            text-sm
          ">
            OR
          </span>

          <div className="
            flex-1
            h-px
            bg-[#E5E5DD]
          "/>

        </div>


        {/* Google */}

        <button
          type="button"
          className="
            w-full
            border
            border-[#D7D7CD]
            rounded-2xl
            py-3
            text-[#13160F]
            hover:bg-[#F2F2EC]
            transition
            font-medium
          "
        >
          Continue with Google
        </button>


        <p className="
          text-center
          mt-8
          text-[#7A7E73]
        ">
          Don't have an account?

          <Link
            to="/signup"
            className="
              ml-2
              font-semibold
              text-[#5C8A05]
              hover:underline
            "
          >
            Sign Up
          </Link>

        </p>


      </form>

    </div>

  </div>

</div>
  );
}