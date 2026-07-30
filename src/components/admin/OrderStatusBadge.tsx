type Props = {
  status: string;
};

export default function OrderStatusBadge({
  status,
}: Props) {

  const colors = {

    Processing:
      "bg-yellow-500/20 text-yellow-400",

    Shipped:
      "bg-blue-500/20 text-blue-400",

    Delivered:
      "bg-green-500/20 text-green-400",

    Cancelled:
      "bg-red-500/20 text-red-400",

  };

  return (

    <span
      className={`
      px-4
      py-2
      rounded-full
      text-sm
      ${colors[status as keyof typeof colors]}
      `}
    >

      {status}

    </span>

  );

}