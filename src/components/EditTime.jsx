import { SettingsContext } from "../Context/settingsContext.js";
import React, { useContext, useState } from "react";

function EditTime({
  pomodoroMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  onChange,
}) {
  const { showSettings, toggleSettings } = useContext(SettingsContext);

  const [pomodoro, setPomodoro] = useState(pomodoroMinutes);
  const [shortBreak, setShortBreak] = useState(shortBreakMinutes);
  const [longBreak, setLongBreak] = useState(longBreakMinutes);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({ pomodoro, shortBreak, longBreak });
    toggleSettings();
  };
  return (
    <>
      <div
        className={`edit-time ${showSettings ? "visible" : ""}`}
        aria-label="Timer settings"
        aria-describedby="settings-description"
        tabIndex={-1}
      >
        {showSettings && (
          <form
            className="edit-form"
            onSubmit={handleSubmit}
            role="form"
            aria-label="Edit timer durations"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                toggleSettings();
              }
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          >
            <label>
              Pomodoro (minutes)
              <input
                type="number"
                value={pomodoro}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) value = 1;
                  setPomodoro(Number(e.target.value));
                }}
                min="1"
                autoFocus={showSettings}
              />
            </label>

            <label>
              Short Break (minutes)
              <input
                type="number"
                value={shortBreak}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) value = 1;
                  setPomodoro(Number(e.target.value));
                }}
                min="1"
              />
            </label>

            <label>
              Long Break (minutes)
              <input
                type="number"
                value={longBreak}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) value = 1;
                  setPomodoro(Number(e.target.value));
                }}
                min="1"
              />
            </label>

            <button
              type="submit"
              className="save-btn"
              onSubmit={handleSubmit}
              aria-label="submit"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default EditTime;
