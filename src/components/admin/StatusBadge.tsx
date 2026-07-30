type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Processing: "bg-yellow-500/20 text-yellow-400",
    Shipped: "bg-blue-500/20 text-blue-400",
    Delivered: "bg-green-500/20 text-green-400",
    Cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}