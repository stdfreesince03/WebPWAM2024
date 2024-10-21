export async function loadCarousel() {
    console.log('fuck');
    console.log('pig latin');
    const carouselContainer = document.querySelector('.carousel-embed');

    if (!carouselContainer) return;

    try {
        const response = await fetch('./components/carousel.html');
        if (!response.ok) {
            console.log('jancuk');
            throw new Error(`Failed to load carousel.html: ${response.status}`);
        }
        const html = await response.text();
        carouselContainer.innerHTML = html;
        console.log('Carousel HTML loaded:', html);

        initCarousel();

    } catch (error) {
        console.error('Error loading carousel:', error);
    }
}

function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const slideChildren = Array.from(carouselSlide.children);
    cloneSlides(carouselSlide, slideChildren);

    let scrollAmount = 0;
    const slideWidth = carouselSlide.scrollWidth / slideChildren.length;
    const speed = 1;

    function animateCarousel() {
        scrollAmount += speed;
        carouselSlide.style.transform = `translateX(-${scrollAmount}px)`;

        if (scrollAmount >= slideWidth * slideChildren.length) {
            scrollAmount = 0;
            carouselSlide.style.transition = 'none';
            carouselSlide.style.transform = 'translateX(0)';
            requestAnimationFrame(() => {
                carouselSlide.style.transition = 'transform 0.2s linear';
            });
        }

        requestAnimationFrame(animateCarousel);
    }

    requestAnimationFrame(animateCarousel);
}

function cloneSlides(carouselSlide, slideChildren) {
    slideChildren.forEach(child => {
        const clone = child.cloneNode(true);
        carouselSlide.appendChild(clone);
    });
}