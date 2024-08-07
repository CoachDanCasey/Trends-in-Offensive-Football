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
document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('videoPlayer');
    const canvas = document.getElementById('telestrationLayer');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        startDrawing(x, y);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            draw(x, y);
        }
    });

    canvas.addEventListener('mouseup', function() {
        stopDrawing();
    });

    canvas.addEventListener('mouseleave', function() {
        if (drawing) {
            stopDrawing();
        }
    });

    function startDrawing(x, y) {
        canvas.style.pointerEvents = 'auto';
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function draw(x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function stopDrawing() {
        drawing = false;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('videoPlayer');

    // Extend Video.js button class for telestration toggle
    const Button = videojs.getComponent('Button');
    const TelestrationToggle = videojs.extend(Button, {
        constructor: function() {
            Button.apply(this, arguments);
            this.controlText("Toggle Telestration");
            this.el().classList.add('vjs-icon-pencil');
        },
        handleClick: function() {
            const canvas = document.getElementById('telestrationLayer');
            if (canvas.style.pointerEvents === 'none') {
                canvas.style.pointerEvents = 'auto';
                this.el().classList.add('vjs-selected');
            } else {
                canvas.style.pointerEvents = 'none';
                this.el().classList.remove('vjs-selected');
            }
        }
    });

    // Register the new component and add it to the control bar
    videojs.registerComponent('TelestrationToggle', TelestrationToggle);
    player.getChild('controlBar').addChild('TelestrationToggle', {});

    // Setup canvas for telestration
    const canvas = document.getElementById('telestrationLayer');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        if (canvas.style.pointerEvents === 'auto') {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            startDrawing(x, y);
        }
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            draw(x, y);
        }
    });

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    function startDrawing(x, y) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function draw(x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function stopDrawing() {
        if (drawing) {
            drawing = false;
        }
    }
});
