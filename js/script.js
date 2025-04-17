document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // --- Configuration ---
    const partials = [
        { id: 'header-placeholder', path: 'partials/header.html' },
        { id: 'footer-placeholder', path: 'partials/footer.html' },
    ];

    // Conditionally add sidebar based on its placeholder existence
    if (document.getElementById('sidebar-placeholder')) {
        partials.push({ id: 'sidebar-placeholder', path: 'partials/sidebar_right.html' });
    }

    // --- Helper Functions ---

    /**
     * Determines the base path relative to the current HTML file.
     * This is crucial for fetching partials and assets correctly from different depths.
     * @returns {string} The base path (e.g., './' or '../').
     */
    function getBasePath() {
        // Simple check: if the path includes '/pages/' or '/articles/', we are one level down.
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('/articles/')) {
            return '../'; // Need to go up one directory
        }
        return './'; // At root level or similar
    }

    /**
     * Loads HTML content from a file into a specified element.
     * @param {string} elementId - The ID of the placeholder element.
     * @param {string} partialPath - The path to the partial HTML file (relative to the partials folder).
     * @param {string} basePath - The calculated base path ('./' or '../').
     */
    async function loadPartial(elementId, partialPath, basePath) {
        const targetElement = document.getElementById(elementId);
        if (!targetElement) {
            console.warn(`Placeholder element with ID '${elementId}' not found.`);
            return;
        }

        const fullPath = `${basePath}${partialPath}`; // Construct the full path relative to the HTML file
        console.log(`Fetching partial: ${fullPath}`);

        try {
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} while fetching ${fullPath}`);
            }
            const html = await response.text();
            targetElement.innerHTML = html;
            console.log(`Successfully loaded partial into #${elementId}`);

            // Optional: Adjust asset paths within the loaded partial if needed
            adjustAssetPaths(targetElement, basePath);

        } catch (error) {
            console.error(`Error loading partial '${fullPath}':`, error);
            targetElement.innerHTML = `<p style="color: red;">Error loading content for ${elementId}.</p>`;
        }
    }

    /**
     * Adjusts the 'src' attribute of elements with 'data-base-src' within a loaded partial.
     * @param {HTMLElement} container - The element containing the loaded partial content.
     * @param {string} basePath - The calculated base path ('./' or '../').
     */
    function adjustAssetPaths(container, basePath) {
        container.querySelectorAll('[data-base-src]').forEach(el => {
            const originalSrc = el.dataset.baseSrc;
            if (originalSrc) {
                el.src = `${basePath}${originalSrc}`;
                console.log(`Adjusted asset path for ${originalSrc} to ${el.src}`);
            }
        });
    }

    /**
     * Highlights the current page in the navigation menu.
     */
    function highlightNavigation() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) return; // Header not loaded yet or doesn't exist

        const navLinks = headerPlaceholder.querySelectorAll('nav a');
        if (navLinks.length === 0) {
            // Wait a brief moment if links aren't immediately available after load
            setTimeout(highlightNavigation, 100);
            return;
        }

        let currentPath = window.location.pathname;

        // Treat '/' and '/index.html' as the same for highlighting the Home link
        if (currentPath === '/') {
            currentPath = '/index.html';
        }
         // Ensure it ends with .html if it's not a directory root, simplifies matching
        if (!currentPath.endsWith('/') && !currentPath.includes('.')) {
             // This case might not be common with simple file structures but handles clean URLs if used later
             // For now, we assume .html files or root.
        }

        console.log(`Current path for nav highlighting: ${currentPath}`);

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Direct comparison works well with root-relative paths
            if (linkPath === currentPath) {
                link.classList.add('active');
                console.log(`Activated nav link: ${linkPath}`);
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Updates the copyright year in the footer.
     */
    function updateCopyrightYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
            console.log('Copyright year updated.');
        } else {
             // Retry if footer hasn't loaded yet
            const footerPlaceholder = document.getElementById('footer-placeholder');
             if (footerPlaceholder && footerPlaceholder.innerHTML) { // Check if footer content exists
                const span = footerPlaceholder.querySelector('#current-year');
                if(span) span.textContent = new Date().getFullYear();
             } else {
                setTimeout(updateCopyrightYear, 100); // Retry shortly
             }
        }
    }

    // --- Initialization ---

    async function initializeSite() {
        const basePath = getBasePath();
        console.log(`Base path determined as: ${basePath}`);

        // Load all partials concurrently
        const loadPromises = partials.map(p => loadPartial(p.id, p.path, basePath));

        try {
            await Promise.all(loadPromises);
            console.log('All partials loaded.');

            // Now that partials are loaded, run functions that depend on their content
            highlightNavigation();
            updateCopyrightYear();

        } catch (error) {
            console.error("Error loading one or more partials:", error);
        }
    }

    initializeSite();

});