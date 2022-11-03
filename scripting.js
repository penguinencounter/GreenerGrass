function wrapErrorAlert(fn, name) {
    return function(...args) {
        try {
            fn(...args)
        }
        catch (e) {
            alert(`Error!\n${e}\ncalled with ${args}\n${name==undefined?"No specified name":"Name: " + name}`)
        }
    }
}

window.addEventListener("load", wrapErrorAlert(() => {
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

    function scoreColor(rgb) {
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
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
    let leftCol = generateRandomColor();
    let rightCol = generateRandomColor();

    function generateColorString(rgb) {
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        return `rgb(${r}, ${g}, ${b})`
    }
    alert(left);
    alert(right)
    left.style.backgroundColor = generateColorString(leftCol);
    right.style.backgroundColor = generateColorString(rightCol);
}))