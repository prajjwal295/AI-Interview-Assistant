const ThingsToImprove = ({ data }) => {
  return (
    <div className="space-y-2 p-4 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-white">Things to Improve</h2>
      <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        {data?.map((d, index) => (
          <li key={index}>{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThingsToImprove;
