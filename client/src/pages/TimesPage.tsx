import React from "react";

import AddTimes from "../components/AddTimes";
import UserTotalTime from "../components/UserTotalTime";
import { useAuthStore } from "../stores/authStore";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";
import {
  calculateTotalTime,
  currentDateIntervals,
  groupIntervalsByWeek,
} from "../helpers/times";
import Statistics from "../components/Statistics";
import { GoalSection } from "../components";
import Header from "../components/Header";

const TimesPage = () => {
  const { userId, token } = useAuthStore();
  const currentDate = new Date().toISOString().slice(0, 10);
  // @ts-ignore
  const { data, isLoading, error } = useGetTotalTime(userId);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    // @ts-ignore
    return toast.error("Error loading");
  }

  const totalTimeStatistic = data?.intervals;
  // @ts-ignore
  const groupedIntervals = groupIntervalsByWeek(totalTimeStatistic);

  // Calculate total time for the current date
  const totalCurrentDate = calculateTotalTime(
    currentDateIntervals(totalTimeStatistic, currentDate)
  );

  // Calculate total time for the current week
  const currentWeekIntervals =
    groupedIntervals.length > 0 ? groupedIntervals[0][1] : [];
  // @ts-ignore
  const totalCurrentWeek = calculateTotalTime(currentWeekIntervals);

  // Calculate total time for all intervals
  // @ts-ignore
  const totalAllTime = calculateTotalTime(totalTimeStatistic);
  return (
    <div className="container">
      <Header />
      <div className="flex xs:flex-col md:flex-row gap-3 mt-3">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg w-full p-4 xs:flex xs:items-center xs:justify-center md:block ">
          {/*@ts-ignore*/}
          <AddTimes />
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg w-full p-4 ">
          {/*@ts-ignore*/}
          <GoalSection />
        </div>
      </div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg mt-3 p-4">
          {/*@ts-ignore*/}
          <UserTotalTime />
        </div>
      </div>
      <div className=" flex gap-3 items-start justify-between mt-3">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg p-3 w-full">
          <Statistics title="Day Time:">
            {" "}
            <span className=" font-bold text-xl text-yellow-600">
              {totalCurrentDate}
            </span>
          </Statistics>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg p-3 w-full">
          <Statistics title="Week time:">
            <span className=" font-bold text-xl text-yellow-600">
              {totalCurrentWeek}
            </span>
          </Statistics>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg p-3 w-full">
          <Statistics title="Total time:">
            <span className=" font-bold text-xl text-yellow-600">
              {totalAllTime}
            </span>
          </Statistics>
        </div>
      </div>
    </div>
  );
};

export default TimesPage;
