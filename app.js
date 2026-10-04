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
  sideCollapsed: false,
  showPromoPct: false,
  showPct: false,
  ueMode: 'single',
  ueMonth: null,
  ueFrom: null,
  ueTo: null,
  ueOpen: {},
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

  const nlcPT   = nlcPortalTotals || portalTotals || {};
  const splitBy = portalTotals?.splitBy || nlcPT?.splitBy || 'netSales';

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
    const pPromos = groupPT?.promos || 0;

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

// ── Excel Export ──────────────────────────────────────
function exportAllPortalsCurrentMonth() {
  const portals = ['blinkit', 'zepto', 'instamart'];
  const sel = (S.month && MONTHS.includes(S.month)) ? S.month : null;

  const COLS = ['Portal','Month','SKU','Type','GMV (Rs)','Qty','Cost/Unit (Rs)',
    'Gross Sales (Rs)','GST (Rs)','Net Sales (Rs)','Commission (Rs)','COGS (Rs)',
    'Direct Exp (Rs)','Gross Margin (Rs)','Labour (Rs)','Logistics (Rs)',
    'CM1 (Rs)','CM1%','Promos (Rs)','Ads (Rs)','Visibility (Rs)','CM2 (Rs)','CM2%'];

  const blankRow = () => {
    const r = {}; COLS.forEach(c => r[c] = ''); return r;
  };

  const skuRow = (portal, month, sku, isNLC, c) => ({
    'Portal':            pLabel(portal),
    'Month':             month,
    'SKU':               sku.name,
    'Type':              isNLC ? 'NLC' : (sku.custom ? 'Custom' : 'Regular'),
    'GMV (Rs)':          +c.gmv.toFixed(2),
    'Qty':               +c.qty,
    'Cost/Unit (Rs)':    +(+c.cost || 0).toFixed(2),
    'Gross Sales (Rs)':  +c.grossSales.toFixed(2),
    'GST (Rs)':          +c.taxAmt.toFixed(2),
    'Net Sales (Rs)':    +c.netSales.toFixed(2),
    'Commission (Rs)':   +c.commission.toFixed(2),
    'COGS (Rs)':         +c.cogs.toFixed(2),
    'Direct Exp (Rs)':   +c.directExp.toFixed(2),
    'Gross Margin (Rs)': +c.grossMargin.toFixed(2),
    'Labour (Rs)':       +c.labour.toFixed(2),
    'Logistics (Rs)':    +c.logistics.toFixed(2),
    'CM1 (Rs)':          +c.cm1.toFixed(2),
    'CM1%':              c.cm1Pct / 100,
    'Promos (Rs)':       +c.promos.toFixed(2),
    'Ads (Rs)':          +c.ads.toFixed(2),
    'Visibility (Rs)':   +c.vis.toFixed(2),
    'CM2 (Rs)':          +c.cm2.toFixed(2),
    'CM2%':              c.cm2Pct / 100,
  });

  const totalRow = (portal, month, t) => ({
    'Portal': pLabel(portal), 'Month': month, 'SKU': '\u25B6 TOTAL', 'Type': '',
    'GMV (Rs)': +t.gmv.toFixed(2), 'Qty': +t.qty, 'Cost/Unit (Rs)': '',
    'Gross Sales (Rs)': +t.grossSales.toFixed(2), 'GST (Rs)': +t.taxAmt.toFixed(2),
    'Net Sales (Rs)': +t.netSales.toFixed(2), 'Commission (Rs)': +t.commission.toFixed(2),
    'COGS (Rs)': +t.cogs.toFixed(2), 'Direct Exp (Rs)': +t.directExp.toFixed(2),
    'Gross Margin (Rs)': +t.grossMargin.toFixed(2), 'Labour (Rs)': +t.labour.toFixed(2),
    'Logistics (Rs)': +t.logistics.toFixed(2), 'CM1 (Rs)': +t.cm1.toFixed(2),
    'CM1%': t.cm1Pct / 100, 'Promos (Rs)': +t.promos.toFixed(2),
    'Ads (Rs)': +t.ads.toFixed(2), 'Visibility (Rs)': +t.vis.toFixed(2),
    'CM2 (Rs)': +t.cm2.toFixed(2), 'CM2%': t.cm2Pct / 100,
  });

  // ── Sheet 1: SKU breakdown ────────────────────────────
  const allRows = [];
  let anyData = false;
  const exportMonths = {}; // track which month each portal exported

  // Shared config rates (same across all portals)
  const sharedCfg = S.config[portals[0]];

  portals.forEach((portal, pi) => {
    const months = monthsFor(portal);
    const month = (sel && months.includes(sel)) ? sel
      : months.length ? months[months.length - 1] : null;
    if (!month) return;
    exportMonths[portal] = month;

    const e    = S.data[dKey(portal, month)] || {};
    const cfg  = e.config || S.config[portal];
    const pt   = Object.assign({}, e.portalTotals || {}, { splitBy: S.dashSplit });
    const nlcPT= Object.assign({}, e.nlcTotals || {}, { splitBy: S.dashSplit });
    const regSkus = e.skus    || [];
    const nlcSkus = e.nlcSkus || [];

    function rawWeights(arr, isNLC) {
      return arr.map(s => { const c = calcSKU(s, cfg, isNLC, 0, 0, 0); return { netSales: c.netSales, qty: c.qty || (+s.qty || 0) }; });
    }
    const regRaw = rawWeights(regSkus, false);
    const nlcRaw = rawWeights(nlcSkus, true);
    const splitBy = S.dashSplit;
    const regW = splitBy === 'qty' ? regRaw.reduce((a,v)=>a+(v.qty||0),0) : regRaw.reduce((a,v)=>a+(v.netSales||0),0);
    const nlcW = splitBy === 'qty' ? nlcRaw.reduce((a,v)=>a+(v.qty||0),0) : nlcRaw.reduce((a,v)=>a+(v.netSales||0),0);
    const pAds = pt.ads||0, pVis = pt.vis||0, pPromos = pt.promos||0;
    const nAds = nlcPT.ads||0, nVis = nlcPT.vis||0, nPromos = nlcPT.promos||0;

    // blank row before each portal (except first)
    if (pi > 0) allRows.push(blankRow());

    function buildSkuRows(arr, isNLC, rawArr, totalW, adsP, visP, promosP) {
      arr.forEach((sku, idx) => {
        const raw = rawArr[idx];
        const w = splitBy === 'qty' ? (raw.qty||0) : (raw.netSales||0);
        const share = totalW > 0 ? w / totalW : 0;
        const aA = blankOrUndef(sku.ads)        ? adsP    * share : 0;
        const vA = blankOrUndef(sku.visibility) ? visP    * share : 0;
        const pA = blankOrUndef(sku.promos)     ? promosP * share : 0;
        const c  = calcSKU(sku, cfg, isNLC, aA, vA, pA);
        anyData = true;
        const row = skuRow(portal, month, sku, isNLC, c);
        row['CM1%'] = c.cm1Pct / 100;
        row['CM2%'] = c.cm2Pct / 100;
        allRows.push(row);
      });
    }

    buildSkuRows(regSkus, false, regRaw, regW, pAds, pVis, pPromos);
    buildSkuRows(nlcSkus, true,  nlcRaw, nlcW, nAds, nVis, nPromos);

    const t = totals(regSkus, nlcSkus, cfg, pt, nlcPT);
    const tr = totalRow(portal, month, t);
    tr['CM1%'] = t.cm1Pct / 100;
    tr['CM2%'] = t.cm2Pct / 100;
    allRows.push(tr);
  });

  if (!anyData) { toast('No data found for selected month', 'err'); return; }

  // ── Sheet 2: Combined view ────────────────────────────
  const COMB_COLS = ['Portal','Month','GMV (Rs)','Net Sales (Rs)','Gross Margin (Rs)',
    'CM1 (Rs)','CM1% Net Sales','CM1% GMV','Promos (Rs)','Ads+Vis (Rs)',
    'CM2 (Rs)','CM2% Net Sales','CM2% GMV'];

  const combBlank = () => { const r = {}; COMB_COLS.forEach(c => r[c] = ''); return r; };

  const combRows = [];
  const combAcc = { gmv:0, netSales:0, grossMargin:0, cm1:0, cm2:0, promos:0, ads:0, vis:0 };

  portals.forEach((portal, pi) => {
    const month = exportMonths[portal];
    if (!month) return;
    const e   = S.data[dKey(portal, month)] || {};
    const cfg = e.config || S.config[portal];
    const pt  = Object.assign({}, e.portalTotals || {}, { splitBy: S.dashSplit });
    const nlcPT = Object.assign({}, e.nlcTotals || {}, { splitBy: S.dashSplit });
    const t = totals(e.skus||[], e.nlcSkus||[], cfg, pt, nlcPT);

    const cm1net = t.netSales > 0 ? t.cm1/t.netSales : 0;
    const cm1gmv = t.gmv      > 0 ? t.cm1/t.gmv      : 0;
    const cm2net = t.netSales > 0 ? t.cm2/t.netSales : 0;
    const cm2gmv = t.gmv      > 0 ? t.cm2/t.gmv      : 0;

    if (pi > 0) combRows.push(combBlank());

    combRows.push({
      'Portal':           pLabel(portal),
      'Month':            month,
      'GMV (Rs)':         +t.gmv.toFixed(2),
      'Net Sales (Rs)':   +t.netSales.toFixed(2),
      'Gross Margin (Rs)':+t.grossMargin.toFixed(2),
      'CM1 (Rs)':         +t.cm1.toFixed(2),
      'CM1% Net Sales':   cm1net,
      'CM1% GMV':         cm1gmv,
      'Promos (Rs)':      +t.promos.toFixed(2),
      'Ads+Vis (Rs)':     +(t.ads + t.vis).toFixed(2),
      'CM2 (Rs)':         +t.cm2.toFixed(2),
      'CM2% Net Sales':   cm2net,
      'CM2% GMV':         cm2gmv,
    });

    combAcc.gmv          += t.gmv;
    combAcc.netSales     += t.netSales;
    combAcc.grossMargin  += t.grossMargin;
    combAcc.cm1          += t.cm1;
    combAcc.cm2          += t.cm2;
    combAcc.promos       += t.promos;
    combAcc.ads          += t.ads + t.vis;
  });

  // Combined grand total
  const cCM1net = combAcc.netSales > 0 ? combAcc.cm1/combAcc.netSales : 0;
  const cCM1gmv = combAcc.gmv      > 0 ? combAcc.cm1/combAcc.gmv      : 0;
  const cCM2net = combAcc.netSales > 0 ? combAcc.cm2/combAcc.netSales : 0;
  const cCM2gmv = combAcc.gmv      > 0 ? combAcc.cm2/combAcc.gmv      : 0;
  combRows.push(combBlank());
  combRows.push({
    'Portal':            'ALL PORTALS',
    'Month':             sel || '',
    'GMV (Rs)':          +combAcc.gmv.toFixed(2),
    'Net Sales (Rs)':    +combAcc.netSales.toFixed(2),
    'Gross Margin (Rs)': +combAcc.grossMargin.toFixed(2),
    'CM1 (Rs)':          +combAcc.cm1.toFixed(2),
    'CM1% Net Sales':    cCM1net,
    'CM1% GMV':          cCM1gmv,
    'Promos (Rs)':       +combAcc.promos.toFixed(2),
    'Ads+Vis (Rs)':      +combAcc.ads.toFixed(2),
    'CM2 (Rs)':          +combAcc.cm2.toFixed(2),
    'CM2% Net Sales':    cCM2net,
    'CM2% GMV':          cCM2gmv,
  });

  function applyPctFormat(ws, header, pctCols) {
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    const colIdx = {};
    header.forEach((h, i) => { colIdx[h] = i; });
    pctCols.forEach(colName => {
      const ci = colIdx[colName];
      if (ci === undefined) return;
      for (let r = range.s.r + 1; r <= range.e.r; r++) {
        const addr = XLSX.utils.encode_cell({ r, c: ci });
        if (ws[addr] && typeof ws[addr].v === 'number') {
          ws[addr].z = '0.00%';
          ws[addr].t = 'n';
        }
      }
    });
  }

  function doExport() {
    const wb = XLSX.utils.book_new();

    // Sheet 1 — metrics block first (AOA), then headers, then data rows
    // metricsAoa: rows 0-4 = content, row 5 = blank, row 6 = blank
    // data starts at row 7 (0-indexed) = Excel row 8
    const metricsAoa = [
      ['CM2 Calculation Metrics'],
      ['Metric', 'Value'],
      ['Direct Exp %', sharedCfg.directExp / 100],
      ['Labour %',     sharedCfg.labour    / 100],
      ['Logistics %',  sharedCfg.logistics  / 100],
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(metricsAoa);
    // Apply % format to value cells (col B, rows 3-5)
    ['B3','B4','B5'].forEach(addr => {
      if (ws1[addr]) { ws1[addr].z = '0.00%'; ws1[addr].t = 'n'; }
    });
    // Append header + data starting at row 8 (0-indexed row 7), leaving row 6&7 blank
    XLSX.utils.sheet_add_json(ws1, allRows, { header: COLS, skipHeader: false, origin: { r: 7, c: 0 } });
    ws1['!cols'] = [
      {wch:12},{wch:14},{wch:50},{wch:10},
      {wch:14},{wch:8},{wch:14},{wch:16},{wch:12},{wch:16},{wch:16},
      {wch:12},{wch:14},{wch:16},{wch:12},{wch:14},{wch:12},{wch:8},
      {wch:14},{wch:12},{wch:16},{wch:12},{wch:8},
    ];
    // Apply % format to CM1%/CM2% columns in data section
    applyPctFormat(ws1, COLS, ['CM1%', 'CM2%']);
    XLSX.utils.book_append_sheet(wb, ws1, 'SKU Breakdown');

    // Sheet 2
    const ws2 = XLSX.utils.json_to_sheet(combRows, { header: COMB_COLS });
    ws2['!cols'] = [
      {wch:14},{wch:14},{wch:14},{wch:16},{wch:16},
      {wch:12},{wch:16},{wch:12},{wch:14},{wch:14},
      {wch:12},{wch:16},{wch:12},
    ];
    applyPctFormat(ws2, COMB_COLS, ['CM1% Net Sales','CM1% GMV','CM2% Net Sales','CM2% GMV']);
    XLSX.utils.book_append_sheet(wb, ws2, 'Combined View');

    const month = allRows[0]?.Month || 'Export';
    XLSX.writeFile(wb, 'Snackible_CM2_' + month.replace(/ /g, '_') + '.xlsx');
    toast('✅ Excel exported!');
  }

  if (typeof XLSX !== 'undefined') {
    doExport();
  } else {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload = doExport;
    s.onerror = () => toast('Failed to load XLSX library', 'err');
    document.head.appendChild(s);
  }
}

// ── Sidebar ───────────────────────────────────────────
function sidebar() {
  const nv=(v,ic,lb)=>'<div class="nav-item'+(S.view===v?' active':'')+'" onclick="go(\''+v+'\')" title="'+lb+'"><span class="nav-icon">'+ic+'</span><span class="sb-lbl">'+lb+'</span></div>';
  const cp=(p,ic,lb)=>'<div class="pchip '+p+(S.portal===p?' active':'')+'" onclick="setPortal(\''+p+'\')" title="'+lb+'">'+ic+'<span class="sb-lbl"> '+lb+'</span></div>';
  const tgl='<button class="sb-toggle" onclick="toggleSidebar()" title="'+(S.sideCollapsed?'Expand':'Collapse')+' sidebar">'+(S.sideCollapsed?'»':'«')+'</button>';
  return '<div class="sidebar'+(S.sideCollapsed?' collapsed':'')+'"><div class="logo sb-logo"><div class="sb-lbl"><div class="logo-brand">Snackible</div><div class="logo-sub">QCom CM2</div></div>'+tgl+'</div><div class="sec-label">Views</div>'+nv('dashboard','📊','Dashboard')+(isAdmin?nv('entry','➕','Enter Data'):'')+nv('combined','🔀','Combined')+nv('trends','📈','Trends')+nv('unit','🧮','Unit Economics')+nv('insights','🤖','AI Insights')+'<div class="sec-label">Portal</div><div class="portal-chips">'+cp('blinkit','🟡','Blinkit')+cp('zepto','🟠','Zepto')+cp('instamart','🔵','Instamart')+'</div><div class="sec-label">Links</div><a href="https://snackible-cm-2-projections.vercel.app/" target="_blank" class="pchip" style="text-decoration:none;display:block;color:rgba(255,255,255,.6)" title="Projections">🔮<span class="sb-lbl"> Projections ↗</span></a></div>';
}

// ── SKU LEADERS ───────────────────────────────────────
function skuLeaders(dAllSkus, cfg, dRawVals, regTotalW, nlcTotalW, pAds, pVis, pPromos, nAds, nVis, nPromos) {
  const splitBy = S.dashSplit;
  const skuCalcs = dAllSkus.map(({s:sku, n:isNLC}, idx) => {
    const raw = dRawVals[idx];
    const w = splitBy==='qty' ? (raw.qty||0) : (raw.netSales||0);
    const totalW = isNLC ? nlcTotalW : regTotalW;
    const share = totalW > 0 ? w/totalW : 0;
    const aA = blankOrUndef(sku.ads)        ? (isNLC?nAds:pAds)*share : 0;
    const vA = blankOrUndef(sku.visibility) ? (isNLC?nVis:pVis)*share : 0;
    const pA = blankOrUndef(sku.promos)     ? (isNLC?nPromos:pPromos)*share : 0;
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

// ── Dashboard table helpers ───────────────────────────
// Promo % sub-row shown below each SKU row (hidden until toggled)
function promoSubRow(c){
  const g = c.gmv>0 ? fmtPct(c.promos/c.gmv*100) : '—';
  const n = c.netSales>0 ? fmtPct(c.promos/c.netSales*100) : '—';
  let cells='<td class="ps-lbl">↳ Promo %</td>';
  for(let i=1;i<18;i++){
    cells += i===13
      ? '<td class="r ps-val"><span>'+g+' <small>GMV</small></span><span>'+n+' <small>NS</small></span></td>'
      : '<td></td>';
  }
  return '<tr class="promo-sub">'+cells+'</tr>';
}
// % rows below a total: Direct Exp, Labour, Logistics as % of NS; Promos, Ads, Vis as % of GMV and NS
function pctRows(t){
  if(!t) return '';
  const pg = v => t.gmv>0 ? fmtPct(v/t.gmv*100) : '—';
  const pn = v => t.netSales>0 ? fmtPct(v/t.netSales*100) : '—';
  const gmvMap = {13:pg(t.promos),14:pg(t.ads),15:pg(t.vis)};
  const nsMap  = {7:pn(t.directExp),9:pn(t.labour),10:pn(t.logistics),13:pn(t.promos),14:pn(t.ads),15:pn(t.vis)};
  const mk=(label,map)=>{
    let cells='<td>'+label+'</td>';
    for(let i=1;i<18;i++) cells+='<td class="r">'+(map[i]||'')+'</td>';
    return '<tr class="pct-row">'+cells+'</tr>';
  };
  return mk('% of GMV',gmvMap)+mk('% of Net Sales',nsMap);
}
// Expand button row placed right below Grand Total; it also expands subtotal % rows
function pctToggleRow(){
  let cells='<td><button id="pct-btn" class="pct-btn" onclick="togglePct()">'+(S.showPct?'▴ Hide %':'▾ Show %')+'</button></td>';
  for(let i=1;i<18;i++) cells+='<td></td>';
  return '<tr class="pct-toggle">'+cells+'</tr>';
}
function togglePct(){
  S.showPct=!S.showPct;
  const tb=document.querySelector('.dash-tbl'); if(tb) tb.classList.toggle('show-pct',S.showPct);
  const b=document.getElementById('pct-btn'); if(b) b.textContent=S.showPct?'▴ Hide %':'▾ Show %';
}
// KPI strip shown only in expanded (fullscreen) view
function fsStrip(t,sel){
  const chip=(lb,val,sub,cls)=>'<div class="fs-chip"><div class="fs-chip-lb">'+lb+'</div><div class="fs-chip-val '+(cls||'')+'">'+val+'</div>'+(sub?'<div class="fs-chip-sub">'+sub+'</div>':'')+'</div>';
  return '<div class="fs-strip">'
    +'<div class="fs-meta">'+pBadge(S.portal)+'<span class="fs-month">'+sel+'</span></div>'
    +'<div class="fs-chips">'
    +chip('GMV','₹'+fmt(t.gmv))
    +chip('Net Sales','₹'+fmt(t.netSales))
    +chip('CM1','₹'+fmt(t.cm1),fmtPct(t.cm1Pct)+' NS · '+fmtPct(t.gmv>0?t.cm1/t.gmv*100:0)+' GMV',pc(t.cm1Pct))
    +chip('CM2','₹'+fmt(t.cm2),fmtPct(t.cm2Pct)+' NS · '+fmtPct(t.gmv>0?t.cm2/t.gmv*100:0)+' GMV',pc(t.cm2Pct))
    +'</div></div>';
}
// Expand the SKU table to true fullscreen; falls back to a full-window overlay
function toggleSkuFullscreen(){
  const card=document.getElementById('sku-card'); if(!card) return;
  const fsEl=document.fullscreenElement||document.webkitFullscreenElement;
  if(fsEl){ (document.exitFullscreen||document.webkitExitFullscreen).call(document); return; }
  if(card.classList.contains('is-fs')){ setSkuFs(false); return; }
  const req=card.requestFullscreen||card.webkitRequestFullscreen;
  if(req){
    try{ const pr=req.call(card); if(pr&&pr.catch) pr.catch(()=>setSkuFs(true)); }
    catch(e){ setSkuFs(true); }
  } else setSkuFs(true);
}
function setSkuFs(on){
  const card=document.getElementById('sku-card'); if(!card) return;
  card.classList.toggle('is-fs',on);
  document.body.style.overflow=on?'hidden':'';
  const b=document.getElementById('fs-btn'); if(b) b.textContent=on?'✕ Exit':'⛶ Expand';
}
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{
  const fsEl=document.fullscreenElement||document.webkitFullscreenElement;
  setSkuFs(!!fsEl && fsEl.id==='sku-card');
}));
document.addEventListener('keydown',e=>{
  const card=document.getElementById('sku-card');
  if(e.key==='Escape'&&card&&card.classList.contains('is-fs')&&!document.fullscreenElement) setSkuFs(false);
});
function togglePromoPct(){
  S.showPromoPct=!S.showPromoPct;
  const tb=document.querySelector('.dash-tbl'); if(tb) tb.classList.toggle('show-promo',S.showPromoPct);
  const b=document.getElementById('promo-pct-btn'); if(b) b.textContent=(S.showPromoPct?'▴ Hide':'▾ Show')+' Promo %';
}
function toggleSidebar(){ S.sideCollapsed=!S.sideCollapsed; render(); }

// Shared KPI mini grid: This month / Prev / MoM / 3M avg (agg=null hides 3M row)
function kpiGridHTML(cols,cost,t,prev,prevLbl,agg,hideAgg){
  const cellVal=(col,src,isAgg)=>{
    if(!src) return null;
    if(col.type==='amt'){ const v=col.val(src); return isAgg?v/src.n:v; }
    const d=col.den(src); return d>0?col.num(src)/d*100:null;
  };
  const multi=cols.length>1;
  const hasPct=cols.some(c=>c.type==='pct');
  const fA=multi?fmtL:(v=>'₹'+fmt(v));
  const fmtCell=(col,v)=>v===null?'—':(col.type==='amt'?fA(v):fmtPct(v));
  let h='<table class="kpi-grid">';
  if(multi) h+='<tr><th></th>'+cols.map(c=>'<th>'+c.h+'</th>').join('')+'</tr>';
  if(hasPct) h+='<tr class="kg-now"><td>Current</td>'+cols.map(c=>'<td>'+(c.type==='amt'?'':fmtPct(cellVal(c,t)))+'</td>').join('')+'</tr>';
  h+='<tr><td>'+prevLbl+'</td>'+cols.map(c=>'<td>'+fmtCell(c,cellVal(c,prev))+'</td>').join('')+'</tr>';
  h+='<tr><td>Change</td>'+cols.map(c=>{
    const cur=cellVal(c,t), pv=cellVal(c,prev);
    if(cur===null||pv===null) return '<td>—</td>';
    let d, txt;
    if(c.type==='amt'){ if(!pv) return '<td>—</td>'; d=(cur-pv)/Math.abs(pv)*100; txt=Math.abs(d).toFixed(1)+'%'; }
    else { d=cur-pv; txt=Math.abs(d).toFixed(1)+'pp'; }
    const good=cost?d<=0:d>=0;
    return '<td class="'+(good?'kg-up':'kg-dn')+'">'+(d>=0?'▲ ':'▼ ')+txt+'</td>';
  }).join('')+'</tr>';
  if(!hideAgg) h+='<tr><td>3M avg'+(agg&&agg.n<3?' ('+agg.n+'M)':'')+'</td>'+cols.map(c=>'<td>'+fmtCell(c,cellVal(c,agg,true))+'</td>').join('')+'</tr>';
  return h+'</table>';
}
// Combined (all portals) totals for one month, same basis as Combined view
function combMonthTotals(m){
  const keys=['gmv','netSales','grossMargin','logistics','cm1','cm2','promos','ads','vis'];
  const acc={}; keys.forEach(k=>acc[k]=0); let any=false;
  ['blinkit','zepto','instamart'].forEach(p=>{
    const e=S.data[dKey(p,m)]; if(!e) return;
    const t=totals(e.skus,e.nlcSkus,e.config||S.config[p],e.portalTotals,e.nlcTotals);
    keys.forEach(k=>acc[k]+=t[k]||0); any=true;
  });
  return any?acc:null;
}
function sumTotals(list){
  if(!list.length) return null;
  const keys=['gmv','netSales','grossMargin','logistics','cm1','cm2','promos','ads','vis'];
  const a={n:list.length}; keys.forEach(k=>a[k]=list.reduce((x,y)=>x+(y[k]||0),0)); return a;
}
// Top 4 KPI cards for Combined view (single month: prev month + 3M avg; range: prev equal period)
function combKpiCards(comb,selMonths,mode){
  if(mode!=='single'){
    // Range mode: original simple cards (no detail grid)
    const c1=comb.netSales>0?comb.cm1/comb.netSales*100:0, c2=comb.netSales>0?comb.cm2/comb.netSales*100:0;
    const g1=comb.gmv>0?comb.cm1/comb.gmv*100:0, g2=comb.gmv>0?comb.cm2/comb.gmv*100:0;
    return '<div class="g4 mb20"><div class="card stat"><div class="lbl">Total GMV</div><div class="val pos">₹'+fmt(comb.gmv)+'</div></div>'
      +'<div class="card stat"><div class="lbl">Net Sales</div><div class="val">₹'+fmt(comb.netSales)+'</div></div>'
      +'<div class="card stat"><div class="lbl">CM1</div><div class="val '+pc(c1)+'">₹'+fmt(comb.cm1)+'</div><div class="sub">'+fmtPct(c1)+' Net Sales · '+fmtPct(g1)+' GMV</div></div>'
      +'<div class="card stat"><div class="lbl">CM2</div><div class="val '+pc(c2)+'">₹'+fmt(comb.cm2)+'</div><div class="sub">'+fmtPct(c2)+' Net Sales · '+fmtPct(g2)+' GMV</div></div></div>';
  }
  const firstIdx=MONTHS.indexOf(selMonths[0]);
  const len=selMonths.length;
  let prev=null, prevLbl='Prev', agg=null, hideAgg=false;
  if(mode==='single'){
    const pm=firstIdx>0?MONTHS[firstIdx-1]:null;
    prev=pm?combMonthTotals(pm):null; prevLbl=pm?'Prev ('+pm.slice(0,3)+')':'Prev';
    const win=[]; for(let i=firstIdx-3;i<firstIdx;i++){ if(i>=0){ const x=combMonthTotals(MONTHS[i]); if(x) win.push(x); } }
    agg=sumTotals(win);
  } else {
    const list=[]; for(let i=firstIdx-len;i<firstIdx;i++){ if(i>=0){ const x=combMonthTotals(MONTHS[i]); if(x) list.push(x); } }
    prev=sumTotals(list); prevLbl='Prev '+len+'M'; hideAgg=true;
  }
  const amt=(h,f)=>({h:h,type:'amt',val:f});
  const pct=(h,n,d)=>({h:h,type:'pct',num:n,den:d});
  const NS=x=>x.netSales, GMV=x=>x.gmv;
  const card=(lbl,val,cls,cols)=>'<div class="card stat"><div class="lbl">'+lbl+'</div><div class="val '+(cls||'')+'">₹'+fmt(val)+'</div>'+kpiGridHTML(cols,false,comb,prev,prevLbl,agg,hideAgg)+'</div>';
  const c1=comb.netSales>0?comb.cm1/comb.netSales*100:0, c2=comb.netSales>0?comb.cm2/comb.netSales*100:0;
  return '<div class="g4 mb20">'
    +card('Total GMV',comb.gmv,'',[amt('₹',GMV)])
    +card('Net Sales',comb.netSales,'',[amt('₹',NS)])
    +card('CM1',comb.cm1,pc(c1),[amt('₹',x=>x.cm1),pct('% NS',x=>x.cm1,NS),pct('% GMV',x=>x.cm1,GMV)])
    +card('CM2',comb.cm2,pc(c2),[amt('₹',x=>x.cm2),pct('% NS',x=>x.cm2,NS),pct('% GMV',x=>x.cm2,GMV)])
    +'</div>';
}

// ── KPI cards (current vs prev month vs 3 month avg) ──
// Totals for a portal-month using the same allocation basis as the dashboard
function dashMonthTotals(p,m){
  const e=S.data[dKey(p,m)]; if(!e) return null;
  const cfg=e.config||S.config[p];
  const pt=Object.assign({},e.portalTotals||{},{splitBy:S.dashSplit});
  const np=Object.assign({},e.nlcTotals||{},{splitBy:S.dashSplit});
  return totals(e.skus,e.nlcSkus,cfg,pt,np);
}
// Compact rupee format for multi-column grids: ₹37.9L / ₹1.79Cr
function fmtL(n){
  const a=Math.abs(n), sg=n<0?'-':'';
  if(a>=1e7) return '₹'+sg+(a/1e7).toFixed(2)+'Cr';
  if(a>=1e5) return '₹'+sg+(a/1e5).toFixed(1)+'L';
  return '₹'+sg+fmt(a);
}
function kpiCards(t,sel){
  const idx=MONTHS.indexOf(sel);
  const prevM=idx>0?MONTHS[idx-1]:null;
  const prev=prevM?dashMonthTotals(S.portal,prevM):null;
  // 3 calendar months before current, weighted (sum of amounts / sum of base)
  const win=[];
  for(let i=idx-3;i<idx;i++){ if(i>=0){ const x=dashMonthTotals(S.portal,MONTHS[i]); if(x) win.push(x); } }
  const keys=['gmv','netSales','grossMargin','logistics','cm1','cm2','promos','ads','vis'];
  let agg=null;
  if(win.length){ agg={n:win.length}; keys.forEach(k=>{ agg[k]=win.reduce((a,x)=>a+(x[k]||0),0); }); }

  const grid=(cols,cost)=>kpiGridHTML(cols,cost,t,prev,prevM?'Prev ('+prevM.slice(0,3)+')':'Prev',agg);
  const amt=(h,f)=>({h:h,type:'amt',val:f});
  const pct=(h,n,d)=>({h:h,type:'pct',num:n,den:d});
  const NS=x=>x.netSales, GMV=x=>x.gmv;
  const card=(lbl,val,cls,cols,cost,bar)=>'<div class="card stat"><div class="lbl">'+lbl+'</div><div class="val '+(cls||'')+'">₹'+fmt(val)+'</div>'+grid(cols,cost)+'</div>';
  const adsVis=x=>x.ads+x.vis;

  return '<div class="g4 mb20">'
    +card('Total GMV',t.gmv,'',[amt('₹',GMV)],false,pColor(S.portal))
    +card('Net Sales',t.netSales,'',[amt('₹',NS)],false,'var(--mint)')
    +card('CM1',t.cm1,pc(t.cm1Pct),[amt('₹',x=>x.cm1),pct('% NS',x=>x.cm1,NS),pct('% GMV',x=>x.cm1,GMV)],false,'var(--blue)')
    +card('CM2',t.cm2,pc(t.cm2Pct),[amt('₹',x=>x.cm2),pct('% NS',x=>x.cm2,NS),pct('% GMV',x=>x.cm2,GMV)],false,(t.cm2Pct>=0?'var(--pos)':'var(--neg)'))
    +'</div><div class="g4 mb20">'
    +card('Logistics',t.logistics,'warn',[amt('₹',x=>x.logistics),pct('% NS',x=>x.logistics,NS)],true)
    +card('Gross Margin',t.grossMargin,'',[amt('₹',x=>x.grossMargin),pct('% NS',x=>x.grossMargin,NS)],false)
    +card('Promos',t.promos,'warn',[amt('₹',x=>x.promos),pct('% NS',x=>x.promos,NS),pct('% GMV',x=>x.promos,GMV)],true)
    +card('Ads + Visibility',t.ads+t.vis,'warn',[amt('₹',adsVis),pct('% NS',adsVis,NS),pct('% GMV',adsVis,GMV)],true)
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
  // Use MONTHS order for correct chronological prev month
  const selIdxGlobal = MONTHS.indexOf(sel);
  const prev = selIdxGlobal > 0 ? MONTHS.slice(0, selIdxGlobal).reverse().find(m => S.data[dKey(S.portal, m)]) : null;
  if (prev){ const pe=S.data[dKey(S.portal,prev)]||{}; const pCfg=pe.config||cfg; const pPT=Object.assign({},pe.portalTotals||{},{splitBy:S.dashSplit}); const pNlcPT=Object.assign({},pe.nlcTotals||pe.portalTotals||{}); const pt=totals(pe.skus,pe.nlcSkus,pCfg,pPT,pNlcPT); mom={gmv:pt.gmv>0?(t.gmv-pt.gmv)/pt.gmv*100:null,cm1Pct:t.cm1Pct-pt.cm1Pct,cm2Pct:t.cm2Pct-pt.cm2Pct}; }
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
  const nAds=nlcPT.ads||0, nVis=nlcPT.vis||0, nPromos=nlcPT.promos||0;

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
      +'</tr>'+promoSubRow(c);
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
    +'</tr>'+pctRows(tReg) : '';

  // NLC section header + rows
  const nlcSectionHdr = dNlcSkus.length > 0 ? '<tr style="background:#DCEEFF"><td colspan="18" style="font-size:11px;font-weight:700;color:#235D8A;padding:6px 8px;letter-spacing:.04em">NLC SKUs</td></tr>' : '';
  const nlcRows=dNlcSkus.map(({s:sku},idx)=>{
    const raw=dNlcRaw[idx];
    const w=splitBy==='qty'?(raw.qty||0):(raw.netSales||0);
    const share=nlcTotalW>0?w/nlcTotalW:0;
    const aA=blankOrUndef(sku.ads)        ? nAds*share : 0;
    const vA=blankOrUndef(sku.visibility) ? nVis*share : 0;
    const pA=blankOrUndef(sku.promos)     ? nPromos*share : 0;
    const c=calcSKU(sku,cfg,true,aA,vA,pA);
    return '<tr style="background:#F0F7FF">'
      +'<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="'+sku.name+'"><span class="ntag">NLC</span> '+shortN(sku.name)+'</td>'
      +'<td class="r nlc-ref" title="Reference only, not used in calculations">₹'+fmt(c.gmv)+'</td>'
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
      +'</tr>'+promoSubRow(c);
  }).join('');

  // NLC subtotal
  const tNlc = dNlcSkus.length > 0 ? totals([], e.nlcSkus||[], cfg, nlcPT, nlcPT) : null;
  const nlcSubtotal = tNlc ? '<tr class="gt" style="background:#DCEEFF">'
    +'<td>NLC Subtotal</td>'
    +'<td class="r nlc-ref" title="Reference only, not used in calculations">₹'+fmt(tNlc.gmv)+'</td>'
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
    +'<td class="r">₹'+fmt(tNlc.promos)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.ads)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.vis)+'</td>'
    +'<td class="r">₹'+fmt(tNlc.cm2)+'</td>'
    +'<td class="c"><span class="pill '+pc(tNlc.cm2Pct)+'">'+fmtPct(tNlc.cm2Pct)+'</span></td>'
    +'</tr>'+pctRows(tNlc) : '';

  const rows = regRows + regSubtotal + nlcSectionHdr + nlcRows + nlcSubtotal;
  const splitToggle='<div style="display:flex;gap:0;border:1.5px solid var(--border);border-radius:6px;overflow:hidden">'
    +'<button onclick="setDashSplit(\'netSales\')" style="padding:5px 11px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(S.dashSplit==='netSales'?'var(--green)':'#fff')+';color:'+(S.dashSplit==='netSales'?'#fff':'var(--tx3)')+'">Net Sales</button>'
    +'<button onclick="setDashSplit(\'qty\')" style="padding:5px 11px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(S.dashSplit==='qty'?'var(--green)':'#fff')+';color:'+(S.dashSplit==='qty'?'#fff':'var(--tx3)')+'">Qty Sold</button>'
    +'</div>';
  const msel='<select class="msel" onchange="S.month=this.value;render()">'+months.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('')+'</select>';

  return '<div class="ph"><div><div class="ph-title">Dashboard</div><div class="ph-sub">'+pLabel(S.portal)+' · '+sel+'</div></div><div class="ph-right" style="gap:8px">'+pBadge(S.portal)+' '+splitToggle+' '+msel+(isAdmin?'<button class="btn btn-yellow" onclick="go(\'entry\')">+ New Month</button>':'')
+'<button class="btn btn-outline btn-sm" onclick="exportAllPortalsCurrentMonth()" style="background:#fff;border:1.5px solid var(--green);color:var(--green);font-weight:600;white-space:nowrap">📥 Export Excel</button>'
+'</div></div>'
  +kpiCards(t,sel)
  +skuLeaders(dAllSkus,cfg,dRawVals,regTotalW,nlcTotalW,pAds,pVis,pPromos,nAds,nVis,nPromos)
  +'<div class="card tcard sku-card" id="sku-card"><div class="thead-row"><div class="thead-title">SKU Breakdown · '+sel+'</div><div class="flex gap8">'+(isAdmin?'<button class="btn btn-outline btn-sm" onclick="S.month=\''+sel+'\';go(\'entry\')">✏️ Edit</button><button class="btn btn-sm" style="background:#FEE2E2;color:#DC2626;border:1px solid #FECACA" onclick="deleteMonth(\''+sel+'\')">🗑 Delete Month</button>':'')+'<button id="promo-pct-btn" class="btn btn-outline btn-sm" onclick="togglePromoPct()">'+(S.showPromoPct?'▴ Hide':'▾ Show')+' Promo %</button><button id="fs-btn" class="btn btn-sm fs-btn" onclick="toggleSkuFullscreen()">⛶ Expand</button></div></div>'+fsStrip(t,sel)+'<div class="twrap"><table class="dash-tbl'+(S.showPromoPct?' show-promo':'')+(S.showPct?' show-pct':'')+'"><thead><tr>'
  +'<th>SKU</th><th class="r">GMV</th><th class="r">Gross Sales</th><th class="r">Net Sales</th><th class="r">Qty</th><th class="r">Cost/Unit</th><th class="r">COGS</th><th class="r">Direct Exp</th><th class="r">Gross Margin</th><th class="r">Labour</th><th class="r">Logistics</th><th class="r">CM1 ₹</th><th class="c">CM1%</th><th class="r">Promos</th><th class="r">Ads</th><th class="r">Visibility</th><th class="r">CM2 ₹</th><th class="c">CM2%</th>'
  +'</tr></thead><tbody>'+(rows||emptyRow(18,'No SKUs'))
  +'<tr class="gt"><td>Grand Total</td><td class="r">₹'+fmt(t.gmv)+'</td><td class="r">₹'+fmt(t.grossSales)+'</td><td class="r">₹'+fmt(t.netSales)+'</td><td class="r">'+fmt(t.qty)+'</td><td class="r">—</td><td class="r">₹'+fmt(t.cogs)+'</td><td class="r">₹'+fmt(t.directExp)+'</td><td class="r">₹'+fmt(t.grossMargin)+'</td><td class="r">₹'+fmt(t.labour)+'</td><td class="r">₹'+fmt(t.logistics)+'</td><td class="r">₹'+fmt(t.cm1)+'</td><td class="c"><span class="pill '+pc(t.cm1Pct)+'">'+fmtPct(t.cm1Pct)+'</span></td><td class="r">₹'+fmt(t.promos)+'</td><td class="r">₹'+fmt(t.ads)+'</td><td class="r">₹'+fmt(t.vis)+'</td><td class="r">₹'+fmt(t.cm2)+'</td><td class="c"><span class="pill '+pc(t.cm2Pct)+'">'+fmtPct(t.cm2Pct)+'</span></td>'
  +'</tr>'+pctToggleRow()+pctRows(t)+'</tbody></table></div>'
  // ── Saved metrics bar ──────────────────────────────
  +'<div class="saved-metrics" style="margin-top:16px;background:#1E2A35;border-radius:10px;padding:14px 20px">'
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
    <div style="font-size:16px;font-weight:700;color:#F1F5F9">${(+m.val).toFixed(2)}${m.unit}</div>
  </div>`).join('')
  +'</div></div></div>';
}

// ── ENTRY ─────────────────────────────────────────────
let ES = { skus:[], nlcSkus:[], month:'', portalTotals:{ads:'',vis:'',promos:'',splitBy:'netSales'}, nlcTotals:{ads:'',vis:''} };

function initES() {
  ES.portal = S.portal;
  if (S.month && S.data[dKey(S.portal,S.month)]) {
    const ex = S.data[dKey(S.portal,S.month)];
    if (ex.config) S.config[S.portal] = JSON.parse(JSON.stringify(ex.config));
    ES.skus         = JSON.parse(JSON.stringify(ex.skus ||[])).map(s=>({
      ...s,
      promos: (s.promos===0||s.promos===''||s.promos===null||s.promos===undefined) ? '' : s.promos,
      ads:    (s.ads   ===0||s.ads   ===''||s.ads   ===null||s.ads   ===undefined) ? '' : s.ads,
      visibility:(s.visibility===0||s.visibility===''||s.visibility===null||s.visibility===undefined)?'':s.visibility,
      custom: s.custom||false,
      c_gross: s.c_gross||'',
      c_net: s.c_net||'',
    }));
    ES.nlcSkus      = JSON.parse(JSON.stringify(ex.nlcSkus||[])).map(s=>({...s, promos:(s.promos===0||s.promos===null||s.promos===undefined)?'':s.promos}));
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
    +'<div class="cfg-item"><label>NLC Promos (₹)</label><input type="number" value="'+(ES.nlcTotals.promos||'')+'" placeholder="0" oninput="updateNLCT(\'promos\',this.value)"></div>'
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
  const proAlloc   =blankOrUndef(sku.promos)    ? (+ES.nlcTotals.promos||0)*share : 0;
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
    +'<td class="r">'+(t.promos>0?'₹'+fmt(t.promos):'0')+'</td>'
    +'<td class="r">'+(t.ads>0?'₹'+fmt(t.ads):'0')+'</td>'
    +'<td class="r">'+(t.vis>0?'₹'+fmt(t.vis):'0')+'</td>'
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

  // Promos: regular + NLC
  const promos   = reg.promos + nlc.promos;

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
    +'<div><div style="font-size:10px;color:var(--tx3);font-weight:700;text-transform:uppercase;letter-spacing:.04em">Promos (Reg+NLC)</div><div style="font-size:16px;font-weight:700;color:var(--warn)">₹'+fmt(promos)+'</div></div>'
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
        if (r.promos > 0) existing.promos = r.promos;
        if (r.ads > 0)              existing.ads        = r.ads;
        if (r.visibility > 0)       existing.visibility = r.visibility;
      } else {
        targetArr.push({
          name: r.name, gmv: r.gmv||'', qty: r.qty||'', cost: r.cost||'',
          nlc_price: r.nlc_price||'',
          promos: r.promos > 0 ? r.promos : '',
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
    promos: normalizeSpend(s.promos),
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
  const comb={gmv:0,netSales:0,grossMargin:0,cm1:0,cm2:0,promos:0,ads:0,vis:0,logistics:0};
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
    +combKpiCards(comb,selMonths,mode)
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

    +secHead(3,'CM2 Margins','CM2% with GMV trend — hover to compare portals')
    +`<div style="display:flex;gap:0;border:1.5px solid rgba(255,255,255,0.15);border-radius:6px;overflow:hidden;width:fit-content;margin-bottom:16px">
      <button id="cm2-toggle-ns" onclick="setCm2Basis('netSales')" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:var(--green);color:#fff">% Net Sales</button>
      <button id="cm2-toggle-gmv" onclick="setCm2Basis('gmv')" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:transparent;color:#94A3B8">% GMV</button>
    </div>`
    +multiPane('CM2%',portals.map(p=>({id:'c-cm2-'+p,label:pLabel2(p),color:pColors[p]})),160)
    +'<div style="margin:16px 0 12px;font-size:12px;color:var(--tx3);font-style:italic">↓ Blended CM2% — combined across all portals per month</div>'
    +`<div class="card mb20" style="padding:18px;background:#1E2A35">
        <div style="font-size:12px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px" id="cum-cm2-title">Blended CM2% · % of Net Sales</div>
        <div style="position:relative;height:300px"><canvas id="c-cum-cm2"></canvas></div>
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

  // Precompute cumulative CM2% by Net Sales and GMV
  const cumData = {};
  portals.forEach(p=>{
    let cumCm2=0, cumNs=0, cumGmv=0;
    const ns=[],gv=[];
    allMonths.forEach(m=>{
      const t=getTotals(p,m);
      if(t){cumCm2+=t.cm2;cumNs+=t.netSales;cumGmv+=t.gmv;}
      ns.push(cumNs>0?+(cumCm2/cumNs*100).toFixed(1):null);
      gv.push(cumGmv>0?+(cumCm2/cumGmv*100).toFixed(1):null);
    });
    cumData[p]={ns,gv};
  });
  // Blended monthly CM2% across all portals
  const cumOverallNs=[], cumOverallGmv=[];
  allMonths.forEach(m=>{
    let mCm2=0,mNs=0,mGmv=0;
    portals.forEach(p=>{const t=getTotals(p,m);if(t){mCm2+=t.cm2;mNs+=t.netSales;mGmv+=t.gmv;}});
    cumOverallNs.push(mNs>0?+(mCm2/mNs*100).toFixed(1):null);
    cumOverallGmv.push(mGmv>0?+(mCm2/mGmv*100).toFixed(1):null);
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
  var cumData=${JSON.stringify(cumData)};
  var cumOverallNs=${JSON.stringify(cumOverallNs)};
  var cumOverallGmv=${JSON.stringify(cumOverallGmv)};
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
      if(chart._gmvCross && meta.type==='bar') return; // skip individual portal bar labels on cross chart
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
      maxRotation:30,minRotation:0,autoSkip:false}};
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
            x:{grid:{display:false},ticks:{font:{size:10},color:'#FFFFFF',maxRotation:30,autoSkip:false}},
            y:{grid:{color:'rgba(255,255,255,0.08)'},ticks:{font:{size:10},color:'#FFFFFF',callback:function(v){return v+'L';}},grace:'15%'}
          },
          barPercentage:0.6,categoryPercentage:0.7,_snackPct:false,_snackUnit:'L'
        }
      });
      charts['c-gmv-cross']._snackPct=false;charts['c-gmv-cross']._snackUnit='L';charts['c-gmv-cross']._gmvCross=true;
    }

    drawCm2();
    drawCumulative();

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
        borderColor:'rgba(99,179,237,0.5)',backgroundColor:'rgba(30,42,53,0.85)',
        fill:{target:'origin',above:'rgba(99,179,237,0.18)'},
        tension:0.35,pointRadius:0,borderWidth:1.5,order:3,
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
          {label:'Ads+Vis',data:av.data,borderColor:'#38BDF8',backgroundColor:'transparent',fill:false,tension:0.35,pointBackgroundColor:'#38BDF8',pointRadius:4,pointHoverRadius:6,borderWidth:2.5,order:1,yAxisID:'y'}
        ]},options:opts1});
        charts['c-adsv-'+p]._snackPct=true;charts['c-adsv-'+p]._snackUnit='%';charts['c-adsv-'+p]._syncIdx=null;

      }

      // Promos pane with GMV shadow
      destroy('c-promo-'+p);var cv2=document.getElementById('c-promo-'+p);if(cv2){
        var opts2=baseOpts(true,'%',isLast);
        opts2.scales.yGmv={display:false,position:'right',grid:{display:false}};
        opts2.plugins.legend={display:false};
        opts2.plugins.tooltip.enabled=false;
        charts['c-promo-'+p]=new Chart(cv2,{type:'line',data:{labels:pr.labels,datasets:[
          gmvShadowDs,
          {label:'Promos',data:pr.data,borderColor:col,backgroundColor:'transparent',fill:false,tension:0.35,pointBackgroundColor:col,pointRadius:4,pointHoverRadius:6,borderWidth:2.5,order:1,yAxisID:'y'}
        ]},options:opts2});
        charts['c-promo-'+p]._snackPct=true;charts['c-promo-'+p]._snackUnit='%';charts['c-promo-'+p]._syncIdx=null;

      }
    });
  }

  var cm2Basis='netSales';
  function drawCm2(){
    portals.forEach(function(p,pi){
      var col=pColors[p];
      var gmv=slicePortal(p,'gmv');
      var cm2F=cm2Basis==='gmv'?'cm2':'cm2';
      // CM2% of NetSales vs GMV
      var cm2Data;
      if(cm2Basis==='gmv'){
        var d=allData[p];
        cm2Data={labels:[],data:[]};
        d.months.forEach(function(m,i){
          var ai=allMonths.indexOf(m);
          if(ai>=rangeFrom&&ai<=rangeTo){
            var e=S.data[dKey(p,m)];
            var t=e?totals(e.skus,e.nlcSkus,e.config||S.config[p],e.portalTotals,e.nlcTotals):null;
            cm2Data.labels.push(shortM(m));
            cm2Data.data.push(t&&t.gmv>0?+(t.cm2/t.gmv*100).toFixed(1):null);
          }
        });
      } else {
        cm2Data=slicePortal(p,'cm2');
      }
      var isLast=pi===portals.length-1;
      var gmvShadow={
        label:'GMV (L)',data:gmv.data,
        borderColor:'rgba(99,179,237,0.5)',
        fill:{target:'origin',above:'rgba(99,179,237,0.18)'},
        backgroundColor:'rgba(30,42,53,0.85)',
        tension:0.35,pointRadius:0,borderWidth:1.5,order:3,
        yAxisID:'yGmv',tooltip:{enabled:false},datalabels:{display:false}
      };
      destroy('c-cm2-'+p);var cv=document.getElementById('c-cm2-'+p);if(!cv)return;
      var opts=baseOpts(true,'%',isLast);
      opts.scales.yGmv={display:false,position:'right',grid:{display:false}};
      opts.plugins.legend={display:false};
      opts.plugins.tooltip.enabled=false;
      opts.events=[];
      charts['c-cm2-'+p]=new Chart(cv,{type:'line',data:{labels:cm2Data.labels,datasets:[
        gmvShadow,
        {label:'CM2%',data:cm2Data.data,borderColor:col,backgroundColor:'transparent',fill:false,
         tension:0.35,pointBackgroundColor:col,pointRadius:4,pointHoverRadius:6,borderWidth:2.5,order:1,yAxisID:'y'}
      ]},options:opts});
      charts['c-cm2-'+p]._snackPct=true;charts['c-cm2-'+p]._snackUnit='%';charts['c-cm2-'+p]._syncIdx=null;

    });
  }

  function drawCumulative(){
    var labels=allMonths.slice(rangeFrom,rangeTo+1).map(shortM);
    var isGmv=cm2Basis==='gmv';
    var overallArr=isGmv?cumOverallGmv:cumOverallNs;
    var title=document.getElementById('cum-cm2-title');
    if(title)title.textContent='Blended CM2% · % of '+(isGmv?'GMV':'Net Sales');

    var data=allMonths.slice(rangeFrom,rangeTo+1).map(function(m,mi){return overallArr[rangeFrom+mi]||null;});
    var datasets=[{
      label:'Blended CM2%',data:data,
      borderColor:'#00E5FF',backgroundColor:'#00E5FF18',
      fill:true,tension:0.4,pointBackgroundColor:'#00E5FF',
      pointRadius:5,pointHoverRadius:7,borderWidth:3
    }];

    destroy('c-cum-cm2');var cv=document.getElementById('c-cum-cm2');if(!cv)return;
    var opts=baseOpts(true,'%',true);
    opts.interaction={mode:'index',intersect:false};
    opts.plugins.legend={display:false};
    opts.plugins.tooltip.callbacks.label=function(ctx){return ' Blended CM2%: '+ctx.parsed.y.toFixed(3)+'%';};
    charts['c-cum-cm2']=new Chart(cv,{type:'line',data:{labels:labels,datasets:datasets},options:opts});
    charts['c-cum-cm2']._snackPct=true;charts['c-cum-cm2']._snackUnit='%';
  }

  window.setCm2Basis=function(basis){
    cm2Basis=basis;
    var ns=document.getElementById('cm2-toggle-ns');var gv=document.getElementById('cm2-toggle-gmv');
    if(ns){ns.style.background=basis==='netSales'?'var(--green)':'transparent';ns.style.color=basis==='netSales'?'#fff':'#94A3B8';}
    if(gv){gv.style.background=basis==='gmv'?'var(--green)':'transparent';gv.style.color=basis==='gmv'?'#fff':'#94A3B8';}
    paneGroups['cm2']=[];
    drawCm2();
    drawCumulative();
  };

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

// ── UNIT ECONOMICS ────────────────────────────────────
// Separate from CM2: every SKU (incl. NLC) goes GMV → commission → GST → Net Sales → costs → Net Earning

// Auto match key: ignores grammage, brand, descriptors; same flavour + product = same SKU
const UE_STOP = new Set(['snackible','dipsters','with','made','millet','millets','no','palm','oil','high','fibre','fiber',
  'roasted','baked','source','of','rich','in','dietary','refined','sugar','healthy','snack','snacks','per','serve',
  'vacuum','fried','less','supergrains','popped','maida','jaggery','creme','a','the','and','gram','grams','g','gm',
  'piece','pieces','pc','pcs','ml','kg','pack','cheesy']);
function ueKey(name){
  let n=(name||'').toLowerCase();
  n=n.replace(/\d+\s*%\s*protein\s*per\s*serve/g,' ')
     .replace(/(high|source of|rich in)\s+protein/g,' ')
     .replace(/khakhra/g,'khakra').replace(/piri/g,'peri')
     .replace(/barbeque|barbecue/g,'bbq')
     .replace(/[0-9.]+/g,' ')
     .replace(/[^a-z]+/g,' ');
  const toks=[...new Set(n.split(' ').filter(w=>w&&!UE_STOP.has(w)))].sort();
  return toks.join(' ');
}
// Readable display name: brand and grammage stripped, descriptors after | or ( cut
function ueDisplay(name){
  let n=(name||'').replace(/^Snackible\s+/i,'');
  n=n.split('|')[0].split('(')[0];
  n=n.replace(/[\s\-]+\d+[\.\d]*\s*(g|gram|grams|piece|pieces|ml)\b.*$/i,'').trim();
  if(/^dipsters\s*-\s*/i.test(n)) n=n.replace(/^dipsters\s*-\s*/i,'');
  else if(n.indexOf(' - ')>0 && n.split(' - ')[0].length>12) n=n.split(' - ')[0];
  return n.trim().replace(/\b\w/g,c=>c.toUpperCase());
}

// Pack size from a portal name: "57 g", "57.0 GRAM", "-55 g" → "57g"
function ueGrams(name){
  const m=(name||'').match(/(\d+(?:\.\d+)?)\s*(g|gm|gms|gram|grams)\b/i);
  return m?Math.round(parseFloat(m[1]))+'g':'';
}
function ueNormPack(v){
  const t=String(v||'').trim(); if(!t) return '';
  const m=t.match(/(\d+(?:\.\d+)?)/); return m?Math.round(parseFloat(m[1]))+'g':t;
}
// SKU_Map tab from Google Sheet: Portal | Portal SKU Name | Master SKU | Pack Size
let UE_MAP=null, UE_MAP_LOADING=false, UE_MAP_ERR=false;
function ueLoadMap(force){
  if(UE_MAP_LOADING||(UE_MAP&&!force)) return;
  if(force) toast('Reloading SKU_Map…');
  UE_MAP_LOADING=true; UE_MAP_ERR=false;
  fetch(SHEET_IMPORT_URL+'?action=getSkuMap',{cache:'no-store'})
    .then(r=>r.json())
    .then(r=>{
      const exact={}, base={}; let n=0;
      (r.rows||[]).forEach(x=>{
        const master=String(x.master||'').trim(); if(!x.name||!master) return;
        const val={master:master,pack:ueNormPack(x.pack)};
        const pt=String(x.portal||'').trim().toLowerCase().replace(/\s*nlc$/,'')||'*';
        const nn=ueNorm(x.name), bb=ueBase(x.name);
        exact[pt+'|'+nn]=val; if(!exact['*|'+nn]) exact['*|'+nn]=val;
        (base[pt+'|'+bb]=base[pt+'|'+bb]||[]).push(val);
        n++;
      });
      UE_MAP={exact:exact,base:base,n:n};
      if(force) toast('SKU_Map reloaded · '+n+' rows');
    })
    .catch(()=>{ UE_MAP={}; UE_MAP_ERR=true; })
    .finally(()=>{ UE_MAP_LOADING=false; if(S.view==='unit') render(); });
}
// Name normalisers: case, punctuation and spacing never matter; ueBase also drops pack size
function ueNorm(n){ return String(n||'').toLowerCase().replace(/[^a-z0-9.]+/g,' ').replace(/\s+/g,' ').trim(); }
function ueBase(n){ return ueNorm(String(n||'').toLowerCase().replace(/\d+(?:\.\d+)?\s*(g|gm|gms|gram|grams|piece|pieces|pc|pcs)\b/g,' ')); }
// 1) exact name  2) same name ignoring pack text, accepted only if pack sizes agree (±15%)
function ueMapLookup(p,name){
  if(!UE_MAP||!UE_MAP.exact) return null;
  const nn=ueNorm(name);
  const hit=UE_MAP.exact[p+'|'+nn]||UE_MAP.exact['*|'+nn]; if(hit) return hit;
  const list=UE_MAP.base[p+'|'+ueBase(name)]||UE_MAP.base['*|'+ueBase(name)];
  if(!list||!list.length) return null;
  const g=parseFloat(ueGrams(name))||0;
  const ok=list.filter(v=>{ const pk=parseFloat(v.pack)||0; return !g||!pk||Math.abs(g-pk)/pk<=0.15; });
  if(!ok.length) return null;
  return ok.find(v=>(parseFloat(v.pack)||0)===g)||ok[0];
}
function ueCopyUnmapped(){
  const t=(window.UE_UNMAPPED||[]).map(x=>x.join('\t')).join('\n');
  const done=()=>toast('Copied '+(window.UE_UNMAPPED||[]).length+' rows. Paste into SKU_Map and fill Master SKU');
  if(navigator.clipboard) navigator.clipboard.writeText(t).then(done).catch(()=>prompt('Copy these rows:',t));
  else prompt('Copy these rows:',t);
}

const UE_KEYS=['gmv','qty','comm','gst','ns','cogs','de','lab','log','promos','adsvis'];
const ueBlank=()=>{const a={};UE_KEYS.forEach(k=>a[k]=0);return a;};
const ueAdd=(a,b)=>{UE_KEYS.forEach(k=>a[k]+=b[k]||0);};

// Per SKU unit-economics rows for one portal-month
function ueRowsFor(p,m){
  const e=S.data[dKey(p,m)]; if(!e) return [];
  const cfg=e.config||S.config[p];
    // Gross / Net Sales exactly as the CM2 dashboard: NLC = Qty × NLC price (no commission), custom overrides respected
  const mk=(s,isNLC)=>{
    const c=calcSKU(s,cfg,isNLC,0,0,0);
    const gmv=c.gmv, qty=c.qty, gross=c.grossSales, ns=c.netSales;
    return {s, name:s.name, nlc:isNLC, gmv, qty, comm:gmv-gross, gst:gross-ns, ns, cogs:c.cogs, de:c.directExp, lab:c.labour, log:c.logistics};
  };
  const items=[...(e.skus||[]).map(s=>mk(s,false)),...(e.nlcSkus||[]).map(s=>mk(s,true))].filter(x=>x.gmv>0||x.qty>0);
  // Portal level spends (regular + NLC pools) split by the dashboard basis; SKU level values override
  const pt=e.portalTotals||{}, nt=e.nlcTotals||{};
  const pool={promos:(+pt.promos||0)+(+nt.promos||0), ads:(+pt.ads||0)+(+nt.ads||0), vis:(+pt.vis||0)+(+nt.vis||0)};
  const wOf=x=>S.dashSplit==='qty'?x.qty:x.ns;
  const totW=items.reduce((a,x)=>a+wOf(x),0);
  items.forEach(x=>{
    const sh=totW>0?wOf(x)/totW:0;
    const pr=blankOrUndef(x.s.promos)?pool.promos*sh:(+x.s.promos||0);
    const ad=blankOrUndef(x.s.ads)?pool.ads*sh:(+x.s.ads||0);
    const vi=blankOrUndef(x.s.visibility)?pool.vis*sh:(+x.s.visibility||0);
    x.promos=pr; x.adsvis=ad+vi;
  });
  return items;
}

function ueMonthsAll(){
  return [...new Set(['blinkit','zepto','instamart'].flatMap(p=>monthsFor(p)))].sort((a,b)=>MONTHS.indexOf(a)-MONTHS.indexOf(b));
}

function ueToggle(i){
  S.ueOpen[i]=!S.ueOpen[i];
  document.querySelectorAll('.ue-sub-'+i).forEach(r=>r.style.display=S.ueOpen[i]?'table-row':'none');
  const c=document.getElementById('ue-car-'+i); if(c) c.textContent=S.ueOpen[i]?'▾':'▸';
}
function ueToggleAll(open){
  document.querySelectorAll('[data-ue]').forEach(el=>{
    const i=el.getAttribute('data-ue'); if(!!S.ueOpen[i]!==open) ueToggle(i);
  });
}

// ── Unit Economics: Excel export with live formulas ──
function ueExportWorking(){
  const run=()=>{
    const months=window.UE_SEL||[];
    if(!months.length){ toast('Nothing to export','err'); return; }
    const byQty=S.dashSplit==='qty';
    const W=[], P=[];
    // Pools sheet rows: one per portal-month
    ['blinkit','zepto','instamart'].forEach(p=>months.forEach(m=>{
      const e=S.data[dKey(p,m)]; if(!e) return;
      const pt=e.portalTotals||{}, nt=e.nlcTotals||{};
      P.push([m,pLabel(p),+pt.promos||0,+nt.promos||0,+pt.ads||0,+nt.ads||0,+pt.vis||0,+nt.vis||0]);
    }));
    ['blinkit','zepto','instamart'].forEach(p=>months.forEach(m=>{
      const e=S.data[dKey(p,m)]; if(!e) return;
      const cfg=e.config||S.config[p];
      const add=(sk,type)=>{
        const gmv=+sk.gmv||0, qty=+sk.qty||0; if(!gmv&&!qty) return;
        const mp=ueMapLookup(p,sk.name);
        const label=mp?mp.master+(mp.pack?' · '+mp.pack:''):ueDisplay(sk.name)+(ueGrams(sk.name)?' · '+ueGrams(sk.name):'')+' (unmapped)';
        const ov=v=>blankOrUndef(v)?'':(+v||0);
        const cust=sk.custom&&(+sk.c_gross>0||+sk.c_net>0);
        const t2=cust?'Custom':type;
        W.push({m,portal:pLabel(p),name:sk.name,label,type:t2,nlcPrice:type==='NLC'?(+sk.nlc_price||0):'',cGross:cust?(+sk.c_gross||0):'',cNet:cust?(+sk.c_net||0):'',gmv,qty,cost:+sk.cost||0,
          comm:(+cfg.commission||0)/100,tax:(+cfg.tax||0)/100,de:(+cfg.directExp||0)/100,lab:(+cfg.labour||0)/100,log:(+cfg.logistics||0)/100,
          pr:ov(sk.promos),ad:ov(sk.ads),vi:ov(sk.visibility)});
      };
      (e.skus||[]).forEach(sk=>add(sk,'Regular'));
      (e.nlcSkus||[]).forEach(sk=>add(sk,'NLC'));
    }));
    const n=W.length, last=n+1;
    const H=['Month','Portal','Portal SKU','Master SKU · Pack','Type','GMV','Qty','Cost / Unit','Commission %','GST %','Direct Exp %','Labour %','Logistics %',
      'Commission','Gross Sales','Net Sales','GST','COGS','Direct Exp','Labour','Logistics','CM1',
      'Split Basis ('+(byQty?'Qty':'Net Sales')+')','Portal Basis Total','Share of Portal',
      'Promos Entered','Ads Entered','Vis Entered','Promos Pool','Ads Pool','Vis Pool',
      'Promos Used','Ads Used','Vis Used','Net Earning','Net Earning / Unit','% of Net Sales','NLC Price','Custom Gross','Custom Net'];
    const f=x=>({t:'n',f:x});
    const rows=[H];
    W.forEach((w,i)=>{
      const r=i+2;
      rows.push([w.m,w.portal,w.name,w.label,w.type,w.gmv,w.qty,w.cost,w.comm,w.tax,w.de,w.lab,w.log,
        f('F'+r+'-O'+r),
        f('IF(E'+r+'="NLC",G'+r+'*AL'+r+',IF(E'+r+'="Custom",AM'+r+',F'+r+'*(1-I'+r+')))'),
        f('IF(E'+r+'="Custom",AN'+r+',O'+r+'/(1+J'+r+'))'),
        f('O'+r+'-P'+r), f('H'+r+'*G'+r),
        f('P'+r+'*K'+r), f('P'+r+'*L'+r), f('P'+r+'*M'+r), f('P'+r+'-R'+r+'-S'+r+'-T'+r+'-U'+r),
        f(byQty?'G'+r:'P'+r),
        f('SUMIFS($W$2:$W$'+last+',$A$2:$A$'+last+',A'+r+',$B$2:$B$'+last+',B'+r+')'),
        f('IF(X'+r+'=0,0,W'+r+'/X'+r+')'),
        w.pr,w.ad,w.vi,
        f('SUMIFS(Pools!$E:$E,Pools!$A:$A,A'+r+',Pools!$B:$B,B'+r+')'),
        f('SUMIFS(Pools!$H:$H,Pools!$A:$A,A'+r+',Pools!$B:$B,B'+r+')'),
        f('SUMIFS(Pools!$K:$K,Pools!$A:$A,A'+r+',Pools!$B:$B,B'+r+')'),
        f('IF(Z'+r+'="",AC'+r+'*Y'+r+',Z'+r+')'),
        f('IF(AA'+r+'="",AD'+r+'*Y'+r+',AA'+r+')'),
        f('IF(AB'+r+'="",AE'+r+'*Y'+r+',AB'+r+')'),
        f('V'+r+'-AF'+r+'-AG'+r+'-AH'+r),
        f('IF(G'+r+'=0,0,AI'+r+'/G'+r+')'),
        f('IF(P'+r+'=0,0,AI'+r+'/P'+r+')'),
        w.nlcPrice,w.cGross,w.cNet]);
    });
    const wb=XLSX.utils.book_new();
    const ws=XLSX.utils.aoa_to_sheet(rows);
    ws['!cols']=H.map((h,i)=>({wch:i===2?60:i===3?38:Math.max(12,h.length+2)}));
    ws['!freeze']={xSplit:4,ySplit:1};
    for(let r=2;r<=last;r++){
      ['I','J','K','L','M','Y','AK'].forEach(c=>{ if(ws[c+r]) ws[c+r].z='0.00%'; });
      ['F','H','N','O','P','Q','R','S','T','U','V','W','X','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AL','AM','AN'].forEach(c=>{ if(ws[c+r]) ws[c+r].z='#,##0.00'; });
    }
    // Pools sheet
    const PH=['Month','Portal','Promos (Regular)','Promos (NLC)','Promos Pool','Ads (Regular)','Ads (NLC)','Ads Pool','Vis (Regular)','Vis (NLC)','Vis Pool'];
    const prow=[PH];
    P.forEach((x,i)=>{ const r=i+2;
      prow.push([x[0],x[1],x[2],x[3],f('C'+r+'+D'+r),x[4],x[5],f('F'+r+'+G'+r),x[6],x[7],f('I'+r+'+J'+r)]); });
    const wp=XLSX.utils.aoa_to_sheet(prow); wp['!cols']=PH.map(h=>({wch:Math.max(14,h.length+2)}));
    // Summary by Master SKU
    const labels=[...new Set(W.map(w=>w.label))].sort();
    const SH=['Master SKU · Pack','Qty','GMV','Net Sales','CM1','Promos','Ads','Vis','Net Earning','ASP','Net Realisation / Unit','CM1 / Unit','Promos / Unit','Ads + Vis / Unit','Net Earning / Unit','% of Net Sales'];
    const srow=[SH];
    const sum=(col,r)=>f('SUMIFS(Working!$'+col+'$2:$'+col+'$'+last+',Working!$D$2:$D$'+last+',A'+r+')');
    labels.forEach((l,i)=>{ const r=i+2;
      srow.push([l,sum('G',r),sum('F',r),sum('P',r),sum('V',r),sum('AF',r),sum('AG',r),sum('AH',r),sum('AI',r),
        f('IF(B'+r+'=0,0,C'+r+'/B'+r+')'),f('IF(B'+r+'=0,0,D'+r+'/B'+r+')'),f('IF(B'+r+'=0,0,E'+r+'/B'+r+')'),
        f('IF(B'+r+'=0,0,F'+r+'/B'+r+')'),f('IF(B'+r+'=0,0,(G'+r+'+H'+r+')/B'+r+')'),f('IF(B'+r+'=0,0,I'+r+'/B'+r+')'),f('IF(D'+r+'=0,0,I'+r+'/D'+r+')')]); });
    const tr=labels.length+2;
    srow.push(['All SKUs',...['B','C','D','E','F','G','H','I'].map(c=>f('SUM('+c+'2:'+c+(tr-1)+')')),
      f('IF(B'+tr+'=0,0,C'+tr+'/B'+tr+')'),f('IF(B'+tr+'=0,0,D'+tr+'/B'+tr+')'),f('IF(B'+tr+'=0,0,E'+tr+'/B'+tr+')'),
      f('IF(B'+tr+'=0,0,F'+tr+'/B'+tr+')'),f('IF(B'+tr+'=0,0,(G'+tr+'+H'+tr+')/B'+tr+')'),f('IF(B'+tr+'=0,0,I'+tr+'/B'+tr+')'),f('IF(D'+tr+'=0,0,I'+tr+'/D'+tr+')')]);
    const wsu=XLSX.utils.aoa_to_sheet(srow);
    wsu['!cols']=SH.map((h,i)=>({wch:i===0?40:Math.max(13,h.length+2)}));
    for(let r=2;r<=tr;r++){ 'BCDEFGHIJKLMNO'.split('').forEach(c=>{ if(wsu[c+r]) wsu[c+r].z='#,##0.00'; }); if(wsu['P'+r]) wsu['P'+r].z='0.00%'; }
    // Notes
    const notes=[['How to read this file'],
      ['Working: one row per portal listing per month. Grey inputs come from the dashboard; every other column is a formula.'],
      ['Regular: Gross Sales = GMV × (1 − Commission%). NLC: Gross Sales = Qty × NLC Price (column AL), no commission. Same as the CM2 dashboard.'],
      ['Commission column = GMV − Gross Sales (for NLC this is the gap between portal GMV and what we bill). Net Sales = Gross Sales ÷ (1 + GST%).'],
      ['Direct Exp, Labour, Logistics = % × Net Sales. CM1 = Net Sales − COGS − DE − Labour − Logistics.'],
      ['Promos / Ads / Vis: if a value is entered against the SKU (Entered columns) it is used as is.'],
      ['Otherwise SKU gets Pool × Share of Portal. Share = SKU Split Basis ÷ total Split Basis of all SKUs on that portal in that month (Regular + NLC together).'],
      ['Split basis currently: '+(byQty?'Qty sold':'Net Sales')+' (same as the toggle on the page).'],
      ['Pools: portal level Promos / Ads / Vis entered on the dashboard, Regular + NLC added together.'],
      ['Summary: totals by Master SKU · Pack (from SKU_Map), per unit = total ÷ total qty. Should match the Unit Economics page.']];
    const wn=XLSX.utils.aoa_to_sheet(notes); wn['!cols']=[{wch:140}];
    XLSX.utils.book_append_sheet(wb,wsu,'Summary');
    XLSX.utils.book_append_sheet(wb,ws,'Working');
    XLSX.utils.book_append_sheet(wb,wp,'Pools');
    XLSX.utils.book_append_sheet(wb,wn,'Notes');
    const tag=months.length>1?months[0]+'_to_'+months[months.length-1]:months[0];
    XLSX.writeFile(wb,'Snackible_Unit_Economics_'+tag.replace(/ /g,'_')+'.xlsx');
    toast('✅ Unit Economics working exported');
  };
  if(typeof XLSX!=='undefined') run();
  else { const sc=document.createElement('script'); sc.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; sc.onload=run; sc.onerror=()=>toast('Failed to load XLSX library','err'); document.head.appendChild(sc); }
}

function viewUnitEconomics(){
  const allM=ueMonthsAll();
  if(!allM.length) return '<div class="ph"><div><div class="ph-title">Unit Economics</div></div></div><div class="card empty"><div class="eicon">🧮</div><p>No data yet.</p></div>';
  const mode=S.ueMode||'single';
  let selMonths=[], periodLabel='', ctrls='';
  const btn=(on,lbl,click)=>'<button onclick="'+click+'" style="padding:5px 14px;font-size:11px;font-weight:600;border:none;cursor:pointer;font-family:Poppins,sans-serif;background:'+(on?'var(--green)':'#fff')+';color:'+(on?'#fff':'var(--tx3)')+'">'+lbl+'</button>';
  const modeToggle='<div style="display:flex;border:1.5px solid var(--border);border-radius:6px;overflow:hidden">'
    +btn(mode==='single','Single Month',"S.ueMode='single';render()")+btn(mode==='range','Month Range',"S.ueMode='range';render()")+'</div>';
  const splitToggle='<div style="display:flex;border:1.5px solid var(--border);border-radius:6px;overflow:hidden">'
    +btn(S.dashSplit==='netSales','Net Sales',"setDashSplit('netSales')")+btn(S.dashSplit==='qty','Qty Sold',"setDashSplit('qty')")+'</div>';
  const opts=sel=>allM.map(m=>'<option value="'+m+'"'+(m===sel?' selected':'')+'>'+m+'</option>').join('');
  if(mode==='single'){
    const sel=(S.ueMonth&&allM.includes(S.ueMonth))?S.ueMonth:allM[allM.length-1];
    S.ueMonth=sel; selMonths=[sel]; periodLabel=sel;
    ctrls=modeToggle+'<select class="msel" onchange="S.ueMonth=this.value;render()">'+opts(sel)+'</select>';
  } else {
    const from=(S.ueFrom&&allM.includes(S.ueFrom))?S.ueFrom:allM[0];
    const to=(S.ueTo&&allM.includes(S.ueTo))?S.ueTo:allM[allM.length-1];
    S.ueFrom=from; S.ueTo=to;
    const a=allM.indexOf(from), b=allM.indexOf(to);
    selMonths=allM.slice(Math.min(a,b),Math.max(a,b)+1);
    periodLabel=selMonths[0]+' – '+selMonths[selMonths.length-1]+' ('+selMonths.length+' months)';
    ctrls=modeToggle+'<span style="font-size:12px;color:var(--tx3)">From</span><select class="msel" style="width:140px" onchange="S.ueFrom=this.value;render()">'+opts(from)+'</select>'
      +'<span style="font-size:12px;color:var(--tx3)">To</span><select class="msel" style="width:140px" onchange="S.ueTo=this.value;render()">'+opts(to)+'</select>';
  }

  window.UE_SEL=selMonths;
  // Aggregate by matched SKU and portal
  ueLoadMap();
  const groups={}, unm={};
  const grand=ueBlank();
  ['blinkit','zepto','instamart'].forEach(p=>{
    selMonths.forEach(m=>{
      ueRowsFor(p,m).forEach(x=>{
        const mp=ueMapLookup(p,x.name);
        let k, label, mapped;
        if(mp){ k='M|'+mp.master.toLowerCase()+'|'+mp.pack; label=mp.master+(mp.pack?' · '+mp.pack:''); mapped=true; }
        else { const gr=ueGrams(x.name); k='A|'+(ueKey(x.name)||x.name)+'|'+gr; label=ueDisplay(x.name)+(gr?' · '+gr:''); mapped=false;
               unm[p+'|'+x.name]=[pLabel(p),x.name,'',gr]; }
        if(!groups[k]) groups[k]={key:k,names:{},tot:ueBlank(),portals:{},label:label,mapped:true};
        const g=groups[k];
        if(!mapped) g.mapped=false;
        g.names[x.name]=p;
        if(!g.portals[p]) g.portals[p]=ueBlank();
        ueAdd(g.portals[p],x); ueAdd(g.tot,x); ueAdd(grand,x);
      });
    });
  });
  const pickName=g=>g.label+(g.mapped?'':' <span class="ue-unm" title="Not in SKU_Map, matched automatically">Unmapped</span>');
  window.UE_UNMAPPED=Object.values(unm);
  const unmCount=window.UE_UNMAPPED.length;
  const mapBar=UE_MAP_LOADING&&!UE_MAP
    ? '<div class="ue-map-bar">Loading SKU_Map…</div>'
    : (UE_MAP_ERR
      ? '<div class="ue-map-bar warn">SKU_Map could not be loaded, all SKUs are auto matched by flavour + pack size. <button class="btn btn-outline btn-sm" onclick="ueLoadMap(true)">Retry</button></div>'
      : (unmCount
        ? '<div class="ue-map-bar warn">'+unmCount+' portal listing'+(unmCount>1?'s':'')+' not in SKU_Map, auto matched by flavour + pack size. <button class="btn btn-outline btn-sm" onclick="ueCopyUnmapped()">📋 Copy unmapped</button> <button class="btn btn-outline btn-sm" onclick="ueLoadMap(true)">↻ Reload map</button></div>'
        : '<div class="ue-map-bar ok">All listings mapped via SKU_Map. <button class="btn btn-outline btn-sm" onclick="ueLoadMap(true)">↻ Reload map</button></div>'));
  const list=Object.values(groups).sort((a,b)=>b.tot.gmv-a.tot.gmv);

  const pu=(v,q)=>q>0?v/q:0;
  const r2=v=>'₹'+(Math.round(v*100)/100).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
  const calc=a=>{
    const cm1=a.ns-a.cogs-a.de-a.lab-a.log, net=cm1-a.promos-a.adsvis;
    return {cm1,net,pct:a.ns>0?net/a.ns*100:0};
  };
  const cells=a=>{
    const c=calc(a), q=a.qty;
    return '<td class="r">'+fmt(q)+'</td>'
      +'<td class="r">'+r2(pu(a.gmv,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.comm,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.gst,q))+'</td>'
      +'<td class="r ue-key">'+r2(pu(a.ns,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.cogs,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.de,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.lab,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.log,q))+'</td>'
      +'<td class="r ue-key">'+r2(pu(c.cm1,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.promos,q))+'</td>'
      +'<td class="r ue-cost">'+r2(pu(a.adsvis,q))+'</td>'
      +'<td class="r ue-net '+pc(c.net)+'">'+r2(pu(c.net,q))+'</td>'
      +'<td class="c"><span class="pill '+pc(c.pct)+'">'+fmtPct(c.pct)+'</span></td>'
      +'<td class="r">₹'+fmt(c.net)+'</td>';
  };
  const portalsOrder=['blinkit','zepto','instamart'];
  const body=list.map((g,i)=>{
    const open=!!S.ueOpen[i];
    const srcTitle=Object.keys(g.names).map(n=>pLabel(g.names[n])+': '+n).join('\n').replace(/"/g,'&quot;');
    const pCount=Object.keys(g.portals).length;
    let h='<tr class="ue-main" data-ue="'+i+'" onclick="ueToggle('+i+')">'
      +'<td title="'+srcTitle+'"><span class="ue-car" id="ue-car-'+i+'">'+(open?'▾':'▸')+'</span><span class="ue-pc">'+pCount+'P</span>'+pickName(g)+'</td>'+cells(g.tot)+'</tr>';
    portalsOrder.forEach(p=>{
      if(!g.portals[p]) return;
      h+='<tr class="ue-sub ue-sub-'+i+'" style="display:'+(open?'table-row':'none')+'"><td class="ue-sub-lbl"><span class="ue-dot" style="background:'+pColor(p)+'"></span>'+pLabel(p)+'</td>'+cells(g.portals[p])+'</tr>';
    });
    return h;
  }).join('');
  const gc=calc(grand);
  const foot='<tr class="gt"><td>All SKUs (weighted)</td>'+cells(grand)+'</tr>';

  const kpi=(lbl,val,sub,cls)=>'<div class="card stat"><div class="lbl">'+lbl+'</div><div class="val '+(cls||'')+'">'+val+'</div><div class="sub">'+sub+'</div></div>';
  const kpis='<div class="g4 mb20">'
    +kpi('Units Sold',fmt(grand.qty),list.length+' matched SKUs across portals')
    +kpi('Avg Selling Price',r2(pu(grand.gmv,grand.qty)),'GMV per unit')
    +kpi('Net Realisation / Unit',r2(pu(grand.ns,grand.qty)),'After commission and GST')
    +kpi('Net Earning / Unit',r2(pu(gc.net,grand.qty)),fmtPct(gc.pct)+' of Net Sales · ₹'+fmt(gc.net)+' total',pc(gc.net))
    +'</div>';

  // Top 5 by Net Sales
  const top=[...list].sort((a,b)=>b.tot.ns-a.tot.ns).slice(0,5);
  const pctOf=(v,b)=>b>0?v/b*100:0;
  const amtPct=(v,b)=>'<div class="t5-amt '+(v<0?'neg':'')+'">₹'+fmt(v)+'</div><div class="t5-sub">'+fmtPct(pctOf(v,b))+' of NS</div>';
  const top5='<div class="card tcard mb20"><div class="thead-row"><div class="thead-title">Top 5 SKUs by Net Sales · '+periodLabel+'</div>'
    +'<div style="font-size:11.5px;color:var(--tx3)">All portals combined · CM2 = Net Earning</div></div>'
    +'<div class="twrap"><table class="dash-tbl t5-tbl"><thead><tr><th>SKU</th><th class="r">Qty</th><th class="r">Net Sales</th><th class="r">Gross Margin</th><th class="r">CM1</th><th class="r">Promos + Ads + Vis</th><th class="r">CM2</th><th class="r">Net Earning / Unit</th></tr></thead><tbody>'
    +top.map((g,i)=>{
      const a=g.tot, c=calc(a), gm=a.ns-a.cogs-a.de, mk=a.promos+a.adsvis;
      return '<tr><td><span class="t5-rank">'+(i+1)+'</span>'+g.label+'</td>'
        +'<td class="r">'+fmt(a.qty)+'</td>'
        +'<td class="r"><div class="t5-amt">₹'+fmt(a.ns)+'</div><div class="t5-sub">'+fmtPct(pctOf(a.ns,grand.ns))+' of total</div></td>'
        +'<td class="r">'+amtPct(gm,a.ns)+'</td>'
        +'<td class="r">'+amtPct(c.cm1,a.ns)+'</td>'
        +'<td class="r"><div class="t5-amt">₹'+fmt(mk)+'</div><div class="t5-sub">'+fmtPct(pctOf(mk,a.ns))+' of NS</div></td>'
        +'<td class="r">'+amtPct(c.net,a.ns)+'</td>'
        +'<td class="r"><span class="pill '+pc(c.net)+'">'+r2(pu(c.net,a.qty))+'</span></td></tr>';
    }).join('')
    +'</tbody></table></div>'+top5Insights()+'</div>';

  // 4 auto pointers under the Top 5 table
  function top5Insights(){
    if(!top.length||!(grand.ns>0)) return '';
    const R=g=>{const a=g.tot,c=calc(a);return {g,a,ns:a.ns,cm1:c.cm1,cm2:c.net,
      cm1P:pctOf(c.cm1,a.ns),cm2P:pctOf(c.net,a.ns),mkP:pctOf(a.promos+a.adsvis,a.ns),gmP:pctOf(a.ns-a.cogs-a.de,a.ns)};};
    const T=top.map(R), gc=calc(grand);
    const nm=x=>'<b>'+x.g.label+'</b>';
    const pts=[];
    // 1. Concentration
    const t5ns=T.reduce((s,x)=>s+x.ns,0), t5cm2=T.reduce((s,x)=>s+x.cm2,0);
    pts.push('<b>Concentration:</b> top 5 SKUs make '+fmtPct(pctOf(t5ns,grand.ns))+' of net sales across '+list.length+' SKUs; '+nm(T[0])+' alone is '+fmtPct(pctOf(T[0].ns,grand.ns))+'.');
    // 2. Profitability of the top 5
    const pos=T.filter(x=>x.cm2>=0).length;
    pts.push('<b>Profitability:</b> '+pos+' of '+T.length+' are CM2 positive. Top 5 CM2 is ₹'+fmt(t5cm2)+' ('+fmtPct(pctOf(t5cm2,t5ns))+' of their NS) vs ₹'+fmt(gc.net)+' ('+fmtPct(pctOf(gc.net,grand.ns))+') for the full portfolio.');
    // 3. Biggest drag and cause
    const worst=[...T].sort((a,b)=>a.cm2-b.cm2)[0];
    if(worst.cm2<0){
      const cause=worst.mkP>worst.cm1P
        ? 'promos + ads + vis at '+fmtPct(worst.mkP)+' of NS exceed its CM1 of '+fmtPct(worst.cm1P)+'; spend needs to fall below '+fmtPct(worst.cm1P)+' of NS to break even'
        : 'CM1 is already negative at '+fmtPct(worst.cm1P)+', so the issue is cost/price, not marketing';
      pts.push('<b>Biggest drag:</b> '+nm(worst)+' loses ₹'+fmt(Math.abs(worst.cm2))+'; '+cause+'.');
    } else {
      const best=[...T].sort((a,b)=>b.cm2-a.cm2)[0];
      pts.push('<b>Biggest contributor:</b> '+nm(best)+' earns ₹'+fmt(best.cm2)+' CM2 ('+fmtPct(best.cm2P)+' of NS).');
    }
    // 4. Margin headroom: best CM1% vs lowest gross margin %
    const hiCm1=[...T].sort((a,b)=>b.cm1P-a.cm1P)[0], loGm=[...T].sort((a,b)=>a.gmP-b.gmP)[0];
    pts.push('<b>Margin headroom:</b> '+nm(hiCm1)+' has the strongest CM1 at '+fmtPct(hiCm1.cm1P)+' of NS'
      +(hiCm1.cm2<0?' but still turns negative after spend ('+fmtPct(hiCm1.mkP)+' of NS)':'')
      +(loGm.g!==hiCm1.g?'; '+nm(loGm)+' has the thinnest gross margin at '+fmtPct(loGm.gmP)+', so pricing or COGS is the lever there':'')+'.');
    return '<div class="t5-ins"><div class="t5-ins-h">Key takeaways</div><ul>'+pts.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>';
  }

  // KPI strip shown only in fullscreen
  function ueFsStrip(){
    const chip=(lb,val,sub,cls)=>'<div class="fs-chip"><div class="fs-chip-lb">'+lb+'</div><div class="fs-chip-val '+(cls||'')+'">'+val+'</div>'+(sub?'<div class="fs-chip-sub">'+sub+'</div>':'')+'</div>';
    return '<div class="fs-strip"><div class="fs-meta"><span class="fs-month">All Portals · '+periodLabel+'</span></div><div class="fs-chips">'
      +chip('Units Sold',fmt(grand.qty),list.length+' SKUs')
      +chip('ASP',r2(pu(grand.gmv,grand.qty)),'GMV / unit')
      +chip('Net Realisation',r2(pu(grand.ns,grand.qty)),'per unit')
      +chip('Net Earning',r2(pu(gc.net,grand.qty)),fmtPct(gc.pct)+' of NS',pc(gc.net))
      +'</div></div>';
  }

  const head='<tr><th>SKU</th><th class="r">Qty</th><th class="r">ASP (GMV)</th><th class="r">Commission</th><th class="r">GST</th><th class="r">Net Realisation</th>'
    +'<th class="r">COGS</th><th class="r">Direct Exp</th><th class="r">Labour</th><th class="r">Logistics</th><th class="r">CM1 / Unit</th>'
    +'<th class="r">Promos</th><th class="r">Ads + Vis</th><th class="r">Net Earning / Unit</th><th class="c">% of NS</th><th class="r">Total Net Earning</th></tr>';

  return '<div class="ph"><div><div class="ph-title">Unit Economics</div><div class="ph-sub">All Portals · '+periodLabel+' · per unit</div></div>'
    +'<div class="ph-right" style="gap:8px"><span style="font-size:11px;color:var(--tx3)">Spend split</span>'+splitToggle+ctrls+'</div></div>'
    +kpis
    +(top.length?top5:'')
    +'<div class="card tcard sku-card" id="sku-card"><div class="thead-row"><div class="thead-title">Per Unit Waterfall · '+periodLabel+'</div>'
    +'<div class="flex gap8"><button class="btn btn-outline btn-sm ue-hide-fs" onclick="ueExportWorking()">📥 Export working</button><button class="btn btn-outline btn-sm" onclick="ueToggleAll(true)">▾ Expand all</button><button class="btn btn-outline btn-sm" onclick="ueToggleAll(false)">▴ Collapse all</button><button id="fs-btn" class="btn btn-sm fs-btn" onclick="toggleSkuFullscreen()">⛶ Expand</button></div></div>'
    +ueFsStrip()
    +'<div class="ue-hide-fs" style="padding:0 18px 10px;font-size:11.5px;color:var(--tx3)">GMV → commission (portal rate) → GST → Net Realisation → COGS, Direct Exp, Labour, Logistics → CM1 → Promos, Ads + Vis → Net Earning. NLC SKUs use Qty × NLC price for gross sales, same as the dashboard. Each pack size is its own row. Click a SKU to see each portal; hover the name to see the matched portal listings.</div>'
    +'<div class="ue-hide-fs">'+mapBar+'</div><div class="twrap"><table class="dash-tbl ue-tbl"><thead>'+head+'</thead><tbody>'+(body||emptyRow(16,'No SKUs'))+foot+'</tbody></table></div></div>';
}

// ── AI Insights ──────────────────────────────────────
function viewInsights() {
  const portals = ['blinkit', 'zepto', 'instamart'];
  const allMonths = MONTHS.filter(m => portals.some(p => S.data[dKey(p, m)]));

  const monthOptions = allMonths.map(m => `<option value="${m}">${m}</option>`).join('');

  return `<div class="ph"><div><div class="ph-title">AI Insights</div><div class="ph-sub">Ask questions about your CM2 data</div></div></div>
  <div class="card" style="padding:24px;max-width:860px">
    <div style="font-size:13px;font-weight:600;color:var(--tx2);margin-bottom:16px">Select Month Range</div>
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:20px">
      <select id="ai-from" style="font-family:Poppins,sans-serif;font-size:13px;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;color:var(--tx);background:var(--card)">
        ${monthOptions}
      </select>
      <span style="color:var(--tx3);font-size:13px">to</span>
      <select id="ai-to" style="font-family:Poppins,sans-serif;font-size:13px;padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;color:var(--tx);background:var(--card)">
        ${allMonths.map((m,i) => `<option value="${m}" ${i===allMonths.length-1?'selected':''}>${m}</option>`).join('')}
      </select>
    </div>
    <div style="font-size:13px;font-weight:600;color:var(--tx2);margin-bottom:10px">Your Question</div>
    <textarea id="ai-question" placeholder="e.g. What happened to CM2 from April to June 2026? Which portal improved the most?" style="width:100%;box-sizing:border-box;font-family:Poppins,sans-serif;font-size:13px;padding:12px;border:1.5px solid var(--border);border-radius:8px;color:var(--tx);background:var(--card);resize:vertical;min-height:90px;outline:none;line-height:1.6"></textarea>
    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
      <button onclick="runAiInsight()" style="font-family:Poppins,sans-serif;font-size:13px;font-weight:600;padding:10px 24px;background:var(--green);color:#fff;border:none;border-radius:8px;cursor:pointer">✨ Generate Insight</button>
      <button onclick="document.getElementById('ai-question').value='What happened to CM2 across all portals in the selected months?'" style="font-family:Poppins,sans-serif;font-size:12px;padding:10px 14px;background:transparent;color:var(--tx3);border:1.5px solid var(--border);border-radius:8px;cursor:pointer">CM2 Overview</button>
      <button onclick="document.getElementById('ai-question').value='Which portal had the best CM2% and why? What drove the difference?'" style="font-family:Poppins,sans-serif;font-size:12px;padding:10px 14px;background:transparent;color:var(--tx3);border:1.5px solid var(--border);border-radius:8px;cursor:pointer">Portal Comparison</button>
      <button onclick="document.getElementById('ai-question').value='How did marketing spend (Ads+Vis and Promos) impact CM2% over the selected period?'" style="font-family:Poppins,sans-serif;font-size:12px;padding:10px 14px;background:transparent;color:var(--tx3);border:1.5px solid var(--border);border-radius:8px;cursor:pointer">Marketing Impact</button>
    </div>
  </div>
  <div id="ai-result" style="max-width:860px;margin-top:16px"></div>`;
}

async function runAiInsight() {
  const fromMonth = document.getElementById('ai-from').value;
  const toMonth   = document.getElementById('ai-to').value;
  const question  = document.getElementById('ai-question').value.trim();
  if (!question) { toast('Please enter a question', 'err'); return; }

  const portals = ['blinkit', 'zepto', 'instamart'];
  const allMonths = MONTHS.filter(m => portals.some(p => S.data[dKey(p, m)]));
  const fromIdx = allMonths.indexOf(fromMonth);
  const toIdx   = allMonths.indexOf(toMonth);
  const selMonths = allMonths.slice(Math.min(fromIdx, toIdx), Math.max(fromIdx, toIdx) + 1);

  // Build data context
  const dataContext = selMonths.map(m => {
    const row = { month: m };
    portals.forEach(p => {
      const e = S.data[dKey(p, m)];
      if (!e) return;
      const t = totals(e.skus, e.nlcSkus, e.config || S.config[p], e.portalTotals, e.nlcTotals);
      row[p] = {
        gmv:      Math.round(t.gmv),
        netSales: Math.round(t.netSales),
        cm1:      Math.round(t.cm1),
        cm1Pct:   +t.cm1Pct.toFixed(2),
        cm2:      Math.round(t.cm2),
        cm2Pct:   +t.cm2Pct.toFixed(2),
        promos:   Math.round(t.promos),
        ads:      Math.round(t.ads + t.vis),
        commission: Math.round(t.commission),
        cogs:     Math.round(t.cogs),
      };
    });
    return row;
  });

  const resultEl = document.getElementById('ai-result');
  resultEl.innerHTML = `<div class="card" style="padding:24px;max-width:860px">
    <div style="display:flex;align-items:center;gap:12px;color:var(--tx3);font-size:13px">
      <div style="width:20px;height:20px;border:3px solid var(--border);border-top-color:var(--green);border-radius:50%;animation:spin 0.8s linear infinite"></div>
      Analysing your data...
    </div>
  </div>`;

  try {
    const prompt = `You are a financial analyst for Snackible, an Indian D2C millet snack brand. 
You have access to monthly CM2 waterfall data across Blinkit, Zepto, and Instamart (Q-commerce portals).

CM2 Waterfall: GMV → Net Sales (after commission + GST) → Gross Margin (after COGS + Direct Exp) → CM1 (after Labour + Logistics) → CM2 (after Promos + Ads+Visibility).

Here is the monthly data for the selected period:
${JSON.stringify(dataContext, null, 2)}

All monetary values are in Indian Rupees (₹). Percentages are % of Net Sales unless stated otherwise.

Answer this question concisely and insightfully in 150-250 words. Use specific numbers from the data. Format with short paragraphs, no bullet points:
${question}`;

    const res = await fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    const text = data.text || 'No response received.';

    resultEl.innerHTML = `<div class="card" style="padding:24px;max-width:860px">
      <div style="font-size:11px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px">AI Analysis · ${fromMonth} to ${toMonth}</div>
      <div style="font-size:14px;line-height:1.8;color:var(--tx)">${text.split('\n\n').join('</p><p style="margin-top:12px">').split('\n').join('<br>')}</div>
      <div style="margin-top:16px;font-size:11px;color:var(--tx3);border-top:1px solid var(--border);padding-top:12px">Generated by Claude · Based on ${selMonths.length} month(s) of data across ${portals.filter(p=>selMonths.some(m=>S.data[dKey(p,m)])).length} portals</div>
    </div>`;
  } catch(e) {
    resultEl.innerHTML = `<div class="card" style="padding:24px;max-width:860px;border:1.5px solid #FCA5A5">
      <div style="color:#DC2626;font-size:13px">Error: ${e.message}</div>
    </div>`;
  }
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


// ── Injected UI styles (sidebar collapse, table spacing, frozen SKU column) ──
(function injectUiStyles(){
  if(document.getElementById('cm2-ui-styles')) return;
  const st=document.createElement('style'); st.id='cm2-ui-styles';
  st.textContent=`
  .sidebar{transition:width .2s,min-width .2s}
  .sb-logo{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
  .sb-toggle{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:6px;cursor:pointer;font-size:14px;line-height:1;padding:4px 8px;font-family:Poppins,sans-serif}
  .sb-toggle:hover{background:rgba(255,255,255,.18)}
  .sidebar.collapsed{width:72px!important;min-width:72px!important;padding-left:10px!important;padding-right:10px!important;overflow:hidden}
  .sidebar.collapsed .sb-lbl,.sidebar.collapsed .sec-label{display:none!important}
  .sidebar.collapsed .sb-logo{justify-content:center}
  .sidebar.collapsed .nav-item{justify-content:center;padding-left:0;padding-right:0}
  .sidebar.collapsed .portal-chips{display:flex;flex-direction:column;gap:6px}
  .sidebar.collapsed .pchip{text-align:center;padding-left:0;padding-right:0}
  .dash-tbl th,.dash-tbl td{padding:13px 16px!important}
  .dash-tbl td{font-size:14px!important}
  .dash-tbl th{font-size:11.5px!important}
  .dash-tbl .pill{font-size:12.5px!important;padding:3px 9px}
  .dash-tbl small{font-size:12px}
  .dash-tbl th:first-child,.dash-tbl td:first-child{position:sticky;left:0;z-index:2;background:#fff;box-shadow:inset -1px 0 0 #D9E3E2}
  .dash-tbl thead th{position:sticky;top:0;z-index:4;background:#F3F8F7;box-shadow:inset 0 -1px 0 #D9E3E2}
  .dash-tbl thead th:first-child{z-index:5;left:0;background:#F3F8F7;box-shadow:inset -1px -1px 0 #D9E3E2}
  .sku-card .twrap{max-height:72vh;overflow:auto}
  .fs-btn{background:var(--green);color:#fff;border:1.5px solid var(--green);font-weight:600;white-space:nowrap}
  .fs-btn:hover{opacity:.9}
  .fs-strip{display:none}
  .ue-tbl tr.ue-main{cursor:pointer}
  .t5-tbl td{vertical-align:middle}
  .t5-ins{margin:4px 18px 16px;padding:12px 16px;background:#F7FBFA;border:1px solid #DCEBE8;border-radius:10px}
  .t5-ins-h{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#02514F;margin-bottom:6px}
  .t5-ins ul{margin:0;padding-left:18px}
  .t5-ins li{font-size:13px;line-height:1.6;color:#334155;margin:3px 0}
  .t5-ins b{color:#0F172A}
  .t5-tbl .t5-amt{font-weight:700;color:#0F172A}
  .t5-tbl .t5-amt.neg{color:var(--neg)}
  .t5-tbl .t5-sub{font-size:11.5px;color:#64748B;margin-top:2px}
  .t5-tbl .t5-rank{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#02514F;color:#fff;font-size:11px;font-weight:700;margin-right:9px}
  .t5-tbl tbody td:first-child{background:#fff!important}
  .ue-unm{font-size:10px;font-weight:700;color:#9A5B00;background:#FFF4E5;border-radius:4px;padding:1px 6px;margin-left:6px}
  .ue-map-bar{margin:0 18px 10px;padding:8px 12px;border-radius:8px;font-size:12px;background:#F3F8F7;color:#334155;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .ue-map-bar.warn{background:#FFF8EC;color:#7A4A00}
  .ue-map-bar.ok{background:#EEF6F5;color:#02514F}
  .dash-tbl.ue-tbl tbody tr td:first-child{background:#fff!important}
  .dash-tbl.ue-tbl tbody tr.ue-sub td:first-child{background:#FAFCFC!important}
  .dash-tbl.ue-tbl tbody tr.gt td:first-child{background:#EEF6F5!important}
  .dash-tbl.ue-tbl tbody tr.ue-main:hover td{background:#F3F8F7!important}
  .ue-tbl .ue-car{display:inline-block;width:16px;color:var(--green);font-weight:700}
  .ue-tbl .ue-pc{font-size:10px;font-weight:700;color:#64748B;background:#EEF2F1;border-radius:4px;padding:1px 5px;margin-right:7px;display:inline-block;min-width:16px;text-align:center}
  .ue-tbl tr.ue-sub td{background:#FAFCFC;font-size:13px!important;padding-top:9px!important;padding-bottom:9px!important}
  .ue-tbl tr.ue-sub td:first-child{background:#FAFCFC;padding-left:34px!important;color:#475569}
  .ue-tbl .ue-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px}
  .ue-tbl td.ue-cost{color:#64748B}
  .ue-tbl td.ue-key{font-weight:700;color:#0F172A}
  .ue-tbl td.ue-net{font-weight:700}
  .ue-tbl td.ue-net.pos{color:var(--pos)}
  .ue-tbl td.ue-net.neg{color:var(--neg)}
  .kpi-grid{width:100%;border-collapse:collapse;margin-top:10px;border-top:1px solid #EEF2F1;font-size:12px}
  .kpi-grid th{font-size:10px;color:var(--tx3);font-weight:700;text-align:right;padding:6px 0 2px;text-transform:uppercase;letter-spacing:.03em}
  .kpi-grid td{padding:3px 0 3px 6px;text-align:right;color:#1E293B;white-space:nowrap;font-weight:500}
  .kpi-grid td:first-child,.kpi-grid th:first-child{text-align:left;color:#64748B;font-weight:600;padding-left:0}
  .kpi-grid tr:first-child td{padding-top:7px}
  .kpi-grid tr.kg-now td{font-weight:700;color:#0F172A}
  .kpi-grid td.kg-up{color:var(--pos);font-weight:600}
  .kpi-grid td.kg-dn{color:var(--neg);font-weight:600}
  .sku-card.is-fs{position:fixed;inset:0;z-index:9999;margin:0;border-radius:0;width:100vw;height:100vh;max-width:none;display:flex;flex-direction:column;background:#fff;padding:16px 24px;box-sizing:border-box;overflow:hidden}
  .sku-card:fullscreen{width:100vw;height:100vh;background:#fff}
  .sku-card.is-fs .fs-strip{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:10px 0 14px}
  .sku-card.is-fs .twrap{flex:1;max-height:none;min-height:0}
  .sku-card.is-fs .saved-metrics{display:none}
  .sku-card.is-fs .ue-hide-fs,.sku-card:fullscreen .ue-hide-fs{display:none!important}
  .fs-meta{display:flex;align-items:center;gap:10px}
  .fs-month{font-size:14px;font-weight:600;color:var(--tx)}
  .fs-chips{display:flex;gap:10px;flex-wrap:wrap}
  .fs-chip{background:#F3F8F7;border:1px solid #D9E3E2;border-radius:8px;padding:8px 14px;min-width:120px}
  .fs-chip-lb{font-size:10px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:.05em}
  .fs-chip-val{font-size:17px;font-weight:700;color:var(--tx)}
  .fs-chip-sub{font-size:11px;color:var(--tx3)}
  .fs-chip-val.pos{color:var(--pos)}
  .fs-chip-val.neg{color:var(--neg)}
  .dash-tbl tbody td:first-child{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:300px!important;width:300px;min-width:300px}
  .dash-tbl thead th:first-child{min-width:300px}
  .dash-tbl tr.gt td:first-child{background:#EEF6F5}
  .dash-tbl tr[style] td:first-child{background:inherit}
  .dash-tbl td.nlc-ref{background:#E4E9F0!important;color:#64748B;font-style:italic}
  .dash-tbl tr.promo-sub{display:none}
  .dash-tbl.show-promo tr.promo-sub{display:table-row}
  .dash-tbl tr.promo-sub td{padding-top:4px!important;padding-bottom:8px!important;background:#FAFCFC;border-top:none;font-size:12.5px!important;color:var(--tx3)}
  .dash-tbl tr.promo-sub td:first-child{background:#FAFCFC;font-style:italic;padding-left:28px!important}
  .dash-tbl .ps-val{white-space:nowrap}
  .dash-tbl .ps-val span{display:inline-block;background:#FFF4E5;color:#9A5B00;border-radius:4px;padding:2px 6px;margin-left:4px;font-weight:600}
  .dash-tbl .ps-val small{font-weight:500;opacity:.8}
  .dash-tbl tr.pct-row{display:none}
  .dash-tbl.show-pct tr.pct-row{display:table-row}
  .dash-tbl tr.pct-toggle td{padding-top:6px!important;padding-bottom:6px!important;background:#fff;border-bottom:none}
  .dash-tbl .pct-btn{background:#fff;border:1.5px solid var(--green);color:var(--green);border-radius:6px;padding:4px 12px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:Poppins,sans-serif}
  .dash-tbl .pct-btn:hover{background:#EEF6F5}
  .dash-tbl tr.pct-row td{padding-top:8px!important;padding-bottom:8px!important;font-size:13px!important;font-weight:600;color:var(--green);background:#F7FBFA}
  .dash-tbl tr.pct-row td:first-child{background:#F7FBFA;color:#1E293B;font-weight:600;-webkit-font-smoothing:antialiased}
  .dash-tbl tr.pct-row td{color:#02514F}
  `;
  document.head.appendChild(st);
})();

// Keep main content aligned when the sidebar is position:fixed
function syncSidebarOffset(){
  const sb=document.querySelector('.sidebar'), mn=document.querySelector('.main');
  if(!sb||!mn) return;
  if(getComputedStyle(sb).position==='fixed'){
    mn.style.marginLeft=sb.offsetWidth+'px';
    mn.style.transition='margin-left .2s';
    setTimeout(()=>{ mn.style.marginLeft=sb.offsetWidth+'px'; },220);
  }
}

// ── Render ────────────────────────────────────────────
function render(){
  let body='';
  if(S.view==='dashboard') body=viewDashboard();
  else if(S.view==='entry')     body=viewEntry();
  else if(S.view==='combined')  body=viewCombined();
  else if(S.view==='trends')    body=viewTrends();
  else if(S.view==='insights')  body=viewInsights();
  else if(S.view==='unit')      body=viewUnitEconomics();
  document.getElementById('app').innerHTML='<div class="shell">'+sidebar()+'<main class="main">'+body+'</main></div>';
  document.querySelectorAll('main script').forEach(function(s){var el=document.createElement('script');el.textContent=s.textContent;document.body.appendChild(el);});
  syncSidebarOffset();
}

// Show loading screen while fetching server data
document.getElementById('app').innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Poppins,sans-serif;gap:16px"><div style="width:40px;height:40px;border:4px solid #e5e7eb;border-top-color:#2D6A4F;border-radius:50%;animation:spin 0.8s linear infinite"></div><div style="color:#6B7280;font-size:14px">Loading your data...</div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
load().then(() => render());
