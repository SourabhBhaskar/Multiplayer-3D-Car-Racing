import React, { createContext, useState, useContext } from 'react';


const AssetsContext = createContext();


export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState({});

  return (
    <AssetsContext.Provider value={{ assets, setAssets }}>
      {children}
    </AssetsContext.Provider>
  );
};


export const useAssets = () => useContext(AssetsContext);
