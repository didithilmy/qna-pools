import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/AddQuestion.module.css";

export default function MagicHatRoom() {
  const router = useRouter();
  const { roomCode } = router.query;

  const [name, setName] = useState();
  const [question, setQuestion] = useState();

  const addQuestion = () => {
    if (!question) return;

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
    }).then(() => router.push(`/${roomCode}/questions`));
  };

  return (
    <div className={styles.container}>
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
          <div class="mb-3">
            <label for="name" class="form-label">
              Your name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              Just leave it blank if you want to be anonymous 😎
            </div>
          </div>
          <div class="mb-3">
            <label for="question" class="form-label">
              Your question
            </label>
            <textarea
              class="form-control"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
