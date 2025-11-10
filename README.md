# Work Hours Stopwatch

### [View Live App](https://stopwatch-theta-sooty.vercel.app/)

A modern, responsive, and feature-rich stopwatch application built with plain HTML, CSS, and JavaScript. It's designed for tracking work hours, with a clean UI and persistent state.
<img width="1440" height="808" alt="Screenshot 2025-11-10 at 11 23 20 AM" src="https://github.com/user-attachments/assets/5580a0f7-68bd-4095-ae74-a1811cb70fbc" />


## 🚀 Features

- 🕒 **Accurate Stopwatch** — measures hours, minutes, seconds, and milliseconds.  
- 🔁 **Persistent Data** — stopwatch state and time are saved in localStorage to survive refreshes.  
- 🌐 **Background Running** — continues tracking time while switching browser tabs.  
- 🎨 **Modern Digital UI** — black theme with glowing green digital-style display.  
- 📱 **Fully Responsive** — optimized for desktop, tablet, and mobile screens.  
- 🧭 **Live Tab Title** — running time shown dynamically in the browser tab.  
- 🖥️ **Fullscreen Mode** — toggle fullscreen using the ⛶ icon for a focused experience.  

---

## 🧩 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)  
- **Storage:** Browser LocalStorage  
- **Responsive Design:** CSS Flexbox and media queries  

---

## ⚙️ Working Principle

1. When the user clicks **Start**, the app records the current timestamp (`Date.now()`).
2. The elapsed time is calculated as the difference between the current time and the stored start time.
3. The display updates every 10 milliseconds using `setInterval()`.
4. On **Pause**, the timer stops but retains the elapsed time.
5. On **Reset**, the time is cleared.
6. Data is stored in `localStorage` before a page reload, so the stopwatch resumes correctly after refresh.
7. If the tab is switched, the stopwatch continues to run in the background.
8. The live time is shown in the browser tab using `document.title`.

---

## 📁 Project Structure

stopwatch/
│
├── index.html # Main file containing HTML, CSS, and JS
└── README.md # Project documentation

yaml
Copy code

---

## 🖱️ How to Use

1. **Open `index.html`** in any modern web browser.  
2. Click **Start** to begin timing.  
3. Use **Pause** to stop temporarily, or **Reset** to clear.  
4. Click the **⛶ icon** on the top-right to enter or exit fullscreen.  
5. Refresh or switch tabs — the stopwatch continues accurately.

---

## 🧠 Key JavaScript Concepts Used

- `setInterval()` and `clearInterval()` for timer control  
- `Date.now()` for precise time tracking  
- `localStorage` for persistence  
- `document.hidden` event handling  
- `requestFullscreen()` and `exitFullscreen()` APIs  
- DOM manipulation for real-time updates  

---

## 📸 Preview
<img width="715" height="668" alt="Screenshot 2025-11-10 at 11 26 17 AM" src="https://github.com/user-attachments/assets/eb4f9462-559e-4bf3-a0d8-d217324ee016" />

