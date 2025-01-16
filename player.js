class WebPlayer {
    constructor() {
        this.currentTrack = 0;
        this.playlist = [
            'Snow%20Strippers%20Ahh%20Beat.mp3',
        ];
        
        this.createPlayer();
        this.loadStoredState();
    }

    createPlayer() {
        // Create player container
        const playerDiv = document.createElement('div');
        playerDiv.className = 'web-player';
        playerDiv.innerHTML = `
            <div class="player-window">
                <div class="title-bar">
                    <div class="title-bar-text">Music Player</div>
                    <div class="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div class="window-body">
                    <div class="player-controls">
                        <button class="play-pause">▶</button>
                        <button class="next">⏭</button>
                        <div class="volume-control">
                            <span>🔊</span>
                            <input type="range" min="0" max="100" value="50">
                        </div>
                    </div>
                    <div class="track-info">Now Playing: Vapor.mp3</div>
                </div>
            </div>
        `;
        document.body.appendChild(playerDiv);

        // Create audio element
        this.audio = document.createElement('audio');
        this.audio.src = this.playlist[this.currentTrack];
        document.body.appendChild(this.audio);

        // Add event listeners
        const playPauseBtn = playerDiv.querySelector('.play-pause');
        const nextBtn = playerDiv.querySelector('.next');
        const volumeSlider = playerDiv.querySelector('input[type="range"]');

        playPauseBtn.addEventListener('click', () => this.togglePlay());
        nextBtn.addEventListener('click', () => this.nextTrack());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

        // Store references
        this.playerDiv = playerDiv;
        this.playPauseBtn = playPauseBtn;
        this.trackInfo = playerDiv.querySelector('.track-info');
    }

    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseBtn.textContent = '⏸';
        } else {
            this.audio.pause();
            this.playPauseBtn.textContent = '▶';
        }
        this.saveState();
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.audio.src = this.playlist[this.currentTrack];
        this.audio.play();
        this.updateTrackInfo();
        this.saveState();
    }

    setVolume(value) {
        this.audio.volume = value / 100;
        localStorage.setItem('playerVolume', value);
    }

    updateTrackInfo() {
        const trackName = 'Snow Strippers - Ahh Beat';
        this.trackInfo.textContent = `Now Playing: ${trackName}`;
    }

    saveState() {
        localStorage.setItem('playerTrack', this.currentTrack);
        localStorage.setItem('playerTime', this.audio.currentTime);
        localStorage.setItem('playerPlaying', !this.audio.paused);
    }

    loadStoredState() {
        const storedTrack = localStorage.getItem('playerTrack');
        const storedTime = localStorage.getItem('playerTime');
        const storedPlaying = localStorage.getItem('playerPlaying');
        const storedVolume = localStorage.getItem('playerVolume');

        if (storedTrack) this.currentTrack = parseInt(storedTrack);
        if (storedTime) this.audio.currentTime = parseFloat(storedTime);
        if (storedVolume) this.setVolume(storedVolume);
        
        this.audio.src = this.playlist[this.currentTrack];
        this.updateTrackInfo();
        
        if (storedPlaying === 'true') {
            this.audio.play();
            this.playPauseBtn.textContent = '⏸';
        }
    }
} 