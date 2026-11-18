/* A self-contained presentation prototype. No uploads, PII, cookies or network writes. */
const panel = document.querySelector('#panel');
const dialog = document.querySelector('#dialog');
const dContent = document.querySelector('#dialog-content');
const toast = document.querySelector('#toast');
const links = [...document.querySelectorAll('[role="tab"]')];
const ptsHeader = document.querySelector('#hero-points');

const shapes = {
  challenge: '<path d="M12 2.7 14 8.7l6 .1-4.8 3.7 1.7 5.9-4.9-3.4-5 3.4 1.8-5.9L4 8.8l6-.1z"/><path d="M19 3v4m-2-2h4"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12m-1-12H8.4A2.4 2.4 0 1 1 10.8 5.6L12 8Zm2 0h2.6a2.4 2.4 0 1 0-2.4-2.4L12 8Z"/>',
  trophy: '<path d="M7 3h10v6a5 5 0 0 1-10 0V3ZM7 5H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4m-5 3v5m-4 2h8m-3-14-1 1.5-1-1.5"/>',
  survey: '<rect x="5" y="4.5" width="14" height="17" rx="2" fill="#fbf3ff"/><rect x="9" y="2.5" width="6" height="4.5" rx="1" fill="#c288f0"/><path d="m8 11 .9.9 1.6-1.7M12 11h4m-8 5 .9.9 1.6-1.7M12 16h4"/>',
  bug: '<path d="M12 7c-3.2 0-5 2.7-5 5.1v2.4a5 5 0 0 0 10 0v-2.4C17 9.7 15.2 7 12 7Z" fill="#ffac70"/><path d="M9 7.5a3 3 0 0 1 6 0M12 10v9m-2-14L8 3m6 2 2-2m1 6 3-2M7 9 4 7m3 6H4m13 0h3m-1 5-2-2m-10 0-2 2"/>',
  check: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M7.5 3v4m9-4v4M4 9.5h16m-11 5 2 2 4-4"/>',
  book: '<path d="M3 5.5h5a4 4 0 0 1 4 4v10.3a4 4 0 0 0-4-3.3H3Zm18 0h-5a4 4 0 0 0-4 4v10.3a4 4 0 0 1 4-3.3h5Z"/>',
  friends: '<circle cx="9" cy="8" r="3"/><path d="M3 19v-1.5A3.5 3.5 0 0 1 6.5 14h5a3.5 3.5 0 0 1 3.5 3.5V19m2-11v6m-3-3h6"/>',
  spark: '<path d="M12 2c1.3 6.4 3.6 8.7 10 10-6.4 1.3-8.7 3.6-10 10C10.7 15.6 8.4 13.3 2 12 8.4 10.7 10.7 8.4 12 2Z"/><path d="M19 2v4m-2-2h4"/>',
  ticket: '<path d="M3 6.5h18v3a2.5 2.5 0 0 0 0 5v3H3v-3a2.5 2.5 0 0 0 0-5Z" fill="#ffcf83"/><path d="M15 7v1m0 3v2m0 3v1M7 11h4m-4 2h3"/>',
  blanket: '<path d="M6 4.5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2Z" fill="#e5c5ff"/><path d="M7 4.5v14m3-10 2 2 2-2 2 2m-6 3 2 2 2-2 2 2M5 19v2m3-2v2m3-2v2m3-2v2m3-2v2m3-2v2"/>',
  cat: '<path d="M6 11 5 5c-.1-.8.8-1.3 1.4-.8L10 7h4l3.6-2.8c.6-.5 1.5 0 1.4.8l-1 6a5.2 5.2 0 0 1-4 8h-4a5.2 5.2 0 0 1-4-8Z" fill="#ffd0a2"/><path d="M8.5 12h.1m6.8 0h.1m-5 2.6 1.5 1 1.5-1m-8.7-.4-2.6-.6m2.6 2.7-2.1.5m16.4-2.6 2.6-.6m-2.6 2.7 2.1.5"/>',
};
function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.spark}</svg>`;
}
function art(name, cls = '') { return `<span class="art ${cls}">${icon(name)}</span>`; }
function e(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function score(n) { return `<span class="pts">+${n} แต้ม</span>`; }
function badge(label, style = 'ok') { return `<span class="status ${style}">${e(label)}</span>`; }

const richServices = [
  {id:'library', name:'My Library', sub:'รวมบริการห้องสมุด', route:'library'},
  {id:'lot', name:'LOT', sub:'รายการอุปกรณ์ LOTs', detail:'ดูรายการอุปกรณ์ที่หอสมุดมีให้ยืม เช่น อุปกรณ์ถ่ายภาพ เครื่องดนตรี และเกม'},
  {id:'booking', name:'Booking', sub:'จองห้อง', detail:'เลือกจองห้องค้นคว้าหรือพื้นที่ให้บริการของหอสมุด'},
  {id:'recommendation', name:'Recommendation', sub:'แนะนำหนังสือ', detail:'ค้นพบหนังสือน่าอ่านจากเมนูแนะนำหนังสือของหอสมุด'},
  {id:'qr', name:'My QR-Code', sub:'คิวอาร์โค้ด', detail:'แสดงคิวอาร์โค้ดสำหรับเข้าใช้บริการหอสมุด'},
  {id:'live', name:'Live Chat', sub:'ติดต่อเจ้าหน้าที่', detail:'สอบถามข้อมูลห้องสมุดกับเจ้าหน้าที่ผ่านแชต LINE'},
];
const libraryServices = [
  {id:'renew', name:'List&Renew', sub:'รายการยืมและต่ออายุ', detail:'ตรวจสอบรายการที่ยืมและต่ออายุรายการที่เข้าเงื่อนไข'},
  {id:'borrow', name:'Borrow', sub:'ยืมหนังสือ', detail:'เข้าถึงบริการยืมหนังสือของหอสมุด'},
  {id:'tracking', name:'Tracking', sub:'ติดตามสถานะหนังสือ', detail:'ติดตามสถานะหนังสือจากรายการของคุณ'},
  {id:'fine', name:'Pay Fine', sub:'ชำระค่าปรับ', detail:'ตรวจสอบค่าปรับและเข้าถึงช่องทางชำระค่าปรับของหอสมุด'},
  {id:'services', name:'U-Services', sub:'รวมบริการออนไลน์', detail:'ดูเมนูบริการออนไลน์อื่น ๆ ของหอสมุด'},
  {id:'guide', name:'Guideline', sub:'วิธีใช้งาน', detail:'เปิดคู่มือแนะนำขั้นตอนการใช้บริการหอสมุด'},
];
const views = Object.fromEntries(['menu','library','points'].map(id => [id, document.querySelector(`#${id}-view`)]));
function menuImage(service) {
  return `<img class="rich-art" src="menu-art/${service.id}.webp" alt="" decoding="async">`;
}
function menuCard(service) {
  const label = service.id === 'recommendation' ? 'Recom&shy;mendation' : e(service.name);
  const content = `${menuImage(service)}<strong>${label}</strong><span>${e(service.sub)}</span>`;
  const attrs = `class="rich-card" data-testid="card-service-${service.id}"`;
  return service.route ? `<a ${attrs} href="#${service.route}">${content}</a>` : `<button ${attrs} type="button" data-menu-service="${service.id}">${content}</button>`;
}
document.querySelector('#rich-grid').innerHTML = richServices.map(menuCard).join('');
document.querySelector('#library-grid').innerHTML = libraryServices.map(menuCard).join('');
function serviceDialog(id) {
  const service = [...richServices, ...libraryServices].find(item=>item.id===id);
  if (!service?.detail) return;
  dialogView('บริการเดิมใน LifeONLine',service.name,`<div class="service-summary">${menuImage(service)}<div><h3>${e(service.sub)}</h3><p>${e(service.detail)}</p></div></div><p>แสดงเป็นตัวอย่างเท่านั้น ต้นแบบไม่ได้เชื่อมกับบริการจริง</p><div class="actions"><button type="button" class="primary" data-action="close">กลับไปที่เมนู</button></div>`);
}
let currentView;
function showRoute() {
  const hash = location.hash.slice(1);
  const route = Object.hasOwn(views,hash) ? hash : 'menu';
  if (route === currentView) return;
  const previous = currentView;
  currentView = route;
  closeDialog();
  Object.entries(views).forEach(([id, view]) => {view.hidden = id !== route;});
  document.title = `${({menu:'เมนูบริการหอสมุด', library:'My Library', points:'บัตรสะสมแต้ม'})[route]} | TULIB LifeONLine`;
  window.scrollTo(0, 0);
  if (previous) {
    const target = route === 'menu'
      ? views.menu.querySelector(previous === 'points' ? '.points-entry' : '[data-testid="card-service-library"]')
      : views[route].querySelector('h1');
    target?.focus({preventScroll:true});
  }
}

const features = ['My Library', 'Booking', 'Book Recommendation', 'My QR-Code'];
const reportOptions = [...features, 'LOTs', 'Live Chat', 'อื่น ๆ'];
const missions = [
  {id:'checkin', group:'daily', name:'Daily Check-in', sub:'เช็กอินได้วันละครั้ง', badge:'+1 แต้ม', icon:'check', points:1},
  {id:'service', group:'daily', name:'ใช้งาน LifeOnLine', sub:'ไม่รวม LOTs และ Live Chat', badge:'+1 / ฟีเจอร์', icon:'book', points:1},
  {id:'allfeatures', group:'monthly', name:'ใช้งานครบทุกฟีเจอร์', sub:'ไม่รวม LOTs และ Live Chat', badge:'+5 แต้ม', icon:'book', points:5},
  {id:'friends', group:'once', name:'ชวนเพื่อนสมัคร LifeOnLine', sub:'รับแต้มเมื่อเพื่อนสมัครสำเร็จ', badge:'+1 / คน', icon:'friends', points:1},
  {id:'ranking', group:'semester', name:'Leaderboard', sub:'จัดอันดับ 5 คนที่มีแต้มสะสมสูงสุด', badge:'Top 5', icon:'trophy'},
  {id:'festival', group:'event', name:'กิจกรรมตามเทศกาล', sub:'รับแต้มตามกิจกรรมที่เข้าร่วม', badge:'+5 แต้ม', icon:'spark', points:5},
  {id:'lottery', group:'event', name:'Lottery Win', sub:'สิทธิ์ตามเงื่อนไขกิจกรรม', badge:'+5 / ครั้ง', icon:'ticket', points:5},
  {id:'campaign', group:'event', name:'Low-season Campaign', sub:'คะแนนตามความเหมาะสมของกิจกรรม', badge:'ตามกิจกรรม', icon:'spark'},
  {id:'first100', group:'event', name:'First 100 Users Challenge', sub:'ภารกิจพิเศษสำหรับ 100 คนแรก', badge:'+10 แต้ม', icon:'trophy', points:10},
];
const categories = {all:'ทั้งหมด',daily:'รายวัน',monthly:'รายเดือน',once:'ครั้งเดียว',semester:'รายเทอม',event:'กิจกรรมพิเศษ'};
const rewards = [
  {id:'massage', name:'ตั๋วเครื่องนวด', cost:10, icon:'ticket', color:'warm', sub:'1 ใบ / 15 นาที', details:['กดแลกต่อหน้าบรรณารักษ์ที่เคาน์เตอร์ เจ้าหน้าที่จะพาไปใช้เก้าอี้','30 ครั้งต่อวัน · 600 ใบต่อเดือน · ไม่จำกัดสิทธิ์ต่อคน']},
  {id:'blanket', name:'ยืมผ้าห่ม', cost:15, icon:'blanket', color:'', sub:'ยืมที่เคาน์เตอร์เมื่อมีผ้าว่าง', details:['นำบัตรนักศึกษาไปยืมตามขั้นตอนปกติ','หอสมุดมีผ้าห่มประมาณ 60 ผืน โปรดตรวจสอบว่ามีผ้าว่างก่อนแลก']},
  {id:'cats', name:'เล่นกับแมว', cost:50, icon:'cat', color:'rose', sub:'15–30 นาที / รอบ', details:['2 รอบต่อเดือน · จำกัด 2 คนต่อรอบ','ประกาศวัน เวลา และสถานที่ล่วงหน้า รับตามลำดับการลงชื่อ']},
];
const prizes = ['ChatGPT Plus 1 เดือน','Starbucks Gift Voucher','แก้วน้ำเก็บความเย็น','Voucher Melody Sphere size M','Voucher Melody Sphere size S'];
const board = [{id:'7421',points:102},{id:'3814',points:91},{id:'4592',points:84},{id:'0657',points:79},{id:'9026',points:72}];
const me = '2163';
const state = {
  tab:'challenge', filter:'all', balance:24, season:74, survey:null, reports:[],
  completed:new Set(), visited:new Set(), redeemed:[{id:'massage', label:'ใช้แล้ว'}],
};
let returnFocus, toastTimer;
function announce(message) {
  toast.textContent = message; clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {toast.textContent = '';}, 4400);
}
function earn(n) { state.balance += n; state.season += n; paint(); }
function dialogView(kicker, title, body, className = '') {
  if (!dialog.open) returnFocus = document.activeElement;
  dContent.innerHTML = `<div class="dialog-top"><div><small>${e(kicker)}</small><h2 id="dialog-title">${e(title)}</h2></div><button class="icon-button" data-action="close" type="button" aria-label="ปิดหน้าต่าง"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="dialog-main ${className}">${body}</div>`;
  if (!dialog.open) dialog.showModal();
  else dContent.querySelector('.icon-button').focus({preventScroll:true});
  dialog.scrollTop = 0;
}
function closeDialog() { if (dialog.open) dialog.close(); }
dialog.addEventListener('close', () => {
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
  else if (returnFocus?.dataset.mission) (panel.querySelector(`[data-mission="${returnFocus.dataset.mission}"]`) || panel).focus({preventScroll:true});
  else if (returnFocus?.dataset.reward) (panel.querySelector(`[data-reward="${returnFocus.dataset.reward}"]`) || panel).focus({preventScroll:true});
  else links.find(x => x.dataset.tab === state.tab)?.focus({preventScroll:true});
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
});
function rowMission(m) {
  const status = state.completed.has(m.id) ? badge('สำเร็จ') : `<span class="pts">${e(m.badge)}</span>`;
  return `<button type="button" class="mission-row" data-mission="${m.id}">${art(m.icon,'mini' + (m.group==='event'?' warm':''))}<span class="row-text"><strong>${e(m.name)}</strong><small>${e(m.sub)}</small></span><span class="row-right">${status}</span></button>`;
}
function challenges() {
  const pending = state.reports.filter(r=>r.status==='pending').length;
  const surveyStatus = state.survey ? badge('ส่งแล้ว') : score(1);
  const bugStatus = pending ? badge('รอตรวจ','pending') : score(1);
  return `<section aria-labelledby="mvp-heading">
      <div class="section-head"><div><span class="section-kicker">CHALLENGE</span><h2 id="mvp-heading">ภารกิจแนะนำ</h2><p>สำรวจบริการหอสมุด แล้วรับแต้มจากภารกิจ</p></div></div>
      <div class="mvp-grid">
        <button class="feature" type="button" data-mission="survey">${art('survey')}<span><span class="feature-label">เดือนละ 1 ครั้ง</span><h3>ตอบแบบสอบถาม</h3><p>แชร์ความคิดเห็นต่อฟีเจอร์ LifeOnLine</p></span><span class="feature-side">${surveyStatus}<span class="chev" aria-hidden="true">›</span></span></button>
        <button class="feature" type="button" data-mission="bug">${art('bug','warm')}<span><span class="feature-label">ช่วยปรับปรุงบริการ</span><h3>ล่าบัค</h3><p>แจ้งจุดผิดปกติพร้อมรายละเอียดและหลักฐาน</p></span><span class="feature-side">${bugStatus}<span class="chev" aria-hidden="true">›</span></span></button>
      </div>
    </section>
    <section class="more" aria-labelledby="more-heading">
      <div class="section-head"><div><h2 id="more-heading">ภารกิจเพิ่มเติม</h2><p>เลือกดูตามประเภทภารกิจ</p></div></div>
      <div class="filters" aria-label="ประเภทภารกิจ">${Object.entries(categories).map(([id,label])=>`<button type="button" class="filter" data-filter="${id}" aria-pressed="${id===state.filter}">${label}</button>`).join('')}</div>
      <div class="missions">${missions.filter(m=>state.filter==='all' || m.group===state.filter).map(rowMission).join('')}</div>
    </section>`;
}
function rewardPanel() {
  return `<section aria-labelledby="reward-heading">
    <div class="section-head"><div><span class="section-kicker">REWARD &amp; POINT</span><h2 id="reward-heading">คะแนนและของรางวัล</h2><p>ใช้แต้มแลกรางวัลได้โดยไม่กระทบคะแนนจัดอันดับ</p></div></div>
    <div class="wallet"><div class="wallet-tile"><span>แต้มที่ใช้ได้</span><strong id="wallet-balance">${state.balance} แต้ม</strong><small>ใช้แลกของรางวัล</small></div><div class="wallet-tile secondary"><span>แต้มสะสมเทอมนี้</span><strong id="wallet-season">${state.season} แต้ม</strong><small>ใช้จัดอันดับ Leaderboard</small></div></div>
    <div class="section-head"><div><h2>ของรางวัลที่แลกได้</h2><p>เลือกดูรายละเอียดและเงื่อนไขก่อนแลก</p></div></div>
    <div class="reward-grid">${rewards.map(r=>`<button type="button" class="reward-card" data-reward="${r.id}">${art(r.icon,`reward-icon ${r.color}`)}<h3>${e(r.name)}</h3><p>${e(r.sub)}</p><span class="row-right"><span class="pts">${r.cost} แต้ม</span><span class="card-link">${state.balance>=r.cost?'ดูและแลก':'ขาด '+(r.cost-state.balance)+' แต้ม'}</span></span></button>`).join('')}</div>
    <div class="history"><div class="section-head"><div><h2>ของรางวัลที่แลกไปแล้ว</h2><p>ประวัติการแลกรางวัลในต้นแบบ</p></div></div>
    ${state.redeemed.length ? `<ul class="history-list">${state.redeemed.map(h=>{const r=rewards.find(r=>r.id===h.id);return `<li>${art(r.icon,'mini '+r.color)}<span class="row-text"><strong>${e(r.name)}</strong><small>ใช้ ${r.cost} แต้ม</small></span>${badge(h.label,h.label==='ใช้แล้ว'?'no':'ok')}</li>`;}).join('')}</ul>`:'<p class="privacy-note">ยังไม่มีประวัติการแลกรางวัล</p>'}</div>
  </section>`;
}
function leaderboard() {
  const sorted = [...board,{id:me,points:state.season}].sort((a,b)=>b.points-a.points || a.id.localeCompare(b.id));
  return `<section aria-labelledby="leader-heading">
    <div class="section-head"><div><span class="section-kicker">SEMESTER MISSION</span><h2 id="leader-heading">Leaderboard</h2><p>5 อันดับคะแนนสะสมสูงสุดประจำเทอม · ข้อมูลจำลอง</p></div>${art('trophy','mini warm')}</div>
    <ol class="ranking-list">${sorted.slice(0,5).map((r,i)=>`<li class="${r.id===me?'mine':''}"><span class="rank" aria-label="อันดับ ${i+1}">${i+1}</span><span class="rank-id" aria-label="รหัสนักศึกษา 4 ตัวท้าย ${r.id}">${r.id}</span><span class="rank-prize">${e(prizes[i])}</span><strong class="rank-pts">${r.points} แต้ม</strong></li>`).join('')}</ol>
    <div class="leader-note"><p><strong>สิทธิ์พิเศษสำหรับ 5 อันดับแรก:</strong> ถ่ายรูปโปรไฟล์ร่วมกับ TU Photo Club</p><p><strong>รอบจัดอันดับ:</strong> ส.ค.–พ.ย. และ ม.ค.–พ.ค. คะแนนจะเริ่มนับใหม่เมื่อจบรอบ</p></div>
    <p class="privacy-note">แสดงเฉพาะรหัสนักศึกษา 4 ตัวท้าย ไม่แสดงชื่อหรือรหัสเต็ม</p>
  </section>`;
}
function paint() {
  ptsHeader.textContent = state.balance;
  links.forEach(link=>{
    const active = link.dataset.tab===state.tab;
    link.setAttribute('aria-selected', String(active)); link.tabIndex=active?0:-1;
  });
  panel.setAttribute('aria-labelledby',`tab-${state.tab}`);
  panel.innerHTML = ({challenge:challenges,rewards:rewardPanel,leaderboard})[state.tab]();
}
function goTab(tab, focus = false) {
  state.tab = tab; paint();
  if (focus) links.find(b=>b.dataset.tab===tab).focus({preventScroll:true});
}
links.forEach((b,i)=> {
  b.querySelector('.tab-icon').innerHTML = icon(['challenge','gift','trophy'][i]);
  b.addEventListener('keydown',event=>{
    let to = ({ArrowRight:(i+1)%3, ArrowLeft:(i+2)%3, Home:0, End:2})[event.key];
    if (to === undefined) return;
    event.preventDefault(); goTab(links[to].dataset.tab,true);
  });
});

function surveyFields(name, question, choices) {
  return `<fieldset class="g-block"><legend>${question} <span aria-hidden="true" class="error">*</span></legend>${choices.map((label,i)=>`<label><input type="radio" name="${name}" value="${i}" ${i===0?'required':''}>${e(label)}</label>`).join('')}</fieldset>`;
}
function surveyDialog() {
  if (state.survey) {
    dialogView('ภารกิจรายเดือน','ตอบแบบสอบถามแล้ว',`<p>คุณได้รับ 1 แต้มสำหรับรอบนี้แล้ว สามารถตอบอีกครั้งในรอบเดือนถัดไป</p><div class="actions"><button class="primary" type="button" data-action="close">กลับไปหน้าภารกิจ</button></div>`);
    return;
  }
  dialogView('Google Forms · แบบจำลอง','แบบสอบถาม LifeOnLine',`<form id="survey-form">
    <div class="g-intro"><h3>แบบฟอร์มสำรวจการใช้บริการหอสมุดผ่าน TULIB LifeONLine</h3><p>แบบฟอร์มตัวอย่างสำหรับทดลองหน้าจอ ไม่ได้ส่งคำตอบเข้า Google Forms หรือ Power BI จริง</p></div>
    <label class="field g-block">ฟีเจอร์ที่ต้องการประเมิน <span class="field-help">เลือกได้หนึ่งรายการเพื่อทดลอง</span><select name="feature" required><option value="">เลือกฟีเจอร์</option>${reportOptions.slice(0,-1).map(f=>`<option>${e(f)}</option>`).join('')}</select></label>
    ${surveyFields('aware','ก่อนหน้านี้คุณรู้จักฟีเจอร์นี้หรือไม่?',['รู้จัก','ไม่รู้จัก'])}
    ${surveyFields('use','คุณใช้งานฟีเจอร์นี้บ่อยแค่ไหน?',['ไม่เคยใช้','นาน ๆ ครั้ง','เดือนละหลายครั้ง','ทุกสัปดาห์หรือบ่อยกว่า'])}
    ${surveyFields('importance','ฟีเจอร์นี้สำคัญกับคุณแค่ไหน?',['1 · ไม่สำคัญ','2 · สำคัญเล็กน้อย','3 · ปานกลาง','4 · สำคัญ','5 · สำคัญมาก','ยังประเมินไม่ได้'])}
    <button class="primary" type="submit">ส่งคำตอบจำลอง · รับ 1 แต้ม</button>
  </form>`,'form-google');
}
function bugDialog() {
  const past = state.reports.length ? `<h3>รายงานที่ส่งแล้ว</h3><ul class="report-list">${state.reports.map(r=>`<li><span class="report-meta"><strong>${r.id} · ${e(r.feature)}</strong><small>${e(r.detail)}</small><small>${r.fileNames.length} ไฟล์แนบ</small></span>${r.status==='pending'?badge('รอตรวจสอบ','pending'):badge('อนุมัติ +1 แต้ม')}</li>`).join('')}</ul>`:'';
  const verify = state.reports.some(r=>r.status==='pending') ? `<button type="button" class="secondary-button" data-action="approve-bug">จำลองบรรณารักษ์อนุมัติ</button>`:'';
  dialogView('ภารกิจล่าบัค · +1 แต้มหลังอนุมัติ','รายงานบัคหรือข้อผิดพลาด',`<p>บอกว่าพบอะไรและพบที่ไหน เช่น ภาพอุปกรณ์ในเมนู LOTs ไม่ตรงกับของจริง</p>
    <form id="bug-form">
      <label class="field">เมนูหรือฟีเจอร์ที่พบปัญหา <select name="feature" required><option value="">เลือกเมนู</option>${reportOptions.map(f=>`<option>${e(f)}</option>`).join('')}</select></label>
      <label class="field">อธิบายบัคหรือข้อผิดพลาด <textarea required name="description" maxlength="1200" placeholder="สิ่งที่เห็นคืออะไร สิ่งที่ควรแสดงคืออะไร"></textarea></label>
      <label class="field">แนบหลักฐาน <small>รูปภาพหรือ PDF สูงสุด 3 ไฟล์ ไฟล์ละไม่เกิน 8 MB ไม่ต้องใส่ข้อมูลส่วนบุคคล</small><input type="file" name="evidence" accept="image/*,application/pdf,.pdf" multiple required></label>
      <div id="file-preview" class="file-preview" aria-live="polite"></div>
      <p id="bug-error" class="error" role="alert" hidden></p>
      <button class="primary" type="submit">ส่งรายงานจำลอง</button>
    </form>${past}${verify?' <div class="actions">'+verify+'</div>':''}
    <p class="privacy-note">ต้นแบบไม่อัปโหลดหลักฐาน ระบบจริงให้แต้มหลังบรรณารักษ์ตรวจและยืนยัน</p>`);
}
function bugReceipt(report) {
  dialogView('ส่งรายงานจำลองสำเร็จ', 'รอบรรณารักษ์ตรวจสอบ', `<p>รายงาน <strong>${report.id}</strong> · ${e(report.feature)}</p><div class="tagline attachment-detail">${e(report.detail)}</div><p class="attachment-detail">หลักฐาน: ${report.fileNames.map(e).join(', ')}</p><p>ระบบยังไม่เพิ่มแต้ม จนกว่ารายงานจะผ่านการตรวจสอบ</p><div class="actions"><button class="secondary-button" data-action="close" type="button">กลับไปหน้าภารกิจ</button><button class="primary" data-action="approve-bug" type="button">จำลองบรรณารักษ์อนุมัติ</button></div>`);
}
function rewardDialog(r) {
  const allowed = state.balance >= r.cost;
  dialogView('REWARD & POINT',r.name,`<div class="tagline">ใช้ ${r.cost} แต้ม · ตอนนี้คุณมี ${state.balance} แต้ม</div><ul class="dialog-list">${r.details.map(d=>`<li>${e(d)}</li>`).join('')}</ul><p>${allowed?'การแลกในต้นแบบจะหักเฉพาะแต้มที่ใช้ได้ คะแนนจัดอันดับจะไม่เปลี่ยน':'ต้องสะสมเพิ่มอีก '+(r.cost-state.balance)+' แต้มจึงจะแลกได้'}</p><div class="actions"><button type="button" class="secondary-button" data-action="close">${allowed?'ยกเลิก':'กลับไปดูรางวัล'}</button><button type="button" class="primary" data-redeem="${r.id}" ${allowed?'':'disabled'}>${allowed?'ยืนยันแลก '+r.cost+' แต้ม':'แต้มยังไม่พอ'}</button></div>`);
}
function missionDialog(id) {
  if(id==='survey') return surveyDialog();
  if(id==='bug') return bugDialog();
  if(id==='ranking') return goTab('leaderboard',true);
  const m = missions.find(m=>m.id===id);
  if(!m) return;
  const done = state.completed.has(id);
  const back = `<div class="actions"><button type="button" class="primary" data-action="close">กลับไปหน้าภารกิจ</button></div>`;
  if(id==='service') {
    return dialogView('DAILY MISSION · +1 แต้ม / ฟีเจอร์',m.name,`<p>เลือกจำลองการใช้บริการ 1 ครั้งต่อฟีเจอร์ ไม่รวม LOTs และ Live Chat</p><div class="choice-list">${features.map((f,i)=>`<button type="button" class="secondary-button" data-visit="${i}" ${state.visited.has(f)?'disabled':''}>${e(f)} ${state.visited.has(f)?' · บันทึกแล้ว':' · จำลองการใช้งาน'}</button>`).join('')}</div>`);
  }
  if(id==='allfeatures') {
    const ready=state.visited.size===features.length && !done;
    return dialogView('MONTHLY MISSION · +5 แต้ม',m.name,`<p>นับฟีเจอร์ที่เข้าร่วมครบ ${features.length} รายการ ไม่รวม LOTs และ Live Chat</p><ul class="dialog-list">${features.map(f=>`<li>${e(f)} ${state.visited.has(f)?' · ใช้แล้ว':' · ยังไม่ได้ใช้'}</li>`).join('')}</ul><p><strong>${state.visited.size} / ${features.length} ฟีเจอร์</strong></p><div class="actions"><button type="button" class="secondary-button" data-mission="service">ไปที่ภารกิจใช้ฟีเจอร์</button><button type="button" class="primary" data-claim="allfeatures" ${ready?'':'disabled'}>${done?'รับแต้มแล้ว':'รับ 5 แต้ม'}</button></div>`);
  }
  if(id==='campaign') {
    return dialogView('SPECIAL EVENTS',m.name,`<p>กิจกรรมช่วงที่มีผู้ใช้บริการน้อย คะแนนและเงื่อนไขขึ้นอยู่กับกิจกรรมแต่ละครั้ง</p><p>ต้นแบบยังไม่ได้เปิดรอบกิจกรรมนี้ จึงไม่มีคะแนนให้กดรับ</p>${back}`);
  }
  const rules = {
    checkin:'บันทึกการเช็กอิน 1 ครั้งสำหรับวันนี้',
    friends:'รับ 1 แต้มต่อคนเมื่อเพื่อนสมัครสำเร็จ ปุ่มในต้นแบบไม่ส่งคำเชิญหรือขอข้อมูลของเพื่อน',
    festival:'ตัวอย่างการรับ 5 แต้มหลังเข้าร่วมกิจกรรมเทศกาลครบเงื่อนไข',
    lottery:'ตัวอย่างสิทธิ์รับ 5 แต้มต่อครั้งเมื่อเข้าเงื่อนไข ไม่มีการออกรางวัลจริง',
    first100:'รับ 10 แต้มสำหรับผู้เข้าร่วม 100 คนแรกที่ทำภารกิจครบตามเงื่อนไข',
  };
  const btn = id==='checkin'?'เช็กอินวันนี้':id==='friends'?'จำลองเพื่อนสมัครสำเร็จ':'จำลองผ่านเงื่อนไขและรับแต้ม';
  dialogView(`${categories[m.group]} · ${m.badge}`,m.name,`<p>${e(rules[id]||m.sub)}</p>${done?`<p>${badge('รับแต้มแล้วในรอบตัวอย่าง')}</p>${back}`:`<div class="actions"><button class="primary" type="button" data-claim="${id}">${btn}</button></div>`}`);
}
function helpDialog() {
  dialogView('TULIB LifeONLine','วิธีใช้บัตรสะสมแต้ม',`<ul class="dialog-list"><li><strong>Challenge:</strong> เลือกภารกิจแล้วทำตามเงื่อนไข</li><li><strong>Reward &amp; Point:</strong> ดูแต้มที่ใช้ได้ แลกของรางวัล และดูประวัติ</li><li><strong>Leaderboard:</strong> ดู 5 อันดับสูงสุด โดยแสดงรหัสนักศึกษา 4 ตัวท้ายเท่านั้น</li></ul><p>นี่คือต้นแบบ คะแนน คำตอบ รายงาน และรายการแลกรางวัลอยู่เฉพาะรอบที่เปิดหน้านี้ รีเฟรชเพื่อเริ่มใหม่ ไม่มีการส่งข้อมูลไปยังหอสมุด</p>`);
}
function fileError(input) {
  const files = [...input.files];
  if (files.length>3) return 'แนบได้ไม่เกิน 3 ไฟล์';
  if (files.some(f=>f.size>8*1024*1024)) return 'ไฟล์แต่ละรายการต้องไม่เกิน 8 MB';
  if (files.some(f=>f.type!=='application/pdf' && !f.type.startsWith('image/'))) return 'เลือกไฟล์รูปภาพหรือ PDF เท่านั้น';
  return '';
}
document.addEventListener('change', event=>{
  const input = event.target;
  if(!input.matches('#bug-form input[type=file]')) return;
  const err = fileError(input), error = document.querySelector('#bug-error');
  input.setCustomValidity(err);
  error.textContent=err; error.hidden=!err;
  document.querySelector('#file-preview').innerHTML = err?'':Array.from(input.files,file=>`<span class="file-chip">${e(file.name)}</span>`).join('');
});
document.addEventListener('submit',event=>{
  const form = event.target;
  if(form.id==='survey-form') {
    event.preventDefault(); if(state.survey) return;
    state.survey=Object.fromEntries(new FormData(form)); earn(1);
    dialogView('Google Forms · แบบจำลอง','บันทึกคำตอบแล้ว',`<p>คุณได้รับ <strong>1 แต้ม</strong> สำหรับรอบนี้ คำตอบไม่ได้ถูกส่งออกจากต้นแบบ</p><div class="actions"><button class="primary" type="button" data-action="close">กลับไปหน้าภารกิจ</button></div>`);
    announce('ตอบแบบสอบถามสำเร็จ · +1 แต้ม');
  } else if(form.id==='bug-form') {
    event.preventDefault();
    const detail = form.elements.description.value.trim();
    const files = form.elements.evidence;
    const err = !detail?'กรุณาอธิบายสิ่งที่พบ':fileError(files);
    if(err) {
      const el=document.querySelector('#bug-error'); el.textContent=err; el.hidden=false;
      return;
    }
    const report = {id:'BUG-'+String(1+state.reports.length).padStart(3,'0'),feature:form.elements.feature.value,status:'pending',detail,fileNames:Array.from(files.files, f=>f.name)};
    state.reports.unshift(report); paint(); bugReceipt(report);
  }
});
document.addEventListener('click',event=>{
  const b=event.target.closest('button');
  if(!b || b.disabled) return;
  const {tab,tabGo,action,filter,mission,reward,redeem,claim,visit,menuService}=b.dataset;
  if(menuService){serviceDialog(menuService);return;}
  if(tab){goTab(tab);return;}
  if(tabGo){goTab(tabGo,true);return;}
  if(filter){state.filter=filter;paint();panel.querySelector(`[data-filter="${filter}"]`).focus({preventScroll:true});return;}
  if(mission){missionDialog(mission);return;}
  if(reward){rewardDialog(rewards.find(r=>r.id===reward));return;}
  if(redeem){
    const r=rewards.find(r=>r.id===redeem);
    if(!r || state.balance<r.cost) return;
    state.balance-=r.cost;
    state.redeemed.unshift({id:r.id,label:'แลกแล้ว'});
    paint();closeDialog();announce('แลก '+r.name+' สำเร็จ · ใช้ '+r.cost+' แต้ม');return;
  }
  if(visit!==undefined){
    const f=features[Number(visit)];
    if(!f || state.visited.has(f)) return;
    state.visited.add(f);earn(1);missionDialog('service');announce('บันทึกการใช้ '+f+' · +1 แต้ม');return;
  }
  if(claim){
    const m=missions.find(m=>m.id===claim);
    if(!m?.points || state.completed.has(claim) || (claim==='allfeatures' && state.visited.size<features.length)) return;
    if(claim!=='friends') state.completed.add(claim);
    earn(m.points);closeDialog();announce('ทำภารกิจสำเร็จ · +'+m.points+' แต้ม');return;
  }
  if(action==='help') helpDialog();
  if(action==='close') closeDialog();
  if(action==='approve-bug'){
    const r=state.reports.find(r=>r.status==='pending');
    if(!r) return;
    r.status='approved'; earn(1);
    dialogView('ผลตรวจจำลอง','รายงานได้รับอนุมัติ',`<p>รายงาน <strong>${r.id}</strong> ผ่านการตรวจสอบในต้นแบบ คุณได้รับ <strong>1 แต้ม</strong></p><div class="actions"><button class="primary" type="button" data-action="close">กลับไปหน้าภารกิจ</button></div>`);
    announce('รายงานได้รับอนุมัติ · +1 แต้ม');
  }
});
paint();
window.addEventListener('hashchange', showRoute);
showRoute();
