import React, { useState } from "react";

const defaultValue = { isHidden: true, starData: {} };

const ModalContext = React.createContext(defaultValue);

export const ModalContextProvider = ({ children }) => {
  const [isHidden, setIsHidden] = useState(defaultValue.isHidden);
  const [starData, setStarData] = useState(defaultValue.starData);

  return (
    <ModalContext.Provider
      value={{ ...defaultValue, isHidden, starData, setIsHidden, setStarData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
