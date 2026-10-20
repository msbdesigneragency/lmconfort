/* Progressive mobile gestures and reveals; desktop rendering is untouched. */
(()=>{
 const mobile=matchMedia('(max-width:768px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
 let hero=null,start=null,observer=null;
 function setup(){
  if(!mobile.matches){observer?.disconnect();return}
  const current=document.querySelector('.hero');
  if(current&&current!==hero){
   hero=current;
   hero.addEventListener('touchstart',event=>{if(event.target.closest('a,button'))return;const touch=event.touches[0];start={x:touch.clientX,y:touch.clientY}}, {passive:true});
   hero.addEventListener('touchend',event=>{if(!start)return;const touch=event.changedTouches[0],dx=touch.clientX-start.x,dy=touch.clientY-start.y;start=null;if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.5)return;const next=dx<0;const rtl=document.documentElement.dir==='rtl';const controls=hero.querySelectorAll('.slider button');controls[next!==rtl?controls.length-1:0]?.click()}, {passive:true});
  }
  if(!reduce.matches&&'IntersectionObserver' in window){
   observer??=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('mobile-revealed');observer.unobserve(entry.target)}}},{threshold:.12});
   document.querySelectorAll('main .section,main .promo,main .editorial.full,main .instagram').forEach(el=>{if(!el.dataset.mobileReveal){el.dataset.mobileReveal='true';observer.observe(el)}});
  }
 }
 const app=document.getElementById('app');new MutationObserver(setup).observe(app,{childList:true});mobile.addEventListener('change',setup);setup();
})();
