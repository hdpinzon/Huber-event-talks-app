# NEON TECH 2026 | EVENT SCHEDULE

A futuristic, high-performance event management platform built for the **Neon Tech 2026** conference. This application allows attendees to browse the event schedule, filter talks by category, and search for specific speakers using a modern "Cyberpunk" aesthetic.

## 🚀 Features

- **Dynamic Schedule:** Real-time rendering of event talks from a JSON backend.
- **Advanced Filtering:** Filter talks by technical categories (AI, Quantum, Security, etc.).
- **Speaker Search:** Instant search functionality to find protocols by speaker name.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Neon UI/UX:** Styled with custom CSS variables, Google Fonts (Orbitron, Roboto Mono), and glitch effects.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3 (Custom Variables & Animations), Vanilla JavaScript
- **Data:** JSON-based persistent storage

## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hdpinzon/Huber-event-talks-app.git
   cd Huber-event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃 Usage

To start the local development server:

```bash
npm start
```

The server will be running at `http://localhost:8080`.

## 📂 Project Structure

- `server.js`: Express server handling static files and the `/api/talks` endpoint.
- `data/`: Contains `talks.json`, the source of truth for event data.
- `public/`:
    - `index.html`: Main application interface.
    - `styles.css`: Futuristic styling and animations.
    - `script.js`: Frontend logic for fetching data and handling UI interactions.

## 🛡️ License

This project is licensed under the ISC License.

---
*Protocol: NEON_TECH_2026 | Status: SECURE*
