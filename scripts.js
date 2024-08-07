// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer');
    const playPauseButton = document.getElementById('playPause');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const toggleTelestrationButton = document.getElementById('toggleTelestration');
    const volumeControl = document.getElementById('volume');
    const uploadInput = document.getElementById('upload');
    const canvas = document.getElementById('telestrationLayer');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let telestrationEnabled = false;

    // Event listeners for player controls
    playPauseButton.addEventListener('click', togglePlayPause);
    stopButton.addEventListener('click', stopVideo);
    clearButton.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
    volumeControl.addEventListener('input', () => player.volume(volumeControl.value));
    toggleTelestrationButton.addEventListener('click', toggleTelestration);
    uploadInput.addEventListener('change', uploadVideo);

    // Keyboard event listener
    document.addEventListener('keydown', handleKeyPress);

    function togglePlayPause() {
        if (player.paused()) {
            player.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            player.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function stopVideo() {
        player.pause();
        player.currentTime(0);
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    function toggleTelestration() {
        telestrationEnabled = !telestrationEnabled;
        toggleTelestrationButton.classList.toggle('active');
    }

    function uploadVideo(event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            player.src({ type: 'video/mp4', src: fileURL });
            player.load();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function handleKeyPress(event) {
        switch(event.key) {
            case ' ':
                togglePlayPause();
                break;
            case 's':
                stopVideo();
                break;
            case 'ArrowUp':
                changeVolume(0.1);
                break;
            case 'ArrowDown':
                changeVolume(-0.1);
                break;
            case 'ArrowLeft':
                rewind(10); // Rewind 10 seconds
                break;
            case 'ArrowRight':
                fastForward(10); // Fast forward 10 seconds
                break;
        }
    }
    // scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer');
    const canvas = document.getElementById('telestrationLayer');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let telestrationEnabled = false;

    document.getElementById('toggleTelestration').addEventListener('click', () => {
        telestrationEnabled = !telestrationEnabled;
        if (telestrationEnabled) {
            canvas.style.pointerEvents = 'auto'; // Enable drawing
            console.log("Telestration enabled");
        } else {
            canvas.style.pointerEvents = 'none'; // Disable drawing
            console.log("Telestration disabled");
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        if (telestrationEnabled) {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            console.log("Start drawing");
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (telestrationEnabled && drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            console.log("Drawing");
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (telestrationEnabled) {
            drawing = false;
            console.log("Stop drawing");
        }
    });

    canvas.addEventListener('mouseleave', () => {
        if (telestrationEnabled && drawing) {
            drawing = false;
            console.log("Drawing stopped (mouse left)");
        }
    });
});


    function changeVolume(change) {
        let newVolume = Math.max(0, Math.min(1, player.volume() + change));
        player.volume(newVolume);
        volumeControl.value = newVolume;
    }

    function rewind(seconds) {
        player.currentTime(Math.max(0, player.currentTime() - seconds));
    }

    function fastForward(seconds) {
        player.currentTime(Math.min(player.duration(), player.currentTime() + seconds));
    }
});
