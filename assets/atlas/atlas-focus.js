// Larger globe: hide the side panel, playback bar, readout and legends so the globe fills the page; press again to restore.
(()=>{
 const button=document.getElementById('focus-view');if(!button)return;
 button.onclick=()=>{
  const on=!document.body.classList.contains('focus-globe');
  document.body.classList.toggle('focus-globe',on);
  button.setAttribute('aria-pressed',String(on));button.textContent=on?'Show panels':'Larger globe';
 };
})();
