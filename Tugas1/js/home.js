import { loadCarousel } from '../components/carousel.js';



(async function initHome() {
    const mainContainer = document.querySelector('.carousel-embed');
    if (mainContainer) {
        await loadCarousel(mainContainer);
        console.log('Carousel initialized.');
    } else {
        console.error('.carousel-embed not found!');
    }
})();