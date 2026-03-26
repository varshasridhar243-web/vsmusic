let songs = [];
let currentIndex = 0;

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");

const container = document.getElementById("trendingSongs");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerImg = document.getElementById("playerImg");

// ===============================
// FETCH SONGS FROM BACKEND
// ===============================
async function loadSongs() {
    try {
        const res = await fetch("http://localhost:8080/songs");
        songs = await res.json();

        console.log("Loaded songs:", songs);

        displaySongs();
    } catch (err) {
        console.error("Backend not working", err);
    }
}

// ===============================
// DISPLAY SONGS
// ===============================
function displaySongs() {
    container.innerHTML = "";

    songs.forEach((song, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="http://localhost:8080/${song.coverImage}">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        `;

        card.onclick = () => playSong(index);

        container.appendChild(card);
    });
}

// ===============================
// PLAY SONG
// ===============================
function playSong(index) {
    currentIndex = index;

    const song = songs[index];

    audio.src = "http://localhost:8080/" + song.audio;
    audio.play();

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerImg.src = "http://localhost:8080/" + song.coverImage;

    playPauseBtn.textContent = "⏸";
}

// ===============================
// PLAY / PAUSE
// ===============================
playPauseBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }
};

// ===============================
// NEXT / PREV
// ===============================
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
};

// ===============================
// PROGRESS BAR
// ===============================
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// ===============================
// VOLUME
// ===============================
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// ===============================
// INIT
// ===============================
loadSongs();

