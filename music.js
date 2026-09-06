// Simpele en betrouwbare muziekspeler voor al je pagina's
window.toggleMusic = function() {
  const audio = document.getElementById("vibeAudio");
  const stateSpan = document.getElementById("musicState");

  if (!audio) {
    console.log("Geen audio element gevonden op deze pagina!");
    return;
  }

  // Als er nog geen muziekbron is ingesteld, zet hem dan op je nummer
  if (!audio.src || audio.src === window.location.href) {
    audio.src = "nummer1.mp3"; // Zorg dat dit jouw muziekbestand is
  }

  if (audio.paused) {
    audio.play().then(() => {
      if (stateSpan) stateSpan.innerText = "⏸ Pause";
    }).catch(error => {
      console.log("Browser blokkeerde afspelen:", error);
      alert("Klik nogmaals ergens op de pagina om muziek toe te staan!");
    });
  } else {
    audio.pause();
    if (stateSpan) stateSpan.innerText = "▶ Play";
  }
};