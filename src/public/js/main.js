/*=============== SHOW MENU ===============*/

const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*============ MENU SHOW ============*/
// validate if constant exist
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}


/*============ MENU HIDDEN ============*/
// validate if constant exist
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // when we click on each nav__link, we remove the show menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/

//TRANSPARENT HEADER WHEN SCROLL
const scrollHeader = () => {
    const header = document.getElementById('header');
    let scrollY = window.scrollY; //current scroll position

    // Start at full opacity (1) and decrease to 0.5 as user scrolls down
    let opacity = Math.max(0.5, 1 - (scrollY / 200));

    // Apply background color with dynamic opacity
    header.style.backgroundColor = `rgba(240, 237, 238, ${opacity})`;
};

window.addEventListener('scroll', scrollHeader);



/*=============== SLIDING ===============*/

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".parking__card__container");
    const cards = document.querySelectorAll(".parking__card");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let index = 0;
    const totalCards = cards.length;
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth; //the width of one card
        const gap = 16; // Adjust if there's a margin/gap between cards
        const offset = -(index * (cardWidth + gap));
        
        container.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
        container.style.transform = `translateX(${offset}px)`;

        // Apply fade effect
        cards.forEach((card, i) => {
            card.style.opacity = (i === index || i === index - 1 || i === index + 1) ? "1" : "0.5";
        });

        // Disable buttons at start/end
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalCards - 1;
    }

    function showNextCard() {
        if (index < totalCards - 1) { // Stop at the last card
            index++;
            updateCarousel();
        }
    }

    function showPrevCard() {
        if (index > 0) { // Stop at the first card
            index--;
            updateCarousel();
        }
    }

    nextBtn.addEventListener("click", showNextCard);
    prevBtn.addEventListener("click", showPrevCard);

    // Initial state setup
    updateCarousel();
});

/*=============== SCROLL UP ===============*/

window.addEventListener("scroll", () => {
    const scrollUp = document.getElementById("scroll-up");

    // Show the button after scrolling down 200px
    if (window.scrollY >= 200) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
});