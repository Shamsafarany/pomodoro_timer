import React, { useState, useEffect, useRef } from "react";
import NavButtons from "./NavButtons";
import SessionTracker from "./SessionTracker";
import EditTime from "./EditTime";
import NavBar from "./NavBar";
import { SettingsContext } from "../Context/settingsContext.js";
import alarmSound from "../assets/alarm.wav";

function Timer() {
  const [POMODORO_DURATION, setPomodoroDuration] = useState(25 * 60);
  const [SHORT_BREAK_DURATION, setShortBreakDuration] = useState(5 * 60);
  const [LONG_BREAK_DURATION, setLongBreakDuration] = useState(15 * 60);
  const [timer, setTimer] = useState(POMODORO_DURATION);

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const pomodoroCountRef = useRef(0);

  const alarmRef = useRef(new Audio(alarmSound));

  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const startTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode); 
    setIsRunning(false); 
    switch (newMode) {
      case "pomodoro":
        setTimer(POMODORO_DURATION);
        break;
      case "short":
        setTimer(SHORT_BREAK_DURATION);
        break;
      case "long":
        setTimer(LONG_BREAK_DURATION);
        break;
      default:
        setTimer(POMODORO_DURATION);
    }
  };

  useEffect(() => {
    const previousBodyColor = document.body.style.backgroundColor;
    const container = document.querySelector(".timer-container");
    const previousContainerColor = container?.style.backgroundColor;
    const navBar = document.querySelector(".navBar");
    const saveBtn = document.querySelector(".save-btn");

    let bodyColor,
      containerColor,
      barColor,
      buttonColor,
      buttonHoverColor,
      saveBtnColor,
      saveBtnHoverColor;

    switch (mode) {
      case "pomodoro":
        bodyColor = "#3b1f68";
        containerColor = "#5b2e9d";
        barColor = "#3b1f68";
        buttonColor = "#5b2e9d";
        buttonHoverColor = "#4b2f78";
        saveBtnColor = "#5b2e9d";
        saveBtnHoverColor = "#4b2f78";
        break;
      case "short":
        bodyColor = "#b33951";
        containerColor = "#d95b72";
        barColor = "#b33951";
        buttonColor = "#d95b72";
        buttonHoverColor = "#b33951";
        saveBtnColor = "#d95b72";
        saveBtnHoverColor = "#b33951";
        break;
      case "long":
        bodyColor = "#1f3c88";
        containerColor = "#3057b3";
        barColor = "#1f3c88";
        buttonColor = "#3057b3";
        buttonHoverColor = "#1f3c88";
        saveBtnColor = "#3057b3";
        saveBtnHoverColor = "#1f3c88";
        break;
      default:
        bodyColor = "#3b1f68";
        containerColor = "#5b2e9d";
        barColor = "#3b1f68";
        buttonColor = "#5b2e9d";
        buttonHoverColor = "#4b2f78";
        saveBtnColor = "#5b2e9d";
        saveBtnHoverColor = "#4b2f78";
    }

    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.style.backgroundColor = buttonColor;
      item.onmouseenter = () => {
        item.style.backgroundColor = buttonHoverColor;
      };
      item.onmouseleave = () => {
        item.style.backgroundColor = buttonColor;
      };
    });

    document.body.style.backgroundColor = bodyColor;
    navBar.style.backgroundColor = barColor;
    if (saveBtn) {
      saveBtn.style.color = saveBtnColor;
    }

    if (container) {
      container.style.backgroundColor = containerColor;
    }

    return () => {
      document.body.style.backgroundColor = previousBodyColor;
      if (container) {
        container.style.backgroundColor = previousContainerColor;
      }
    };
  }, [mode, showSettings]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer !== 0) return;
    setIsRunning(false);
    alarmRef.current.currentTime = 0;
    alarmRef.current.play();

    if (mode === "pomodoro") {
      pomodoroCountRef.current += 1;
      const newCount = pomodoroCountRef.current;
      setCompletedPomodoros(newCount);

      const isLongBreak = newCount % 4 === 0;

      if (isLongBreak) {
        setMode("long");
        setTimer(LONG_BREAK_DURATION);
      } else {
        setMode("short");
        setTimer(SHORT_BREAK_DURATION);
      }
    }

    if (mode === "short" || mode === "long") {
      setMode("pomodoro");
      setTimer(POMODORO_DURATION);
    }
  }, [timer]);

  const getModeMessage = () => {
    switch (mode) {
      case "pomodoro":
        return "Time to focus";
      case "short":
        return "Take a short break";
      case "long":
        return "Enjoy a long break";
      default:
        return "";
    }
  };

  function handleCustomTimeChange({ pomodoro, shortBreak, longBreak }) {
    setPomodoroDuration(pomodoro * 60);
    setShortBreakDuration(shortBreak * 60);
    setLongBreakDuration(longBreak * 60);
    if (mode === "pomodoro") {
      setTimer(pomodoro * 60);
    } else if (mode === "short") {
      setTimer(shortBreak * 60);
    } else if (mode === "long") {
      setTimer(longBreak * 60);
    }
  }

  return (
    <>
      <SettingsContext.Provider value={{ showSettings, toggleSettings }}>
        <NavBar />
        <main
          className={`timer-container mode-${mode}`}
          role="main"
          aria-label="Pomodoro Timer"
        >
          <NavButtons
            mode={mode}
            onModeChange={handleModeChange}
            aria-label="Timer mode selection"
          />
          <EditTime
            pomodoroMinutes={POMODORO_DURATION / 60}
            shortBreakMinutes={SHORT_BREAK_DURATION / 60}
            longBreakMinutes={LONG_BREAK_DURATION / 60}
            onChange={handleCustomTimeChange}
            aria-label="Timer duration settings"
          />
          <h1
            className="timeDisplay"
            aria-label={`${formatTime(timer)} remaining`}
          >
            {formatTime(timer)}
          </h1>
          <button
            onClick={startTimer}
            className="startBtn"
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                startTimer(); // This toggles!
              }
            }}
            aria-label={isRunning ? "Pause timer" : "Start timer"}
          >
            {isRunning ? "PAUSE" : "START"}
          </button>
        </main>
        <p className="mode-message" aria-live="polite" role="status">
          {getModeMessage()}
        </p>
        <SessionTracker
          completedPomodoros={completedPomodoros}
          aria-label="Session progress tracker"
        />
      </SettingsContext.Provider>
    </>
  );
}

export default Timer;
