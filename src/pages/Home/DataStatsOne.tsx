import React from "react";
import { FaClipboardCheck, FaDollarSign, FaRegFileAlt, FaUsers, FaChartLine } from 'react-icons/fa'; // Import the icons

const dataStatsList = [
  {
    icon: <FaClipboardCheck size={23} />,
    color: "#3FD97F",
    title: "Total Policies",
    value: "3.456K",
    growthRate: 0.43,
  },
  {
    icon: <FaDollarSign size={23} />,
    color: "#FF9C55",
    title: "Monthly Premium",
    value: "$42.2K",
    growthRate: 4.35,
  },
  {
    icon: <FaRegFileAlt size={23} />,
    color: "#8155FF",
    title: "Monthly Claims",
    value: "2.450",
    growthRate: 2.59,
  },
  {
    icon: <FaUsers size={23} />,
    color: "#18BFFF",
    title: "No of Singular Family",
    value: "3.465",
    growthRate: -0.95,
  },
  {
    icon: <FaChartLine size={23} />,
    color: "#18BFFF",
    title: "Monthly Commission",
    value: "3.465",
    growthRate: -0.95,
  },
];

const DataStatsOne: React.FC<dataStats> = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2  xl:grid-cols-5  ">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="picboxc cursor-pointer flex flex-col sm:justify-start justify-center items-center text-center rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-xl font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-lg font-medium hover:text-red-400 cursor-pointer">{item.title}</span>
              </div>

           
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
