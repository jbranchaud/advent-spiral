import { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StarBox from "../components/StarBox.jsx";
import Modal from "../components/Modal.jsx";
import ModalContext from "../src/context/ModalContext.js";

export default function Swirl() {
  const { isHidden, setIsHidden, setStarData } = useContext(ModalContext);

  const handleModalDismiss = () => {
    setIsHidden(true);
    setStarData({});
  };

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
          <StarBox className={styles.starBox} />
          <Modal isHidden={isHidden} onDismiss={handleModalDismiss} />
        </div>
      </main>
    </div>
  );
}
