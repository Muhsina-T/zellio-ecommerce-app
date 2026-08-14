type DateSelectorProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export default function DateSelector({
  date,
  onChange,
}: DateSelectorProps) {
  const value = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <input
      type="date"
      value={value}
      onChange={(event) => {
        const selected = new Date(
          `${event.target.value}T00:00:00`
        );

        onChange(selected);
      }}
      className="
        border
        border-[#E5E5DD]
        rounded-xl
        px-3
        py-2
        text-sm
        bg-white
        outline-none
        focus:ring-2
        focus:ring-[#AAD10A]
      "
    />
  );
}