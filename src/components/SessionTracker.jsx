import React from "react";

function SessionTracker({ completedPomodoros = 0 }) {
  return (
    <div className="session-tracker">
      <p className="session-tracker__label">Completed Pomodoros</p>
      <p className="session-tracker__count">{completedPomodoros}</p>
    </div>
  );
}

export default SessionTracker;
