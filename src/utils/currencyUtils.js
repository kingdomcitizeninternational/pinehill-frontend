// Currency utility functions for PHCU Banking App

/**
 * Comprehensive country-to-currency mapping
 */
export const COUNTRY_CURRENCY_MAP = {
  // North America
  'United States': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'USA': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'Canada': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'Mexico': { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },

  // Europe
  'United Kingdom': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'UK': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'Germany': { code: 'EUR', symbol: '€', name: 'Euro' },
  'France': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Italy': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Spain': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Netherlands': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Portugal': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Belgium': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Austria': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Ireland': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Greece': { code: 'EUR', symbol: '€', name: 'Euro' },
  'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'Russia': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  'Turkey': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },

  // Asia
  'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'Japan': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'South Korea': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'Hong Kong': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'Vietnam': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  'Taiwan': { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },

  // Middle East
  'Saudi Arabia': { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal' },
  'UAE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'United Arab Emirates': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'Qatar': { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal' },
  'Kuwait': { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
  'Israel': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  'Iran': { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },

  // Africa
  'Nigeria': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  'South Africa': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  'Egypt': { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  'Kenya': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  'Ghana': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  'Morocco': { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  'Tunisia': { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  'Ethiopia': { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },

  // Oceania
  'Australia': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'New Zealand': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },

  // South America
  'Brazil': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'Argentina': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'Colombia': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  'Venezuela': { code: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar' },

  // Caribbean
  'Jamaica': { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
  'Bahamas': { code: 'BSD', symbol: '$', name: 'Bahamian Dollar' },
  'Barbados': { code: 'BBD', symbol: '$', name: 'Barbadian Dollar' },
  'Trinidad and Tobago': { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar' },

  // Default fallback
  'Default': { code: 'USD', symbol: '$', name: 'US Dollar' }
};

/**
 * Get currency information based on country
 * @param {string} country - Country name
 * @returns {Object} Currency object with code, symbol, and name
 */
export const getCurrencyByCountry = (country) => {
  if (!country) return COUNTRY_CURRENCY_MAP['Default'];
  
  // Normalize country name and check for exact match
  const normalizedCountry = country.trim();
  
  // First, try exact match
  if (COUNTRY_CURRENCY_MAP[normalizedCountry]) {
    return COUNTRY_CURRENCY_MAP[normalizedCountry];
  }
  
  // Try case-insensitive match
  const countryKey = Object.keys(COUNTRY_CURRENCY_MAP).find(
    key => key.toLowerCase() === normalizedCountry.toLowerCase()
  );
  
  if (countryKey) {
    return COUNTRY_CURRENCY_MAP[countryKey];
  }
  
  // Try partial match for common variations
  const partialMatch = Object.keys(COUNTRY_CURRENCY_MAP).find(key =>
    key.toLowerCase().includes(normalizedCountry.toLowerCase()) ||
    normalizedCountry.toLowerCase().includes(key.toLowerCase())
  );
  
  if (partialMatch) {
    return COUNTRY_CURRENCY_MAP[partialMatch];
  }
  
  // Default fallback
  console.warn(`Currency not found for country: ${country}. Using USD as fallback.`);
  return COUNTRY_CURRENCY_MAP['Default'];
};

/**
 * Format currency amount with proper symbol and locale formatting
 * @param {number|string} amount - Amount to format
 * @param {string} country - User's country
 * @param {Object} options - Formatting options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, country, options = {}) => {
  const currency = getCurrencyByCountry(country);
  const numAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount || 0;
  
  const {
    showDecimals = true,
    showSymbol = true,
    showCode = false,
    locale = 'en-US'
  } = options;

  // Format number with appropriate decimal places
  const formattedAmount = showDecimals 
    ? numAmount.toLocaleString(locale, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    : Math.floor(numAmount).toLocaleString(locale);

  // Build the formatted string
  let result = '';
  
  if (showSymbol) {
    result = `${currency.symbol}${formattedAmount}`;
  } else {
    result = formattedAmount;
  }
  
  if (showCode) {
    result += ` ${currency.code}`;
  }
  
  return result;
};

/**
 * Get currency symbol only
 * @param {string} country - User's country
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (country) => {
  const currency = getCurrencyByCountry(country);
  return currency.symbol;
};

/**
 * Get currency code only
 * @param {string} country - User's country
 * @returns {string} Currency code
 */
export const getCurrencyCode = (country) => {
  const currency = getCurrencyByCountry(country);
  return currency.code;
};

/**
 * Get currency name
 * @param {string} country - User's country
 * @returns {string} Currency name
 */
export const getCurrencyName = (country) => {
  const currency = getCurrencyByCountry(country);
  return currency.name;
};

/**
 * Check if a country uses a specific currency
 * @param {string} country - Country name
 * @param {string} currencyCode - Currency code to check
 * @returns {boolean} True if country uses the currency
 */
export const countryUsesCurrency = (country, currencyCode) => {
  const currency = getCurrencyByCountry(country);
  return currency.code === currencyCode.toUpperCase();
};

/**
 * Get all countries that use a specific currency
 * @param {string} currencyCode - Currency code
 * @returns {Array} Array of country names
 */
export const getCountriesByCurrency = (currencyCode) => {
  return Object.keys(COUNTRY_CURRENCY_MAP).filter(country => 
    COUNTRY_CURRENCY_MAP[country].code === currencyCode.toUpperCase()
  );
};

/**
 * Parse amount string and remove currency symbols
 * @param {string} amountString - Amount with currency symbol
 * @returns {number} Parsed number
 */
export const parseCurrencyAmount = (amountString) => {
  if (typeof amountString === 'number') return amountString;
  
  // Remove common currency symbols and spaces, keep numbers and decimal points
  const cleanAmount = amountString.replace(/[^\d.-]/g, '');
  return parseFloat(cleanAmount) || 0;
};

/**
 * Convert amount from one currency to another (placeholder for future implementation)
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {number} Converted amount (currently returns same amount)
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Placeholder for currency conversion
  // In a real implementation, you would call a currency conversion API
  console.warn('Currency conversion not implemented. Returning original amount.');
  return amount;
};

export default {
  COUNTRY_CURRENCY_MAP,
  getCurrencyByCountry,
  formatCurrency,
  getCurrencySymbol,
  getCurrencyCode,
  getCurrencyName,
  countryUsesCurrency,
  getCountriesByCurrency,
  parseCurrencyAmount,
  convertCurrency
};
