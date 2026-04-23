function enterSite(){

    window.location.href = "main.html";

}

const heroImages = [

    "images/hero1.jpg",

    "images/hero2.jpg",

    "images/hero3.jpg"

];

let currentHero = 0;

function updateHeroCarousel(){

    const hero = document.getElementById("heroCarousel");

    const dots = document.querySelectorAll(".dot");

    if(hero){

        hero.src = heroImages[currentHero];

    }

    dots.forEach(dot => dot.classList.remove("active-dot"));

    if(dots[currentHero]){

        dots[currentHero].classList.add("active-dot");

    }

}

function nextHero(){

    currentHero++;

    if(currentHero >= heroImages.length){

        currentHero = 0;

    }

    updateHeroCarousel();

}

function prevHero(){

    currentHero--;

    if(currentHero < 0){

        currentHero = heroImages.length - 1;

    }

    updateHeroCarousel();

}

setInterval(function(){

    nextHero();

}, 3000);