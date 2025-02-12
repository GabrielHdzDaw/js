function playSound(e) {
    // selects the audio element where data-key="e.keyCode"
    let key = e.key;
    const audio = document.querySelector(`audio[data-key="${key}"]`)

    //if there is no audio element with the corresponding keyCode, then don't do anything
    if (!audio) return;

    //else reset the audio time and play it
    audio.currentTime = 0
    audio.play()
}

window.addEventListener('keydown', playSound)
window.addEventListener('keydown', animateKey)
window.addEventListener('keyup', deanimateKey)

const slider = document.getElementById('pitch')

slider.addEventListener('input', () => {
    const audios = document.querySelectorAll('audio')
    audios.forEach(audio => {
        audio.playbackRate = slider.value
        audio.preservesPitch = false
    })
})


// window.addEventListener('keydown', e => {
//     let key = e.key;
//     document.querySelector(`audio[data-key="${key}"]`).play();
// });

function animateKey(e) {
    const key = document.querySelector(`div[data-key="${e.key}"]`)
    if (!key) return;
    key.classList.add('playing')
}

function deanimateKey(e) {
    const key = document.querySelector(`div[data-key="${e.key}"]`)
    if (!key) return;
    key.classList.remove('playing')
}