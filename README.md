# 🧠 AI Translator — Modern Language Translation Tool

AI Translator is a fresh, modern, and responsive web application designed to provide instant text translation across multiple global languages. Built using clean HTML5, custom CSS3, and native JavaScript, this tool leverages public language APIs and browser features to deliver a seamless user experience wrapped in a beautiful, vibrant design.

---

## Key Features

- **Multi-Language Support:** Easily translate text between various international languages including Arabic, English, French, Spanish, German, Hindi, Japanese, Chinese, Russian, Portuguese, and Turkish.
- **Asynchronous API Integration:** Uses the **MyMemory API** with modern JavaScript (`async/await` and `fetch`) to process and deliver translations instantly.
- **Dynamic Language Exchange:** Features a quick-swap button that instantly flips the source and target texts alongside their selected languages, complete with a smooth 180-degree arrow rotation animation.
- **Text-to-Speech (TTS):** Integrated browser `SpeechSynthesis` functionality that reads out both the source and translated text with the correct native accents (fully optimized for regional voice matching).
- **One-Click Clipboard Copy:** A dedicated copy button allows users to quickly grab the translated output, enhanced by a colorful visual success feedback.
- **Fresh & Responsive UI:** A premium user interface sporting a **Pistache Green & Coral Pink** aesthetic, responsive glassmorphism containers, hover scaling, and full layout adaptability for smartphones and tablets.

---

## Design Specification

The interface stands out with its bright, energetic, and clean color palette:
- **Background Gradient:** Light and refreshing pastel blend (`#f5fbf7` to `#fef2f4`).
- **Accent Elements:** Mint/Pistache highlights (`#2e7d32`, `#e8f5e9`) mixed with deep Coral Pink gradients (`#e91e63`, `#d81b60`) for buttons and typography.
- **Glassmorphism Base:** Smooth blurred backgrounds, rounded edges ($24\text{px}$ container border radius), and soft shadows to capture a premium feeling.

---

## Project Structure

```text
CodeAlpha_FAQ-Chatbot/
│
├── index.html   # Main application structure & layout
├── style.css    # Premium Pistache & Coral custom styling
└── app.js       # Dynamic DOM rendering, API calling & Audio logic