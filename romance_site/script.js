// --- CONFIG ---
// Change this to the correct date (local time). Example: 13 Dec 2024, 00:00.
const SINCE_DATE = new Date('2024-12-13T00:00:00');

// Hearts: how many at once
const HEART_COUNT = 24;

// --- UTILITIES ---
const pad = (n) => String(n).padStart(2, '0');

function updateTimer(){
  const now = new Date();
  let diff = Math.max(0, now - SINCE_DATE);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24*3600));
  const hours = Math.floor((totalSeconds % (24*3600)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(mins);
  document.getElementById('seconds').textContent = pad(secs);
}

function setSinceLabel(){
  const opts = { day: '2-digit', month: 'long', year: 'numeric' };
  const formatted = SINCE_DATE.toLocaleDateString(undefined, opts).replace(',', '');
  document.getElementById('since-label').textContent = formatted;
}

// --- Hearts overlay ---
function spawnHearts(){
  const overlay = document.querySelector('.hearts-overlay');
  const vw = window.innerWidth;
  for(let i=0; i<HEART_COUNT; i++){
    const h = document.createElement('span');
    h.className = 'heart';
    const left = Math.random() * vw;
    const delay = Math.random() * 10;
    const dur = 16 + Math.random() * 16; // 16–32s
    const scale = 0.6 + Math.random() * 1.2; // 0.6–1.8
    const alpha = 0.06 + Math.random() * 0.22;
    h.style.left = left + 'px';
    h.style.bottom = (-20 - Math.random()*60) + 'px';
    h.style.setProperty('--dur', dur + 's');
    h.style.setProperty('--scale', scale);
    h.style.setProperty('--alpha', alpha);
    h.style.animationDelay = (-delay) + 's'; // desync streams
    overlay.appendChild(h);
  }
}

// --- Music toggle (works with your existing audio) ---
function initMusic(){
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bg-audio');

  function setState(playing){
    btn.textContent = playing ? 'Pause Music' : 'Play Music';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  btn.addEventListener('click', async () => {
    try{
      if(audio.paused){
        await audio.play();
        setState(true);
      }else{
        audio.pause();
        setState(false);
      }
    }catch(e){
      console.warn('Autoplay blocked or audio error:', e);
    }
  });
}

// --- Init ---
setSinceLabel();
updateTimer();
setInterval(updateTimer, 1000);
spawnHearts();
initMusic();
