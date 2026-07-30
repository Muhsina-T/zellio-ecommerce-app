type Props = {
  status: string;
};

export default function ReturnStatusBadge({
  status,
}: Props) {
  const styles = {
    Pending:
      "bg-yellow-500/20 text-yellow-400",

    Approved:
      "bg-green-500/20 text-green-400",

    Rejected:
      "bg-red-500/20 text-red-400",

    Completed:
      "bg-cyan-500/20 text-cyan-400",
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