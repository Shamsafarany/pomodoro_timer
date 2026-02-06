# ⏱️ Customizable & Accessible Pomodoro Timer (React)

A fully customizable Pomodoro timer built with React, featuring automatic mode switching, long‑break cycles, keyboard navigation, ARIA accessibility, and optional alarm sounds.  
Designed for focus, simplicity, and inclusivity.

---

## 🚀 Features

## Project Link

- https://roadmap.sh/projects/pomodoro-timer

### 🎯 Core Timer Logic

- Pomodoro → Short Break → Pomodoro
- Long Break every 4 cycles
- Automatic mode switching
- Timer resets correctly based on the active mode
- Optional alarm sound when a session ends

### ⚙️ Customization

- Set custom durations for:
  - Pomodoro
  - Short Break
  - Long Break
- Settings panel with form validation
- Timer updates only for the active mode

### 🔊 Alarm Support

- Alarm sound when the timer reaches zero
- uses `useRef`
- Prevents double‑playing or overlapping audio

### Extra Features

- Sign in and Register
- Accessability: aria-labels and key nav
- useContext and useRef

---

## 🧩 Tech Stack

- **React** (Hooks)
- **CSS** for styling
- **ARIA** for accessibility
- **Audio API** for alarm playback

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd pomodoro-timer
npm install
npm start
