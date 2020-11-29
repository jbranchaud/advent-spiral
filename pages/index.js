import { useContext, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StarBox from "../components/StarBox.jsx";
import ActivityModal from "../components/ActivityModal.jsx";
import ExplainerModal from "../components/ExplainerModal.jsx";
import ModalContext from "../src/context/ModalContext.js";
import Airtable from "airtable";
import cx from "classnames";

export async function getStaticProps(_context) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appyEVF7VFjePfZQW"
  );

  const records = await base("Table 1")
    .select({
      fields: ["Date", "Verse/Activity", "Video"],
      sort: [{ field: "Date", direction: "asc" }],
    })
    .firstPage();

  const entries = records.map((record) => record.fields);

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

  const entriesWithStarData = starPositions.map((positionData) => {
    return { ...positionData, ...entries[positionData.position - 1] };
  });

  return { props: { entries: entriesWithStarData } };
}

export default function Swirl({ entries: preformattedEntries }) {
  const { isHidden, setIsHidden, setStarData, today } = useContext(
    ModalContext
  );

  const [isExplainerHidden, setIsExplainerHidden] = useState(true);

  const handleExplainerModalDismiss = () => {
    setIsExplainerHidden(true);
  };

  const handleModalDismiss = () => {
    setIsHidden(true);
    setStarData({});
  };

  const dateStringToCentralTimeZone = (dateString) => {
    return new Date(`${dateString}T00:00:00.000-06:00`);
  };

  const entries = preformattedEntries.map((entry) => {
    // make the date look like 12/25/2020
    const entryDate = dateStringToCentralTimeZone(entry["Date"]);
    const formattedDate = new Intl.DateTimeFormat("en-US").format(entryDate);

    // metadata for helping the SVG display
    const featured = entryDate.getDate() === today.getDate();
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

  const firstEntry = entries.find((entry) => entry.position === 1);
  const featuredEntry = entries.find((entry) => entry.featured);

  const openActivityForToday = () => {
    setIsHidden(false);
    setStarData(featuredEntry || firstEntry);
  };

  console.log("Component Props: ", entries);

  const buttonStyles =
    "m-2 p-2 border-2 border-gray-500 text-gray-500 rounded hover:text-gray-900 hover:border-gray-900 hover:border-4 hover:shadow";

  const meta = {
    title: "Advent Spiral - St. Luke's Lutheran Church of Logan Square",
    description:
      "Celebrate each day of Advent in 2020 with St. Luke's through this virtual Advent Spiral",
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Advent with St. Luke's of Logan Square</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:image"
          content="https://advent-spiral.stlukesls.org/social-card.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image"
          content="https://advent-spiral.stlukesls.org/social-card.png"
        />
      </Head>

      <main className={styles.main}>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-2">
          <h1 className="p-2 text-gray-700">
            <a href="https://stlukesls.org">
              St. Luke's Lutheran Church of Logan Square
            </a>
          </h1>
          <div>
            <button
              onClick={() => {
                setIsExplainerHidden(false);
              }}
              className={cx("", buttonStyles)}
            >
              How Does This Work?
            </button>
            <button
              onClick={openActivityForToday}
              className={cx("", buttonStyles)}
            >
              Today's Activity
            </button>
          </div>
        </div>
        <div className={styles.spiralBox}>
          <StarBox className={styles.starBox} entries={entries} />
          <ActivityModal isHidden={isHidden} onDismiss={handleModalDismiss} />
          <ExplainerModal
            isHidden={isExplainerHidden}
            onDismiss={handleExplainerModalDismiss}
          />
        </div>
      </main>
    </div>
  );
}
