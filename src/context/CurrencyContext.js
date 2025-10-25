import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrencyByCountry } from '../utils/currencyUtils';

// Create Currency Context
const CurrencyContext = createContext();


export const CurrencyProvider = ({ children }) => {
  const { user } = useSelector(state => state.userAuth);
  
  // Get user's country, fallback to US if not available
  const userCountry = user?.country || 'United States';
  
  // Memoize currency information to prevent unnecessary recalculations
  const currencyInfo = useMemo(() => {
    const currency = getCurrencyByCountry(userCountry);
    
    return {
      country: userCountry,
      currency: currency,
      symbol: currency.symbol,
      code: currency.code,
      name: currency.name
    };
  }, [userCountry]);

  const value = {
    ...currencyInfo,
    
    // Helper method to check if user's country is loaded
    isUserCountryLoaded: Boolean(user?.country),
    
    // Helper method to get formatted display
    getDisplayName: () => `${currencyInfo.name} (${currencyInfo.code})`,
    
    // Helper for debugging
    debug: () => ({
      userObject: user,
      detectedCountry: userCountry,
      currencyMapping: currencyInfo
    })
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Hook to use currency context
 * @returns {Object} Currency context values
 */
export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  
  if (!context) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  
  return context;
};

/**
 * HOC to provide currency context to components
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component with currency context
 */
export const withCurrency = (Component) => {
  return function CurrencyWrappedComponent(props) {
    return (
      <CurrencyProvider>
        <Component {...props} />
      </CurrencyProvider>
    );
  };
};

export default CurrencyContext;
