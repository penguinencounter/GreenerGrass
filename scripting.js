window.addEventListener("load", () => {
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const container = document.querySelector("body");
    left.addEventListener("mouseenter", () => {
        container.classList.add("hover-left");
    });
    left.addEventListener("mouseleave", () => {
        container.classList.remove("hover-left");
    });
    right.addEventListener("mouseenter", () => {
        container.classList.add("hover-right");
    });
    right.addEventListener("mouseleave", () => {
        container.classList.remove("hover-right");
    });

    function scoreColor(r, g, b) {
        const purity = g / (r + g + b);
        const clarity = Math.min((g/255) * 2, 1);
        return purity * clarity;
    }

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return [r, g, b];
    }
})