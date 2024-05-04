
export const formatDateToString = (date: Date, format: string) => {  
  if(!date) return undefined
  const tokens = {
      'YYYY': date.getFullYear().toString(),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'DD': String(date.getDate()).padStart(2, '0'),
    };
  return format.replace(/YYYY|MM|DD/g, (match) => tokens[match as keyof typeof tokens]);
} 


export const formatStringToDate = (date: string) => {
  const [day, month, year] = date.split('/');
  let dayLength = day.replace('dd', '').length;
  let monthLength = month.replace('mm', '').length;
  let yearLength = year.replace('aaaa', '').replace('aa', '').replace('a', '').length;
  let dateLength = dayLength + monthLength + yearLength;

  if (dateLength === 0) {
    return null;
  }

  if (dateLength < 8) {
    return undefined;
  }

  const newMonth = parseInt(month) - 1;
  const dateConverted = new Date(parseInt(year), newMonth, parseInt(day));
  return dateConverted;
} 