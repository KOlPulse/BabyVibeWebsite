window.toggleMusic = function() {
  alert("De knop werkt! De klik komt aan.");
  
  const audio = document.getElementById("vibeAudio");
  if (audio) {
    console.log("Audio element gevonden:", audio);
  } else {
    console.log("Audio element NIET gevonden!");
  }
};