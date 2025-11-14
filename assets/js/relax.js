/* relax.js - showRandomRelaxation + animateQuoteBox */
(function(){
  const quotes = [
    "Breathe. Let go of what you can't control.",
    "You are not your thoughts. You are watching them.",
    "Small steps are progress too.",
    "This moment will pass. Be gentle with yourself.",
    "Kindness begins with you."
  ];
  const quoteBox = document.getElementById('quoteBox');
  const btn = document.getElementById('nextQuote');
  let idx = 0;
  function showRandomRelaxation(){ idx = (idx+1) % quotes.length; animateQuoteBox(quotes[idx]); }
  function animateQuoteBox(text){ quoteBox.classList.add('fade-out'); setTimeout(()=>{ quoteBox.textContent = text; quoteBox.classList.remove('fade-out'); },300); }
  btn.addEventListener('click', ()=>showRandomRelaxation());
  document.addEventListener('DOMContentLoaded', ()=>animateQuoteBox(quotes[0]));
})();