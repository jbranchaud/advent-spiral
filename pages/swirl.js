import Head from "next/head";
import styles from "../styles/Home.module.css";
import SvgStar from "../components/SvgStar.jsx";

export default function Swirl() {
  return (
    <div className={(styles.container, styles["gradient-background"])}>
      <Head>
        <title>Advent with St. Luke's of Logan Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={(styles.title, "text-6xl font-bold text-gray-100")}>
          Advent 2020
        </h1>
        <div className={styles.spiralBox}>
          <SvgStar />
        </div>
      </main>
    </div>
  );
}
