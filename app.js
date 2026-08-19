/* ═══════════════════════════════════════════════════
   Snackible QCom CM2 Dashboard · app.js
   ═══════════════════════════════════════════════════ */

const STORE_KEY = 'snackible_cm2_v2';
const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

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
  dashSplit: 'netSales',
  combineMode: 'single', // 'single' | 'range'
  combineFrom: null,
  combineTo:   null,
};

async function save(explicitKey) {
  // Save config + current portal-month entry as separate keys to avoid 50KB limit
  try {
    const portal = S.portal;
    const key    = explicitKey || dKey(portal, S.month);
    const entry  = S.data[key];
    if (!key || !entry) return;
    // Save this portal-month entry
    await fetch(SHEET_IMPORT_URL + '?action=saveChunk&chunkKey=' + encodeURIComponent('cm2_chunk_' + key) + '&payload=' + encodeURIComponent(JSON.stringify(entry)), { cache: 'no-store' });
    // Save config separately
    await fetch(SHEET_IMPORT_URL + '?action=saveChunk&chunkKey=cm2_config&payload=' + encodeURIComponent(JSON.stringify(S.config)), { cache: 'no-store' });
  } catch(e) { console.warn('save failed', e); }
}

async function load() {
  try {
    // Load all keys from server
    const res  = await fetch(SHEET_IMPORT_URL + '?action=loadAllChunks', { cache: 'no-store' });
    const r    = await res.json();
    if (r.config) S.config = r.config;
    if (r.data)   S.data   = r.data;
  } catch(e) {
    try {
      const r = JSON.parse(localStorage.getItem(STORE_KEY)||'{}');
      if (r.config) S.config = r.config;
      if (r.data)   S.data   = r.data;
    } catch(e2) {}
  }
}

// ── Calc ──────────────────────────────────────────────
// number 0 or blank/null/undefined → use portal allocation
// string (typed by user, including '0') → use that value explicitly
const blankOrUndef = v => v===''||v===null||v===undefined||v===0||v===0.0;
const skuOverride  = (skuVal, alloc) => blankOrUndef(skuVal) ? (alloc||0) : (+skuVal||0);
function calcSKU(sku, cfg, isNLC, adsAlloc, visAlloc, promosAlloc) {
  const gmv      = +sku.gmv        || 0;
  const qty      = +sku.qty        || 0;
  const cost     = +sku.cost       || 0;
  const nlcPrice = +sku.nlc_price  || 0;

  const _p = sku.promos; const _a = sku.ads; const _v = sku.visibility;
  const promos = (_p===''||_p===null||_p===undefined) ? (promosAlloc||0) : (+_p||0);
  const ads    = (_a===''||_a===null||_a===undefined) ? (adsAlloc   ||0) : (+_a||0);
  const vis    = (_v===''||_v===null||_v===undefined) ? (visAlloc   ||0) : (+_v||0);

  const commPct = (+cfg.commission)/100;
  const taxPct  = (+cfg.tax)/100;
  const dePct   = (+cfg.directExp)/100;
  const labPct  = (+cfg.labour)/100;
  const logPct  = (+cfg.logistics)/100;

  // Waterfall
  let commission, grossSales, netSales;
  if (sku.custom && (+sku.c_gross > 0 || +sku.c_net > 0)) {
    grossSales = +sku.c_gross || 0;
    netSales   = +sku.c_net   || 0;
    commission = gmv - grossSales;
  } else if (isNLC) {
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

// Pass portalTotals = {ads, vis, promos, splitBy} for regular allocation
// Pass nlcPortalTotals = {ads, vis, splitBy} for NLC allocation (optional, falls back to portalTotals)
function totals(skus, nlcSkus, cfg, portalTotals, nlcPortalTotals) {
  const acc = { gmv:0,qty:0,commission:0,grossSales:0,taxAmt:0,netSales:0,
                cogs:0,directExp:0,grossMargin:0,labour:0,logistics:0,
                cm1:0,promos:0,ads:0,vis:0,cm2:0 };

  const splitBy = portalTotals?.splitBy || 'netSales';
  const nlcPT   = nlcPortalTotals || portalTotals || {};

  // Helper to process a set of SKUs with their own portal totals
  function processGroup(skuArr, isNLC, groupPT) {
    const rawVals = skuArr.map(s => {
      const c = calcSKU(s, cfg, isNLC, 0, 0, 0);
      return { netSales: c.netSales, qty: c.qty || (+s.qty||0) };
    });
    const totalWeight = splitBy === 'qty'
      ? rawVals.reduce((a,v)=>a+(v.qty||0),0)
      : rawVals.reduce((a,v)=>a+(v.netSales||0),0);
    const pAds    = groupPT?.ads    || 0;
    const pVis    = groupPT?.vis    || 0;
    const pPromos = isNLC ? 0 : (groupPT?.promos || 0);

    skuArr.forEach((s,idx)=>{
      const w = splitBy === 'qty' ? (rawVals[idx].qty||0) : (rawVals[idx].netSales||0);
      const share = totalWeight > 0 ? w/totalWeight : 0;
      const adsAlloc    = blankOrUndef(s.ads)       ? pAds    * share : 0;
      const visAlloc    = blankOrUndef(s.visibility) ? pVis    * share : 0;
      const promosAlloc = blankOrUndef(s.promos)     ? pPromos * share : 0;
      const c = calcSKU(s, cfg, isNLC, adsAlloc, visAlloc, promosAlloc);
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
  }

  processGroup(skus||[], false, portalTotals);
  processGroup(nlcSkus||[], true, nlcPT);

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
  return '<div class="sidebar"><div class="logo"><div class="logo-brand">Snackible</div><div class="logo-sub">QCom CM2</div></div><div class="sec-label">Views</div>'+nv('dashboard','📊','Dashboard')+(isAdmin?nv('entry','➕','Enter Data'):'')+nv('combined','🔀','Combined')+nv('trends','📈','Trends')+'<div class="sec-label">Portal</div><div class="portal-chips">'+cp('blinkit','🟡','Blinkit')+cp('zepto','🟠','Zepto')+cp('instamart','🔵','Instamart')+'</div><div class="sec-label">Links</div><a href="https://snackible-cm-2-projections.vercel.app/" target="_blank" class="pchip" style="text-decoration:none;display:block;color:rgba(255,255,255,.6)">🔮 Projections ↗</a></div>';
}

// ── SKU LEADERS ───────────────────────────────────────
function skuLeaders(dAllSkus, cfg, dRawVals, regTotalW, nlcTotalW, pAds, pVis, pPromos, nAds, nVis) {
  const splitBy = S.dashSplit;
  const skuCalcs = dAllSkus.map(({s:sku, n:isNLC}, idx) => {
    const raw = dRawVals[idx];
    const w = splitBy==='qty' ? (raw.qty||0) : (raw.netSales||0);
    const totalW = isNLC ? nlcTotalW : regTotalW;
    const share = totalW > 0 ? w/totalW : 0;
    const aA = blankOrUndef(sku.ads)        ? (isNLC?nAds:pAds)*share : 0;
    const vA = blankOrUndef(sku.visibility) ? (isNLC?nVis:pVis)*share : 0;
    const pA = blankOrUndef(sku.promos)     ? (isNLC?0:pPromos)*share : 0;
    const c  = calcSKU(sku, cfg, isNLC, aA, vA, pA);
    return { name: shortN(sku.name), gmv: c.gmv, netSales: c.netSales, cm2: c.cm2, cm2Pct: c.cm2Pct, isNLC };
  }).filter(x => x.gmv > 0 || x.netSales > 0);

  // Top 3 by GMV (for Instamart NLC gmv is ref, still rank by it)
  const byGMV  = [...skuCalcs].sort((a,b)=>b.gmv-a.gmv).slice(0,3);
  // Top 3 by CM2% (exclude NLC skus whose netSales=0 causing inf, keep only finite)
  const byCM2  = [...skuCalcs].filter(x=>x.netSales>0).sort((a,b)=>b.cm2Pct-a.cm2Pct).slice(0,3);

  const medal  = ['🥇','🥈','🥉'];
  const colHdr = '<div class="sl-hdr"><span></span><span></span><span class="sl-hdr-gmv">GMV</span><span class="sl-hdr-cm2">CM2%</span></div>';
  const mkRow  = (x,i) => '<div class="sl-row">'
    +'<span class="sl-medal">'+medal[i]+'</span>'
    +'<span class="sl-name" title="'+x.name+'">'+shortN(x.name)+(x.isNLC?' <span class="ntag">NLC</span>':'')+'</span>'
    +'<span class="sl-gmv">₹'+fmt(x.gmv)+'</span>'
    +'<span class="sl-pill '+pc(x.cm2Pct)+'">'+fmtPct(x.cm2Pct)+'</span>'
    +'</div>';

  return '<div class="g2 mb20">'
    +'<div class="card" style="padding:16px 20px"><div class="lbl" style="margin-bottom:8px;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.5px">🏆 Top 3 by GMV</div>'+colHdr
    +(byGMV.length ? byGMV.map(mkRow).join('') : '<div style="color:var(--tx3);font-size:13px">No data</div>')
    +'</div>'
    +'<div class="card" style="padding:16px 20px"><div class="lbl" style="margin-bottom:8px;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.5px">🚀 Top 3 by CM2%</div>'+colHdr
    +(byCM2.length ? byCM2.map(mkRow).join('') : '<div style="color:var(--tx3);font-size:13px">No data</div>')
    +'</div>'
    +'</div>';
}

// ── DASHBOARD ─────────────────────────────────────────
function viewDashboard() {
  const months = monthsFor(S.portal);
  if (!months.length) return '<div class="ph"><div><div class="ph-title">Dashboard</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div></div><div class="card empty"><div class="eicon">📂</div><p>No data for '+pLabel(S.portal)+' yet.</p>'+(isAdmin?'<br><button class="btn btn-yellow" onclick="go(\'entry\')">+ Enter Data</button>':'')+'</div>';

  const sel  = (S.month && months.includes(S.month)) ? S.month : months[months.length-1];
  const e    = S.data[dKey(S.portal,sel)] || {};
  const cfg  = e.config || S.config[S.portal];
  const pt   = Object.assign({}, e.portalTotals||{}, {splitBy: S.dashSplit});
  const nlcPT= Object.assign({}, e.nlcTotals||{}, {splitBy: S.dashSplit});
  const t    = totals(e.skus, e.nlcSkus, cfg, pt, nlcPT);

  let mom=null;
  const prev=months[months.indexOf(sel)-1];
  if (prev){ const pe=S.data[dKey(S.portal,prev)]||{}; const pt=totals(pe.skus,pe.nlcSkus,pe.config||cfg); mom={gmv:pt.gmv>0?(t.gmv-pt.gmv)/pt.gmv*100:null,cm1Pct:t.cm1Pct-pt.cm1Pct,cm2Pct:t.cm2Pct-pt.cm2Pct}; }
  const delta=(v,suf)=>v==null?'':'<span style="font-size:10px;margin-left:5px;color:'+(v>=0?'var(--pos)':'var(--neg)')+';">'+(v>=0?'▲':'▼')+' '+Math.abs(v).toFixed(1)+(suf||'pp')+' MoM</span>';

  // Separate weights per group so allocation matches totals() exactly
  const dRegSkus =(e.skus||[]).map(s=>({s,n:false}));
  const dNlcSkus =(e.nlcSkus||[]).map(s=>({s,n:true}));
  const dAllSkus =[...dRegSkus,...dNlcSkus];

  function groupWeight(arr,isNLC){
    return arr.map(({s})=>{const c=calcSKU(s,cfg,isNLC,0,0,0);return{netSales:c.netSales,qty:c.qty||+s.qty||0};});
  }
  const dRegRaw=groupWeight(dRegSkus,false);
  const dNlcRaw=groupWeight(dNlcSkus,true);
  const dRawVals=[...dRegRaw,...dNlcRaw];

  const splitBy=S.dashSplit;
  const regTotalW=splitBy==='qty'?dRegRaw.reduce((a,v)=>a+(v.qty||0),0):dRegRaw.reduce((a,v)=>a+(v.netSales||0),0);
  const nlcTotalW=splitBy==='qty'?dNlcRaw.reduce((a,v)=>a+(v.qty||0),0):dNlcRaw.reduce((a,v)=>a+(v.netSales||0),0);

  const pAds=pt.ads||0, pVis=pt.vis||0, pPromos=pt.promos||0;
  const nAds=nlcPT.ads||0, nVis=nlcPT.vis||0;

  // For skuLeaders we still need a combined dTotalW (used only for display ranking, not CM calc)
  const dTotalW=dRawVals.reduce((a,v)=>a+(splitBy==='qty'?v.qty||0:v.netSales||0),0);

  // Build regular rows
  const regRows=dRegSkus.map(({s:sku},idx)=>{
    const raw=dRegRaw[idx];
    const w=splitBy==='qty'?(raw.qty||0):(raw.netSales||0);
    const share=regTotalW>0?w/regTotalW:0;
    const aA=blankOrUndef(sku.ads)        ? pAds   *share : 0;
    const vA=blankOrUndef(sku.visibility) ? pVis   *share : 0;
    const pA=blankOrUndef(sku.promos)     ? pPromos*share : 0;
    const c=calcSKU(sku,cfg,false,aA,vA,pA);
    return '<tr'+(sku.custom?' style="background:#EFF6FF"':'')+'>'
      +'<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+sku.name+'">'+(sku.custom?'<span class="ntag" style="background:#4C94D0;color:#fff;margin-right:4px">Custom</span>':'')+shortN(sku.name)+'</td>'
      +'<td class="r">₹'+fmt(c.gmv)+'</td>'
      +'<td class="r">₹'+fmt(c.grossSales)+'</td>'
      +'<td class="r">₹'+fmt(c.netSales)+'</td>'
      +'<td class="r">'+fmt(c.qty)+'</td>'
      +'<td class="r">₹'+((+c.cost||0).toFixed(2))+'</td>'
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

  // Regular subtotal (only for Instamart which has NLC)
  const tReg = (e.nlcSkus||[]).length > 0 ? totals(e.skus||[], [], cfg, pt, null) : null;
  const regSubtotal = tReg ? '<tr class="gt" style="background:#E8F5F4">'
    +'<td>Regular Subtotal</td>'
    +'<td class="r">₹'+fmt(tReg.gmv)+'</td>'
    +'<td class="r">₹'+fmt(tReg.grossSales)+'</td>'
    +'<td class="r">₹'+fmt(tReg.netSales)+'</td>'
    +'<td class="r">'+fmt(tReg.qty)+'</td>'
    +'<td class="r">—</td>'
    +'<td class="r">₹'+fmt(tReg.cogs)+'</td>'
    +'<td class="r">₹'+fmt(tReg.directExp)+'</td>'
    +'<td class="r">₹'+fmt(tReg.grossMargin)+'</td>'
    +'<td class="r">₹'+fmt(tReg.labour)+'</td>'
    +'<td class="r">₹'+fmt(tReg.logistics)+'</td>'
    +'<td class="r">₹'+fmt(tReg.cm1)+'</td>'
    +'<td class="c"><span class="pill '+pc(tReg.cm1Pct)+'">'+fmtPct(tReg.cm1Pct)+'</span></td>'
    +'<td class="r">₹'+fmt(tReg.promos)+'</td>'
    +'<td class="r">₹'+fmt(tReg.ads)+'</td>'
    +'<td class="r">₹'+fmt(tReg.vis)+'</td>'
    +'<td class="r">₹'+fmt(tReg.cm2)+'</td>'
    +'<td class="c"><span class="pill '+pc(tReg.cm2Pct)+'">'+fmtPct(tReg.cm2Pct)+'</span></td>'
    +'</tr>' : '';

  // NLC section header + rows
  const nlcSectionHdr = dNlcSkus.length > 0 ? '<tr style="background:#DCEEFF"><td colspan="18" style="font-size:11px;font-weight:700;color:#235D8A;padding:6px 8px;letter-spacing:.04em">NLC SKUs</td></tr>' : '';
  const nlcRows=dNlcSkus.map(({s:sku},idx)=>{
    const raw=dNlcRaw[idx];
    const w=splitBy==='qty'?(raw.qty||0):(raw.netSales||0);
    const share=nlcTotalW>0?w/nlcTotalW:0;
    const aA=blankOrUndef(sku.ads)        ? nAds*share : 0;
    const vA=blankOrUndef(sku.visibility) ? nVis*share : 0;
    const c=calcSKU(sku,cfg,true,aA,vA,0);
    return '<tr style="background:#F0F7FF">'
      +'<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+sku.name+'"><span class="ntag">NLC</span> '+shortN(sku.name)+'</td>'
      +'<td class="r"><span style="color:var(--tx3)">'+fmt(c.gmv)+' <small>ref</small></span></td>'
      +'<td class="r">₹'+fmt(c.grossSales)+'</td>'
      +'<td class="r">₹'+fmt(c.netSales)+'</td>'
      +'<td class="r">'+fmt(c.qty)+'</td>'
      +'<td class="r">₹'+((+c.cost||0).toFixed(2))+'</td>'
      +'<td class="r">₹'+fmt(c.cogs)+'</td>'
      +'<td class="r">₹'+fmt(c.directExp)+'</td>'
      +'<td class="r">₹'+fmt(c.grossMargin)+'</td>'
      +'<td class="r">₹'+fmt(c.labour)+'</td>'
      +'<td class="r">₹'+fmt(c.logistics)+'</td>'
      +'<td class="r">₹'+fmt(c.cm1)+'</td>'
      +'<td class="c"><span class="pill '+pc(c.cm1Pct)+'">'+fmtPct(c.cm1Pct)+'</span></td>'
      +'<td class="r">₹0</td>'
      +'<td class="r">₹'+fmt(c.ads)+'</td>'
      +'<td class="r">₹'+fmt(c.vis)+'</td>'
      +'<td class="r">₹'+fmt(c.cm2)+'</td>'
      +'<td class="c"><span class="pill '+pc(c.cm2Pct)+'">'+fmtPct(c.cm2Pct)+'</span></td>'
      +'</tr>';
  }).join('');

  // NLC subtotal
  const tNlc = dNlcSkus.length > 0 ? totals([], e.nlcSkus||[], cfg, null, nlcPT) : null;
  const nlcSubtotal = tNlc ? '<tr class="gt" style="background:#DCEEFF">'
    +'<td>NLC Subtotal</td>'
    +'<td class="r"><span style="color:var(--tx3)">'+fmt(tNlc.gmv)+' <small>ref</small></span></td>'
    +'<td class="r">₹'+fmt(tNlc.grossSales)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.netSales)+'</td>'
    +'<td class="r">'+fmt(tNlc.qty)+'</td>'
    +'<td class="r">—</td>'
    +'<td class="r">₹'+fmt(tNlc.cogs)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.directExp)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.grossMargin)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.labour)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.logistics)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.cm1)+'</td>'
    +'<td class="c"><span class="pill '+pc(tNlc.cm1Pct)+'">'+fmtPct(tNlc.cm1Pct)+'</span></td>'
    +'<td class="r">₹0</td>'
    +'<td class="r">₹'+fmt(tNlc.ads)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.vis)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.cm2)+'</td>'
    +'<td class="c"><span class="pill '+pc(tNlc.cm2Pct)+'">'+fmtPct(tNlc.cm2Pct)+'</span></td>'
    +'</tr>' : '';

  const rows = regRows + regSubtotal + nlcSectionHdr + nlcRows + nlcSubtotal;
  const splitToggle='<div style="display:flex;gap:0;border:1.5px solid var(--border);border-radius:6px;overflow:hidden">'
    +'<button onclick="setDashSplit(\'netSales\')" style="padding:5px 11px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(S.dashSplit==='netSales'?'var(--green)':'#fff')+';color:'+(S.dashSplit==='netSales'?'#fff':'var(--tx3)')+'">Net Sales</button>'
    +'<button onclick="setDashSplit(\'qty\')" style="padding:5px 11px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(S.dashSplit==='qty'?'var(--green)':'#fff')+';color:'+(S.dashSplit==='qty'?'#fff':'var(--tx3)')+'">Qty Sold</button>'
    +'</div>';
  const msel='<select class="msel" onchange="S.month=this.value;render()">'+months.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('')+'</select>';

  return '<div class="ph"><div><div class="ph-title">Dashboard</div><div class="ph-sub">'+pLabel(S.portal)+' · '+sel+'</div></div><div class="ph-right" style="gap:8px">'+pBadge(S.portal)+' '+splitToggle+' '+msel+(isAdmin?'<button class="btn btn-yellow" onclick="go(\'entry\')">+ New Month</button>':'')+'</div></div>'
  +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Total GMV</div><div class="val">₹'+fmt(t.gmv)+'</div><div class="sub">'+(mom?delta(mom.gmv,'%'):'—')+'</div><div class="abar" style="background:'+pColor(S.portal)+'"></div></div><div class="card stat"><div class="lbl">Net Sales</div><div class="val">₹'+fmt(t.netSales)+'</div><div class="sub">After '+cfg.commission+'% comm + '+cfg.tax+'% GST</div><div class="abar" style="background:var(--mint)"></div></div><div class="card stat"><div class="lbl">CM1</div><div class="val '+pc(t.cm1Pct)+'">₹'+fmt(t.cm1)+'</div><div class="sub">'+fmtPct(t.cm1Pct)+' of Net Sales '+(mom?delta(mom.cm1Pct):'')+'</div><div class="abar" style="background:var(--blue)"></div></div><div class="card stat"><div class="lbl">CM2</div><div class="val '+pc(t.cm2Pct)+'">₹'+fmt(t.cm2)+'</div><div class="sub">'+fmtPct(t.cm2Pct)+' of Net Sales '+(mom?delta(mom.cm2Pct):'')+'</div><div class="abar" style="background:'+(t.cm2Pct>=0?'var(--pos)':'var(--neg)')+'"></div></div></div>'
  +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Commission</div><div class="val warn">₹'+fmt(t.commission)+'</div><div class="sub">'+cfg.commission+'% of GMV</div></div><div class="card stat"><div class="lbl">Gross Margin</div><div class="val">₹'+fmt(t.grossMargin)+'</div><div class="sub">After COGS + Direct Exp</div></div><div class="card stat"><div class="lbl">Promos</div><div class="val warn">₹'+fmt(t.promos)+'</div><div class="sub">'+fmtPct(t.promosPct)+' of GMV</div></div><div class="card stat"><div class="lbl">Ads + Visibility</div><div class="val warn">₹'+fmt(t.ads+t.vis)+'</div><div class="sub">Marketing</div></div></div>'
  +skuLeaders(dAllSkus,cfg,dRawVals,regTotalW,nlcTotalW,pAds,pVis,pPromos,nAds,nVis)
  +'<div class="card tcard"><div class="thead-row"><div class="thead-title">SKU Breakdown · '+sel+'</div><div class="flex gap8">'+(isAdmin?'<button class="btn btn-outline btn-sm" onclick="S.month=\''+sel+'\';go(\'entry\')">✏️ Edit</button><button class="btn btn-sm" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA" onclick="deleteMonth(\''+sel+'\')">🗑 Delete Month</button>':'')+'</div></div><div class="twrap"><table><thead><tr>'
  +'<th>SKU</th><th class="r">GMV</th><th class="r">Gross Sales</th><th class="r">Net Sales</th><th class="r">Qty</th><th class="r">Cost/Unit</th><th class="r">COGS</th><th class="r">Direct Exp</th><th class="r">Gross Margin</th><th class="r">Labour</th><th class="r">Logistics</th><th class="r">CM1 ₹</th><th class="c">CM1%</th><th class="r">Promos</th><th class="r">Ads</th><th class="r">Visibility</th><th class="r">CM2 ₹</th><th class="c">CM2%</th>'
  +'</tr></thead><tbody>'+(rows||emptyRow(18,'No SKUs'))
  +'<tr class="gt"><td>Grand Total</td><td class="r">₹'+fmt(t.gmv)+'</td><td class="r">₹'+fmt(t.grossSales)+'</td><td class="r">₹'+fmt(t.netSales)+'</td><td class="r">'+fmt(t.qty)+'</td><td class="r">—</td><td class="r">₹'+fmt(t.cogs)+'</td><td class="r">₹'+fmt(t.directExp)+'</td><td class="r">₹'+fmt(t.grossMargin)+'</td><td class="r">₹'+fmt(t.labour)+'</td><td class="r">₹'+fmt(t.logistics)+'</td><td class="r">₹'+fmt(t.cm1)+'</td><td class="c"><span class="pill '+pc(t.cm1Pct)+'">'+fmtPct(t.cm1Pct)+'</span></td><td class="r">₹'+fmt(t.promos)+'</td><td class="r">₹'+fmt(t.ads)+'</td><td class="r">₹'+fmt(t.vis)+'</td><td class="r">₹'+fmt(t.cm2)+'</td><td class="c"><span class="pill '+pc(t.cm2Pct)+'">'+fmtPct(t.cm2Pct)+'</span></td>'
  +'</tr></tbody></table></div>'
  // ── Saved metrics bar ──────────────────────────────
  +'<div style="margin-top:16px;background:#1E2A35;border-radius:10px;padding:14px 20px">'
  +'<div style="font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Saved Metrics (% of Net Sales)</div>'
  +'<div style="display:flex;flex-wrap:wrap;gap:10px">'
  +[
    {label:'Commission',   val: cfg.commission,  unit:'%'},
    {label:'Tax',          val: cfg.tax,          unit:'%'},
    {label:'Direct Exp',   val: cfg.directExp,    unit:'%'},
    {label:'Labour',       val: cfg.labour,       unit:'%'},
    {label:'Logistics',    val: cfg.logistics,    unit:'%'},
  ].map(m=>`<div style="background:rgba(255,255,255,0.07);border-radius:8px;padding:8px 14px;min-width:110px">
    <div style="font-size:10px;color:#94A3B8;margin-bottom:3px">${m.label}</div>
    <div style="font-size:16px;font-weight:700;color:#F1F5F9">${(+m.val).toFixed(1)}${m.unit}</div>
  </div>`).join('')
  +'</div></div></div>';
}

// ── ENTRY ─────────────────────────────────────────────
let ES = { skus:[], nlcSkus:[], month:'', portalTotals:{ads:'',vis:'',promos:'',splitBy:'netSales'}, nlcTotals:{ads:'',vis:''} };

function initES() {
  ES.portal = S.portal;
  if (S.month && S.data[dKey(S.portal,S.month)]) {
    const ex = S.data[dKey(S.portal,S.month)];
    ES.skus         = JSON.parse(JSON.stringify(ex.skus ||[])).map(s=>({
      ...s,
      promos: (s.promos===0||s.promos===''||s.promos===null||s.promos===undefined) ? '' : s.promos,
      ads:    (s.ads   ===0||s.ads   ===''||s.ads   ===null||s.ads   ===undefined) ? '' : s.ads,
      visibility:(s.visibility===0||s.visibility===''||s.visibility===null||s.visibility===undefined)?'':s.visibility,
      custom: s.custom||false,
      c_gross: s.c_gross||'',
      c_net: s.c_net||'',
    }));
    ES.nlcSkus      = JSON.parse(JSON.stringify(ex.nlcSkus||[])).map(s=>({...s, promos:''}));
    ES.portalTotals = JSON.parse(JSON.stringify(ex.portalTotals ||{ads:'',vis:'',promos:'',splitBy:'netSales'}));
    ES.nlcTotals    = JSON.parse(JSON.stringify(ex.nlcTotals    ||{ads:'',vis:''}));
    ES.month        = S.month;
  } else {
    ES.skus=[]; ES.nlcSkus=[];
    ES.portalTotals = {ads:'',vis:'',promos:'',splitBy:'netSales'};
    ES.nlcTotals    = {ads:'',vis:''};
    ES.month = MONTHS.includes('July 2026')?'July 2026':MONTHS[MONTHS.length-1];
  }
}

const blankSku = n => ({name:n||'',gmv:'',qty:'',cost:'',promos:'',ads:'',visibility:''});
const blankCustomSku = () => ({name:'',gmv:'',qty:'',cost:'',promos:'',ads:'',visibility:'',custom:true,c_gross:'',c_net:''});
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
    +'<div class="thead-row"><div class="thead-title">Regular SKUs · '+pLabel(S.portal)+'</div>'
    +'<div class="flex gap8"><button class="btn btn-outline btn-sm" onclick="addReg()">+ Add Row</button><button class="btn btn-outline btn-sm" onclick="addCustomReg()" style="border-color:#4C94D0;color:#4C94D0">+ Custom SKU</button></div></div>'
    +'<div class="twrap"><table id="reg-tbl"><thead><tr>'
    +'<th style="min-width:220px">SKU</th>'
    +'<th class="r" style="min-width:105px">GMV (₹)</th>'
    +'<th class="r" style="min-width:110px">Gross Sales</th>'
    +'<th class="r" style="min-width:110px">Net Sales</th>'
    +'<th class="r" style="min-width:60px">Qty</th>'
    +'<th class="r" style="min-width:75px">Cost/U</th>'
    +'<th class="r" style="min-width:105px">COGS</th>'
    +'<th class="r" style="min-width:100px">Dir Exp</th>'
    +'<th class="r" style="min-width:110px">Gr Margin</th>'
    +'<th class="r" style="min-width:100px">Labour</th>'
    +'<th class="r" style="min-width:105px">Logistics</th>'
    +'<th class="r" style="min-width:110px">CM1 ₹</th>'
    +'<th class="r" style="min-width:65px">CM1%</th>'
    +'<th class="r" style="min-width:105px">Promos</th>'
    +'<th class="r" style="min-width:105px">Ads</th>'
    +'<th class="r" style="min-width:105px">Visibility</th>'
    +'<th class="r" style="min-width:110px">CM2 ₹</th>'
    +'<th class="r" style="min-width:65px">CM2%</th>'
    +'<th style="min-width:24px"></th></tr></thead>'
    +'<tbody id="reg-body">'+(regRows||emptyRow(19,'Click + Add Row or Prefill All'))+'</tbody>'
    +'<tfoot id="reg-foot"></tfoot>'
    +'</table></div></div>';

  const nlcTbl = !isIM ? '' :
    '<div class="card tcard mb20 nlc-section">'
    +'<div class="thead-row"><div class="thead-title">NLC Products <span class="ntag">Instamart only</span></div>'
    +'<div class="flex gap8"><button class="btn btn-outline btn-sm" onclick="addNlc()">+ Add Row</button></div></div>'
    +'<p style="padding:2px 18px 6px;font-size:11px;color:var(--tx3)">GMV = reference only. <strong>Gross Sales = NLC Price × Qty</strong>. No commission deducted.</p>'
    +'<div style="padding:10px 18px 14px;border-bottom:1px solid var(--border);display:flex;gap:20px;align-items:flex-end;flex-wrap:wrap">'
    +'<div style="font-size:11px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.05em;width:100%;margin-bottom:4px">NLC Portal-Level Spends (auto-split by '+((ES.portalTotals.splitBy||'netSales')==='qty'?'Qty Sold':'Net Sales')+' share)</div>'
    +'<div class="cfg-item"><label>NLC Ads (₹)</label><input type="number" value="'+(ES.nlcTotals.ads||'')+'" placeholder="0" oninput="updateNLCT(\'ads\',this.value)"></div>'
    +'<div class="cfg-item"><label>NLC Visibility (₹)</label><input type="number" value="'+(ES.nlcTotals.vis||'')+'" placeholder="0" oninput="updateNLCT(\'vis\',this.value)"></div>'
    +'</div>'
    +'<div class="twrap"><table id="nlc-tbl"><thead><tr>'
    +'<th style="min-width:220px">SKU</th>'
    +'<th class="r" style="min-width:105px">GMV (ref)</th>'
    +'<th class="r" style="min-width:100px">NLC Price</th>'
    +'<th class="r" style="min-width:60px">Qty</th>'
    +'<th class="r" style="min-width:110px">Gross Sales</th>'
    +'<th class="r" style="min-width:110px">Net Sales</th>'
    +'<th class="r" style="min-width:80px">Cost/Unit</th>'
    +'<th class="r" style="min-width:105px">COGS</th>'
    +'<th class="r" style="min-width:100px">Dir Exp</th>'
    +'<th class="r" style="min-width:110px">Gr Margin</th>'
    +'<th class="r" style="min-width:100px">Labour</th>'
    +'<th class="r" style="min-width:105px">Logistics</th>'
    +'<th class="r" style="min-width:110px">CM1 ₹</th>'
    +'<th class="r" style="min-width:65px">CM1%</th>'
    +'<th class="r" style="min-width:105px">Promos</th>'
    +'<th class="r" style="min-width:105px">Ads</th>'
    +'<th class="r" style="min-width:105px">Visibility</th>'
    +'<th class="r" style="min-width:110px">CM2 ₹</th>'
    +'<th class="r" style="min-width:65px">CM2%</th>'
    +'<th style="min-width:24px"></th></tr></thead>'
    +'<tbody id="nlc-body">'+(nlcHtml||emptyRow(20,'Click + Add Row or Prefill All NLC SKUs'))+'</tbody>'
    +'<tfoot id="nlc-foot"></tfoot>'
    +'</table></div></div>';

  // Combined total card (regular + NLC)
  const combinedCard = !isIM ? '' : '<div id="entry-combined-total"></div>';

  const actions = '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:4px">'
    +'<button class="btn btn-outline" onclick="go(\'dashboard\')">Cancel</button>'
    +'<button class="btn btn-primary" onclick="saveEntry()">💾 Save Month Data</button></div>';

  return '<div class="ph"><div><div class="ph-title">Enter Data</div><div class="ph-sub">'+pLabel(S.portal)+'</div></div><div class="ph-right">'+pBadge(S.portal)+'</div></div>'
    +cfgPart+regTbl+nlcTbl+(combinedCard||'')+actions;
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
  const adsAlloc   =blankOrUndef(sku.ads)       ? (+pt.ads   ||0)*share : 0;
  const visAlloc   =blankOrUndef(sku.visibility)? (+pt.vis   ||0)*share : 0;
  const proAlloc   =blankOrUndef(sku.promos)    ? (+pt.promos||0)*share : 0;
  const c=calcSKU(sku,cfg,false,adsAlloc,visAlloc,proAlloc);

  // Name field — custom = free text input, regular = dropdown
  let nameHtml;
  if(sku.custom){
    nameHtml='<div style="display:flex;flex-direction:column;gap:3px">'
      +'<span style="font-size:9px;font-weight:700;color:#4C94D0;text-transform:uppercase;letter-spacing:.05em">Custom SKU</span>'
      +'<input type="text" style="width:200px" placeholder="Enter SKU name" value="'+(sku.name||'')+'" oninput="updateReg('+i+',\'name\',this.value)">'
      +'</div>';
  } else {
    const nameInList=(PORTAL_SKUS[S.portal]||[]).includes(sku.name);
    const opts=['<option value="">-- Select SKU --</option>',...(PORTAL_SKUS[S.portal]||[]).map(n=>'<option value="'+n+'"'+(n===sku.name?' selected':'')+'>'+n+'</option>')].join('');
    nameHtml=nameInList||!sku.name
      ?'<select style="width:220px" onchange="updateReg('+i+',\'name\',this.value)">'+opts+'</select>'
      :'<select style="width:220px" onchange="updateReg('+i+',\'name\',this.value)"><option value="'+sku.name+'" selected>'+sku.name+'</option>'+opts+'</select>';
  }

  const fro = v => v>0?'₹'+fmt(v):'—';
  const rowStyle=sku.custom?'style="background:#F0F7FF"':'';
  // Both custom and regular SKUs use portal allocation when blank
  const promosPlaceholder = proAlloc>0?Math.round(proAlloc):'0';
  const adsPlaceholder    = adsAlloc>0?Math.round(adsAlloc):'0';
  const visPlaceholder    = visAlloc>0?Math.round(visAlloc):'0';

  const es='style="background:#EFF6FF;border-color:#4C94D044"';
  return '<tr class="erow" data-ri="'+i+'" '+rowStyle+'>'
    +'<td>'+nameHtml+'</td>'
    +'<td><input type="number" value="'+(sku.gmv||'')+'" placeholder="0" oninput="updateReg('+i+',\'gmv\',this.value)"></td>'
    +(sku.custom
      ?'<td><input type="number" value="'+(sku.c_gross||'')+'" placeholder="0" '+es+' oninput="updateReg('+i+',\'c_gross\',this.value)"></td>'
       +'<td><input type="number" value="'+(sku.c_net||'')+'" placeholder="0" '+es+' oninput="updateReg('+i+',\'c_net\',this.value)"></td>'
      :'<td><input class="ro" type="text" value="'+fro(c.grossSales)+'" readonly></td>'
       +'<td><input class="ro" type="text" value="'+fro(c.netSales)+'" readonly></td>'
    )
    +'<td><input type="number" value="'+(sku.qty||'')+'" placeholder="0" oninput="updateReg('+i+',\'qty\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.cost||'')+'" placeholder="0.00" step="0.01" oninput="updateReg('+i+',\'cost\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+fro(c.cogs)+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+fro(c.directExp)+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.grossMargin):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.labour):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.logistics):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm1):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm1Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm1Pct):'—')+'" readonly></td>'
    +'<td><input type="number" value="'+(sku.promos||'')+'" placeholder="'+promosPlaceholder+'" oninput="updateReg('+i+',\'promos\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.ads||'')+'" placeholder="'+adsPlaceholder+'" oninput="updateReg('+i+',\'ads\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.visibility||'')+'" placeholder="'+visPlaceholder+'" oninput="updateReg('+i+',\'visibility\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm2):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm2Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm2Pct):'—')+'" readonly></td>'
    +'<td><button class="delbtn" onclick="delReg('+i+')">✕</button></td></tr>';
}

function nlcRow(sku,i,cfg){
  const pt=ES.portalTotals;
  const splitBy=pt.splitBy||'netSales';
  // NLC allocation — use nlcSkus array for weight
  const allRaw=ES.nlcSkus.map(s=>calcSKU(s,cfg,true,0,0,0));
  const totalWeight=splitBy==='qty'?allRaw.reduce((a,c)=>a+(c.qty||0),0):allRaw.reduce((a,c)=>a+(c.netSales||0),0);
  const myWeight=splitBy==='qty'?(allRaw[i]?.qty||0):(allRaw[i]?.netSales||0);
  const share=totalWeight>0?myWeight/totalWeight:0;
  const adsAlloc   =blankOrUndef(sku.ads)       ? (+ES.nlcTotals.ads||0)*share : 0;
  const visAlloc   =blankOrUndef(sku.visibility)? (+ES.nlcTotals.vis||0)*share : 0;
  const proAlloc   = 0; // NLC promos always 0
  const c=calcSKU(sku,cfg,true,adsAlloc,visAlloc,proAlloc);
  const opts=['<option value="">-- Select NLC SKU --</option>',...NLC_SKUS.map(n=>'<option value="'+n+'"'+(n===sku.name?' selected':'')+'>'+n+'</option>')].join('');
  // If name not in NLC_SKUS list (imported), add it as a selected option
  const nameInList=NLC_SKUS.includes(sku.name);
  const selectHtml=nameInList
    ?'<select style="width:220px" onchange="updateNlc('+i+',\'name\',this.value)">'+opts+'</select>'
    :'<select style="width:220px" onchange="updateNlc('+i+',\'name\',this.value)"><option value="'+sku.name+'" selected>'+sku.name+'</option>'+opts+'</select>';
  return '<tr class="erow" data-ni="'+i+'" style="background:#F5F9FF">'
    +'<td>'+selectHtml+'</td>'
    +'<td><input type="number" value="'+(sku.gmv||'')+'" placeholder="ref only" oninput="updateNlc('+i+',\'gmv\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.nlc_price||'')+'" placeholder="NLC price" step="0.01" oninput="updateNlc('+i+',\'nlc_price\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.qty||'')+'" placeholder="0" oninput="updateNlc('+i+',\'qty\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.grossSales>0?'₹'+fmt(c.grossSales):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.netSales):'—')+'" readonly></td>'
    +'<td><input type="number" value="'+(sku.cost||'')+'" placeholder="0.00" step="0.01" oninput="updateNlc('+i+',\'cost\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.cogs>0?'₹'+fmt(c.cogs):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.directExp):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.grossMargin):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.labour):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.logistics):'—')+'" readonly></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm1):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm1Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm1Pct):'—')+'" readonly></td>'
    +'<td><input type="number" value="'+(sku.promos||'')+'" placeholder="'+(proAlloc>0?Math.round(proAlloc):'0')+'" oninput="updateNlc('+i+',\'promos\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.ads||'')+'" placeholder="'+(adsAlloc>0?Math.round(adsAlloc):'0')+'" oninput="updateNlc('+i+',\'ads\',this.value)"></td>'
    +'<td><input type="number" value="'+(sku.visibility||'')+'" placeholder="'+(visAlloc>0?Math.round(visAlloc):'0')+'" oninput="updateNlc('+i+',\'visibility\',this.value)"></td>'
    +'<td><input class="ro" type="text" value="'+(c.netSales>0?'₹'+fmt(c.cm2):'—')+'" readonly></td>'
    +'<td><input class="ro '+pc(c.cm2Pct)+'" type="text" value="'+(c.netSales>0?fmtPct(c.cm2Pct):'—')+'" readonly></td>'
    +'<td><button class="delbtn" onclick="delNlc('+i+')">✕</button></td></tr>';
}

function refreshReg(){ 
  const b=document.getElementById('reg-body'); if(!b)return; 
  const cfg=S.config[S.portal]; 
  b.innerHTML=ES.skus.length?ES.skus.map((s,i)=>regRow(s,i,cfg)).join(''):emptyRow(19,'Click + Add Row'); 
  refreshRegFoot(); 
  refreshCombinedTotal(); 
}

function refreshRegFoot(){
  const foot=document.getElementById('reg-foot'); if(!foot)return;
  const cfg=S.config[S.portal];
  const pt=ES.portalTotals;
  const t=totals(ES.skus,[],cfg,pt,null);
  if(!t||t.gmv===0){foot.innerHTML='';refreshCombinedTotal();return;}
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
  refreshCombinedTotal();
}
function refreshNlc(){ const b=document.getElementById('nlc-body'); if(!b)return; const cfg=S.config[S.portal]; b.innerHTML=ES.nlcSkus.length?ES.nlcSkus.map((s,i)=>nlcRow(s,i,cfg)).join(''):emptyRow(20,'Click + Add Row'); refreshNlcFoot(); refreshCombinedTotal(); }

function refreshNlcFoot(){
  const foot=document.getElementById('nlc-foot'); if(!foot)return;
  const cfg=S.config[S.portal];
  const t=totals([],ES.nlcSkus,cfg,ES.portalTotals,ES.nlcTotals);
  if(!t||t.grossSales===0){foot.innerHTML='';refreshCombinedTotal();return;}
  foot.innerHTML='<tr class="gt" style="background:#E8F0FF">'
    +'<td>NLC Total</td>'
    +'<td class="r">₹'+fmt(t.gmv)+'</td>'
    +'<td class="r">—</td>'
    +'<td class="r">'+fmt(t.qty)+'</td>'
    +'<td class="r">₹'+fmt(t.grossSales)+'</td>'
    +'<td class="r">₹'+fmt(t.netSales)+'</td>'
    +'<td class="r">—</td>'
    +'<td class="r">₹'+fmt(t.cogs)+'</td>'
    +'<td class="r">₹'+fmt(t.directExp)+'</td>'
    +'<td class="r">₹'+fmt(t.grossMargin)+'</td>'
    +'<td class="r">₹'+fmt(t.labour)+'</td>'
    +'<td class="r">₹'+fmt(t.logistics)+'</td>'
    +'<td class="r">₹'+fmt(t.cm1)+'</td>'
    +'<td class="r"><span class="pill '+pc(t.cm1Pct)+'">'+fmtPct(t.cm1Pct)+'</span></td>'
    +'<td class="r">₹0</td>'
    +'<td class="r">₹'+fmt(t.ads)+'</td>'
    +'<td class="r">₹'+fmt(t.vis)+'</td>'
    +'<td class="r">₹'+fmt(t.cm2)+'</td>'
    +'<td class="r"><span class="pill '+pc(t.cm2Pct)+'">'+fmtPct(t.cm2Pct)+'</span></td>'
    +'<td></td></tr>';
  refreshCombinedTotal();
}

function refreshCombinedTotal(){
  const el=document.getElementById('entry-combined-total'); if(!el)return;
  const cfg=S.config[S.portal];
  // Read directly from input fields to avoid any stale ES.portalTotals state
  const ptPromos = parseFloat(document.getElementById('pt-promos')?.value||'0') || (+ES.portalTotals.promos||0);
  const ptAds    = parseFloat(document.getElementById('pt-ads')?.value||'0')    || (+ES.portalTotals.ads   ||0);
  const ptVis    = parseFloat(document.getElementById('pt-vis')?.value||'0')    || (+ES.portalTotals.vis   ||0);
  const pt = Object.assign({}, ES.portalTotals, {promos:ptPromos, ads:ptAds, vis:ptVis});

  // Compute reg and nlc independently — each group uses its own portal totals
  const reg=totals(ES.skus,   [], cfg, pt,             null);
  const nlc=totals([], ES.nlcSkus, cfg, pt, ES.nlcTotals);

  const gmv      = reg.gmv      + nlc.gmv;
  const netSales = reg.netSales + nlc.netSales;
  const cm1      = reg.cm1      + nlc.cm1;

  // Promos: regular SKUs only (NLC promos always 0)
  const promos   = reg.promos;

  // Ads + Visibility: both groups
  const ads      = reg.ads + nlc.ads;
  const vis      = reg.vis + nlc.vis;

  const cm2      = cm1 - promos - ads - vis;
  const cm1Pct   = netSales > 0 ? cm1/netSales*100 : 0;
  const cm2Pct   = netSales > 0 ? cm2/netSales*100 : 0;

  if(!gmv){el.innerHTML='';return;}
  el.innerHTML='<div class="card mb20" style="border:2px solid var(--green)">'
    +'<div style="padding:14px 18px;font-size:13px;font-weight:700;color:var(--green);border-bottom:1px solid var(--border)">Combined Total (Regular + NLC)</div>'
    +'<div style="padding:12px 18px;display:flex;gap:28px;flex-wrap:wrap">'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">Total GMV</div><div style="font-size:16px;font-weight:700">₹'+fmt(gmv)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">Net Sales</div><div style="font-size:16px;font-weight:700">₹'+fmt(netSales)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">CM1 ₹</div><div style="font-size:16px;font-weight:700;color:var(--blue)">₹'+fmt(cm1)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">CM1%</div><div style="font-size:16px;font-weight:700;color:var(--blue)">'+fmtPct(cm1Pct)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">Promos (Reg)</div><div style="font-size:16px;font-weight:700;color:var(--warn)">₹'+fmt(promos)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">Ads+Vis (Reg+NLC)</div><div style="font-size:16px;font-weight:700;color:var(--warn)">₹'+fmt(ads+vis)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">CM2 ₹</div><div style="font-size:16px;font-weight:700;color:'+(cm2>=0?'var(--pos)':'var(--neg)')+'">₹'+fmt(cm2)+'</div></div>'
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">CM2%</div><div style="font-size:16px;font-weight:700;color:'+(cm2Pct>=0?'var(--pos)':'var(--neg)')+'">'+fmtPct(cm2Pct)+'</div></div>'
    +'</div></div>';
}

function updateReg(i,f,v){
  ES.skus[i][f]=v;
  if(ES.skus[i].custom) _refreshCustomRow(i);
  else _refreshRegRow(i);
}

function _refreshCustomRow(i){
  const sku=ES.skus[i];
  const cfg=S.config[S.portal];
  const pt=ES.portalTotals;
  const splitBy=pt.splitBy||'netSales';
  const allRaw=ES.skus.map(s=>calcSKU(s,cfg,false,0,0,0));
  const totalWeight=splitBy==='qty'?allRaw.reduce((a,c)=>a+(c.qty||0),0):allRaw.reduce((a,c)=>a+(c.netSales||0),0);
  const myWeight=splitBy==='qty'?(allRaw[i]?.qty||0):(allRaw[i]?.netSales||0);
  const share=totalWeight>0?myWeight/totalWeight:0;
  const adsAlloc  =blankOrUndef(sku.ads)       ? (+pt.ads   ||0)*share : 0;
  const visAlloc  =blankOrUndef(sku.visibility)? (+pt.vis   ||0)*share : 0;
  const proAlloc  =blankOrUndef(sku.promos)    ? (+pt.promos||0)*share : 0;
  const c=calcSKU(sku,cfg,false,adsAlloc,visAlloc,proAlloc);
  const row=document.querySelector('[data-ri="'+i+'"]'); if(!row)return;
  const ros=row.querySelectorAll('input.ro');
  // custom ro order: cogs(0), directExp(1), grossMargin(2), labour(3), logistics(4), cm1(5), cm1%(6), cm2(7), cm2%(8)
  // (grossSales and netSales are editable number inputs, not ro)
  const fv=v=>v>0?'₹'+fmt(v):'—';
  if(ros[0])ros[0].value=fv(c.cogs);
  if(ros[1])ros[1].value=fv(c.directExp);
  if(ros[2])ros[2].value=c.netSales>0?'₹'+fmt(c.grossMargin):'—';
  if(ros[3])ros[3].value=c.netSales>0?'₹'+fmt(c.labour):'—';
  if(ros[4])ros[4].value=c.netSales>0?'₹'+fmt(c.logistics):'—';
  if(ros[5])ros[5].value=c.netSales>0?'₹'+fmt(c.cm1):'—';
  if(ros[6]){ros[6].value=c.netSales>0?fmtPct(c.cm1Pct):'—';ros[6].className='ro '+pc(c.cm1Pct);}
  if(ros[7])ros[7].value=c.netSales>0?'₹'+fmt(c.cm2):'—';
  if(ros[8]){ros[8].value=c.netSales>0?fmtPct(c.cm2Pct):'—';ros[8].className='ro '+pc(c.cm2Pct);}
  refreshRegFoot();
}
function updateNlc(i,f,v){ ES.nlcSkus[i][f]=v; _refreshNlcRow(i); }

function _refreshRegRow(i){
  const pt=ES.portalTotals;
  const splitBy=pt.splitBy||'netSales';
  const allRaw=ES.skus.map(s=>calcSKU(s,S.config[S.portal],false,0,0,0));
  const totalWeight=splitBy==='qty'?allRaw.reduce((a,c)=>a+(c.qty||0),0):allRaw.reduce((a,c)=>a+(c.netSales||0),0);
  const myWeight=splitBy==='qty'?(allRaw[i]?.qty||0):(allRaw[i]?.netSales||0);
  const share=totalWeight>0?myWeight/totalWeight:0;
  const sku=ES.skus[i];
  const adsAlloc   =blankOrUndef(sku.ads)       ? (+pt.ads   ||0)*share : 0;
  const visAlloc   =blankOrUndef(sku.visibility)? (+pt.vis   ||0)*share : 0;
  const proAlloc   =blankOrUndef(sku.promos)    ? (+pt.promos||0)*share : 0;
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
  if(f==='splitBy'){
    const nsBtn=document.getElementById('split-ns');
    const qtyBtn=document.getElementById('split-qty');
    if(nsBtn&&qtyBtn){
      nsBtn.style.background = v==='netSales'?'var(--green)':'#fff';
      nsBtn.style.color      = v==='netSales'?'#fff':'var(--tx3)';
      qtyBtn.style.background= v==='qty'?'var(--green)':'#fff';
      qtyBtn.style.color     = v==='qty'?'#fff':'var(--tx3)';
    }
  }
  refreshReg(); refreshRegFoot(); 
}
function updateNLCT(f,v){ ES.nlcTotals[f]=parseFloat(v)||0; refreshNlc(); }
function addReg()    { ES.skus.push(blankSku());    refreshReg(); }
function addCustomReg() { ES.skus.push(blankCustomSku()); refreshReg(); }
function addNlc()    { ES.nlcSkus.push(blankNlc()); refreshNlc(); }
function delReg(i)   { ES.skus.splice(i,1);    refreshReg(); }
function delNlc(i)   { ES.nlcSkus.splice(i,1); refreshNlc(); }
function prefillReg(){ const ex=new Set(ES.skus.map(s=>s.name)); (PORTAL_SKUS[S.portal]||[]).forEach(n=>{ if(!ex.has(n))ES.skus.push(blankSku(n)); }); refreshReg(); }
function prefillNlc(){ const ex=new Set(ES.nlcSkus.map(s=>s.name)); NLC_SKUS.forEach(n=>{ if(!ex.has(n))ES.nlcSkus.push(blankNlc(n)); }); refreshNlc(); }

const SHEET_IMPORT_URL = 'https://script.google.com/macros/s/AKfycbzZWmiZk9RCmg6RTqqgObYjzMn545VGHorUQg66yHo1R-f9NbpDqyjBqRXlnJWpLHU-/exec';

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
    // Always overwrite — clear existing before import
    ES.skus = []; ES.nlcSkus = [];
    const toTitleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());
    rows.forEach(r => {
      r.name = toTitleCase(r.name);
      const isNLC = r.nlc_price > 0;
      const targetArr = isNLC ? ES.nlcSkus : ES.skus;
      const existing = targetArr.find(s => s.name === r.name);
      if (existing) {
        existing.gmv        = r.gmv        || existing.gmv;
        existing.qty        = r.qty        || existing.qty;
        existing.cost       = r.cost       || existing.cost;
        if (isNLC) existing.nlc_price = r.nlc_price;
        // Only set if explicitly non-zero in sheet; leave blank otherwise so portal allocation kicks in
        if (r.promos > 0 && !isNLC) existing.promos     = r.promos; else if(isNLC) existing.promos = '';
        if (r.ads > 0)              existing.ads        = r.ads;
        if (r.visibility > 0)       existing.visibility = r.visibility;
      } else {
        targetArr.push({
          name: r.name, gmv: r.gmv||'', qty: r.qty||'', cost: r.cost||'',
          nlc_price: r.nlc_price||'',
          promos: (r.promos > 0 && !isNLC) ? r.promos : '',
          ads: r.ads > 0 ? r.ads : '',
          visibility: r.visibility > 0 ? r.visibility : ''
        });
      }
    });
    refreshReg();
    refreshRegFoot();
    refreshNlc();
    toast('✅ Imported '+rows.length+' SKUs from sheet');
  } catch(e) {
    toast('Import failed: '+e.message,'err');
  }
}

function saveEntry(){
  const month=document.getElementById('es-month')?.value||ES.month;
  if(!month){toast('Select a month','err');return;}
  const normalizeSpend = s => { 
    const n = parseFloat(s); 
    return (!s && s!=='0') || n === 0 ? '' : n; 
  };
  const vs=ES.skus.filter(s=>s.name&&+s.gmv>0).map(s=>({
    ...s,
    promos: normalizeSpend(s.promos),
    ads: normalizeSpend(s.ads),
    visibility: normalizeSpend(s.visibility),
    custom: s.custom||false,
    c_gross: s.c_gross||'',
    c_net: s.c_net||'',
  }));
  const vn=ES.nlcSkus.filter(s=>s.name&&(+s.qty>0||+s.nlc_price>0)).map(s=>({
    ...s,
    promos: '',
    ads: normalizeSpend(s.ads),
    visibility: normalizeSpend(s.visibility)
  }));
  if(!vs.length&&!vn.length){toast('Enter at least one SKU with data','err');return;}
  S.data[dKey(S.portal,month)]={skus:vs,nlcSkus:vn,portalTotals:JSON.parse(JSON.stringify(ES.portalTotals)),nlcTotals:JSON.parse(JSON.stringify(ES.nlcTotals)),config:JSON.parse(JSON.stringify(S.config[S.portal])),saved:new Date().toISOString()};
  save(dKey(S.portal,month)).then(() => { S.month=month; toast('✅ '+pLabel(S.portal)+' · '+month+' saved'); go('dashboard'); });
}

// ── COMBINED ──────────────────────────────────────────
function viewCombined(){
  const allM=[...new Set(['blinkit','zepto','instamart'].flatMap(p=>monthsFor(p)))].sort((a,b)=>MONTHS.indexOf(a)-MONTHS.indexOf(b));
  if(!allM.length)return '<div class="ph"><div><div class="ph-title">Combined View</div></div></div><div class="card empty"><div class="eicon">🔀</div><p>No data yet.</p></div>';
  const portals=['blinkit','zepto','instamart'];
  const mode=S.combineMode||'single';
  const modeToggle='<div style="display:flex;gap:0;border:1.5px solid var(--border);border-radius:6px;overflow:hidden">'
    +'<button onclick="S.combineMode=\'single\';render()" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(mode==='single'?'var(--green)':'#fff')+';color:'+(mode==='single'?'#fff':'var(--tx3)')+'">Single Month</button>'
    +'<button onclick="S.combineMode=\'range\';render()" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(mode==='range'?'var(--green)':'#fff')+';color:'+(mode==='range'?'#fff':'var(--tx3)')+'">Month Range</button>'
    +'</div>';
  let selMonths=[],headerSub='',periodLabel='';
  if(mode==='single'){
    const sel=(S.month&&allM.includes(S.month))?S.month:allM[allM.length-1];
    S.month=sel; selMonths=[sel]; periodLabel=sel;
    const msel='<select class="msel" onchange="S.month=this.value;render()">'+allM.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('')+'</select>';
    headerSub='<div class="ph-right" style="gap:8px"><span class="pbadge combined">🔀 All Portals</span>'+modeToggle+' '+msel+'</div>';
  } else {
    const from=S.combineFrom&&allM.includes(S.combineFrom)?S.combineFrom:allM[0];
    const to=S.combineTo&&allM.includes(S.combineTo)?S.combineTo:allM[allM.length-1];
    S.combineFrom=from; S.combineTo=to;
    selMonths=allM.slice(allM.indexOf(from),allM.indexOf(to)+1);
    periodLabel=from+' – '+to+' ('+selMonths.length+' months)';
    const fsel='<select class="msel" onchange="S.combineFrom=this.value;render()" style="width:130px">'+allM.map(m=>'<option value="'+m+'"'+(m===from?' selected':'')+'>'+m+'</option>').join('')+'</select>';
    const tsel='<select class="msel" onchange="S.combineTo=this.value;render()" style="width:130px">'+allM.map(m=>'<option value="'+m+'"'+(m===to?' selected':'')+'>'+m+'</option>').join('')+'</select>';
    headerSub='<div class="ph-right" style="gap:8px"><span class="pbadge combined">🔀 All Portals</span>'+modeToggle+'<span style="font-size:12px;color:var(--tx3)">From</span>'+fsel+'<span style="font-size:12px;color:var(--tx3)">To</span>'+tsel+'</div>';
  }
  const tMap={};
  portals.forEach(p=>{
    const acc={gmv:0,netSales:0,grossSales:0,grossMargin:0,cm1:0,cm2:0,promos:0,ads:0,vis:0,cogs:0,directExp:0,labour:0,logistics:0};
    selMonths.forEach(m=>{const e=S.data[dKey(p,m)];if(!e)return;const t=totals(e.skus,e.nlcSkus,e.config||S.config[p],e.portalTotals,e.nlcTotals);Object.keys(acc).forEach(k=>{if(t[k]!==undefined)acc[k]+=t[k];});});
    if(acc.gmv>0){acc.cm1Pct=acc.netSales>0?acc.cm1/acc.netSales*100:0;acc.cm2Pct=acc.netSales>0?acc.cm2/acc.netSales*100:0;tMap[p]=acc;}
  });
  const comb={gmv:0,netSales:0,grossMargin:0,cm1:0,cm2:0,promos:0,ads:0,vis:0};
  Object.values(tMap).forEach(t=>{comb.gmv+=t.gmv;comb.netSales+=t.netSales;comb.grossMargin+=t.grossMargin;comb.cm1+=t.cm1;comb.cm2+=t.cm2;comb.promos+=t.promos;comb.ads+=t.ads;comb.vis+=t.vis;});
  const cCM1=comb.netSales>0?comb.cm1/comb.netSales*100:0;
  const cCM2=comb.netSales>0?comb.cm2/comb.netSales*100:0;
  const cCM1gmv=comb.gmv>0?comb.cm1/comb.gmv*100:0;
  const cCM2gmv=comb.gmv>0?comb.cm2/comb.gmv*100:0;
  let imRegPromos=0,imRegNetSales=0;
  selMonths.forEach(m=>{const e=S.data[dKey('instamart',m)];if(!e)return;const reg=totals(e.skus,[],e.config||S.config['instamart'],e.portalTotals,null);const full=totals(e.skus,e.nlcSkus,e.config||S.config['instamart'],e.portalTotals,e.nlcTotals);imRegPromos+=full.promos;imRegNetSales+=reg.netSales;});
  const pCards=portals.map(p=>{
    const t=tMap[p];
    if(!t)return '<div class="card stat"><div class="lbl">'+pLabel(p)+'</div><div class="val" style="font-size:15px;color:var(--tx3)">No data</div><div class="sub"><button class="btn btn-outline btn-sm" onclick="setPortal(\''+p+'\');go(\'entry\')">+ Enter</button></div></div>';
    let sub='';
    if(p==='instamart'){const pn=imRegNetSales>0?imRegPromos/imRegNetSales*100:0;const av=t.netSales>0?(t.ads+t.vis)/t.netSales*100:0;sub='<div style="font-size:11px;margin-top:4px;line-height:1.8"><span>Promos: <b>'+fmtPct(pn)+'</b> of Regular SKU Net Sales</span><br><span>Ads+Vis: <b>'+fmtPct(av)+'</b> of Combined Net Sales</span></div>';}
    else{const pn=t.netSales>0?t.promos/t.netSales*100:0;const av=t.netSales>0?(t.ads+t.vis)/t.netSales*100:0;sub='<div style="font-size:11px;margin-top:4px;line-height:1.8"><span>Promos: <b>'+fmtPct(pn)+'</b> of Net Sales</span><br><span>Ads+Vis: <b>'+fmtPct(av)+'</b> of Net Sales</span></div>';}
    return '<div class="card stat"><div class="lbl">'+pLabel(p)+'</div><div class="val" style="color:'+pColor(p)+';font-size:18px">₹'+fmt(t.netSales)+'</div><div class="sub" style="font-size:10px;color:var(--tx3);margin-top:2px">GMV: ₹'+fmt(t.gmv)+'</div>'+sub+'<div class="abar" style="background:'+pColor(p)+'"></div></div>';
  }).join('');
  const cmpRows=portals.map(p=>{
    const t=tMap[p];if(!t)return '<tr><td>'+pBadge(p)+'</td><td colspan="11" style="color:var(--tx3)">No data for period</td></tr>';
    const cm1gmv=t.gmv>0?t.cm1/t.gmv*100:0;const cm2gmv=t.gmv>0?t.cm2/t.gmv*100:0;
    return '<tr><td>'+pBadge(p)+'</td><td class="r">₹'+fmt(t.gmv)+'</td><td class="r">₹'+fmt(t.netSales)+'</td><td class="r">₹'+fmt(t.grossMargin)+'</td><td class="r">₹'+fmt(t.cm1)+'</td><td class="r"><span class="pill '+pc(t.cm1Pct)+'" style="font-size:10px">'+fmtPct(t.cm1Pct)+'</span></td><td class="r"><span class="pill '+pc(cm1gmv)+'" style="font-size:10px">'+fmtPct(cm1gmv)+'</span></td><td class="r">₹'+fmt(t.promos)+'</td><td class="r">₹'+fmt(t.ads+t.vis)+'</td><td class="r">₹'+fmt(t.cm2)+'</td><td class="r"><span class="pill '+pc(t.cm2Pct)+'" style="font-size:10px">'+fmtPct(t.cm2Pct)+'</span></td><td class="r"><span class="pill '+pc(cm2gmv)+'" style="font-size:10px">'+fmtPct(cm2gmv)+'</span></td></tr>';
  }).join('');
  return '<div class="ph"><div><div class="ph-title">Combined View</div><div class="ph-sub">All Portals · '+periodLabel+'</div></div>'+headerSub+'</div>'
    +'<div class="g4 mb20"><div class="card stat"><div class="lbl">Total GMV</div><div class="val pos">₹'+fmt(comb.gmv)+'</div></div><div class="card stat"><div class="lbl">Net Sales</div><div class="val">₹'+fmt(comb.netSales)+'</div></div><div class="card stat"><div class="lbl">CM1</div><div class="val '+pc(cCM1)+'">₹'+fmt(comb.cm1)+'</div><div class="sub">'+fmtPct(cCM1)+' Net Sales · '+fmtPct(cCM1gmv)+' GMV</div></div><div class="card stat"><div class="lbl">CM2</div><div class="val '+pc(cCM2)+'">₹'+fmt(comb.cm2)+'</div><div class="sub">'+fmtPct(cCM2)+' Net Sales · '+fmtPct(cCM2gmv)+' GMV</div></div></div>'
    +'<div class="g3 mb20">'+pCards+'</div>'
    +'<div class="card tcard"><div class="thead-row"><div class="thead-title">Portal Comparison · '+periodLabel+'</div></div><div class="twrap"><table><thead><tr><th>Portal</th><th class="r">GMV</th><th class="r">Net Sales</th><th class="r">Gross Margin</th><th class="r">CM1 ₹</th><th class="r">CM1% Net</th><th class="r">CM1% GMV</th><th class="r">Promos ₹</th><th class="r">Ads+Vis ₹</th><th class="r">CM2 ₹</th><th class="r">CM2% Net</th><th class="r">CM2% GMV</th></tr></thead><tbody>'+cmpRows
    +'<tr class="gt"><td>Combined</td><td class="r">₹'+fmt(comb.gmv)+'</td><td class="r">₹'+fmt(comb.netSales)+'</td><td class="r">₹'+fmt(comb.grossMargin)+'</td><td class="r">₹'+fmt(comb.cm1)+'</td><td class="r"><span class="pill '+pc(cCM1)+'" style="font-size:10px">'+fmtPct(cCM1)+'</span></td><td class="r"><span class="pill '+pc(cCM1gmv)+'" style="font-size:10px">'+fmtPct(cCM1gmv)+'</span></td><td class="r">₹'+fmt(comb.promos)+'</td><td class="r">₹'+fmt(comb.ads+comb.vis)+'</td><td class="r">₹'+fmt(comb.cm2)+'</td><td class="r"><span class="pill '+pc(cCM2)+'" style="font-size:10px">'+fmtPct(cCM2)+'</span></td><td class="r"><span class="pill '+pc(cCM2gmv)+'" style="font-size:10px">'+fmtPct(cCM2gmv)+'</span></td></tr></tbody></table></div></div>';
}

// ── TRENDS ────────────────────────────────────────────
function viewTrends(){
  const portals=['blinkit','zepto','instamart'];
  const pColors={blinkit:'#FBAE25',zepto:'#9B59B6',instamart:'#E35C25'};
  const allMonths=MONTHS.filter(m=>portals.some(p=>S.data[dKey(p,m)]));
  if(!allMonths.length) return '<div class="ph"><div><div class="ph-title">Trends</div></div></div><div class="card empty"><div class="eicon">📈</div><p>No data yet.</p><button class="btn btn-yellow" onclick="go(\'entry\')">+ Enter Data</button></div>';

  const shortM=m=>{const pts=m.split(' ');return pts[0].slice(0,3)+"'"+pts[1].slice(2);};
  const getTotals=(p,m)=>{const e=S.data[dKey(p,m)];if(!e)return null;return totals(e.skus,e.nlcSkus,e.config||S.config[p],e.portalTotals,e.nlcTotals);};
  const portalMonths=p=>allMonths.filter(m=>S.data[dKey(p,m)]);

  const secHead=(n,title,sub)=>`<div style="margin:32px 0 16px;border-left:4px solid var(--green);padding-left:12px"><div style="font-size:16px;font-weight:700;color:var(--tx)">${n}. ${title}</div><div style="font-size:12px;color:var(--tx3);margin-top:3px">${sub}</div></div>`;

  const rangeFilter=`<div style="display:flex;align-items:center;gap:12px;background:var(--card);border:1.5px solid var(--border);border-radius:10px;padding:12px 18px;margin-bottom:24px;flex-wrap:wrap">
    <span style="font-size:12px;font-weight:600;color:var(--tx2)">Date Range</span>
    <select id="range-from" onchange="applyTrendRange()" style="font-family:Poppins,sans-serif;font-size:12px;border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--tx)">
      ${allMonths.map((m,i)=>`<option value="${i}">${shortM(m)}</option>`).join('')}
    </select>
    <span style="font-size:12px;color:var(--tx3)">to</span>
    <select id="range-to" onchange="applyTrendRange()" style="font-family:Poppins,sans-serif;font-size:12px;border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--tx)">
      ${allMonths.map((m,i)=>`<option value="${i}" ${i===allMonths.length-1?'selected':''}>${shortM(m)}</option>`).join('')}
    </select>
    <button onclick="resetTrendRange()" style="font-family:Poppins,sans-serif;font-size:11px;font-weight:600;padding:4px 12px;border:1.5px solid var(--border);border-radius:6px;background:transparent;color:var(--tx3);cursor:pointer">Reset</button>
  </div>`;

  const mktToggle=`<div style="display:flex;gap:0;border:1.5px solid rgba(255,255,255,0.15);border-radius:6px;overflow:hidden;width:fit-content;margin-bottom:16px">
    <button id="mkt-toggle-ns" onclick="setMktBasis('netSales')" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:var(--green);color:#fff">% Net Sales</button>
    <button id="mkt-toggle-gmv" onclick="setMktBasis('gmv')" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:transparent;color:#94A3B8">% GMV</button>
  </div>`;

  // Multi-pane card: 3 stacked canvases sharing x-axis label only on bottom
  const multiPane=(title,ids,h=160)=>`
    <div class="card mb20" style="padding:18px;background:#1E2A35">
      <div style="font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">${title}</div>
      ${ids.map((obj,i)=>`
        <div style="display:flex;align-items:stretch;margin-bottom:${i<ids.length-1?'4px':'0'}">
          <div style="width:68px;display:flex;align-items:center;justify-content:flex-end;padding-right:8px">
            <span style="font-size:10px;font-weight:700;color:${obj.color};white-space:nowrap">${obj.label}</span>
          </div>
          <div style="flex:1;position:relative;height:${h}px"><canvas id="${obj.id}"></canvas></div>
        </div>
        ${i<ids.length-1?'<div style="height:1px;background:rgba(255,255,255,0.05);margin:0 0 4px 68px"></div>':''}`).join('')}
    </div>`;

  const pLabel2=p=>p==='blinkit'?'Blinkit':p==='zepto'?'Zepto':'Instamart';

  const html=
    rangeFilter
    +secHead(1,'GMV Trends','Portal GMV over time — hover any month to compare all portals')
    +multiPane('GMV (₹ Lakhs)',portals.map(p=>({id:'c-gmv-'+p,label:pLabel2(p),color:pColors[p]})),160)
    +`<div class="card mb20" style="padding:18px;background:#1E2A35">
        <div style="font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">GMV Comparison · All Portals</div>
        <div style="position:relative;height:280px"><canvas id="c-gmv-cross"></canvas></div>
      </div>`

    +secHead(2,'Marketing Spends','Ads+Visibility & Promos — hover to compare portals')
    +mktToggle
    +multiPane('Ads + Visibility %',portals.map(p=>({id:'c-adsv-'+p,label:pLabel2(p),color:pColors[p]})),140)
    +multiPane('Promos %',portals.map(p=>({id:'c-promo-'+p,label:pLabel2(p),color:pColors[p]})),140)

    +secHead(3,'CM1 & CM2 Margins','% of Net Sales — hover to compare portals')
    +multiPane('CM1% & CM2%',portals.map(p=>({id:'c-cm-'+p,label:pLabel2(p),color:pColors[p]})),160)
    +`<div class="card mb20" style="padding:18px;background:#1E2A35">
        <div style="font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">CM1% · All Portals</div>
        <div style="position:relative;height:260px"><canvas id="c-cm1-cross"></canvas></div>
      </div>`
    +`<div class="card mb20" style="padding:18px;background:#1E2A35">
        <div style="font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">CM2% · All Portals</div>
        <div style="position:relative;height:260px"><canvas id="c-cm2-cross"></canvas></div>
      </div>`;

  // Pre-compute all data
  const allData = {};
  portals.forEach(p=>{
    const pm = portalMonths(p);
    allData[p] = {
      months: pm,
      gmv:      pm.map(m=>{const t=getTotals(p,m);return t?+(t.gmv/100000).toFixed(1):null;}),
      adsvNet:  pm.map(m=>{const t=getTotals(p,m);return t&&t.netSales>0?+((t.ads+t.vis)/t.netSales*100).toFixed(1):null;}),
      adsvGmv:  pm.map(m=>{const t=getTotals(p,m);return t&&t.gmv>0?+((t.ads+t.vis)/t.gmv*100).toFixed(1):null;}),
      promosNet:pm.map(m=>{const e=S.data[dKey(p,m)];if(!e)return null;const full=getTotals(p,m);if(!full)return null;
        if(p==='instamart'){const reg=totals(e.skus,[],e.config||S.config[p],e.portalTotals,null);return reg.netSales>0?+(full.promos/reg.netSales*100).toFixed(1):null;}
        return full.netSales>0?+(full.promos/full.netSales*100).toFixed(1):null;}),
      promosGmv:pm.map(m=>{const e=S.data[dKey(p,m)];if(!e)return null;const full=getTotals(p,m);if(!full)return null;
        if(p==='instamart'){const reg=totals(e.skus,[],e.config||S.config[p],e.portalTotals,null);return reg.gmv>0?+(full.promos/reg.gmv*100).toFixed(1):null;}
        return full.gmv>0?+(full.promos/full.gmv*100).toFixed(1):null;}),
      cm1:      pm.map(m=>{const t=getTotals(p,m);return t?+t.cm1Pct.toFixed(1):null;}),
      cm2:      pm.map(m=>{const t=getTotals(p,m);return t?+t.cm2Pct.toFixed(1):null;}),
    };
  });

  const script=`(function(){
  if(typeof Chart==='undefined') return;
  Chart.defaults.font.family='Poppins';
  Chart.defaults.font.size=11;
  Chart.defaults.color='#FFFFFF';
  Chart.defaults.plugins.tooltip.backgroundColor='rgba(15,23,42,0.97)';
  Chart.defaults.plugins.tooltip.titleFont={family:'Poppins',size:13,weight:'bold'};
  Chart.defaults.plugins.tooltip.bodyFont={family:'Poppins',size:12};
  Chart.defaults.plugins.tooltip.padding=12;
  Chart.defaults.plugins.tooltip.boxPadding=6;
  Chart.defaults.plugins.tooltip.cornerRadius=8;
  Chart.defaults.plugins.tooltip.titleColor='#fff';
  Chart.defaults.plugins.tooltip.bodyColor='#e2e8f0';

  var portals=${JSON.stringify(portals)};
  var pColors=${JSON.stringify(pColors)};
  var pLabels={blinkit:'Blinkit',zepto:'Zepto',instamart:'Instamart'};
  var allMonths=${JSON.stringify(allMonths)};
  var shortM=function(m){var pts=m.split(' ');return pts[0].slice(0,3)+"'"+pts[1].slice(2);};
  var allLabels=allMonths.map(shortM);
  var allData=${JSON.stringify(allData)};
  var mktBasis='netSales';
  var charts={};
  var rangeFrom=0,rangeTo=allMonths.length-1;

  function destroy(id){if(charts[id])try{charts[id].destroy();}catch(e){}delete charts[id];}

  // Dark bg plugin
  Chart.register({id:'snackBG',beforeDraw:function(chart){
    var ctx=chart.ctx;ctx.save();ctx.fillStyle='#1E2A35';ctx.fillRect(0,0,chart.width,chart.height);ctx.restore();
  }});

  // Data label plugin
  Chart.register({id:'snackDL',afterDatasetsDraw:function(chart){
    var ctx=chart.ctx;var isBar=chart.config.type==='bar';
    // Collect all label positions per x to avoid overlap
    var posMap={};
    chart.data.datasets.forEach(function(ds,di){
      var meta=chart.getDatasetMeta(di);if(meta.hidden)return;
      if(ds.yAxisID==='yGmv') return; // skip GMV shadow labels
      var isPct=chart._snackPct;var unit=chart._snackUnit||'L';
      meta.data.forEach(function(el,idx){
        var v=ds.data[idx];if(v===null||v===undefined)return;
        var label=isPct?v.toFixed(1)+'%':v.toFixed(1)+unit;
        ctx.save();
        ctx.font='bold 11.5px Poppins,sans-serif';
        var tw=ctx.measureText(label).width;
        var px=el.x;
        var py;
        if(isBar){
          py=v>=0?el.y-4:el.y+17;
        } else {
          // Smart vertical positioning — avoid overlap with other labels at same x
          var key=Math.round(px);
          if(!posMap[key]) posMap[key]=[];
          var baseY=el.y-11;
          // Find a non-conflicting position — try above first, then below
          var candidate=baseY;
          var attempts=0;
          while(posMap[key].some(function(ey){return Math.abs(ey-candidate)<18;})&&attempts<6){
            candidate=(attempts%2===0)?baseY-(Math.ceil((attempts+1)/2)*20):baseY+(Math.ceil(attempts/2)*20);
            attempts++;
          }
          py=candidate;
          posMap[key].push(py);
        }
        ctx.fillStyle='#FFFFFF';ctx.strokeStyle='rgba(0,0,0,0.1)';ctx.lineWidth=0.5;
        ctx.beginPath();ctx.roundRect(px-tw/2-5,py-13,tw+10,16,4);ctx.fill();ctx.stroke();
        ctx.fillStyle='#0F172A';ctx.textAlign='center';ctx.textBaseline='bottom';
        ctx.fillText(label,px,py);ctx.restore();
      });
    });
  }});

  var GRID='rgba(255,255,255,0.08)';
  var AXIS='#FFFFFF';

  function yScale(isPct,display){
    return{display:display!==false,grid:{color:GRID},ticks:{font:{size:10},color:AXIS,
      callback:function(v){return isPct?v.toFixed(0)+'%':v.toFixed(0)+'L';}},grace:'15%'};
  }
  function xScale(show){
    return{display:show!==false,grid:{display:false},ticks:{font:{size:10},color:AXIS,
      maxRotation:30,minRotation:0,autoSkip:true,maxTicksLimit:10}};
  }
  function baseOpts(isPct,unit,showX){return{
    responsive:true,maintainAspectRatio:false,
    layout:{padding:{top:22,right:36,bottom:4,left:4}},
    interaction:{mode:'index',intersect:false},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ctx){
      return ' '+ctx.dataset.label+': '+(isPct?ctx.parsed.y.toFixed(1)+'%':ctx.parsed.y.toFixed(1)+(unit||'L'));
    }}}},
    scales:{x:xScale(showX),y:yScale(isPct)},
    _snackPct:isPct,_snackUnit:unit||'L'
  };}
  function barOpts(isPct){return{
    responsive:true,maintainAspectRatio:false,
    layout:{padding:{top:22,right:36,bottom:4,left:4}},
    interaction:{mode:'index',intersect:false},
    plugins:{legend:{display:true,position:'top',labels:{font:{size:11},color:'#FFFFFF',boxWidth:10,padding:12}},
      tooltip:{callbacks:{label:function(ctx){return ' '+ctx.dataset.label+': '+ctx.parsed.y.toFixed(1)+(isPct?'%':'L');}}}},
    scales:{x:xScale(true),y:yScale(isPct)},
    barPercentage:0.6,categoryPercentage:0.7,_snackPct:isPct
  };}

  function sliceMonths(months,field){
    var result=[],labs=[];
    months.forEach(function(m,i){
      var ai=allMonths.indexOf(m);
      if(ai>=rangeFrom&&ai<=rangeTo){result.push(allData[months[i]!==undefined?'':null]);labs.push(shortM(m));}
    });
    return labs;
  }

  function slicePortal(p,field){
    var d=allData[p];var data=[],labs=[];
    d.months.forEach(function(m,i){
      var ai=allMonths.indexOf(m);
      if(ai>=rangeFrom&&ai<=rangeTo){data.push(d[field][i]);labs.push(shortM(m));}
    });
    return{data:data,labels:labs};
  }

  function sliceCross(field){
    var labels=allMonths.slice(rangeFrom,rangeTo+1).map(shortM);
    var datasets=portals.map(function(p){
      var d=allData[p];
      var data=allMonths.slice(rangeFrom,rangeTo+1).map(function(m){
        var i=d.months.indexOf(m);return i>=0?d[field][i]:null;
      });
      return{label:pLabels[p],data:data,backgroundColor:pColors[p]+'DD',borderColor:pColors[p],borderWidth:1,borderRadius:4};
    });
    return{labels:labels,datasets:datasets};
  }

  // Shared tooltip element
  var ttEl=document.createElement('div');
  ttEl.style.cssText='position:fixed;background:rgba(15,23,42,0.97);color:#e2e8f0;padding:12px 16px;border-radius:8px;font-family:Poppins,sans-serif;font-size:12px;pointer-events:none;z-index:9999;display:none;min-width:160px;box-shadow:0 4px 20px rgba(0,0,0,0.4)';
  document.body.appendChild(ttEl);

  // Pane groups: when hovering one, sync all panes in same group
  var paneGroups={};

  function syncPanes(groupId,activeChart,index,x,y){
    if(activeChart._noTooltip){
      // Still draw sync line but no tooltip
      var group=paneGroups[groupId]||[];
      group.forEach(function(id){var ch=charts[id];if(ch){ch._syncIdx=index;ch.draw();}});
      return;
    }
    var group=paneGroups[groupId]||[];
    // Build combined tooltip content
    var label=activeChart.data.labels[index];
    var lines=['<div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:8px">'+label+'</div>'];
    group.forEach(function(id){
      var ch=charts[id];if(!ch)return;
      var ds=ch.data.datasets;
      ds.forEach(function(d){
        var v=d.data[index];if(v===null||v===undefined)return;
        var isPct=ch._snackPct;
        var val=isPct?v.toFixed(1)+'%':v.toFixed(1)+(ch._snackUnit||'L');
        lines.push('<div style="display:flex;align-items:center;gap:8px;margin-top:4px"><span style="width:10px;height:10px;border-radius:50%;background:'+d.borderColor+';flex-shrink:0"></span><span style="color:#94A3B8">'+d.label+'</span><span style="margin-left:auto;font-weight:700;color:#fff">'+val+'</span></div>');
      });
    });
    ttEl.innerHTML=lines.join('');
    ttEl.style.display='block';
    // Position near cursor
    var tx=x+16,ty=y-40;
    if(tx+200>window.innerWidth) tx=x-220;
    ttEl.style.left=tx+'px';ttEl.style.top=ty+'px';
    // Draw sync line on all panes
    group.forEach(function(id){
      var ch=charts[id];if(!ch)return;
      var meta=ch.getDatasetMeta(0);
      if(!meta||!meta.data[index])return;
      ch._syncIdx=index;ch.draw();
    });
  }

  function hideSyncTooltip(groupId){
    ttEl.style.display='none';
    var group=paneGroups[groupId]||[];
    group.forEach(function(id){var ch=charts[id];if(ch){ch._syncIdx=null;ch.draw();}});
  }

  // Sync line plugin
  Chart.register({id:'snackSync',afterDraw:function(chart){
    if(chart._syncIdx===null||chart._syncIdx===undefined)return;
    var idx=chart._syncIdx;
    var meta=chart.getDatasetMeta(0);
    if(!meta||!meta.data[idx])return;
    var x=meta.data[idx].x;
    var ctx=chart.ctx;
    var top=chart.chartArea.top;var bottom=chart.chartArea.bottom;
    ctx.save();
    ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,bottom);
    ctx.strokeStyle='rgba(255,255,255,0.4)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
    ctx.stroke();ctx.restore();
  }});

  function mkLine(id,labels,datasets,isPct,unit,showX,groupId,noTooltip,showLegend){
    destroy(id);var cv=document.getElementById(id);if(!cv)return;
    var opts=baseOpts(isPct,unit,showX);
    if(noTooltip){ opts.plugins.tooltip.enabled=false; opts.plugins.tooltip.external=function(){}; }
    if(showLegend){ opts.plugins.legend={display:true,position:'top',labels:{font:{size:10},color:'#FFFFFF',boxWidth:10,padding:10,usePointStyle:true}}; }
    charts[id]=new Chart(cv,{type:'line',data:{labels:labels,datasets:datasets},options:opts});
    charts[id]._snackPct=isPct;charts[id]._snackUnit=unit||'L';charts[id]._syncIdx=null;charts[id]._noTooltip=noTooltip;
    if(groupId){
      if(!paneGroups[groupId])paneGroups[groupId]=[];
      if(paneGroups[groupId].indexOf(id)<0)paneGroups[groupId].push(id);
    }
    // Mouse events for sync
    cv.addEventListener('mousemove',function(e){
      var ch=charts[id];if(!ch)return;
      var rect=cv.getBoundingClientRect();
      var pts=ch.getElementsAtEventForMode(e,'index',{intersect:false},false);
      if(pts.length&&groupId){syncPanes(groupId,ch,pts[0].index,e.clientX,e.clientY);}
      else if(groupId){hideSyncTooltip(groupId);}
    });
    cv.addEventListener('mouseleave',function(){if(groupId)hideSyncTooltip(groupId);});
  }
  function mkBar(id,labels,datasets,isPct){
    destroy(id);var cv=document.getElementById(id);if(!cv)return;
    charts[id]=new Chart(cv,{type:'bar',data:{labels:labels,datasets:datasets},options:barOpts(isPct)});
    charts[id]._snackPct=isPct;
  }

  function drawAll(){
    // GMV panes — each portal is a separate canvas but shares same x labels concept
    portals.forEach(function(p,pi){
      var s=slicePortal(p,'gmv');var col=pColors[p];
      mkLine('c-gmv-'+p,s.labels,[{label:pLabels[p],data:s.data,borderColor:col,backgroundColor:col+'22',
        fill:true,tension:0.35,pointBackgroundColor:col,pointRadius:4,pointHoverRadius:6,borderWidth:2.5}],
        false,'L',pi===portals.length-1,'gmv');
    });
    // GMV cross — faded bars + bright total line overlay
    var gc=sliceCross('gmv');
    var totalGmv=gc.labels.map(function(lbl,i){
      return gc.datasets.reduce(function(sum,ds){return sum+(ds.data[i]||0);},0);
    });
    destroy('c-gmv-cross');var cv=document.getElementById('c-gmv-cross');if(cv){
      charts['c-gmv-cross']=new Chart(cv,{
        type:'bar',
        data:{labels:gc.labels,datasets:[
          {label:'Blinkit',data:gc.datasets[0].data,backgroundColor:'#FBAE2555',borderColor:'#FBAE2588',borderWidth:1,borderRadius:3,order:2},
          {label:'Zepto',data:gc.datasets[1].data,backgroundColor:'#9B59B655',borderColor:'#9B59B688',borderWidth:1,borderRadius:3,order:2},
          {label:'Instamart',data:gc.datasets[2].data,backgroundColor:'#E35C2555',borderColor:'#E35C2588',borderWidth:1,borderRadius:3,order:2},
          {type:'line',label:'Total GMV',data:totalGmv,borderColor:'#00E5FF',backgroundColor:'#00E5FF22',
           fill:false,tension:0.35,pointBackgroundColor:'#00E5FF',pointRadius:5,pointHoverRadius:7,
           borderWidth:3,order:1,yAxisID:'y'},
        ]},
        options:{
          responsive:true,maintainAspectRatio:false,
          layout:{padding:{top:22,right:36,bottom:4,left:4}},
          interaction:{mode:'index',intersect:false},
          plugins:{legend:{display:true,position:'top',labels:{font:{size:11},color:'#FFFFFF',boxWidth:10,padding:12}},
            tooltip:{callbacks:{label:function(ctx){return ' '+ctx.dataset.label+': '+ctx.parsed.y.toFixed(1)+'L';}}}},
          scales:{
            x:{grid:{display:false},ticks:{font:{size:10},color:'#FFFFFF',maxRotation:30,autoSkip:true,maxTicksLimit:12}},
            y:{grid:{color:'rgba(255,255,255,0.08)'},ticks:{font:{size:10},color:'#FFFFFF',callback:function(v){return v+'L';}},grace:'15%'}
          },
          barPercentage:0.6,categoryPercentage:0.7,_snackPct:false,_snackUnit:'L'
        }
      });
      charts['c-gmv-cross']._snackPct=false;charts['c-gmv-cross']._snackUnit='L';
    }

    // CM panes
    portals.forEach(function(p,pi){
      var c1=slicePortal(p,'cm1');var c2=slicePortal(p,'cm2');var col=pColors[p];
      mkLine('c-cm-'+p,c1.labels,[
        {label:'CM1%',data:c1.data,borderColor:'#4C94D0',fill:false,tension:0.35,pointBackgroundColor:'#4C94D0',pointRadius:4,pointHoverRadius:6,borderWidth:2.5},
        {label:'CM2%',data:c2.data,borderColor:col,fill:false,tension:0.35,pointBackgroundColor:col,pointRadius:4,pointHoverRadius:6,borderWidth:2.5,borderDash:[5,3]}
      ],true,'%',pi===portals.length-1,'cm');
    });
    var c1c=sliceCross('cm1');mkBar('c-cm1-cross',c1c.labels,c1c.datasets,true);
    var c2c=sliceCross('cm2');mkBar('c-cm2-cross',c2c.labels,c2c.datasets,true);

    drawMkt();
  }

  function drawMkt(){
    var isGmv=mktBasis==='gmv';
    var avF=isGmv?'adsvGmv':'adsvNet';
    var prF=isGmv?'promosGmv':'promosNet';

    portals.forEach(function(p,pi){
      var av=slicePortal(p,avF);var pr=slicePortal(p,prF);var col=pColors[p];
      var gmv=slicePortal(p,'gmv');
      var isLast=pi===portals.length-1;

      var gmvShadowDs={
        label:'GMV (L)',data:gmv.data,
        borderColor:'rgba(99,179,237,0.3)',backgroundColor:'rgba(99,179,237,0.12)',
        fill:true,tension:0.35,pointRadius:0,borderWidth:1.5,order:3,
        yAxisID:'yGmv',
        tooltip:{enabled:false},
        datalabels:{display:false}
      };

      // Ads+Vis pane with GMV shadow
      destroy('c-adsv-'+p);var cv1=document.getElementById('c-adsv-'+p);if(cv1){
        var opts1=baseOpts(true,'%',isLast);
        opts1.scales.yGmv={display:false,position:'right',grid:{display:false}};
        opts1.plugins.legend={display:false};
        opts1.plugins.tooltip.enabled=false;
        charts['c-adsv-'+p]=new Chart(cv1,{type:'line',data:{labels:av.labels,datasets:[
          gmvShadowDs,
          {label:'Ads+Vis',data:av.data,borderColor:'#38BDF8',backgroundColor:'#38BDF818',fill:true,tension:0.35,pointBackgroundColor:'#38BDF8',pointRadius:4,pointHoverRadius:6,borderWidth:2.5,order:1,yAxisID:'y'}
        ]},options:opts1});
        charts['c-adsv-'+p]._snackPct=true;charts['c-adsv-'+p]._snackUnit='%';charts['c-adsv-'+p]._syncIdx=null;
        if(!paneGroups['adsv'])paneGroups['adsv']=[];
        if(paneGroups['adsv'].indexOf('c-adsv-'+p)<0)paneGroups['adsv'].push('c-adsv-'+p);
        (function(id,ch){
          cv1.addEventListener('mousemove',function(e){
            var pts=ch.getElementsAtEventForMode(e,'index',{intersect:false},false);
            if(pts.length)syncPanes('adsv',ch,pts[0].index,e.clientX,e.clientY);
            else hideSyncTooltip('adsv');
          });
          cv1.addEventListener('mouseleave',function(){hideSyncTooltip('adsv');});
        })('c-adsv-'+p,charts['c-adsv-'+p]);
      }

      // Promos pane with GMV shadow
      destroy('c-promo-'+p);var cv2=document.getElementById('c-promo-'+p);if(cv2){
        var opts2=baseOpts(true,'%',isLast);
        opts2.scales.yGmv={display:false,position:'right',grid:{display:false}};
        opts2.plugins.legend={display:false};
        opts2.plugins.tooltip.enabled=false;
        charts['c-promo-'+p]=new Chart(cv2,{type:'line',data:{labels:pr.labels,datasets:[
          gmvShadowDs,
          {label:'Promos',data:pr.data,borderColor:col,backgroundColor:col+'18',fill:true,tension:0.35,pointBackgroundColor:col,pointRadius:4,pointHoverRadius:6,borderWidth:2.5,order:1,yAxisID:'y'}
        ]},options:opts2});
        charts['c-promo-'+p]._snackPct=true;charts['c-promo-'+p]._snackUnit='%';charts['c-promo-'+p]._syncIdx=null;
        if(!paneGroups['promo'])paneGroups['promo']=[];
        if(paneGroups['promo'].indexOf('c-promo-'+p)<0)paneGroups['promo'].push('c-promo-'+p);
        (function(id,ch){
          cv2.addEventListener('mousemove',function(e){
            var pts=ch.getElementsAtEventForMode(e,'index',{intersect:false},false);
            if(pts.length)syncPanes('promo',ch,pts[0].index,e.clientX,e.clientY);
            else hideSyncTooltip('promo');
          });
          cv2.addEventListener('mouseleave',function(){hideSyncTooltip('promo');});
        })('c-promo-'+p,charts['c-promo-'+p]);
      }
    });
  }

  window.setMktBasis=function(basis){
    mktBasis=basis;
    var ns=document.getElementById('mkt-toggle-ns');var gv=document.getElementById('mkt-toggle-gmv');
    if(ns){ns.style.background=basis==='netSales'?'var(--green)':'transparent';ns.style.color=basis==='netSales'?'#fff':'#94A3B8';}
    if(gv){gv.style.background=basis==='gmv'?'var(--green)':'transparent';gv.style.color=basis==='gmv'?'#fff':'#94A3B8';}
    drawMkt();
  };
  window.applyTrendRange=function(){
    var f=parseInt(document.getElementById('range-from').value);
    var t=parseInt(document.getElementById('range-to').value);
    if(f>t){var tmp=f;f=t;t=tmp;}rangeFrom=f;rangeTo=t;drawAll();
  };
  window.resetTrendRange=function(){
    rangeFrom=0;rangeTo=allMonths.length-1;
    document.getElementById('range-from').value=0;
    document.getElementById('range-to').value=allMonths.length-1;
    drawAll();
  };
  drawAll();
})();`;

  return '<div class="ph"><div><div class="ph-title">Trends</div><div class="ph-sub">All Portals · All Months</div></div></div>'
    +html+'<script>'+script+'<\/script>';
}

// ── Nav ───────────────────────────────────────────────
function deleteMonth(month){
  if(!confirm('Delete '+pLabel(S.portal)+' · '+month+'? This cannot be undone.')) return;
  delete S.data[dKey(S.portal,month)];
  persist();
  S.month=null;
  render();
  toast('🗑 Deleted '+pLabel(S.portal)+' · '+month);
}

function go(v) { if(v==='entry' && !isAdmin){ toast('Access restricted','err'); return; } S.view=v; render(); }
function setPortal(p) { const prevMonth=S.month; S.portal=p; S.month=(prevMonth&&S.data[dKey(p,prevMonth)])?prevMonth:null; render(); }
function setDashSplit(v){ S.dashSplit=v; render(); }
function delMonth(p,m){ if(!confirm('Delete '+pLabel(p)+' · '+m+'?'))return; delete S.data[dKey(p,m)]; fetch(SHEET_IMPORT_URL + '?action=deleteChunk&chunkKey=' + encodeURIComponent('cm2_chunk_' + dKey(p,m)), { cache: 'no-store' }); S.month=null; toast('Deleted '+m); render(); }

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

// Show loading screen while fetching server data
document.getElementById('app').innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Poppins,sans-serif;gap:16px"><div style="width:40px;height:40px;border:4px solid #e5e7eb;border-top-color:#2D6A4F;border-radius:50%;animation:spin 0.8s linear infinite"></div><div style="color:#6B7280;font-size:14px">Loading your data...</div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
load().then(() => render());
