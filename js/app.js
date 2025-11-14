// Minimal app wiring for animations and state
(()=>{
  // helpers
  const qs = s=>document.querySelector(s);
  const qsa = s=>Array.from(document.querySelectorAll(s));
  const navBtns = qsa('.main-nav button');
  const screens = qsa('.screen');
  const show = id=>{screens.forEach(s=>s.id===id? s.classList.remove('hidden') : s.classList.add('hidden'))};

  // initial page
  show('landing');

  // nav
  navBtns.forEach(b=>b.addEventListener('click',()=>{show(b.dataset.target)}));
  qs('#startBtn').addEventListener('click',()=>show('mood-galaxy'));

  // Typewriter effect (adds letters gradually)
  const typeEl = qs('.typewriter');
  const text = typeEl.textContent; typeEl.textContent='';
  let i=0; const tInt=setInterval(()=>{if(i<text.length){typeEl.textContent+=text[i++]}else clearInterval(tInt)},60);

  // Mood planets interactions & localStorage
  const moods = ['joy','calm','neutral','sad','anxiety'];
  const planets = qsa('.planet');
  planets.forEach(p=>{
    p.addEventListener('mouseenter',()=>{p.style.transform='scale(1.12) rotate(20deg)'});
    p.addEventListener('mouseleave',()=>{p.style.transform=''});
    p.addEventListener('click',()=>{
      const mood = p.dataset.mood;
      localStorage.setItem('lastMood',mood);
      playPlanetPop(p,mood);
      // show journey animation then go to garden
      playMindJourney(()=>{show('garden')});
    });
  });

  function playPlanetPop(el,mood){
    // small particle burst
    const parent = el.parentElement;
    for(let i=0;i<18;i++){
      const part = document.createElement('span');
      part.className='particle';
      const size = Math.random()*6+4;
      part.style.width=part.style.height=size+'px';
      part.style.borderRadius='50%';
      part.style.position='absolute';
      part.style.left=(el.offsetLeft + el.offsetWidth/2)+'px';
      part.style.top=(el.offsetTop + el.offsetHeight/2)+'px';
      part.style.background= getMoodColor(mood);
      part.style.transform=`translate(-50%,-50%)`;
      part.style.pointerEvents='none';
      parent.appendChild(part);
      // animate
      const dx = (Math.random()-0.5)*200; const dy = (Math.random()-0.9)*200;
      part.animate([{transform:`translate(-50%,-50%)`},{transform:`translate(${dx}px,${dy}px) scale(0.2)`}],{duration:700+Math.random()*400,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=()=>part.remove();
    }
  }
  function getMoodColor(m){
    return ({joy:'#ffd166',calm:'#74c0fc',neutral:'#9aa0a6',sad:'#b388ff',anxiety:'#ff6b6b'})[m]||'#fff'
  }

  // Journal saving -> add flower
  const saveBtn = qs('#saveJournal');
  const journalInput = qs('#journalInput');
  const moodSelect = qs('#moodSelect');
  const garden = qs('#gardenCanvas');

  saveBtn.addEventListener('click',()=>{
    const text = journalInput.value.trim(); if(!text) return alert('Write a short entry');
    const entry = {id:Date.now(),text,mood:moodSelect.value,ts:new Date().toISOString()};
    const entries = JSON.parse(localStorage.getItem('journalEntries')||'[]');
    entries.push(entry); localStorage.setItem('journalEntries',JSON.stringify(entries));
    addFlower(entry);
    journalInput.value='';
    playMindJourney();
  });

  // Restore existing entries
  (JSON.parse(localStorage.getItem('journalEntries')||'[]')).forEach(addFlower);

  function addFlower(entry){
    const f = document.createElement('div');
    f.className='flower';
    f.innerHTML = `<svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 120 V60" stroke="#2b7a2b" stroke-width="6" stroke-linecap="round"/> <circle cx="40" cy="40" r="26" fill="${getMoodColor(entry.mood)}" opacity="0.95"/></svg>`;
    // random X position
    const x = Math.random()* (garden.clientWidth-80);
    f.style.left = x+'px';
    f.style.bottom='10px';
    garden.appendChild(f);
    // add small fireflies
    for(let i=0;i<3;i++){const fly=document.createElement('div');fly.className='firefly';fly.style.left=(x+Math.random()*80)+'px';fly.style.bottom=(20+Math.random()*140)+'px';garden.appendChild(fly);floatFirefly(fly)}
  }
  function floatFirefly(el){
    const dur = 4000+Math.random()*6000; const tx = (Math.random()-0.5)*120; const ty=(Math.random()-0.5)*80;
    el.animate([{transform:'translate(0,0)',opacity:0.9},{transform:`translate(${tx}px,${ty}px)`,opacity:0.2},{transform:'translate(0,0)',opacity:0.9}],{duration:dur,iterations:Infinity});
  }

  // Breathing bubble timings
  const breathCircle = qs('#breathCircle');
  const breathText = qs('#breathText');
  let breathPhase=0; // 0 inhale,1 hold,2 exhale
  function breathCycle(){
    // Inhale
    breathText.textContent='Inhale';
    breathCircle.animate([{transform:'scale(1)'},{transform:'scale(1.28)'}],{duration:4200,fill:'forwards',easing:'ease-in-out'});
    document.body.animate([{filter:'brightness(1)'},{filter:'brightness(1.06)'}],{duration:4200,fill:'forwards'});
    setTimeout(()=>{
      breathText.textContent='Hold';
      setTimeout(()=>{
        breathText.textContent='Exhale';
        breathCircle.animate([{transform:'scale(1.28)'},{transform:'scale(0.9)'}],{duration:4200,fill:'forwards',easing:'ease-in-out'});
        document.body.animate([{filter:'brightness(1.06)'},{filter:'brightness(.98)'}],{duration:4200,fill:'forwards'});
      },1600);
    },4200);
  }
  setInterval(breathCycle,10000); breathCycle();

  // Relax quotes
  const quotes = ["Breathe. Let go.","You are doing your best.","This moment will pass.","Kindness begins with you."];
  const quoteText = qs('#quoteText'); let qI=0; function showQuote(){quoteText.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:700}); quoteText.textContent = quotes[qI%quotes.length]; qI++}
  setInterval(showQuote,6000); showQuote();

  // Crisis SafeRoom grounding steps
  const groundingSteps = ["Name 5 things you see","Name 4 things you can touch","Name 3 sounds you hear","Name 2 things you can smell","Name 1 thing you can taste or focus on breathing"];
  const groundingEl = qs('#groundingSteps'); groundingEl.innerHTML='';
  groundingSteps.forEach((s,i)=>{const li=document.createElement('li');li.textContent=s;li.style.opacity=0;groundingEl.appendChild(li);setTimeout(()=>li.animate([{opacity:0,transform:'translateX(12px)'},{opacity:1,transform:'translateX(0)'}],{duration:500,fill:'forwards',easing:'ease-out'}),700*i)});
  const emergencyBtn = qs('#emergencyBtn'); emergencyBtn.addEventListener('click',()=>{emergencyBtn.classList.add('heartbeat'); setTimeout(()=>window.open('tel:911'),400)});

  // Timeline wave canvas
  const canvas = qs('#waveCanvas'); const ctx = canvas.getContext('2d');
  function resizeCanvas(){canvas.width = Math.floor(canvas.clientWidth*devicePixelRatio); canvas.height = Math.floor(canvas.clientHeight*devicePixelRatio); ctx.scale(devicePixelRatio,devicePixelRatio);} 
  window.addEventListener('resize',resizeCanvas); resizeCanvas();

  let t=0; function drawWave(){
    const w = canvas.clientWidth; const h = canvas.clientHeight; ctx.clearRect(0,0,w,h);
    // background
    const grad = ctx.createLinearGradient(0,0,w,0); grad.addColorStop(0,'rgba(116,192,252,0.06)'); grad.addColorStop(1,'rgba(255,209,102,0.04)'); ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    // sine
    ctx.beginPath(); ctx.moveTo(0,h/2);
    for(let x=0;x<w;x+=2){const y = h/2 + Math.sin((x/60)+t)*30 + Math.sin((x/20)+t*0.5)*8; ctx.lineTo(x,y)}
    ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
    ctx.fillStyle='rgba(116,192,252,0.06)'; ctx.fill();
    // mood pulses from localStorage
    const entries = JSON.parse(localStorage.getItem('journalEntries')||'[]');
    entries.forEach((e,idx)=>{
      const px = (idx/(entries.length+1))* (w-40)+20; const py = h/2 + Math.sin((px/60)+t)*30; ctx.beginPath(); ctx.arc(px,py,6,0,Math.PI*2); ctx.fillStyle=getMoodColor(e.mood); ctx.fill();
    });
    t+=0.02; requestAnimationFrame(drawWave);
  }
  drawWave();

  // Mind Journey overlay
  const mj = qs('#mindJourney');
  function playMindJourney(cb){ mj.classList.remove('hidden'); mj.style.pointerEvents='auto'; setTimeout(()=>{mj.classList.add('hidden'); mj.style.pointerEvents='none'; if(cb) cb();},1200); }

  // small utility: show last mood on load
  const lastMood = localStorage.getItem('lastMood'); if(lastMood){const planet = qs(`.planet[data-mood="${lastMood}"]`); if(planet){planet.animate([{transform:'scale(1)'},{transform:'scale(1.14)'}],{duration:900,fill:'forwards'})}}
})();