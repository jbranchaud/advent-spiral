import React, { useContext } from "react";
import SvgStar from "./SvgStar.jsx";
import AdventTitle from "./AdventTitle.jsx";
import ModalContext from "../src/context/ModalContext.js";

// the number of days, which is the number of stars
// const NUMBER_OF_STARS = 27;

function StarBox({ entries, ...rest }) {
  const { setIsHidden, setStarData } = useContext(ModalContext);

  // if (starPositions.length !== NUMBER_OF_STARS) {
  //   const message = `ASTROLOGICAL ERROR: There need to be exactly ${NUMBER_OF_STARS} stars.`;
  //   console.log(message);
  // }

  console.log(entries);

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
              console.log(`Clicking on Star #${position}`);
              // if (!entryForPosition.featured && !entryForPosition.inThePast)
              //   return;

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
