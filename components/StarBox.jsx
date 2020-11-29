import React, { useContext } from "react";
import SvgStar from "./SvgStar.jsx";
import AdventTitle from "./AdventTitle.jsx";
import ModalContext from "../src/context/ModalContext.js";

function StarBox({ entries, ...rest }) {
  const { setIsHidden, setStarData } = useContext(ModalContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1000 1000"
      {...rest}
    >
      <AdventTitle />
      {entries.map(({ position, x, y, ...entryRest }) => {
        return (
          <SvgStar
            onClick={() => {
              setIsHidden(false);
              setStarData({ position, ...entryRest });
            }}
            x={x}
            y={y}
            position={position}
            entry={entryRest}
          />
        );
      })}
    </svg>
  );
}

export default StarBox;
