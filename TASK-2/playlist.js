document.addEventListener('DOMContentLoaded', () => {
    const availableTracks = [
        { title: "Warriyo - Mortals [NCS Release]", duration: '01:50', file: 'songs/1.mp3' },
        { title: "Cielo - Huma-Huma", duration: '02:30', file: 'songs/2.mp3' },
        { title: 'DEAF KEV - Invincible [NCS Release]', duration: '03:15', file: 'songs/3.mp3' },
        { title: 'Different Heaven & EH!DE - My Heart [NCS Release]', duration: '04:00', file: 'songs/4.mp3' },
        { title: 'Janji-Heroes-Tonight-feat-Johnning-NCS-Release', duration: '05:45', file: 'songs/5.mp3' }
    ];

    let playlists = {};
    let currentPlaylist = null;
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    const audio = new Audio();

    // Select elements
    const createPlaylistButton = document.getElementById('createPlaylist');
    const newPlaylistName = document.getElementById('newPlaylistName');
    const playlistsContainer = document.getElementById('playlistsContainer');
    const addTrackButton = document.getElementById('addTrack');
    const playlistSelect = document.getElementById('playlistSelect');
    const availableTracksList = document.getElementById('availableTracksList');
    const songContainer = document.getElementById('songContainer');
    const currentTrackName = document.getElementById('currentTrackName');
    const masterPlayButton = document.getElementById('masterPlay');
    const progressBar = document.getElementById('myProgressBar');
    const nextButton = document.querySelector('.fa-forward-step');
    const prevButton = document.querySelector('.fa-backward-step');
    const shuffleButton = document.querySelector('.fa-shuffle');
    const repeatButton = document.querySelector('.fa-repeat');
    const volumeControl = document.getElementById('volumeControl');
    const volumeIcon = document.getElementById('volumeIcon');

    function updateTrackName() {
        currentTrackName.textContent = `Playing: ${availableTracks[currentTrackIndex].title}`;
    }

    function playTrack(index) {
        if (currentPlaylist && index >= 0 && index < playlists[currentPlaylist].length) {
            const track = playlists[currentPlaylist][index];
            audio.src = track.file;
            audio.play();
            isPlaying = true;
            masterPlayButton.classList.replace('fa-play', 'fa-pause');
            updateTrackName();
        }
    }

    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        masterPlayButton.classList.replace('fa-pause', 'fa-play');
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack(currentTrackIndex);
        }
    }

    function nextTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * playlists[currentPlaylist].length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % playlists[currentPlaylist].length;
        }
        playTrack(currentTrackIndex);
    }

    function prevTrack() {
        if (isShuffle) {
            currentTrackIndex = Math.floor(Math.random() * playlists[currentPlaylist].length);
        } else {
            currentTrackIndex = (currentTrackIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
        }
        playTrack(currentTrackIndex);
    }

    function renderAvailableTracks() {
        availableTracksList.innerHTML = '';
        availableTracks.forEach((track, index) => {
            const trackItem = document.createElement('div');
            trackItem.classList.add('track-item');
            trackItem.innerHTML = `
                <span>${track.title} (${track.duration})</span>
                <button class="add-track" data-index="${index}">+</button>
            `;
            availableTracksList.appendChild(trackItem);
        });
        addTrackEventListeners();
    }

    function renderPlaylistList() {
        playlistsContainer.innerHTML = '';
        Object.keys(playlists).forEach(playlist => {
            const playlistItem = document.createElement('div');
            playlistItem.classList.add('playlist-item');
            playlistItem.innerHTML = `
                <span>${playlist}</span>
                <button class="select-playlist" data-playlist="${playlist}">Select</button>
                <button class="delete-playlist" data-playlist="${playlist}">Delete</button>
            `;
            playlistsContainer.appendChild(playlistItem);
        });
        addPlaylistEventListeners();
    }

    function renderSongList() {
        if (currentPlaylist) {
            songContainer.innerHTML = '';
            playlists[currentPlaylist].forEach((track, index) => {
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');
                songItem.innerHTML = `
                    <span>${track.title} (${track.duration})</span>
                    <button class="remove-track" data-index="${index}">Remove</button>
                    <button class="play-track" data-index="${index}"><i class="fa-solid fa-play"></i></button>
                `;
                songContainer.appendChild(songItem);
            });
            addPlayButtonEventListeners();
            addRemoveButtonEventListeners();
        }
    }

    function addTrackEventListeners() {
        const addButtons = document.querySelectorAll('.add-track');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const trackIndex = e.target.getAttribute('data-index');
                if (currentPlaylist) {
                    const track = availableTracks[trackIndex];
                    playlists[currentPlaylist].push(track);
                    renderSongList();
                } else {
                    alert('Please select a playlist first');
                }
            });
        });
    }

    function addPlaylistEventListeners() {
        const selectButtons = document.querySelectorAll('.select-playlist');
        const deleteButtons = document.querySelectorAll('.delete-playlist');

        selectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                currentPlaylist = e.target.getAttribute('data-playlist');
                playlistSelect.value = currentPlaylist;
                renderSongList();
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const playlistName = e.target.getAttribute('data-playlist');
                delete playlists[playlistName];
                if (currentPlaylist === playlistName) {
                    currentPlaylist = null;
                    songContainer.innerHTML = '';
                }
                renderPlaylistList();
                renderAvailableTracks(); // Re-render available tracks to include + buttons
            });
        });
    }

    function addPlayButtonEventListeners() {
        const playButtons = document.querySelectorAll('.song-item .play-track');
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const trackIndex = e.target.getAttribute('data-index');
                currentTrackIndex = parseInt(trackIndex, 10);
                playTrack(currentTrackIndex);
            });
        });
    }

    function addRemoveButtonEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-track');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const trackIndex = e.target.getAttribute('data-index');
                playlists[currentPlaylist].splice(trackIndex, 1);
                renderSongList();
            });
        });
    }

    // Event listener for creating a new playlist
    createPlaylistButton.addEventListener('click', () => {
        const playlistName = newPlaylistName.value.trim();
        if (playlistName && !playlists[playlistName]) {
            playlists[playlistName] = [];
            newPlaylistName.value = '';
            renderPlaylistList();
            renderAvailableTracks(); // Re-render available tracks to include + buttons
        } else {
            alert('Please enter a unique playlist name');
        }
    });

    // Event listener for adding a new track to the selected playlist
    addTrackButton.addEventListener('click', () => {
        if (currentPlaylist) {
            const selectedTrackIndex = playlistSelect.value;
            if (selectedTrackIndex !== '') {
                const track = availableTracks[selectedTrackIndex];
                playlists[currentPlaylist].push(track);
                renderSongList();
            } else {
                alert('Please select a track to add');
            }
        } else {
            alert('Please select a playlist first');
        }
    });

    // Initialize the track name display
    updateTrackName();

    // Initialize the volume control
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
        updateVolumeIcon();
    });

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

    // Initialize available tracks and playlists
    renderAvailableTracks();
    renderPlaylistList();
});
