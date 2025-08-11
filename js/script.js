// Simple site JS: slideshow, menu toggle, lightbox, gallery loader, contact mailto
const slides = [
  {src:'images/placeholder.jpg', alt:'Bridal look 1 - Paru Art Studio', caption:'Natural Bridal Look — Orange County'},
  {src:'images/placeholder.jpg', alt:'Bridal look 2 - Paru Art Studio', caption:'Traditional Indian Bridal — Orange County'},
  {src:'images/placeholder.jpg', alt:'Bridal look 3 - Paru Art Studio', caption:'Soft Glam Bridal — Huntington Beach'},
  {src:'images/placeholder.jpg', alt:'Bridal look 4 - Paru Art Studio', caption:'Editorial Bridal Look'},
  {src:'images/placeholder.jpg', alt:'Bridal look 5 - Paru Art Studio', caption:'Romantic Bridal Makeup'}
];

const featured = [
  {src:'images/placeholder.jpg', alt:'Featured Bridal - Paru Art Studio', caption:'Featured bridal look'},
  {src:'images/placeholder.jpg', alt:'Featured Hair - Paru Art Studio', caption:'Wedding hair updo'},
  {src:'images/placeholder.jpg', alt:'Featured Special - Paru Art Studio', caption:'Special occasion makeup'},
  {src:'images/placeholder.jpg', alt:'Featured Magazine - Paru Art Studio', caption:'Editorial makeup sample'}
];

function initSlideshow(){
  const container = document.getElementById('slideshow');
  if(!container) return;
  slides.forEach((s,i)=>{
    const d = document.createElement('div'); d.className='slide';
    d.style.backgroundImage = `url(${s.src})`;
    d.setAttribute('data-caption', s.caption);
    if(i===0) d.classList.add('active');
    container.appendChild(d);
  });
  let idx=0; setInterval(()=>{
    const all = container.querySelectorAll('.slide');
    all[idx].classList.remove('active');
    idx = (idx+1)%all.length;
    all[idx].classList.add('active');
  },4000);
}

function populateFeatured(){
  const f = document.getElementById('featuredThumbs');
  if(!f) return;
  featured.forEach(item=>{
    const a = document.createElement('a'); a.className='thumb';
    a.href='#';
    const img = document.createElement('img'); img.src=item.src; img.alt=item.alt;
    a.appendChild(img);
    a.addEventListener('click', (e)=>{ e.preventDefault(); openLightbox(item.src, item.caption, item.alt); });
    f.appendChild(a);
  });
}

function openLightbox(src, caption, alt){
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImage');
  const cap = document.getElementById('lbCaption');
  if(!lb || !img) return;
  img.src = src; img.alt = alt||''; cap.textContent = caption||'';
  lb.setAttribute('aria-hidden','false');
}

function closeLightbox(){
  const lb = document.getElementById('lightbox');
  if(lb) lb.setAttribute('aria-hidden','true');
}

function setupLightbox(){
  document.addEventListener('click', function(e){
    if(e.target.classList.contains('thumb')) return;
  });
  document.querySelectorAll('.lb-close').forEach(b=>b.addEventListener('click', closeLightbox));
  document.getElementById('lightbox')?.addEventListener('click', function(e){ if(e.target.id==='lightbox') closeLightbox(); });
}

function setupNavToggles(){
  document.querySelectorAll('[id^=navToggle]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.closest('.main-nav').classList.toggle('open');
    });
  });
}

// Simple gallery loader: expects images/<category>/images.json OR fallback to inlined arrays
async function loadGallery(category){
  const gallery = document.getElementById('gallery');
  if(!gallery) return;
  gallery.innerHTML = '';
  // try to fetch images/<category>/images.json
  try{
    const res = await fetch(`images/${category}/images.json`);
    if(res.ok){
      const list = await res.json();
      list.forEach(item=>addThumb(gallery, item.src, item.alt || `${category} - Paru Art Studio`, item.caption||''));
      return;
    }
  }catch(e){/* ignore */}
  // fallback - example placeholders
  const fallback = [
    {src:'images/placeholder.jpg', alt:`${category} sample 1`, caption:''},
    {src:'images/placeholder.jpg', alt:`${category} sample 2`, caption:''},
    {src:'images/placeholder.jpg', alt:`${category} sample 3`, caption:''}
  ];
  fallback.forEach(it=>addThumb(gallery, it.src, it.alt, it.caption));
}

function addThumb(container, src, alt, caption){
  const a = document.createElement('a'); a.className='thumb'; a.href='#';
  const img = document.createElement('img'); img.src=src; img.alt=alt;
  a.appendChild(img);
  a.addEventListener('click', (e)=>{ e.preventDefault(); openLightbox(src, caption, alt); });
  container.appendChild(a);
}

function submitContact(e){
  e.preventDefault();
  const fn = document.getElementById('firstName').value.trim();
  const ln = document.getElementById('lastName').value.trim();
  const dt = document.getElementById('eventDate').value;
  const msg = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Booking inquiry from ${fn} ${ln}`);
  let body = `Name: ${fn} ${ln}%0D%0AEvent Date: ${dt}%0D%0A%0D%0A${encodeURIComponent(msg)}`;
  const mailto = `mailto:paruartstudio@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  return false;
}

// set year in footer
['year','year2','year3','year4','year5','year6','year7','year8'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent = new Date().getFullYear(); });

// init on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{ initSlideshow(); populateFeatured(); setupLightbox(); setupNavToggles(); });
