import React, { createContext, useState } from "react";


export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [valueSearch, setValueSearch] = useState('');

  return (
    <SearchContext.Provider value={{ valueSearch, setValueSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
