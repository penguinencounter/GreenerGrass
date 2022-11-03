function wrapErrorAlert(fn, name) {
    return function (...args) {
        try {
            fn(...args);
        } catch (e) {
            // return
            alert(
                `Error!\n${e}\ncalled with ${args}\n${
                    name == undefined ? "No specified name" : "Name: " + name
                }`
            );
        }
    };
}

/**
 * clamps a number
 * @param {number} n number
 * @param {number} mi 
 * @param {number} ma 
 * @returns {number} clamped
 */
const clamp = (n, mi, ma) => n <= mi ? mi : n >= ma ? ma : n;
const clarityFunction = c => Math.max(c[1] * 4, 1);

/**
 * create a filter for clarity
 * @param {number} target_min the minimum, inclusive; 0
 * @param {number} target_max the maximum, exclusive; >1
 */
function filterClarity(target_min, target_max) {
    let mininumG = target_min * 4
}

window.addEventListener(
    "load",
    wrapErrorAlert(() => {
        const left = document.querySelector(".left");
        const leftO = {
            score: left.querySelector(".score"),
            red: left.querySelector(".red"),
            green: left.querySelector(".green"),
            blue: left.querySelector(".blue"),
            purity: left.querySelector(".purity"),
            clarity: left.querySelector(".clarity")
        };
        const right = document.querySelector(".right");
        const rightO = {
            score: right.querySelector(".score"),
            red: right.querySelector(".red"),
            green: right.querySelector(".green"),
            blue: right.querySelector(".blue"),
            purity: right.querySelector(".purity"),
            clarity: right.querySelector(".clarity")
        };
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
            let purity;
            if (r + g + b === 0) {
                purity = 0;
            } else {
                purity = g / (r + g + b);
            }
            const clarity = clarityFunction(rgb);
            return [purity * clarity, purity, clarity];
        }

        function generateRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return [r, g, b];
        }

        function generateLimitedColor(pred) {
            let c = generateRandomColor();
            let n = 0
            while (!pred(c)) {
                c = generateRandomColor();
                n++;
                if (n > 10000) {
                    alert("Couldn't find a suitable color! Constraint code: \n" + pred.toString() + "\nPlease report this!");
                    return [0, 0, 0];
                }
            }
            return c;
        }

        let leftCol = generateRandomColor();
        let rightCol = generateRandomColor();

        function generateColorString(rgb) {
            let r = rgb[0];
            let g = rgb[1];
            let b = rgb[2];
            return `rgb(${r}, ${g}, ${b})`;
        }
        
        function updColors() {
            let sl = scoreColor(leftCol);
            let sr = scoreColor(rightCol)
            left.style.backgroundColor = generateColorString(leftCol);
            right.style.backgroundColor = generateColorString(rightCol);
            leftO.score.innerHTML = Math.floor(sl[0] * 1000)/10 + "%";
            rightO.score.innerHTML = Math.floor(sr[0] * 1000)/10 + "%";
            leftO.red.innerHTML = leftCol[0];
            leftO.green.innerHTML = leftCol[1];
            leftO.blue.innerHTML = leftCol[2];
            rightO.red.innerHTML = rightCol[0];
            rightO.green.innerHTML = rightCol[1];
            rightO.blue.innerHTML = rightCol[2];
            
            leftO.purity.innerHTML = Math.floor(sl[1] * 1000)/10 + "%";
            rightO.purity.innerHTML = Math.floor(sr[1] * 1000)/10 + "%";
            
            leftO.clarity.innerHTML = Math.floor(sl[2] * 1000)/10 + "%";
            rightO.clarity.innerHTML = Math.floor(sr[2] * 1000)/10 + "%";
        }

        updColors();
        
        setInterval(() => {
            // Clarity above 50%;
            let f = c => {
                let s = scoreColor(c)
                return s[0] > 0.90;
            }

            leftCol = generateLimitedColor(f);
            rightCol = generateLimitedColor(f);
            updColors();
        }, 1000)
    }, "window load listener")
);
