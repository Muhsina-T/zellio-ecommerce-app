import { useContext } from "react";

import {
ProductContext
} from "../context/ProductContext";


export default function useProducts(){


const context =
useContext(ProductContext);



if(!context){

throw new Error(
"useProducts must be inside ProductProvider"
);

}


return context;

}