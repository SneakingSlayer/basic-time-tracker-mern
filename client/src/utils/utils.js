export const dateTimeFormat = (res_date) => {
  const date = new Date(res_date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const midday = parseInt(date.getHours()) >= 12 ? "PM" : "AM";

  const formatted =
    date.getHours() +
    ":" +
    date.getMinutes() +
    " " +
    midday +
    " " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    " ";
  return formatted.toString();
};
