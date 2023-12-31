export const optionsDay = [
  { value: 480, label: "8 Hours" },
  { value: 600, label: "10 Hours" },
  { value: 720, label: "12 Hours" },
];

export const optionsWeek = [
  { value: 2400, label: "40 Hours" },
  { value: 3000, label: "50 Hours" },
  { value: 3600, label: "70 Hours" },
];

export const formatTime = (date: any) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const calculateTotalTime = (intervals: any[]) => {
  let totalMinutes = 0;

  intervals.forEach((interval) => {
    const startTime = new Date(interval.startTime);
    const endTime = new Date(interval.endTime);
    const difference = endTime.getTime() - startTime.getTime();
    totalMinutes += difference / (1000 * 60);
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}min`;
};

export const calculateTotalMinutes = (intervals: any[]) => {
  let totalMinutes = 0;

  intervals.forEach((interval) => {
    const startTime = new Date(interval.startTime);
    const endTime = new Date(interval.endTime);
    const difference = endTime.getTime() - startTime.getTime();
    totalMinutes += difference / (1000 * 60);
  });

  return totalMinutes;
};

export const groupIntervalsByWeek = (intervals: any[]) => {
  const groupedIntervals = intervals.reduce((groups, interval) => {
    const startDate = new Date(interval.startTime);
    const weekStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - startDate.getDay()
    );
    const weekNumber = weekStart.toISOString().slice(0, 10); // Using week start date as key
    groups[weekNumber] = groups[weekNumber] || [];
    groups[weekNumber].push(interval);
    return groups;
  }, {});

  return Object.entries(groupedIntervals);
};

export const currentDateIntervals = (totalTime: any, currentDate: string) => {
  return totalTime.filter((interval: any) => {
    const startDate = new Date(interval.startTime).toISOString().slice(0, 10);
    const endDate = new Date(interval.endTime).toISOString().slice(0, 10);
    return startDate === currentDate || endDate === currentDate;
  });
};
