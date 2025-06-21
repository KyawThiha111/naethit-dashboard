type Props = { title: string; subtitle: string };
export default function ChartOne({ title, subtitle }: Props) {
  return (
    <div className="w-full rounded-xl bg-blue-100 p-5">
      <h2 className=" text-3xl font-bold">{title}</h2>
      <p className=" text-gray-700 text-lg">{subtitle}</p>
    </div>
  );
}
