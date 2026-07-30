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



        <h1
          className="
          text-5xl
          font-bold
          mb-8
          text-[#13160F]
          "
        >
          Return Management
        </h1>




        <ReturnStats />



        <ReturnTable />



      </main>



    </div>

  );

}