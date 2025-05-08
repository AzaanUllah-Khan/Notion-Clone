const videos = document.querySelectorAll('video');
var toggleBar = document.getElementById("toggle");
toggleBar.addEventListener("click", () => {
    if (toggleBar.className == "fa-solid fa-bars") {
        toggleBar.className = "fa-solid fa-xmark";
    } else {
        toggleBar.className = "fa-solid fa-bars";
    }
});

var images = [
    "./Assets/wikis.avif",
    "./Assets/docs.avif",
    "./Assets/projects.avif",
    "./Assets/ai.avif",
    "./Assets/calendar.avif",
    "./Assets/sites.avif"
];

var i = 0;
var buttons = document.querySelectorAll(".selects button");
var totalButtons = buttons.length;
var image = document.getElementById("dis");

function removeActiveButton(act) {
    for (let j = 0; j < totalButtons; j++) {
        if (j !== act) {
            buttons[j].classList.remove("active");
        }
    }
}

function updateActiveButton() {
    removeActiveButton(i);

    image.style.opacity = 0;

    setTimeout(() => {
        image.src = images[i];
        image.style.opacity = 1;
        buttons[i].classList.add("active");
        i = (i + 1) % totalButtons;
    }, 200);
}

let carouselInterval = setInterval(updateActiveButton, 5000);

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        clearInterval(carouselInterval);
        i = index;
        updateActiveButton();
        carouselInterval = setInterval(updateActiveButton, 5000);
    });
});

window.addEventListener("scroll", (() => {
    if (window.scrollY > 100) {
        document.getElementById("header").style.boxShadow = "0 1.5px 2px #0000001a"
    }
    else {
        document.getElementById("header").style.boxShadow = "none"
    }
}))


videos.forEach(video => {
    video.setAttribute('muted', true);
    video.setAttribute('playsinline', true);
    video.removeAttribute('autoplay');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.5
});
const startObserving = () => {
    videos.forEach(video => observer.observe(video));
    document.removeEventListener('click', startObserving);
    document.removeEventListener('scroll', startObserving);
};
document.addEventListener('click', startObserving);
document.addEventListener('scroll', startObserving);