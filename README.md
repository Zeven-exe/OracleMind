# 🔮 The Cipher: AI Mind Reader

> *"I will decrypt your thoughts..."*

**The Cipher** is a next-generation "Mind Reading" web game inspired by Akinator but designed for **passwords**. It combines the logic of a **Binary Search Tree** with **LLM-based Social Engineering** to guess the user's secret password.

Using the **Groq API** (Llama-3-70b), the AI acts as a "Mystical Hacker," asking psychological questions to narrow down the pattern, eventually cracking complex passwords like `rehan123` or `admin2024` through pattern mutation analysis.

---

## ⚡ Features

* **🧠 Social Engineering Engine:** The AI doesn't just ask random questions. It uses "butter-smooth" conversation to extract key details (names, dates, pets) without raising suspicion.
* **🧬 Password Mutation Logic:** Based on hacker algorithms, the AI automatically checks common variations. If you think of "Luna", it checks `Luna123`, `Luna2024`, `lunaluna`, etc.
* **🧞 Reactive Genie Avatar:** Includes a fully animated Pixel Art Genie that reacts to the game state:
    * **Idle:** Waiting for input.
    * **Thinking:** Consulting the algorithm (1.5s delay).
    * **Win:** Celebrating a successful crack.
    * **Lose:** Admitting defeat.
* **🎨 Mystical UI:** A blend of Cyberpunk and Fantasy, featuring dark void backgrounds, golden accents, and glowing effects.
* **🚀 Lightning Fast:** Powered by Groq's LPU (Language Processing Unit) for near-instant logic generation.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, Vanilla JavaScript (ES6+)
* **Styling:** Tailwind CSS (via CDN) + Custom CSS Animations
* **AI Backend:** Groq API (Model: `llama-3.3-70b-versatile`)
* **Assets:** Custom Pixel Art Genie

---

## 📂 Project Structure

```text
/The-Cipher
│
├── index.html        # Main Game Interface
├── style.css         # Custom Animations & Starfield Background
├── script.js         # Game Logic, API Integration & Mutation Engine
├── logo.png          # Browser Tab Icon
│
├── genie_idle.png    # Avatar State: Normal
├── genie_think.png   # Avatar State: Thinking
├── genie_win.png     # Avatar State: Success
└── genie_lose.png    # Avatar State: Defeat