/* dashboard.js - loadMoodWave, drawWave, animateWave */
(function(){
  const canvas = document.getElementById('waveCanvas'); const ctx = canvas.getContext('2d');
  function getMoods(){ return JSON.parse(localStorage.getItem('moods')||'[]'); }
  function resize(){ const ratio = window.devicePixelRatio||1; canvas.width = Math.floor(canvas.clientWidth * ratio); canvas.height = Math.floor(canvas.clientHeight * ratio); ctx.setTransform(ratio,0,0,ratio,0,0); }
  window.addEventListener('resize', resize); resize();

  let t=0;
  function drawWave(){
    const w = canvas.clientWidth; const h = canvas.clientHeight; ctx.clearRect(0,0,w,h);
    // calming background
    const grad = ctx.createLinearGradient(0,0,w,0); grad.addColorStop(0,'rgba(116,192,252,0.06)'); grad.addColorStop(1,'rgba(255,209,102,0.04)'); ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    // path
    ctx.beginPath(); ctx.moveTo(0,h/2);
    for(let x=0;x<w;x+=2){ const y = h/2 + Math.sin((x/80)+t)*36 + Math.sin((x/20)+t*0.5)*8; ctx.lineTo(x,y); }
    ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
    ctx.fillStyle='rgba(116,192,252,0.06)'; ctx.fill();
    // mood points
    const moods = getMoods(); for(let i=0;i<moods.length;i++){ const px = (i+1)/(moods.length+1) * (w-40) + 20; const py = h/2 + Math.sin((px/80)+t)*36; ctx.beginPath(); ctx.arc(px,py,6,0,Math.PI*2); ctx.fillStyle = moodColor(moods[i].mood); ctx.fill(); }
    t += 0.02; requestAnimationFrame(drawWave);
  }
  function moodColor(m){ return ({joy:'#ffd166',calm:'#74c0fc',neutral:'#9aa0a6',sad:'#b388ff',anxiety:'#ff6b6b'})[m]||'#fff'}

  document.getElementById('exportMoods').addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify(getMoods(),null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='mindscape_moods.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('clearMoods').addEventListener('click', ()=>{ if(confirm('Clear all saved moods?')){ localStorage.removeItem('moods'); alert('Cleared'); } });

  drawWave();
})();