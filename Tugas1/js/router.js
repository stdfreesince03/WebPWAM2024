export async function loadPage(page){
    const mainContainer = document.querySelector('main');
    try{
        const response = await fetch(`./pages/${page}.html`, {});
        if(!response.ok){
            throw new Error(`Page ${page} not found!`);
        }
        mainContainer.innerHTML = await response.text();
    }catch(error){
        console.log(error.message);
        mainContainer.innerHTML = '<h1>Error 404 !! - Page Not Found</h1>';
    }
}

export function handleRouteChange(page){
    window.history.pushState({},page,window.location.origin + `/${page}`);
    loadPage(page);
}

export function setupNavigation(){
    const links = document.querySelectorAll('.nav-link, .sidebar a[data-page]');
    links.forEach(link => link.addEventListener('click', (e)=>{
        e.preventDefault();

        const page = link.getAttribute('data-page');
        handleRouteChange(page);

        const  sideBar = document.querySelector('.sidebar');
        if(sideBar.style.display === 'flex'){
            sideBar.style.display ='none';
        }
    }));

    window.addEventListener('popstate',(e)=>{
        const path = window.location.pathname.replace('/','');
        loadPage(path);
    });

    const initialPage = window.location.pathname.replace('/','') || 'home';
    loadPage(initialPage);
}

