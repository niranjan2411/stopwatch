# Work Hours Stopwatch

### [View Live App](https://stopwatch-theta-sooty.vercel.app/)

A modern, responsive, and feature-rich stopwatch application built with plain HTML, CSS, and JavaScript. It's designed for tracking work hours, with a clean UI and persistent state.
<img width="1000" height="700" alt="ab" src="https://github.com/user-attachments/assets/7b51328a-7178-473c-abbb-952dbce09ce7" />


## ✨ Features

* **Core Stopwatch Controls**: Start, Stop, and Reset functionality.
* **Persistent State**: Your timer's state (elapsed time, running status) is automatically saved to `localStorage` and restored when you reopen the app.
* **Dynamic Milliseconds**: Shows milliseconds for the first minute for a responsive feel, then hides them to save screen space and improve performance.
* **Light & Dark Mode**: Toggle between light and dark themes. Your preference is saved locally.
* **Picture-in-Picture (Float)**: Pops the timer out into a small, floating window that stays on top of all other applications.
* **Fullscreen Mode**: View the stopwatch in an immersive, distraction-free fullscreen view.
* **Responsive Design**: A clean, modern UI that works beautifully on both desktop and mobile devices.
* **SVG Icons**: Professional, scalable vector icons for all controls.

## 🛠️ Tech Stack

* **HTML5**: Semantic markup for the application structure.
* **CSS3**: Modern CSS using Flexbox, CSS Variables (for theming), and media queries for responsiveness.
* **JavaScript (ES6+)**: Handles all application logic, including:
    * The core timer logic (`setInterval`).
    * `localStorage` for theme and timer state persistence.
    * DOM manipulation.
    * Browser APIs (Picture-in-Picture, Fullscreen).

## 🚀 How to Run Locally

You don't need any complex setup or build tools to run this project.

1.  **Clone the repository (or download the files):**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Open the `index.html` file:**
    Simply open the `index.html` file directly in your web browser.
