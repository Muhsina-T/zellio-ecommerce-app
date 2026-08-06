import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  signupSchema,
  type SignupFormData,
} from "../utils/signupSchema";

import { registerUser } from "../services/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupFormData) {
    try {
      await registerUser(
        data.name,
        data.email,
        data.password
      );

      alert("Account created successfully");

      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <div
  className="
    min-h-screen
    bg-[#FAFAF7]
    flex
    justify-center
    items-center
    px-4
  "
>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="
      bg-[#FFFFFF]
      border
      border-[#E5E5DD]
      p-8
      rounded-3xl
      shadow-sm
      w-full
      max-w-[400px]
    "
  >

    <h1
      className="
        text-3xl
        font-bold
        text-[#13160F]
        mb-8
      "
    >
      Create Account
    </h1>



    {error && (
      <p
        className="
          bg-red-50
          border
          border-red-200
          text-red-600
          p-3
          rounded-2xl
          mb-5
        "
      >
        {error}
      </p>
    )}



    <input
      {...register("name")}
      placeholder="Full Name"
      className="
        w-full
        mb-2
        p-3
        rounded-2xl
        bg-[#FFFFFF]
        border
        border-[#D7D7CD]
        text-[#13160F]
        outline-none
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    />

    <p className="text-red-500 mb-4 text-sm">
      {errors.name?.message}
    </p>




    <input
      {...register("email")}
      placeholder="Email"
      className="
        w-full
        mb-2
        p-3
        rounded-2xl
        bg-[#FFFFFF]
        border
        border-[#D7D7CD]
        text-[#13160F]
        outline-none
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    />

    <p className="text-red-500 mb-4 text-sm">
      {errors.email?.message}
    </p>





    <input
      type="password"
      {...register("password")}
      placeholder="Password"
      className="
        w-full
        mb-2
        p-3
        rounded-2xl
        bg-[#FFFFFF]
        border
        border-[#D7D7CD]
        text-[#13160F]
        outline-none
        focus:border-[#AAD10A]
        focus:ring-4
        focus:ring-[rgba(170,209,10,0.18)]
      "
    />


    <p className="text-red-500 mb-6 text-sm">
      {errors.password?.message}
    </p>





    <button
      className="
        w-full
        bg-[#AAD10A]
        text-[#0A0D0A]
        py-3
        rounded-2xl
        font-semibold
        hover:bg-[#C8EE2C]
        transition-all
        duration-300
        shadow-sm
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      Sign Up
    </button>




    <p
      className="
        text-[#7A7E73]
        mt-6
        text-center
      "
    >

      Already have an account?


      <Link
        to="/login"
        className="
          text-[#5C8A05]
          ml-2
          font-semibold
          hover:underline
        "
      >
        Login
      </Link>


    </p>


  </form>


</div>
  );
}