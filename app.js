(() => {
  'use strict';
  const SERVICE_LABELS = {
    remodelacion: 'Remodelación integral',
    interiores: 'Diseño y decoración',
    pintura: 'Pintura arquitectónica',
    domotica: 'Domótica y electricidad'
  };
  const screens = ['inicio', 'servicios', 'inspiracion', 'proyecto', 'consultas'];
  const storeKey = 'davids-v1-demo-briefs';
  const form = document.getElementById('project-form');
  const errorBox = document.getElementById('form-error');
  const review = document.getElementById('review-content');
  const modal = document.getElementById('summary-dialog');
  const summaryText = document.getElementById('summary-text');
  let currentStep = 1;
  let activeSummary = '';
  let timer = null;
  let briefs = [];
  try { briefs = JSON.parse(sessionStorage.getItem(storeKey) || '[]'); if (!Array.isArray(briefs)) briefs = []; } catch { briefs = []; }

  function e(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function toast(message) {
    const box = document.getElementById('toast');
    box.textContent = message; box.classList.add('show');
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => box.classList.remove('show'), 3600);
  }
  function screenFromHash() { const s = location.hash.slice(1); return screens.includes(s) ? s : 'inicio'; }
  function navigate(target) {
    if (!screens.includes(target)) return;
    if (location.hash !== `#${target}`) location.hash = target;
    renderScreen(target);
  }
  function renderScreen(target) {
    document.querySelectorAll('.screen').forEach(section => {
      const visible = section.dataset.screen === target;
      section.hidden = !visible;
      section.classList.toggle('is-active', visible);
    });
    document.querySelectorAll('[data-nav]').forEach(button => {
      const selected = button.dataset.nav === target;
      button.classList.toggle('active', selected && button.classList.contains('nav-link'));
      button.classList.toggle('selected', selected && button.closest('.bottom-nav'));
      if (selected && (button.classList.contains('nav-link') || button.closest('.bottom-nav'))) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    if (target === 'consultas') renderBriefs();
    window.scrollTo({ top: 0, behavior: 'instant' });
    const heading = document.querySelector(`.screen[data-screen="${target}"] h1`);
    if (heading) { heading.setAttribute('tabindex','-1'); heading.focus({preventScroll:true}); }
  }
  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-nav]');
    if (nav) { navigate(nav.dataset.nav); return; }
    const service = event.target.closest('[data-open-service], [data-service-quote]');
    if (service) {
      const key = service.dataset.openService || service.dataset.serviceQuote;
      form.querySelectorAll('input[name="services"]').forEach(input => { if (input.value === key) input.checked = true; });
      currentStep = 1; renderStep(); navigate('proyecto'); toast('Servicio agregado a tu consulta.'); return;
    }
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      document.querySelectorAll('[data-filter]').forEach(item => {
        const on = item === filter; item.classList.toggle('selected', on); item.setAttribute('aria-pressed', String(on));
      });
      document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter.dataset.filter !== 'todos' && filter.dataset.filter !== card.dataset.category; });
    }
    const preview = event.target.closest('[data-preview]');
    if (preview) openSummary(preview.dataset.preview);
    const remove = event.target.closest('[data-remove]');
    if (remove) {
      briefs = briefs.filter(item => item.id !== remove.dataset.remove);
      persist(); renderBriefs(); toast('Borrador eliminado de esta sesión.');
    }
  });
  window.addEventListener('hashchange', () => renderScreen(screenFromHash()));

  function value(field) { return (form.elements.namedItem(field)?.value || '').trim(); }
  function selectedServices() { return [...form.querySelectorAll('input[name="services"]:checked')].map(input => input.value); }
  function showError(message) { errorBox.hidden = false; errorBox.textContent = message; errorBox.scrollIntoView({block:'nearest'}); }
  function hideError() { errorBox.hidden = true; errorBox.textContent = ''; }
  function getData() {
    return {
      services: selectedServices(), property: value('property'), room: value('room'), zone: value('zone'),
      timing: value('timing'), client: value('client'), contact: value('contact'), details: value('details')
    };
  }
  function validStep(n) {
    const d = getData();
    if (n === 1 && !d.services.length) return 'Elegí al menos un servicio para continuar.';
    if (n === 2 && (!d.property || !d.room || !d.timing)) return 'Completá el tipo de propiedad, el ambiente y el plazo estimado.';
    if (n === 3) {
      if (d.client.length < 2) return 'Ingresá un nombre de al menos dos caracteres.';
      const c = d.contact.trim();
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
      const phone = /^\+?[\d\s()\-.]{8,25}$/.test(c) && (c.match(/\d/g) || []).length >= 8;
      if (!email && !phone) return 'Ingresá un correo válido o un número de teléfono con al menos 8 dígitos.';
    }
    return '';
  }
  function renderStep() {
    hideError();
    document.querySelectorAll('.form-step').forEach(step => { step.hidden = Number(step.dataset.step) !== currentStep; });
    document.querySelectorAll('[data-step-label]').forEach(item => {
      const n = Number(item.dataset.stepLabel);
      item.classList.toggle('current', n === currentStep);
      item.classList.toggle('complete', n < currentStep);
      if (n === currentStep) item.setAttribute('aria-current','step'); else item.removeAttribute('aria-current');
    });
    document.getElementById('previous-step').hidden = currentStep === 1;
    document.getElementById('next-step').hidden = currentStep === 4;
    document.getElementById('save-brief').hidden = currentStep !== 4;
    if (currentStep === 4) renderReview();
  }
  function renderReview() {
    const d = getData();
    const lines = [
      ['Servicios', d.services.map(k => SERVICE_LABELS[k]).join(', ')],
      ['Propiedad', d.property], ['Ambiente', d.room], ['Zona', d.zone || 'Sin indicar'],
      ['Plazo', d.timing], ['Nombre', d.client], ['Contacto', d.contact], ['Idea', d.details || 'Sin descripción adicional']
    ];
    review.innerHTML = lines.map(([label,text]) => `<div class="review-line"><span>${e(label)}</span><strong>${e(text)}</strong></div>`).join('');
  }
  document.getElementById('next-step').addEventListener('click', () => {
    const error = validStep(currentStep);
    if (error) { showError(error); return; }
    currentStep = Math.min(currentStep + 1, 4); renderStep();
  });
  document.getElementById('previous-step').addEventListener('click', () => { currentStep = Math.max(currentStep - 1, 1); renderStep(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (currentStep !== 4) return;
    for (let i = 1; i <= 3; i++) { const problem = validStep(i); if (problem) { currentStep = i; renderStep(); showError(problem); return; } }
    if (!document.getElementById('demo-confirm').checked) { showError('Confirmá que entendés que este es un prototipo sin envío real.'); return; }
    const d = getData();
    const brief = { ...d, id: `local-${Date.now()}-${Math.floor(Math.random()*9999)}`, created: new Date().toISOString() };
    briefs.unshift(brief);
    if (briefs.length > 20) briefs = briefs.slice(0,20);
    persist();
    form.reset(); currentStep = 1; renderStep();
    navigate('consultas');
    toast('Borrador guardado en esta sesión. No se envió a DAVIDS.');
  });
  function persist() {
    try { sessionStorage.setItem(storeKey, JSON.stringify(briefs)); }
    catch { toast('Este navegador no permite guardar datos de sesión.'); }
  }
  function formatDate(iso) {
    const d = new Date(iso); return Number.isNaN(+d) ? 'Fecha sin definir' : d.toLocaleDateString('es-AR', {day:'2-digit',month:'short',year:'numeric'});
  }
  function renderBriefs() {
    const list = document.getElementById('briefs-list');
    if (!briefs.length) {
      list.innerHTML = '<div class="empty-state"><span aria-hidden="true">◫</span><h2>Todavía no hay borradores.</h2><p>Empezá describiendo tu proyecto. Podrás revisar y compartir el resumen.</p></div>'; return;
    }
    list.innerHTML = briefs.map(item => `<article class="brief-card"><div class="brief-top"><div><span class="eyebrow dark">${e(formatDate(item.created))}</span><h2>${e(item.services.map(k=>SERVICE_LABELS[k]||k).join(' + '))}</h2><p>${e(item.room)} · ${e(item.zone || 'Zona no indicada')}</p></div><span class="draft-tag">BORRADOR LOCAL</span></div><div class="brief-actions"><button type="button" class="small-action" data-preview="${e(item.id)}">Ver y compartir</button><button type="button" class="small-action danger" data-remove="${e(item.id)}">Eliminar</button></div></article>`).join('');
  }
  function summary(item) {
    return `DAVIDS — CONSULTA INICIAL (BORRADOR)\n\nServicios: ${item.services.map(k=>SERVICE_LABELS[k]||k).join(', ')}\nPropiedad: ${item.property}\nAmbiente: ${item.room}\nZona: ${item.zone || 'Sin indicar'}\nPlazo: ${item.timing}\nNombre: ${item.client}\nContacto: ${item.contact}\nDescripción: ${item.details || 'Sin descripción adicional'}\n\nEste texto fue generado por un prototipo y todavía no constituye una reserva ni un presupuesto.`;
  }
  function openSummary(id) {
    const item = briefs.find(b => b.id === id); if (!item) return;
    activeSummary = summary(item); summaryText.textContent = activeSummary;
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  }
  document.getElementById('copy-summary').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(activeSummary); toast('Resumen copiado.'); }
    catch { const range = document.createRange(); range.selectNodeContents(summaryText); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); toast('Seleccionamos el texto; podés copiarlo manualmente.'); }
  });
  document.getElementById('whatsapp-summary').addEventListener('click', () => {
    if (!activeSummary) return;
    const url = 'https://wa.me/5491158227395?text=' + encodeURIComponent(activeSummary);
    window.open(url,'_blank','noopener,noreferrer');
  });
  renderStep(); renderScreen(screenFromHash());
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
