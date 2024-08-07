// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer');
    const playPauseButton = document.getElementById('playPause');
    const stopButton = document.getElementById('stop');
    const clearButton = document.getElementById('clear');
    const volumeControl = document.getElementById('volume');
    const canvas = document.getElementById('telestrationLayer');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    playPauseButton.addEventListener('click', () => {
        if (player.paused()) {
            player.play();
            playPauseButton.textContent = 'Pause';
        } else {
            player.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    stopButton.addEventListener('click', () => {
        player.pause();
        player.currentTime(0);
        playPauseButton.textContent = 'Play';
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    volumeControl.addEventListener('input', () => {
        player.volume(volumeControl.value);
    });

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
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
