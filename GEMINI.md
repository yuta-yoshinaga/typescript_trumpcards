# GEMINI.md
This file provides guidance to GEMINI when working with code in this repository.

## High-Level Code Architecture

This project is a client-side web application primarily written in TypeScript.

*   **Source Code:** All application logic is written in TypeScript and located in the `src/` directory.
*   **Compilation:** TypeScript files from `src/` are compiled into ES5 JavaScript and output to the `dst/` directory. Source maps (`.map` files) are also generated to aid debugging.
*   **Static Assets:** The `css/`, `fonts/`, `images/`, and `js/` directories contain static assets such as stylesheets (Bootstrap, custom styles), web fonts, card images, and third-party JavaScript libraries (jQuery, Bootstrap).
*   **Entry Point:** The `index.html` file serves as the main entry point for the application. It loads the compiled JavaScript files from `dst/` and the necessary static assets to render the user interface and run the game logic.
*   **Core Logic:** The core game algorithms and logic for card games like Blackjack, Old Maid, and general Trump Cards are implemented as separate TypeScript modules within the `src/` directory (e.g., `BlackJack.ts`, `OldMaid.ts`, `TrumpCards.ts`).

## Commonly Used Commands

### Build

To compile the TypeScript source code into JavaScript, use the TypeScript compiler (`tsc`).

```bash
tsc
```

*Note: If `tsc` is not found, you may need to install TypeScript globally (`npm install -g typescript`) or locally within a project (`npm install typescript`).*

### Run

To run the application, open the `index.html` file in a web browser.

### Tests

No automated test runner or specific test commands were identified in this repository. However, test files such as `src/types/jquery/jquery-tests.ts` exist, which may be intended for manual testing or a custom test setup.

## Important Notes from README.md

*   This project implements a Blackjack algorithm in TypeScript.
*   The project aims to add other card game algorithms in future releases.
*   Deployment is available via GitHub Pages: `https://yuta-yoshinaga.github.io/typescript_trumpcards/`
