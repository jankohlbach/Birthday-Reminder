const sortList = (list) => {
  list.sort((a, b) => {
    if (a.month > b.month) return 1;
    if (a.month < b.month) return -1;

    if (a.month === b.month) {
      if (a.day > b.day) return 1;
      if (a.day < b.day) return -1;
      return 0;
    }

    return 0;
  });

  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;

  const index = list.findIndex((element) => {
    const day = parseInt(element.day, 10);
    const month = parseInt(element.month, 10);
    return (month === currentMonth && day >= currentDay) || month > currentMonth;
  });

  const nextYear = list.slice(0, index);
  list.splice(0, index);
  nextYear.forEach((element) => {
    list.push(element);
  });
};

export default sortList;
