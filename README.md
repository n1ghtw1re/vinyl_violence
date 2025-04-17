
---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   A simple local web server. **This is essential!** Due to browser security restrictions (CORS), the JavaScript `fetch` API used for loading partials will likely fail if you open `index.html` directly using the `file:///` protocol.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[Your-GitHub-Username]/vinyl-violence.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd vinyl-violence
    ```

### Running Locally

You need to serve the files using a local HTTP server. Here are a few common ways:

*   **Using Python 3:**
    ```bash
    python -m http.server
    ```
    (By default, serves on port 8000)

*   **Using Node.js (requires `npm install -g serve` first):**
    ```bash
    serve .
    ```
    (Usually serves on port 3000)

*   **Using VS Code Live Server Extension:**
    If you use Visual Studio Code, install the "Live Server" extension by Ritwick Dey. Right-click on `index.html` in the VS Code explorer and select "Open with Live Server".

*   **Other simple servers (like PHP's built-in server):**
    ```bash
    php -S localhost:8000
    ```

Once the server is running, open your web browser and navigate to `http://localhost:PORT` (replace `PORT` with the port number your server is using, e.g., `http://localhost:8000`).

---

## Usage: Adding New Content

Content management is currently a **manual process**.

### Adding a New Article

1.  **Create New File:** Create a new `.html` file inside the `articles/` directory (e.g., `articles/new-cool-album.html`).
2.  **Basic Structure:** Copy the structure from an existing article (like `articles/pearl-jam-ten.html`). Ensure it includes:
    *   Correct `<!DOCTYPE html>`, `<head>` (with appropriate title, meta description, relative CSS link `../css/style.css`), and `<body>`.
    *   Placeholders for partials: `<div id="header-placeholder"></div>`, `<footer id="footer-placeholder"></footer>`, `<aside id="sidebar-placeholder"></aside>`.
    *   The relative script link: `<script defer src="../js/script.js"></script>`.
3.  **Write Content:** Add your article title (`<h1>`), meta info (`<p class="meta">`), and main content within the `<main id="main-content">` element. Use semantic HTML (paragraphs `<p>`, subheadings `<h2>`, lists `<ul>`/`<ol>`, etc.).
4.  **Update Homepage (`index.html`):**
    *   Add a new `<article class="article-preview">` block near the top of the `<main>` section.
    *   Include the article title linked to the new file (e.g., `<a href="/articles/new-cool-album.html">New Cool Album</a>`).
    *   Add the publication date (`<time>`).
    *   Write a short excerpt (`<p>`).
    *   Include the "Read More" link (`<a href="/articles/new-cool-album.html" class="read-more">...</a>`).
5.  **Update Archive Page (`pages/archive.html`):**
    *   Add a new list item (`<li class="archive-item">`) to the *top* of the `<ul class="archive-list">`.
    *   Include the publication date (`<span class="archive-date">YYYY-MM-DD</span>`) and the linked title (`<a href="/articles/new-cool-album.html">New Cool Album</a>`).

### Adding a New Static Page

1.  **Create New File:** Create a new `.html` file inside the `pages/` directory (e.g., `pages/contact.html`).
2.  **Basic Structure:** Copy the structure from `pages/about.html` or `pages/archive.html`. Ensure correct relative paths for CSS (`../css/style.css`) and JS (`../js/script.js`).
3.  **Add Content:** Write the page content within the `<main>` element.
4.  **Update Navigation (Optional):** If you want the new page in the main navigation, edit `partials/header.html` and add a new list item (`<li><a href="/pages/contact.html">Contact</a></li>`). You might also add a link in the sidebar (`partials/sidebar_right.html`).

---

## Customization

### Theming (Colors, Fonts)

*   Open `css/style.css`.
*   Modify the CSS Variables defined within the `:root { ... }` block at the top.
    *   `--bg-color`: Main background color.
    *   `--text-color`: Main text color.
    *   `--primary-accent`: Main accent color (links, headers).
    *   `--secondary-accent`: Border colors.
    *   `--text-muted-color`: Less important text (footer, dates, meta).
    *   `--link-hover-color`: Link hover color.
    *   `--header-font`: Font family for main headings and navigation.
    *   `--body-font`: Font family for body text.
*   You can change the imported Google Fonts in the `<head>` section of each HTML file or switch to standard web fonts.

### Layout

*   Layout is primarily controlled by CSS Grid and Flexbox rules in `css/style.css`.
*   Look for `.container`, `#main-content`, and `aside` related rules.
*   Media queries (`@media (min-width: ...)` and `@media (max-width: ...)`) handle responsiveness. Adjust breakpoints or styles within these queries as needed.

### Partials (Header, Footer, Sidebar)

*   Edit the content directly within the corresponding files in the `partials/` directory:
    *   `partials/header.html`: Change site title, tagline, navigation links.
    *   `partials/footer.html`: Modify copyright or add other footer elements.
    *   `partials/sidebar_right.html`: Update widgets, links, or sidebar structure.

---

## Potential Future Enhancements

*   **Automated Index/Archive Generation:** A simple Node.js script could read the `articles/` directory and automatically generate the `index.html` previews and `pages/archive.html` list, removing the manual update steps.
*   **Client-Side Search:** Implement basic search functionality using JavaScript to filter articles based on title or content excerpts.
*   **Dark/Light Mode Toggle:** Leverage CSS Variables and a simple JS toggle to switch between themes.
*   **Tagging/Categorization:** Add metadata to articles and build pages or filtering based on tags.
*   **Image Handling:** Implement lazy loading for images or simple lightbox functionality.

---

## Contributing

Contributions are welcome! If you have suggestions for improving the site or find a bug, please feel free to:

1.  **Fork the Project:** Click the 'Fork' button top right.
2.  **Create your Feature Branch:** `git checkout -b feature/AmazingFeature`
3.  **Commit your Changes:** `git commit -m 'Add some AmazingFeature'`
4.  **Push to the Branch:** `git push origin feature/AmazingFeature`
5.  **Open a Pull Request:** Create a PR from your branch to this repository's `main` branch.

Alternatively, you can open an issue with the tag "bug" or "enhancement".

---

## License

Distributed under the MIT License. See `LICENSE` file (you should create one) for more information.

```text
Copyright (c) 2025 [Vinyl Violence]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---

## Contact

[N1ghtw1re Studios] - [n1ghtw1re@proton.me]

---