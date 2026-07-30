import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7]">
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="flex flex-1 bg-[#FAFAF7]">
        <Sidebar />

        <main className="flex-1 min-w-0 bg-[#FAFAF7]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}