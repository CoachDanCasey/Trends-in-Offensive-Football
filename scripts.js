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
