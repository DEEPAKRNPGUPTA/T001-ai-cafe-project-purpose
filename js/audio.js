const synth = window.speechSynthesis;
const audioStatus = document.getElementById('audio-status');
const rateSelect = document.getElementById('speech-rate');
let currentText = '';
let currentMode = 'tab';

function cleanText(root) {
  if (!root) return '';
  return root.innerText
    .replace(/\s+/g, ' ')
    .replace(/Tab 0[12]/g, '')
    .trim();
}

function activePanel() {
  return document.querySelector('.tab-panel.is-active .narration-source');
}

function speak(text, mode = 'tab') {
  if (!('speechSynthesis' in window)) {
    audioStatus.textContent = 'Narration is not supported in this browser.';
    return;
  }
  synth.cancel();
  currentText = text;
  currentMode = mode;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = Number(rateSelect.value);
  utterance.pitch = 1;
  utterance.onstart = () => { audioStatus.textContent = 'Narration playing'; };
  utterance.onpause = () => { audioStatus.textContent = 'Narration paused'; };
  utterance.onresume = () => { audioStatus.textContent = 'Narration resumed'; };
  utterance.onend = () => { audioStatus.textContent = 'Narration complete'; };
  utterance.onerror = () => { audioStatus.textContent = 'Narration stopped'; };
  synth.speak(utterance);
}

document.getElementById('listen-tab').addEventListener('click', () => {
  speak(cleanText(activePanel()), 'tab');
});

document.getElementById('listen-full').addEventListener('click', () => {
  const allText = Array.from(document.querySelectorAll('.narration-source')).map(cleanText).join(' ');
  speak(allText, 'full');
});

document.getElementById('pause-audio').addEventListener('click', () => {
  if (synth.speaking && !synth.paused) synth.pause();
});

document.getElementById('resume-audio').addEventListener('click', () => {
  if (synth.paused) synth.resume();
});

document.getElementById('restart-audio').addEventListener('click', () => {
  const source = currentMode === 'full'
    ? Array.from(document.querySelectorAll('.narration-source')).map(cleanText).join(' ')
    : cleanText(activePanel());
  speak(source || currentText, currentMode);
});

rateSelect.addEventListener('change', () => {
  if (synth.speaking || synth.paused) {
    const source = currentMode === 'full'
      ? Array.from(document.querySelectorAll('.narration-source')).map(cleanText).join(' ')
      : cleanText(activePanel());
    speak(source, currentMode);
  }
});

window.addEventListener('beforeunload', () => synth.cancel());
