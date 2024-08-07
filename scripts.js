document.addEventListener('DOMContentLoaded', (event) => {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
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
            if (file.type === 'video/mp4') {
                const fileURL = URL.createObjectURL(file);
                console.log("File selected: ", file.name);
                console.log("File URL: ", fileURL);
                videoSource.src = fileURL;
                videoPlayer.load();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                console.log("Invalid file type: ", file.type);
                alert("Please select a valid MP4 video file.");
            }
        } else {
            console.log("No file selected");
        }
    });

    videoPlayer.addEventListener('error', (e) => {
        console.error('Video Player Error: ', e);
        alert("An error occurred while trying to play the video.");
    });
});
