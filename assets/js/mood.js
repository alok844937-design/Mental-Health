/* mood.js - mood page interactions */
(function(){
  const planets = Array.from(document.querySelectorAll('.planet'));
  const confirm = document.getElementById('moodConfirm');
  function saveMood(mood){
    const moods = JSON.parse(localStorage.getItem('moods')||'[]');
    moods.push({mood,ts:new Date().toISOString()});
    localStorage.setItem('moods',JSON.stringify(moods));
    return {mood,ts:new Date().toISOString()};
  }
  function moodPlanetPop(el, mood){
    // simple pop + burst of particles around the planet
    el.animate([{transform:'scale(1)'},{transform:'scale(1.18)'},{transform:'scale(1)'}],{duration:500,easing:'cubic-bezier(.2,.8,.2,1)'});
    for(let i=0;i<18;i++){
      const p = document.createElement('div'); p.className='m-pop';
      p.style.position='absolute'; p.style.width='8px'; p.style.height='8px'; p.style.borderRadius='50%';
      p.style.left = (el.offsetLeft + el.clientWidth/2) + 'px'; p.style.top = (el.offsetTop + el.clientHeight/2) + 'px';
      p.style.background = getColor(mood); p.style.pointerEvents='none'; document.body.appendChild(p);
      const dx = (Math.random()-0.5)*220; const dy = (Math.random()-1.2)*220;
      p.animate([{transform:'translate(-50%,-50%) scale(1)'},{transform:`translate(${dx}px,${dy}px) scale(.2)`}],{duration:700+Math.random()*400,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish = ()=>p.remove();
    }
  }
  function getColor(m){return ({joy:'#ffd166',calm:'#74c0fc',neutral:'#9aa0a6',sad:'#b388ff',anxiety:'#ff6b6b'})[m]||'#ffffff'}

  planets.forEach(p=>{
    p.addEventListener('click', (e)=>{
      const mood = p.dataset.mood;
      saveMood(mood);
      moodPlanetPop(p,mood);
      // show confirmation
      confirm.textContent = `Saved: ${mood} — thank you!`;
      confirm.style.opacity = 1; confirm.style.transform = 'translateY(0)';
      setTimeout(()=>{confirm.style.opacity = 0; confirm.style.transform='translateY(6px)';},1500);
      // small redirect to dashboard after short delay
      setTimeout(()=>window.location.href='dashboard.html',900);
    });
  });
})();