import Sidebar from "../../components/admin/Sidebar";
import OrderStats from "../../components/admin/OrderStats";
import OrderTable from "../../components/admin/OrderTable";
// import { Search } from "lucide-react";


export default function Orders() {

  return (

    <div
      className="
      flex
      min-h-screen
      bg-[#FAFAF7]
      text-[#13160F]
      "
    >


      <Sidebar />


      <main
        className="
        flex-1
        p-4
        sm:p-6
        lg:p-8
        pb-24
        lg:pb-8
        "
      >


        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          mb-6
          lg:mb-8
          "
        >
          Order Management
        </h1>




        <OrderStats />





        {/* Search */}

        {/* <div
          className="
          bg-white
          rounded-2xl
          p-3
          sm:p-4
          mb-6
          flex
          items-center
          gap-3
          border
          border-[#E5E5DD]
          shadow-sm
          "
        >


          <Search
            size={20}
            className="text-[#7A7E73] shrink-0"
          />


          <input

            placeholder="Search Order..."

            className="
            bg-transparent
            outline-none
            w-full
            text-sm
            sm:text-base
            text-[#13160F]
            placeholder:text-[#7A7E73]
            "

          />


        </div> */}





        {/* Order Table */}

        <div
          className="
          overflow-x-auto
          "
        >

          <OrderTable />

        </div>



      </main>


    </div>

  );
}