import React, { useState, useEffect, useCallback } from "react";
import ChartTwo from './ChartTwo'
import ChartThree from './ChartThree'
import ChartOne from './ChartOne'
import DataStatsOne from "./DataStatsOne";
 import TableOne from "./TableOne";

const Ecommerce = () => {


  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
         <div className="col-span-12 xl:col-span-7">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
}

export default Ecommerce;
