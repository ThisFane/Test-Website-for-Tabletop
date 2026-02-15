const modal = document.getElementById("myModal");
const modalEffect = document.getElementById("modelEffect");
const closeButten = document.getElementById("close");

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Login Button was clicked");


    const usernameInput = document.getElementById("username")?.value.trim();
    const passwordInput = document.getElementById("password")?.value.trim();
    const username = "username";
    const password = "password";

    if (usernameInput === username && passwordInput === password) {
        window.alert("logged successful");
        window.location.href = "./login";
        setSession({ username: username });
    } else if (usernameInput === username && passwordInput !== password) {
        window.alert("wrong password");
        event.preventDefault();
    } else {
        window.alert("login failed");
        event.preventDefault();
    }

});



document.getElementById("forgotten").addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Forgotten Login Button was clicked");

    modal.style.display = "block";
    modalEffect.style.display = "block";
});

closeButten.addEventListener("click", function (event) {
    modal.style.display = "none";
    modalEffect.style.display = "none";
})






//Number ANimatioen
const span = document.querySelector("#number span");
const text = span.textContent;
span.textContent = "";

[...text].forEach(char => {
    const s = document.createElement("span");
    s.textContent = char;
    s.style.display = "inline-block";
    s.style.position = "relative";
    span.appendChild(s);
});

const letters = span.querySelectorAll("span");
let time = 0;
const prevOffsets = Array.from(letters).map(() => ({ x: 0, y: 0 }));

// flying letters
const flyingLetters = new Map();
const MAX_FLYING = Math.max(1, Math.floor(letters.length / 25));
const MAX_SPEED = 4;

// cache color per letter and frame
const lastColorChange = Array.from(letters).map(() => 0);
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function clampSpeed(prev, next) {
    let dx = next.x - prev.x;
    let dy = next.y - prev.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > MAX_SPEED) {
        const ratio = MAX_SPEED / dist;
        dx *= ratio;
        dy *= ratio;
    }
    return { x: prev.x + dx, y: prev.y + dy };
}

let frameCount = 0;

function animate() {
    time += 0.08;
    frameCount++;

    // pick 0–3 letters to color every 5 frames
    let coloredLetters = new Set();
    if (frameCount % 5 === 0) {
        const colorCount = Math.floor(Math.random() * 3) + 1;
        while (coloredLetters.size < colorCount) {
            coloredLetters.add(Math.floor(Math.random() * letters.length));
        }
    }

    letters.forEach((letter, i) => {
        const phase = time + i * 0.5;
        let x, y;

        // flying logic
        if (!flyingLetters.has(i) && flyingLetters.size < MAX_FLYING && Math.random() < 0.003) {
            flyingLetters.set(i, {
                x: 0,
                y: 0,
                targetX: (Math.random() - 0.5) * window.innerWidth * 0.8,
                targetY: (Math.random() - 0.5) * window.innerHeight * 0.8
            });
        }

        if (flyingLetters.has(i)) {
            const particle = flyingLetters.get(i);
            const speed = 0.5;
            particle.x += (particle.targetX - particle.x) * 0.02 * speed;
            particle.y += (particle.targetY - particle.y) * 0.02 * speed;

            x = particle.x;
            y = particle.y;

            if (Math.random() < 0.01) particle.targetX = (Math.random() - 0.5) * window.innerWidth * 0.8;
            if (Math.random() < 0.01) particle.targetY = (Math.random() - 0.5) * window.innerHeight * 0.8;

            if (Math.random() < 0.01) flyingLetters.delete(i);
        } else {
            const targetX = Math.sin(phase * 2) * 8 + Math.sin(phase * 5) * 3;
            const targetY = Math.cos(phase * 1.5) * 8 + Math.sin(phase * 4) * 4;
            ({ x, y } = clampSpeed(prevOffsets[i], { x: targetX, y: targetY }));
            prevOffsets[i] = { x, y };
        }

        const rotate = Math.sin(phase * 6) * 20;
        let scale = 1 + Math.sin(phase * 7) * 0.1;

        if (Math.random() < 0.01) scale *= 1.4; // rare spike

        const glitch = Math.random() < 0.01 ? 10 : 0;

        // only update color if it changes
        if (coloredLetters.has(i) && Date.now() - lastColorChange[i] > 300) {
            letter.style.color = randomColor();
            lastColorChange[i] = Date.now();
        } else if (!coloredLetters.has(i)) {
            letter.style.color = "";
        }

        // occasional chromatic aberration every 10 frames
        if (frameCount % 10 === 0 && Math.random() < 0.01) {
            const rOffset = (Math.random() - 0.5) * 3;
            const gOffset = (Math.random() - 0.5) * 3;
            const bOffset = (Math.random() - 0.5) * 3;
            letter.style.textShadow = `
                ${rOffset}px 0 red,
                0 ${gOffset}px lime,
                ${bOffset}px 0 blue
            `;
        } else {
            letter.style.textShadow = "";
        }

        letter.style.transform = `
            translate(${x + glitch}px, ${y}px)
            rotate(${rotate}deg)
            scale(${scale})
        `;
    });

    requestAnimationFrame(animate);
}

animate();

