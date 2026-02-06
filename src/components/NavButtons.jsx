import React from "react";

function NavButtons({ mode, onModeChange }) {
  return (
    <div className="nav-buttons">
      <button
        className={`nav-btn ${mode === "pomodoro" ? "nav-btn-active" : ""}`}
        onClick={() => onModeChange("pomodoro")}
      >
        Pomodoro
      </button>
      <button
        className={`nav-btn ${mode === "short" ? "nav-btn-active" : ""}`}
        onClick={() => onModeChange("short")}
      >
        Short Break
      </button>
      <button
        className={`nav-btn ${mode === "long" ? "nav-btn-active" : ""}`}
        onClick={() => onModeChange("long")}
      >
        Long Break
      </button>
    </div>
  );
}

export default NavButtons;
