let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Spider-Man Theme Song",
    artist: "Danny Elfman",
    image: "https://wallpaperaccess.com/full/35386.jpg",
    path: "https://ia601501.us.archive.org/19/items/spiderman-theme-song-movie-buentema.-app/Spiderman%20Theme%20Song%20%28Movie%29%20%28BUENTEMA.APP%29.mp3"
  },
  {
    name: "Captain America: The First Avenger - Main Theme",
    artist: "Alan Silvestri",
    image: "https://1.bp.blogspot.com/-gi12A9fwXkw/Tj5Hqp0DUXI/AAAAAAAABK8/iYfB0tU7x9Y/s1600/capitanamerica.jpg",
    path: "https://ia904705.us.archive.org/9/items/captain-america-the-first-avenger-2011-main-theme-buentema.-app/Captain%20America%20The%20First%20Avenger%20%282011%29%20%20Main%20Theme%20%28BUENTEMA.APP%29.mp3",
  },
  {
    name: "The Avengers - Main Theme",
    artist: "Alan Silvestri",
    image: "https://lastfm.freetls.fastly.net/i/u/500x500/ca2d3dae8a45f4ef6b0e125a7f4fc17a.jpg",
    path: "https://ia904706.us.archive.org/21/items/the-avengers-theme-song-buentema.-app/The%20Avengers%20-%20Theme%20Song%20%28BUENTEMA.APP%29.mp3",
  },
  {
    name: "X-Men - Theme Song",
    artist: "Ron Wasserman",
    image: "https://m.media-amazon.com/images/M/MV5BNTVjNmEwNTMtNmQ2ZC00MGJkLWI3MDgtNzMyNTc4YjVkNTQ1L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    path: "https://ia601403.us.archive.org/0/items/x-men-theme-song-no-sound-fx-ytconvert.-in/X-Men%20Theme%20song%20%28No%20Sound%20FX%29%20%28YTCONVERT.IN%29.mp3",
  },
  {
    name: "Batman Theme Song",
    artist: "Danny Elfman",
    image: "https://pics.filmaffinity.com/Batman-647425984-large.jpg",
    path: "https://ia904706.us.archive.org/4/items/batman-theme-song.-buentema.-app/Batman%20Theme%20Song.%20%28BUENTEMA.APP%29.mp3"
  },
  {
    name: "Superman Theme Song",
    artist: "John Williams",
    image: "https://static.posters.cz/image/750/posters/superman-classic-logo-i15589.jpg",
    path: "https://ia601502.us.archive.org/14/items/superman-theme-buentema.-app/Superman%20Theme%20%28BUENTEMA.APP%29.mp3"
  },
  {
    name: "Justice League: The Animated Series - Theme Song",
    artist: "Michael McCuistion",
    image: "https://upload.wikimedia.org/wikipedia/en/c/c8/Justiceleaguetimmartpromo.jpg",
    path: "https://ia601407.us.archive.org/10/items/justice-league-the-animated-series-opening-theme-1080p-hd-bluray-buentema.-app/Justice%20League%20The%20Animated%20Series%20%20Opening%20Theme%20%201080p%20%E3%80%90HD%E3%80%91Bluray%20%29%20%28BUENTEMA.APP%29.mp3"
  },
  {
    name: "Wonder Woman - Theme Song",
    artist: "Hans Zimmer & Junkie XL",
    image: "https://i.blogs.es/fc7807/wonder-woman0/450_1000.jpg",
    path: "https://ia601402.us.archive.org/30/items/wonder-woman-theme-music-batman-v-superman-ost-hans-zimmer-junkie-xl-hd-buentema.-app/WONDER%20WOMAN%20Theme%20Music%20Batman%20v%20Superman%20OST%20Hans%20Zimmer%20%26%20Junkie%20XL%20HD%20%28BUENTEMA.APP%29.mp3"
  },
  {
    name: "Star Wars Theme Song",
    artist: "John Williams",
    image: "https://i.pinimg.com/originals/41/c9/fb/41c9fbf8e5a90cc12d5dec8cdd236e36.jpg",
    path: "https://ia904706.us.archive.org/2/items/star-wars-main-theme-full-ytconvert.-in/Star%20Wars%20Main%20Theme%20%28Full%29%20%28YTCONVERT.IN%29.mp3",
  },
  {
    name: "Star Trek (2009) Theme Song",
    artist: "Michael Giacchino",
    image: "https://static.displate.com/280x392/displate/2022-04-12/7d7ad65ed82e01a7c350178aa0dc2646_48775c9ed631274097d7e3eb6880840d.jpg",
    path: "https://ia601403.us.archive.org/31/items/star-trek-2009-original-theme-720p-buentema.-app/Star%20Trek%202009%20Original%20Theme%20720p%20%28BUENTEMA.APP%29.mp3",
  },
  {
    name: "Jujutsu Kaisen - Opening",
    artist: "Eve",
    image: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F09%2Fjujutsu-kaisen-season-2-continuous-half-year-run-news-00.jpg?fit=max&cbr=1&q=90&w=750&h=500",
    path: "https://ia601504.us.archive.org/6/items/jujutsu-kaisen-opening-kaikai-kitan-ytconvert.-in/JUJUTSU%20KAISEN%20-%20Opening%20%20Kaikai%20Kitan%20%28YTCONVERT.IN%29.mp3",
  },
  {
    name: "Shingeki No Kyojin 2 - Opening",
    artist: "Linked Horizon",
    image: "https://cdn.meadd.net/photos/full/66055041.jpg",
    path: "https://ia601505.us.archive.org/12/items/attack-on-titan-season-2-opening-theme-shinzou-wo-sasageyo-buentema.-app/Attack%20on%20Titan%20Season%202%20%E2%80%93%20Opening%20Theme%20%E2%80%93%20Shinzou%20wo%20Sasageyo%21%20%28BUENTEMA.APP%29.mp3",
  },
  {
    name: "Full Metal Alchemist Brotherhood - Opening",
    artist: "YUI",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7e/Fullmetal_Alchemist_Brotherhood_key_visual.png",
    path: "https://ia601402.us.archive.org/17/items/full-metal-alchemist-brotherhood-opening-1-4-k-60-fps-creditless-buentema.-app/Full%20Metal%20Alchemist%20Brotherhood%20-%20Opening%201%20%204K%20%2060FPS%20%20Creditless%20%20%28BUENTEMA.APP%29.mp3",
  },
  {
    name: "Cyberpunk: Edgerunners - Opening",
    artist: "Franz Ferdinand",
    image: "https://cdn-l-cyberpunk.cdprojektred.com/edgerunners/Cyberpunk-Edgerunners-S1-Poster-en.jpg",
    path: "https://ia601503.us.archive.org/33/items/cyberpunk-edgerunners-opening-credits-netflix-buentema.-app/Cyberpunk%20Edgerunners%20%20Opening%20Credits%20%20Netflix%20%28BUENTEMA.APP%29.mp3",
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let black = Math.floor(Math.random() * 256) + 64;
  let orange = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + "," + black + "," + orange + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
