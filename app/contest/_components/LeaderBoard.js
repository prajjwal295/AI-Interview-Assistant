"use-client";
import React, { useEffect, useState } from "react";

const LeaderBoard = ({ contestId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderBoardData();
  }, [contestId]);

  const fetchLeaderBoardData = async () => {
    try {
      const response = await fetchLeaderBoardData(contestId);
      setData(response || []);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setData([]);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Leaderboard</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index} className="text-center border-t">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{entry}</td>
                <td className="border px-4 py-2">{entry}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
