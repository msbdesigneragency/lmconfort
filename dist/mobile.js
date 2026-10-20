/* Shared compact language selector, plus mobile-only gestures and reveals. */
(()=>{
 const mobile=matchMedia('(max-width:768px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
 let hero=null,start=null,observer=null;
 function setup(){

  const tools=document.querySelector('.header .tools');
  if(tools&&!tools.querySelector('.mobile-language')){
   const wrapper=document.createElement('details');wrapper.className='mobile-language';
   const trigger=document.createElement('summary');trigger.textContent=document.documentElement.lang.toUpperCase();trigger.setAttribute('aria-label',({fr:'Langue',en:'Language',ar:'اللغة'})[document.documentElement.lang]||'Language');
   const menu=document.createElement('div');menu.className='language-options';
   for(const language of ['fr','en','ar']){
    const option=document.createElement('button');option.type='button';option.textContent=language.toUpperCase();option.lang=language;option.setAttribute('aria-pressed',String(language===document.documentElement.lang));
    option.addEventListener('click',()=>{wrapper.open=false;tools.querySelector('[data-lang="'+language+'"]')?.click();document.querySelector('.mobile-language summary')?.focus()});menu.append(option);
   }
   wrapper.addEventListener('keydown',event=>{if(event.key==='Escape'){wrapper.open=false;trigger.focus()}});
   wrapper.addEventListener('focusout',event=>{if(!wrapper.contains(event.relatedTarget))wrapper.open=false});
   wrapper.append(trigger,menu);tools.insertBefore(wrapper,tools.firstChild);
  }
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
 document.addEventListener('click',event=>{document.querySelectorAll('.mobile-language[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false})});
 const app=document.getElementById('app');new MutationObserver(setup).observe(app,{childList:true});mobile.addEventListener('change',setup);setup();
})();
