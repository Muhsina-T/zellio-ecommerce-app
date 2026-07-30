import useReturn from "../hooks/useReturn";
import ReturnCard from "../components/ReturnCard";

export default function Returns() {

  const { returns } = useReturn();

  return (

    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        text-[#13160F]
        px-4
        py-6
        lg:px-8
      "
    >

      <h1
        className="
          text-3xl
          lg:text-4xl
          font-bold
          mb-8
          text-[#13160F]
        "
      >
        My Returns
      </h1>



      {returns.length === 0 ? (

        <div
          className="
            bg-[#FFFFFF]
            border
            border-[#E5E5DD]
            rounded-3xl
            p-12
            text-center
            shadow-sm
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-[#13160F]
            "
          >
            No Return Requests
          </h2>


          <p
            className="
              text-[#7A7E73]
              mt-3
            "
          >
            You haven't requested any returns yet.
          </p>


        </div>


      ) : (


        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          {returns.map((request) => (

            <ReturnCard
              key={request.id}
              request={request}
            />

          ))}


        </div>


      )}


    </div>

  );
}