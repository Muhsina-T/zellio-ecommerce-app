type Props = {
  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
};


export default function OrderTracker({
  status
}: Props) {


  const steps = [
    "Processing",
    "Shipped",
    "Delivered"
  ];


  const currentIndex =
    steps.indexOf(status);



  return (

    <div className="mt-6">


      <div
        className="
        relative
        flex
        justify-between
        items-center
        "
      >


        {/* Progress Line */}

        <div
          className="
          absolute
          top-5
          left-0
          right-0
          h-1
          bg-[#E5E5DD]
          "
        />



        <div
          className="
          absolute
          top-5
          left-0
          h-1
          bg-[#AAD10A]
          transition-all
          duration-500
          "
          style={{
            width:
            `${(currentIndex / (steps.length - 1)) * 100}%`
          }}
        />





        {
          steps.map((step,index)=>{


            const active =
            index <= currentIndex;



            return (

              <div

                key={step}

                className="
                relative
                z-10
                flex
                flex-col
                items-center
                "

              >


                <div

                  className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    active

                    ?

                    "bg-[#AAD10A] text-[#0A0D0A]"

                    :

                    "bg-[#F2F2EC] text-[#7A7E73] border border-[#E5E5DD]"
                  }

                  `}

                >

                  {
                    active
                    ?
                    "✓"
                    :
                    index + 1
                  }


                </div>




                <p

                  className={`
                  text-sm
                  mt-2
                  font-medium

                  ${
                    active
                    ?
                    "text-[#13160F]"
                    :
                    "text-[#7A7E73]"
                  }

                  `}

                >

                  {step}

                </p>



              </div>

            );


          })
        }



      </div>





      {
        status === "Cancelled" && (

          <div
            className="
            mt-5
            text-center
            bg-red-50
            text-red-600
            rounded-xl
            py-3
            font-medium
            "
          >

            Order Cancelled

          </div>

        )
      }



    </div>

  );

}