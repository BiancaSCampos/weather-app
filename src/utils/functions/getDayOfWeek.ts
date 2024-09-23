export const getDayOfWeek = (dateString: string | null | undefined) => {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return undefined;
  }

  const daysOfWeek = [
    
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return daysOfWeek[date.getDay()];
};
