// Clear all child scripts from the .added-scripts container
async function clearScriptsContainer() {
    const scriptsContainer = document.querySelector('.added-scripts');
    if (scriptsContainer) {
        while (scriptsContainer.firstChild) {
            scriptsContainer.removeChild(scriptsContainer.firstChild);
        }
        console.log('.added-scripts container cleared');
    }
}

// Load the page content and add its script
async function loadPageToIndex(page) {
    const mainContainer = document.querySelector('main');
    const scriptsContainer = document.querySelector('.added-scripts');

    // Clear old scripts from .added-scripts
    await clearScriptsContainer();

    const htmlUrl = `./pages/${page}.html`;  // HTML file path
    let scriptUrl = `./js/${page}.js`;       // JS file path

    try {
        // Fetch and load the new page's HTML
        const response = await fetch(htmlUrl);
        if (!response.ok) throw new Error(`Page ${page} not found!`);

        // Inject HTML into main container
        mainContainer.innerHTML = await response.text();
        console.log(`${page}.html loaded.`);

        // Add a cache-busting query parameter to force reload
        scriptUrl += `?t=${new Date().getTime()}`;

        // Create and add a new script tag for the page
        const newScript = document.createElement('script');
        newScript.src = scriptUrl;
        newScript.type = 'module'; // Ensure ES module loading
        newScript.async = false;   // Synchronous execution

        // Add a listener to confirm the script is loaded
        newScript.addEventListener('load', () => {
            console.log(`Script ${scriptUrl} loaded.`);
        });

        // Append the new script to the .added-scripts container
        scriptsContainer.appendChild(newScript);

    } catch (error) {
        console.error('Error loading page:', error);
        mainContainer.innerHTML = '<h1>Error 404 !! - Page Not Found</h1>';
    }
}

// Handle route change
export async function handleRouteChange(page) {
    // Update the browser history
    window.history.pushState({}, page, window.location.origin + `/${page}`);

    // Load the new page content and script
    await loadPageToIndex(page);
}

// Setup navigation event listeners
export async function setupNavigation() {
    const links = document.querySelectorAll('.nav-link, .sidebar a[data-page]');

    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            await handleRouteChange(page);

            // Close sidebar if it's open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.style.display === 'flex') {
                sidebar.style.display = 'none';
            }
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', async () => {
        const path = window.location.pathname.replace('/', '') || 'home';
        await loadPageToIndex(path);
    });

    // Load the initial page on first visit
    const initialPage = window.location.pathname.replace('/', '') || 'home';
    await loadPageToIndex(initialPage);
}