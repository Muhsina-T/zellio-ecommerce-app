import type { Product } from "../../types/Product";


import useProducts from "../../hooks/useProducts";

type Props = {
  onEdit: (product: Product) => void;
};

export default function ProductTable({ onEdit }: Props) {


const {
products,
deleteProduct
}=useProducts();



return(

<div

className="
bg-white
border
border-[#E5E5DD]
shadow-sm
rounded-3xl
p-6
"

>


<h2 className="
text-2xl
font-bold
mb-5
text-[#13160F]
">

Products

</h2>



<div className="space-y-4">


{

products.map(product=>(


<div

key={product.id}

className="
flex
justify-between
items-center
bg-[#FAFAF7]
border
border-[#E5E5DD]
hover:border-[#AAD10A]
hover:bg-[#F2F2EC]
transition-all
p-4
rounded-xl
"

>


<div>

<h3 className="text-[#13160F]
font-semibold">

{product.name}

</h3>


<p className="text-[#5C8A05]
font-bold">

₹{product.price}

</p>


</div>



<div className="flex gap-3">
  <button
    onClick={() => onEdit(product)}
    className="
bg-[#AAD10A]
hover:bg-[#C8EE2C]
text-[#0A0D0A]
font-medium
px-4
py-2
rounded-xl
transition
"
  >
    Edit
  </button>

 <button
  onClick={() => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  }}
  className="
bg-red-50
text-red-600
hover:bg-red-100
px-4
py-2
rounded-xl
transition

  "
>
  Delete
</button>
</div>


</div>


))

}


</div>


</div>

)

}