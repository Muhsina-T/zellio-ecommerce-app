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


        <div className="flex items-center bg-white lg:bg-transparent border-b border-[#E5E5DD] lg:border-none p-4 lg:p-0 -mx-4 sm:-mx-6 lg:mx-0 sticky top-0 z-30 lg:static">
          <h1 className="text-xl lg:text-3xl font-bold text-[#13160F]">
            Order Management
          </h1>
        </div>

        {/* Spacer between heading and 4 boxes */}
        <div style={{ height: '24px' }}></div>

        <OrderStats />

        {/* Spacer between 4 boxes and order list */}
        <div style={{ height: '32px' }}></div>





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