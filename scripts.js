document.addEventListener('DOMContentLoaded', (event) => {
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const fileInput = document.getElementById('fileInput');

    playPauseBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    stopBtn.addEventListener('click', () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            console.log("File selected: ", file.name);
            console.log("File URL: ", fileURL);
            videoPlayer.src = fileURL;
            videoPlayer.load();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            console.log("No file selected");
        }
    });
});
