import Head from 'next/head'
import styles from '../styles/Home.module.css'
import cx from "classnames"
import Image from 'next/image'

export default function Stir() {
  return (
    <div className={styles.container, styles['gradient-background']}>
      <Head>
        <title>Advent with St. Luke's of Logan Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title, "text-6xl font-bold text-gray-100"}>
          Advent 2020
        </h1>
        <Image src="/stir-up-swirl.svg" alt="" height="1000" width="1000" />
        <Image style={{ position: "absolute", left: "580px", top: "640px" }} onClick={() => { alert("You wished upon a star!") }} src="/star.svg" alt="star" height="50" width="50" />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
