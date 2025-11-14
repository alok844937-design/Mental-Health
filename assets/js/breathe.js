/* breathe.js - startBreathing and changeBreathingState */
(function(){
  const btn = document.getElementById('startBreathBtn');
  const circle = document.getElementById('breathCircle');
  const txt = document.getElementById('breathText');
  let running = false; let cycleTimeouts = [];

  function clearCycle(){ cycleTimeouts.forEach(t=>clearTimeout(t)); cycleTimeouts = []; document.body.classList.remove('body-dimmed'); }

  function changeBreathingState(state){
    // state: inhale | hold | exhale
    txt.textContent = state.charAt(0).toUpperCase() + state.slice(1);
    if(state==='inhale'){
      circle.style.transform = 'scale(1.28)'; document.body.classList.add('body-dimmed');
    } else if(state==='hold'){
      circle.style.transform = 'scale(1.28)';
    } else if(state==='exhale'){
      circle.style.transform = 'scale(0.9)'; document.body.classList.remove('body-dimmed');
    }
  }

  function startBreathing(){
    if(running){ running=false; clearCycle(); btn.textContent='Start Breath'; return; }
    running=true; btn.textContent='Stop';
    // timing: inhale 4.2s, hold 1.6s, exhale 4.2s, pause 0.6s
    const loop = ()=>{
      changeBreathingState('inhale'); cycleTimeouts.push(setTimeout(()=>{ changeBreathingState('hold'); cycleTimeouts.push(setTimeout(()=>{ changeBreathingState('exhale'); cycleTimeouts.push(setTimeout(()=>{ if(running) loop(); },4200)); },1600)); },4200));
    };
    loop();
  }

  btn.addEventListener('click', startBreathing);
})();