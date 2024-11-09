import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Carousel.module.css';

const images = [
    { src: '../../public/images/carous-1.png', alt: 'Logo 1' },
    { src: '../../public/images/carous-2.png', alt: 'Logo 2' },
    { src: '../../public/images/carous-3.png', alt: 'Logo 3' },
    { src: '../../public/images/carous-4.png', alt: 'Logo 4' },
    { src: '../../public/images/carous-5.png', alt: 'Logo 5' },
    { src: '../../public/images/carous-6.png', alt: 'Logo 6' }
];


const CarouselItem = React.memo(({ src, alt }) => (
    <div className={styles.carouselItem}>
        <img src={src} alt={alt} className={styles.image} />
    </div>
));


CarouselItem.displayName = "CarouselItem";


CarouselItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default function Carousel() {
    return (
        <div className={styles['carousel-embed']}>
            <div className={styles['carousel-slide']}>
                {images.map((image, index) => (
                    <React.Fragment key={index}>
                        <CarouselItem src={image.src} alt={image.alt} />
                        {index < images.length - 1 && <div className={styles.separator}></div>}
                    </React.Fragment>
                ))}
                {images.map((image, index) => (
                    <React.Fragment key={index + images.length}>
                        <CarouselItem src={image.src} alt={image.alt} />
                        {index < images.length - 1 && <div className={styles.separator}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}