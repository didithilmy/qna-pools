import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import QuestionItem from "../../components/QuestionItem";
import styles from "../../styles/Questions.module.css";

const questions = [1, 2, 3, 4, 5, 6, 7, 8];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MagicHatRoom() {
  const router = useRouter();
  const { roomCode } = router.query;

  const { data, error, mutate } = useSWR(
    "/api/questions?roomId=" + roomCode,
    fetcher,
    { refreshInterval: 3000 }
  );

  const onRevealed = (questionId) => {
    fetch("/api/reveal_question", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        revealed: true,
      }),
    });
  };

  const onHidden = (questionId) => {
    fetch("/api/reveal_question", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId,
        revealed: false,
      }),
    });
  };

  const onDelete = (questionId) => {
    if (confirm("Delete question?")) {
      fetch("/api/delete_question", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
        }),
      }).then(() => mutate());
    }
  };

  return (
    <div>
      <Head>
        <title>Questions - Room {roomCode}</title>
      </Head>
      <div className={styles.content}>
        <div>
          <h5 className="text-muted">Room {roomCode}</h5>
          <h3>Pick a question to reveal</h3>
        </div>
        {!data && !error && <h4>Loading...</h4>}
        <div className="row g-4 mt-3">
          {data?.map((q, i) => (
            <div className="col-xxl-3 col-lg-4 col-sm-6" key={q.id}>
              <QuestionItem
                question={q}
                no={i + 1}
                onRevealed={() => onRevealed(q.id)}
                onHidden={() => onHidden(q.id)}
                onDelete={() => onDelete(q.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
