import React from "react";

export default function ScoreBoard({ score, onCalculate }) {
  return (
    <div>
      <button className="primary-btn" onClick={onCalculate}>
        Calculate Score
      </button>

      {score !== null && (
        <h2 style={{ marginTop: "15px" }}>
          Final Score: {score}
        </h2>
      )}
    </div>
  );
}