/* main.js — navigation helpers and simple landing animation */
function goHome(){
  // optional landing animation hook
  if(location.pathname.endsWith('index.html') || location.pathname.endsWith('/')){
    document.documentElement.classList.add('landing-fade');
    setTimeout(()=>document.documentElement.classList.remove('landing-fade'),900);
  } else {
    window.location.href = 'index.html';
  }
}
function openMoodGalaxy(){ window.location.href = 'mood.html'; }
function goJournalGarden(){ window.location.href = 'journal.html'; }
function goBreathe(){ window.location.href = 'breathe.html'; }
function goRelax(){ window.location.href = 'relax.html'; }
function goSafeRoom(){ window.location.href = 'crisis.html'; }
function goDashboard(){ window.location.href = 'dashboard.html'; }

// small helper to gracefully attach handlers to elements by id
function on(id, evt, fn){ const el = document.getElementById(id); if(el) el.addEventListener(evt, fn); }

// attach basic handlers if present on index.html
document.addEventListener('DOMContentLoaded', ()=>{
  on('btnMood', 'click', openMoodGalaxy);
  on('btnJournal', 'click', goJournalGarden);
  on('btnBreathe', 'click', goBreathe);
  on('btnRelax', 'click', goRelax);
  on('btnSafe', 'click', goSafeRoom);
  on('btnDashboard', 'click', goDashboard);
  on('btnGame', 'click', ()=>{ window.location.href = 'game.html'; });
});
