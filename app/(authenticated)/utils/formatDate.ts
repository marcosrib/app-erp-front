
export const formatDate = (date: Date, format: string) => {
    const tokens = {
        'YYYY': date.getFullYear().toString(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'DD': String(date.getDate()).padStart(2, '0'),
      };
    
      // Use uma expressão regular para substituir cada token no formato
      return format.replace(/YYYY|MM|DD/g, (match) => tokens[match as keyof typeof tokens]);
} 