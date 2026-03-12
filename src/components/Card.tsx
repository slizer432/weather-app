interface Props {
  title: string;
  value: string | number;
  footer?: string;
}

const Card = ({ title, value, footer }: Props) => {
  return (
    <div className="bg-linear-to-br from-indigo-400 to-indigo-500 text-white p-6 rounded-2xl shadow-md h-35 max-w-70 w-full">
      <h4 className="text-sm font-light mb-2">{title}</h4>
      <p className="text-2xl font-semibold">{value}</p>
      <h4 className="text-sm font-light mb-5 mt-2">{footer}</h4>
    </div>
  );
};

export default Card;
