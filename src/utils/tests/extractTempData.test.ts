import { extractTemperatureData } from "../functions/extractTemperatureData";

describe('extractTemperatureData', () => {
  it('should extract temperatures for the first 5 days', () => {
    const forecastData: { list: Array<{ dt_txt: string; main: { temp_min?: number; temp_max?: number } }> } = {
      list: [
        { dt_txt: '2024-09-01 12:00:00', main: { temp_min: 20, temp_max: 30 } },
        { dt_txt: '2024-09-01 18:00:00', main: { temp_min: 19, temp_max: 31 } },
        { dt_txt: '2024-09-02 12:00:00', main: { temp_min: 15, temp_max: 25 } },
        { dt_txt: '2024-09-03 12:00:00', main: { temp_min: 17, temp_max: 27 } },
        { dt_txt: '2024-09-04 12:00:00', main: { temp_min: 16, temp_max: 26 } },
        { dt_txt: '2024-09-05 12:00:00', main: { temp_min: 18, temp_max: 28 } },
        { dt_txt: '2024-09-06 12:00:00', main: { temp_min: 14, temp_max: 24 } },
      ]
    };

    const result = extractTemperatureData(forecastData);
    
    expect(result).toEqual([
      { date: '2024-09-01', temp_min: 19, temp_max: 31 },
      { date: '2024-09-02', temp_min: 15, temp_max: 25 },
      { date: '2024-09-03', temp_min: 17, temp_max: 27 },
      { date: '2024-09-04', temp_min: 16, temp_max: 26 },
      { date: '2024-09-05', temp_min: 18, temp_max: 28 },
    ]);
  });

  // The same typing for other test cases
  it('should handle empty forecast data', () => {
    const forecastData: { list: Array<{ dt_txt: string; main: { temp_min?: number; temp_max?: number } }> } = { list: [] };
    const result = extractTemperatureData(forecastData);
    expect(result).toEqual([]);
  });

  it('should handle missing temperature data', () => {
    const forecastData: { list: Array<{ dt_txt: string; main: { temp_min?: number; temp_max?: number } }> } = {
      list: [
        { dt_txt: '2024-09-01 12:00:00', main: {} },
        { dt_txt: '2024-09-01 18:00:00', main: { temp_min: 19, temp_max: 31 } },
      ]
    };

    const result = extractTemperatureData(forecastData);
    
    expect(result).toEqual([
      { date: '2024-09-01', temp_min: 19, temp_max: 31 },
    ]);
  });

  it('should return only the first 5 days', () => {
    const forecastData: { list: Array<{ dt_txt: string; main: { temp_min?: number; temp_max?: number } }> } = {
      list: [
        { dt_txt: '2024-09-01 12:00:00', main: { temp_min: 20, temp_max: 30 } },
        { dt_txt: '2024-09-02 12:00:00', main: { temp_min: 15, temp_max: 25 } },
        { dt_txt: '2024-09-03 12:00:00', main: { temp_min: 17, temp_max: 27 } },
        { dt_txt: '2024-09-04 12:00:00', main: { temp_min: 16, temp_max: 26 } },
        { dt_txt: '2024-09-05 12:00:00', main: { temp_min: 18, temp_max: 28 } },
        { dt_txt: '2024-09-06 12:00:00', main: { temp_min: 14, temp_max: 24 } },
      ]
    };

    const result = extractTemperatureData(forecastData);
    
    expect(result.length).toBe(5);
  });

  it('should handle duplicate day entries and compute correct min/max', () => {
    const forecastData: { list: Array<{ dt_txt: string; main: { temp_min?: number; temp_max?: number } }> } = {
      list: [
        { dt_txt: '2024-09-01 12:00:00', main: { temp_min: 22, temp_max: 29 } },
        { dt_txt: '2024-09-01 18:00:00', main: { temp_min: 20, temp_max: 32 } },
      ]
    };

    const result = extractTemperatureData(forecastData);
    
    expect(result).toEqual([
      { date: '2024-09-01', temp_min: 20, temp_max: 32 },
    ]);
  });
});
