import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { 
  formatCurrency, 
  getCurrencySymbol, 
  getCurrencyCode, 
  getCurrencyName,
  getCurrencyByCountry 
} from '../utils/currencyUtils';

/**
 * Custom hook to handle currency formatting based on user's country
 * @returns {Object} Currency utilities and formatting functions
 */
export const useCurrency = () => {
  const { user } = useSelector(state => state.userAuth);
  
  // Get user's country from Redux state
  const userCountry = user?.country || 'United States';
  
  // Memoize currency information to avoid recalculation
  const currencyInfo = useMemo(() => {
    return getCurrencyByCountry(userCountry);
  }, [userCountry]);

  /**
   * Format amount with user's currency
   * @param {number|string} amount - Amount to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted currency string
   */
  const formatAmount = (amount, options = {}) => {
    return formatCurrency(amount, userCountry, {
      showDecimals: true,
      showSymbol: true,
      showCode: false,
      ...options
    });
  };

  /**
   * Format amount with just the number and symbol (no decimals)
   * @param {number|string} amount - Amount to format
   * @returns {string} Formatted currency string without decimals
   */
  const formatAmountShort = (amount) => {
    return formatCurrency(amount, userCountry, {
      showDecimals: false,
      showSymbol: true,
      showCode: false
    });
  };

  /**
   * Format amount with currency code
   * @param {number|string} amount - Amount to format
   * @returns {string} Formatted currency string with code
   */
  const formatAmountWithCode = (amount) => {
    return formatCurrency(amount, userCountry, {
      showDecimals: true,
      showSymbol: true,
      showCode: true
    });
  };

  /**
   * Get just the currency symbol
   * @returns {string} Currency symbol
   */
  const getSymbol = () => {
    return getCurrencySymbol(userCountry);
  };

  /**
   * Get just the currency code
   * @returns {string} Currency code (e.g., 'USD', 'EUR')
   */
  const getCode = () => {
    return getCurrencyCode(userCountry);
  };

  /**
   * Get the currency name
   * @returns {string} Currency name (e.g., 'US Dollar', 'Euro')
   */
  const getName = () => {
    return getCurrencyName(userCountry);
  };

  /**
   * Format balance specifically (commonly used formatting)
   * @param {number|string} balance - Balance amount
   * @returns {string} Formatted balance
   */
  const formatBalance = (balance) => {
    return formatCurrency(balance, userCountry, {
      showDecimals: true,
      showSymbol: true,
      showCode: false
    });
  };

  /**
   * Format transaction amounts (may include negative values)
   * @param {number|string} amount - Transaction amount
   * @param {string} type - Transaction type ('debit', 'credit', etc.)
   * @returns {string} Formatted transaction amount
   */
  const formatTransaction = (amount, type = 'debit') => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount || 0;
    const absAmount = Math.abs(numAmount);
    const formattedAmount = formatCurrency(absAmount, userCountry);
    
    // Add sign based on transaction type
    if (type.toLowerCase() === 'debit' || type.toLowerCase() === 'withdraw' || type.toLowerCase() === 'transfer') {
      return `-${formattedAmount}`;
    }
    
    return `+${formattedAmount}`;
  };

  /**
   * Create input placeholder text with currency symbol
   * @param {string} baseText - Base placeholder text
   * @returns {string} Placeholder with currency symbol
   */
  const createPlaceholder = (baseText = 'Enter amount') => {
    return `${baseText} (${getSymbol()})`;
  };

  return {
    // Currency information
    currencyInfo,
    country: userCountry,
    symbol: currencyInfo.symbol,
    code: currencyInfo.code,
    name: currencyInfo.name,
    
    // Formatting functions
    formatAmount,
    formatAmountShort,
    formatAmountWithCode,
    formatBalance,
    formatTransaction,
    
    // Utility functions
    getSymbol,
    getCode,
    getName,
    createPlaceholder
  };
};

/**
 * Hook to get currency symbol only (for simple use cases)
 * @returns {string} Currency symbol
 */
export const useCurrencySymbol = () => {
  const { symbol } = useCurrency();
  return symbol;
};

/**
 * Hook to get currency formatter function only
 * @returns {Function} Currency formatter function
 */
export const useCurrencyFormatter = () => {
  const { formatAmount } = useCurrency();
  return formatAmount;
};

export default useCurrency;
