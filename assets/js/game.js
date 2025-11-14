/* game.js - Focus Bubbles simple clickable game */
(function(){
  const area = document.getElementById('gameArea');
  const startBtn = document.getElementById('startGame');
  const timeEl = document.getElementById('timeLeft');
  const scoreEl = document.getElementById('score');
  const highEl = document.getElementById('highScore');
  const resetHigh = document.getElementById('resetHigh');

  let timer = null; let timeLeft = 30; let score = 0; let running=false; let spawnInterval=null;
  const HIGH_KEY = 'mindgame_highscore';

  function loadHigh(){ const h = parseInt(localStorage.getItem(HIGH_KEY)||'0',10); highEl.textContent = isNaN(h)?0:h }
  function saveHigh(){ const h = parseInt(localStorage.getItem(HIGH_KEY)||'0',10); if(score>h) localStorage.setItem(HIGH_KEY, String(score)); loadHigh(); }

  function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}

  function spawnBubble(){ const b = document.createElement('div'); b.className='bubble';
    const size = randomInt(36,84); b.style.width = size+'px'; b.style.height = size+'px';
    // color based on size / calm palette
    const palette = ['#ffd166','#74c0fc','#9aa0a6','#b388ff','#ff6b6b']; b.style.background = palette[Math.floor(Math.random()*palette.length)];
    const x = randomInt(8, area.clientWidth - size - 8); const y = randomInt(8, area.clientHeight - size - 8);
    b.style.left = x+'px'; b.style.top = y+'px'; b.style.transform = 'translateY(0)'; b.style.animation = 'floaty '+(4+Math.random()*3)+'s ease-in-out infinite';
    area.appendChild(b);
    b.addEventListener('click', ()=>{ score += Math.max(1, Math.round(100/size)); scoreEl.textContent = score; // show pop
      const pop = document.createElement('div'); pop.className='score-pop'; pop.textContent = '+'+Math.max(1, Math.round(100/size)); pop.style.left = (x + size/2)+'px'; pop.style.top = (y + size/2)+'px'; area.appendChild(pop);
      pop.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-36px)',opacity:0}],{duration:700}).onfinish=()=>pop.remove();
      b.remove();
    });
    // remove after some time
    setTimeout(()=>{ if(b.parentElement) b.remove(); }, 4200 + Math.random()*2000);
  }

  function tick(){ timeLeft--; timeEl.textContent = timeLeft; if(timeLeft<=0){ stopGame(); } }

  function startGame(){ if(running) return; running=true; score=0; timeLeft=30; scoreEl.textContent=0; timeEl.textContent=timeLeft; startBtn.textContent='Playing...';
    spawnInterval = setInterval(spawnBubble, 700);
    // spawn a few immediately
    for(let i=0;i<3;i++) setTimeout(spawnBubble, i*250);
    timer = setInterval(tick,1000);
  }
  function stopGame(){ running=false; clearInterval(timer); clearInterval(spawnInterval); timer=null; spawnInterval=null; startBtn.textContent='Start'; saveHigh(); alert('Time up! Score: '+score); // clear remaining bubbles
    Array.from(area.querySelectorAll('.bubble')).forEach(b=>b.remove()); }

  startBtn.addEventListener('click', ()=>{ if(!running) startGame(); else stopGame(); });
  resetHigh.addEventListener('click', ()=>{ if(confirm('Reset high score?')){ localStorage.removeItem(HIGH_KEY); loadHigh(); } });

  // init
  loadHigh(); window.addEventListener('resize', ()=>{/* noop */});
})();
