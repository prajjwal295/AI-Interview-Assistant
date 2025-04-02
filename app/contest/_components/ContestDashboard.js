"use client";
import { fetchActiveContest } from "../../../services/operations/Contest";
import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";

const ContestDashBoard = () => {
  const [activeContest, setActiveContest] = useState(null);

  useEffect(() => {
    fetchContestInformation();
  }, []);

  const fetchContestInformation = async () => {
    const data = await fetchActiveContest();
    setActiveContest(data?.data);
  };

  return <>{activeContest && <ContestCard data={activeContest} />}</>;
};

export default ContestDashBoard;
