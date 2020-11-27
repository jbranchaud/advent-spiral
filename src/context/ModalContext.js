import React, { useState } from "react";

const defaultValue = {
  isHidden: true,
  starData: {},
  today: new Date(Date.now()),
  // today: new Date("2020-12-15"),
};

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
