/** DAVIDS V1.2 — GitHub Pages: referencias demostrativas solamente.
 * La integración real con IA se mantiene separada en la edición para servidor Node.
 * GitHub Pages no procesa ni sube fotos a un servicio de IA.
 */
(()=>{'use strict';
  const $=id=>document.getElementById(id);
  const controls=$('live-controls'); if(controls)controls.hidden=true;
  const hint=$('mode-hint'); if(hint)hint.textContent='Modo demostración de GitHub Pages: explorá ejemplos de diseño. Tu imagen NO se transforma ni se envía a un servidor.';
  const state=$('service-state'); if(state)state.textContent='Modo demostración: sin IA conectada. Podés subir una foto localmente, describir tu proyecto y explorar cuatro referencias ilustrativas.';
  window.DAVIDS_LIVE={enabled:()=>false};
})();
