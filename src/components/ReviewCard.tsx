import { Star } from "lucide-react";


type Props={

user:string;

comment:string;

rating:number;

}


export default function ReviewCard({
user,
comment,
rating
}:Props){


return (

<div
  className="
    bg-[#FFFFFF]
    border
    border-[#E5E5DD]
    rounded-3xl
    p-5
    shadow-sm
    hover:shadow-md
    hover:border-[#AAD10A]
    transition-all
    duration-300
  "
>
  <h3 className="text-lg font-semibold text-[#13160F]">
    {user}
  </h3>

  <div className="flex items-center gap-1 mt-3">
    {Array.from({ length: rating }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className="
          text-[#B88A2D]
          fill-[#B88A2D]
        "
      />
    ))}
  </div>

  <p className="mt-4 text-[#3F443A] leading-7">
    {comment}
  </p>
</div>

)

}