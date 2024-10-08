// SETUP //

const player = document.getElementById("audio");
player.volume = 0.05;
const songs = [
  "./assets/audio/midnight_dreams.mp3",
  "./assets/audio/echos_of_underground.mp3",
  "./assets/audio/stars_in_pocket.mp3",
  "./assets/audio/echos_of_the_overworld.mp3",
  "./assets/audio/quiet_horizons.mp3",
  "./assets/audio/dusk_till_dawn.mp3",
  "./assets/audio/echoes_of_adventure.mp3",
  "./assets/audio/twilight.mp3",
  "./assets/audio/stars_in_head.mp3",
];
var songNum = 0;

// MAIN //

player.src = songs[songNum];
player.play();

// play next song
player.addEventListener("ended", () => {
  songNum++;
  if (songNum >= songs.length) songNum = 0;
  player.src = songs[songNum];
  player.play();
});
