[![React CI (Run Unit Tests)](https://github.com/vsv-noon/rss-react-2026Q2/actions/workflows/node.js.yml/badge.svg)](https://github.com/vsv-noon/rss-react-2026Q2/actions/workflows/node.js.yml)

# Rick and Morty Client

A feature-rich, responsive web application for browsing and managing characters from the Rick and Morty universe. Built as an educational project to master production-grade React workflows, comprehensive state management, and reliable unit testing.

## Features

- **Character Search & Pagination:** Fast filtering by name paired with smooth page-by-page navigation.
- **Side-Panel Profile View:** Clicking a character card opens a detailed info panel on the right side using nested React Router `Outlet`.
- **Stateful Character Selection:** Multi-select characters with selection states securely stored and managed via Redux Toolkit.
- **SelectAction Bar:** A dynamic action bar appears when characters are chosen, displaying the current item count.
- **CSV Data Export:** Seamlessly download data for all selected characters directly into a standard CSV format file.
- **Theme Switching:** Toggle themes effortlessly on the fly with integrated custom style themes.
- **Robust Error Handling:** Native 404 page for non-existent routes and solid error catching during API failures.

## Tech Stack

- **Core Frontend:** React (Hooks & Functional Components)
- **Routing:** React Router DOM (Nested Routes, Error Boundaries)
- **State Management:** Redux Toolkit (RTK) & RTK Query
- **Styling:** SCSS, CSS Modules (Theming via CSS Variables)
- **Testing:** Vitest (Comprehensive Unit Testing for logic and UI components)
- **API:** The Rick and Morty API
