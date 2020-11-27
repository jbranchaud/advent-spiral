import { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StarBox from "../components/StarBox.jsx";
import ActivityModal from "../components/ActivityModal.jsx";
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

  console.log({ entries });

  return { props: { entries } };
}

export default function Swirl({ entries }) {
  const { isHidden, setIsHidden, setStarData } = useContext(ModalContext);

  const handleModalDismiss = () => {
    setIsHidden(true);
    setStarData({});
  };

  console.log("Component Props: ", entries);

  const buttonStyles =
    "m-2 p-2 border-2 border-gray-500 text-gray-500 rounded hover:text-gray-900 hover:border-gray-900 hover:border-4 hover:shadow";

  return (
    <div className={styles.container}>
      <Head>
        <title>Advent with St. Luke's of Logan Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              alert("Button clicked!");
            }}
            className={cx("", buttonStyles)}
          >
            How Does This Work?
          </button>
          <button
            onClick={() => {
              alert("Button clicked!");
            }}
            className={cx("", buttonStyles)}
          >
            Today's Activity
          </button>
        </div>
        <div className={styles.spiralBox}>
          <StarBox className={styles.starBox} entries={entries} />
          <ActivityModal isHidden={isHidden} onDismiss={handleModalDismiss} />
        </div>
      </main>
    </div>
  );
}
