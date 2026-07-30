import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";

import useProducts from "../hooks/useProducts";

export default function Home() {

  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("");

  const filteredProducts = useMemo(()=>{

let filtered=[...products];


if(search.trim()){

filtered=filtered.filter((item)=>
item.name
.toLowerCase()
.includes(search.toLowerCase())
)

}


if(brand !== "All"){

filtered=filtered.filter(
(item)=>item.brand===brand
)

}


if(sort==="low"){

filtered.sort(
(a,b)=>a.price-b.price
)

}


if(sort==="high"){

filtered.sort(
(a,b)=>b.price-a.price
)

}


return filtered;


},[products,search,brand,sort]);

// ✅ Put the console.log HERE
console.log(filteredProducts);

  console.log("datadddaddaads");
  
  return (
   <div
  className="
  min-h-screen
  bg-[#FAFAF7]
  text-[#13160F]
  "
>

  {/* Top Navbar */}
  <Navbar
    search={search}
    setSearch={setSearch}
  />



  {/* Sidebar + Products */}
  <div
    className="
    bg-[#FAFAF7]
    min-h-screen
    "
  >


    <div
      className="
      max-w-[1600px]
      mx-auto
      flex
      gap-6
      px-6
      "
    >



      <Sidebar
        brand={brand}
        setBrand={setBrand}
        sort={sort}
        setSort={setSort}
      />




      <motion.div

        className="
        flex-1
        min-h-screen
        "

        initial={{
          opacity:0,
          y:20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:0.4
        }}

      >



        <div
          className="
          p-6
          "
        >


          <ProductGrid
            products={filteredProducts}
          />


        </div>



      </motion.div>



    </div>


  </div>




  <Footer />


</div>
  );
}