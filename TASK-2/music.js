document.addEventListener('DOMContentLoaded', () => {
    // Sample tracks data
    const tracks = [
        { title: "Warriyo - Mortals [NCS Release]", duration: '01:50', file: 'songs/1.mp3' },
        { title: "Cielo - Huma-Huma", duration: '02:30', file: 'songs/2.mp3' },
        { title: 'DEAF KEV - Invincible [NCS Release]', duration: '03:15', file: 'songs/3.mp3' },
        { title: 'Different Heaven & EH!DE - My Heart [NCS Release]', duration: '04:00', file: 'songs/4.mp3' },
        { title: 'Janji-Heroes-Tonight-feat-Johnning-NCS-Release', duration: '05:45', file: 'songs/5.mp3' }
    ];

    // Variables to manage the current track
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;

    // Create audio element
    const audio = new Audio();
    audio.src = tracks[currentTrackIndex].file;

    // Select elements
    const songNames = document.querySelectorAll('.song-name');
    const masterPlayButton = document.getElementById('masterPlay');
    const progressBar = document.getElementById('myProgressBar');
    const nextButton = document.querySelector('.fa-forward-step');
    const prevButton = document.querySelector('.fa-backward-step');
    const shuffleButton = document.querySelector('.fa-shuffle');
    const repeatButton = document.querySelector('.fa-repeat');
    const currentTrackName = document.querySelector('.current-track');
    const volumeControl = document.getElementById('volumeControl');
    const volumeIcon = document.getElementById('volumeIcon');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // Function to format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Function to update the current track name
    function updateTrackName() {
        currentTrackName.textContent = tracks[currentTrackIndex].title;
    }

    // Function to play a track
    function playTrack(index) {
        audio.src = tracks[index].file;
        audio.play();
        isPlaying = true;
        masterPlayButton.classList.replace('fa-play', 'fa-pause');
        updateTrackName();
    }

    // Function to pause a track
    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        masterPlayButton.classList.replace('fa-pause', 'fa-play');
    }

    // Function to toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            audio.play();
            isPlaying = true;
            masterPlayButton.classList.replace('fa-play', 'fa-pause');
        }
    }

    // Function to play the next track
    function nextTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        }
        playTrack(currentTrackIndex);
    }

    // Function to play the previous track
    function prevTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        }
        playTrack(currentTrackIndex);
    }

    // Update progress bar and current time as the track plays
    audio.addEventListener('timeupdate', () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    // Update track time and duration when progress bar is changed
    progressBar.addEventListener('input', () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Update duration display when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // Event listener for song names
    songNames.forEach((songName, index) => {
        songName.addEventListener('click', () => {
            if (currentTrackIndex !== index) {
                currentTrackIndex = index;
                playTrack(currentTrackIndex);
            } else {
                togglePlayPause();
            }
        });
    });

    // Event listener for the master play button
    masterPlayButton.addEventListener('click', togglePlayPause);

    // Event listener for the next button
    nextButton.addEventListener('click', nextTrack);

    // Event listener for the previous button
    prevButton.addEventListener('click', prevTrack);

    // Event listener for the shuffle button
    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('active', isShuffle);
    });

    // Event listener for the repeat button
    repeatButton.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatButton.classList.toggle('active', isRepeat);
    });

    // Repeat track when it ends
    audio.addEventListener('ended', () => {
        if (isRepeat) {
            playTrack(currentTrackIndex);
        } else {
            nextTrack();
        }
    });

    // Initialize the track name display
    updateTrackName();

    // Volume control
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
        updateVolumeIcon();
    });

    // Function to update the volume icon based on the current volume
    function updateVolumeIcon() {
        if (audio.volume === 0) {
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        } else if (audio.volume < 0.5) {
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-down');
        } else {
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
            volumeIcon.classList.replace('fa-volume-down', 'fa-volume-up');
        }
    }

    // Initialize the volume control
    audio.volume = 0.5; // Set initial volume to 50%
    updateVolumeIcon();
});
