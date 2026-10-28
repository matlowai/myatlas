// Larger globe: hide the side panel, playback bar, readout and legends so the globe fills the page; press again to restore.
// In that mode the toolbar shows a copy of "Explore a layer" and a small timeline (play, slider, time); both drive the originals.
(()=>{
 const $=id=>document.getElementById(id),button=$('focus-view'),layer=$('layer'),time=$('time'),play=$('play');if(!button)return;
 const watch=(el,fn)=>{if(el)new MutationObserver(fn).observe(el,{childList:true,characterData:true,subtree:true,attributes:true});};
 let anchor=button,mirror=null,slider=null,label=null,go=null;
 if(layer){
  mirror=document.createElement('select');mirror.id='focus-layer';mirror.className='focus-only';mirror.setAttribute('aria-label','Explore a layer');
  mirror.innerHTML=layer.innerHTML;mirror.value=layer.value;anchor.after(mirror);anchor=mirror;
  mirror.onchange=()=>{layer.value=mirror.value;layer.dispatchEvent(new Event('change'));};
  watch($('layer-title'),()=>{mirror.value=layer.value;});
 }
 if(time&&play){
  const box=document.createElement('span');box.id='focus-time';box.className='focus-only';
  go=document.createElement('button');go.type='button';go.setAttribute('aria-label','Play or pause the timeline');go.onclick=()=>play.click();
  slider=document.createElement('input');slider.type='range';slider.setAttribute('aria-label','Saved snapshot');
  for(const a of ['min','max','step','list'])if(time.getAttribute(a)!==null)slider.setAttribute(a,time.getAttribute(a));
  slider.oninput=()=>{time.value=slider.value;time.dispatchEvent(new Event('input'));};
  label=document.createElement('output');box.append(go,slider,label);anchor.after(box);
  const sync=()=>{slider.value=time.value;label.textContent=($('time-value')||{}).textContent||'';go.textContent=play.getAttribute('aria-pressed')==='true'?'Ⅱ':'▶';};
  watch($('time-value'),sync);watch(play,sync);sync();
 }
 button.onclick=()=>{
  const on=!document.body.classList.contains('focus-globe');
  document.body.classList.toggle('focus-globe',on);
  if(mirror)mirror.value=layer.value;if(slider)slider.value=time.value;
  button.setAttribute('aria-pressed',String(on));button.textContent=on?'Show panels':'Larger globe';
 };
})();
