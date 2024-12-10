const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  height: 100,
  responsive: true,
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const objectURL = URL.createObjectURL(file);
    wavesurfer.load(objectURL);
  }
});

const playPauseBtn = document.getElementById('playPauseBtn');
playPauseBtn.addEventListener('click', () => {
  if (wavesurfer.isPlaying()) {
    wavesurfer.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    wavesurfer.play();
    playPauseBtn.textContent = 'Pause';
  }
});

const volumeInput = document.getElementById('volume');
volumeInput.addEventListener('input', (event) => {
  const volume = parseFloat(event.target.value);
  wavesurfer.setVolume(volume);
});

const trimBtn = document.getElementById('trimBtn');
trimBtn.addEventListener('click', () => {
  const duration = wavesurfer.getDuration();
  const start = wavesurfer.getCurrentTime();
  const end = duration; // 끝까지 잘라내기 (단순 예제)
  const trimmedAudio = wavesurfer.backend.slice(start, end);

  const blob = new Blob([trimmedAudio], { type: 'audio/mp3' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'trimmed-audio.mp3';
  link.click();
});
