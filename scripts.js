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

    playPauseButton.addEventListener('click', () => {
        if (player.paused()) {
            player.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            player.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    stopButton.addEventListener('click', () => {
        player.pause();
        player.currentTime(0);
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    volumeControl.addEventListener('input', () => {
        player.volume(volumeControl.value);
    });

    toggleTelestrationButton.addEventListener('click', () => {
        telestrationEnabled = !telestrationEnabled;
        if (telestrationEnabled) {
            toggleTelestrationButton.classList.add('active');
        } else {
            toggleTelestrationButton.classList.remove('active');
        }
    });

    uploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            player.src({ type: 'video/mp4', src: fileURL });
            player.load();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        if (telestrationEnabled) {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (telestrationEnabled && drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        drawing = false;
    });
});
