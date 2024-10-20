
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main section.carousel-embed'); // Ensure this matches your main content container
    fetch('../components/carousel.html')
        .then(response => {
            if (!response.ok) throw new Error('Carousel component not found!');
            return response.text();
        })
        .then(html => {
            mainContainer.innerHTML += html;
        })
        .catch(error => {
            console.error(error);
        });
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
        const slideChildren = Array.from(carouselSlide.children);
        slideChildren.forEach(child => {
            const clone = child.cloneNode(true);
            carouselSlide.appendChild(clone);
        });
    }
});