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
