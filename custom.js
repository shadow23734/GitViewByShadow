document.addEventListener('DOMContentLoaded', function() {
    // Music Player Elements
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time-display');
    const durationDisplay = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.getElementById('song-title');
    const albumArt = document.getElementById('album-art');
    
    // Song data (you can expand this with more songs)
    const songs = [
        {
            title: "Satria's Theme",
            src: "song.mp3",
            albumArt: "profile.jpg"
        }
        // Add more songs here if needed
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Load song
    function loadSong() {
        const song = songs[currentSongIndex];
        songTitle.textContent = song.title;
        audioPlayer.src = song.src;
        albumArt.src = song.albumArt;
    }
    
    // Play/Pause song
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.style.animationPlayState = 'running';
    }
    
    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.style.animationPlayState = 'paused';
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.setProperty('--progress', `${progressPercent}%`);
        
        // Update time displays
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Set progress when clicking on progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Change volume
    function setVolume() {
        audioPlayer.volume = this.value;
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong();
        if (isPlaying) {
            playSong();
        }
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong();
        if (isPlaying) {
            playSong();
        }
    }
    
    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    
    // Initialize
    loadSong();
    
    // Add rotation animation to album art
    albumArt.style.animation = 'rotate 20s linear infinite';
    albumArt.style.animationPlayState = 'paused';
    
    // Add keyframes for rotation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
