// Ilustraciones locales de referencia: NO son resultados de IA real.
const palette=[
 {title:'Moderna cálida',desc:'Un ambiente equilibrado de líneas limpias y texturas naturales.',wall:'#e5dbcc',wood:'#ac855d',floor:'#c0aa8d',sofa:'#e8dac3',detail:'#514f43',led:'#ffdf9a',carpet:'#e7decd',green:'#63815f',items:['Neutros cálidos, arena y roble','Revestimientos de madera y textiles','Luz indirecta cálida, regulable','Control de luces y cortinas']},
 {title:'Minimalismo luminoso',desc:'Blancos quebrados, pocos elementos y sensación de amplitud.',wall:'#efeee9',wood:'#c8baaa',floor:'#d0c5b7',sofa:'#e4e3dd',detail:'#716f6a',led:'#fdf2cf',carpet:'#f3eee6',green:'#86947c',items:['Marfil, piedra y gris suave','Madera clara y superficies continuas','Luz natural y perfiles LED ocultos','Escenas simples de iluminación']},
 {title:'Premium contemporánea',desc:'Contrastes profundos, piedra y una ambientación sofisticada.',wall:'#aaa39a',wood:'#53463c',floor:'#8f8273',sofa:'#cec5b8',detail:'#242421',led:'#d8b475',carpet:'#b7a798',green:'#3c5446',items:['Grafito, taupe y bronce','Piedra, metal cepillado y madera oscura','Apliques puntuales y luz de acento','Control central de escenas y clima']},
 {title:'Smart living',desc:'Una estética refinada con capas de iluminación automatizable.',wall:'#d5d2cb',wood:'#8f8371',floor:'#9f998e',sofa:'#d9d5ce',detail:'#3e4a4c',led:'#84d4c6',carpet:'#c8c6bb',green:'#507f7d',items:['Grises cálidos y petróleo','Paneles acústicos y acabados técnicos','Tiras LED regulables y escenas','Automatización de iluminación y cortinas']}
];
function roomSvg(idx,before=false){const p=palette[idx]||palette[0];const W=950,H=650;
const wall=before?'#e8e4dc':p.wall, floor=before?'#b8ae9f':p.floor, trim=before?'#c5bbb0':p.wood, sky=before?'#b0c7c2':'#a5c2b8';
const line=before?'#aba49b':p.detail;
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
<defs><linearGradient id="wall" x2="0.9" y2="1"><stop stop-color="${wall}"/><stop offset="1" stop-color="${before?'#d5d1ca':p.wall}"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#d2e3dc"/><stop offset="1" stop-color="${sky}"/></linearGradient><linearGradient id="fl" x2="0" y2="1"><stop stop-color="${floor}"/><stop offset="1" stop-color="${before?'#857f76':p.floor}"/></linearGradient><linearGradient id="light" x2="0" y2="1"><stop stop-color="${before?'#fff2ce':p.led}" stop-opacity=".5"/><stop offset="1" stop-color="${before?'#fff2ce':p.led}" stop-opacity="0"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="7"/></filter></defs>
<rect width="950" height="650" fill="url(#wall)"/><path d="M0 0H950V439H0Z" fill="url(#wall)"/><path d="M0 438H950V650H0Z" fill="url(#fl)"/><path d="M0 443H950" stroke="${line}" opacity=".23" stroke-width="4"/>
<path d="M0 525L950 460M0 615L950 525M188 650L337 440M560 650L510 440M835 650L685 440" stroke="${line}" stroke-opacity=".10" stroke-width="3"/>
<rect x="70" y="78" width="327" height="356" rx="2" fill="#3d4841"/><rect x="83" y="90" width="301" height="334" fill="url(#glass)"/>
<path d="M83 302Q162 206 215 278T385 258V424H83Z" fill="#829d83" opacity=".65"/><path d="M83 332Q210 250 284 299T384 299V424H83Z" fill="#587f70" opacity=".7"/>
<path d="M230 90V424M83 282H384" stroke="#454d49" stroke-width="10"/><path d="M80 90V424M385 90V424" stroke="#eff2ee" stroke-opacity=".4" stroke-width="8"/>
${before?`<rect x="605" y="170" width="236" height="171" rx="4" fill="#efece5" stroke="#c2b9ac" stroke-width="7"/><path d="M658 301L715 225 762 258 786 236" fill="none" stroke="#d7cfbf" stroke-width="11"/><ellipse cx="530" cy="546" rx="250" ry="30" fill="#685f56" opacity=".15" filter="url(#shadow)"/><rect x="480" y="363" width="355" height="26" fill="#c3b7a5"/><path d="M499 385V485M814 385V485" stroke="#9c9385" stroke-width="10"/><path d="M0 0H950V650" fill="url(#light)" opacity=".18"/>`:''}
${before?'':`
<rect x="630" y="0" width="320" height="438" fill="${p.wood}"/><g stroke="${p.detail}" stroke-opacity=".28" stroke-width="6">${Array.from({length:17},(_,j)=>`<path d="M${640+j*19} 0V434"/>`).join('')}</g>
<rect x="620" y="36" width="305" height="6" fill="${p.led}" opacity=".87"/><path d="M620 42H925V180H620Z" fill="url(#light)" opacity=".64"/><rect x="702" y="127" width="165" height="133" rx="3" fill="#282c2b" stroke="#5a5e59" stroke-width="7"/>
<rect x="657" y="352" width="233" height="24" rx="3" fill="${p.detail}"/><path d="M683 376v56m182-56v56" stroke="${p.detail}" stroke-width="10" opacity=".9"/>
<ellipse cx="449" cy="563" rx="331" ry="54" fill="#302b26" opacity=".13" filter="url(#shadow)"/>
<path d="M142 520Q276 478 420 510T700 519Q613 611 234 604Z" fill="${p.carpet}" stroke="#8c8072" stroke-opacity=".18" stroke-width="3"/>
<rect x="205" y="315" width="341" height="120" rx="55" fill="${p.sofa}"/><rect x="169" y="404" width="422" height="94" rx="30" fill="${p.sofa}"/><path d="M196 451q190 35 365 0" stroke="#615344" stroke-width="5" opacity=".12" fill="none"/><rect x="154" y="393" width="55" height="104" rx="22" fill="${p.sofa}"/><rect x="551" y="391" width="58" height="104" rx="22" fill="${p.sofa}"/>
<rect x="237" y="339" width="88" height="66" rx="17" fill="${p.wood}" opacity=".52"/><rect x="449" y="343" width="82" height="70" rx="15" fill="#fff8eb" opacity=".65"/>
<path d="M211 489 194 535M561 489l21 45" stroke="${p.detail}" stroke-width="10"/>
<ellipse cx="461" cy="545" rx="130" ry="28" fill="${p.detail}" opacity=".28"/><rect x="373" y="479" width="164" height="35" rx="18" fill="${p.wood}"/><path d="M390 512 378 565m141-53 15 53" stroke="${p.detail}" stroke-width="12"/><ellipse cx="455" cy="482" rx="92" ry="27" fill="${p.wood}"/><ellipse cx="455" cy="478" rx="91" ry="25" fill="#fff4df" opacity=".16"/>
<ellipse cx="457" cy="455" rx="21" ry="8" fill="#e5e0d0"/><path d="M453 456q-6-14-2-26" stroke="#657b61" stroke-width="5"/><ellipse cx="442" cy="428" rx="8" ry="17" fill="${p.green}" transform="rotate(-28 442 428)"/><ellipse cx="462" cy="422" rx="8" ry="21" fill="${p.green}" transform="rotate(27 462 422)"/>
<path d="M890 460 885 391" stroke="#6e6759" stroke-width="8"/><path d="M877 425Q813 340 842 297Q886 304 895 375Q916 279 949 302Q951 352 911 406" fill="${p.green}"/><ellipse cx="887" cy="456" rx="24" ry="11" fill="${p.detail}"/>
<path d="M0 0H950V650" fill="url(#light)" opacity=".15"/>
`}
</svg>`}
function svgUrl(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
const beforeImg=svgUrl(roomSvg(0,true));const afterImgs=palette.map((_,i)=>svgUrl(roomSvg(i,false)));