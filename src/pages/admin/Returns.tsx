import Sidebar from "../../components/admin/Sidebar";
import ReturnStats from "../../components/admin/ReturnStats";
import ReturnTable from "../../components/admin/ReturnTable";


export default function Returns() {

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
        "
      >



        <div className="flex items-center bg-white lg:bg-transparent border-b border-[#E5E5DD] lg:border-none p-4 lg:p-0 -mx-4 sm:-mx-6 lg:mx-0 sticky top-0 z-30 lg:static">
          <h1 className="text-xl lg:text-3xl font-bold text-[#13160F]">
            Return Management
          </h1>
        </div>

        {/* Spacer between heading and 4 boxes */}
        <div style={{ height: '24px' }}></div>

        <ReturnStats />

        {/* Spacer between 4 boxes and return list */}
        <div style={{ height: '32px' }}></div>

        <ReturnTable />



      </main>



    </div>

  );

}