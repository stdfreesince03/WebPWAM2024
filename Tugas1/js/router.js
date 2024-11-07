async function clearScriptsAndStylesContainer() {
    const scriptsContainer = document.querySelector('.added-scripts');
    if (scriptsContainer) {
        while (scriptsContainer.firstChild) {
            scriptsContainer.removeChild(scriptsContainer.firstChild);
        }
        console.log('.added-scripts container cleared');
    }
    const dynamicStyles = document.head.querySelectorAll('link[rel="stylesheet"]:not([href="./assets/css/index.css"])');
    dynamicStyles.forEach(style => {
        style.remove();
    });
    console.log('Dynamic styles cleared');

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';

}

async function loadPageToIndex(page) {
    const mainContainer = document.querySelector('main');
    const scriptsContainer = document.querySelector('.added-scripts');

    await clearScriptsAndStylesContainer();

    let htmlUrl;
    if (page.startsWith('lab_')) {
        htmlUrl = `/pages/${page}.html`;
    } else {
        htmlUrl = `/pages/${page}.html`;
    }

    let scriptUrl = `/js/${page}.js`;
    const styleUrl = `assets/css/${page}.css`;

    console.log('Fetching:', htmlUrl);
    console.log('Loading Script:', scriptUrl);
    console.log('Loading CSS:', styleUrl);

    try {


        await new Promise((resolve, reject) => {
                    const newStyling = document.createElement('link');
                    newStyling.rel = 'stylesheet';
                    newStyling.href = `${styleUrl}?t=${new Date().getTime()}`;
                    newStyling.setAttribute('data-page', page);
                    newStyling.onload = resolve;
                    newStyling.onerror = reject;
                    document.head.appendChild(newStyling);
                    console.log(`${page}.css loaded.`);
                });


        const htmlResponse = await fetch(htmlUrl);
        if (!htmlResponse.ok) throw new Error(`Page ${page} not found!`);

        mainContainer.innerHTML = await htmlResponse.text();
        console.log(`${page}.html loaded.`);

       try{
           await new Promise((resolve, reject) => {
               const newScript = document.createElement('script');
               newScript.src = `${scriptUrl}?t=${new Date().getTime()}`;
               newScript.type = 'module';
               newScript.async = false;
               newScript.onload = resolve;
               newScript.onerror = reject;
               scriptsContainer.appendChild(newScript);
           });
       }catch(error){
           console.log("No js file found");
       }


    } catch (error) {
        console.error('Error loading page:', error);
        const response = await fetch('/pages/404.html');
        mainContainer.innerHTML = await response.text();
    }
}

export async function handleRouteChange(page) {
    console.log('Handling route:', page);

    if (page.startsWith('lab_')) {
        window.history.pushState({}, page, `${window.location.origin}/lab/${page}`);
    } else {
        window.history.pushState({}, page, `${window.location.origin}/${page}`);
    }

    await loadPageToIndex(page);
}

window.goToPage = async function(page) {
    console.log(`Navigating to page: ${page}`);
    await handleRouteChange(page);
};

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
        const path = window.location.pathname.replace('/lab/', '').replace('/', '') || 'home';
        await loadPageToIndex(path);
    });

    const initialPage = window.location.pathname.replace('/lab/', '').replace('/', '') || 'home';
    await loadPageToIndex(initialPage);
}