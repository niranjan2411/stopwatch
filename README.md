# Work Hours Stopwatch

### [View Live App](https://stopwatch-theta-sooty.vercel.app/)

A modern, responsive, and feature-rich stopwatch application built with plain HTML, CSS, and JavaScript. It's designed for tracking work hours, with a clean UI and persistent state.
<img width="1440" height="808" alt="Screenshot 2025-11-10 at 11 23 20 AM" src="https://github.com/user-attachments/assets/5580a0f7-68bd-4095-ae74-a1811cb70fbc" />


## 🚀 Features

- 🕒 **Accurate Stopwatch** — measures hours, minutes, seconds, and milliseconds precisely.  
- 🌐 **Runs in Background** — continues to count while switching tabs.  
- 🔁 **Persistent State** — saves time and state using localStorage (resumes after refresh).  
- 📜 **Live Browser Tab Time** — shows real-time stopwatch value in the tab title.  
- 🎯 **Simple UI** — minimal, centered stopwatch with Start, Pause, and Reset controls.

---

## 🧩 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)  
- **Storage:** Browser LocalStorage  
- **Time Tracking:** JavaScript Date API  

---

## ⚙️ Working Principle

1. On clicking **Start**, the current time (`Date.now()`) is saved as the start timestamp.  
2. The **elapsed time** is calculated as the difference between `Date.now()` and the stored start time.  
3. The display updates every few milliseconds using `setInterval()`.  
4. When **Pause** is clicked, the stopwatch stops updating but stores the elapsed time.  
5. When **Reset** is clicked, the elapsed time resets to zero.  
6. The stopwatch’s elapsed time and state are saved in `localStorage`, allowing persistence after a page reload.  
7. The **document title** updates dynamically to reflect the running time.  

---

## 📁 Project Structure

stopwatch/
│
├── index.html # Main stopwatch code (HTML, CSS, JS combined)
└── README.md # Project documentation

yaml
Copy code

---

## 🖱️ How to Use

1. Open `index.html` in any modern browser.  
2. Click **Start** to begin timing.  
3. Click **Pause** to stop temporarily.  
4. Click **Reset** to clear the stopwatch.  
5. Try switching browser tabs or refreshing — the stopwatch continues seamlessly.

---

## 🧠 Key JavaScript Concepts Used

- `setInterval()` for updating time every few milliseconds  
- `Date.now()` for accurate time calculation  
- `localStorage` for saving and restoring stopwatch state  
- `document.title` to update the live tab time  
- Event listeners for Start, Pause, and Reset actions  

---

## 📸 Preview
<img width="715" height="668" alt="Screenshot 2025-11-10 at 11 26 17 AM" src="https://github.com/user-attachments/assets/eb4f9462-559e-4bf3-a0d8-d217324ee016" />


