'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SearchResultContextProps {
  result: any;
  setResult: React.Dispatch<React.SetStateAction<any>>;
}

const SearchResultContext = createContext<SearchResultContextProps | undefined>(undefined);

export const SearchResultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<any>(null);

  return (
    <SearchResultContext.Provider value={{ result, setResult }}>
      {children}
    </SearchResultContext.Provider>
  );
};

export const useSearchResult = () => {
  const context = useContext(SearchResultContext);
  if (!context) {
    throw new Error('useSearchResult must be used within a SearchResultProvider');
  }
  return context;
};
