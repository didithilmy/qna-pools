import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/AddQuestion.module.css";

export default function MagicHatRoom() {
  const router = useRouter();
  const { roomCode } = router.query;

  const [name, setName] = useState();
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState();

  const addQuestion = () => {
    if (!question) return;

    setLoading(true);
    fetch("/api/add_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomCode,
        name,
        question,
      }),
    })
      .then(() => router.push(`/${roomCode}/questions`))
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add a question - Room {roomCode}</title>
      </Head>
      <div className={styles.content}>
        <h5 className="text-muted">Room {roomCode}</h5>
        <h3>Add a question 🙋</h3>
        <form
          className="mt-3"
          onSubmit={(e) => {
            addQuestion();
            e.preventDefault();
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              Just leave it blank if you want to be anonymous 😎
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="question" className="form-label">
              Your question
            </label>
            <textarea
              className="form-control"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && "Loading"}
            {!loading && "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
