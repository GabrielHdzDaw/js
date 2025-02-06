const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let oscillator;
let isPlaying = false;

const waveTypeArray = ['sine', 'square', 'sawtooth', 'triangle'];

const slider = document.getElementById('slider');
const playButton = document.getElementById('play');
const frequency = document.getElementById('frequency');
const waveType = document.getElementById('waveType');

slider.addEventListener('input', function () {
    console.clear();
    console.log(this.value);
    frequency.textContent = this.value;
    if (oscillator) {
        oscillator.frequency.value = this.value;
    }
});

// Controlar reproducción
playButton.addEventListener('click', () => {
    if (!isPlaying) {
        // Iniciar oscilador
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sine'; // Tipo de onda: sine, square, sawtooth, triangle
        oscillator.frequency.value = slider.value;
        
        // Conectar al destino de audio
        oscillator.connect(audioContext.destination);
        oscillator.start();
        isPlaying = true;
        playButton.textContent = 'Stop';
    } else {
        // Detener oscilador
        oscillator.stop();
        isPlaying = false;
        playButton.textContent = 'Play';
    }
});

waveType.addEventListener('click', function () {
    console.clear();
    console.log(this.value);
    if (oscillator) {
        oscillator.type = this.value;
    }
});

// Opcional: Iniciar contexto de audio con interacción del usuario
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });