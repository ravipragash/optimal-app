export const formatCurrency = (amount: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  try {
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting if the currency is not supported
    switch (currency) {
      case 'LKR':
        return `Rs ${amount.toFixed(2)}`;
      default:
        return `${amount.toFixed(2)} ${currency}`;
    }
  }
};