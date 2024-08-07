document.addEventListener('DOMContentLoaded', (event) => {
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const fileInput = document.getElementById('fileInput');

    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    stopBtn.addEventListener('click', () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const fileURL = URL.createObjectURL(file);
        videoPlayer.src = fileURL;
        videoPlayer.load();
        playPauseBtn.textContent = 'Play';
    });
});
