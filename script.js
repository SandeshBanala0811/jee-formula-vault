const CHAPTER_MANIFEST = [
  {
    id: 'kinematics',
    title: 'Kinematics',
    desc: 'Motion in a Straight Line, Motion in a Plane, and Circular Motion — the foundation of all mechanics.',
    icon: 'fa-solid fa-arrow-trend-up',
    color: '#ff8a5c',
    count: 91,
    path: 'chapters/kinematics.html',
    keywords: ['motion', 'velocity', 'acceleration', 'gravity', 'projectile', 'circular']
  },
  {
    id: 'matrices',
    title: 'Matrices & Determinants',
    desc: 'Algebra of matrices, determinant properties, inverse, systems of equations, and Cayley-Hamilton theorem.',
    icon: 'fa-solid fa-table-cells',
    color: '#00c4ff',
    count: 87,
    path: 'chapters/matrices.html',
    keywords: ['symmetric', 'determinants', 'transpose', 'adjoint', 'cramer', 'inverse']
  },
  {
    id: 'atomic',
    title: 'Atomic Structure',
    desc: 'Quantum theory, photoelectric effect, Bohr model, atomic spectra, de Broglie hypothesis, and quantum numbers.',
    icon: 'fa-solid fa-atom',
    color: '#00e89d',
    count: 114,
    path: 'chapters/atomic-structure.html',
    keywords: ['bohr', 'quantum', 'spectral', 'rydberg', 'photoelectric', 'nodes']
  },
  {
    id: 'chemistry-concepts',
    title: 'Basic Concepts of Chemistry',
    desc: 'Mole concept, stoichiometry, concentration terms, equivalent weight, and all foundational chemistry calculations.',
    icon: 'fa-solid fa-flask',
    color: '#ff6b9d',
    count: 86,
    path: 'chapters/chemistry-concepts.html',
    keywords: ['mole', 'molarity', 'molality', 'normality', 'yield', 'stoichiometry', 'empirical']
  },
  {
    id: 'gases',
    title: 'States of Matter: Gases',
    desc: 'Gas laws, ideal gas equation, Dalton\'s law, Graham\'s law, kinetic theory, Van der Waals equation, and real gas behaviour.',
    icon: 'fa-solid fa-wind',
    color: '#f0b429',
    count: 99,
    path: 'chapters/gases.html',
    keywords: ['gas', 'boyle', 'charles', 'dalton', 'graham', 'rms', 'speed', 'thermo', 'critical', 'van der waals']
  },
  {
    id: 'basic-maths',
    title: 'Basic Mathematics',
    desc: 'Logarithms with domain restrictions, wavy-curve method, modulus inequalities, quadratic roots, and foundational calculus tools.',
    icon: 'fa-solid fa-calculator',
    color: '#a855f7',
    count: 38,
    path: 'chapters/basic-maths.html',
    keywords: ['log', 'base', 'domain', 'modulus', 'inequality', 'differentiation', 'integration', 'discriminant']
  },
  {
    id: 'units-dimensions',
    title: 'Units, Dimensions & Errors',
    desc: 'Dimensional analysis of high-yield quantities, error propagation rules, significant figures, Vernier Calipers, and Screw Gauge metrics.',
    icon: 'fa-solid fa-ruler-combined',
    color: '#06b6d4',
    count: 52,
    path: 'chapters/units-dimensions.html',
    keywords: ['dimension', 'unit', 'error', 'vernier', 'screw gauge', 'significant', 'least count']
  }
];

const CORE_RANDOM_POOL = [
  { subject: 'Kinematics', color: '#ff8a5c', name: 'Time of Flight', formula: 'T = 2u sinθ / g' },
  { subject: 'Kinematics', color: '#ff8a5c', name: 'Trajectory Equation', formula: 'y = x tanθ − gx² / (2u² cos²θ)' },
  { subject: 'Kinematics', color: '#ff8a5c', name: 'Centripetal Acceleration', formula: 'a_c = v²/r = ω²r' },
  { subject: 'Matrices & Determinants', color: '#00c4ff', name: 'Determinant of Adjoint', formula: '|adj A| = |A|^(n−1)' },
  { subject: 'Matrices & Determinants', color: '#00c4ff', name: 'Cayley-Hamilton Theorem', formula: 'A² − (tr A)A + |A|I = O' },
  { subject: 'Atomic Structure', color: '#00e89d', name: 'Bohr Radius', formula: 'r_n = 0.529 × n²/Z Å' },
  { subject: 'Atomic Structure', color: '#00e89d', name: 'de Broglie Wavelength', formula: 'λ = h/√(2mKE)' },
  { subject: 'Basic Concepts of Chemistry', color: '#ff6b9d', name: 'Molarity-Molality Link', formula: 'm = (M × 1000) / (1000d − M × M_solute)' },
  { subject: 'Basic Concepts of Chemistry', color: '#ff6b9d', name: 'Equivalent Weight', formula: 'E = M / n-factor' }
];

// JEE 2028 Countdown Target calculation
const targetDate = new Date('January 15, 2028 00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;
  
  if (diff <= 0) {
    document.getElementById('timer').innerHTML = "<div class='timer-segment' style='width:auto;'>Session 1 Underway!</div>";
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = String(days).padStart(2, '0') + 'd';
  document.getElementById('hours').textContent = String(hours).padStart(2, '0') + 'h';
  document.getElementById('mins').textContent = String(mins).padStart(2, '0') + 'm';
  document.getElementById('secs').textContent = String(secs).padStart(2, '0') + 's';
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Starred Cheat Sheet Logic
function loadStarredFormulas() {
  const starred = JSON.parse(localStorage.getItem('starredFormulas')) || [];
  const section = document.getElementById('starredSection');
  const grid = document.getElementById('starredGrid');
  
  if (starred.length === 0) {
    section.classList.remove('has-stars');
    return;
  }
  
  section.classList.add('has-stars');
  grid.innerHTML = starred.map((item, index) => `
    <div class="starred-card" onclick="copyStarredFormula('${esc(item.formula)}')">
      <div class="sc-header">
        <span>${esc(item.subject)}</span>
        <button class="sc-unstar" onclick="unstarFormula(event, ${index})"><i class="fa-solid fa-star"></i></button>
      </div>
      <div class="sc-name">${esc(item.name)}</div>
      <div class="sc-formula">${esc(item.formula)}</div>
    </div>
  `).join('');
}

function copyStarredFormula(formulaText) {
  navigator.clipboard.writeText(formulaText).then(() => {
    showToast('Formula copied!');
  });
}

function unstarFormula(event, index) {
  event.stopPropagation();
  let starred = JSON.parse(localStorage.getItem('starredFormulas')) || [];
  starred.splice(index, 1);
  localStorage.setItem('starredFormulas', JSON.stringify(starred));
  loadStarredFormulas();
}

function esc(s) { return String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1500);
}

function renderDashboard(filterText = '') {
  const container = document.getElementById('chapterGrid');
  const q = filterText.toLowerCase().trim();
  
  const filtered = CHAPTER_MANIFEST.filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.desc.toLowerCase().includes(q) ||
    item.keywords.some(k => k.includes(q))
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No chapters matched your search terms.</p>
      </div>`;
    return;
  }

  // Cards now redirect directly to item.path on click
  container.innerHTML = filtered.map(item => `
    <div class="chapter-card" style="--card-accent: ${item.color}" onclick="window.location.href='${item.path}'">
      <div>
        <div class="chapter-card-head">
          <span class="chapter-card-title"><i class="${item.icon}"></i> ${item.title}</span>
          <span class="badge">${item.count} Formulas</span>
        </div>
        <p class="chapter-card-desc">${item.desc}</p>
      </div>
      <div class="chapter-card-actions">
        <button class="btn btn-revision" onclick="event.stopPropagation(); startQuickRevision('${item.id}')"><i class="fa-solid fa-bolt"></i> Quick Rev</button>
      </div>
    </div>
  `).join('');
}

// Random Formula Modals
const modal = document.getElementById('modal');
const modalSubject = document.getElementById('modalSubject');
const modalName = document.getElementById('modalName');
const modalFormula = document.getElementById('modalFormula');
let modalRevealed = false;

function showRandomFormula() {
  const randomElement = CORE_RANDOM_POOL[Math.floor(Math.random() * CORE_RANDOM_POOL.length)];
  modalSubject.textContent = randomElement.subject;
  modalSubject.style.color = randomElement.color;
  modalName.textContent = randomElement.name;
  modalFormula.textContent = randomElement.formula;
  modalFormula.classList.add('hidden-f');
  modalRevealed = false;
  document.getElementById('modalReveal').textContent = 'Reveal';
  modal.classList.add('show');
}

function startQuickRevision(chapterId) {
  const chapter = CHAPTER_MANIFEST.find(c => c.id === chapterId);
  if (chapter) {
    window.location.href = `${chapter.path}?mode=quick`;
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

document.getElementById('searchInput').addEventListener('input', e => renderDashboard(e.target.value));
document.getElementById('randomBtn').addEventListener('click', showRandomFormula);
document.getElementById('constantsBtn').addEventListener('click', () => {
  document.getElementById('constantsModal').classList.add('show');
});

document.getElementById('modalReveal').addEventListener('click', () => {
  if (!modalRevealed) {
    modalFormula.classList.remove('hidden-f');
    modalRevealed = true;
    document.getElementById('modalReveal').textContent = 'Copy';
  } else {
    navigator.clipboard.writeText(modalFormula.textContent).then(() => {
      showToast('Formula copied!');
    });
  }
});

document.getElementById('modalNext').addEventListener('click', showRandomFormula);

// Close overlay if background clicked
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
  }
});

// Run layout render on execution
renderDashboard();
loadStarredFormulas();
