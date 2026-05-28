document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;
    const interval = 1500;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
        });
        images[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    let sliderInterval = setInterval(nextImage, interval);

    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    slider.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(nextImage, interval);
    });
});
