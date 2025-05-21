"use client";
import React, { useEffect, useState } from "react";
import { fetchLeaderBoardData } from "../../../services/operations/Interview";
import { useUser } from "@clerk/nextjs";

const LeaderBoard = ({ contestId }) => {
  const [data, setData] = useState([]);
  const user = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress;
  console.log(createdBy);

  useEffect(() => {
    fetchLeaderBoard();
  }, [contestId]);

  const fetchLeaderBoard = async () => {
    try {
      const response = await fetchLeaderBoardData({ contestId });
      console.log(response);
      if (response.success) {
        setData(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setData([]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 bg-white">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300">#</th>
              <th className="px-4 py-3 border-b border-gray-300">Email</th>
              <th className="px-4 py-3 border-b border-gray-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } text-gray-800`}
                >
                  <td className="px-4 py-3 border-t border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200">
                    {entry.createdBy === createdBy ? "You" : entry.createdBy}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-200 text-center">
                    {entry.aiFeedback === null ? "0" : entry.score}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
