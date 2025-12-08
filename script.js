const elements=document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right');
function reveal(){elements.forEach(el=>{const pos=el.getBoundingClientRect().top;if(pos<window.innerHeight-50){el.classList.add('show');}});}
window.addEventListener('scroll',reveal);reveal();

// Fade animations on scroll
const fadeElements = document.querySelectorAll('.fade-left, .fade-right');

function fadeOnScroll() {
    fadeElements.forEach(el => {
        let top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('fade-show');
        }
    });
}

window.addEventListener('scroll', fadeOnScroll);
fadeOnScroll();

let angle = 0;
let currentIndex = 0;
let autoPlayInterval;
let isDragging = false;
let startX = 0;

const items = document.querySelectorAll(".carousel-3d-item");
const total = items.length;
const carousel = document.getElementById("carousel3D");
const dotsContainer = document.getElementById("carouselDots");

/* =============== CREATE DOTS =============== */
for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.dataset.index = i;

    dot.addEventListener("click", () => rotateTo(i));
    dotsContainer.appendChild(dot);
}

/* =============== POSITION CARDS IN 3D =============== */
function setPositions() {
    const theta = 360 / total;

    items.forEach((item, i) => {
        const rotation = theta * i;

        // 3 visible cards effect (depth)
        item.style.transform = `
            rotateY(${rotation}deg)
            translateZ(420px)
            translateY(${i === currentIndex ? "-10px" : "10px"})
        `;

        // Pop effect
        item.querySelector(".service-card-3d").classList.remove("active-3d");
    });

    items[currentIndex].querySelector(".service-card-3d").classList.add("active-3d");

    updateDots();
}

/* =============== ROTATION LOGIC =============== */
function rotateCarousel(direction) {
    currentIndex = (currentIndex + direction + total) % total;
    angle += (360 / total) * direction;

    carousel.style.transform = `translateZ(-180px) rotateY(${angle}deg)`;
    setPositions();
}

/* Rotate directly to a card (dot click) */
function rotateTo(index) {
    const direction = index - currentIndex;
    rotateCarousel(direction);
}

/* =============== AUTOPLAY =============== */
function startAutoplay() {
    autoPlayInterval = setInterval(() => {
        rotateCarousel(1);
    }, 3500); // every 3.5 seconds
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
}

/* =============== DOT UPDATES =============== */
function updateDots() {
    document.querySelectorAll(".carousel-dot").forEach(dot => {
        dot.classList.remove("active");
    });
    document.querySelector(`.carousel-dot[data-index="${currentIndex}"]`).classList.add("active");
}

/* =============== DRAG & SWIPE =============== */
carousel.addEventListener("mousedown", (e) => {
    stopAutoplay();
    isDragging = true;
    startX = e.clientX;
});

carousel.addEventListener("mouseup", (e) => {
    isDragging = false;
    let diff = e.clientX - startX;

    if (diff > 60) rotateCarousel(-1);
    if (diff < -60) rotateCarousel(1);

    startAutoplay();
});

/* Mobile swipe */
carousel.addEventListener("touchstart", (e) => {
    stopAutoplay();
    startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff > 60) rotateCarousel(-1);
    if (diff < -60) rotateCarousel(1);

    startAutoplay();
});

/* INIT */
setPositions();
startAutoplay();


