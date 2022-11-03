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
 * Random integer
 * @param {number} low lower bound (inclusive)
 * @param {number} high upper bound (exclusive)
 * @returns {number}
 */
const randint = (low, high) => Math.floor(Math.random() * (high - low)) + low;

/**
 * Random number
 * @param {number} low lower bound (inclusive)
 * @param {number} high upper bound (exclusive)
 * @returns {number}
 */
 const rand = (low, high) => (Math.random() * (high - low)) + low;

/**
 * clamps a number
 * @param {number} n number
 * @param {number} mi 
 * @param {number} ma 
 * @returns {number} clamped
 */
const clamp = (n, mi, ma) => n <= mi ? mi : n >= ma ? ma : n;

/**
 * Merges some objects
 * @param {{}} a 
 * @param {{}} b 
 * @returns {{}} merged
 */
const merge = (a, b) => {
    let r = {};
    for (let ka of Object.keys(a)) r[ka] = a[ka];
    for (let kb of Object.keys(b)) r[kb] = b[kb];
    return r;
}

const clarityFunction = c => Math.min(c[1] / 255 * 4, 1);

/**
 * create a filter for clarity
 * @param {number} target_min the minimum, inclusive; 0
 * @param {number} target_max the maximum, inclusive; 1
 * @returns {{}} object representing the calculated filter values
 */
function filterClarity(target_min, target_max) {
    target_min = clamp(target_min, 0, 1);
    target_max = clamp(target_max, 0, 1);
    
    let minG = Math.min(target_min / 4, 1) * 255;
    let maxG = Math.min(target_max / 4, 1) * 255;
    return {
        filter: "clarity",
        min: minG,
        max: maxG
    }
}

/**
 * create a filter for purity
 * @param {number} target_min minimum value
 * @param {number} target_max maximum value
 * @returns {{}} object representing the calculated filter value
 */
function filterPurity(target_min, target_max) {
    target_min = clamp(target_min, 0, 1);
    target_max = clamp(target_max, 0, 1);

    return {
        filter: "purity",
        min: target_min,
        max: target_max
    }
}

/**
 * make a color
 * @param {[{}]} filters 
 */
function generateFromFilters(filters) {
    let minFactor = 0;
    let maxFactor = 1;
    let minG = 0;
    let maxG = 255;
    filters.forEach(filter => {
        if (filter.filter == "clarity") {
            minG = Math.max(minG, filter.min);
            maxG = Math.min(maxG, filter.max);
        } else if (filter.filter == "purity") {
            minFactor = Math.max(minFactor, filter.min);
            maxFactor = Math.min(maxFactor, filter.max);
        } else {
            throw "bad filter or no filter type";
        }
    });


    let g = randint(minG, maxG);
    let factorRoll = rand(minFactor, maxFactor);
    let spread = (1 - factorRoll) * g;
    let r = randint(0, spread);
    let b = Math.ceil(spread - r);


    // alert(`${minFactor} - ${maxFactor} => ${factorRoll}, ${minG} - ${maxG} => ${g}; ${spread}`)
    return [r, g, b]
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
            let f = [
                filterClarity(0.9, 1),
                filterPurity(0.9, 1)
            ]

            leftCol = generateFromFilters(f);
            rightCol = generateFromFilters(f);
            updColors();
        }, 1000)
    }, "window load listener")
);
