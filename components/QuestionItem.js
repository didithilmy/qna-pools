import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import styles from "../styles/QuestionItem.module.css";

export default function QuestionItem({
  question,
  no,
  onRevealed,
  onHidden,
  onDelete,
}) {
  const [flipped, setFlipped] = useState(question.revealed);

  useEffect(() => {
    setFlipped(question.revealed);
  }, [question.revealed]);

  useEffect(() => {
    if (flipped) onRevealed?.();
    else onHidden?.();
  }, [flipped, onHidden, onRevealed]);

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <div
        className={`${styles.item} card bg-light`}
        onClick={() => setFlipped(true)}
      >
        <div className={`card-body ${styles.itemLocked}`}>
          <h1>#{no}</h1>
        </div>
      </div>
      <div className={`${styles.item} card`}>
        <div className="card-body">
          <div className="text-muted mb-2">
            From <b>{question.name ?? "Anonymous"}</b>
          </div>
          <h5>{question.question}</h5>
          <a
            className={`text-primary`}
            style={{ cursor: "pointer" }}
            onClick={() => setFlipped(false)}
          >
            <small>Hide</small>
          </a>{" "}
          &middot;{" "}
          <a
            className={`text-danger`}
            style={{ cursor: "pointer" }}
            onClick={onDelete}
          >
            <small>Delete</small>
          </a>
        </div>
      </div>
    </ReactCardFlip>
  );
}
