/* crisis.js - startGrounding, cycleGroundingSteps, safePulseAnimation */
(function(){
  const steps = ["Name 5 things you see","Name 4 things you can touch","Name 3 sounds you hear","Name 2 things you can smell","Name 1 thing you can taste or focus on breathing"];
  const container = document.getElementById('grounding');
  const btn = document.getElementById('emergencyCall');
  function startGrounding(){ container.innerHTML=''; steps.forEach((s,i)=>{ const el = document.createElement('div'); el.className='g-step'; el.textContent = s; container.appendChild(el); setTimeout(()=>el.classList.add('visible'),500*i+200); }); }
  function safePulseAnimation(){ const el = document.getElementById('safeText'); el.classList.add('pulsing'); setTimeout(()=>el.classList.remove('pulsing'),12000); }
  btn.addEventListener('click', ()=>{ btn.classList.add('heartbeat'); setTimeout(()=>{ btn.classList.remove('heartbeat'); alert('If this is an emergency call your local services or use your phone to dial.'); window.open('tel:911'); },800); });
  document.addEventListener('DOMContentLoaded', ()=>{ startGrounding(); safePulseAnimation(); });
})();