import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Summies Magic Hat</title>
        <meta name="description" content="Summies question-and-answer pools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <div class="mb-3">
          <label for="roomCode" class="form-label">
            Room code
          </label>
          <input
            type="text"
            class="form-control"
            id="roomCode"
            placeholder="XXXX"
          />
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-outline-secondary">
            Join
          </button>
          <button type="button" class="btn btn-outline-primary">
            Create a Room
          </button>
        </div>
      </div>
    </div>
  );
}
