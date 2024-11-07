const CACHE_NAME = 'v1-cache';
const urlsToCache = [
    '/',
    '/index.html',

    // CSS files
    '/assets/css/index.css',
    '/assets/css/about.css',
    '/assets/css/carousel.css',
    '/assets/css/contact.css',
    '/assets/css/courses.css',
    '/assets/css/home.css',
    '/assets/css/lab.css',
    '/assets/css/lab_1.css',
    '/assets/css/pricing.css',

    // JS files
    '/components/carousel.js',
    '/components/faq.js',
    '/components/home.js',
    '/components/index.js',
    '/components/lab_1.js',
    '/components/pricing.js',
    '/components/router.js',

    // HTML pages
    '/pages/404.html',
    '/pages/about.html',
    '/pages/carousel.html',
    '/pages/courses.html',
    '/pages/home.html',
    '/pages/lab.html',
    '/pages/lab_1.html',
    '/pages/pricing.html',

    // Images
    '/assets/images/adv_js.png',
    '/assets/images/car_1.png',
    '/assets/images/car_2.png',
    '/assets/images/car_3.png',
    '/assets/images/car_4.png',
    '/assets/images/car_5.png',
    '/assets/images/car_6.png',
    '/assets/images/carous-1.png',
    '/assets/images/carous-2.png',
    '/assets/images/carous-3.png',
    '/assets/images/carous-4.png',
    '/assets/images/carous-5.png',
    '/assets/images/carous-6.png',
    '/assets/images/carous-7.png',
    '/assets/images/CourseFrontEnd_1.png',
    '/assets/images/CourseFrontEnd_2.png',
    '/assets/images/CourseFrontEnd_3.png',
    '/assets/images/CourseGraphic_1.png',
    '/assets/images/CourseGraphic_2.png',
    '/assets/images/CourseGraphic_3.png',
    '/assets/images/CourseMobile_1.png',
    '/assets/images/CourseMobile_2.png',
    '/assets/images/CourseMobile_3.png',
    '/assets/images/CourseUI_1.png',
    '/assets/images/CourseUI_2.png',
    '/assets/images/CourseUI_3.png',
    '/assets/images/CourseWeb_2.png',
    '/assets/images/CourseWeb_3.png',
    '/assets/images/front_end_web.png',
    '/assets/images/graphic_design.png',
    '/assets/images/hamburger.svg',
    '/assets/images/lab1.png',
    '/assets/images/Logo.png',
    '/assets/images/logo-s.png',
    '/assets/images/mobil_app_dev.png',
    '/assets/images/sidebarX.svg',
    '/assets/images/slogan-lightning.png',
    '/assets/images/slogan-sparkle.png',
    '/assets/images/stock_home.png',
    '/assets/images/ui_ux_design.png',
    '/assets/images/web_design.png'
];

// Rest of your service worker code remains the same
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});