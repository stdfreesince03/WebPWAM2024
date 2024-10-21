
async function clearScriptsContainer() {
    const scriptsContainer = document.querySelector('.added-scripts');
    if (scriptsContainer) {
        while (scriptsContainer.firstChild) {
            scriptsContainer.removeChild(scriptsContainer.firstChild);
        }
        console.log('.added-scripts container cleared');
    }
}

async function loadPageToIndex(page) {
    const mainContainer = document.querySelector('main');
    const scriptsContainer = document.querySelector('.added-scripts');

    await clearScriptsContainer();

    const htmlUrl = `./pages/${page}.html`;
    let scriptUrl = `./js/${page}.js`;

    try {
        const response = await fetch(htmlUrl);
        if (!response.ok) throw new Error(`Page ${page} not found!`);

        mainContainer.innerHTML = await response.text();
        console.log(`${page}.html loaded.`);

        scriptUrl += `?t=${new Date().getTime()}`;

        const newScript = document.createElement('script');
        newScript.src = scriptUrl;
        newScript.type = 'module';
        newScript.async = false;

        newScript.addEventListener('load', () => {
            console.log(`Script ${scriptUrl} loaded.`);
        });

        scriptsContainer.appendChild(newScript);

    } catch (error) {
        console.error('Error loading page:', error);
        mainContainer.innerHTML = '<h1>Error 404 !! - Page Not Found</h1>';
    }
}

export async function handleRouteChange(page) {
    window.history.pushState({}, page, window.location.origin + `/${page}`);
    await loadPageToIndex(page);
}


export async function setupNavigation() {
    const links = document.querySelectorAll('.nav-link, .sidebar a[data-page]');

    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            await handleRouteChange(page);

            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.style.display === 'flex') {
                sidebar.style.display = 'none';
            }
        });
    });

    window.addEventListener('popstate', async () => {
        const path = window.location.pathname.replace('/', '') || 'home';
        await loadPageToIndex(path);
    });

    const initialPage = window.location.pathname.replace('/', '') || 'home';
    await loadPageToIndex(initialPage);
}