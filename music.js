// Jouw afspeellijst (zorg dat deze bestanden in je map staan)
const playlist = [
  "nummer1.mp3",
  "nummer2.mp3",
  "nummer3.mp3"
];

let currentTrack = parseInt(localStorage.getItem('vibeTrack')) || 0;
let isPlaying = localStorage.getItem('vibePlaying') === 'true';
let savedTime = parseFloat(localStorage.getItem('vibeTime')) || 0;

const audio = document.getElementById("vibeAudio");
const btnText = document.getElementById("musicState");

// Laad het opgeslagen nummer en de exacte seconde
audio.src = playlist[currentTrack];
audio.currentTime = savedTime;

// Probeer direct verder te spelen als we naar een nieuwe pagina gaan
if (isPlaying) {
  audio.play().then(() => {
    btnText.innerText = "⏸ Pause";
  }).catch(() => {
    // Als de browser het blokkeert, pas de tekst aan
    btnText.innerText = "▶ Play";
    isPlaying = false;
  });
}

// Start of Pauzeer de muziek
function toggleMusic() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    btnText.innerText = "⏸ Pause";
    localStorage.setItem('vibePlaying', 'true');
  } else {
    audio.pause();
    isPlaying = false;
    btnText.innerText = "▶ Play";
    localStorage.setItem('vibePlaying', 'false');
  }
}

// Bewaar de tijd elke seconde, zodat hij op een nieuwe pagina naadloos verder gaat
audio.addEventListener('timeupdate', () => {
  localStorage.setItem('vibeTime', audio.currentTime);
});

// Speel automatisch het volgende nummer af
audio.onended = () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  localStorage.setItem('vibeTrack', currentTrack);
  localStorage.setItem('vibeTime', 0);
  audio.src = playlist[currentTrack];
  audio.play();
};