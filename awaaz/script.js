class MusicPlayer {
    constructor(audioPlayer, tracks) {
        this.audio = document.getElementById(audioPlayer);
        this.tracks = tracks;
        this.currentIndex = 0;
        this.img = document.querySelector("#track-img");
        this.title = document.querySelector("#track-title");
        this.artist = document.querySelector("#track-artist");

        this.prevButton = document.querySelector("#prevBtn");
        this.playButton = document.querySelector("#playPauseBtn");
        this.nextButton = document.querySelector("#nextBtn");

        this.playButton.addEventListener('click', () => this.togglePlayPause());
        this.prevButton.addEventListener('click', () => this.prevTrack());
        this.nextButton.addEventListener('click', () => this.nextTrack());

        this.progressBar = document.querySelector(".progress-bar");
        this.progressContainer = document.querySelector(".progress-container");
        this.currentTimeEl = document.querySelector("#current-time");
        this.durationEl = document.querySelector("#duration");

        this.audio.addEventListener("timeupdate", () => this.updateProgress());
        this.progressContainer.addEventListener("click", (e) => this.setProgress(e));



        this.loadTrack(this.currentIndex);
    }
    loadTrack(index) {
        const track = this.tracks[index];
        this.audio.src = track.audio;
        this.img.src = track.album_image;
        this.title.textContent = track.name;
        this.artist.textContent = track.artist_name;
        this.playButton.classList.replace("bx-pause", "bx-play");
    }

    playTrack() {
        this.audio.play();
        this.playButton.classList.replace("bx-play", "bx-pause");
        this.img.classList.add("spinning");
    }

    pauseTrack() {
        this.audio.pause();
        this.playButton.classList.replace("bx-pause", "bx-play");
        this.img.classList.remove("spinning");
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.playTrack();
        } else {
            this.pauseTrack();
        }
    }

    nextTrack() {
        this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
        this.loadTrack(this.currentIndex);
        this.playTrack();
    }

    prevTrack() {
        this.currentIndex = (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentIndex);
        this.playTrack();
    }

    updateProgress() {
        if (!this.audio.duration) return;

        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = `${percent}%`;

        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }

    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;

        this.audio.currentTime = (clickX / width) * duration;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    }



}

async function fetchTracks() {
    const clientId = "fcb35b35";
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&include=musicinfo&audioformat=mp32`;

    try {
        const response = await fetch(url); // taken response
        const data = await response.json(); // converetd to json

        const trackList = data.results; // taken the results from json

        const player = new MusicPlayer("audioPlayer", trackList);



        const container = document.querySelector("#songList"); // container in your HTML

        container.innerHTML = ""; // Clear if anything is there

        trackList.forEach((track, index) => {
            const card = document.createElement("div");
            card.className = "artist-card";
            // Create the card content
            card.innerHTML = `
                <div class="artist-img-wrapper">
                    <img src="${track.album_image}" alt="${track.name}">
                </div>
                <h4>${track.name}</h4>
                <p>${track.artist_name}</p>
            `;
            card.addEventListener("click", () => {
                player.currentIndex = index;
                player.loadTrack(index);
                player.playTrack();
            });
            container.appendChild(card);
        });

    } catch (err) {
        console.error("Failed to fetch or render tracks", err);
    }
}

fetchTracks();


