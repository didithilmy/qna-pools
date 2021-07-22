import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const [roomCode, setRoomCode] = useState();
  const joinRoom = () => {
    if (!!roomCode) {
      router.push(`/${roomCode}`);
    }
  };

  const [loading, setLoading] = useState();
  const createRoom = () => {
    setLoading(true);
    fetch("/api/get_room_code")
      .then((res) => res.json())
      .then((json) => router.push(`/${json.roomId}`))
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Summies Magic Hat</title>
        <meta name="description" content="Summies question-and-answer pools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <form
          onSubmit={(e) => {
            joinRoom();
            e.preventDefault();
          }}
        >
          <div class="mb-3">
            <label for="roomCode" class="form-label">
              Room code
            </label>
            <input
              type="text"
              class="form-control"
              id="roomCode"
              placeholder="XXXX"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-outline-secondary">
              Join
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={createRoom}
              disabled={loading}
            >
              {loading && "Loading..."}
              {!loading && "Create a Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
