/**
 * SONRISA PERFECTA - APLICACIÓN DE GESTIÓN ODONTOLÓGICA & ODONTOGRAMA
 * Lógica principal, Odontograma FDI con cordales, Agenda y Persistencia
 */

// DEFINICIÓN ANATÓMICA COMPLETA DE LAS 52 PIEZAS DENTALES (PERMANENTES Y TEMPORALES - SISTEMA INTERNACIONAL FDI)
const TEETH_MAP = {
  // CUADRANTE 1: SUPERIOR DERECHO (18 a 11) - Adultos
  "18": { name: "Tercer Molar Superior Derecho (Cordal)", type: "molar", isCordal: true, quadrant: 1, arch: "superior", isTemporal: false },
  "17": { name: "Segundo Molar Superior Derecho", type: "molar", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "16": { name: "Primer Molar Superior Derecho", type: "molar", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "15": { name: "Segundo Premolar Superior Derecho", type: "premolar", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "14": { name: "Primer Premolar Superior Derecho", type: "premolar", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "13": { name: "Canino Superior Derecho", type: "canino", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "12": { name: "Incisivo Lateral Superior Derecho", type: "incisivo", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },
  "11": { name: "Incisivo Central Superior Derecho", type: "incisivo", isCordal: false, quadrant: 1, arch: "superior", isTemporal: false },

  // CUADRANTE 2: SUPERIOR IZQUIERDO (21 a 28) - Adultos
  "21": { name: "Incisivo Central Superior Izquierdo", type: "incisivo", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "22": { name: "Incisivo Lateral Superior Izquierdo", type: "incisivo", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "23": { name: "Canino Superior Izquierdo", type: "canino", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "24": { name: "Primer Premolar Superior Izquierdo", type: "premolar", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "25": { name: "Segundo Premolar Superior Izquierdo", type: "premolar", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "26": { name: "Primer Molar Superior Izquierdo", type: "molar", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "27": { name: "Segundo Molar Superior Izquierdo", type: "molar", isCordal: false, quadrant: 2, arch: "superior", isTemporal: false },
  "28": { name: "Tercer Molar Superior Izquierdo (Cordal)", type: "molar", isCordal: true, quadrant: 2, arch: "superior", isTemporal: false },

  // CUADRANTE 5: TEMPORAL SUPERIOR DERECHO (55 a 51) - Infantil
  "55": { name: "Segundo Molar Temporal Superior Derecho", type: "molar", isCordal: false, quadrant: 5, arch: "superior", isTemporal: true },
  "54": { name: "Primer Molar Temporal Superior Derecho", type: "molar", isCordal: false, quadrant: 5, arch: "superior", isTemporal: true },
  "53": { name: "Canino Temporal Superior Derecho", type: "canino", isCordal: false, quadrant: 5, arch: "superior", isTemporal: true },
  "52": { name: "Incisivo Lateral Temporal Superior Derecho", type: "incisivo", isCordal: false, quadrant: 5, arch: "superior", isTemporal: true },
  "51": { name: "Incisivo Central Temporal Superior Derecho", type: "incisivo", isCordal: false, quadrant: 5, arch: "superior", isTemporal: true },

  // CUADRANTE 6: TEMPORAL SUPERIOR IZQUIERDO (61 a 65) - Infantil
  "61": { name: "Incisivo Central Temporal Superior Izquierdo", type: "incisivo", isCordal: false, quadrant: 6, arch: "superior", isTemporal: true },
  "62": { name: "Incisivo Lateral Temporal Superior Izquierdo", type: "incisivo", isCordal: false, quadrant: 6, arch: "superior", isTemporal: true },
  "63": { name: "Canino Temporal Superior Izquierdo", type: "canino", isCordal: false, quadrant: 6, arch: "superior", isTemporal: true },
  "64": { name: "Primer Molar Temporal Superior Izquierdo", type: "molar", isCordal: false, quadrant: 6, arch: "superior", isTemporal: true },
  "65": { name: "Segundo Molar Temporal Superior Izquierdo", type: "molar", isCordal: false, quadrant: 6, arch: "superior", isTemporal: true },

  // CUADRANTE 8: TEMPORAL INFERIOR DERECHO (85 a 81) - Infantil
  "85": { name: "Segundo Molar Temporal Inferior Derecho", type: "molar", isCordal: false, quadrant: 8, arch: "inferior", isTemporal: true },
  "84": { name: "Primer Molar Temporal Inferior Derecho", type: "molar", isCordal: false, quadrant: 8, arch: "inferior", isTemporal: true },
  "83": { name: "Canino Temporal Inferior Derecho", type: "canino", isCordal: false, quadrant: 8, arch: "inferior", isTemporal: true },
  "82": { name: "Incisivo Lateral Temporal Inferior Derecho", type: "incisivo", isCordal: false, quadrant: 8, arch: "inferior", isTemporal: true },
  "81": { name: "Incisivo Central Temporal Inferior Derecho", type: "incisivo", isCordal: false, quadrant: 8, arch: "inferior", isTemporal: true },

  // CUADRANTE 7: TEMPORAL INFERIOR IZQUIERDO (71 a 75) - Infantil
  "71": { name: "Incisivo Central Temporal Inferior Izquierdo", type: "incisivo", isCordal: false, quadrant: 7, arch: "inferior", isTemporal: true },
  "72": { name: "Incisivo Lateral Temporal Inferior Izquierdo", type: "incisivo", isCordal: false, quadrant: 7, arch: "inferior", isTemporal: true },
  "73": { name: "Canino Temporal Inferior Izquierdo", type: "canino", isCordal: false, quadrant: 7, arch: "inferior", isTemporal: true },
  "74": { name: "Primer Molar Temporal Inferior Izquierdo", type: "molar", isCordal: false, quadrant: 7, arch: "inferior", isTemporal: true },
  "75": { name: "Segundo Molar Temporal Inferior Izquierdo", type: "molar", isCordal: false, quadrant: 7, arch: "inferior", isTemporal: true },

  // CUADRANTE 4: INFERIOR DERECHO (48 a 41) - Adultos
  "48": { name: "Tercer Molar Inferior Derecho (Cordal)", type: "molar", isCordal: true, quadrant: 4, arch: "inferior", isTemporal: false },
  "47": { name: "Segundo Molar Inferior Derecho", type: "molar", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "46": { name: "Primer Molar Inferior Derecho", type: "molar", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "45": { name: "Segundo Premolar Inferior Derecho", type: "premolar", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "44": { name: "Primer Premolar Inferior Derecho", type: "premolar", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "43": { name: "Canino Inferior Derecho", type: "canino", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "42": { name: "Incisivo Lateral Inferior Derecho", type: "incisivo", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },
  "41": { name: "Incisivo Central Inferior Derecho", type: "incisivo", isCordal: false, quadrant: 4, arch: "inferior", isTemporal: false },

  // CUADRANTE 3: INFERIOR IZQUIERDO (31 a 38) - Adultos
  "31": { name: "Incisivo Central Inferior Izquierdo", type: "incisivo", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "32": { name: "Incisivo Lateral Inferior Izquierdo", type: "incisivo", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "33": { name: "Canino Inferior Izquierdo", type: "canino", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "34": { name: "Primer Premolar Inferior Izquierdo", type: "premolar", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "35": { name: "Segundo Premolar Inferior Izquierdo", type: "premolar", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "36": { name: "Primer Molar Inferior Izquierdo", type: "molar", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "37": { name: "Segundo Molar Inferior Izquierdo", type: "molar", isCordal: false, quadrant: 3, arch: "inferior", isTemporal: false },
  "38": { name: "Tercer Molar Inferior Izquierdo (Cordal)", type: "molar", isCordal: true, quadrant: 3, arch: "inferior", isTemporal: false }
};

// ESTADO GLOBAL
let appState = {
  clinic: {},
  treatments: [],
  patients: [],
  appointments: [],
  currentPatientId: null,
  activeToothModalNum: null,
  selectedTooth: null,
  activeTool: 'caries', // Herramienta activa de pincel por defecto (🔴 Caries)
  appointmentViewMode: 'blocks', // 'blocks' (cronograma 30 min) o 'list'
  selectedAppointmentDate: new Date().toISOString().slice(0, 10),
  selectedBudgetMonth: new Date().toISOString().slice(0, 7), // YYYY-MM actual
  budgetViewMode: 'monthly' // 'monthly' (totales del mes) o 'patient' (desglose)
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', async () => {
  await loadAppData();
  setupNavigation();
  setupEventListeners();
  populateGlobalPatientSelect();
  renderAppointmentsView();
  renderOdontogramBoard();
  renderPatientsList();
  renderBudgetsView();
  renderGalleryView();
  populateClinicConfig();
});

// CARGA Y PERSISTENCIA
async function loadAppData() {
  try {
    let saved = null;
    if (window.api && window.api.loadData) {
      saved = await window.api.loadData();
    } else {
      const local = localStorage.getItem('sonrisa_perfecta_db');
      if (local) saved = JSON.parse(local);
    }

    if (saved && saved.patients && saved.patients.length > 0) {
      appState = saved;
    } else if (typeof initialData !== 'undefined') {
      appState = JSON.parse(JSON.stringify(initialData));
      await saveAppData();
    }
  } catch (e) {
    console.error('Error cargando datos:', e);
    if (typeof initialData !== 'undefined') {
      appState = JSON.parse(JSON.stringify(initialData));
    }
  }

  if (appState.patients && appState.patients.length > 0 && !appState.currentPatientId) {
    appState.currentPatientId = appState.patients[0].id;
  }
}

async function saveAppData() {
  try {
    if (window.api && window.api.saveData) {
      await window.api.saveData(appState);
    } else {
      localStorage.setItem('sonrisa_perfecta_db', JSON.stringify(appState));
    }
  } catch (e) {
    console.error('Error guardando datos:', e);
  }
}

// NAVEGACIÓN ENTRE PESTAÑAS
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const viewPanels = document.querySelectorAll('.view-panel');
  const titleElem = document.getElementById('current-view-title');
  const subtitleElem = document.getElementById('current-view-subtitle');

  const titles = {
    citas: { title: "Agenda & Control de Citas", sub: "Control diario, recordatorios vía WhatsApp y estados" },
    odontograma: { title: "Odontograma Interactivo FDI", sub: "Visualización anatómica completa con cordales y piezas temporales" },
    historia: { title: "Historia Clínica Odontológica (Control de Cita)", sub: "Formato oficial de la Dra. Celenia Tovar, antecedentes y odontograma por cuadrantes" },
    pacientes: { title: "Expediente & Ficha de Pacientes", sub: "Historial médico, antecedentes y alertas de salud críticas" },
    presupuestos: { title: "Presupuestos, Tratamientos & Pagos", sub: "Control de costos, planes de tratamiento y abonos" },
    galeria: { title: "Radiografías & Galería Clínica", sub: "Fotos intraorales, antes/después y radiografías diagnósticas" },
    configuracion: { title: "Configuración & Respaldo", sub: "Datos de la clínica Sonrisa Perfecta, C.A. y copias de seguridad" }
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      viewPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`view-${view}`);
      if (activePanel) activePanel.classList.add('active');

      if (titles[view]) {
        titleElem.textContent = titles[view].title;
        subtitleElem.textContent = titles[view].sub;
      }

      // Refrescar vistas pertinentes
      if (view === 'odontograma') renderOdontogramBoard();
      if (view === 'historia') renderClinicalHistoryView();
      if (view === 'citas') renderAppointmentsView();
      if (view === 'pacientes') renderPatientsList();
      if (view === 'presupuestos') renderBudgetsView();
      if (view === 'galeria') renderGalleryView();
    });
  });
}

function switchView(viewName) {
  const targetNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (targetNav) targetNav.click();
}

// SELECTOR GLOBAL DE PACIENTE
function populateGlobalPatientSelect() {
  const select = document.getElementById('global-patient-select');
  if (!select) return;
  select.innerHTML = '';
  appState.patients.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === appState.currentPatientId) opt.selected = true;
    select.appendChild(opt);
  });

  select.onchange = () => {
    appState.currentPatientId = select.value;
    renderOdontogramBoard();
    renderPatientsList();
    renderBudgetsView();
    renderGalleryView();
    showToast(`Paciente activo cambiado a: ${getCurrentPatient()?.name || ''}`);
  };
}

function getCurrentPatient() {
  return appState.patients.find(p => p.id === appState.currentPatientId) || appState.patients[0];
}

// ==========================================================================
// 1. ODONTOGRAMA INTERACTIVO CON CORDALES Y CARAS
// ==========================================================================

function renderOdontogramBoard() {
  const patient = getCurrentPatient();
  if (!patient) return;
  if (!patient.odontogram) patient.odontogram = {};

  // Cuadrante 1: 18 a 11 (De afuera hacia el centro)
  renderQuadrantTeeth('teeth-quadrant-1', ['18', '17', '16', '15', '14', '13', '12', '11'], patient);
  // Cuadrante 2: 21 a 28 (Del centro hacia afuera)
  renderQuadrantTeeth('teeth-quadrant-2', ['21', '22', '23', '24', '25', '26', '27', '28'], patient);
  // Cuadrante 5: 55 a 51 (Temporal Superior Derecho)
  renderQuadrantTeeth('teeth-quadrant-5', ['55', '54', '53', '52', '51'], patient);
  // Cuadrante 6: 61 a 65 (Temporal Superior Izquierdo)
  renderQuadrantTeeth('teeth-quadrant-6', ['61', '62', '63', '64', '65'], patient);
  // Cuadrante 8: 85 a 81 (Temporal Inferior Derecho)
  renderQuadrantTeeth('teeth-quadrant-8', ['85', '84', '83', '82', '81'], patient);
  // Cuadrante 7: 71 a 75 (Temporal Inferior Izquierdo)
  renderQuadrantTeeth('teeth-quadrant-7', ['71', '72', '73', '74', '75'], patient);
  // Cuadrante 4: 48 a 41 (De afuera hacia el centro)
  renderQuadrantTeeth('teeth-quadrant-4', ['48', '47', '46', '45', '44', '43', '42', '41'], patient);
  // Cuadrante 3: 31 a 38 (Del centro hacia afuera)
  renderQuadrantTeeth('teeth-quadrant-3', ['31', '32', '33', '34', '35', '36', '37', '38'], patient);

  renderLiveOdontoBudget();
}

function renderQuadrantTeeth(containerId, toothNumbers, patient) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  toothNumbers.forEach(num => {
    const meta = TEETH_MAP[num];
    const toothData = patient.odontogram[num] || { condition: 'sano', surfaces: {} };
    const cond = toothData.condition || 'sano';
    const isSelected = appState.selectedTooth === num;

    const card = document.createElement('div');
    card.className = `tooth-card ${meta.isCordal ? 'is-cordal' : ''} ${isSelected ? 'selected' : ''}`;
    card.setAttribute('data-tooth-num', num);
    card.title = `${meta.name}\nEstado: ${cond.toUpperCase()}${toothData.notes ? '\n' + toothData.notes : ''}\nHaz clic en cualquier cuadrito para marcar con la herramienta activa.`;

    if (meta.isCordal) {
      const badge = document.createElement('div');
      badge.className = 'cordal-pill';
      badge.textContent = 'CORDAL';
      card.appendChild(badge);
    }

    const numSpan = document.createElement('span');
    numSpan.className = 'tooth-num';
    numSpan.textContent = num;
    card.appendChild(numSpan);

    // SVG interactivo del diente
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'tooth-icon-wrapper';
    iconWrapper.innerHTML = generateToothSVG(num, toothData.surfaces, cond, meta);
    card.appendChild(iconWrapper);

    // Pill de resumen de estado
    const statusPill = document.createElement('div');
    statusPill.className = 'tooth-status-pill';
    const summaryBadge = getToothSummaryBadge(toothData);
    statusPill.textContent = summaryBadge.text;
    statusPill.style.backgroundColor = summaryBadge.bg;
    statusPill.style.color = summaryBadge.color;
    card.appendChild(statusPill);

    // Click en caras/cuadritos individuales del SVG
    iconWrapper.querySelectorAll('.tooth-surface').forEach(surfaceElem => {
      surfaceElem.addEventListener('click', (e) => {
        e.stopPropagation(); // ¡Evita activar solo el diente completo!
        const face = surfaceElem.getAttribute('data-face');
        applyToolToToothFace(num, face, appState.activeTool);
        selectToothQuick(num, false);
      });
    });

    // Click en la tarjeta (número o borde exterior) -> Abrir/detallar en panel inferior sin tocar caras
    card.addEventListener('click', (e) => {
      selectToothQuick(num, true);
    });

    container.appendChild(card);
  });
}

// GENERADOR DE SVG PARA EL DIENTE (5 CARAS ODONTOLÓGICAS FDI CON DETALLE INDIVIDUAL)
function generateToothSVG(toothNum, surfaces = {}, globalCond = 'sano', meta = {}) {
  const isSpecial = globalCond === 'ausente' || globalCond === 'cirugia';
  const vestibular = surfaces.vestibular || (isSpecial ? globalCond : 'sano');
  const lingual = surfaces.lingual || (isSpecial ? globalCond : 'sano');
  const mesial = surfaces.mesial || (isSpecial ? globalCond : 'sano');
  const distal = surfaces.distal || (isSpecial ? globalCond : 'sano');
  const oclusal = surfaces.oclusal || (isSpecial ? globalCond : 'sano');

  let overlayIcon = '';
  if (globalCond === 'ausente') {
    overlayIcon = `<line x1="6" y1="6" x2="42" y2="42" stroke="#475569" stroke-width="4"/><line x1="42" y1="6" x2="6" y2="42" stroke="#475569" stroke-width="4"/>`;
  } else if (globalCond === 'cirugia') {
    overlayIcon = `<circle cx="24" cy="24" r="8" fill="#be123c" opacity="0.9"/><text x="24" y="27" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">✂</text>`;
  } else if (globalCond === 'corona') {
    overlayIcon = `<path d="M14 16 L24 20 L34 16 L31 28 L17 28 Z" fill="#8b5cf6" opacity="0.9"/>`;
  } else if (globalCond === 'endodoncia') {
    overlayIcon = `<line x1="24" y1="12" x2="24" y2="36" stroke="#d97706" stroke-width="3" stroke-dasharray="3,2"/>`;
  }

  return `
    <svg class="tooth-svg" viewBox="0 0 48 48" data-tooth="${toothNum}">
      <!-- Marco anatómico -->
      <rect x="4" y="4" width="40" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>

      <!-- Cara Superior (Vestibular) -->
      <polygon points="4,4 44,4 34,14 14,14" class="tooth-surface tooth-face-vestibular ${vestibular}" data-tooth="${toothNum}" data-face="vestibular" title="Vestibular (Frente): ${getConditionLabel(vestibular)}" />
      
      <!-- Cara Inferior (Lingual / Palatina) -->
      <polygon points="4,44 44,44 34,34 14,34" class="tooth-surface tooth-face-lingual ${lingual}" data-tooth="${toothNum}" data-face="lingual" title="Lingual/Palatina: ${getConditionLabel(lingual)}" />
      
      <!-- Cara Izquierda (Mesial) -->
      <polygon points="4,4 14,14 14,34 4,44" class="tooth-surface tooth-face-mesial ${mesial}" data-tooth="${toothNum}" data-face="mesial" title="Mesial (Lateral): ${getConditionLabel(mesial)}" />
      
      <!-- Cara Derecha (Distal) -->
      <polygon points="44,4 34,14 34,34 44,44" class="tooth-surface tooth-face-distal ${distal}" data-tooth="${toothNum}" data-face="distal" title="Distal (Lateral): ${getConditionLabel(distal)}" />
      
      <!-- Cara Central (Oclusal / Incisal) -->
      <rect x="14" y="14" width="20" height="20" rx="3" class="tooth-surface tooth-face-oclusal ${oclusal}" data-tooth="${toothNum}" data-face="oclusal" title="Oclusal (Centro): ${getConditionLabel(oclusal)}" />

      ${overlayIcon}
    </svg>
  `;
}

function getToothSummaryBadge(toothData) {
  const cond = toothData.condition || 'sano';
  if (cond === 'cirugia') return { text: 'Cirugía', bg: '#ffe4e6', color: '#be123c' };
  if (cond === 'ausente') return { text: 'Ausente', bg: '#e2e8f0', color: '#64748b' };
  if (cond === 'endodoncia') return { text: 'Conducto', bg: '#fef3c7', color: '#d97706' };
  if (cond === 'corona') return { text: 'Corona', bg: '#ede9fe', color: '#8b5cf6' };

  const surfaces = toothData.surfaces || {};
  const values = Object.values(surfaces);
  if (values.includes('caries')) return { text: 'Caries', bg: '#fee2e2', color: '#ef4444' };
  if (values.includes('obturado')) return { text: 'Resina', bg: '#dbeafe', color: '#0284c7' };
  if (values.includes('endodoncia')) return { text: 'Conducto', bg: '#fef3c7', color: '#d97706' };
  if (values.includes('corona')) return { text: 'Corona', bg: '#ede9fe', color: '#8b5cf6' };

  return { text: 'Sano', bg: '#f1f5f9', color: '#475569' };
}

function getConditionLabel(cond) {
  const map = {
    sano: 'Sano',
    caries: 'Caries',
    obturado: 'Resina',
    endodoncia: 'Conducto',
    cirugia: 'Cirugía/Extr.',
    corona: 'Corona',
    ausente: 'Ausente',
    sellante: 'Sellante'
  };
  return map[cond] || cond;
}

function getConditionIconLabel(cond) {
  const map = {
    sano: '🟢 Sano',
    caries: '🔴 Caries',
    obturado: '🔵 Resina',
    endodoncia: '🟡 Conducto',
    cirugia: '🪚 Cirugía',
    corona: '🟣 Corona',
    ausente: '⚫ Ausente',
    sellante: '🛡️ Sellante'
  };
  return map[cond] || cond;
}

function getConditionBgColor(cond) {
  const map = {
    sano: '#f1f5f9',
    caries: '#fee2e2',
    obturado: '#dbeafe',
    endodoncia: '#fef3c7',
    cirugia: '#ffe4e6',
    corona: '#ede9fe',
    ausente: '#e2e8f0',
    sellante: '#ccfbf1'
  };
  return map[cond] || '#f1f5f9';
}

function getConditionTextColor(cond) {
  const map = {
    sano: '#475569',
    caries: '#ef4444',
    obturado: '#0284c7',
    endodoncia: '#d97706',
    cirugia: '#be123c',
    corona: '#8b5cf6',
    ausente: '#64748b',
    sellante: '#0d9488'
  };
  return map[cond] || '#475569';
}

// ==========================================================================
// FLUJO CLÍNICO: SELECCIÓN MÚLTIPLE DE CARAS & PLAN DE TRATAMIENTO MANUAL
// ==========================================================================

function selectToothQuick(toothNum, toggleDetail = true) {
  appState.selectedTooth = toothNum;
  const bar = document.getElementById('quick-tooth-action-bar');
  if (bar) {
    bar.style.display = 'block';
    updateQuickToothPanel(toothNum);
  }

  if (toggleDetail) {
    const patient = getCurrentPatient();
    if (patient) {
      renderQuadrantTeeth('teeth-quadrant-1', ['18', '17', '16', '15', '14', '13', '12', '11'], patient);
      renderQuadrantTeeth('teeth-quadrant-2', ['21', '22', '23', '24', '25', '26', '27', '28'], patient);
      renderQuadrantTeeth('teeth-quadrant-4', ['48', '47', '46', '45', '44', '43', '42', '41'], patient);
      renderQuadrantTeeth('teeth-quadrant-3', ['31', '32', '33', '34', '35', '36', '37', '38'], patient);
    }
  }
}

function updateQuickToothPanel(toothNum) {
  const meta = TEETH_MAP[toothNum];
  const patient = getCurrentPatient();
  if (!meta || !patient) return;

  const toothData = (patient.odontogram && patient.odontogram[toothNum]) ? patient.odontogram[toothNum] : { condition: 'sano', surfaces: {} };
  const surfaces = toothData.surfaces || {};

  const badge = document.getElementById('quick-tooth-badge');
  const nameElem = document.getElementById('quick-tooth-name');
  if (badge) {
    badge.textContent = `Pieza #${toothNum} ${meta.isCordal ? '★ CORDAL' : ''}`;
    badge.className = meta.isCordal ? 'badge badge-cordal' : 'badge badge-info';
  }
  if (nameElem) {
    nameElem.textContent = meta.name;
  }

  // Actualizar los botones de las caras
  const faceKeys = ['vestibular', 'mesial', 'oclusal', 'distal', 'lingual'];
  faceKeys.forEach(face => {
    const cond = surfaces[face] || (toothData.condition !== 'cirugia' && toothData.condition !== 'ausente' ? 'sano' : toothData.condition);
    const card = document.querySelector(`.angle-face-card[data-face="${face}"]`);
    if (card) {
      if (cond === 'caries') card.style.borderColor = 'var(--danger)';
      else if (cond === 'obturado') card.style.borderColor = 'var(--info)';
      else card.style.borderColor = '#e2e8f0';
    }

    document.querySelectorAll(`.btn-face-choice[data-face="${face}"]`).forEach(btnChoice => {
      const val = btnChoice.getAttribute('data-val');
      if (val === cond) {
        btnChoice.classList.add('active');
      } else {
        btnChoice.classList.remove('active');
      }
    });
  });
}

// APLICAR PINCEL CLÍNICO A UNA CARA ESPECÍFICA (SELECCIÓN MÚLTIPLE EN EL MISMO DIENTE)
async function applyToolToToothFace(toothNum, face, tool) {
  const patient = getCurrentPatient();
  if (!patient) return;
  if (!patient.odontogram) patient.odontogram = {};

  const meta = TEETH_MAP[toothNum];
  if (!patient.odontogram[toothNum]) {
    patient.odontogram[toothNum] = {
      toothNumber: toothNum,
      name: meta.name,
      condition: 'sano',
      surfaces: {
        vestibular: 'sano',
        lingual: 'sano',
        mesial: 'sano',
        distal: 'sano',
        oclusal: 'sano'
      },
      notes: ''
    };
  }

  const toothObj = patient.odontogram[toothNum];
  if (!toothObj.surfaces) {
    toothObj.surfaces = {
      vestibular: 'sano',
      lingual: 'sano',
      mesial: 'sano',
      distal: 'sano',
      oclusal: 'sano'
    };
  }

  // Si la herramienta es para el diente completo (cirugía o ausente)
  if (tool === 'cirugia' || tool === 'ausente') {
    await applyWholeToothCondition(toothNum, tool);
    return;
  }

  // Si tool es sano, limpiar esa cara
  if (tool === 'sano') {
    toothObj.surfaces[face] = 'sano';
    if (toothObj.condition === 'cirugia' || toothObj.condition === 'ausente') {
      toothObj.condition = 'sano';
    }
  } else {
    // Si la cara ya tiene esta herramienta, la alternamos a sano (toggle intuitivo)
    if (toothObj.surfaces[face] === tool) {
      toothObj.surfaces[face] = 'sano';
    } else {
      toothObj.surfaces[face] = tool;
    }
    if (toothObj.condition === 'cirugia' || toothObj.condition === 'ausente') {
      toothObj.condition = 'sano';
    }
  }

  // Calcular resumen detallado de caras
  const faceDefs = [
    { key: 'vestibular', name: 'Vestibular' },
    { key: 'mesial', name: 'Mesial' },
    { key: 'oclusal', name: 'Oclusal' },
    { key: 'distal', name: 'Distal' },
    { key: 'lingual', name: 'Palatina/Lingual' }
  ];

  const cariesFaces = [];
  const resinaFaces = [];
  const endoFaces = [];
  const coronaFaces = [];

  faceDefs.forEach(f => {
    const st = toothObj.surfaces[f.key];
    if (st === 'caries') cariesFaces.push(f.name);
    else if (st === 'obturado') resinaFaces.push(f.name);
    else if (st === 'endodoncia') endoFaces.push(f.name);
    else if (st === 'corona') coronaFaces.push(f.name);
  });

  const parts = [];
  if (cariesFaces.length > 0) parts.push(`Caries (${cariesFaces.join(', ')})`);
  if (resinaFaces.length > 0) parts.push(`Resina (${resinaFaces.join(', ')})`);
  if (endoFaces.length > 0) parts.push(`Conducto (${endoFaces.join(', ')})`);
  if (coronaFaces.length > 0) parts.push(`Corona (${coronaFaces.join(', ')})`);

  let overallCond = 'sano';
  let desc = '';

  if (parts.length > 0) {
    desc = parts.join(' • ');
    if (cariesFaces.length > 0) overallCond = 'caries';
    else if (resinaFaces.length > 0) overallCond = 'obturado';
    else if (endoFaces.length > 0) overallCond = 'endodoncia';
    else if (coronaFaces.length > 0) overallCond = 'corona';
  }

  toothObj.condition = overallCond;
  toothObj.notes = desc;

  // Sincronizar partida de presupuesto (SIN PRECIOS FIJOS - PRESERVAR LO QUE ESCRIBA LA DOCTORA)
  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      payments: [],
      balance: 0
    }];
  }
  const budget = patient.budgets[0];
  const existingIdx = budget.items.findIndex(it => it.tooth === toothNum);

  if (overallCond === 'sano') {
    if (existingIdx !== -1) {
      budget.items.splice(existingIdx, 1);
    }
  } else {
    const isCordal = meta.isCordal;
    const itemName = `Pieza #${toothNum}${isCordal ? ' (Cordal)' : ''}: ${desc}`;
    if (existingIdx !== -1) {
      // Preservar el precio que la doctora haya colocado
      const savedPrice = budget.items[existingIdx].price !== undefined ? budget.items[existingIdx].price : 0;
      budget.items[existingIdx].name = itemName;
      budget.items[existingIdx].price = savedPrice;
    } else {
      // Inicia en $0 para fijar precio al sentarse con el paciente
      budget.items.push({
        treatmentId: `ITEM-${Date.now()}-${toothNum}`,
        tooth: toothNum,
        name: itemName,
        price: 0
      });
    }
  }

  await saveAppData();
  renderOdontogramBoard();
  renderHistoryOdontogram();
  updateHistoryStats();
  if (appState.selectedTooth === toothNum) {
    updateQuickToothPanel(toothNum);
  }
  renderLiveOdontoBudget();
  renderBudgetsView();
}

// APLICAR CONDICIÓN A LA PIEZA DENTAL COMPLETA (CIRUGÍA, CONDUCTO, CORONA, AUSENTE O SANO)
async function applyWholeToothCondition(toothNum, condition) {
  const patient = getCurrentPatient();
  if (!patient) return;
  if (!patient.odontogram) patient.odontogram = {};

  const meta = TEETH_MAP[toothNum];
  if (!patient.odontogram[toothNum]) {
    patient.odontogram[toothNum] = {
      toothNumber: toothNum,
      name: meta.name,
      condition: 'sano',
      surfaces: { vestibular: 'sano', lingual: 'sano', mesial: 'sano', distal: 'sano', oclusal: 'sano' },
      notes: ''
    };
  }
  const toothObj = patient.odontogram[toothNum];
  toothObj.condition = condition;

  if (condition === 'sano') {
    toothObj.surfaces = { vestibular: 'sano', lingual: 'sano', mesial: 'sano', distal: 'sano', oclusal: 'sano' };
    toothObj.notes = '';
  } else if (condition === 'ausente') {
    toothObj.surfaces = { vestibular: 'ausente', lingual: 'ausente', mesial: 'ausente', distal: 'ausente', oclusal: 'ausente' };
    toothObj.notes = 'Pieza ausente / ya extraída';
  } else if (condition === 'cirugia') {
    toothObj.notes = meta.isCordal ? 'Cirugía de Extracción de Cordal' : 'Cirugía / Extracción Dental';
  } else if (condition === 'endodoncia') {
    toothObj.notes = 'Tratamiento de Conducto (Endodoncia)';
  } else if (condition === 'corona') {
    toothObj.notes = 'Corona Completa';
  }

  // Sincronizar presupuesto
  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      payments: [],
      balance: 0
    }];
  }
  const budget = patient.budgets[0];
  const existingIdx = budget.items.findIndex(it => it.tooth === toothNum);

  if (condition === 'sano' || condition === 'ausente') {
    if (existingIdx !== -1) budget.items.splice(existingIdx, 1);
  } else {
    const itemName = `Pieza #${toothNum}${meta.isCordal ? ' (Cordal)' : ''}: ${toothObj.notes}`;
    if (existingIdx !== -1) {
      const savedPrice = budget.items[existingIdx].price || 0;
      budget.items[existingIdx].name = itemName;
      budget.items[existingIdx].price = savedPrice;
    } else {
      budget.items.push({
        treatmentId: `ITEM-${Date.now()}-${toothNum}`,
        tooth: toothNum,
        name: itemName,
        price: 0
      });
    }
  }

  await saveAppData();
  renderOdontogramBoard();
  renderHistoryOdontogram();
  updateHistoryStats();
  if (appState.selectedTooth === toothNum) updateQuickToothPanel(toothNum);
  renderLiveOdontoBudget();
  renderBudgetsView();
  showToast(`Pieza #${toothNum}: ${getConditionLabel(condition)} asignado.`);
}

// PROCEDIMIENTOS GENERALES (TODA LA BOCA - LIMPIEZA, BLANQUEAMIENTO, ETC. SIN PRECIO FIJO)
async function applyGeneralTreatment(treatmentName) {
  const patient = getCurrentPatient();
  if (!patient) return;

  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      payments: [],
      balance: 0
    }];
  }

  const budget = patient.budgets[0];
  budget.items.push({
    treatmentId: `ITEM-${Date.now()}`,
    tooth: 'General',
    name: `${treatmentName} (General - Boca Completa)`,
    price: 0 // Sin precio fijo, se escribe en la casilla al sentarse con el paciente
  });

  await saveAppData();
  renderLiveOdontoBudget();
  renderBudgetsView();
  showToast(`✨ ${treatmentName} agregado. Escribe el precio en la casilla al acordar con el paciente.`);
}

// TABLA EN VIVO DE TRATAMIENTO CON PRECIOS EDITABLES MANUALMENTE
function renderLiveOdontoBudget() {
  const patient = getCurrentPatient();
  if (!patient) return;

  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      payments: [],
      balance: 0
    }];
  }

  const budget = patient.budgets[0];
  const subtotal = budget.items.reduce((acc, it) => acc + (parseFloat(it.price) || 0), 0);
  const discount = budget.discount || 0;
  const total = Math.max(0, subtotal - discount);
  const paid = budget.payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const balance = Math.max(0, total - paid);

  budget.subtotal = subtotal;
  budget.discount = discount;
  budget.total = total;
  budget.balance = balance;

  // Llenar tabla en vivo
  const tbody = document.getElementById('odonto-live-tbody');
  if (tbody) {
    tbody.innerHTML = '';
    if (budget.items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 18px;">No hay tratamientos asignados aún. Haz clic en las caras de los dientes arriba o en un procedimiento general.</td></tr>';
    } else {
      budget.items.forEach((it, idx) => {
        const tr = document.createElement('tr');
        const isGen = it.tooth === 'General' || !it.tooth;
        const currentPriceVal = it.price !== undefined ? it.price : 0;
        tr.innerHTML = `
          <td>
            <span class="badge ${isGen ? 'badge-success' : 'badge-info'}" style="font-size: 11px;">
              ${isGen ? '✨ Boca Completa' : `Pieza #${it.tooth}`}
            </span>
          </td>
          <td>
            <strong>${it.name}</strong>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-weight: 800; color: var(--primary); font-size: 15px;">$</span>
              <input type="number" 
                     class="form-control live-item-price-input" 
                     data-idx="${idx}" 
                     value="${currentPriceVal}" 
                     min="0" 
                     step="any" 
                     placeholder="0.00" 
                     style="width: 110px;" 
                     title="Ingresa aquí el precio acordado para este procedimiento">
            </div>
          </td>
          <td style="text-align: right;">
            <button class="btn btn-secondary btn-sm btn-delete-live-item" data-idx="${idx}" style="color: var(--danger); padding: 3px 8px;" title="Eliminar partida">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      // Evento input para modificar precios directamente al sentarse con el paciente
      tbody.querySelectorAll('.live-item-price-input').forEach(input => {
        input.addEventListener('input', async (e) => {
          const idx = parseInt(e.target.getAttribute('data-idx'));
          const newPrice = Math.max(0, parseFloat(e.target.value) || 0);
          if (budget.items[idx]) {
            budget.items[idx].price = newPrice;
          }
          // Recalcular instantáneamente
          const newSub = budget.items.reduce((acc, it) => acc + (parseFloat(it.price) || 0), 0);
          const newTot = Math.max(0, newSub - (budget.discount || 0));
          const newBal = Math.max(0, newTot - paid);
          budget.subtotal = newSub;
          budget.total = newTot;
          budget.balance = newBal;

          const sElem = document.getElementById('odonto-subtotal-val');
          if (sElem) sElem.textContent = `$${newSub.toFixed(2)}`;
          const tElem = document.getElementById('odonto-total-val');
          if (tElem) tElem.textContent = `$${newTot.toFixed(2)}`;
          const bElem = document.getElementById('odonto-balance-val');
          if (bElem) bElem.textContent = `$${newBal.toFixed(2)}`;

          await saveAppData();
          renderBudgetsView();
        });
      });

      // Botones eliminar
      tbody.querySelectorAll('.btn-delete-live-item').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
          budget.items.splice(idx, 1);
          await saveAppData();
          renderLiveOdontoBudget();
          renderBudgetsView();
          showToast('Procedimiento eliminado del plan.');
        });
      });
    }
  }

  // Actualizar valores de totales en la barra inferior
  const subElem = document.getElementById('odonto-subtotal-val');
  if (subElem) subElem.textContent = `$${subtotal.toFixed(2)}`;

  const discInput = document.getElementById('odonto-inline-discount-input');
  if (discInput && document.activeElement !== discInput) {
    discInput.value = discount;
  }

  const totElem = document.getElementById('odonto-total-val');
  if (totElem) totElem.textContent = `$${total.toFixed(2)}`;

  const paidElem = document.getElementById('odonto-paid-val');
  if (paidElem) paidElem.textContent = `$${paid.toFixed(2)}`;

  const balElem = document.getElementById('odonto-balance-val');
  if (balElem) balElem.textContent = `$${balance.toFixed(2)}`;
}

// MODAL DEL DIENTE / CORDAL
function openToothModal(toothNum) {
  appState.activeToothModalNum = toothNum;
  const patient = getCurrentPatient();
  const meta = TEETH_MAP[toothNum];
  const toothData = (patient.odontogram && patient.odontogram[toothNum]) ? patient.odontogram[toothNum] : {
    condition: 'sano',
    surfaces: { oclusal: 'sano', vestibular: 'sano', lingual: 'sano', mesial: 'sano', distal: 'sano' },
    notes: '',
    procedurePlan: '',
    estimatedCost: 0
  };

  document.getElementById('tooth-modal-title').textContent = `Diente #${toothNum} - ${meta.name}`;
  document.getElementById('tooth-modal-name').textContent = meta.name;
  document.getElementById('tooth-modal-desc').textContent = `${meta.arch === 'superior' ? 'Arcada Superior' : 'Arcada Inferior'} • Cuadrante ${meta.quadrant} • ${meta.type.toUpperCase()}`;
  
  const cordalBadge = document.getElementById('tooth-modal-badge');
  if (meta.isCordal) {
    cordalBadge.style.display = 'inline-block';
    cordalBadge.textContent = 'CORDAL / TERCER MOLAR';
  } else {
    cordalBadge.style.display = 'none';
  }

  // Previsualización de SVG ampliado
  document.getElementById('tooth-modal-svg-preview').innerHTML = generateToothSVG(toothNum, toothData.surfaces, toothData.condition, meta);

  // Botones de condición general
  document.querySelectorAll('.condition-btn').forEach(btn => {
    const c = btn.getAttribute('data-cond');
    if (c === toothData.condition) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    }
  });

  // Botones de caras individuales
  document.querySelectorAll('.surface-btn').forEach(btn => {
    const s = btn.getAttribute('data-surface');
    const sCond = (toothData.surfaces && toothData.surfaces[s]) || toothData.condition || 'sano';
    btn.textContent = `${s.toUpperCase()} (${sCond})`;
    if (sCond !== 'sano') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Catálogo de tratamientos
  const treatSelect = document.getElementById('tooth-treatment-select');
  treatSelect.innerHTML = '<option value="">-- Seleccionar Procedimiento --</option>';
  appState.treatments.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.name;
    opt.textContent = `${t.name} ($${t.defaultPrice})`;
    opt.setAttribute('data-price', t.defaultPrice);
    if (t.name === toothData.procedurePlan) opt.selected = true;
    treatSelect.appendChild(opt);
  });

  treatSelect.onchange = () => {
    const selectedOpt = treatSelect.options[treatSelect.selectedIndex];
    const price = selectedOpt.getAttribute('data-price');
    if (price) {
      document.getElementById('tooth-cost-input').value = price;
    }
  };

  document.getElementById('tooth-cost-input').value = toothData.estimatedCost || 0;
  document.getElementById('tooth-notes-input').value = toothData.notes || '';

  // Abrir modal
  document.getElementById('tooth-modal').classList.add('active');
}

// GUARDAR DETALLE DEL DIENTE
async function saveToothModalChanges() {
  const toothNum = appState.activeToothModalNum;
  if (!toothNum) return;
  const patient = getCurrentPatient();
  if (!patient.odontogram) patient.odontogram = {};

  let currentCond = 'sano';
  document.querySelectorAll('.condition-btn').forEach(b => {
    if (b.classList.contains('btn-primary')) currentCond = b.getAttribute('data-cond');
  });

  const surfaces = {};
  document.querySelectorAll('.surface-btn').forEach(b => {
    const s = b.getAttribute('data-surface');
    surfaces[s] = b.classList.contains('active') ? currentCond : 'sano';
  });

  const notes = document.getElementById('tooth-notes-input').value;
  const procedurePlan = document.getElementById('tooth-treatment-select').value;
  const cost = parseFloat(document.getElementById('tooth-cost-input').value) || 0;

  patient.odontogram[toothNum] = {
    toothNumber: toothNum,
    name: TEETH_MAP[toothNum].name,
    condition: currentCond,
    surfaces,
    notes,
    procedurePlan,
    estimatedCost: cost
  };

  await saveAppData();
  renderOdontogramBoard();
  document.getElementById('tooth-modal').classList.remove('active');
  showToast(`Diente #${toothNum} actualizado con éxito.`);
}

// AGREGAR TRATAMIENTO DEL DIENTE AL PRESUPUESTO DEL PACIENTE
async function addActiveToothToBudget() {
  const toothNum = appState.activeToothModalNum;
  if (!toothNum) return;
  const patient = getCurrentPatient();
  const procedure = document.getElementById('tooth-treatment-select').value || `Tratamiento Pieza #${toothNum}`;
  const cost = parseFloat(document.getElementById('tooth-cost-input').value) || 0;

  if (cost <= 0) {
    showToast('Por favor introduce un costo válido para este procedimiento.', 'warning');
    return;
  }

  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      total: 0,
      payments: [],
      balance: 0
    }];
  }

  const activeBudget = patient.budgets[0];
  activeBudget.items.push({
    treatmentId: `ITEM-${Date.now()}`,
    tooth: toothNum,
    name: `${procedure} (Pieza #${toothNum})`,
    price: cost
  });

  // Recalcular
  activeBudget.total = activeBudget.items.reduce((sum, it) => sum + (it.price || 0), 0);
  const totalPaid = activeBudget.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  activeBudget.balance = Math.max(0, activeBudget.total - totalPaid);

  await saveAppData();
  renderBudgetsView();
  showToast(`Procedimiento añadido al presupuesto de ${patient.name}`);
}

// ==========================================================================
// FORMATO HISTORIA CLÍNICA ODONTOLÓGICA & CONTROL DE CITA (DRA. CELENIA TOVAR)
// ==========================================================================

function getOrCreateClinicalHistory(patient) {
  if (!patient) return null;
  if (!patient.clinicalHistory) {
    patient.clinicalHistory = {
      historyNumber: patient.id ? patient.id.replace('P', 'HC-') : 'HC-001',
      date: new Date().toISOString().slice(0, 10),
      sex: patient.gender || '',
      profession: patient.occupation || '',
      city: 'Caracas',
      state: 'Miranda',
      workplace: '',
      consultationReason: '',
      currentIllness: '',
      familyHistory: '',
      personalHistory: {
        alergias: (patient.medicalAlerts && patient.medicalAlerts.allergies && patient.medicalAlerts.allergies.toLowerCase() !== 'ninguna') || false,
        diabetes: false,
        artritis: false,
        estres: false,
        depresion: false,
        anemia: false,
        cardiopatias: false,
        enfermedadesRenales: false,
        hipertension: (patient.medicalAlerts && patient.medicalAlerts.systemicDiseases && patient.medicalAlerts.systemicDiseases.toLowerCase().includes('hipertens')) || false,
        hipotension: false,
        enfermedadesRespiratorias: false,
        enfermedadesGastricas: false,
        enfermedadesVirales: false,
        traumatismo: false,
        cirugias: false,
        altoRiesgo: false,
        higado: false,
        venereas: false,
        dolorCabeza: false,
        sinusitis: false,
        ulcerasGastricas: false
      },
      currentMedications: (patient.medicalAlerts && patient.medicalAlerts.medications) || '',
      pulse: '72',
      bloodPressureHigh: '120',
      bloodPressureLow: '80',
      habits: ''
    };
  }
  return patient.clinicalHistory;
}

function renderClinicalHistoryView() {
  const patient = getCurrentPatient();
  if (!patient) return;

  // Selector de pacientes en la barra superior de historia
  const select = document.getElementById('hc-patient-select');
  if (select) {
    select.innerHTML = '';
    appState.patients.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} (${p.documentId || 'Sin CI'})`;
      if (p.id === appState.currentPatientId) opt.selected = true;
      select.appendChild(opt);
    });

    select.onchange = () => {
      appState.currentPatientId = select.value;
      populateGlobalPatientSelect();
      renderClinicalHistoryView();
    };
  }

  const hc = getOrCreateClinicalHistory(patient);

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : '';
  };

  setVal('hc-input-name', patient.name || '');
  setVal('hc-input-date', hc.date || new Date().toISOString().slice(0, 10));
  setVal('hc-input-ci', patient.documentId || '');
  setVal('hc-input-age', patient.age || '');
  setVal('hc-input-gender', hc.sex || patient.gender || '');
  setVal('hc-input-occupation', patient.occupation || hc.profession || '');
  setVal('hc-input-history-no', hc.historyNumber || (patient.id ? patient.id.replace('P', 'HC-') : 'HC-001'));
  setVal('hc-input-address', patient.address || '');
  setVal('hc-input-phone', patient.phone || '');
  setVal('hc-input-city', hc.city || 'Caracas');
  setVal('hc-input-state', hc.state || 'Miranda');
  setVal('hc-input-workplace', hc.workplace || '');

  // Motivo de consulta
  setVal('hc-input-reason', hc.consultationReason || '');

  // Enfermedad actual
  const ill = hc.currentIllness || '';
  if (ill.length > 70) {
    const mid = ill.lastIndexOf(' ', 70);
    setVal('hc-input-illness-1', ill.slice(0, mid > 0 ? mid : 70));
    setVal('hc-input-illness-2', ill.slice(mid > 0 ? mid + 1 : 70));
  } else {
    setVal('hc-input-illness-1', ill);
    setVal('hc-input-illness-2', '');
  }

  // Antecedentes Familiares
  setVal('hc-input-family-history', hc.familyHistory || '');

  // 21 Checkboxes de Antecedentes Personales
  const ph = hc.personalHistory || {};
  const setCb = (id, checked) => {
    const el = document.getElementById(id);
    if (el) el.checked = !!checked;
  };

  setCb('hc-cb-alergias', ph.alergias !== undefined ? ph.alergias : (patient.medicalAlerts && patient.medicalAlerts.allergies && patient.medicalAlerts.allergies.toLowerCase() !== 'ninguna'));
  setCb('hc-cb-diabetes', ph.diabetes);
  setCb('hc-cb-artritis', ph.artritis);
  setCb('hc-cb-estres', ph.estres);
  setCb('hc-cb-depresion', ph.depresion);
  setCb('hc-cb-anemia', ph.anemia);
  setCb('hc-cb-cardiopatias', ph.cardiopatias);

  setCb('hc-cb-renales', ph.enfermedadesRenales);
  setCb('hc-cb-hipertension', ph.hipertension !== undefined ? ph.hipertension : (patient.medicalAlerts && patient.medicalAlerts.systemicDiseases && patient.medicalAlerts.systemicDiseases.toLowerCase().includes('hipertens')));
  setCb('hc-cb-hipotension', ph.hipotension);
  setCb('hc-cb-respiratorias', ph.enfermedadesRespiratorias);
  setCb('hc-cb-gastricas', ph.enfermedadesGastricas);
  setCb('hc-cb-virales', ph.enfermedadesVirales);
  setCb('hc-cb-traumatismo', ph.traumatismo);

  setCb('hc-cb-cirugias', ph.cirugias);
  setCb('hc-cb-altoriesgo', ph.altoRiesgo);
  setCb('hc-cb-higado', ph.higado);
  setCb('hc-cb-venereas', ph.venereas);
  setCb('hc-cb-dolorcabeza', ph.dolorCabeza);
  setCb('hc-cb-sinusitis', ph.sinusitis);
  setCb('hc-cb-ulceras', ph.ulcerasGastricas);

  // Medicamento, Pulso, TA, Hábitos
  setVal('hc-input-meds', hc.currentMedications || (patient.medicalAlerts && patient.medicalAlerts.medications) || '');
  setVal('hc-input-pulse', hc.pulse || '72');
  setVal('hc-input-bp-high', hc.bloodPressureHigh || '120');
  setVal('hc-input-bp-low', hc.bloodPressureLow || '80');
  setVal('hc-input-habits', hc.habits || '');

  // Renderizar Odontograma oficial de 4 filas
  renderHistoryOdontogram();
  updateHistoryStats();
  syncToolPaletteUI(appState.activeTool || 'caries');
}

function renderHistoryOdontogram() {
  const patient = getCurrentPatient();
  if (!patient) return;
  if (!patient.odontogram) patient.odontogram = {};

  // Fila 1: Adultos Superior (18-11 | 21-28) - Números ARRIBA
  renderHistoryQuadrant('hc-quadrant-1', ['18', '17', '16', '15', '14', '13', '12', '11'], true, patient);
  renderHistoryQuadrant('hc-quadrant-2', ['21', '22', '23', '24', '25', '26', '27', '28'], true, patient);

  // Fila 2: Temporal Superior (55-51 | 61-65) - Números ARRIBA
  renderHistoryQuadrant('hc-quadrant-5', ['55', '54', '53', '52', '51'], true, patient);
  renderHistoryQuadrant('hc-quadrant-6', ['61', '62', '63', '64', '65'], true, patient);

  // Fila 3: Temporal Inferior (85-81 | 71-75) - Números ABAJO
  renderHistoryQuadrant('hc-quadrant-8', ['85', '84', '83', '82', '81'], false, patient);
  renderHistoryQuadrant('hc-quadrant-7', ['71', '72', '73', '74', '75'], false, patient);

  // Fila 4: Adultos Inferior (48-41 | 31-38) - Números ABAJO
  renderHistoryQuadrant('hc-quadrant-4', ['48', '47', '46', '45', '44', '43', '42', '41'], false, patient);
  renderHistoryQuadrant('hc-quadrant-3', ['31', '32', '33', '34', '35', '36', '37', '38'], false, patient);
}

function renderHistoryQuadrant(containerId, toothNumbers, numbersOnTop, patient) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  toothNumbers.forEach(num => {
    const meta = TEETH_MAP[num] || { name: `Pieza #${num}`, isCordal: false };
    const toothData = (patient.odontogram && patient.odontogram[num]) ? patient.odontogram[num] : { condition: 'sano', surfaces: {} };
    const cond = toothData.condition || 'sano';

    const unit = document.createElement('div');
    unit.className = 'hc-tooth-unit';
    unit.setAttribute('data-tooth', num);
    unit.title = `${meta.name} (Pieza ${num})\nEstado: ${cond.toUpperCase()}\nClic izquierdo: marcar cuadrante con herramienta activa\nClic derecho: alternar Sano / Por Reparar / Ya Reparado`;

    const numSpan = document.createElement('span');
    numSpan.className = 'hc-tooth-unit-num';
    numSpan.textContent = num;

    const svgWrap = document.createElement('div');
    svgWrap.className = 'hc-tooth-unit-svg-wrap';
    svgWrap.innerHTML = generateToothSVG(num, toothData.surfaces, cond, meta);

    if (numbersOnTop) {
      unit.appendChild(numSpan);
      unit.appendChild(svgWrap);
    } else {
      unit.appendChild(svgWrap);
      unit.appendChild(numSpan);
    }

    // Interacción en cada cara/cuadro del diente
    svgWrap.querySelectorAll('.tooth-surface').forEach(surfaceElem => {
      // Clic izquierdo: aplica herramienta activa (Por Reparar, Ya Reparado, etc.)
      surfaceElem.addEventListener('click', (e) => {
        e.stopPropagation();
        const face = surfaceElem.getAttribute('data-face');
        applyToolToToothFace(num, face, appState.activeTool);
      });

      // Clic derecho: alternancia rápida práctica Sano -> Por Reparar (Rojo) -> Ya Reparado (Azul)
      surfaceElem.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const face = surfaceElem.getAttribute('data-face');
        const curSurfaces = (patient.odontogram && patient.odontogram[num] && patient.odontogram[num].surfaces) ? patient.odontogram[num].surfaces : {};
        const cur = curSurfaces[face] || 'sano';
        let next = 'caries';
        if (cur === 'caries') next = 'obturado';
        else if (cur === 'obturado') next = 'sano';
        applyToolToToothFace(num, face, next);
      });
    });

    container.appendChild(unit);
  });
}

function updateHistoryStats() {
  const patient = getCurrentPatient();
  if (!patient) return;

  let cariesFacesCount = 0;
  let obturadoFacesCount = 0;

  if (patient.odontogram) {
    Object.keys(patient.odontogram).forEach(num => {
      const tooth = patient.odontogram[num];
      if (tooth && tooth.surfaces) {
        ['vestibular', 'lingual', 'mesial', 'distal', 'oclusal'].forEach(f => {
          if (tooth.surfaces[f] === 'caries') cariesFacesCount++;
          else if (tooth.surfaces[f] === 'obturado') obturadoFacesCount++;
        });
      }
    });
  }

  const summaryElem = document.getElementById('hc-stats-summary');
  if (summaryElem) {
    summaryElem.innerHTML = `
      <span style="color: #dc2626; margin-right: 14px;">🔴 <strong>${cariesFacesCount}</strong> Caras por Reparar</span>
      <span style="color: #0284c7; margin-right: 14px;">🔵 <strong>${obturadoFacesCount}</strong> Caras Reparadas</span>
      <span style="color: #16a34a;">🟢 Sincronizado</span>
    `;
  }

  const sideCaries = document.getElementById('hc-side-caries-stat');
  if (sideCaries) sideCaries.textContent = `🔴 ${cariesFacesCount} Caras por Reparar`;
  const sideObturado = document.getElementById('hc-side-obturado-stat');
  if (sideObturado) sideObturado.textContent = `🔵 ${obturadoFacesCount} Caras Reparadas`;
}

function syncToolPaletteUI(tool) {
  appState.activeTool = tool;

  // Actualizar botones de la barra superior
  document.querySelectorAll('.btn-hc-tool').forEach(b => {
    const isThis = b.getAttribute('data-tool') === tool;
    b.classList.toggle('active', isThis);
    b.style.backgroundColor = isThis ? getToolBg(tool) : '#ffffff';
  });

  // Actualizar botones del panel lateral derecho
  document.querySelectorAll('.btn-hc-side-tool').forEach(b => {
    const isThis = b.getAttribute('data-tool') === tool;
    b.classList.toggle('active', isThis);
    b.style.backgroundColor = isThis ? getToolBg(tool) : '#ffffff';
    b.style.borderColor = isThis ? getToolBorder(tool) : '#cbd5e1';
  });

  // Actualizar botones de la vista Odontograma
  document.querySelectorAll('.btn-clinical-tool').forEach(b => {
    const isThis = b.getAttribute('data-tool') === tool;
    b.classList.toggle('active', isThis);
    b.style.backgroundColor = isThis ? getToolBg(tool) : '#ffffff';
  });

  // Actualizar badge del panel lateral
  const sideBadge = document.getElementById('hc-side-tool-badge');
  const sideToolName = document.getElementById('hc-side-tool-name');
  if (sideBadge && sideToolName) {
    sideToolName.textContent = getToolLabel(tool);
    sideBadge.style.backgroundColor = getToolBg(tool);
    sideBadge.style.borderColor = getToolBorder(tool);
    sideBadge.style.color = getToolColor(tool);
  }
}

function getToolLabel(tool) {
  const map = {
    caries: "🔴 Por Reparar (Caries)",
    obturado: "🔵 Ya Reparado (Resina)",
    sano: "🟢 Marcar Sano (Goma)",
    endodoncia: "🟡 Endodoncia",
    corona: "🟣 Corona",
    cirugia: "🪚 Cirugía / Extracción",
    ausente: "⚫ Ya Ausente"
  };
  return map[tool] || tool;
}

function getToolBg(tool) {
  const map = {
    caries: "#fef2f2",
    obturado: "#eff6ff",
    sano: "#f0fdf4",
    endodoncia: "#fffbeb",
    corona: "#f5f3ff",
    cirugia: "#fff1f2",
    ausente: "#f8fafc"
  };
  return map[tool] || "#ffffff";
}

function getToolBorder(tool) {
  const map = {
    caries: "#ef4444",
    obturado: "#0284c7",
    sano: "#22c55e",
    endodoncia: "#f59e0b",
    corona: "#8b5cf6",
    cirugia: "#be123c",
    ausente: "#64748b"
  };
  return map[tool] || "#cbd5e1";
}

function getToolColor(tool) {
  const map = {
    caries: "#dc2626",
    obturado: "#0369a1",
    sano: "#15803d",
    endodoncia: "#b45309",
    corona: "#7c3aed",
    cirugia: "#9f1239",
    ausente: "#334155"
  };
  return map[tool] || "#0f172a";
}

function saveCurrentClinicalHistoryForm(showNotification = false) {
  const patient = getCurrentPatient();
  if (!patient) return;
  const hc = getOrCreateClinicalHistory(patient);

  const getVal = id => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };
  const getChecked = id => {
    const el = document.getElementById(id);
    return el ? el.checked : false;
  };

  const nameVal = getVal('hc-input-name');
  if (nameVal) patient.name = nameVal;
  const ciVal = getVal('hc-input-ci');
  if (ciVal) patient.documentId = ciVal;
  const ageVal = parseInt(getVal('hc-input-age'), 10);
  if (!isNaN(ageVal)) patient.age = ageVal;
  const genderVal = getVal('hc-input-gender');
  if (genderVal) patient.gender = genderVal;
  const occVal = getVal('hc-input-occupation');
  if (occVal) patient.occupation = occVal;
  const addrVal = getVal('hc-input-address');
  if (addrVal) patient.address = addrVal;
  const phoneVal = getVal('hc-input-phone');
  if (phoneVal) patient.phone = phoneVal;

  hc.date = getVal('hc-input-date');
  hc.historyNumber = getVal('hc-input-history-no');
  hc.sex = genderVal;
  hc.profession = occVal;
  hc.city = getVal('hc-input-city');
  hc.state = getVal('hc-input-state');
  hc.workplace = getVal('hc-input-workplace');
  hc.consultationReason = getVal('hc-input-reason');

  const ill1 = getVal('hc-input-illness-1');
  const ill2 = getVal('hc-input-illness-2');
  hc.currentIllness = ill2 ? `${ill1} ${ill2}`.trim() : ill1;

  hc.familyHistory = getVal('hc-input-family-history');

  hc.personalHistory = {
    alergias: getChecked('hc-cb-alergias'),
    diabetes: getChecked('hc-cb-diabetes'),
    artritis: getChecked('hc-cb-artritis'),
    estres: getChecked('hc-cb-estres'),
    depresion: getChecked('hc-cb-depresion'),
    anemia: getChecked('hc-cb-anemia'),
    cardiopatias: getChecked('hc-cb-cardiopatias'),
    enfermedadesRenales: getChecked('hc-cb-renales'),
    hipertension: getChecked('hc-cb-hipertension'),
    hipotension: getChecked('hc-cb-hipotension'),
    enfermedadesRespiratorias: getChecked('hc-cb-respiratorias'),
    enfermedadesGastricas: getChecked('hc-cb-gastricas'),
    enfermedadesVirales: getChecked('hc-cb-virales'),
    traumatismo: getChecked('hc-cb-traumatismo'),
    cirugias: getChecked('hc-cb-cirugias'),
    altoRiesgo: getChecked('hc-cb-altoriesgo'),
    higado: getChecked('hc-cb-higado'),
    venereas: getChecked('hc-cb-venereas'),
    dolorCabeza: getChecked('hc-cb-dolorcabeza'),
    sinusitis: getChecked('hc-cb-sinusitis'),
    ulcerasGastricas: getChecked('hc-cb-ulceras')
  };

  hc.currentMedications = getVal('hc-input-meds');
  hc.pulse = getVal('hc-input-pulse');
  hc.bloodPressureHigh = getVal('hc-input-bp-high');
  hc.bloodPressureLow = getVal('hc-input-bp-low');
  hc.habits = getVal('hc-input-habits');

  saveAppData();
  if (showNotification) {
    showToast('Historia Clínica guardada exitosamente.');
  }
}

// ==========================================================================
// 2. AGENDA & CONTROL DE CITAS
// ==========================================================================

function renderAppointmentsView() {
  const dateInput = document.getElementById('appointment-date-filter');
  if (dateInput && appState.selectedAppointmentDate) {
    dateInput.value = appState.selectedAppointmentDate;
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const targetDate = appState.selectedAppointmentDate || todayStr;

  // Estadísticas del día seleccionado
  const dayApts = appState.appointments.filter(a => a.date === targetDate);
  const statTotal = document.getElementById('stat-total-today');
  if (statTotal) statTotal.textContent = dayApts.length;
  const statConf = document.getElementById('stat-confirmed-today');
  if (statConf) statConf.textContent = dayApts.filter(a => a.status === 'confirmada').length;
  const statPend = document.getElementById('stat-pending-today');
  if (statPend) statPend.textContent = dayApts.filter(a => a.status === 'programada').length;

  const blocksWrapper = document.getElementById('appointments-timeblocks-wrapper');
  const listContainer = document.getElementById('appointments-list-container');
  const btnBlocks = document.getElementById('btn-view-blocks');
  const btnList = document.getElementById('btn-view-list');

  if (appState.appointmentViewMode === 'blocks') {
    if (blocksWrapper) blocksWrapper.style.display = 'block';
    if (listContainer) listContainer.style.display = 'none';
    if (btnBlocks) { btnBlocks.classList.add('btn-primary'); btnBlocks.classList.remove('btn-secondary'); }
    if (btnList) { btnList.classList.add('btn-secondary'); btnList.classList.remove('btn-primary'); }
    renderDailyTimeBlocks(targetDate);
  } else {
    if (blocksWrapper) blocksWrapper.style.display = 'none';
    if (listContainer) listContainer.style.display = 'block';
    if (btnBlocks) { btnBlocks.classList.add('btn-secondary'); btnBlocks.classList.remove('btn-primary'); }
    if (btnList) { btnList.classList.add('btn-primary'); btnList.classList.remove('btn-secondary'); }
    renderAppointmentsList(targetDate);
  }
}

// 16 BLOQUES DE 30 MINUTOS DE 9:00 AM A 5:00 PM
const WORK_BLOCKS = [
  { start: "09:00", end: "09:30", label: "09:00 AM - 09:30 AM", slotIndex: 1 },
  { start: "09:30", end: "10:00", label: "09:30 AM - 10:00 AM", slotIndex: 2 },
  { start: "10:00", end: "10:30", label: "10:00 AM - 10:30 AM", slotIndex: 3 },
  { start: "10:30", end: "11:00", label: "10:30 AM - 11:00 AM", slotIndex: 4 },
  { start: "11:00", end: "11:30", label: "11:00 AM - 11:30 AM", slotIndex: 5 },
  { start: "11:30", end: "12:00", label: "11:30 AM - 12:00 PM", slotIndex: 6 },
  { start: "12:00", end: "12:30", label: "12:00 PM - 12:30 PM", slotIndex: 7 },
  { start: "12:30", end: "13:00", label: "12:30 PM - 01:00 PM", slotIndex: 8 },
  { start: "13:00", end: "13:30", label: "01:00 PM - 01:30 PM", slotIndex: 9 },
  { start: "13:30", end: "14:00", label: "01:30 PM - 02:00 PM", slotIndex: 10 },
  { start: "14:00", end: "14:30", label: "02:00 PM - 02:30 PM", slotIndex: 11 },
  { start: "14:30", end: "15:00", label: "02:30 PM - 03:00 PM", slotIndex: 12 },
  { start: "15:00", end: "15:30", label: "03:00 PM - 03:30 PM", slotIndex: 13 },
  { start: "15:30", end: "16:00", label: "03:30 PM - 04:00 PM", slotIndex: 14 },
  { start: "16:00", end: "16:30", label: "04:00 PM - 04:30 PM", slotIndex: 15 },
  { start: "16:30", end: "17:00", label: "04:30 PM - 05:00 PM", slotIndex: 16 }
];

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function minutesToTime(totalMin) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function addMinutesToTime(timeStr, minutes) {
  return minutesToTime(timeToMinutes(timeStr) + (parseInt(minutes) || 0));
}

function formatTime12h(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, '0')}:${String(m || 0).padStart(2, '0')} ${period}`;
}

function formatDateLongSpanish(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const y = parseInt(parts[0]);
  const m = parseInt(parts[1]) - 1;
  const d = parseInt(parts[2]);
  const dObj = new Date(y, m, d);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${days[dObj.getDay()]}, ${d} de ${months[dObj.getMonth()]} de ${y}`;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

function getStatusBadge(status) {
  switch (status) {
    case 'confirmada':
      return `<span class="badge badge-success">Confirmada</span>`;
    case 'en_espera':
      return `<span class="badge badge-warning">En Espera</span>`;
    case 'finalizada':
      return `<span class="badge badge-info">Finalizada</span>`;
    case 'cancelada':
      return `<span class="badge badge-danger">Cancelada</span>`;
    default:
      return `<span class="badge badge-purple">Programada</span>`;
  }
}

function renderDailyTimeBlocks(dateStr) {
  const titleElem = document.getElementById('timeblocks-date-title');
  if (titleElem) {
    titleElem.textContent = formatDateLongSpanish(dateStr);
  }

  const grid = document.getElementById('appointments-timeblocks-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const statusFilter = document.getElementById('appointment-status-filter')?.value || 'all';

  let dayAppointments = appState.appointments.filter(a => a.date === dateStr);
  if (statusFilter !== 'all') {
    dayAppointments = dayAppointments.filter(a => a.status === statusFilter);
  }

  WORK_BLOCKS.forEach(block => {
    const slotStartMin = timeToMinutes(block.start);
    const slotEndMin = slotStartMin + 30;

    // 1. Cita que COMIENZA en este bloque
    const startingApt = dayAppointments.find(a => {
      const aStart = timeToMinutes(a.time);
      return aStart >= slotStartMin && aStart < slotEndMin;
    });

    // 2. Cita que CONTINÚA de un bloque previo
    const coveringApt = !startingApt ? dayAppointments.find(a => {
      const aStart = timeToMinutes(a.time);
      const aEnd = aStart + (parseInt(a.duration) || 60);
      return aStart < slotStartMin && aEnd > slotStartMin;
    }) : null;

    if (startingApt) {
      const slotDiv = document.createElement('div');
      const statusClass = startingApt.status === 'confirmada' ? 'confirmed' :
                          startingApt.status === 'en_espera' ? 'waiting' :
                          startingApt.status === 'finalizada' ? 'finished' :
                          startingApt.status === 'cancelada' ? 'cancelled' : '';
      slotDiv.className = `timeblock-slot slot-busy ${statusClass}`;

      const blockCount = Math.max(1, Math.round((parseInt(startingApt.duration) || 60) / 30));
      const endTimeStr = addMinutesToTime(startingApt.time, startingApt.duration || 60);

      const waText = encodeURIComponent(
        `Hola ${startingApt.patientName}, le recordamos su cita odontológica en Sonrisa Perfecta para el día ${formatDisplayDate(startingApt.date)} a las ${startingApt.time} (${startingApt.reason}). Por favor responda a este mensaje para confirmar su asistencia. ¡Muchas gracias!`
      );
      const cleanPhone = (startingApt.phone || '').replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

      slotDiv.innerHTML = `
        <div class="timeblock-time-label">
          <span>🕒</span>
          <div>
            <div>${formatTime12h(startingApt.time)} - ${formatTime12h(endTimeStr)}</div>
            <small style="font-size: 10px; color: var(--text-muted); font-weight: normal;">Inicio: ${startingApt.time}</small>
          </div>
        </div>

        <div class="timeblock-busy-info">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="font-size: 14px; color: var(--text-main);">${startingApt.patientName}</strong>
              ${getStatusBadge(startingApt.status)}
              <span class="slot-block-pill" style="background: var(--primary-light); color: var(--primary);">
                ${blockCount === 1 ? '⏱️ 1 Bloque (30 min)' : `⏱️ ${blockCount} Bloques (${startingApt.duration || 60} min)`}
              </span>
            </div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 3px;">
              <span>🦷 <strong>${startingApt.reason || 'Consulta'}</strong></span>
              ${startingApt.notes ? ` • <span>📝 <em>${startingApt.notes}</em></span>` : ''}
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn-whatsapp btn-sm btn-open-wa" title="Enviar recordatorio por WhatsApp" data-url="${waUrl}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.18c-.24.67-1.39 1.29-1.93 1.34-.51.05-1.18.07-1.92-.16-.46-.14-1.04-.33-1.8-.66-3.19-1.39-5.27-4.63-5.43-4.84-.16-.22-1.3-1.74-1.3-3.32s.82-2.35 1.11-2.67c.29-.32.63-.4 0.85-.4.21 0 .42.01.6.02.19.01.44-.07.69.52.26.62.88 2.14.95 2.3.08.16.13.35.03.56-.1.21-.15.34-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.63.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.32.42-.26.71-.16.29.11 1.83.86 2.15 1.02.32.16.53.24.61.37.08.14.08.79-.16 1.46z"/></svg>
            <span>WhatsApp</span>
          </button>

          <select class="form-control form-control-sm apt-status-select" style="width: 120px; font-size: 11px; padding: 4px;" data-id="${startingApt.id}">
            <option value="programada" ${startingApt.status === 'programada' ? 'selected' : ''}>Programada</option>
            <option value="confirmada" ${startingApt.status === 'confirmada' ? 'selected' : ''}>Confirmada</option>
            <option value="en_espera" ${startingApt.status === 'en_espera' ? 'selected' : ''}>En Espera</option>
            <option value="finalizada" ${startingApt.status === 'finalizada' ? 'selected' : ''}>Finalizada</option>
            <option value="cancelada" ${startingApt.status === 'cancelada' ? 'selected' : ''}>Cancelada</option>
          </select>

          <button type="button" class="btn btn-secondary btn-sm btn-open-apt-history" title="Abrir Formato de Historia Clínica de este Paciente" data-patient="${startingApt.patientId}" style="padding: 4px 8px; font-size: 11px; font-weight: 700; color: #0284c7; border-color: #bae6fd;">
            📋 Historia
          </button>

          <button type="button" class="btn btn-secondary btn-sm btn-open-patient-odonto" title="Ver Odontograma" data-patient="${startingApt.patientId}" style="padding: 4px 8px; font-size: 12px;">
            🦷
          </button>

          <button type="button" class="btn btn-secondary btn-sm btn-delete-apt" title="Eliminar / Cancelar Cita" data-id="${startingApt.id}" style="padding: 4px 8px; font-size: 12px; color: var(--danger);">
            🗑️
          </button>
        </div>
      `;

      bindAppointmentItemEvents(slotDiv, startingApt);
      grid.appendChild(slotDiv);

    } else if (coveringApt) {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'timeblock-slot slot-busy';
      slotDiv.style.background = '#f8fafc';
      slotDiv.style.borderLeft = '6px dashed var(--primary)';
      slotDiv.style.opacity = '0.9';

      slotDiv.innerHTML = `
        <div class="timeblock-time-label">
          <span>🕒</span>
          <div>${block.label}</div>
        </div>
        <div class="timeblock-busy-info">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="slot-block-pill" style="background: #e0f2fe; color: #0369a1;">↳ Bloque Continuación</span>
            <span style="font-size: 12px; color: var(--text-main);">Consulta en curso: <strong>${coveringApt.patientName}</strong> (${coveringApt.reason})</span>
          </div>
        </div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted);">
          Ocupado (Cita de las ${coveringApt.time})
        </div>
      `;
      grid.appendChild(slotDiv);

    } else {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'timeblock-slot slot-free';

      slotDiv.innerHTML = `
        <div class="timeblock-time-label">
          <span>🕒</span>
          <span>${block.label}</span>
        </div>
        <div class="timeblock-free-desc">
          <span>🟢</span>
          <span>Bloque Disponible (30 min)</span>
        </div>
        <div>
          <button type="button" class="btn btn-outline-primary btn-sm btn-book-slot" data-date="${dateStr}" data-time="${block.start}" style="font-weight: 700; font-size: 12px; padding: 5px 12px;">
            + Agendar Cita en este Horario
          </button>
        </div>
      `;

      slotDiv.querySelector('.btn-book-slot').addEventListener('click', () => {
        openNewAppointmentModal(null, dateStr, block.start, 60);
      });

      grid.appendChild(slotDiv);
    }
  });
}

function renderAppointmentsList(dateFilter) {
  const container = document.getElementById('appointments-list-container');
  if (!container) return;

  const statusFilter = document.getElementById('appointment-status-filter')?.value || 'all';

  let filtered = appState.appointments;
  if (dateFilter) {
    filtered = filtered.filter(a => a.date === dateFilter);
  }
  if (statusFilter && statusFilter !== 'all') {
    filtered = filtered.filter(a => a.status === statusFilter);
  }

  filtered.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 15px; font-weight: 600;">No hay citas registradas para este filtro.</p>
        <p style="font-size: 12px; margin-top: 6px;">Haz clic en "Agendar Cita" para programar una consulta odontológica.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(apt => {
    const item = document.createElement('div');
    item.className = 'appointment-item';

    const waText = encodeURIComponent(
      `Hola ${apt.patientName}, le recordamos su cita odontológica en Sonrisa Perfecta para el día ${formatDisplayDate(apt.date)} a las ${apt.time} (${apt.reason}). Por favor responda a este mensaje para confirmar su asistencia. ¡Muchas gracias!`
    );
    const cleanPhone = (apt.phone || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    item.innerHTML = `
      <div class="appointment-time-badge">
        <span class="time">${apt.time}</span>
        <span class="duration">${apt.duration || 60} min</span>
      </div>

      <div class="appointment-details">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <h4>${apt.patientName}</h4>
          ${getStatusBadge(apt.status)}
        </div>
        <p>
          <span><strong>Procedimiento:</strong> ${apt.reason}</span>
          <span>📅 ${formatDisplayDate(apt.date)}</span>
          ${apt.notes ? `<span>📝 <em>${apt.notes}</em></span>` : ''}
        </p>
      </div>

      <div class="appointment-actions">
        <button type="button" class="btn btn-whatsapp btn-sm btn-open-wa" title="Enviar recordatorio por WhatsApp" data-url="${waUrl}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.18c-.24.67-1.39 1.29-1.93 1.34-.51.05-1.18.07-1.92-.16-.46-.14-1.04-.33-1.8-.66-3.19-1.39-5.27-4.63-5.43-4.84-.16-.22-1.3-1.74-1.3-3.32s.82-2.35 1.11-2.67c.29-.32.63-.4 0.85-.4.21 0 .42.01.6.02.19.01.44-.07.69.52.26.62.88 2.14.95 2.3.08.16.13.35.03.56-.1.21-.15.34-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.63.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.32.42-.26.71-.16.29.11 1.83.86 2.15 1.02.32.16.53.24.61.37.08.14.08.79-.16 1.46z"/>
          </svg>
          <span>WhatsApp</span>
        </button>

        <select class="form-control form-control-sm apt-status-select" style="width: 130px; font-size: 12px; padding: 6px;" data-id="${apt.id}">
          <option value="programada" ${apt.status === 'programada' ? 'selected' : ''}>Programada</option>
          <option value="confirmada" ${apt.status === 'confirmada' ? 'selected' : ''}>Confirmada</option>
          <option value="en_espera" ${apt.status === 'en_espera' ? 'selected' : ''}>En Espera</option>
          <option value="finalizada" ${apt.status === 'finalizada' ? 'selected' : ''}>Finalizada</option>
          <option value="cancelada" ${apt.status === 'cancelada' ? 'selected' : ''}>Cancelada</option>
        </select>

        <button type="button" class="btn btn-secondary btn-sm btn-open-apt-history" title="Ver Historia Clínica" data-patient="${apt.patientId}" style="font-weight: 700; color: #0284c7; border-color: #bae6fd;">
          📋 Historia
        </button>

        <button type="button" class="btn btn-secondary btn-sm btn-open-patient-odonto" title="Ver Odontograma del paciente" data-patient="${apt.patientId}">
          🦷 Odontograma
        </button>

        <button type="button" class="btn btn-secondary btn-sm btn-delete-apt" title="Eliminar cita" data-id="${apt.id}" style="color: var(--danger);">
          🗑️
        </button>
      </div>
    `;

    bindAppointmentItemEvents(item, apt);
    container.appendChild(item);
  });
}

function bindAppointmentItemEvents(item, apt) {
  item.querySelector('.btn-open-wa')?.addEventListener('click', (e) => {
    const url = e.currentTarget.getAttribute('data-url');
    if (window.api && window.api.openExternal) {
      window.api.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
    showToast('Abriendo WhatsApp con el recordatorio pre-redactado...');
  });

  item.querySelector('.apt-status-select')?.addEventListener('change', async (e) => {
    const newStatus = e.target.value;
    apt.status = newStatus;
    await saveAppData();
    renderAppointmentsView();
    showToast(`Estado de cita actualizado a: ${newStatus}`);
  });

  item.querySelector('.btn-open-apt-history')?.addEventListener('click', (e) => {
    const pId = e.currentTarget.getAttribute('data-patient');
    if (pId) {
      appState.currentPatientId = pId;
      const gSelect = document.getElementById('global-patient-select');
      if (gSelect) gSelect.value = pId;
      switchView('historia');
    }
  });

  item.querySelector('.btn-open-patient-odonto')?.addEventListener('click', () => {
    appState.currentPatientId = apt.patientId;
    const gSelect = document.getElementById('global-patient-select');
    if (gSelect) gSelect.value = apt.patientId;
    switchView('odontograma');
  });

  item.querySelector('.btn-delete-apt')?.addEventListener('click', async () => {
    if (confirm(`¿Deseas eliminar la cita de ${apt.patientName}?`)) {
      appState.appointments = appState.appointments.filter(a => a.id !== apt.id);
      await saveAppData();
      renderAppointmentsView();
      showToast('Cita eliminada correctamente.');
    }
  });
}

// MODAL NUEVA CITA CON SELECTOR DE BLOQUES Y PREVIEWS
function openNewAppointmentModal(patientId = null, defaultDate = null, defaultTime = null, defaultDuration = null) {
  const pSelect = document.getElementById('appointment-patient-select');
  if (pSelect) {
    pSelect.innerHTML = '';
    appState.patients.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} (${p.documentId || 'S/C'})`;
      if (patientId && p.id === patientId) opt.selected = true;
      pSelect.appendChild(opt);
    });
  }

  const targetDate = defaultDate || appState.selectedAppointmentDate || new Date().toISOString().slice(0, 10);
  const targetTime = defaultTime || "09:00";
  const targetDuration = defaultDuration || "60";

  const idInp = document.getElementById('appointment-id-input');
  if (idInp) idInp.value = '';
  const dateInp = document.getElementById('appointment-date-input');
  if (dateInp) dateInp.value = targetDate;
  const timeInp = document.getElementById('appointment-time-input');
  if (timeInp) timeInp.value = targetTime;
  const durInp = document.getElementById('appointment-duration-input');
  if (durInp) durInp.value = String(targetDuration);
  const statusInp = document.getElementById('appointment-status-input');
  if (statusInp) statusInp.value = 'programada';
  const reasonInp = document.getElementById('appointment-reason-input');
  if (reasonInp) reasonInp.value = '';
  const notesInp = document.getElementById('appointment-notes-input');
  if (notesInp) notesInp.value = '';

  updateAppointmentTimePreview();
  const modal = document.getElementById('appointment-modal');
  if (modal) modal.classList.add('active');
}

function updateAppointmentTimePreview() {
  const timeInp = document.getElementById('appointment-time-input');
  const durInp = document.getElementById('appointment-duration-input');
  const dateInp = document.getElementById('appointment-date-input');
  const previewText = document.getElementById('appointment-time-preview-text');
  const collisionAlert = document.getElementById('appointment-collision-alert');
  const aptIdInput = document.getElementById('appointment-id-input');

  if (!timeInp || !durInp || !previewText) return;

  const startTime = timeInp.value || '09:00';
  const durationMin = parseInt(durInp.value) || 60;
  const endTime = addMinutesToTime(startTime, durationMin);
  const blockCount = Math.max(1, Math.round(durationMin / 30));

  previewText.textContent = `⏱️ Horario: ${formatTime12h(startTime)} a ${formatTime12h(endTime)} (${blockCount === 1 ? '1 bloque de 30 min' : `${blockCount} bloques de 30 min`})`;

  if (collisionAlert && dateInp) {
    const dateVal = dateInp.value;
    const currentAptId = aptIdInput ? aptIdInput.value : '';
    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    const collision = appState.appointments.find(a => {
      if (a.id === currentAptId) return false;
      if (a.date !== dateVal) return false;
      if (a.status === 'cancelada') return false;
      const aStart = timeToMinutes(a.time);
      const aEnd = aStart + (parseInt(a.duration) || 60);
      return startMin < aEnd && endMin > aStart;
    });

    if (collision) {
      collisionAlert.style.display = 'block';
      const cEnd = addMinutesToTime(collision.time, collision.duration || 60);
      collisionAlert.innerHTML = `⚠️ Conflicto de horario: <strong>${collision.patientName}</strong> ya tiene cita de <strong>${formatTime12h(collision.time)} a ${formatTime12h(cEnd)}</strong> (${collision.reason}).`;
    } else {
      collisionAlert.style.display = 'none';
    }
  }
}

async function saveAppointment() {
  const patientId = document.getElementById('appointment-patient-select').value;
  const patient = appState.patients.find(p => p.id === patientId);
  const date = document.getElementById('appointment-date-input').value;
  const time = document.getElementById('appointment-time-input').value;
  const duration = parseInt(document.getElementById('appointment-duration-input').value) || 60;
  const status = document.getElementById('appointment-status-input').value;
  const reason = document.getElementById('appointment-reason-input').value || 'Consulta General';
  const notes = document.getElementById('appointment-notes-input').value;

  if (!patient || !date || !time) {
    showToast('Por favor completa los campos requeridos', 'warning');
    return;
  }

  const newApt = {
    id: `APT-${Date.now()}`,
    patientId,
    patientName: patient.name,
    phone: patient.phone,
    date,
    time,
    duration,
    status,
    reason,
    notes
  };

  appState.appointments.push(newApt);
  appState.selectedAppointmentDate = date;
  await saveAppData();
  renderAppointmentsView();
  document.getElementById('appointment-modal').classList.remove('active');
  showToast(`Cita agendada para ${patient.name} (${formatTime12h(time)} - ${duration} min)`);
}

// ==========================================================================
// 3. EXPEDIENTE & FICHA DE PACIENTES
// ==========================================================================

function renderPatientsList() {
  const container = document.getElementById('patients-sidebar-list');
  const searchInput = document.getElementById('patient-search-input');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  let filtered = appState.patients;
  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      (p.documentId && p.documentId.toLowerCase().includes(query)) ||
      (p.phone && p.phone.includes(query))
    );
  }

  container.innerHTML = '';
  filtered.forEach(p => {
    const item = document.createElement('div');
    item.style.padding = '12px';
    item.style.borderRadius = '8px';
    item.style.border = p.id === appState.currentPatientId ? '2px solid var(--primary)' : '1px solid var(--border-color)';
    item.style.backgroundColor = p.id === appState.currentPatientId ? 'var(--primary-light)' : '#ffffff';
    item.style.cursor = 'pointer';
    item.style.transition = 'all 0.2s';

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="font-size: 14px; color: var(--text-main);">${p.name}</strong>
        <span style="font-size: 11px; color: var(--text-muted);">${p.documentId || ''}</span>
      </div>
      <div style="font-size: 12px; color: var(--text-muted);">📞 ${p.phone}</div>
      ${p.medicalAlerts && p.medicalAlerts.allergies && p.medicalAlerts.allergies.toLowerCase() !== 'ninguna' ? `
        <div style="font-size: 10px; font-weight: bold; color: var(--danger); margin-top: 4px;">
          ⚠️ ${p.medicalAlerts.allergies}
        </div>
      ` : ''}
    `;

    item.addEventListener('click', () => {
      appState.currentPatientId = p.id;
      document.getElementById('global-patient-select').value = p.id;
      renderPatientsList();
      renderPatientDetail();
      renderOdontogramBoard();
      renderBudgetsView();
      renderGalleryView();
    });

    container.appendChild(item);
  });

  renderPatientDetail();
}

function renderPatientDetail() {
  const container = document.getElementById('patient-detail-card');
  const patient = getCurrentPatient();
  if (!patient) {
    container.innerHTML = '<p>Selecciona un paciente para ver su expediente.</p>';
    return;
  }

  const alerts = patient.medicalAlerts || {};

  container.innerHTML = `
    <!-- Header del Perfil -->
    <div class="patient-profile-header">
      <div class="patient-avatar-info">
        <div class="patient-avatar">${patient.name.charAt(0)}</div>
        <div>
          <h2 style="font-size: 20px; font-weight: 800;">${patient.name}</h2>
          <p style="font-size: 13px; color: #94a3b8; margin-top: 2px;">
            Cédula: <strong>${patient.documentId}</strong> • ${patient.age || 0} años • ${patient.occupation || 'Sin ocupación'}
          </p>
          <p style="font-size: 12px; color: #38bdf8; margin-top: 4px;">
            📞 ${patient.phone} • ✉️ ${patient.email || 'Sin correo'}
          </p>
        </div>
      </div>

      <div class="patient-critical-alerts">
        ${alerts.allergies && alerts.allergies.toLowerCase() !== 'ninguna' ? `
          <div class="alert-banner">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>${alerts.allergies}</span>
          </div>
        ` : '<span class="badge badge-success">Sin Alergias Reportadas</span>'}

        ${alerts.systemicDiseases && alerts.systemicDiseases.toLowerCase() !== 'ninguna' ? `
          <div style="background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.5); color: #fde68a; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;">
            ❤️ Condición: ${alerts.systemicDiseases}
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Botones de Acción Directa -->
    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
      <button id="btn-go-to-history" class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #0284c7, #0369a1); font-weight: 700;">
        📋 Abrir Historia Clínica Oficial (Dra. Celenia Tovar)
      </button>
      <button id="btn-go-to-odontogram" class="btn btn-secondary btn-sm">
        🦷 Odontograma
      </button>
      <button id="btn-create-apt-for-patient" class="btn btn-secondary btn-sm">
        📅 Agendar Cita
      </button>
      <button id="btn-edit-patient-info" class="btn btn-secondary btn-sm">
        ✏️ Editar Datos Personales
      </button>
    </div>

    <!-- Antecedentes & Notas Clínicas de Evolución -->
    <div class="card" style="margin-bottom: 16px; background-color: #f8fafc;">
      <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 10px;">📋 Antecedentes Médicos & Odontológicos</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px;">
        <div><strong>Medicamentos Actuales:</strong> ${alerts.medications || 'Ninguno'}</div>
        <div><strong>Contacto Emergencia:</strong> ${patient.emergencyContact || 'No registrado'}</div>
        <div><strong>Dirección:</strong> ${patient.address || 'No registrada'}</div>
      </div>
    </div>

    <!-- Evolución de Consultas -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h4 style="font-size: 15px; font-weight: 700;">Historial Clínico & Evolución</h4>
        <button id="btn-add-clinical-note" class="btn btn-secondary btn-sm">+ Agregar Nota de Evolución</button>
      </div>

      <div id="patient-notes-timeline" style="display: flex; flex-direction: column; gap: 10px;">
        ${(patient.clinicalNotes || []).map(n => `
          <div style="background: #ffffff; border: 1px solid var(--border-color); border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">
              <strong>📅 ${formatDisplayDate(n.date)}</strong>
              <span>${n.author || 'Dra. Tratante'}</span>
            </div>
            <p style="font-size: 13px; color: var(--text-main);">${n.note}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const btnGoHistory = document.getElementById('btn-go-to-history');
  if (btnGoHistory) {
    btnGoHistory.addEventListener('click', () => {
      switchView('historia');
    });
  }

  document.getElementById('btn-go-to-odontogram').addEventListener('click', () => {
    switchView('odontograma');
  });

  document.getElementById('btn-create-apt-for-patient').addEventListener('click', () => {
    openNewAppointmentModal(patient.id);
  });

  document.getElementById('btn-edit-patient-info').addEventListener('click', () => {
    openEditPatientModal(patient);
  });

  document.getElementById('btn-add-clinical-note').addEventListener('click', () => {
    const text = prompt('Escriba la nota de evolución clínica de hoy:');
    if (text && text.trim()) {
      if (!patient.clinicalNotes) patient.clinicalNotes = [];
      patient.clinicalNotes.unshift({
        date: new Date().toISOString().slice(0, 10),
        author: appState.clinic.doctor || "Dra. Odontóloga",
        note: text.trim()
      });
      saveAppData();
      renderPatientDetail();
      showToast('Nota de evolución agregada al historial.');
    }
  });
}

function openEditPatientModal(patient = null) {
  const modal = document.getElementById('patient-modal');
  document.getElementById('patient-modal-title').textContent = patient ? 'Editar Paciente' : 'Registrar Nuevo Paciente';
  document.getElementById('patient-id-input').value = patient ? patient.id : '';
  document.getElementById('patient-name-input').value = patient ? patient.name : '';
  document.getElementById('patient-document-input').value = patient ? patient.documentId : '';
  document.getElementById('patient-phone-input').value = patient ? patient.phone : '';
  document.getElementById('patient-email-input').value = patient ? (patient.email || '') : '';
  document.getElementById('patient-birthdate-input').value = patient ? (patient.birthDate || '') : '';
  document.getElementById('patient-occupation-input').value = patient ? (patient.occupation || '') : '';
  document.getElementById('patient-address-input').value = patient ? (patient.address || '') : '';

  const alerts = patient ? (patient.medicalAlerts || {}) : {};
  document.getElementById('patient-allergies-input').value = alerts.allergies || '';
  document.getElementById('patient-systemic-input').value = alerts.systemicDiseases || '';
  document.getElementById('patient-meds-input').value = alerts.medications || '';

  modal.classList.add('active');
}

async function savePatientModal() {
  const idInput = document.getElementById('patient-id-input').value;
  const name = document.getElementById('patient-name-input').value.trim();
  const doc = document.getElementById('patient-document-input').value.trim();
  const phone = document.getElementById('patient-phone-input').value.trim();

  if (!name || !doc || !phone) {
    showToast('Por favor completa el Nombre, Cédula y Teléfono', 'warning');
    return;
  }

  let patient;
  if (idInput) {
    patient = appState.patients.find(p => p.id === idInput);
  } else {
    patient = {
      id: `P${Date.now().toString().slice(-4)}`,
      odontogram: {},
      budgets: [],
      clinicalNotes: [],
      gallery: []
    };
    appState.patients.unshift(patient);
  }

  patient.name = name;
  patient.documentId = doc;
  patient.phone = phone;
  patient.email = document.getElementById('patient-email-input').value;
  patient.birthDate = document.getElementById('patient-birthdate-input').value;
  patient.occupation = document.getElementById('patient-occupation-input').value;
  patient.address = document.getElementById('patient-address-input').value;

  patient.medicalAlerts = {
    allergies: document.getElementById('patient-allergies-input').value || 'Ninguna',
    systemicDiseases: document.getElementById('patient-systemic-input').value || 'Ninguna',
    medications: document.getElementById('patient-meds-input').value || 'Ninguno',
    bleedingRisk: false,
    pregnant: false
  };

  appState.currentPatientId = patient.id;
  await saveAppData();
  populateGlobalPatientSelect();
  renderPatientsList();
  document.getElementById('patient-modal').classList.remove('active');
  showToast('Paciente guardado exitosamente.');
}

// ==========================================================================
// 4. PRESUPUESTOS & PAGOS
// ==========================================================================

function renderBudgetsView() {
  const monthInput = document.getElementById('budget-month-filter');
  if (monthInput && appState.selectedBudgetMonth) {
    monthInput.value = appState.selectedBudgetMonth;
  }

  if (appState.budgetViewMode === 'monthly') {
    renderMonthlyBudgetOverview();
  } else {
    renderPatientBudgetBreakdown();
  }
}

// 1. RESUMEN MENSUAL DE TODA LA CLÍNICA (TOTALES DEL MES)
function renderMonthlyBudgetOverview() {
  const monthlyPanel = document.getElementById('budget-monthly-overview-panel');
  const patientPanel = document.getElementById('budget-patient-breakdown-panel');
  const btnMonthly = document.getElementById('btn-tab-monthly-overview');
  const btnPatient = document.getElementById('btn-tab-patient-breakdown');

  if (monthlyPanel) monthlyPanel.style.display = 'block';
  if (patientPanel) patientPanel.style.display = 'none';
  if (btnMonthly) { btnMonthly.classList.add('btn-primary'); btnMonthly.classList.remove('btn-secondary'); }
  if (btnPatient) { btnPatient.classList.add('btn-secondary'); btnPatient.classList.remove('btn-primary'); }

  const selMonth = appState.selectedBudgetMonth || new Date().toISOString().slice(0, 7);

  let clinicSubtotal = 0;
  let clinicDiscount = 0;
  let clinicNet = 0;
  let clinicPaidInMonth = 0;
  let clinicBalance = 0;

  // Recalcular finanzas de todos los pacientes
  appState.patients.forEach(patient => {
    if (!patient.budgets || patient.budgets.length === 0) {
      patient.budgets = [{
        id: `B-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().slice(0, 10),
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
        payments: [],
        balance: 0
      }];
    }
    const budget = patient.budgets[0];
    const subtotal = (budget.items || []).reduce((acc, it) => acc + (parseFloat(it.price) || 0), 0);
    const discount = parseFloat(budget.discount) || 0;
    const total = Math.max(0, subtotal - discount);
    const allPaid = (budget.payments || []).reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
    const balance = Math.max(0, total - allPaid);

    budget.subtotal = subtotal;
    budget.discount = discount;
    budget.total = total;
    budget.balance = balance;

    // Abonos cobrados específicamente en el mes seleccionado
    const paidInMonth = (budget.payments || []).reduce((acc, p) => {
      if (p.date && p.date.startsWith(selMonth)) {
        return acc + (parseFloat(p.amount) || 0);
      }
      return acc;
    }, 0);

    clinicSubtotal += subtotal;
    clinicDiscount += discount;
    clinicNet += total;
    clinicPaidInMonth += paidInMonth;
    clinicBalance += balance;
  });

  // Mostrar los 5 totales del mes
  const mSubtotalElem = document.getElementById('monthly-subtotal-amount');
  if (mSubtotalElem) mSubtotalElem.textContent = `$${clinicSubtotal.toFixed(2)}`;

  const mDiscountElem = document.getElementById('monthly-discount-amount');
  if (mDiscountElem) mDiscountElem.textContent = `-$${clinicDiscount.toFixed(2)}`;

  const mNetElem = document.getElementById('monthly-net-amount');
  if (mNetElem) mNetElem.textContent = `$${clinicNet.toFixed(2)}`;

  const mPaidElem = document.getElementById('monthly-paid-amount');
  if (mPaidElem) mPaidElem.textContent = `+$${clinicPaidInMonth.toFixed(2)}`;

  const mBalanceElem = document.getElementById('monthly-balance-amount');
  if (mBalanceElem) mBalanceElem.textContent = `$${clinicBalance.toFixed(2)}`;

  // Tabla general de pacientes con presupuesto
  const tbody = document.getElementById('monthly-patients-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (appState.patients.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; color: var(--text-muted); padding: 24px;">No hay pacientes registrados en el sistema.</td></tr>';
    return;
  }

  appState.patients.forEach(patient => {
    const budget = (patient.budgets && patient.budgets[0]) || { items: [], payments: [], discount: 0, subtotal: 0, total: 0, balance: 0 };
    const allPaid = (budget.payments || []).reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
    const balance = Math.max(0, (budget.total || 0) - allPaid);
    const itemsCount = (budget.items || []).length;
    const cleanPhone = (patient.phone || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}`;

    const tr = document.createElement('tr');
    tr.className = 'monthly-patient-row';
    tr.setAttribute('data-search', `${patient.name} ${patient.documentId || ''} ${patient.phone || ''}`.toLowerCase());

    tr.innerHTML = `
      <td>
        <strong style="color: var(--text-main); font-size: 14px;">${patient.name}</strong><br>
        <small style="color: var(--text-muted); font-size: 11px;">C.I: ${patient.documentId || 'S/C'}</small>
      </td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 12px;">📞 ${patient.phone || 'S/N'}</span>
          ${cleanPhone ? `
            <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-sm" style="padding: 2px 6px; font-size: 10px;" title="Contactar por WhatsApp">
              WA
            </a>
          ` : ''}
        </div>
      </td>
      <td><span style="font-size: 12px; color: var(--text-muted);">${formatDisplayDate(budget.date || '')}</span></td>
      <td><span class="badge badge-info" style="font-size: 11px;">${itemsCount} ${itemsCount === 1 ? 'partida' : 'partidas'}</span></td>
      <td><strong style="font-size: 13px; color: var(--text-main);">$${(budget.subtotal || 0).toFixed(2)}</strong></td>
      <td><span style="color: var(--gold); font-weight: 700; font-size: 12px;">-${(budget.discount || 0) > 0 ? `$${(budget.discount || 0).toFixed(2)}` : '$0.00'}</span></td>
      <td><strong style="color: var(--primary); font-size: 14px;">$${(budget.total || 0).toFixed(2)}</strong></td>
      <td><strong style="color: var(--success); font-size: 13px;">+$${allPaid.toFixed(2)}</strong></td>
      <td>
        <strong style="font-size: 13px; color: ${balance > 0 ? 'var(--danger)' : 'var(--success)'};">
          ${balance > 0 ? `$${balance.toFixed(2)}` : '✅ Pagado'}
        </strong>
      </td>
      <td>
        ${balance > 0 
          ? `<span class="badge badge-warning" style="font-size: 11px;">Con Saldo</span>` 
          : (itemsCount > 0 ? `<span class="badge badge-success" style="font-size: 11px;">Al Día</span>` : `<span class="badge badge-secondary" style="font-size: 11px;">Sin Plan</span>`)}
      </td>
      <td style="text-align: right;">
        <button type="button" class="btn btn-primary btn-sm btn-open-breakdown-action" data-id="${patient.id}" style="font-weight: 700; padding: 5px 12px; font-size: 12px;">
          👁️ Ver Desglose & Cobrar
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.btn-open-breakdown-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      appState.currentPatientId = pId;
      const gSelect = document.getElementById('global-patient-select');
      if (gSelect) gSelect.value = pId;
      appState.budgetViewMode = 'patient';
      renderBudgetsView();
      showToast(`Desglose de presupuesto abierto para: ${getCurrentPatient()?.name || ''}`);
    });
  });
}

// 2. DESGLOSE DETALLADO DEL PACIENTE SELECCIONADO
function renderPatientBudgetBreakdown() {
  const monthlyPanel = document.getElementById('budget-monthly-overview-panel');
  const patientPanel = document.getElementById('budget-patient-breakdown-panel');
  const btnMonthly = document.getElementById('btn-tab-monthly-overview');
  const btnPatient = document.getElementById('btn-tab-patient-breakdown');

  if (monthlyPanel) monthlyPanel.style.display = 'none';
  if (patientPanel) patientPanel.style.display = 'block';
  if (btnMonthly) { btnMonthly.classList.add('btn-secondary'); btnMonthly.classList.remove('btn-primary'); }
  if (btnPatient) { btnPatient.classList.add('btn-primary'); btnPatient.classList.remove('btn-secondary'); }

  const patient = getCurrentPatient();
  if (!patient) return;

  if (!patient.budgets || patient.budgets.length === 0) {
    patient.budgets = [{
      id: `B-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().slice(0, 10),
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      payments: [],
      balance: 0
    }];
  }

  // Encabezado del paciente en el desglose
  const nameElem = document.getElementById('breakdown-patient-name');
  if (nameElem) nameElem.textContent = patient.name;
  const metaElem = document.getElementById('breakdown-patient-meta');
  if (metaElem) metaElem.textContent = `Cédula: ${patient.documentId || 'S/C'} • Teléfono: ${patient.phone || 'S/T'}`;

  const budget = patient.budgets[0];
  const subtotal = budget.items.reduce((acc, it) => acc + (parseFloat(it.price) || 0), 0);
  const discount = parseFloat(budget.discount) || 0;
  const total = Math.max(0, subtotal - discount);
  const paid = (budget.payments || []).reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
  const balance = Math.max(0, total - paid);

  budget.subtotal = subtotal;
  budget.discount = discount;
  budget.total = total;
  budget.balance = balance;

  const subtotalElem = document.getElementById('budget-subtotal-amount');
  if (subtotalElem) subtotalElem.textContent = `$${subtotal.toFixed(2)}`;

  const discountElem = document.getElementById('budget-discount-amount');
  if (discountElem) discountElem.textContent = `-$${discount.toFixed(2)}`;

  const discountBadge = document.getElementById('budget-discount-badge');
  if (discountBadge) {
    discountBadge.textContent = discount > 0 ? `-$${discount.toFixed(2)} Descuento Dra.` : '$0.00 Descuento';
    discountBadge.className = discount > 0 ? 'badge badge-warning' : 'badge badge-info';
  }

  const totElem = document.getElementById('budget-total-amount');
  if (totElem) totElem.textContent = `$${total.toFixed(2)}`;
  const paidElem = document.getElementById('budget-paid-amount');
  if (paidElem) paidElem.textContent = `$${paid.toFixed(2)}`;
  const balElem = document.getElementById('budget-balance-amount');
  if (balElem) balElem.textContent = `$${balance.toFixed(2)}`;

  // Tabla de partidas de este paciente
  const itemsTbody = document.getElementById('budget-items-tbody');
  if (itemsTbody) {
    itemsTbody.innerHTML = '';
    if (budget.items.length === 0) {
      itemsTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 20px;">No hay procedimientos en el plan de tratamiento actual. Agrega desde el odontograma o con el botón "+ Agregar Procedimiento".</td></tr>';
    } else {
      budget.items.forEach((it, idx) => {
        const tr = document.createElement('tr');
        const currentPriceVal = it.price !== undefined ? it.price : 0;
        tr.innerHTML = `
          <td><strong style="color: var(--primary);">${it.tooth ? `Pieza #${it.tooth}` : 'General'}</strong></td>
          <td>${it.name}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-weight: 800; color: var(--primary); font-size: 14px;">$</span>
              <input type="number" 
                     class="form-control budget-item-price-input" 
                     data-idx="${idx}" 
                     value="${currentPriceVal}" 
                     min="0" 
                     step="any" 
                     placeholder="0.00" 
                     style="width: 105px; font-weight: 800;" 
                     title="Ingresa aquí el precio acordado">
            </div>
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn btn-secondary btn-sm btn-delete-budget-item" data-idx="${idx}" style="color: var(--danger);">🗑️ Eliminar</button>
          </td>
        `;
        itemsTbody.appendChild(tr);
      });

      itemsTbody.querySelectorAll('.budget-item-price-input').forEach(inp => {
        inp.addEventListener('input', async (e) => {
          const idx = parseInt(e.target.getAttribute('data-idx'));
          const newPrice = Math.max(0, parseFloat(e.target.value) || 0);
          if (budget.items[idx]) {
            budget.items[idx].price = newPrice;
          }
          const newSub = budget.items.reduce((acc, it) => acc + (parseFloat(it.price) || 0), 0);
          const newTot = Math.max(0, newSub - (budget.discount || 0));
          const newBal = Math.max(0, newTot - paid);
          budget.subtotal = newSub;
          budget.total = newTot;
          budget.balance = newBal;

          const sElem = document.getElementById('budget-subtotal-amount');
          if (sElem) sElem.textContent = `$${newSub.toFixed(2)}`;
          const tElem = document.getElementById('budget-total-amount');
          if (tElem) tElem.textContent = `$${newTot.toFixed(2)}`;
          const bElem = document.getElementById('budget-balance-amount');
          if (bElem) bElem.textContent = `$${newBal.toFixed(2)}`;

          await saveAppData();
          renderLiveOdontoBudget();
        });
      });

      itemsTbody.querySelectorAll('.btn-delete-budget-item').forEach(b => {
        b.addEventListener('click', async (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
          budget.items.splice(idx, 1);
          await saveAppData();
          renderBudgetsView();
          renderLiveOdontoBudget();
          showToast('Procedimiento eliminado del presupuesto.');
        });
      });
    }
  }

  // Tabla de abonos / pagos de este paciente
  const payTbody = document.getElementById('payments-items-tbody');
  if (payTbody) {
    payTbody.innerHTML = '';
    if ((budget.payments || []).length === 0) {
      payTbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">Aún no se han registrado abonos para este paciente.</td></tr>';
    } else {
      budget.payments.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDisplayDate(p.date)}</td>
          <td>${p.method}</td>
          <td><code>${p.reference || 'S/R'}</code></td>
          <td>${p.note || ''}</td>
          <td><strong style="color: var(--success); font-size: 14px;">+$${(p.amount || 0).toFixed(2)}</strong></td>
        `;
        payTbody.appendChild(tr);
      });
    }
  }
}

// MODAL ASIGNAR DESCUENTO EN $ AL PRESUPUESTO
function openDiscountModal() {
  const patient = getCurrentPatient();
  if (!patient || !patient.budgets || !patient.budgets[0]) return;
  const currentDiscount = patient.budgets[0].discount || 0;
  document.getElementById('budget-discount-input').value = currentDiscount;
  document.getElementById('discount-modal').classList.add('active');
}

async function confirmSaveDiscount() {
  const patient = getCurrentPatient();
  if (!patient || !patient.budgets || !patient.budgets[0]) return;
  const discountVal = parseFloat(document.getElementById('budget-discount-input').value) || 0;

  if (discountVal < 0) {
    showToast('El monto de descuento no puede ser menor a 0.', 'warning');
    return;
  }

  patient.budgets[0].discount = discountVal;
  await saveAppData();
  renderBudgetsView();
  document.getElementById('discount-modal').classList.remove('active');
  showToast(`Descuento de $${discountVal.toFixed(2)} asignado correctamente al presupuesto.`);
}

// MODAL REGISTRAR ABONO
function openPaymentModal() {
  document.getElementById('payment-amount-input').value = '';
  document.getElementById('payment-ref-input').value = '';
  document.getElementById('payment-note-input').value = '';
  document.getElementById('payment-modal').classList.add('active');
}

async function confirmSavePayment() {
  const patient = getCurrentPatient();
  const amount = parseFloat(document.getElementById('payment-amount-input').value);
  const method = document.getElementById('payment-method-select').value;
  const ref = document.getElementById('payment-ref-input').value.trim();
  const note = document.getElementById('payment-note-input').value.trim();

  if (!amount || amount <= 0) {
    showToast('Por favor introduce un monto de abono válido.', 'warning');
    return;
  }

  const budget = patient.budgets[0];
  budget.payments.push({
    id: `PAY-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    amount,
    method,
    reference: ref,
    note
  });

  await saveAppData();
  renderBudgetsView();
  document.getElementById('payment-modal').classList.remove('active');
  showToast(`Abono de $${amount.toFixed(2)} registrado exitosamente.`);
}

// MODAL AGREGAR PARTIDA A PRESUPUESTO
function openAddBudgetItemModal() {
  const catSelect = document.getElementById('budget-catalog-select');
  catSelect.innerHTML = '<option value="">-- Procedimientos Predeterminados --</option>';
  appState.treatments.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.name;
    opt.textContent = `${t.name} ($${t.defaultPrice})`;
    opt.setAttribute('data-price', t.defaultPrice);
    catSelect.appendChild(opt);
  });

  catSelect.onchange = () => {
    const sel = catSelect.options[catSelect.selectedIndex];
    if (sel && sel.value) {
      document.getElementById('budget-custom-name').value = sel.value;
      document.getElementById('budget-custom-price').value = sel.getAttribute('data-price') || 0;
    }
  };

  document.getElementById('budget-tooth-input').value = 'General';
  document.getElementById('budget-custom-name').value = '';
  document.getElementById('budget-custom-price').value = 0;
  document.getElementById('budget-item-modal').classList.add('active');
}

async function confirmAddBudgetItem() {
  const patient = getCurrentPatient();
  const tooth = document.getElementById('budget-tooth-input').value.trim();
  const name = document.getElementById('budget-custom-name').value.trim();
  const price = parseFloat(document.getElementById('budget-custom-price').value) || 0;

  if (!name || price <= 0) {
    showToast('Por favor completa el nombre del tratamiento y el costo.', 'warning');
    return;
  }

  const budget = patient.budgets[0];
  budget.items.push({
    treatmentId: `ITEM-${Date.now()}`,
    tooth,
    name,
    price
  });

  await saveAppData();
  renderBudgetsView();
  document.getElementById('budget-item-modal').classList.remove('active');
  showToast('Procedimiento agregado al presupuesto.');
}

// ==========================================================================
// 5. GALERÍA CLÍNICA & RAYOS X
// ==========================================================================

function renderGalleryView() {
  const container = document.getElementById('gallery-container');
  const patient = getCurrentPatient();
  if (!container || !patient) return;

  const gallery = patient.gallery || [];
  container.innerHTML = '';

  if (gallery.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 15px; font-weight: 600;">No hay radiografías ni fotos registradas para este paciente.</p>
        <p style="font-size: 12px; margin-top: 6px;">Haz clic en "Agregar Imagen o Rayos X" para adjuntar estudios diagnósticos.</p>
      </div>
    `;
    return;
  }

  gallery.forEach(img => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${img.src}" alt="${img.title}" class="gallery-thumb" />
      <div class="gallery-info">
        <h5>${img.title}</h5>
        <p>📅 ${formatDisplayDate(img.date)} • <strong>${img.type || 'Estudio'}</strong></p>
        ${img.notes ? `<p style="margin-top: 4px; color: var(--text-main); font-size: 12px;">${img.notes}</p>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function handleUploadPhoto() {
  const patient = getCurrentPatient();
  const title = prompt('Título o descripción de la imagen (Ej: Radiografía de Cordales, Foto Inicial):');
  if (!title) return;

  const notes = prompt('Observación clínica:') || '';

  // Input de archivo para cargar imagen local
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (readerEvent) => {
        if (!patient.gallery) patient.gallery = [];
        patient.gallery.push({
          id: `IMG-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          title,
          type: "Radiografía / Fotografía",
          notes,
          src: readerEvent.target.result
        });
        await saveAppData();
        renderGalleryView();
        showToast('Imagen guardada en el expediente del paciente.');
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
}

// ==========================================================================
// 6. CONFIGURACIÓN & CLÍNICA
// ==========================================================================

function populateClinicConfig() {
  const c = appState.clinic || {};
  document.getElementById('config-clinic-name').value = c.name || 'Sonrisa Perfecta, C.A.';
  document.getElementById('config-doctor-name').value = c.doctor || 'OD. Celenia Tovar';
  document.getElementById('config-phone').value = c.phone || '+58 414 1234567';
  document.getElementById('config-email').value = c.email || 'sonrisaperfecta.dental@gmail.com';
  document.getElementById('config-address').value = c.address || 'Centro Médico Dental';
}

async function saveClinicConfig() {
  appState.clinic = {
    name: document.getElementById('config-clinic-name').value,
    doctor: document.getElementById('config-doctor-name').value,
    phone: document.getElementById('config-phone').value,
    email: document.getElementById('config-email').value,
    address: document.getElementById('config-address').value,
    currencySymbol: "$"
  };
  await saveAppData();
  showToast('Datos del consultorio guardados.');
}

// ==========================================================================
// LISTENERS GENERALES & MODALES
// ==========================================================================

function setupEventListeners() {
  // Cierre de modales
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      const m = document.getElementById(modalId);
      if (m) m.classList.remove('active');
    });
  });

  // Botón nueva cita topbar y modal
  const btnQuickApt = document.getElementById('btn-quick-new-appointment');
  if (btnQuickApt) {
    btnQuickApt.addEventListener('click', () => {
      openNewAppointmentModal(appState.currentPatientId, appState.selectedAppointmentDate, "09:00", 60);
    });
  }

  const btnQuickAptView = document.getElementById('btn-quick-new-apt-view');
  if (btnQuickAptView) {
    btnQuickAptView.addEventListener('click', () => {
      openNewAppointmentModal(appState.currentPatientId, appState.selectedAppointmentDate, "09:00", 60);
    });
  }

  const btnSaveApt = document.getElementById('btn-save-appointment');
  if (btnSaveApt) btnSaveApt.addEventListener('click', saveAppointment);

  // Navegación diaria de fecha de citas
  const dateFilter = document.getElementById('appointment-date-filter');
  if (dateFilter) {
    dateFilter.value = appState.selectedAppointmentDate || new Date().toISOString().slice(0, 10);
    dateFilter.addEventListener('change', (e) => {
      appState.selectedAppointmentDate = e.target.value;
      renderAppointmentsView();
    });
  }

  const statusFilter = document.getElementById('appointment-status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', renderAppointmentsView);
  }

  const btnDatePrev = document.getElementById('btn-date-prev');
  if (btnDatePrev) {
    btnDatePrev.addEventListener('click', () => {
      const parts = (appState.selectedAppointmentDate || new Date().toISOString().slice(0, 10)).split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2] - 1);
      appState.selectedAppointmentDate = d.toISOString().slice(0, 10);
      renderAppointmentsView();
    });
  }

  const btnDateNext = document.getElementById('btn-date-next');
  if (btnDateNext) {
    btnDateNext.addEventListener('click', () => {
      const parts = (appState.selectedAppointmentDate || new Date().toISOString().slice(0, 10)).split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2] + 1);
      appState.selectedAppointmentDate = d.toISOString().slice(0, 10);
      renderAppointmentsView();
    });
  }

  const btnFilterToday = document.getElementById('btn-filter-today');
  if (btnFilterToday) {
    btnFilterToday.addEventListener('click', () => {
      appState.selectedAppointmentDate = new Date().toISOString().slice(0, 10);
      renderAppointmentsView();
    });
  }

  // Alternador de vistas: Bloques 30 min vs Lista
  const btnViewBlocks = document.getElementById('btn-view-blocks');
  if (btnViewBlocks) {
    btnViewBlocks.addEventListener('click', () => {
      appState.appointmentViewMode = 'blocks';
      renderAppointmentsView();
    });
  }

  const btnViewList = document.getElementById('btn-view-list');
  if (btnViewList) {
    btnViewList.addEventListener('click', () => {
      appState.appointmentViewMode = 'list';
      renderAppointmentsView();
    });
  }

  // Escuchadores en vivo en modal de cita (hora, duración, colisiones)
  ['appointment-date-input', 'appointment-time-input', 'appointment-duration-input'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updateAppointmentTimePreview);
      el.addEventListener('input', updateAppointmentTimePreview);
    }
  });

  // ==========================================
  // Navegación de Presupuestos & Pagos Mensuales
  // ==========================================
  const monthFilter = document.getElementById('budget-month-filter');
  if (monthFilter) {
    monthFilter.value = appState.selectedBudgetMonth || new Date().toISOString().slice(0, 7);
    monthFilter.addEventListener('change', (e) => {
      appState.selectedBudgetMonth = e.target.value;
      renderBudgetsView();
    });
  }

  const btnMonthPrev = document.getElementById('btn-budget-month-prev');
  if (btnMonthPrev) {
    btnMonthPrev.addEventListener('click', () => {
      const parts = (appState.selectedBudgetMonth || new Date().toISOString().slice(0, 7)).split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 2, 1);
      appState.selectedBudgetMonth = d.toISOString().slice(0, 7);
      renderBudgetsView();
    });
  }

  const btnMonthNext = document.getElementById('btn-budget-month-next');
  if (btnMonthNext) {
    btnMonthNext.addEventListener('click', () => {
      const parts = (appState.selectedBudgetMonth || new Date().toISOString().slice(0, 7)).split('-').map(Number);
      const d = new Date(parts[0], parts[1], 1);
      appState.selectedBudgetMonth = d.toISOString().slice(0, 7);
      renderBudgetsView();
    });
  }

  const btnMonthCurrent = document.getElementById('btn-budget-month-current');
  if (btnMonthCurrent) {
    btnMonthCurrent.addEventListener('click', () => {
      appState.selectedBudgetMonth = new Date().toISOString().slice(0, 7);
      renderBudgetsView();
    });
  }

  const btnTabMonthly = document.getElementById('btn-tab-monthly-overview');
  if (btnTabMonthly) {
    btnTabMonthly.addEventListener('click', () => {
      appState.budgetViewMode = 'monthly';
      renderBudgetsView();
    });
  }

  const btnTabPatient = document.getElementById('btn-tab-patient-breakdown');
  if (btnTabPatient) {
    btnTabPatient.addEventListener('click', () => {
      appState.budgetViewMode = 'patient';
      renderBudgetsView();
    });
  }

  const btnBackMonthly = document.getElementById('btn-back-to-monthly-summary');
  if (btnBackMonthly) {
    btnBackMonthly.addEventListener('click', () => {
      appState.budgetViewMode = 'monthly';
      renderBudgetsView();
    });
  }

  const searchMonthlyPatients = document.getElementById('monthly-patients-search');
  if (searchMonthlyPatients) {
    searchMonthlyPatients.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.monthly-patient-row').forEach(row => {
        const dataSearch = row.getAttribute('data-search') || '';
        row.style.display = dataSearch.includes(term) ? '' : 'none';
      });
    });
  }

  // Modal Diente
  document.querySelectorAll('.condition-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.condition-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');
    });
  });

  document.querySelectorAll('.surface-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });

  document.getElementById('btn-save-tooth-modal').addEventListener('click', saveToothModalChanges);
  document.getElementById('btn-add-tooth-to-budget').addEventListener('click', addActiveToothToBudget);

  // Pacientes
  document.getElementById('btn-new-patient').addEventListener('click', () => {
    openEditPatientModal(null);
  });
  document.getElementById('btn-save-patient').addEventListener('click', savePatientModal);
  document.getElementById('patient-search-input').addEventListener('input', renderPatientsList);

  // Presupuestos
  document.getElementById('btn-add-payment').addEventListener('click', openPaymentModal);
  document.getElementById('btn-save-payment-confirm').addEventListener('click', confirmSavePayment);
  document.getElementById('btn-add-budget-item').addEventListener('click', openAddBudgetItemModal);
  document.getElementById('btn-confirm-add-budget-item').addEventListener('click', confirmAddBudgetItem);

  // 1. PALETA DE PINCEL CLÍNICO (Caries, Resina, Endodoncia, Corona, Cirugía, Ausente, Sano)
  document.querySelectorAll('.btn-clinical-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-clinical-tool').forEach(b => {
        b.classList.remove('active');
        b.style.backgroundColor = '#ffffff';
      });
      btn.classList.add('active');
      const tool = btn.getAttribute('data-tool');
      appState.activeTool = tool;

      // Color de fondo distintivo según la herramienta activa
      if (tool === 'caries') btn.style.backgroundColor = 'var(--danger-bg)';
      else if (tool === 'obturado') btn.style.backgroundColor = '#eff6ff';
      else if (tool === 'endodoncia') btn.style.backgroundColor = '#fefce8';
      else if (tool === 'corona') btn.style.backgroundColor = '#f5f3ff';
      else if (tool === 'cirugia') btn.style.backgroundColor = '#ffe4e6';
      else if (tool === 'ausente') btn.style.backgroundColor = '#f1f5f9';
      else if (tool === 'sano') btn.style.backgroundColor = '#f0fdf4';

      showToast(`🖌️ Pincel activo: ${btn.textContent.trim()}. Haz clic en cualquier cuadrito del diente.`);
    });
  });

  // 2. BOTONES DE CARAS EN EL PANEL DE DETALLE INFERIOR (🟢 Sano, 🔴 Caries, 🔵 Resina)
  document.querySelectorAll('.btn-face-choice').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!appState.selectedTooth) {
        showToast('Selecciona primero un diente para detallar sus caras.', 'warning');
        return;
      }
      const face = btn.getAttribute('data-face');
      const val = btn.getAttribute('data-val');
      await applyToolToToothFace(appState.selectedTooth, face, val);
    });
  });

  // 3. ACCIONES PARA PIEZA COMPLETA (Cirugía, Endodoncia, Corona, Ausente, Todo Sano)
  document.querySelectorAll('.btn-apply-whole-tooth').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!appState.selectedTooth) {
        showToast('Selecciona primero un diente.', 'warning');
        return;
      }
      const tool = btn.getAttribute('data-tool');
      await applyWholeToothCondition(appState.selectedTooth, tool);
    });
  });

  // Botón cerrar barra rápida
  const btnCloseQuick = document.getElementById('btn-close-quick-tooth');
  if (btnCloseQuick) {
    btnCloseQuick.addEventListener('click', () => {
      appState.selectedTooth = null;
      const bar = document.getElementById('quick-tooth-action-bar');
      if (bar) bar.style.display = 'none';
      renderOdontogramBoard();
    });
  }

  // Botón abrir modal avanzado
  const btnAdv = document.getElementById('btn-open-advanced-tooth-modal');
  if (btnAdv) {
    btnAdv.addEventListener('click', () => {
      if (appState.selectedTooth) {
        openToothModal(appState.selectedTooth);
      }
    });
  }

  // 4. PROCEDIMIENTOS GENERALES (Toda la boca - Limpieza, Blanqueamiento, Ortodoncia, Flúor - Sin precio fijo)
  document.querySelectorAll('.btn-general-action').forEach(btn => {
    btn.addEventListener('click', async () => {
      const name = btn.getAttribute('data-name');
      await applyGeneralTreatment(name);
    });
  });

  // Descuento inline en el odontograma
  const inlineDiscInput = document.getElementById('odonto-inline-discount-input');
  if (inlineDiscInput) {
    inlineDiscInput.addEventListener('input', async (e) => {
      const patient = getCurrentPatient();
      if (!patient || !patient.budgets || !patient.budgets[0]) return;
      const discountVal = Math.max(0, parseFloat(e.target.value) || 0);
      patient.budgets[0].discount = discountVal;
      await saveAppData();
      renderLiveOdontoBudget();
      renderBudgetsView();
    });
  }

  // Botón imprimir desde el odontograma
  const btnOdontoPrint = document.getElementById('btn-odonto-print-direct');
  if (btnOdontoPrint) {
    btnOdontoPrint.addEventListener('click', () => {
      if (window.api && window.api.print) {
        window.api.print();
      } else {
        window.print();
      }
    });
  }

  // Descuento en $ de la Dra.
  const btnEditDisc = document.getElementById('btn-edit-discount');
  if (btnEditDisc) btnEditDisc.addEventListener('click', openDiscountModal);

  const btnQuickDisc = document.getElementById('btn-quick-discount-modal');
  if (btnQuickDisc) btnQuickDisc.addEventListener('click', openDiscountModal);

  const btnSaveDisc = document.getElementById('btn-save-discount-confirm');
  if (btnSaveDisc) btnSaveDisc.addEventListener('click', confirmSaveDiscount);

  document.getElementById('btn-print-budget').addEventListener('click', () => {
    if (window.api && window.api.print) {
      window.api.print();
    } else {
      window.print();
    }
  });

  // Galería
  document.getElementById('btn-upload-photo').addEventListener('click', handleUploadPhoto);

  // Configuración
  document.getElementById('btn-save-clinic-config').addEventListener('click', saveClinicConfig);
  document.getElementById('btn-export-backup').addEventListener('click', async () => {
    if (window.api && window.api.exportBackup) {
      const res = await window.api.exportBackup(appState);
      if (res.success) showToast(`Copia de seguridad guardada en: ${res.filePath}`);
    } else {
      // Descarga por navegador
      const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Sonrisa_Perfecta_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      showToast('Copia de seguridad descargada.');
    }
  });

  document.getElementById('btn-import-backup').addEventListener('click', async () => {
    if (window.api && window.api.importBackup) {
      const res = await window.api.importBackup();
      if (res.success && res.data) {
        appState = res.data;
        populateGlobalPatientSelect();
        renderAppointmentsView();
        renderOdontogramBoard();
        renderPatientsList();
        renderBudgetsView();
        renderGalleryView();
        populateClinicConfig();
        showToast('Datos restaurados correctamente.');
      }
    } else {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (re) => {
            try {
              appState = JSON.parse(re.target.result);
              await saveAppData();
              populateGlobalPatientSelect();
              renderAppointmentsView();
              renderOdontogramBoard();
              renderPatientsList();
              renderBudgetsView();
              renderGalleryView();
              populateClinicConfig();
              showToast('Datos restaurados correctamente.');
            } catch (err) {
              showToast('Archivo JSON inválido.', 'danger');
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    }
  });

  // Botón Historia Clínica Topbar
  const btnQuickHistory = document.getElementById('btn-quick-open-history');
  if (btnQuickHistory) {
    btnQuickHistory.addEventListener('click', () => {
      switchView('historia');
    });
  }

  // Botón Guardar Historia Clínica
  const btnHcSave = document.getElementById('btn-hc-save');
  if (btnHcSave) {
    btnHcSave.addEventListener('click', () => {
      saveCurrentClinicalHistoryForm(true);
    });
  }

  // Botón Imprimir Ficha Llena
  const btnHcPrintFilled = document.getElementById('btn-hc-print-filled');
  if (btnHcPrintFilled) {
    btnHcPrintFilled.addEventListener('click', () => {
      const paper = document.getElementById('history-paper-element');
      if (paper) paper.classList.remove('blank-print-mode');
      if (window.api && window.api.print) {
        window.api.print();
      } else {
        window.print();
      }
    });
  }

  // Botón Imprimir Formato en Blanco (para escribir a mano)
  const btnHcPrintBlank = document.getElementById('btn-hc-print-blank');
  if (btnHcPrintBlank) {
    btnHcPrintBlank.addEventListener('click', () => {
      const paper = document.getElementById('history-paper-element');
      if (paper) paper.classList.add('blank-print-mode');
      if (window.api && window.api.print) {
        window.api.print();
      } else {
        window.print();
      }
      setTimeout(() => {
        if (paper) paper.classList.remove('blank-print-mode');
      }, 1000);
    });
  }

  // Botón Nuevo Paciente desde Historia
  const btnHcNewPat = document.getElementById('btn-hc-new-patient');
  if (btnHcNewPat) {
    btnHcNewPat.addEventListener('click', () => {
      openEditPatientModal(null);
    });
  }

  // Herramientas de pincel en Historia Clínica (Barra superior y Panel lateral derecho)
  document.querySelectorAll('.btn-hc-tool, .btn-hc-side-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.getAttribute('data-tool');
      syncToolPaletteUI(tool);
    });
  });

  // Botón Guardar del panel lateral
  const btnHcSideSave = document.getElementById('btn-hc-side-save');
  if (btnHcSideSave) {
    btnHcSideSave.addEventListener('click', () => {
      saveCurrentClinicalHistoryForm(true);
    });
  }

  // Botón Imprimir del panel lateral
  const btnHcSidePrint = document.getElementById('btn-hc-side-print-filled');
  if (btnHcSidePrint) {
    btnHcSidePrint.addEventListener('click', () => {
      const btnFilled = document.getElementById('btn-hc-print-filled');
      if (btnFilled) btnFilled.click();
    });
  }

  // Auto-guardar al modificar campos de la Historia Clínica
  const paperElement = document.getElementById('history-paper-element');
  if (paperElement) {
    paperElement.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('change', () => {
        saveCurrentClinicalHistoryForm(false);
      });
      if (input.type === 'text' || input.tagName === 'TEXTAREA') {
        input.addEventListener('blur', () => {
          saveCurrentClinicalHistoryForm(false);
        });
      }
    });
  }
}

// TOAST NOTIFICATIONS
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'warning') toast.style.backgroundColor = '#d97706';
  if (type === 'danger') toast.style.backgroundColor = '#dc2626';

  toast.innerHTML = `
    <span>${type === 'danger' ? '⚠️' : '✅'}</span>
    <span>${msg}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
