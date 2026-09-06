// Playlist met jouw muziekbestanden
const playlist = [
  "nummer1.mp3",
  "nummer2.mp3",
  "nummer3.mp3"
];

// Laad opgeslagen status bij openen van de pagina
let currentTrack = parseInt(localStorage.getItem('vibeTrack')) || 0;
let isPlaying = localStorage.getItem('vibePlaying') === 'true';
let savedTime = parseFloat(localStorage.getItem('vibeTime')) || 0;

// Zorg dat het audio element direct wordt ingesteld zodra de pagina laadt
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("vibeAudio");
  const stateSpan = document.getElementById("musicState");

  if (audio) {
    audio.src = playlist[currentTrack];
    audio.currentTime = savedTime;

    if (isPlaying) {
      audio.play().then(() => {
        if (stateSpan) stateSpan.innerText = "⏸ Pause";
      }).catch(err => {
        console.log("Autoplay geblokkeerd:", err);
        if (stateSpan) stateSpan.innerText = "▶ Play";
        isPlaying = false;
        localStorage.setItem('vibePlaying', 'false');
      });
    }

    // Bewaar de huidige seconde elke keer dat de tijd update
    audio.addEventListener('timeupdate', () => {
      localStorage.setItem('vibeTime', audio.currentTime);
    });

    // Ga automatisch door naar het volgende nummer als de huidige afgelopen is
    audio.onended = () => {
      currentTrack = (currentTrack + 1) % playlist.length;
      localStorage.setItem('vibeTrack', currentTrack);
      localStorage.setItem('vibeTime', 0);
      audio.src = playlist[currentTrack];
      audio.play();
    };
  }
});

// De klikfunctie die gekoppeld is aan je knop
window.toggleMusic = function() {
  const audio = document.getElementById("vibeAudio");
  const stateSpan = document.getElementById("musicState");

  if (!audio) {
    console.log("Geen audio element gevonden op deze pagina!");
    return;
  }

  // Als er om een of andere reden geen src is, zet hem op de playlist
  if (!audio.src || audio.src === window.location.href) {
    audio.src = playlist[currentTrack];
  }

  if (audio.paused) {
    audio.play().then(() => {
      if (stateSpan) stateSpan.innerText = "⏸ Pause";
      localStorage.setItem('vibePlaying', 'true');
    }).catch(error => {
      console.log("Browser blokkeerde afspelen:", error);
      alert("Klik nogmaals ergens op de pagina om muziek toe te staan!");
    });
  } else {
    audio.pause();
    if (stateSpan) stateSpan.innerText = "▶ Play";
    localStorage.setItem('vibePlaying', 'false');
  }
};