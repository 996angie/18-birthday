(function () {
    const target = new Date(2026, 3, 18, 19, 0, 0);

    let current = { days: null, hours: null, minutes: null, seconds: null };

    const pad = n => String(n).padStart(2, "0");

    function setStatic(u, v) {
        ["top", "bottom", "flip-top", "flip-bottom"].forEach(p => {
            document.getElementById(`gf-${u}-${p}`).textContent = v;
        });
    }

    function animate(u, oldV, newV) {
        if (oldV === newV) return;

        const card = document.getElementById(`gf-${u}-card`);
        document.getElementById(`gf-${u}-flip-top`).textContent = oldV;
        document.getElementById(`gf-${u}-flip-bottom`).textContent = newV;

        card.classList.remove("play");
        void card.offsetWidth;
        card.classList.add("play");

        setTimeout(() => {
            document.getElementById(`gf-${u}-top`).textContent = newV;
            document.getElementById(`gf-${u}-bottom`).textContent = newV;
        }, 350);

        setTimeout(() => card.classList.remove("play"), 700);
    }

    function update(init = false) {
        let diff = target - new Date();
        if (diff < 0) diff = 0;

        const s = Math.floor(diff / 1000);
        const next = {
            days: String(Math.floor(s / 86400)),
            hours: pad(Math.floor((s % 86400) / 3600)),
            minutes: pad(Math.floor((s % 3600) / 60)),
            seconds: pad(s % 60)
        };

        if (init) {
            Object.keys(next).forEach(k => setStatic(k, next[k]));
        } else {
            Object.keys(next).forEach(k => animate(k, current[k], next[k]));
        }

        current = next;
    }

    update(true);
    setInterval(() => update(false), 1000);
})();
