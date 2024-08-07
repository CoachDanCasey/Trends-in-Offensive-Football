// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer');
    const playPauseButton = document.getElementById('playPause');
    const stopButton = document.getElementById('stop');
    const toggleTelestrationButton = document.getElementById('toggleTelestration');
    const volumeControl = document.getElementById('volume');

    playPauseButton.addEventListener('click', togglePlayPause);
    stopButton.addEventListener('click', stopVideo);
    toggleTelestrationButton.addEventListener('click', toggleTelestration);
    volumeControl.addEventListener('input', () => player.volume(volumeControl.value));

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
    }

    function toggleTelestration() {
        const canvas = document.getElementById('telestrationLayer');
        if (canvas.style.pointerEvents === 'none') {
            canvas.style.pointerEvents = 'auto';
        } else {
            canvas.style.pointerEvents = 'none';
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
                scrapeTime(-0.05); // Rewind 5% of the video duration
                break;
            case 'ArrowRight':
                scrapeTime(0.05); // Fast forward 5% of the video duration
                break;
        }
    }

    function changeVolume(change) {
        let newVolume = Math.max(0, Math.min(1, player.volume() + change));
        player.volume(newVolume);
    }

    function scrapeTime(factor) {
        const newTime = player.currentTime() + player.duration() * factor;
        player.currentTime(Math.max(0, Math.min(player.duration(), newTime)));
    }
});
