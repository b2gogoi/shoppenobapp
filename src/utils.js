export const format = dateString => {
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
};

export const sortByCol = (data, column) => {
  let sorted = data;
  switch (column) {
    case 'name':
      sorted = data.sort((a, b) => {
        return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
      });
      break;
    case 'expiryDate':
      sorted = data.sort((a, b) => {
        return (
          new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
        );
      });
      break;
    default:
      break;
  }
  return sorted;
};
