async function loadPageToIndex(page) {
    const mainContainer = document.querySelector('main');
    const url = `./pages/${page}.html`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Page ${page} not found!`);

        const html = await response.text();
        mainContainer.innerHTML = html;
        await recursiveEmbed(mainContainer);

    } catch (error) {
        console.error('Error loading page:', error);
        mainContainer.innerHTML = '<h1>Error 404 !! - Page Not Found</h1>';
    }
}

async function recursiveEmbed(container) {
    const embeds = container.querySelectorAll('[data-embed]');

    for (let embed of embeds) {
        const embedUrl = embed.getAttribute('data-embed');
        const initFunctionName = embed.getAttribute('data-init');

        const componentUrl = window.location.pathname.includes('/pages/')
            ? `../components/${embedUrl}`
            : `./components/${embedUrl}`;

        try {
            const response = await fetch(componentUrl);
            if (!response.ok) throw new Error(`Failed to load: ${componentUrl}`);

            const html = await response.text();
            embed.innerHTML = html;

            if (initFunctionName) {
                const initFunc = window[initFunctionName];
                if (typeof initFunc === 'function') initFunc();
            }

            await recursiveEmbed(embed);

        } catch (error) {
            console.error('Error embedding component:', error);
        }
    }
}


export function handleRouteChange(page) {
    window.history.pushState({}, page, window.location.origin + `/${page}`);
    loadPageToIndex(page);
}

export function setupNavigation() {
    const links = document.querySelectorAll('.nav-link, .sidebar a[data-page]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            handleRouteChange(page);

            const sidebar = document.querySelector('.sidebar');
            if (sidebar.style.display === 'flex') {
                sidebar.style.display = 'none';
            }
        });
    });

    window.addEventListener('popstate', () => {
        const path = window.location.pathname.replace('/', '') || 'home';
        loadPageToIndex(path);
    });

    const initialPage = window.location.pathname.replace('/', '') || 'home';
    loadPageToIndex(initialPage);
}