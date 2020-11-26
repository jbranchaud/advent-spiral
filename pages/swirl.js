import { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StarBox from "../components/StarBox.jsx";
import Modal from "../components/Modal.jsx";
import ModalContext from "../src/context/ModalContext.js";
import Airtable from "airtable";

export async function getStaticProps(context) {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Advent with St. Luke's of Logan Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.spiralBox}>
          <StarBox className={styles.starBox} entries={entries} />
          <Modal isHidden={isHidden} onDismiss={handleModalDismiss} />
        </div>
      </main>
    </div>
  );
}
