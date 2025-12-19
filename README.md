# [CLICK to Start Playing](https://el-impostor-beta.vercel.app/)

# El Impostor (The Impostor) 🕵️‍♂️

A modern, mobile-first social deduction game built with React, Vite, and Tailwind CSS. Challenge your friends, find the impostor, and avoid being caught!

## 🎮 How to Play

**El Impostor** is a local multiplayer game (pass-and-play) for 3 or more players.

1.  **Setup**: Enter player names and choose the number of impostors.
2.  **Role Distribution**: Pass the device around. Each player secretly views their role:
    *   **Citizens (Allies)**: See a **Secret Word** and a **Category** (e.g., Category: *Animals*, Word: *Lion*).
    *   **The Impostor**: Sees the **Category** only, but *not* the secret word.
3.  **Debate**: Players take turns saying one word related to the secret word to prove they know it, without being too obvious.
    *   *Example*: If the word is "Lion", a citizen might say "King".
    *   The Impostor must blend in and guess the context from others' clues.
4.  **Voting**: After the discussion, players vote to eliminate the suspect.
5.  **Win Conditions**:
    *   **Citizens Win**: If they successfully vote out the Impostor.
    *   **Impostor Wins**: If a Citizen is voted out, or if the Impostor survives until the end (depending on house rules/timer).

## ✨ Features

*   **Bilingual Support**: Seamlessly switch between **Spanish 🇪🇸** and **English 🇺🇸**.
*   **Dynamic Categories**: Hundreds of words across categories like Animals, Food, Movies, Sports, and more.
*   **Score Tracking**: Persistent leaderboard to track wins across multiple rounds.
*   **Mobile-First Design**: Optimized for mobile browsers with a sleek, app-like interface.
*   **Smooth Animations**: Polished UI with transitions and visual feedback.

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) (v19)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: TypeScript

## 🚀 Run Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/erikgonk/elImpostorJuego.git && cd elImpostorJuego
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Check it out on the Web**

Open localhost:3000

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to add new categories, improve translations, or enhance the gameplay.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
