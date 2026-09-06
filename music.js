// Zorg dat de playlist klopt met jouw mp3-bestanden in de map
const playlist = [
  "nummer1.mp3",
  "nummer2.mp3",
  "nummer3.mp3"
];

// Haal opgeslagen data op of begin vers
let currentTrack = parseInt(localStorage.getItem('vibeTrack')) || 0;
let isPlaying = localStorage.getItem('vibePlaying') === 'true';
let savedTime = parseFloat(localStorage.getItem('vibeTime')) || 0;

// Wacht tot de pagina volledig is geladen zodat de knoppen zeker bestaan
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("vibeAudio");
  const btnText = document.getElementById("musicState");

  if (!audio || !btnText) return;

  audio.src = playlist[currentTrack];
  audio.currentTime = savedTime;

  // Update de knop tekst op basis van de opgeslagen status
  if (isPlaying) {
    btnText.innerText = "⏸ Pause";
    audio.play().catch(error => {
      console.log("Browser blokkeerde automatische autoplay:", error);
      btnText.innerText = "▶ Play";
      isPlaying = false;
      localStorage.setItem('vibePlaying', 'false');
    });
  } else {
    btnText.innerText = "▶ Play";
  }

  // Klikfunctie gekoppeld aan de knop
  window.toggleMusic = function() {
    if (audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        btnText.innerText = "⏸ Pause";
        localStorage.setItem('vibePlaying', 'true');
      }).catch(err => {
        console.log("Afspelen mislukt:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      btnText.innerText = "▶ Play";
      localStorage.setItem('vibePlaying', 'false');
    }
  };

  // Bewaar de tijd elke seconde
  audio.addEventListener('timeupdate', () => {
    localStorage.setItem('vibeTime', audio.currentTime);
  });

  // Volgende nummer automatisch starten
  audio.onended = () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    localStorage.setItem('vibeTrack', currentTrack);
    localStorage.setItem('vibeTime', 0);
    audio.src = playlist[currentTrack];
    audio.play();
  };
});