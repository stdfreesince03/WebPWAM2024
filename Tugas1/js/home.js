import { loadCarousel } from '../components/carousel.js';


document.querySelectorAll('.faq-question .toggle-icon').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        const isOpen = faqItem.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
        });

        if (!isOpen) {
            faqItem.classList.add('open');
        }
    });
});

(async function initHome() {
    const mainContainer = document.querySelector('.carousel-embed');
    if (mainContainer) {
        await loadCarousel(mainContainer);
        console.log('Carousel initialized.');
    } else {
        console.error('.carousel-embed not found!');
    }
})();