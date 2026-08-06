import useReturn from "../../hooks/useReturn";


export default function ReturnStats() {

  const { returns } = useReturn();



  const pending = returns.filter(
    r => r.status === "Pending"
  ).length;



  const approved = returns.filter(
    r => r.status === "Approved"
  ).length;



  const completed = returns.filter(
    r => r.status === "Approved"
  ).length;



  return (

    console.log("ReturnStats.tsx rendered with returns:", returns),

    <div
      className="
      grid
      grid-cols-4
      gap-2
      sm:gap-4
      max-w-xl
      mb-6
      "
    >



      {/* Total Returns */}

      <div
        className="
        bg-white
        rounded-2xl
        p-2
        sm:p-4
        border
        border-[#E5E5DD]
        shadow-sm
        "
      >

        <p
          className="
          text-xs
          sm:text-sm
          font-medium
          text-[#7A7E73]
          "
        >
          Total Returns
        </p>


        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          mt-1
          text-[#13160F]
          "
        >
          {returns.length}
        </h2>


      </div>





      {/* Pending */}

      <div
        className="
        bg-[#B88A2D]/10
        rounded-2xl
        p-2
        sm:p-4
        border
        border-[#B88A2D]/20
        "
      >

        <p
          className="
          text-xs
          sm:text-sm
          font-medium
          text-[#B88A2D]
          "
        >
          Pending
        </p>


        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          mt-1
          text-[#13160F]
          "
        >
          {pending}
        </h2>


      </div>





      {/* Approved */}

      <div
        className="
        bg-[#5C8A05]/10
        rounded-2xl
        p-2
        sm:p-4
        border
        border-[#5C8A05]/20
        "
      >

        <p
          className="
          text-xs
          sm:text-sm
          font-medium
          text-[#5C8A05]
          "
        >
          Approved
        </p>


        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          mt-1
          text-[#13160F]
          "
        >
          {approved}
        </h2>


      </div>





      {/* Completed */}

      <div
        className="
        bg-[#AAD10A]/15
        rounded-2xl
        p-2
        sm:p-4
        border
        border-[#AAD10A]/30
        "
      >

        <p
          className="
          text-xs
          sm:text-sm
          font-medium
          text-[#5C8A05]
          "
        >
          Completed
        </p>


        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          mt-1
          text-[#13160F]
          "
        >
          {completed}
        </h2>


      </div>



    </div>

  );

}