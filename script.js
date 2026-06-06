let lagu;

document.addEventListener("DOMContentLoaded", () => {
    lagu = document.getElementById("bgMusic");

    if (!lagu) return;

    // Coba autoplay
    lagu.play()
        .then(() => {
            updateMusicButton(true);
        })
        .catch(() => {
            // Jika diblokir browser, tunggu interaksi pertama user
            const unlockAudio = () => {
                lagu.play()
                    .then(() => updateMusicButton(true))
                    .catch(err => console.log(err));

                document.removeEventListener("click", unlockAudio);
                document.removeEventListener("touchstart", unlockAudio);
            };

            document.addEventListener("click", unlockAudio, { once: true });
            document.addEventListener("touchstart", unlockAudio, { once: true });
        });
});

/* =========================
   PLAY / PAUSE MUSIC
========================= */

function toggleMusic() {
    if (!lagu) return;

    if (lagu.paused) {
        lagu.play();
        updateMusicButton(true);
    } else {
        lagu.pause();
        updateMusicButton(false);
    }
}

function updateMusicButton(isPlaying) {
    const tombol = document.getElementById("musicToggle");

    if (tombol) {
        tombol.textContent = isPlaying ? "🎵" : "🔇";
    }
}

/* =========================
   NAVIGASI HALAMAN
========================= */

function goToScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }
}

/* =========================
   BUKA AMPLOP
========================= */

function startSurprise() {
    if (lagu && lagu.paused) {
        lagu.play()
            .then(() => updateMusicButton(true))
            .catch(err => console.log(err));
    }

    goToScreen("screen-menu");
}
