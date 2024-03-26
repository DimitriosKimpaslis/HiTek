export function formatNumberWithTwoDecimals(number) {
    // Check if the number is an integer (no decimal part)
    if (Number.isInteger(number)) {
      return number + '.00';
    }
  
    // Check if the number has exactly two decimal places
    const numberString = number.toString();
    if (/^\d+\.\d{2}$/.test(numberString)) {
      return numberString;
    }
  
    // Add .00 to numbers with a decimal part that is not exactly two decimal places
    return numberString + '00'.slice(numberString.split('.')[1].length);
  }

