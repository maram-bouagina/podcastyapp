import React, { createContext, useState } from "react";

// Create context
export const SearchContext = createContext();

// Create provider
export const SearchProvider = ({ children }) => {
  const [valueSearch, setValueSearch] = useState('');

  return (
    <SearchContext.Provider value={{ valueSearch, setValueSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
