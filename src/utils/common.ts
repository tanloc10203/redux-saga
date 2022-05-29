export const capitailizeString = (str: string): string => {
  return !str ? '' : `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return '#14C38E';
  if (mark >= 4) return '#FBCB0A';
  return 'red';
};
