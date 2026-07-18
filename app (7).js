/* ═══════════════════════════════════════════════════
   Snackible QCom CM2 Dashboard · app.js
   ═══════════════════════════════════════════════════ */

const STORE_KEY = 'snackible_cm2_v2';

const MONTHS = [
  'April 2025','May 2025','June 2025','July 2025','August 2025','September 2025',
  'October 2025','November 2025','December 2025','January 2026','February 2026','March 2026',
  'April 2026','May 2026','June 2026','July 2026','August 2026','September 2026',
  'October 2026','November 2026','December 2026','January 2027','February 2027','March 2027',
];

const DEFAULT_CONFIG = {
  blinkit:   { commission:35, tax:5, directExp:2.90, labour:2.00, logistics:8.00 },
  zepto:     { commission:35, tax:5, directExp:2.90, labour:2.00, logistics:8.00 },
  instamart: { commission:35, tax:5, directExp:2.90, labour:2.00, logistics:8.00 },
};

const PORTAL_SKUS = {
  blinkit: [
    'Snackible Baked Pizza Sticks with Jalapeno Dip 75 g',
    'Snackible Biscuit Sticks with Chocolatey Dip 34 g',
    'Snackible Chatpata Crunch Ragi Chips 57 g',
    'Snackible Cheddar Cheese Jowar Healthy Chips 55 g',
    'Snackible Cheese Dosa Khakhra 100 g',
    'Snackible Desi Masala Ragi Chips 57 g',
    'Snackible Dipsters Piri Piri Ragi Chips with Cheesy Jalapeno Dip 60 g',
    'Snackible Dipsters Vanilla Creme Dip with Biscuit Sticks 34 g',
    'Snackible Munchies Gift Pack 420 g',
    'Snackible Nacho Cheese Jowar Puffs 35 g',
    'Snackible Peri Peri Ragi Chips 57 g',
    'Snackible Pistachio Dipsters Biscuit Sticks 44 g',
    'Snackible Salted Banana Chips 72 g',
    'Snackible Sweet Chilli Jowar Healthy Chips 55 g',
  ],
  zepto: [
    'Snackible Baked Pizza Sticks with a Cheesy Jalapeno Dip | No Maida 75.0 GRAM',
    'Snackible Biscuit Sticks | with Chocolatey Dip | Made with Jaggery 34.0 GRAM',
    'Snackible Chatpata Crispy Sweet Corn | Vacuum Fried, 70% Less Oil, No Palm Oil 45.0 GRAM',
    'Snackible Chatpata Crunch Ragi Chips- No Palm Oil 57.0 GRAM',
    'Snackible Cheese Dosa Khakhra | Millet Snack 100.0 GRAM',
    'Snackible Desi Masala Ragi Chips | High Fibre, No Palm Oil 57.0 GRAM',
    'Snackible Holi Snacks Hamper with Phool Natural Gulaal 400.0 GRAM',
    'Snackible Jalapeno Ragi Chips | with Spicy Mayo Dip | High Fibre 60.0 GRAM',
    'Snackible Kunafa Chocolate Bites 1.0 PIECE',
    'Snackible Millet Protein Bhujia | High Protein - No Palm Oil 2.0 PIECE',
    'Snackible Nacho Cheese Jowar Puffs | Millet Snack 35.0 GRAM',
    'Snackible Peanuts | Roasted - High Protein - No Palm Oil 3.0 PIECE',
    'Snackible Peri Peri Ragi Chips - High Fibre, No Palm Oil 57.0 GRAM',
    'Snackible Piri Piri Ragi Chips | with Cheesy Jalapeno Dip | High Fibre 60.0 GRAM',
    'Snackible Protein Bhujia Masala | 21% Protein Per serve 60.0 GRAM',
    'Snackible Protein Bhujia Pudina | 23% Protein Per serve 60.0 GRAM',
    'Snackible Salted Banana chips | No Palm Oil 72.0 GRAM',
    'Snackible Sriracha Quinoa Puffs | No Palm Oil, Roasted, Source of Protein 38.0 GRAM',
    'Snackible Tomato Dosa Khakra | Millet Snack 100.0 GRAM',
  ],
  instamart: [
    'Snackible Baked Pizza Sticks with Cheesy Jalapeno Dip - Baked, No Palm Oil, Source of Protein',
    'Snackible Cheddar Cheese Jowar Chips',
    'Snackible Cheese & Herb Multigrain Chips - Baked, No Palm Oil, Source of Protein',
    'Snackible Dahi Papdi Quinoa Puffs - Roasted, No Palm Oil, Made with Supergrains',
    'Snackible Desi Masala Ragi Chips - High Fibre',
    'Snackible Dipsters - Biscuit Sticks with Caramel Dip (No Refined Sugar)',
    'Snackible Dipsters - Biscuit Sticks with Chocolatey Dip (No Refined Sugar)',
    'Snackible Dipsters - Biscuit Sticks with Vanilla Dip (No Refined Sugar)',
    'Snackible Dipsters Jalapeno Ragi Chips with Spicy Mayo Dip - No Palm Oil, Made with Millets',
    'Snackible Dipsters Peri Peri Ragi Chips with Cheesy Jalapeno Dip - No Palm Oil, Made with Millets',
    'Snackible Flaming Hot Cheese Quinoa Puffs - Roasted, No Palm Oil, Made with Supergrains',
    'Snackible Garlic Bread Chickpea Popped Chips - Popped, No Palm Oil, Rich in Protein',
    'Snackible Gourmet Snacks Gift Box',
    'Snackible Healthy Snacks Diwali Hamper',
    'Snackible Hot Chocolate Mix',
    'Snackible Korean Barbeque Chickpea Popped Chips - Rich in Dietary Fibre, No Palm Oil',
    'Snackible Korean BBQ Jowar Puffs - Made with Millet, No Palm Oil',
    'Snackible Nacho Cheese Jowar Puffs - Millet Snack',
    'Snackible Peri Peri Ragi Chips',
    'Snackible Salted Banana Chips - No Palm Oil',
    'Snackible Sour Cream & Onion Multigrain Chips - Baked, No Palm Oil, Source of Protein',
    'Snackible Sriracha Quinoa Puffs - Roasted, No Palm Oil, Made with Supergrains',
    'Snackible Tangy Tomato Chickpea Puffs - High Protein',
  ],
};

const NLC_SKUS = [
  'Snackible Chatpata Masala Millet Fingers - Made With Millet, Roasted, No Palm Oil-45 g',
  'Snackible Cheese Dosa Khakra - Roasted, No Palm Oil, Source Of Protein-100 g',
  'Snackible Masala Protein Baked Bhujia - 21% Protein Per Serve-60 g',
  'Snackible Peri Peri Ragi Chips - High Fibre-55 g',
  'Snackible Pudina Protein Baked Bhujia - 23% Protein Per Serve-60 g',
];

const S = {
  config: JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
  data:   {},
  view:   'dashboard',
  portal: 'blinkit',
  month:  null,
};

function save() { localStorage.setItem(STORE_KEY, JSON.stringify({ config:S.config, data:S.data })); }
function load() {
  try {
    const r = JSON.parse(localStorage.getItem(STORE_KEY)||'{}');
    if (r.config) S.config = r.config;
    if (r.data)   S.data   = r.data;
  } catch(e) {}
}

// ── Calc ──────────────────────────────────────────────
// calcSKU: adsAlloc & visAlloc are proportionate amounts already computed by caller
function calcSKU(sku, cfg, isNLC, adsAlloc, visAlloc, promosAlloc) {
  const gmv      = +sku.gmv        || 0;
  const qty      = +sku.qty        || 0;
  const cost     = +sku.cost       || 0;
  const nlcPrice = +sku.nlc_price  || 0;

  // SKU-level overrides; if 0/blank, caller passes portal-level proportionate allocation
  const promos   = (+sku.promos    || 0) > 0 ? (+sku.promos)    : (promosAlloc || 0);
  const ads      = (+sku.ads       || 0) > 0 ? (+sku.ads)       : (adsAlloc    || 0);
  const vis      = (+sku.visibility|| 0) > 0 ? (+sku.visibility) : (visAlloc    || 0);

  const commPct = (+cfg.commission)/100;
  const taxPct  = (+cfg.tax)/100;
  const dePct   = (+cfg.directExp)/100;
  const labPct  = (+cfg.labour)/100;
  const logPct  = (+cfg.logistics)/100;

  // Waterfall
  let commission, grossSales, netSales;
  if (isNLC) {
    commission = 0;
    grossSales = nlcPrice * qty;
    netSales   = grossSales / (1 + taxPct);
  } else {
    commission = gmv * commPct;
    grossSales = gmv * (1 - commPct);          // (1 - comm%) × GMV
    netSales   = grossSales / (1 + taxPct);    // remove GST
  }

  const taxAmt     = grossSales - netSales;
  const cogs       = cost * qty;
  const directExp  = netSales * dePct;
  const grossMargin= netSales - cogs - directExp;
  const labour     = netSales * labPct;
  const logistics  = netSales * logPct;
  const cm1        = grossMargin - labour - logistics;
  const cm1Pct     = netSales > 0 ? (cm1/netSales)*100 : 0;
  const cm2        = cm1 - promos - ads - vis;
  const cm2Pct     = netSales > 0 ? (cm2/netSales)*100 : 0;
  const promosPct  = gmv > 0 ? promos/gmv*100 : 0;

  return { gmv, qty, cost, nlcPrice, commission, grossSales, taxAmt, netSales,
           cogs, directExp, grossMargin, labour, logistics,
           cm1, cm1Pct, promos, promosPct, ads, vis, cm2, cm2Pct };
}

// Pass portalTotals = {ads, vis, promos, splitBy} for portal-level allocation; pass null to skip
function totals(skus, nlcSkus, cfg, portalTotals) {
  const acc = { gmv:0,qty:0,commission:0,grossSales:0,taxAmt:0,netSales:0,
                cogs:0,directExp:0,grossMargin:0,labour:0,logistics:0,
                cm1:0,promos:0,ads:0,vis:0,cm2:0 };

  const allSkus = [...(skus||[]).map(s=>({s,n:false})), ...(nlcSkus||[]).map(s=>({s,n:true}))];
  const splitBy = portalTotals?.splitBy || 'netSales';

  // First pass: compute raw values for weight calculation
  const rawVals = allSkus.map(({s,n}) => {
    const c = calcSKU(s,cfg,n,0,0,0);
    return { netSales: c.netSales, qty: c.qty || (+s.qty||0) };
  });
  const totalWeight = splitBy === 'qty'
    ? rawVals.reduce((a,v)=>a+(v.qty||0),0)
    : rawVals.reduce((a,v)=>a+(v.netSales||0),0);

  const pAds    = portalTotals?.ads    || 0;
  const pVis    = portalTotals?.vis    || 0;
  const pPromos = portalTotals?.promos || 0;

  allSkus.forEach(({s,n},idx)=>{
    const w = splitBy === 'qty' ? (rawVals[idx].qty||0) : (rawVals[idx].netSales||0);
    const share = totalWeight > 0 ? w/totalWeight : 0;
    const adsAlloc    = (+s.ads       ||0)>0 ? 0 : pAds    * share;
    const visAlloc    = (+s.visibility||0)>0 ? 0 : pVis    * share;
    const promosAlloc = (+s.promos    ||0)>0 ? 0 : pPromos * share;
    const c = calcSKU(s, cfg, n, adsAlloc, visAlloc, promosAlloc);
    acc.gmv         += c.gmv;
    acc.qty         += c.qty;
    acc.commission  += c.commission;
    acc.grossSales  += c.grossSales;
    acc.taxAmt      += c.taxAmt;
    acc.netSales    += c.netSales;
    acc.cogs        += c.cogs;
    acc.directExp   += c.directExp;
    acc.grossMargin += c.grossMargin;
    acc.labour      += c.labour;
    acc.logistics   += c.logistics;
    acc.cm1         += c.cm1;
    acc.promos      += c.promos;
    acc.ads         += c.ads;
    acc.vis         += c.vis;
    acc.cm2         += c.cm2;
  });
  acc.cm1Pct    = acc.netSales > 0 ? acc.cm1/acc.netSales*100 : 0;
  acc.cm2Pct    = acc.netSales > 0 ? acc.cm2/acc.netSales*100 : 0;
  acc.promosPct = acc.gmv > 0 ? acc.promos/acc.gmv*100 : 0;
  return acc;
}

// ── Helpers ───────────────────────────────────────────
const fmt    = n => Math.round(n).toLocaleString('en-IN');
const fmtPct = n => (+n||0).toFixed(2)+'%';
const pBadge = p => ({'blinkit':'<span class="pbadge blinkit">🟡 Blinkit</span>','zepto':'<span class="pbadge zepto">🟠 Zepto</span>','instamart':'<span class="pbadge instamart">🔵 Instamart</span>'}[p]||'');
const pColor = p => ({'blinkit':'#FBAE25','zepto':'#E35C25','instamart':'#4C94D0'}[p]||'#02514F');
const pLabel = p => ({'blinkit':'Blinkit','zepto':'Zepto','instamart':'Instamart'}[p]||p);
const dKey   = (p,m) => p+'_'+m;
const shortN = n => n.replace(/^Snackible\s+/i,'').replace(/[\s\|]+\d+[\.\d]*\s*(g|gram|piece|ml)\b.*/i,'').trim();
const monthsFor = p => MONTHS.filter(m => S.data[dKey(p,m)]);
const pc     = v => v >= 0 ? 'pos' : 'neg';
const emptyRow = (cols,msg) => '<tr><td colspan="'+cols+'" style="text-align:center;padding:20px;color:var(--tx3)">'+msg+'</td></tr>';

function toast(msg, type) {
  let t = document.getElementById('_toast');
  if (!t){ t=document.createElement('div'); t.id='_toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent=msg; t.className='toast show'+(type==='err'?' err':'');
  clearTimeout(t._t); t._t=setTimeout(()=>{ t.className='toast'; },2800);
}

// ── Sidebar ───────────────────────────────────────────
function sidebar() {
  const nv=(v,ic,lb)=>'<div class="nav-item'+(S.view===v?' active':'')+'" onclick="go(\''+v+'\')"><span class="nav-icon">'+ic+'</span><span>'+lb+'</span></div>';
  const cp=(p,ic,lb)=>'<div class="pchip '+p+(S.portal===p?' active':'')+'" onclick="setPortal(\''+p+'\')">'+ic+' '+lb+'</div>';
  return '<div class="sidebar"><div class="logo"><div class="logo-brand">Snackible</div><div class="logo-sub">QCom CM2</div></div><div class="sec-label">Views</div>'+nv('dashboard','📊','Dashboard')+nv('entry','➕','Enter Data')+nv('combined','🔀','Combined')+nv('trends','📈','Trends')+'<div class="sec-label">Portal</div><div class="portal-chips">'+cp('blinkit','🟡','Blinkit')+cp('zepto','🟠','Zepto')+cp('instamart','🔵','Instamart')+'</div></div>';
}

// ── DASHBOARD ─────────────────────────────────────────
function viewDashboard() {
  const months = monthsFor(S.portal);
  if (!months.length) return '<div class="ph"><div><div class="ph-title">Dashboard</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div></div><div class="card empty"><div class="eicon">📂</div><p>No data for '+pLabel(S.portal)+' yet.</p><br><button class="btn btn-yellow" onclick="go(\'entry\')">+ Enter Data</button></div>';

  const sel  = (S.month && months.includes(S.month)) ? S.month : months[months.length-1];
  const e    = S.data[dKey(S.portal,sel)] || {};
  const cfg  = e.config || S.config[S.portal];
  const t    = totals(e.skus, e.nlcSkus, cfg, e.portalTotals);

  let mom=null;
  const prev=months[months.indexOf(sel)-1];
  if (prev){ const pe=S.data[dKey(S.portal,prev)]||{}; const pt=totals(pe.skus,pe.nlcSkus,pe.config||cfg); mom={gmv:pt.gmv>0?(t.gmv-pt.gmv)/pt.gmv*100:null,cm1Pct:t.cm1Pct-pt.cm1Pct,cm2Pct:t.cm2Pct-pt.cm2Pct}; }
  const delta=(v,suf)=>v==null?'':'<span style="font-size:10px;margin-left:5px;color:'+(v>=0?'var(--pos)':'var(--neg)')+';">'+(v>=0?'▲':'▼')+' '+Math.abs(v).toFixed(1)+(suf||'pp')+' MoM</span>';

  const dAllSkus=[...(e.skus||[]).map(s=>({s,n:false})),...(e.nlcSkus||[]).map(s=>({s,n:true}))];
  const dPT=e.portalTotals||{};
  const dRawNS=dAllSkus.map(({s,n})=>calcSKU(s,cfg,n,0,0,0).netSales);
  const dTotalNS=dRawNS.reduce((a,v)=>a+v,0);
  const rows=dAllSkus.map(({s:sku,n:isNLC},idx)=>{
    const share=dTotalNS>0?dRawNS[idx]/dTotalNS:0;
    const aA=(+sku.ads       ||0)>0?0:(+dPT.ads   ||0)*share;
    const vA=(+sku.visibility||0)>0?0:(+dPT.vis   ||0)*share;
    const pA=(+sku.promos    ||0)>0?0:(+dPT.promos||0)*share;
    const c=calcSKU(sku,cfg,isNLC,aA,vA,pA);
    return '<tr'+(isNLC?' style="background:#F0F7FF"':'')+'>'
      +'<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+sku.name+'">'+(isNLC?'<span class="ntag">NLC</span> ':'')+shortN(sku.name)+'</td>'
      +'<td class="r">'+(isNLC?'<span style="color:var(--tx3)">'+fmt(c.gmv)+' <small>ref</small></span>':'₹'+fmt(c.gmv))+'</td>'
      +'<td class="r">₹'+fmt(c.grossSales)+'</td>'
      +'<td class="r">₹'+fmt(c.netSales)+'</td>'
      +'<td class="r">'+fmt(c.qty)+'</td>'
      +'<td class="r">'+(isNLC?'₹'+fmt(c.nlcPrice)+'/u':'₹'+fmt(c.cost))+'</td>'
      +'<td class="r">₹'+fmt(c.cogs)+'</td>'
      +'<td class="r">₹'+fmt(c.directExp)+'</td>'
      +'<td class="r">₹'+fmt(c.grossMargin)+'</td>'
      +'<td class="r">₹'+fmt(c.labour)+'</td>'
      +'<td class="r">₹'+fmt(c.logistics)+'</td>'
      +'<td class="r">₹'+fmt(c.cm1)+'</td>'
      +'<td class="c"><span class="pill '+pc(c.cm1Pct)+'">'+fmtPct(c.cm1Pct)+'</span></td>'
      +'<td class="r">₹'+fmt(c.promos)+'</td>'
      +'<td class="r">₹'+fmt(c.ads)+'</td>'
      +'<td class="r">₹'+fmt(c.vis)+'</td>'
      +'<td class="r">₹'+fmt(c.cm2)+'</td>'
      +'<td class="c"><span class="pill '+pc(c.cm2Pct)+'">'+fmtPct(c.cm2Pct)+'</span></td>'
      +'</tr>';
  }).join('');
  const msel='<select class="msel" onchange="S.month=this.value;render()">'+months.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('')+'</select>';

  return '<div class="ph"><div><div class="ph-title">Dashboard</div><div class="ph-sub">'+pLabel(S.portal)+' · '+sel+'</div></div><div class="ph-right">'+pBadge(S.portal)+' '+msel+'<button class="btn btn-yellow" onclick="go(\'entry\')">+ New Month</button></div></div>'
  +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Total GMV</div><div class="val">₹'+fmt(t.gmv)+'</div><div class="sub">'+(mom?delta(mom.gmv,'%'):'—')+'</div><div class="abar" style="background:'+pColor(S.portal)+'"></div></div><div class="card stat"><div class="lbl">Net Sales</div><div class="val">₹'+fmt(t.netSales)+'</div><div class="sub">After '+cfg.commission+'% comm + '+cfg.tax+'% GST</div><div class="abar" style="background:var(--mint)"></div></div><div class="card stat"><div class="lbl">CM1</div><div class="val '+pc(t.cm1Pct)+'">₹'+fmt(t.cm1)+'</div><div class="sub">'+fmtPct(t.cm1Pct)+' of net '+(mom?delta(mom.cm1Pct):'')+'</div><div class="abar" style="background:var(--blue)"></div></div><div class="card stat"><div class="lbl">CM2</div><div class="val '+pc(t.cm2Pct)+'">₹'+fmt(t.cm2)+'</div><div class="sub">'+fmtPct(t.cm2Pct)+' of net '+(mom?delta(mom.cm2Pct):'')+'</div><div class="abar" style="background:'+(t.cm2Pct>=0?'var(--pos)':'var(--neg)')+'"></div></div></div>'
  +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Commission</div><div class="val warn">₹'+fmt(t.commission)+'</div><div class="sub">'+cfg.commission+'% of GMV</div></div><div class="card stat"><div class="lbl">Gross Margin</div><div class="val">₹'+fmt(t.grossMargin)+'</div><div class="sub">After COGS + Direct Exp</div></div><div class="card stat"><div class="lbl">Promos</div><div class="val warn">₹'+fmt(t.promos)+'</div><div class="sub">'+fmtPct(t.promosPct)+' of GMV</div></div><div class="card stat"><div class="lbl">Ads + Visibility</div><div class="val warn">₹'+fmt(t.ads+t.vis)+'</div><div class="sub">Marketing</div></div></div>'
  +'<div class="card tcard"><div class="thead-row"><div class="thead-title">SKU Breakdown · '+sel+'</div><button class="btn btn-outline btn-sm" onclick="S.month=\''+sel+'\';go(\'entry\')">✏️ Edit</button></div><div class="twrap"><table><thead><tr>'
  +'<th>SKU</th><th class="r">GMV</th><th class="r">Gross Sales</th><th class="r">Net Sales</th><th class="r">Qty</th><th class="r">Cost/Unit</th><th class="r">COGS</th><th class="r">Direct Exp</th><th class="r">Gross Margin</th><th class="r">Labour</th><th class="r">Logistics</th><th class="r">CM1 ₹</th><th class="c">CM1%</th><th class="r">Promos</th><th class="r">Ads</th><th class="r">Visibility</th><th class="r">CM2 ₹</th><th class="c">CM2%</th>'
  +'</tr></thead><tbody>'+(rows||emptyRow(18,'No SKUs'))
  +'<tr class="gt"><td>Grand Total</td><td class="r">₹'+fmt(t.gmv)+'</td><td class="r">₹'+fmt(t.grossSales)+'</td><td class="r">₹'+fmt(t.netSales)+'</td><td class="r">'+fmt(t.qty)+'</td><td class="r">—</td><td class="r">₹'+fmt(t.cogs)+'</td><td class="r">₹'+fmt(t.directExp)+'</td><td class="r">₹'+fmt(t.grossMargin)+'</td><td class="r">₹'+fmt(t.labour)+'</td><td class="r">₹'+fmt(t.logistics)+'</td><td class="r">₹'+fmt(t.cm1)+'</td><td class="c"><span class="pill '+pc(t.cm1Pct)+'">'+fmtPct(t.cm1Pct)+'</span></td><td class="r">₹'+fmt(t.promos)+'</td><td class="r">₹'+fmt(t.ads)+'</td><td class="r">₹'+fmt(t.vis)+'</td><td class="r">₹'+fmt(t.cm2)+'</td><td class="c"><span class="pill '+pc(t.cm2Pct)+'">'+fmtPct(t.cm2Pct)+'</span></td>'
  +'</tr></tbody></table></div></div>';
}

// ── ENTRY ─────────────────────────────────────────────
let ES = { skus:[], nlcSkus:[], month:'', portalTotals:{ads:'',vis:'',promos:''} };

function initES() {
  // If already initialized for this portal, preserve state (e.g. splitBy toggle re-render)
  if (ES.portal === S.portal && ES._initialized) return;
  ES.portal = S.portal;
  ES._initialized = true;
  if (S.month && S.data[dKey(S.portal,S.month)]) {
    const ex = S.data[dKey(S.portal,S.month)];
    ES.skus         = JSON.parse(JSON.stringify(ex.skus         ||[]));
    ES.nlcSkus      = JSON.parse(JSON.stringify(ex.nlcSkus      ||[]));
    ES.portalTotals = JSON.parse(JSON.stringify(ex.portalTotals ||{ads:'',vis:'',promos:'',splitBy:'netSales'}));
    ES.month        = S.month;
  } else {
    ES.skus=[]; ES.nlcSkus=[];
    ES.portalTotals = {ads:'',vis:'',promos:'',splitBy:'netSales'};
    ES.month = MONTHS.includes('July 2026')?'July 2026':MONTHS[MONTHS.length-1];
  }
}

const blankSku = n => ({name:n||'',gmv:'',qty:'',cost:'',promos:'',ads:'',visibility:''});
const blankNlc = n => ({name:n||'',gmv:'',qty:'',nlc_price:'',cost:'',promos:'',ads:'',visibility:''});

function viewEntry() {
  initES();
  const cfg  = S.config[S.portal];
  const isIM = S.portal==='instamart';
  const slist = PORTAL_SKUS[S.portal]||[];
  const regRows = ES.skus.map((s,i)=>regRow(s,i,cfg)).join('');
  const nlcHtml = isIM ? ES.nlcSkus.map((s,i)=>nlcRow(s,i,cfg)).join('') : '';

  const pt = ES.portalTotals;
  const cfgPart = '<div class="card mb20"><div class="fbet mb20"><div class="thead-title">Portal Settings · '+pLabel(S.portal)+'</div><span style="font-size:11px;color:var(--tx3)">All % are of net-of-tax sales</span></div>'
    +'<div class="cfg-row">'
    +'<div class="cfg-item"><label>Month</label><select id="es-month" style="width:160px" onchange="ES.month=this.value">'+MONTHS.map(m=>'<option value="'+m+'"'+(m===ES.month?' selected':'')+'>'+m+'</option>').join('')+'</select></div>'
    +'<div class="cfg-item"><label>Commission %</label><input type="number" value="'+cfg.commission+'" step="0.1" onchange="updateCfg(\'commission\',this.value)"></div>'
    +'<div class="cfg-item"><label>GST %</label><input type="number" value="'+cfg.tax+'" step="0.5" onchange="updateCfg(\'tax\',this.value)"></div>'
    +'<div class="cfg-item"><label>Direct Exp %</label><input type="number" value="'+cfg.directExp+'" step="0.01" onchange="updateCfg(\'directExp\',this.value)"></div>'
    +'<div class="cfg-item"><label>Labour %</label><input type="number" value="'+cfg.labour+'" step="0.01" onchange="updateCfg(\'labour\',this.value)"></div>'
    +'<div class="cfg-item"><label>Logistics %</label><input type="number" value="'+cfg.logistics+'" step="0.01" onchange="updateCfg(\'logistics\',this.value)"></div>'
    +'</div>'
    +'<div style="border-top:1px solid var(--border);margin:14px 0 12px"></div>'
    +'<div style="font-size:11px;font-weight:700;color:var(--green);letter-spacing:.05em;text-transform:uppercase;margin-bottom:10px">Portal-Level Spends (auto-split by net sales share · overridden if SKU-level value entered)</div>'
    +'<div class="cfg-row">'
    +'<div class="cfg-item"><label>Total Ads (₹)</label><input type="number" id="pt-ads" value="'+(pt.ads||'')+'" placeholder="0" oninput="updatePT(\'ads\',this.value)"></div>'
    +'<div class="cfg-item"><label>Total Visibility (₹)</label><input type="number" id="pt-vis" value="'+(pt.vis||'')+'" placeholder="0" oninput="updatePT(\'vis\',this.value)"></div>'
    +'<div class="cfg-item"><label>Total Promos (₹)</label><input type="number" id="pt-promos" value="'+(pt.promos||'')+'" placeholder="0" oninput="updatePT(\'promos\',this.value)"></div>'
    +'<div class="cfg-item"><label>Split Basis</label><div style="display:flex;gap:0;border:1.5px solid var(--border);border-radius:6px;overflow:hidden;width:fit-content">'
    +'<button id="split-ns" onclick="updatePT(\'splitBy\',\'netSales\')" style="padding:6px 12px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+((!pt.splitBy||pt.splitBy==='netSales')?'var(--green)':'#fff')+';color:'+((!pt.splitBy||pt.splitBy==='netSales')?'#fff':'var(--tx3)')+'">Net Sales</button>'
    +'<button id="split-qty" onclick="updatePT(\'splitBy\',\'qty\')" style="padding:6px 12px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(pt.splitBy==='qty'?'var(--green)':'#fff')+';color:'+(pt.splitBy==='qty'?'#fff':'var(--tx3)')+'">Qty Sold</button>'
    +'</div></div>'
    +'<div class="cfg-item" style="justify-content:flex-end"><label>Import from Sheet</label>'
    +'<button class="btn btn-blue btn-sm" onclick="importFromSheet()">📥 Import GMV Data</button></div>'
    +'</div></div>';

  const regTbl = '<div class="card tcard mb20">'
    +'<div class="thead-row"><div class="thead-title">Regular SKUs · '+pLabel(S.portal)+' ('+slist.length+' SKUs)</div>'
    +'<div class="flex gap8"><button class="btn btn-outline btn-sm" onclick="addReg()">+ Add Row</button>'
    +'<button class="btn btn-yellow btn-sm" onclick="prefillReg()">⚡ Prefill All '+slist.length+' SKUs</button></div></div>'
    +'<div class="twrap"><table id="reg-tbl"><thead><tr>'
    +'<th style="min-width:200px">SKU</th>'
    +'<th class="r" style="min-width:85px">GMV (₹)</th>'
    +'<th class="r" style="min-width:85px">Gross Sales</th>'
    +'<th class="r" style="min-width:85px">Net Sales</th>'
    +'<th class="r" style="min-width:50px">Qty</th>'
    +'<th class="r" style="min-width:65px">Cost/U</th>'
    +'<th class="r" style="min-width:80px">COGS</th>'
    +'<th class="r" style="min-width:75px">Dir Exp</th>'
    +'<th class="r" style="min-width:85px">Gr Margin</th>'
    +'<th class="r" style="min-width:70px">Labour</th>'
    +'<th class="r" style="min-width:75px">Logistics</th>'
    +'<th class="r" style="min-width:80px">CM1 ₹</th>'
    +'<th class="r" style="min-width:55px">CM1%</th>'
    +'<th class="r" style="min-width:80px">Promos</th>'
    +'<th class="r" style="min-width:75px">Ads</th>'
    +'<th class="r" style="min-width:80px">Visibility</th>'
    +'<th class="r" style="min-width:80px">CM2 ₹</th>'
    +'<th class="r" style="min-width:55px">CM2%</th>'
    +'<th style="min-width:24px"></th></tr></thead>'
    +'<tbody id="reg-body">'+(regRows||emptyRow(19,'Click + Add Row or Prefill All'))+'</tbody>'
    +'<tfoot id="reg-foot"></tfoot>'
    +'</table></div></div>';

  const nlcTbl = !isIM ? '' :
    '<div class="card tcard mb20 nlc-section">'
    +'<div class="thead-row"><div class="thead-title">NLC Products <span class="ntag">Instamart only</span></div>'
    +'<div class="flex gap8"><button class="btn btn-outline btn-sm" onclick="addNlc()">+ Add Row</button>'
    +'<button class="btn btn-blue btn-sm" onclick="prefillNlc()">⚡ Prefill All '+NLC_SKUS.length+' NLC SKUs</button></div></div>'
    +'<p style="padding:2px 18px 12px;font-size:11px;color:var(--tx3)">GMV = reference only. <strong>Gross Sales = NLC Price × Qty</strong>. No commission deducted.</p>'
    +'<div class="twrap"><table id="nlc-tbl"><thead><tr>'
    +'<th style="min-width:230px">SKU</th>'
    +'<th class="r" style="min-width:100px">GMV (₹) <small>ref</small></th>'
    +'<th class="r" style="min-width:70px">Qty</th>'
    +'<th class="r" style="min-width:105px">NLC Price/Unit</th>'
    +'<th class="r" style="min-width:85px">Cost/Unit</th>'
    +'<th class="r" style="min-width:95px">Promos (₹)</th>'
    +'<th class="r" style="min-width:85px">Ads (₹)</th>'
    +'<th class="r" style="min-width:95px">Visibility (₹)</th>'
    +'<th class="r" style="min-width:95px">Net Sales</th>'
    +'<th class="r" style="min-width:65px">CM1%</th>'
    +'<th class="r" style="min-width:65px">CM2%</th>'
    +'<th style="min-width:28px"></th></tr></thead>'
    +'<tbody id="nlc-body">'+(nlcHtml||emptyRow(12,'Click + Add Row or Prefill All NLC SKUs'))+'</tbody></table></div></div>';

  const actions = '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:4px">'
    +'<button class="btn btn-outline" onclick="go(\'dashboard\')">Cancel</button>'
    +'<button class="btn btn-primary" onclick="saveEntry()">💾 Save Month Data</button></div>';

  return '<div class="ph"><div><div class="ph-title">Enter Data</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div><div class="ph-right">'+pBadge(S.portal)+'</div></div>'
    +cfgPart+regTbl+nlcTbl+actions;
}

function regRow(sku,i,cfg){
  const pt=ES.portalTotals;
  const splitBy = pt.splitBy || 'netSales';
  const allRaw=ES.skus.map(s=>calcSKU(s,cfg,false,0,0,0));
  const totalWeight = splitBy==='qty'
    ? allRaw.reduce((a,c)=>a+(c.qty||0),0)
    : allRaw.reduce((a,c)=>a+(c.netSales||0),0);
  const myWeight = splitBy==='qty' ? (allRaw[i]?.qty||0) : (allRaw[i]?.netSales||0);
  const share = totalWeight>0 ? myWeight/totalWeight : 0;
  const adsAlloc   =(+sku.ads       ||0)>0?0:(+pt.ads   ||0)*share;
  const visAlloc   =(+sku.visibility||0)>0?0:(+pt.vis   ||0)*share;
  const proAlloc   =(+sku.promos    ||0)>0?0:(+pt.promos||0)*share;
  const c=calcSKU(sku,cfg,false,adsAlloc,visAlloc,proAlloc);
  const opts=['<option value="">-- Select SKU --</option>',...(PORTAL_SKUS[S.portal]||[]).map(n=>'<option value="'+n+'"'+(n===sku.name?' selected':'')+'>'+n+'</option>')].join('');
  return '<tr class="erow" data-ri="'+i+'">'
    +'<td><select style="width:220px" onchange="updateReg('+i+',\'name\',this.value)">'+opts+'</select></td>'
    +'<td><input type="number" value="'+(sku.gmv||'')+'" placeholder="0" oninput="updateReg('+i+',\'gmv\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.grossSales>0?'₹'+fmt(c.grossSales):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.netSales):'—')+'" readonly></td>'
    +'<td><input type="number" value="'+(sku.qty||'')+'" placeholder="0" oninput="updateReg('+i+',\'qty\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.cost||'')+'" placeholder="0.00" step="0.01" oninput="updateReg('+i+',\'cost\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.cogs>0?'₹'+fmt(c.cogs):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.directExp>0?'₹'+fmt(c.directExp):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.grossMargin):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.labour):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.logistics):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm1):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm1Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm1Pct):'—')+'" readonly></td>'
    +'<td><input type="number" value="'+(sku.promos||'')+'" placeholder="'+(proAlloc>0?fmt(proAlloc):'0')+'" oninput="updateReg('+i+',\'promos\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.ads||'')+'" placeholder="'+(adsAlloc>0?fmt(adsAlloc):'0')+'" oninput="updateReg('+i+',\'ads\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.visibility||'')+'" placeholder="'+(visAlloc>0?fmt(visAlloc):'0')+'" oninput="updateReg('+i+',\'visibility\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm2):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm2Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm2Pct):'—')+'" readonly></td>'
    +'<td><button class="delbtn" onclick="delReg('+i+')">✕</button></td></tr>';
}

function nlcRow(sku,i,cfg){
  const c=calcSKU(sku,cfg,true);
  const opts=['<option value="">-- Select NLC SKU --</option>',...NLC_SKUS.map(n=>'<option value="'+n+'"'+(n===sku.name?' selected':'')+'>'+n+'</option>')].join('');
  return '<tr class="erow" data-ni="'+i+'" style="background:#F5F9FF"><td><select style="width:230px" onchange="updateNlc('+i+',\'name\',this.value)">'+opts+'</select></td>'
    +'<td><input type="number" value="'+(sku.gmv||'')+'" placeholder="ref only" oninput="updateNlc('+i+',\'gmv\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.qty||'')+'" placeholder="0" oninput="updateNlc('+i+',\'qty\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.nlc_price||'')+'" placeholder="NLC price" step="0.01" oninput="updateNlc('+i+',\'nlc_price\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.cost||'')+'" placeholder="0.00" step="0.01" oninput="updateNlc('+i+',\'cost\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.promos||'')+'" placeholder="0" oninput="updateNlc('+i+',\'promos\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.ads||'')+'" placeholder="0" oninput="updateNlc('+i+',\'ads\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.visibility||'')+'" placeholder="0" oninput="updateNlc('+i+',\'visibility\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="₹'+fmt(c.netOfTax)+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm1Pct)+'" type="text" value="'+fmtPct(c.cm1Pct)+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm2Pct)+'" type="text" value="'+fmtPct(c.cm2Pct)+'" readonly></td>'
    +'<td><button class="delbtn" onclick="delNlc('+i+')">✕</button></td></tr>';
}

function refreshReg(){ const b=document.getElementById('reg-body'); if(!b)return; const cfg=S.config[S.portal]; b.innerHTML=ES.skus.length?ES.skus.map((s,i)=>regRow(s,i,cfg)).join(''):emptyRow(19,'Click + Add Row'); refreshRegFoot(); }

function refreshRegFoot(){
  const foot=document.getElementById('reg-foot'); if(!foot)return;
  const cfg=S.config[S.portal];
  const pt=ES.portalTotals;
  const t=totals(ES.skus,[],cfg,pt);
  if(!t||t.gmv===0){foot.innerHTML='';return;}
  foot.innerHTML='<tr class="gt">'
    +'<td>Grand Total</td>'
    +'<td class="r">₹'+fmt(t.gmv)+'</td>'
    +'<td class="r">₹'+fmt(t.grossSales)+'</td>'
    +'<td class="r">₹'+fmt(t.netSales)+'</td>'
    +'<td class="r">'+fmt(t.qty)+'</td>'
    +'<td class="r">—</td>'
    +'<td class="r">₹'+fmt(t.cogs)+'</td>'
    +'<td class="r">₹'+fmt(t.directExp)+'</td>'
    +'<td class="r">₹'+fmt(t.grossMargin)+'</td>'
    +'<td class="r">₹'+fmt(t.labour)+'</td>'
    +'<td class="r">₹'+fmt(t.logistics)+'</td>'
    +'<td class="r">₹'+fmt(t.cm1)+'</td>'
    +'<td class="r"><span class="pill '+pc(t.cm1Pct)+'">'+fmtPct(t.cm1Pct)+'</span></td>'
    +'<td class="r">₹'+fmt(t.promos)+'</td>'
    +'<td class="r">₹'+fmt(t.ads)+'</td>'
    +'<td class="r">₹'+fmt(t.vis)+'</td>'
    +'<td class="r">₹'+fmt(t.cm2)+'</td>'
    +'<td class="r"><span class="pill '+pc(t.cm2Pct)+'">'+fmtPct(t.cm2Pct)+'</span></td>'
    +'<td></td></tr>';
}
function refreshNlc(){ const b=document.getElementById('nlc-body'); if(!b)return; const cfg=S.config[S.portal]; b.innerHTML=ES.nlcSkus.length?ES.nlcSkus.map((s,i)=>nlcRow(s,i,cfg)).join(''):emptyRow(12,'Click + Add Row'); }

function updateReg(i,f,v){ ES.skus[i][f]=v; _refreshRegRow(i); }
function updateNlc(i,f,v){ ES.nlcSkus[i][f]=v; _refreshNlcRow(i); }

function _refreshRegRow(i){
  const pt=ES.portalTotals;
  const splitBy=pt.splitBy||'netSales';
  const allRaw=ES.skus.map(s=>calcSKU(s,S.config[S.portal],false,0,0,0));
  const totalWeight=splitBy==='qty'?allRaw.reduce((a,c)=>a+(c.qty||0),0):allRaw.reduce((a,c)=>a+(c.netSales||0),0);
  const myWeight=splitBy==='qty'?(allRaw[i]?.qty||0):(allRaw[i]?.netSales||0);
  const share=totalWeight>0?myWeight/totalWeight:0;
  const sku=ES.skus[i];
  const adsAlloc   =(+sku.ads       ||0)>0?0:(+pt.ads   ||0)*share;
  const visAlloc   =(+sku.visibility||0)>0?0:(+pt.vis   ||0)*share;
  const proAlloc   =(+sku.promos    ||0)>0?0:(+pt.promos||0)*share;
  const c=calcSKU(sku,S.config[S.portal],false,adsAlloc,visAlloc,proAlloc);
  const row=document.querySelector('[data-ri="'+i+'"]'); if(!row)return;
  const ros=row.querySelectorAll('input.ro');
  // order: grossSales, netSales, cogs, directExp, grossMargin, labour, logistics, cm1₹, cm1%, cm2₹, cm2%
  const f=v=>v>0?'₹'+fmt(v):'—';
  if(ros[0])ros[0].value=f(c.grossSales);
  if(ros[1])ros[1].value=f(c.netSales);
  if(ros[2])ros[2].value=f(c.cogs);
  if(ros[3])ros[3].value=f(c.directExp);
  if(ros[4])ros[4].value=f(c.grossMargin);
  if(ros[5])ros[5].value=f(c.labour);
  if(ros[6])ros[6].value=f(c.logistics);
  if(ros[7])ros[7].value=f(c.cm1);
  if(ros[8]){ros[8].value=c.netSales>0?fmtPct(c.cm1Pct):'—';ros[8].className='ro '+pc(c.cm1Pct);}
  if(ros[9])ros[9].value=f(c.cm2);
  if(ros[10]){ros[10].value=c.netSales>0?fmtPct(c.cm2Pct):'—';ros[10].className='ro '+pc(c.cm2Pct);}
}
function _refreshNlcRow(i){
  const c=calcSKU(ES.nlcSkus[i],S.config[S.portal],true);
  const row=document.querySelector('[data-ni="'+i+'"]'); if(!row)return;
  const ros=row.querySelectorAll('input.ro');
  if(ros[0])ros[0].value='₹'+fmt(c.netOfTax);
  if(ros[1]){ros[1].value=fmtPct(c.cm1Pct);ros[1].className='ro '+pc(c.cm1Pct);}
  if(ros[2]){ros[2].value=fmtPct(c.cm2Pct);ros[2].className='ro '+pc(c.cm2Pct);}
}

function updateCfg(f,v){ S.config[S.portal][f]=parseFloat(v)||0; refreshReg(); refreshNlc(); }
function updatePT(f,v){ 
  ES.portalTotals[f] = f==='splitBy' ? v : (parseFloat(v)||0); 
  if(f==='splitBy'){ render(); return; }
  refreshReg(); refreshRegFoot(); 
}
function addReg()    { ES.skus.push(blankSku());    refreshReg(); }
function addNlc()    { ES.nlcSkus.push(blankNlc()); refreshNlc(); }
function delReg(i)   { ES.skus.splice(i,1);    refreshReg(); }
function delNlc(i)   { ES.nlcSkus.splice(i,1); refreshNlc(); }
function prefillReg(){ const ex=new Set(ES.skus.map(s=>s.name)); (PORTAL_SKUS[S.portal]||[]).forEach(n=>{ if(!ex.has(n))ES.skus.push(blankSku(n)); }); refreshReg(); }
function prefillNlc(){ const ex=new Set(ES.nlcSkus.map(s=>s.name)); NLC_SKUS.forEach(n=>{ if(!ex.has(n))ES.nlcSkus.push(blankNlc(n)); }); refreshNlc(); }

const SHEET_IMPORT_URL = 'https://script.google.com/macros/s/AKfycbwV_GI9RkBiQXIRNJ3H3ESu_fx7pQj4lQmHLxEsX454Xbr2sLwgpTiBgKWbrifG_6sR/exec';

async function importFromSheet() {
  const month = document.getElementById('es-month')?.value || ES.month;
  if (!SHEET_IMPORT_URL) { toast('Set SHEET_IMPORT_URL in app.js first','err'); return; }
  if (!month) { toast('Select a month first','err'); return; }
  const portalMap = { blinkit:'Blinkit', zepto:'Zepto', instamart:'Instamart' };
  const portalLabel = portalMap[S.portal] || S.portal;
  try {
    toast('Importing…');
    const url = SHEET_IMPORT_URL + '?month=' + encodeURIComponent(month) + '&portal=' + encodeURIComponent(portalLabel);
    const res = await fetch(url);
    const rows = await res.json(); // [{name, gmv, qty, cost}]
    if (!rows || !rows.length) { toast('No data found for '+portalLabel+' · '+month,'err'); return; }
    rows.forEach(r => {
      const existing = ES.skus.find(s => s.name === r.name);
      if (existing) {
        existing.gmv        = r.gmv        || existing.gmv;
        existing.qty        = r.qty        || existing.qty;
        existing.cost       = r.cost       || existing.cost;
        if (r.promos)    existing.promos    = r.promos;
        if (r.ads)       existing.ads       = r.ads;
        if (r.visibility)existing.visibility= r.visibility;
      } else {
        ES.skus.push({
          name: r.name, gmv: r.gmv||'', qty: r.qty||'', cost: r.cost||'',
          promos: r.promos||'', ads: r.ads||'', visibility: r.visibility||''
        });
      }
    });
    refreshReg();
    refreshRegFoot();
    toast('✅ Imported '+rows.length+' SKUs from sheet');
  } catch(e) {
    toast('Import failed: '+e.message,'err');
  }
}

function saveEntry(){
  const month=document.getElementById('es-month')?.value||ES.month;
  if(!month){toast('Select a month','err');return;}
  const vs=ES.skus.filter(s=>s.name&&+s.gmv>0);
  const vn=ES.nlcSkus.filter(s=>s.name&&(+s.qty>0||+s.nlc_price>0));
  if(!vs.length&&!vn.length){toast('Enter at least one SKU with data','err');return;}
  S.data[dKey(S.portal,month)]={skus:vs,nlcSkus:vn,portalTotals:JSON.parse(JSON.stringify(ES.portalTotals)),config:JSON.parse(JSON.stringify(S.config[S.portal])),saved:new Date().toISOString()};
  save(); S.month=month; toast('✅ '+pLabel(S.portal)+' · '+month+' saved'); go('dashboard');
}

// ── COMBINED ──────────────────────────────────────────
function viewCombined(){
  const allM=[...new Set(['blinkit','zepto','instamart'].flatMap(p=>monthsFor(p)))].sort((a,b)=>MONTHS.indexOf(a)-MONTHS.indexOf(b));
  if(!allM.length)return '<div class="ph"><div><div class="ph-title">Combined View</div></div></div><div class="card empty"><div class="eicon">🔀</div><p>No data yet.</p></div>';
  const sel=(S.month&&allM.includes(S.month))?S.month:allM[allM.length-1];
  const portals=['blinkit','zepto','instamart'];
  const tMap={};
  portals.forEach(p=>{ const e=S.data[dKey(p,sel)]; if(e)tMap[p]=totals(e.skus,e.nlcSkus,e.config||S.config[p],e.portalTotals); });
  const comb={gmv:0,netSales:0,cm1:0,cm2:0,promos:0,ads:0,vis:0};
  Object.values(tMap).forEach(t=>{comb.gmv+=t.gmv;comb.netSales+=t.netSales;comb.cm1+=t.cm1;comb.cm2+=t.cm2;comb.promos+=t.promos;comb.ads+=t.ads;comb.vis+=t.vis;});
  const cCM1=comb.netSales>0?comb.cm1/comb.netSales*100:0;
  const cCM2=comb.netSales>0?comb.cm2/comb.netSales*100:0;
  const pCards=portals.map(p=>{const t=tMap[p];return t?'<div class="card stat"><div class="lbl">'+pLabel(p)+'</div><div class="val" style="color:'+pColor(p)+';font-size:18px">₹'+fmt(t.gmv)+'</div><div class="sub">CM1 '+fmtPct(t.cm1Pct)+' · CM2 <span style="color:'+(t.cm2Pct>=0?'var(--pos)':'var(--neg)')+'">'+fmtPct(t.cm2Pct)+'</span></div><div class="abar" style="background:'+pColor(p)+'"></div></div>':'<div class="card stat"><div class="lbl">'+pLabel(p)+'</div><div class="val" style="font-size:15px;color:var(--tx3)">No data</div><div class="sub"><button class="btn btn-outline btn-sm" onclick="setPortal(\''+p+'\');go(\'entry\')">+ Enter</button></div></div>';}).join('');
  const cmpRows=portals.map(p=>{const t=tMap[p];return t?'<tr><td>'+pBadge(p)+'</td><td class="r">₹'+fmt(t.gmv)+'</td><td class="r">₹'+fmt(t.netSales)+'</td><td class="r">₹'+fmt(t.grossMargin)+'</td><td class="r">₹'+fmt(t.cm1)+' <span class="pill '+pc(t.cm1Pct)+'" style="font-size:10px">'+fmtPct(t.cm1Pct)+'</span></td><td class="r">₹'+fmt(t.promos+t.ads+t.vis)+'</td><td class="r">₹'+fmt(t.cm2)+' <span class="pill '+pc(t.cm2Pct)+'" style="font-size:10px">'+fmtPct(t.cm2Pct)+'</span></td></tr>':'<tr><td>'+pBadge(p)+'</td><td colspan="6" style="color:var(--tx3)">No data for '+sel+'</td></tr>';}).join('');
  const msel='<select class="msel" onchange="S.month=this.value;render()">'+allM.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('')+'</select>';
  return '<div class="ph"><div><div class="ph-title">Combined View</div><div class="ph-sub">All Portals · '+sel+'</div></div><div class="ph-right"><span class="pbadge combined">🔀 All Portals</span> '+msel+'</div></div>'
    +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Total GMV</div><div class="val pos">₹'+fmt(comb.gmv)+'</div></div><div class="card stat"><div class="lbl">Net Sales</div><div class="val">₹'+fmt(comb.netSales)+'</div></div><div class="card stat"><div class="lbl">CM1</div><div class="val '+pc(cCM1)+'">₹'+fmt(comb.cm1)+'</div><div class="sub">'+fmtPct(cCM1)+'</div></div><div class="card stat"><div class="lbl">CM2</div><div class="val '+pc(cCM2)+'">₹'+fmt(comb.cm2)+'</div><div class="sub">'+fmtPct(cCM2)+'</div></div></div>'
    +'<div class="g3 mb20">'+pCards+'</div>'
    +'<div class="card tcard"><div class="thead-row"><div class="thead-title">Portal Comparison · '+sel+'</div></div><div class="twrap"><table><thead><tr><th>Portal</th><th class="r">GMV</th><th class="r">Net Sales</th><th class="r">Gross Margin</th><th class="r">CM1</th><th class="r">Mktg Spend</th><th class="r">CM2</th></tr></thead><tbody>'+cmpRows+'<tr class="gt"><td>Combined</td><td class="r">₹'+fmt(comb.gmv)+'</td><td class="r">₹'+fmt(comb.netSales)+'</td><td class="r">—</td><td class="r">₹'+fmt(comb.cm1)+' <span class="pill '+pc(cCM1)+'" style="font-size:10px">'+fmtPct(cCM1)+'</span></td><td class="r">₹'+fmt(comb.promos+comb.ads+comb.vis)+'</td><td class="r">₹'+fmt(comb.cm2)+' <span class="pill '+pc(cCM2)+'" style="font-size:10px">'+fmtPct(cCM2)+'</span></td></tr></tbody></table></div></div>';
}

// ── TRENDS ────────────────────────────────────────────
function viewTrends(){
  const months=monthsFor(S.portal);
  if(months.length<2)return '<div class="ph"><div><div class="ph-title">Trends</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div></div><div class="card empty"><div class="eicon">📈</div><p>Need at least 2 months of '+pLabel(S.portal)+' data.</p><br><button class="btn btn-yellow" onclick="go(\'entry\')">+ Enter Data</button></div>';
  const gmvS=[],cm1S=[],cm2S=[];
  months.forEach(m=>{ const e=S.data[dKey(S.portal,m)]||{}; const t=totals(e.skus,e.nlcSkus,e.config||S.config[S.portal],e.portalTotals); gmvS.push(Math.round(t.gmv)); cm1S.push(+t.cm1Pct.toFixed(2)); cm2S.push(+t.cm2Pct.toFixed(2)); });
  const chips=months.map(m=>'<span class="mchip'+(m===months[months.length-1]?' active':'')+'" onclick="S.month=\''+m+'\';render()">'+m+'<span class="cdel" onclick="event.stopPropagation();delMonth(\''+S.portal+'\',\''+m+'\')">✕</span></span>').join('');
  const latest=months[months.length-1];
  const le=S.data[dKey(S.portal,latest)]||{};
  const lcfg=le.config||S.config[S.portal];
  const lpt=le.portalTotals||{};
  const lAllSkus=[...(le.skus||[]).map(s=>({s,n:false})),...(le.nlcSkus||[]).map(s=>({s,n:true}))];
  const lRawNS=lAllSkus.map(({s,n})=>calcSKU(s,lcfg,n,0,0,0).netSales);
  const lTotalNS=lRawNS.reduce((a,v)=>a+v,0);
  const skuRows=lAllSkus.map(({s,n},idx)=>{
    const share=lTotalNS>0?lRawNS[idx]/lTotalNS:0;
    const aA=(+s.ads       ||0)>0?0:(+lpt.ads   ||0)*share;
    const vA=(+s.visibility||0)>0?0:(+lpt.vis   ||0)*share;
    const pA=(+s.promos    ||0)>0?0:(+lpt.promos||0)*share;
    const c=calcSKU(s,lcfg,n,aA,vA,pA);
    return '<tr'+(n?' style="background:#F0F7FF"':'')+'><td style="max-width:180px;overflow:hidden;text-overflow:ellipsis">'+(n?'<span class="ntag">NLC</span> ':'')+shortN(s.name)+'</td><td class="r">₹'+fmt(c.gmv)+'</td><td class="c"><span class="pill '+pc(c.cm1Pct)+'">'+fmtPct(c.cm1Pct)+'</span></td><td class="c"><span class="pill '+pc(c.cm2Pct)+'">'+fmtPct(c.cm2Pct)+'</span></td><td class="r">₹'+fmt(c.promos)+'</td><td class="r">₹'+fmt(c.ads)+'</td></tr>';
  }).join('');

  return '<div class="ph"><div><div class="ph-title">Trends</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div><div class="ph-right">'+pBadge(S.portal)+'</div></div>'
    +'<div class="mchips">'+chips+'</div>'
    +'<div class="g2 mb20">'
    +'<div class="card"><div class="thead-title" style="margin-bottom:14px">GMV Trend</div><canvas id="c-gmv" height="170"></canvas></div>'
    +'<div class="card"><div class="thead-title" style="margin-bottom:14px">CM1% vs CM2%</div><canvas id="c-marg" height="170"></canvas>'
    +'<div style="display:flex;gap:16px;margin-top:10px"><span style="font-size:11px;color:var(--tx3)"><span style="display:inline-block;width:10px;height:10px;background:var(--blue);border-radius:50%;margin-right:4px"></span>CM1%</span><span style="font-size:11px;color:var(--tx3)"><span style="display:inline-block;width:10px;height:10px;background:var(--pos);border-radius:50%;margin-right:4px"></span>CM2%</span></div></div>'
    +'</div>'
    +'<div class="card tcard"><div class="thead-row"><div class="thead-title">Latest Month SKUs · '+latest+'</div></div><div class="twrap"><table><thead><tr><th>SKU</th><th class="r">GMV</th><th class="c">CM1%</th><th class="c">CM2%</th><th class="r">Promos</th><th class="r">Ads</th></tr></thead><tbody>'+(skuRows||emptyRow(6,'No data'))+'</tbody></table></div></div>'
    +'<script>(function(){'
    +'var labels='+JSON.stringify(months.map(m=>m.replace(' 20',"'")))+';\n'
    +'var gmv='+JSON.stringify(gmvS)+';\n'
    +'var cm1='+JSON.stringify(cm1S)+';\n'
    +'var cm2='+JSON.stringify(cm2S)+';\n'
    +'var pc="'+pColor(S.portal)+'";\n'
    +'function bar(id,labs,data,col){'
    +'var cv=document.getElementById(id);if(!cv)return;'
    +'var W=cv.offsetWidth||400;cv.width=W;cv.height=170;'
    +'var ctx=cv.getContext("2d");'
    +'var p={t:10,r:10,b:28,l:58};'
    +'var cw=W-p.l-p.r,ch=170-p.t-p.b;'
    +'var max=Math.max.apply(null,data.map(Math.abs).concat([1]));'
    +'var bw=Math.max(8,(cw/data.length)-6);'
    +'ctx.clearRect(0,0,W,170);'
    +'for(var i=0;i<=4;i++){'
    +'var y=p.t+ch-(i/4)*ch;'
    +'ctx.strokeStyle="#E8EEEE";ctx.lineWidth=1;'
    +'ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(p.l+cw,y);ctx.stroke();'
    +'var v=max*(i/4);ctx.fillStyle="#8AA5A5";ctx.font="9px Poppins";ctx.textAlign="right";'
    +'ctx.fillText(v>=1e6?(v/1e6).toFixed(1)+"M":v>=1e3?(v/1e3).toFixed(0)+"K":v.toFixed(0),p.l-4,y+3);}'
    +'data.forEach(function(v,i){'
    +'var x=p.l+i*(cw/data.length)+(cw/data.length-bw)/2;'
    +'var bh=(Math.abs(v)/max)*ch;var y=p.t+ch-bh;'
    +'ctx.fillStyle=col;ctx.fillRect(x,y,bw,bh);'
    +'ctx.fillStyle="#0D1C1C";ctx.font="9px Poppins";ctx.textAlign="center";'
    +'ctx.fillText(labs[i],x+bw/2,p.t+ch+16);});}'
    +'function lin(id,labs,ds){'
    +'var cv=document.getElementById(id);if(!cv)return;'
    +'var W=cv.offsetWidth||400;cv.width=W;cv.height=170;'
    +'var ctx=cv.getContext("2d");'
    +'var p={t:10,r:10,b:28,l:44};'
    +'var cw=W-p.l-p.r,ch=170-p.t-p.b,n=labs.length;'
    +'var all=ds.reduce(function(a,d){return a.concat(d.data);},[]);'
    +'var minV=Math.min.apply(null,all.concat([0])),maxV=Math.max.apply(null,all.concat([0]));'
    +'var rng=maxV-minV||1;'
    +'var fy=function(v){return p.t+ch-((v-minV)/rng)*ch;};'
    +'ctx.clearRect(0,0,W,170);'
    +'ctx.strokeStyle="#E8EEEE";ctx.lineWidth=1;'
    +'ctx.beginPath();ctx.moveTo(p.l,fy(0));ctx.lineTo(p.l+cw,fy(0));ctx.stroke();'
    +'for(var i=0;i<=4;i++){'
    +'var v=minV+(rng*(i/4));var y=fy(v);'
    +'ctx.strokeStyle="#F0F5F5";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(p.l+cw,y);ctx.stroke();'
    +'ctx.fillStyle="#8AA5A5";ctx.font="9px Poppins";ctx.textAlign="right";ctx.fillText(v.toFixed(1)+"%",p.l-3,y+3);}'
    +'ds.forEach(function(d){'
    +'var pts=d.data.map(function(v,i){return{x:p.l+(n<=1?cw/2:i/(n-1)*cw),y:fy(v)};});'
    +'ctx.strokeStyle=d.color;ctx.lineWidth=2.5;ctx.lineJoin="round";'
    +'ctx.beginPath();pts.forEach(function(pt,i){i?ctx.lineTo(pt.x,pt.y):ctx.moveTo(pt.x,pt.y);});ctx.stroke();'
    +'pts.forEach(function(pt){ctx.fillStyle=d.color;ctx.beginPath();ctx.arc(pt.x,pt.y,4,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(pt.x,pt.y,2,0,Math.PI*2);ctx.fill();});});'
    +'labs.forEach(function(l,i){var x=p.l+(n<=1?cw/2:i/(n-1)*cw);ctx.fillStyle="#0D1C1C";ctx.font="9px Poppins";ctx.textAlign="center";ctx.fillText(l,x,p.t+ch+16);});}'
    +'setTimeout(function(){'
    +'bar("c-gmv",labels,gmv,pc);'
    +'lin("c-marg",labels,[{data:cm1,color:"#4C94D0"},{data:cm2,color:"#02514F"}]);'
    +'},60);})();<\/script>';
}

// ── Nav ───────────────────────────────────────────────
function go(v)        { S.view=v; ES._initialized=false; render(); }
function setPortal(p) { S.portal=p; S.month=null; ES._initialized=false; render(); }
function delMonth(p,m){ if(!confirm('Delete '+pLabel(p)+' · '+m+'?'))return; delete S.data[dKey(p,m)]; save(); S.month=null; toast('Deleted '+m); render(); }

// ── Render ────────────────────────────────────────────
function render(){
  let body='';
  if(S.view==='dashboard') body=viewDashboard();
  else if(S.view==='entry')     body=viewEntry();
  else if(S.view==='combined')  body=viewCombined();
  else if(S.view==='trends')    body=viewTrends();
  document.getElementById('app').innerHTML='<div class="shell">'+sidebar()+'<main class="main">'+body+'</main></div>';
  document.querySelectorAll('main script').forEach(function(s){var el=document.createElement('script');el.textContent=s.textContent;document.body.appendChild(el);});
}

load();
render();
