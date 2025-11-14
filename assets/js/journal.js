/* journal.js — save/load journal entries, grow flowers */
(function(){
  const entryText = document.getElementById('entryText');
  const saveBtn = document.getElementById('saveEntry');
  const garden = document.getElementById('gardenArea');
  const noEntries = document.getElementById('noEntries');
  const exportBtn = document.getElementById('exportJournal');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');

  function getEntries(){ return JSON.parse(localStorage.getItem('journalEntries')||'[]'); }
  function setEntries(e){ localStorage.setItem('journalEntries',JSON.stringify(e)); }

  function saveJournal(){
    const text = entryText.value.trim(); if(!text) return alert('Please write something.');
    const mood = document.getElementById('entryMood').value;
    const entries = getEntries();
    const entry = {id:Date.now(),text,mood,ts:new Date().toISOString()};
    entries.push(entry); setEntries(entries);
    entryText.value=''; addFlower(entry); updateNoEntries();
  }

  function addFlower(entry){
    const el = document.createElement('div'); el.className='flower';
    const size = 80 + Math.floor(Math.random()*40);
    el.style.width = size+'px'; el.style.height = (size+20)+'px';
    const x = Math.random()*(garden.clientWidth - size - 16);
    el.style.left = x+'px';
    el.innerHTML = `<svg viewBox="0 0 80 120" width="80" height="120" xmlns="http://www.w3.org/2000/svg"><path d="M40 120 V64" stroke="#2b7a2b" stroke-width="6" stroke-linecap="round"/> <circle cx="40" cy="40" r="26" fill="${getColor(entry.mood)}" opacity="0.95"/></svg>`;
    garden.appendChild(el);
    // add small firefly
    const fly = document.createElement('div'); fly.className='firefly'; fly.style.left = (x + Math.random()*80)+'px'; fly.style.bottom = (40 + Math.random()*80)+'px'; garden.appendChild(fly);
    // float animation via JS
    fly.animate([{transform:'translate(0,0)',opacity:0.95},{transform:`translate(${(Math.random()-0.5)*80}px,${(Math.random()-0.5)*40}px)`,opacity:0.2},{transform:'translate(0,0)',opacity:0.95}],{duration:4000+Math.random()*5000,iterations:Infinity});
  }

  function loadGarden(){ const entries = getEntries(); garden.innerHTML=''; if(entries.length===0){updateNoEntries(); return;} entries.forEach(addFlower); updateNoEntries(); }

  function updateNoEntries(){ const entries = getEntries(); noEntries.style.display = entries.length? 'none':'block'; }

  function getColor(m){ return ({joy:'#ffd166',calm:'#74c0fc',neutral:'#9aa0a6',sad:'#b388ff',anxiety:'#ff6b6b'})[m]||'#fff'}

  saveBtn.addEventListener('click', saveJournal);
  exportBtn.addEventListener('click', ()=>{
    const entries = getEntries(); const blob = new Blob([JSON.stringify(entries, null, 2)],{type:'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='mindscape_journal.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  importBtn.addEventListener('click', ()=>importFile.click());
  importFile.addEventListener('change', ()=>{
    const f = importFile.files[0]; if(!f) return; const reader = new FileReader(); reader.onload = ()=>{
      try{ const imported = JSON.parse(reader.result); if(Array.isArray(imported)){ const entries = getEntries().concat(imported); setEntries(entries); loadGarden(); alert('Imported '+imported.length+' entries'); } else throw new Error('Invalid file'); }catch(e){alert('Import failed: '+e.message)}
    }; reader.readAsText(f);
  });

  // initial load
  window.addEventListener('resize', ()=>{/* noop for now */});
  document.addEventListener('DOMContentLoaded', loadGarden);
})();
