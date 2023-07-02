import { createContext, useState } from 'react';

export const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const contextValue = {
    imageUrls,
    setImageUrls,
  };

  return (
    <ImagesContext.Provider value={ contextValue }>
      {children}
    </ImagesContext.Provider>
  );
};
