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

let carouselInterval = setInterval(updateActiveButton, 3500);

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        clearInterval(carouselInterval);
        i = index;
        updateActiveButton();
        carouselInterval = setInterval(updateActiveButton, 3500);
    });
});
