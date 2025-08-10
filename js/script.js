const slides = [
  {src:'./images/bridal/bridal-1.jpg', alt:'Bridal look 1', caption:'Bridal Glow'},
  {src:'./images/bridal/bridal-2.jpg', alt:'Bridal look 2', caption:'Indian Bridal Elegance'},
  {src:'./images/bridal/bridal-3.jpg', alt:'Bridal look 3', caption:'Soft Glam Bridal'},
  {src:'./images/bridal/bridal-4.jpg', alt:'Bridal look 4', caption:'Romantic Bridal'}
];
const featured = [
  {src:'./images/bridal/bridal-1.jpg', alt:'Featured Bridal', caption:'Featured Bridal Look'},
  {src:'./images/hair/hair-1.jpg', alt:'Featured Hair', caption:'Wedding Hair Updo'},
  {src:'./images/special-occasion/special-1.jpg', alt:'Special', caption:'Event Makeup'},
  {src:'./images/magazine/mag-1.jpg', alt:'Magazine', caption:'Editorial Makeup'}
];
const portraits = [
  {src:'./images/portraits/portrait-1.jpg', alt:'Portrait 1', caption:'Timeless Portrait 1'},
  {src:'./images/portraits/portrait-2.jpg', alt:'Portrait 2', caption:'Timeless Portrait 2'},
  {src:'./images/portraits/portrait-3.jpg', alt:'Portrait 3', caption:'Timeless Portrait 3'},
  {src:'./images/portraits/portrait-4.jpg', alt:'Portrait 4', caption:'Timeless Portrait 4'}
];
function initHero(){
  const container = document.getElementById('heroSlider');
  slides.forEach((s,i)=>{ const d=document.createElement('div'); d.className='hero-slide'; d.style.backgroundImage = `url(${s.src})`; if(i===0) d.classList.add('active'); container.appendChild(d); });
  let idx=0;
  document.getElementById('prevSlide').addEventListener('click', ()=>{ changeSlide(-1); });
  document.getElementById('nextSlide').addEventListener('click', ()=>{ changeSlide(1); });
  function changeSlide(dir){ const all = document.querySelectorAll('.hero-slide'); all[idx].classList.remove('active'); idx = (idx+dir+all.length)%all.length; all[idx].classList.add('active'); }
}
function populateFeatured(){ const f = document.getElementById('featuredThumbs'); if(!f) return; featured.forEach(item=>{ const a=document.createElement('a'); a.className='thumb'; a.href='#'; const img=document.createElement('img'); img.src=item.src; img.alt=item.alt; a.appendChild(img); a.addEventListener('click',(e)=>{ e.preventDefault(); openLightbox(item.src,item.caption,item.alt); }); f.appendChild(a); }); }
function populatePortraitsPreview(){ const p = document.getElementById('portraitsPreview'); if(!p) return; portraits.forEach(item=>{ const a=document.createElement('a'); a.className='thumb'; a.href='#'; const img=document.createElement('img'); img.src=item.src; img.alt=item.alt; a.appendChild(img); a.addEventListener('click',(e)=>{ e.preventDefault(); openLightbox(item.src,item.caption,item.alt); }); p.appendChild(a); }); }
async function loadGallery(category){ const gallery = document.getElementById('gallery'); if(!gallery) return; gallery.innerHTML=''; try{ const res = await fetch(`images/${category}/images.json`); if(res.ok){ const list = await res.json(); list.forEach(item=>addThumb(gallery,item.src,item.alt,item.caption)); return; } }catch(e){} for(let i=1;i<=4;i++){ addThumb(gallery,`./images/${category}/${category.split('/').pop()}-${i}.jpg`,`${category} ${i}`,`${category} ${i}`); } }
function addThumb(container, src, alt, caption){ const a=document.createElement('a'); a.className='thumb'; a.href='#'; const img=document.createElement('img'); img.src=src; img.alt=alt; a.appendChild(img); a.addEventListener('click',(e)=>{ e.preventDefault(); openLightbox(src,caption,alt); }); container.appendChild(a); }
function openLightbox(src, caption, alt){ const lb = document.getElementById('lightbox'); const img = document.getElementById('lbImage'); const cap = document.getElementById('lbCaption'); img.src=src; img.alt=alt||''; cap.textContent = caption||''; lb.setAttribute('aria-hidden','false'); const pin = document.getElementById('pinterestSave'); if(pin){ const url = encodeURIComponent(window.location.origin + '/' + src.replace('./','')); pin.href = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(window.location.origin + '/' + src.replace('./',''))}&description=${encodeURIComponent(caption||alt||'Paru Art Studio')}`; } }
function closeLightbox(){ const lb = document.getElementById('lightbox'); if(lb) lb.setAttribute('aria-hidden','true'); }
document.addEventListener('click',(e)=>{ if(e.target.classList.contains('lb-close')) closeLightbox(); if(e.target.id==='lightbox') closeLightbox(); });
document.addEventListener('DOMContentLoaded', ()=>{ initHero(); populateFeatured(); populatePortraitsPreview(); document.querySelectorAll('[id^=navToggle]').forEach(btn=>{ btn.addEventListener('click', ()=>{ btn.closest('.main-nav').classList.toggle('open'); }); }); document.querySelectorAll('.q-btn').forEach(b=>{ b.addEventListener('click', ()=>{ const a = b.nextElementSibling; a.style.display = (a.style.display==='block')?'none':'block'; }); }); });
function submitContact(e){ e.preventDefault(); const fn=document.getElementById('firstName').value.trim(); const ln=document.getElementById('lastName').value.trim(); const dt=document.getElementById('eventDate').value; const msg=document.getElementById('message').value.trim(); const subject=encodeURIComponent(`Booking inquiry from ${fn} ${ln}`); const body=encodeURIComponent(`Name: ${fn} ${ln}\nEvent Date: ${dt}\n\n${msg}`); window.location.href = `mailto:paruartstudio@gmail.com?subject=${subject}&body=${body}`; return false; }
