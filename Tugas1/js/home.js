import { loadCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('.carousel-embed');
    if (mainContainer) {
        loadCarousel(mainContainer);
    }
});