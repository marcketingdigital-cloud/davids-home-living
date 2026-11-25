(()=>{
'use strict';
const $=id=>document.getElementById(id);
const projects=[
{id:'01',category:'interiores',tag:'DISEÑO INTERIOR',title:'Refugio contemporáneo',location:'Living · Concepto visual',desc:'Un living sereno donde la madera, la iluminación indirecta y las texturas neutras construyen una atmósfera cálida.',features:['Paleta piedra, roble y marfil','Iluminación cálida por capas','Mobiliario de líneas depuradas','Materiales a validar en asesoramiento'],wall:'#cfc0ad',accent:'#b4a088',sofa:'#ece2d3',wood:'#98745e',window:'#bbd2c6'},
{id:'02',category:'remodelacion',tag:'REMODELACIÓN',title:'Nueva perspectiva',location:'Cocina · Concepto visual',desc:'Reinterpretación de cocina residencial con superficies claras, guardado integrado y mayor continuidad visual.',features:['Mobiliario integrado','Superficies de aspecto piedra','Iluminación de trabajo','Factibilidad técnica pendiente'],wall:'#ded9c9',accent:'#b9ae9a',sofa:'#ddd7c9',wood:'#86715d',window:'#c6d1c9'},
{id:'03',category:'pintura',tag:'PINTURA ARQUITECTÓNICA',title:'Materia & color',location:'Dormitorio · Concepto visual',desc:'Un cambio de carácter mediante pintura, textura y armonía cromática sin recurrir a una reforma integral.',features:['Pared de acento mineral','Contraste de tonos arena','Terminaciones mate','Selección de pintura según soporte'],wall:'#a3a58e',accent:'#dbcfbb',sofa:'#e9ddc9',wood:'#98775e',window:'#ced4c7'},
{id:'04',category:'domotica',tag:'DOMÓTICA',title:'Casa intuitiva',location:'Living · Concepto visual',desc:'Diseño integrado con capas de luz y controles inteligentes para acompañar distintas rutinas.',features:['Escenas de luz conceptual','Posibilidad de automatizar cortinas','Integración discreta de controles','Instalaciones sujetas a evaluación'],wall:'#c2bdb0',accent:'#8f968c',sofa:'#d7d7d1',wood:'#554d46',window:'#a7bbb8'},
{id:'05',category:'interiores',tag:'DISEÑO INTERIOR',title:'Calma mediterránea',location:'Estar · Concepto visual',desc:'Materiales orgánicos, curvas contenidas y una sensación de amplitud que une confort y elegancia.',features:['Texturas naturales claras','Detalles en madera cálida','Luz ambiental suave','Mobiliario adaptado al ambiente'],wall:'#e2d0b7',accent:'#cbb396',sofa:'#f1e9da',wood:'#b18a64',window:'#d2d8c8'}
];
let visible=[...projects],active=0,lastFocus=null;
function scene(p,after){
 const wall=after?p.wall:'#a6a29b',floor=after?p.wood:'#817b72',sofa=after?p.sofa:'#8c8880',accent=after?p.accent:'#aaa49a',win=after?p.window:'#c1c3bf';
 let extra=p.category==='domotica'&&after?'<path d="M540 120H670" stroke="#f7d896" stroke-width="8" opacity=".85"/><circle cx="635" cy="123" r="12" fill="#fcda91"/>':'';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><defs><linearGradient id="w" x2="1" y2="1"><stop stop-color="'+wall+'"/><stop offset="1" stop-color="'+accent+'"/></linearGradient><linearGradient id="f" x2="0" y2="1"><stop stop-color="'+floor+'"/><stop offset="1" stop-color="#554d44"/></linearGradient></defs><rect width="900" height="600" fill="#bbb0a0"/><path d="M0 0H900V424L0 405Z" fill="url(#w)"/><path d="M0 405L900 424V600H0Z" fill="url(#f)"/><path d="M0 0V404L150 357V0Z" fill="#30332b" opacity=".16"/><rect x="142" y="69" width="302" height="294" fill="#e7e4d9" stroke="#6c6b60" stroke-width="5"/><rect x="163" y="89" width="260" height="250" fill="'+win+'"/><path d="M293 90V340M163 210H423" stroke="#efebe2" stroke-width="13"/><path d="M178 319L230 265L276 289L344 237L413 299V339H178Z" fill="#53634e" opacity=".37"/><ellipse cx="563" cy="510" rx="282" ry="52" fill="#251f1b" opacity=".14"/><rect x="319" y="342" width="441" height="120" rx="33" fill="'+sofa+'"/><rect x="310" y="403" width="461" height="75" rx="20" fill="'+sofa+'"/><path d="M330 459V483M742 459V483" stroke="#6a5a4f" stroke-width="14"/><rect x="346" y="358" width="123" height="49" rx="14" fill="'+accent+'"/><rect x="591" y="358" width="119" height="49" rx="14" fill="'+accent+'"/><ellipse cx="558" cy="510" rx="145" ry="24" fill="#423a31" opacity=".25"/><path d="M424 486H692L671 524H439Z" fill="'+floor+'"/><ellipse cx="552" cy="478" rx="145" ry="35" fill="#c8b89e"/><path d="M788 152V431" stroke="#514a3d" stroke-width="8"/><path d="M749 176H830L805 230H774Z" fill="#eee5d4"/>'+extra+(after?'<circle cx="727" cy="285" r="17" fill="#c4a36c" opacity=".65"/>':'<rect x="479" y="99" width="155" height="105" fill="#b2aea7" stroke="#7b7b73" stroke-width="9"/>')+'<text x="35" y="561" fill="#fff" font-size="16" font-family="Arial" letter-spacing="3" opacity=".85">DAVIDS / '+(after?'PROPUESTA':'ANTES')+' CONCEPTUAL</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function wa(text){return 'https://wa.me/5491158227395?text='+encodeURIComponent(text)}
function email(text){return 'mailto:marcketing.digital@gmail.com?subject='+encodeURIComponent('Consulta DAVIDS · Portafolio conceptual')+'&body='+encodeURIComponent(text)}
const common='Hola, vi DAVIDS Portafolio Experience y quiero consultar por asesoramiento profesional pago. Entiendo que las imágenes son conceptos ilustrativos, no obras realizadas.';
$('wa-general').href=wa(common);$('mail-general').href=email(common);
function render(filter){
visible=filter==='todos'?[...projects]:projects.filter(p=>p.category===filter);
$('project-grid').replaceChildren();
visible.forEach(p=>{
 const article=document.createElement('article');article.className='project';
 const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','Abrir concepto '+p.title);
 const photo=document.createElement('div');photo.className='picture';const img=document.createElement('img');img.src=scene(p,true);img.loading='lazy';img.alt='Ilustración conceptual: '+p.title;const label=document.createElement('span');label.className='kind';label.textContent=p.tag;const open=document.createElement('span');open.className='open';open.setAttribute('aria-hidden','true');open.textContent='↗';photo.append(img,label,open);
 const info=document.createElement('div');info.className='project-info';const left=document.createElement('div');const meta=document.createElement('p');meta.textContent=p.location;const title=document.createElement('h3');title.textContent=p.title;left.append(meta,title);const arrow=document.createElement('span');arrow.className='arrow';arrow.textContent='↗';info.append(left,arrow);button.append(photo,info);button.addEventListener('click',()=>show(projects.indexOf(p)));article.append(button);$('project-grid').append(article);
});
$('count').textContent=visible.length+' propuestas conceptuales visibles · No representan obras ejecutadas.';
}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const yes=b===btn;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});render(btn.dataset.filter)
}));
function show(idx){active=(idx+projects.length)%projects.length;const p=projects[active];$('project-number').textContent=p.id;$('dialog-title').textContent=p.title;$('project-desc').textContent=p.desc;$('before').src=scene(p,false);$('after').src=scene(p,true);$('features').replaceChildren(...p.features.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));const text=common+'\nConcepto de referencia: '+p.title+'.\nAmbiente: '+p.location+'.\nQuisiera conocer los pasos y condiciones del asesoramiento.';$('wa-project').href=wa(text);$('mail-project').href=email(text);$('pager').textContent=(active+1)+' / '+projects.length;$('slider').value=50;change(50);if(!$('detail').open){lastFocus=document.activeElement;$('detail').showModal();}$('close').focus()}
function change(value){$('after-clip').style.clipPath='inset(0 '+(100-value)+'% 0 0)';$('value').textContent=value+'%'}
$('slider').addEventListener('input',e=>change(Number(e.target.value)));
$('close').addEventListener('click',()=>$('detail').close());
$('detail').addEventListener('click',e=>{if(e.target===$('detail'))$('detail').close()});
$('detail').addEventListener('close',()=>{if(lastFocus&&lastFocus.isConnected)lastFocus.focus()});
$('next').addEventListener('click',()=>show(active+1));$('prev').addEventListener('click',()=>show(active-1));
render('todos');
})();