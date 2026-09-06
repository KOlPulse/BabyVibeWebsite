// Playlist met jouw muziekbestanden
const playlist = [
  "nummer1.mp3",
  "nummer2.mp3",
  "nummer3.mp3"
];

// Gebruik sessionStorage zodat het onthoudt tijdens het klikken op pagina's, 
// maar opnieuw begint zodra je de browser sluit en later terugkomt.
let currentTrack = parseInt(sessionStorage.getItem('vibeTrack')) || 0;
let isPlaying = sessionStorage.getItem('vibePlaying') === 'true';
let savedTime = parseFloat(sessionStorage.getItem('vibeTime')) || 0;

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
        sessionStorage.setItem('vibePlaying', 'false');
      });
    }

    // Bewaar de huidige seconde in de sessie
    audio.addEventListener('timeupdate', () => {
      sessionStorage.setItem('vibeTime', audio.currentTime);
    });

    // Ga automatisch door naar het volgende nummer als de huidige afgelopen is
    audio.onended = () => {
      currentTrack = (currentTrack + 1) % playlist.length;
      sessionStorage.setItem('vibeTrack', currentTrack);
      sessionStorage.setItem('vibeTime', 0);
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

  if (!audio.src || audio.src === window.location.href) {
    audio.src = playlist[currentTrack];
  }

  if (audio.paused) {
    audio.play().then(() => {
      if (stateSpan) stateSpan.innerText = "⏸ Pause";
      sessionStorage.setItem('vibePlaying', 'true');
    }).catch(error => {
      console.log("Browser blokkeerde afspelen:", error);
      alert("Klik nogmaals ergens op de pagina om muziek toe te staan!");
    });
  } else {
    audio.pause();
    if (stateSpan) stateSpan.innerText = "▶ Play";
    sessionStorage.setItem('vibePlaying', 'false');
  }
};