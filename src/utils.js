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
