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

// Wrap each character in its own span
[...text].forEach(char => {
    const s = document.createElement("span");
    s.textContent = char;
    s.style.display = "inline-block";
    s.style.position = "relative"; // for glitch/aberration
    span.appendChild(s);
});

const letters = span.querySelectorAll("span");
let time = 0;

// store previous offsets for max speed
const prevOffsets = Array.from(letters).map(() => ({ x: 0, y: 0 }));

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

const MAX_SPEED = 4;
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

// flying letters tracker
const flyingLetters = new Map(); // store {x, y, targetX, targetY}

function animate() {
    time += 0.08;

    // pick 0–3 random letters to color
    const coloredLetters = new Set();
    const colorCount = Math.floor(Math.random() * 3) + 1;
    while (coloredLetters.size < colorCount) {
        const idx = Math.floor(Math.random() * letters.length);
        coloredLetters.add(idx);
    }

    // calculate max flying letters allowed: 1/25 of total
    const maxFlying = Math.max(1, Math.floor(letters.length / 25));

    letters.forEach((letter, i) => {
        const phase = time + i * 0.5;
        let x, y;

        // decide if a normal letter should start flying
        if (!flyingLetters.has(i) && flyingLetters.size < maxFlying && Math.random() < 0.005) {
            const startX = 0;
            const startY = 0;
            const targetX = (Math.random() - 0.5) * window.innerWidth * 0.8;
            const targetY = (Math.random() - 0.5) * window.innerHeight * 0.8;
            flyingLetters.set(i, { x: startX, y: startY, targetX, targetY });
        }

        if (flyingLetters.has(i)) {
            // smooth particle motion
            const particle = flyingLetters.get(i);
            const speed = 0.5 + Math.random() * 1;
            particle.x += (particle.targetX - particle.x) * 0.02 * speed;
            particle.y += (particle.targetY - particle.y) * 0.02 * speed;

            x = particle.x;
            y = particle.y;

            // small chance to change target
            if (Math.random() < 0.01) particle.targetX = (Math.random() - 0.5) * window.innerWidth * 0.8;
            if (Math.random() < 0.01) particle.targetY = (Math.random() - 0.5) * window.innerHeight * 0.8;

            // 1% chance to stop flying
            if (Math.random() < 0.01) flyingLetters.delete(i);

        } else {
            // normal chaotic motion
            const targetX = Math.sin(phase * 2) * 8 + Math.sin(phase * 5) * 3 + (Math.random() - 0.5) * 2;
            const targetY = Math.cos(phase * 1.5) * 8 + Math.sin(phase * 4) * 4 + (Math.random() - 0.5) * 2;
            ({ x, y } = clampSpeed(prevOffsets[i], { x: targetX, y: targetY }));
            prevOffsets[i] = { x, y };
        }

        // rotation & scale
        const rotate = Math.sin(phase * 6) * 25;
        let scale = 1 + Math.sin(phase * 7) * 0.15;
        if (Math.random() < 0.02) scale *= 1.5;

        // occasional glitch
        const glitch = Math.random() < 0.02 ? 15 : 0;

        // apply color if selected
        if (coloredLetters.has(i)) {
            letter.style.color = randomColor();
        } else {
            letter.style.color = "";
        }

        // rare chromatic aberration
        if (Math.random() < 0.01) {
            const rOffset = (Math.random() - 0.5) * 4;
            const gOffset = (Math.random() - 0.5) * 4;
            const bOffset = (Math.random() - 0.5) * 4;
            letter.style.textShadow = `
                ${rOffset}px 0 red,
                0 ${gOffset}px lime,
                ${bOffset}px 0 blue
            `;
        } else {
            letter.style.textShadow = "";
        }

        // apply final transform
        letter.style.transform = `
            translate(${x + glitch}px, ${y}px)
            rotate(${rotate}deg)
            scale(${scale})
        `;
    });

    requestAnimationFrame(animate);
}

animate();


