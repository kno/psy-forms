// Needs data
const needs = [
  { id: 1, name: "Admiración", description: "" },
  { id: 2, name: "Afecto, cariño", description: "" },
  { id: 3, name: "Afinidad", description: "Ocio, intereses…" },
  { id: 4, name: "Apoyo", description: "" },
  { id: 5, name: "Autoestima, percepción de valía", description: "" },
  { id: 6, name: "Conexión mental", description: "" },
  { id: 7, name: "Contacto corporal", description: "" },
  { id: 8, name: "Control", description: "Saber dónde está, con quién, qué hace…" },
  { id: 9, name: "Diversión", description: "Reírse, pasarlo bien" },
  { id: 10, name: "Imagen social, estatus", description: "" },
  { id: 11, name: "Intimidad, conexión emocional", description: "" },
  { id: 12, name: "Presencia, compañía", description: "" },
  { id: 13, name: "Proyecto de familia o de vida", description: "" },
  { id: 14, name: "Respeto al espacio personal", description: "" },
  { id: 15, name: "Respeto a la persona", description: "En el trato" },
  { id: 16, name: "Sexualidad", description: "" },
  { id: 17, name: "Valores morales y/o sociales", description: "" }
];

const TOTAL_NEEDS = needs.length;

// Application state
let state = {
  partnerName: '',
  userSex: '',
  userAge: '',
  relationshipMonths: '',
  initialQuestions: {
    partnerImportance: null,
    selfImportance: null
  },
  needs: {}
};

// Initialize needs state
needs.forEach(n => {
  state.needs[n.id] = {
    myImportance: null,
    myReceived: null,
    myExclusivity: null,
    partnerImportance: null,
    partnerGiven: null,
    partnerExclusivity: null
  };
});

// DOM Elements
const startScreen = document.getElementById('start-screen');
const questionsScreen = document.getElementById('questions-screen');
const resultsScreen = document.getElementById('results-screen');

const partnerNameInput = document.getElementById('partner-name');
const userSexSelect = document.getElementById('user-sex');
const userAgeInput = document.getElementById('user-age');
const relationshipMonthsInput = document.getElementById('relationship-months');

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const restartBtn = document.getElementById('restart-btn');

const needsContainer = document.getElementById('needs-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Initial questions event listeners
document.querySelectorAll('.initial-questions .rating-buttons-row').forEach(row => {
  const field = row.dataset.field;
  row.querySelectorAll('.rating-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
      state.initialQuestions[field] = parseInt(btn.dataset.value);
      row.querySelectorAll('.rating-btn-small').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      checkStartReady();
    });
  });
});

// Form event listeners
partnerNameInput.addEventListener('input', () => {
  state.partnerName = partnerNameInput.value.trim();
  checkStartReady();
});

userSexSelect.addEventListener('change', () => {
  state.userSex = userSexSelect.value;
});

userAgeInput.addEventListener('input', () => {
  state.userAge = userAgeInput.value;
});

relationshipMonthsInput.addEventListener('input', () => {
  state.relationshipMonths = relationshipMonthsInput.value;
});

startBtn.addEventListener('click', startTest);
submitBtn.addEventListener('click', showResults);
downloadPdfBtn.addEventListener('click', generatePDF);
restartBtn.addEventListener('click', resetTest);

// Functions
function checkStartReady() {
  const ready = state.partnerName &&
    state.initialQuestions.partnerImportance !== null &&
    state.initialQuestions.selfImportance !== null;
  startBtn.disabled = !ready;
}

function showScreen(screen) {
  [startScreen, questionsScreen, resultsScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function startTest() {
  document.getElementById('header-partner-name').textContent = state.partnerName;
  renderNeeds();
  showScreen(questionsScreen);
  window.scrollTo(0, 0);
}

function renderNeeds() {
  needsContainer.innerHTML = '';

  needs.forEach(need => {
    const card = document.createElement('div');
    card.className = 'need-card';
    card.id = `need-card-${need.id}`;

    const descHtml = need.description
      ? `<p class="need-description">${need.description}</p>`
      : '';

    card.innerHTML = `
      <div class="need-card-header">
        <span class="need-number">${need.id}.</span>
        <span class="need-name">${need.name}</span>
      </div>
      ${descHtml}

      <div class="need-section need-section-mine">
        <div class="need-section-title">Para mí</div>
        <div class="dimension-row">
          <div class="dimension-label">Importancia</div>
          <div class="dimension-buttons" data-need="${need.id}" data-dim="myImportance">
            ${renderScaleButtons(11)}
          </div>
          <div class="dimension-scale-labels"><span>Nada</span><span>Máxima</span></div>
        </div>
        <div class="dimension-row">
          <div class="dimension-label">Lo recibo de mi pareja</div>
          <div class="dimension-buttons" data-need="${need.id}" data-dim="myReceived">
            ${renderScaleButtons(11)}
          </div>
          <div class="dimension-scale-labels"><span>Nada</span><span>Totalmente</span></div>
        </div>
        <div class="dimension-row toggle-row">
          <div class="dimension-label">¿Espero exclusividad?</div>
          <div class="toggle-buttons" data-need="${need.id}" data-dim="myExclusivity">
            <button class="toggle-btn" data-value="yes">Sí</button>
            <button class="toggle-btn" data-value="no">No</button>
          </div>
        </div>
      </div>

      <div class="need-section need-section-partner">
        <div class="need-section-title">Mi percepción de mi pareja</div>
        <div class="dimension-row">
          <div class="dimension-label">Importancia para mi pareja</div>
          <div class="dimension-buttons" data-need="${need.id}" data-dim="partnerImportance">
            ${renderScaleButtons(11)}
          </div>
          <div class="dimension-scale-labels"><span>Nada</span><span>Máxima</span></div>
        </div>
        <div class="dimension-row">
          <div class="dimension-label">Lo otorgo a mi pareja</div>
          <div class="dimension-buttons" data-need="${need.id}" data-dim="partnerGiven">
            ${renderScaleButtons(11)}
          </div>
          <div class="dimension-scale-labels"><span>Nada</span><span>Totalmente</span></div>
        </div>
        <div class="dimension-row toggle-row">
          <div class="dimension-label">¿Espera exclusividad?</div>
          <div class="toggle-buttons" data-need="${need.id}" data-dim="partnerExclusivity">
            <button class="toggle-btn" data-value="yes">Sí</button>
            <button class="toggle-btn" data-value="no">No</button>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners for scale buttons
    card.querySelectorAll('.dimension-buttons').forEach(container => {
      const needId = parseInt(container.dataset.need);
      const dim = container.dataset.dim;
      container.querySelectorAll('.dim-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.needs[needId][dim] = parseInt(btn.dataset.value);
          container.querySelectorAll('.dim-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          checkNeedComplete(needId);
          updateProgress();
        });
      });
    });

    // Attach event listeners for toggle buttons
    card.querySelectorAll('.toggle-buttons').forEach(container => {
      const needId = parseInt(container.dataset.need);
      const dim = container.dataset.dim;
      container.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          state.needs[needId][dim] = btn.dataset.value;
          container.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          checkNeedComplete(needId);
          updateProgress();
        });
      });
    });

    needsContainer.appendChild(card);
  });

  updateProgress();
}

function renderScaleButtons(count) {
  return Array.from({ length: count }, (_, i) =>
    `<button class="dim-btn" data-value="${i}">${i}</button>`
  ).join('');
}

function isNeedComplete(needId) {
  const n = state.needs[needId];
  return n.myImportance !== null &&
    n.myReceived !== null &&
    n.myExclusivity !== null &&
    n.partnerImportance !== null &&
    n.partnerGiven !== null &&
    n.partnerExclusivity !== null;
}

function checkNeedComplete(needId) {
  const card = document.getElementById(`need-card-${needId}`);
  if (isNeedComplete(needId)) {
    card.classList.add('completed');
    // Auto-scroll to next incomplete card
    const nextIncomplete = needs.find(n => n.id > needId && !isNeedComplete(n.id));
    if (nextIncomplete) {
      const nextCard = document.getElementById(`need-card-${nextIncomplete.id}`);
      setTimeout(() => {
        const rect = nextCard.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 180;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }, 200);
    }
  } else {
    card.classList.remove('completed');
  }
}

function updateProgress() {
  const completed = needs.filter(n => isNeedComplete(n.id)).length;
  const percentage = (completed / TOTAL_NEEDS) * 100;

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${completed} de ${TOTAL_NEEDS} necesidades completadas`;

  if (completed === TOTAL_NEEDS) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ver resultados';
  } else {
    submitBtn.disabled = true;
    submitBtn.textContent = `Faltan ${TOTAL_NEEDS - completed} necesidades`;
  }
}

function showResults() {
  displayResults();
  showScreen(resultsScreen);
  window.scrollTo(0, 0);
}

function displayResults() {
  document.getElementById('results-partner-name').textContent = state.partnerName;
  document.getElementById('result-partner-importance').textContent = state.initialQuestions.partnerImportance;
  document.getElementById('result-self-importance').textContent = state.initialQuestions.selfImportance;

  drawBarChart('my-needs-chart', 'mine');
  drawBarChart('partner-needs-chart', 'partner');
  displayTopUnmet();
  displayExclusivity();
}

function drawBarChart(svgId, perspective) {
  const svg = document.getElementById(svgId);
  const barHeight = 14;
  const barGap = 4;
  const rowHeight = barHeight * 2 + barGap + 20;
  const labelWidth = 160;
  const chartWidth = 680;
  const barMaxWidth = chartWidth - labelWidth - 60;
  const padding = { top: 10, left: 10 };

  const totalHeight = padding.top + needs.length * rowHeight + 10;

  svg.setAttribute('viewBox', `0 0 ${chartWidth} ${totalHeight}`);
  svg.style.height = `${totalHeight}px`;

  let html = '';

  needs.forEach((need, i) => {
    const data = state.needs[need.id];
    const importance = perspective === 'mine' ? data.myImportance : data.partnerImportance;
    const satisfaction = perspective === 'mine' ? data.myReceived : data.partnerGiven;
    const gap = importance - satisfaction;

    const y = padding.top + i * rowHeight;
    const impWidth = (importance / 10) * barMaxWidth;
    const satWidth = (satisfaction / 10) * barMaxWidth;

    const impColor = perspective === 'mine' ? '#3b82f6' : '#22c55e';
    const satColor = perspective === 'mine' ? '#93c5fd' : '#86efac';
    const gapColor = gap > 0 ? '#ef4444' : '#22c55e';

    // Need name label
    html += `<text x="${padding.left}" y="${y + barHeight + 4}" font-size="11" fill="#374151" font-weight="500">${truncateText(need.name, 22)}</text>`;

    // Importance bar
    html += `<rect x="${labelWidth}" y="${y}" width="${impWidth}" height="${barHeight}" rx="4" fill="${impColor}"/>`;
    html += `<text x="${labelWidth + impWidth + 4}" y="${y + barHeight - 2}" font-size="10" fill="${impColor}" font-weight="600">${importance}</text>`;

    // Satisfaction bar
    html += `<rect x="${labelWidth}" y="${y + barHeight + barGap}" width="${satWidth}" height="${barHeight}" rx="4" fill="${satColor}"/>`;
    html += `<text x="${labelWidth + satWidth + 4}" y="${y + barHeight + barGap + barHeight - 2}" font-size="10" fill="${satColor}" font-weight="600">${satisfaction}</text>`;

    // Gap indicator
    if (gap !== 0) {
      const gapText = gap > 0 ? `−${gap}` : `+${Math.abs(gap)}`;
      html += `<text x="${chartWidth - 10}" y="${y + barHeight + 4}" font-size="10" fill="${gapColor}" font-weight="700" text-anchor="end">${gapText}</text>`;
    } else {
      html += `<text x="${chartWidth - 10}" y="${y + barHeight + 4}" font-size="10" fill="#9ca3af" text-anchor="end">=</text>`;
    }
  });

  // Legend
  const legendY = totalHeight - 5;
  const impLegendColor = perspective === 'mine' ? '#3b82f6' : '#22c55e';
  const satLegendColor = perspective === 'mine' ? '#93c5fd' : '#86efac';
  const impLabel = 'Importancia';
  const satLabel = perspective === 'mine' ? 'Lo recibo' : 'Lo otorgo';

  html += `<rect x="${labelWidth}" y="${legendY - 8}" width="10" height="10" rx="2" fill="${impLegendColor}"/>`;
  html += `<text x="${labelWidth + 14}" y="${legendY}" font-size="9" fill="#6b7280">${impLabel}</text>`;
  html += `<rect x="${labelWidth + 80}" y="${legendY - 8}" width="10" height="10" rx="2" fill="${satLegendColor}"/>`;
  html += `<text x="${labelWidth + 94}" y="${legendY}" font-size="9" fill="#6b7280">${satLabel}</text>`;

  svg.innerHTML = html;
}

function truncateText(text, maxLen) {
  return text.length > maxLen ? text.substring(0, maxLen - 1) + '…' : text;
}

function displayTopUnmet() {
  const gaps = needs.map(n => {
    const data = state.needs[n.id];
    return {
      name: n.name,
      gap: data.myImportance - data.myReceived
    };
  }).filter(g => g.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5);

  const section = document.getElementById('top-unmet-section');
  const list = document.getElementById('top-unmet-list');

  if (gaps.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';
  list.innerHTML = gaps.map(g => `
    <div class="unmet-item">
      <span class="unmet-name">${g.name}</span>
      <span class="unmet-gap">−${g.gap}</span>
    </div>
  `).join('');
}

function displayExclusivity() {
  const myExclusivity = needs.filter(n => state.needs[n.id].myExclusivity === 'yes').map(n => n.name);
  const partnerExclusivity = needs.filter(n => state.needs[n.id].partnerExclusivity === 'yes').map(n => n.name);

  const section = document.getElementById('exclusivity-section');
  const summary = document.getElementById('exclusivity-summary');

  if (myExclusivity.length === 0 && partnerExclusivity.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';

  const myHtml = myExclusivity.length > 0
    ? `<ul class="exclusivity-list">${myExclusivity.map(n => `<li>• ${n}</li>`).join('')}</ul>`
    : '<p class="exclusivity-none">Ninguna</p>';

  const partnerHtml = partnerExclusivity.length > 0
    ? `<ul class="exclusivity-list">${partnerExclusivity.map(n => `<li>• ${n}</li>`).join('')}</ul>`
    : '<p class="exclusivity-none">Ninguna</p>';

  summary.innerHTML = `
    <div class="exclusivity-grid">
      <div class="exclusivity-column mine">
        <h4>Yo espero exclusividad en:</h4>
        ${myHtml}
      </div>
      <div class="exclusivity-column partner">
        <h4>Mi pareja espera exclusividad en:</h4>
        ${partnerHtml}
      </div>
    </div>
  `;
}

async function generatePDF() {
  downloadPdfBtn.classList.add('loading');
  downloadPdfBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
    </svg>
    Generando PDF...
  `;

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPos = margin;

    const footerText = 'Cuestionario de Necesidades en la Pareja (Madrid, 2013)';

    function addFooter() {
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(footerText, pageWidth / 2, pageHeight - 8, { align: 'center' });
    }

    function checkNewPage(neededSpace) {
      if (yPos + neededSpace > pageHeight - 20) {
        addFooter();
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    }

    // PAGE 1: Summary
    doc.setFontSize(18);
    doc.setTextColor(236, 72, 153);
    doc.text('Cuestionario de Necesidades en la Pareja', pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;

    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('(Santiago Madrid, 2013)', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // User data
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Evaluación de la relación con: ${state.partnerName}`, margin, yPos);
    yPos += 5;

    if (state.userSex || state.userAge || state.relationshipMonths) {
      let dataLine = [];
      if (state.userSex) dataLine.push(`Sexo: ${state.userSex}`);
      if (state.userAge) dataLine.push(`Edad: ${state.userAge} años`);
      if (state.relationshipMonths) dataLine.push(`Relación: ${state.relationshipMonths} meses`);
      doc.text(dataLine.join('  |  '), margin, yPos);
      yPos += 5;
    }

    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, yPos);
    yPos += 10;

    // Initial questions
    doc.setFontSize(11);
    doc.setTextColor(168, 85, 247);
    doc.text(`Importancia de mi pareja para mí: ${state.initialQuestions.partnerImportance}/10`, margin, yPos);
    yPos += 6;
    doc.text(`Importancia que creo tener para mi pareja: ${state.initialQuestions.selfImportance}/10`, margin, yPos);
    yPos += 12;

    // Table header - MY NEEDS
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text('Mis necesidades', margin, yPos);
    yPos += 7;

    // Table
    drawPdfTable(doc, margin, yPos, pageWidth, 'mine');
    yPos += needs.length * 5 + 12;

    checkNewPage(needs.length * 5 + 20);

    // Table header - PARTNER NEEDS
    doc.setFontSize(12);
    doc.setTextColor(22, 163, 74);
    doc.text('Percepción de mi pareja', margin, yPos);
    yPos += 7;

    drawPdfTable(doc, margin, yPos, pageWidth, 'partner');
    yPos += needs.length * 5 + 12;

    checkNewPage(40);

    // Top unmet needs
    const gaps = needs.map(n => ({
      name: n.name,
      gap: state.needs[n.id].myImportance - state.needs[n.id].myReceived
    })).filter(g => g.gap > 0).sort((a, b) => b.gap - a.gap).slice(0, 5);

    if (gaps.length > 0) {
      doc.setFontSize(11);
      doc.setTextColor(185, 28, 28);
      doc.text('Necesidades más insatisfechas:', margin, yPos);
      yPos += 6;

      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      gaps.forEach(g => {
        doc.text(`• ${g.name}: brecha de −${g.gap}`, margin + 3, yPos);
        yPos += 5;
      });
      yPos += 5;
    }

    // Exclusivity summary
    const myExcl = needs.filter(n => state.needs[n.id].myExclusivity === 'yes').map(n => n.name);
    const partnerExcl = needs.filter(n => state.needs[n.id].partnerExclusivity === 'yes').map(n => n.name);

    if (myExcl.length > 0 || partnerExcl.length > 0) {
      checkNewPage(20);
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text('Exclusividad:', margin, yPos);
      yPos += 6;

      doc.setFontSize(9);
      if (myExcl.length > 0) {
        doc.setTextColor(37, 99, 235);
        doc.text(`Yo espero: ${myExcl.join(', ')}`, margin + 3, yPos);
        yPos += 5;
      }
      if (partnerExcl.length > 0) {
        doc.setTextColor(22, 163, 74);
        doc.text(`Mi pareja espera: ${partnerExcl.join(', ')}`, margin + 3, yPos);
        yPos += 5;
      }
    }

    addFooter();

    // Save PDF - platform-aware
    const fileName = `Necesidades_Pareja_${state.partnerName.replace(/\s+/g, '_')}.pdf`;

    if (window.CapacitorHelpers && window.CapacitorHelpers.isNative()) {
      // Android/iOS: save to device and offer share
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const result = await window.CapacitorHelpers.savePDF(pdfBase64, fileName);
      if (result.success) {
        alert('PDF guardado correctamente en Documentos');
      } else {
        alert('Error al guardar el PDF: ' + (result.error || 'Error desconocido'));
      }
    } else if (window.electronAPI) {
      // Electron desktop
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const result = await window.electronAPI.savePDF(pdfBase64, fileName);
      if (result.success) {
        alert(`PDF guardado correctamente en:\n${result.path}`);
      } else if (!result.canceled) {
        alert(`Error al guardar el PDF: ${result.error}`);
      }
    } else {
      // Browser fallback
      doc.save(fileName);
    }

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
  }

  downloadPdfBtn.classList.remove('loading');
  downloadPdfBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    Descargar PDF
  `;
}

function drawPdfTable(doc, x, y, pageWidth, perspective) {
  const colWidths = [55, 25, 25, 20, 25, 25, 20];
  const headers = perspective === 'mine'
    ? ['Necesidad', 'Import.', 'Recibo', 'Excl.', 'Brecha', '', '']
    : ['Necesidad', 'Import.', 'Otorgo', 'Excl.', 'Brecha', '', ''];

  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  const startX = x;
  const rowH = 5;

  // Header
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.setFont(undefined, 'bold');
  let colX = startX;
  headers.forEach((h, i) => {
    if (i < 5) {
      doc.text(h, colX + 1, y);
    }
    colX += colWidths[i];
  });
  doc.setFont(undefined, 'normal');

  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(startX, y, startX + tableWidth - colWidths[5] - colWidths[6], y);
  y += 3;

  // Rows
  doc.setFontSize(7);
  needs.forEach(n => {
    const data = state.needs[n.id];
    const imp = perspective === 'mine' ? data.myImportance : data.partnerImportance;
    const sat = perspective === 'mine' ? data.myReceived : data.partnerGiven;
    const excl = perspective === 'mine' ? data.myExclusivity : data.partnerExclusivity;
    const gap = imp - sat;

    colX = startX;
    doc.setTextColor(60, 60, 60);
    doc.text(truncateText(n.name, 28), colX + 1, y);
    colX += colWidths[0];

    doc.text(imp.toString(), colX + 10, y, { align: 'center' });
    colX += colWidths[1];

    doc.text(sat.toString(), colX + 10, y, { align: 'center' });
    colX += colWidths[2];

    doc.text(excl === 'yes' ? 'Sí' : 'No', colX + 8, y, { align: 'center' });
    colX += colWidths[3];

    if (gap > 0) {
      doc.setTextColor(220, 38, 38);
      doc.text(`−${gap}`, colX + 10, y, { align: 'center' });
    } else if (gap < 0) {
      doc.setTextColor(34, 197, 94);
      doc.text(`+${Math.abs(gap)}`, colX + 10, y, { align: 'center' });
    } else {
      doc.setTextColor(150, 150, 150);
      doc.text('=', colX + 10, y, { align: 'center' });
    }

    y += rowH;
  });
}

function resetTest() {
  window.location.href = '../../index.html';
}
