import {setupNavigation } from './router.js';

function showSideBar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

document.getElementById('hamburger-dropdown').addEventListener('click',(e)=>{
    e.stopPropagation();
    showSideBar();
});

function closeSideBar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

document.getElementById('sidebar-close').addEventListener('click',(e)=>{
    e.stopPropagation();
    closeSideBar();
});

window.addEventListener('resize',()=>{
    const sidebar = document.querySelector('.sidebar');
    if(window.innerWidth >= 595){
        sidebar.style.display ='none'
    }
});


document.addEventListener('DOMContentLoaded', setupNavigation);