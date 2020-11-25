import React, { useContext } from "react";
import SvgStar from "./SvgStar.jsx";
import ModalContext from "../src/context/ModalContext.js";

// the number of days, which is the number of stars
const NUMBER_OF_STARS = 27;

const starPositions = [
  { position: 27, x: 525, y: 460 },
  { position: 26, x: 515, y: 550 },
  { position: 25, x: 420, y: 500 },
  { position: 24, x: 400, y: 390 },
  { position: 23, x: 515, y: 320 },
  { position: 22, x: 650, y: 350 },
  { position: 21, x: 715, y: 440 },
  { position: 20, x: 725, y: 575 },
  { position: 19, x: 650, y: 670 },
  { position: 18, x: 530, y: 740 },
  { position: 17, x: 380, y: 720 },
  { position: 16, x: 260, y: 620 },
  { position: 15, x: 205, y: 485 },
  { position: 14, x: 220, y: 325 },
  { position: 13, x: 325, y: 195 },
  { position: 12, x: 485, y: 125 },
  { position: 11, x: 660, y: 135 },
  { position: 10, x: 805, y: 220 },
  { position: 9, x: 905, y: 360 },
  { position: 8, x: 930, y: 520 },
  { position: 7, x: 880, y: 700 },
  { position: 6, x: 775, y: 830 },
  { position: 5, x: 630, y: 910 },
  { position: 4, x: 440, y: 940 },
  { position: 3, x: 225, y: 870 },
  { position: 2, x: 75, y: 725 },
  { position: 1, x: 5, y: 530 },
];

function StarBox({ entries: preformattedEntries, ...rest }) {
  const { setIsHidden, setStarData } = useContext(ModalContext);

  if (starPositions.length !== NUMBER_OF_STARS) {
    const message = `ASTROLOGICAL ERROR: There need to be exactly ${NUMBER_OF_STARS} stars.`;
    console.log(message);
  }

  // const today = new Date(Date.now());
  const today = new Date("2020-12-15");

  const entries = preformattedEntries.map((entry) => {
    // make the date look like 12/25/2020
    const entryDate = new Date(entry["Date"]);
    const formattedDate = new Intl.DateTimeFormat("en-US").format(entryDate);

    // metadata for helping the SVG display
    const featured = entryDate.getTime() === today.getTime();
    const inThePast = entryDate < today;

    return {
      ...entry,
      originalDate: entry["Date"],
      dateObj: entryDate,
      ["Date"]: formattedDate,
      featured,
      inThePast,
    };
  });

  console.log(entries);

  const currentPosition = 20;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1000 1000"
      {...rest}
    >
      {starPositions.map(({ position, x, y }) => {
        const entryForPosition = entries[position - 1];
        // console.log(position - 1);
        // console.log(entryForPosition);
        return (
          <SvgStar
            onClick={() => {
              console.log(`Clicking on Star #${position}`);
              if (!entryForPosition.featured && !entryForPosition.inThePast)
                return;

              setIsHidden(false);
              setStarData({ position, ...entryForPosition });
            }}
            x={x}
            y={y}
            position={position}
            entry={entryForPosition}
            highlight={position === currentPosition}
            currentPosition={currentPosition}
          />
        );
      })}
    </svg>
  );
}

export default StarBox;
