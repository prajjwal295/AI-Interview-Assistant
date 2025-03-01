import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
};

export default DashboardLayout;

TURBO_TRACE_DEFAULT_MEMORY_LIMIT