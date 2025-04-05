const Feedback = ({ data }) => {
  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-white mb-2">AI Feedback</h2>
      <p className="text-gray-300 leading-relaxed text-sm">{data}</p>
    </div>
  );
};

export default Feedback;
