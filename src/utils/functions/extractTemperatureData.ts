export const extractTemperatureData = (forecastData: any) => {
  const dailyTemperatures: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
  }> = [];

  forecastData.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    const existingDay = dailyTemperatures.find((day) => day.date === date);

    if (existingDay) {
      existingDay.temp_min = Math.min(existingDay.temp_min, item.main.temp_min);
      existingDay.temp_max = Math.max(existingDay.temp_max, item.main.temp_max);
    } else {
      dailyTemperatures.push({
        date,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
      });
    }
  });

  return dailyTemperatures.slice(0, 5);
};
