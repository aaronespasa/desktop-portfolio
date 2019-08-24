(function init() {
    const $slides = document.querySelectorAll(".slide");
    const $pages = document.querySelector(".page");
    const backgrounds = [
        `radial-gradient(#2B3760, #0B1023)`,
        `radial-gradient(#4E3022, #161616)`,
        `radial-gradient(#4E4342, #0B1023)`
    ];

    function changeDot(dot) {
        $slides.forEach(slide => {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    $slides.forEach((slide, index) => {
        slide.addEventListener("click", function() {
            changeDot(this);
        });
    });
})()