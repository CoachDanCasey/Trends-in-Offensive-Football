// scripts.js
document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer');
    const playPauseButton = document.getElementById('playPause');
    const stopButton = document.getElementById('stop');
    const volumeControl = document.getElementById('volume');

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

    volumeControl.addEventListener('input', () => {
        player.volume(volumeControl.value);
    });

    // Example annotation
    player.ready(function() {
        const player = this;
        player.annotations.add({
            text: 'Annotation example',
            time: 10,
        });
    });
});
// Additional setup for annotations
import videojs from 'video.js';
import 'videojs-annotations';

document.addEventListener('DOMContentLoaded', (event) => {
    const player = videojs('videoPlayer', {
        plugins: {
            annotations: {}
        }
    });

    // Add annotation example
    player.annotations.add({
        text: 'Annotation example',
        time: 10, // Time in seconds
    });

    // ... (rest of the player setup)
});
