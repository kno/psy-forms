// Questions data
const questions = [
  { id: 1, text: "Prefiero estar con ___ antes que con cualquier otra persona." },
  { id: 2, text: "Tengo una relación cálida con ___." },
  { id: 3, text: "Me comunico bien con ___." },
  { id: 4, text: "Apoyo activamente el bienestar de ___." },
  { id: 5, text: "No puedo imaginarme que otra persona pueda hacerme tan feliz como ___." },
  { id: 6, text: "Planeo continuar mi relación con ___." },
  { id: 7, text: "Siempre sentiré una gran responsabilidad hacia ___." },
  { id: 8, text: "No hay nada más importante para mí que mi relación con ___." },
  { id: 9, text: "Siento que ___ realmente me comprende." },
  { id: 10, text: "Estoy dispuesto a entregarme y a compartir mis posesiones con ___." },
  { id: 11, text: "Mi relación con ___ es muy romántica." },
  { id: 12, text: "Aún en los momentos en que resulta difícil tratar con ___, permanezco comprometido(a) con nuestra relación." },
  { id: 13, text: "Existe algo casi «mágico» en mi relación con ___." },
  { id: 14, text: "Permanecería con ___ incluso en tiempos difíciles." },
  { id: 15, text: "Idealizo a ___." },
  { id: 16, text: "Estoy seguro de mi amor por ___." },
  { id: 17, text: "Siento que realmente comprendo a ___." },
  { id: 18, text: "Recibo considerable apoyo emocional de ___." },
  { id: 19, text: "No puedo imaginarme la vida sin ___." },
  { id: 20, text: "Sé que tengo que cuidar de ___." },
  { id: 21, text: "Adoro a ___." },
  { id: 22, text: "Puedo contar con ___ en momentos de necesidad." },
  { id: 23, text: "Espero que mi amor por ___ se mantenga durante el resto de mi vida." },
  { id: 24, text: "No puedo imaginar la ruptura de mi relación con ___." },
  { id: 25, text: "Tengo una relación cómoda con ___." },
  { id: 26, text: "Disfruto especialmente del contacto físico con ___." },
  { id: 27, text: "Considero mi relación con ___ permanente." },
  { id: 28, text: "Cuando veo películas románticas o leo libros románticos pienso en ___." },
  { id: 29, text: "Considero mi relación con ___ una buena decisión." },
  { id: 30, text: "___ puede contar conmigo en momentos de necesidad." },
  { id: 31, text: "Me siento emocionalmente próximo(a) a ___." },
  { id: 32, text: "Me encuentro pensando en ___ frecuentemente todo el día." },
  { id: 33, text: "No podría permitir que algo se interpusiera en mi compromiso con ___." },
  { id: 34, text: "Doy considerable apoyo emocional a ___." },
  { id: 35, text: "El solo hecho de ver a ___ me excita." },
  { id: 36, text: "Considero sólido mi compromiso con ___." },
  { id: 37, text: "Fantaseo con ___." },
  { id: 38, text: "Experimento una real felicidad con ___." },
  { id: 39, text: "Siento responsabilidad hacia ___." },
  { id: 40, text: "Mi relación con ___ es muy apasionada." },
  { id: 41, text: "Comparto información profundamente personal acerca de mí mismo(a) con ___." },
  { id: 42, text: "Encuentro a ___ muy atractivo(a) personalmente." },
  { id: 43, text: "Tengo confianza en la estabilidad de mi relación con ___." },
  { id: 44, text: "Debido a mi compromiso con ___, no dejaría que otras personas se inmiscuyeran entre nosotros." },
  { id: 45, text: "Valoro a ___ en gran medida dentro de mi vida." }
];

// Scoring keys
const intimacyItems = [2, 3, 4, 9, 10, 17, 18, 22, 25, 30, 31, 34, 38, 41, 45];
const passionItems = [1, 5, 8, 11, 13, 15, 19, 21, 26, 28, 32, 35, 37, 40, 42];
const commitmentItems = [6, 7, 12, 14, 16, 20, 23, 24, 27, 29, 33, 36, 39, 43, 44];

// Application state
let state = {
  partnerName: '',
  userSex: '',
  userAge: '',
  relationshipMonths: '',
  answers: {},
  results: null
};

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

const questionsContainer = document.getElementById('questions-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Event Listeners
partnerNameInput.addEventListener('input', () => {
  state.partnerName = partnerNameInput.value.trim();
  startBtn.disabled = !state.partnerName;
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
submitBtn.addEventListener('click', calculateResults);
downloadPdfBtn.addEventListener('click', generatePDF);
restartBtn.addEventListener('click', resetTest);

// Functions
function showScreen(screen) {
  [startScreen, questionsScreen, resultsScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function startTest() {
  document.getElementById('header-partner-name').textContent = state.partnerName;
  renderQuestions();
  showScreen(questionsScreen);
}

function renderQuestions() {
  questionsContainer.innerHTML = '';

  questions.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `
      <p class="question-text">
        <span class="question-number">${q.id}.</span> ${formatQuestionText(q.text)}
      </p>
      <div class="rating-buttons" data-question="${q.id}">
        ${[1,2,3,4,5,6,7,8,9].map(n => `
          <button class="rating-btn" data-value="${n}">${n}</button>
        `).join('')}
      </div>
      <div class="rating-labels">
        <span>En absoluto</span>
        <span>Extremadamente</span>
      </div>
    `;

    card.querySelectorAll('.rating-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(q.id, parseInt(btn.dataset.value), card));
    });

    questionsContainer.appendChild(card);
  });

  updateProgress();
}

function formatQuestionText(text) {
  return text.replace(/___/g, `<span class="partner-name-highlight">${state.partnerName}</span>`);
}

function handleAnswer(questionId, value, card) {
  state.answers[questionId] = value;

  // Update button styles
  card.querySelectorAll('.rating-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.value) === value);
  });

  updateProgress();

  // Scroll to next question card
  const nextCard = card.nextElementSibling;
  if (nextCard) {
    setTimeout(() => {
      const rect = nextCard.getBoundingClientRect();
      const offset = window.scrollY + rect.top - 180;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }, 150);
  }
}

function updateProgress() {
  const answered = Object.keys(state.answers).length;
  const percentage = (answered / 45) * 100;

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${answered} de 45 preguntas respondidas`;

  if (answered === 45) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ver resultados';
  } else {
    submitBtn.disabled = true;
    submitBtn.textContent = `Faltan ${45 - answered} preguntas`;
  }
}

function calculateResults() {
  const intimacy = intimacyItems.reduce((sum, id) => sum + (state.answers[id] || 0), 0);
  const passion = passionItems.reduce((sum, id) => sum + (state.answers[id] || 0), 0);
  const commitment = commitmentItems.reduce((sum, id) => sum + (state.answers[id] || 0), 0);

  state.results = { intimacy, passion, commitment };

  displayResults();
  showScreen(resultsScreen);
}

function getLoveType(intimacy, passion, commitment) {
  const threshold = 67;
  const high = (score) => score >= threshold;

  if (!high(intimacy) && !high(passion) && !high(commitment)) {
    return { type: "Sin amor", description: "Ausencia de los tres componentes." };
  } else if (high(intimacy) && !high(passion) && !high(commitment)) {
    return { type: "Cariño", description: "Solo intimidad. Amistad verdadera sin pasión ni compromiso a largo plazo." };
  } else if (!high(intimacy) && high(passion) && !high(commitment)) {
    return { type: "Encaprichamiento", description: "Solo pasión. Amor a primera vista sin intimidad ni compromiso." };
  } else if (!high(intimacy) && !high(passion) && high(commitment)) {
    return { type: "Amor vacío", description: "Solo compromiso. Decisión de amar sin intimidad ni pasión." };
  } else if (high(intimacy) && high(passion) && !high(commitment)) {
    return { type: "Amor romántico", description: "Intimidad + Pasión. Atracción física y emocional sin compromiso a largo plazo." };
  } else if (high(intimacy) && !high(passion) && high(commitment)) {
    return { type: "Amor compañero", description: "Intimidad + Compromiso. Amistad comprometida a largo plazo sin pasión." };
  } else if (!high(intimacy) && high(passion) && high(commitment)) {
    return { type: "Amor fatuo", description: "Pasión + Compromiso. Compromiso basado en pasión sin intimidad desarrollada." };
  } else {
    return { type: "Amor consumado", description: "Los tres componentes presentes. El amor completo e ideal." };
  }
}

function displayResults() {
  document.getElementById('results-partner-name').textContent = state.partnerName;
  document.getElementById('intimacy-score').textContent = state.results.intimacy;
  document.getElementById('passion-score').textContent = state.results.passion;
  document.getElementById('commitment-score').textContent = state.results.commitment;

  const loveType = getLoveType(state.results.intimacy, state.results.passion, state.results.commitment);
  document.getElementById('love-type').textContent = loveType.type;
  document.getElementById('love-type-description').textContent = loveType.description;

  drawTriangleGraph();
}

function drawTriangleGraph() {
  const svg = document.getElementById('triangle-graph');
  const maxScore = 135;
  const centerX = 200;
  const centerY = 180;
  const maxRadius = 150;

  const intimacyRatio = state.results.intimacy / maxScore;
  const passionRatio = state.results.passion / maxScore;
  const commitmentRatio = state.results.commitment / maxScore;

  // Calculate points
  const intimacyPoint = { x: centerX, y: centerY - maxRadius * intimacyRatio };
  const passionPoint = {
    x: centerX - maxRadius * Math.cos(Math.PI / 6) * passionRatio,
    y: centerY + maxRadius * Math.sin(Math.PI / 6) * passionRatio + maxRadius * 0.5 * passionRatio
  };
  const commitmentPoint = {
    x: centerX + maxRadius * Math.cos(Math.PI / 6) * commitmentRatio,
    y: centerY + maxRadius * Math.sin(Math.PI / 6) * commitmentRatio + maxRadius * 0.5 * commitmentRatio
  };

  // Max triangle vertices
  const maxIntimacy = { x: centerX, y: centerY - maxRadius };
  const maxPassion = { x: centerX - maxRadius * Math.cos(Math.PI / 6), y: centerY + maxRadius * 0.5 + maxRadius * Math.sin(Math.PI / 6) };
  const maxCommitment = { x: centerX + maxRadius * Math.cos(Math.PI / 6), y: centerY + maxRadius * 0.5 + maxRadius * Math.sin(Math.PI / 6) };

  svg.innerHTML = `
    <!-- Background -->
    <rect width="400" height="380" fill="white"/>

    <!-- Max triangle (dashed) -->
    <polygon
      points="${maxIntimacy.x},${maxIntimacy.y} ${maxPassion.x},${maxPassion.y} ${maxCommitment.x},${maxCommitment.y}"
      fill="none"
      stroke="#e5e7eb"
      stroke-width="2"
      stroke-dasharray="5,5"
    />

    <!-- Axes -->
    <line x1="${centerX}" y1="${centerY}" x2="${maxIntimacy.x}" y2="${maxIntimacy.y}" stroke="#d1d5db" stroke-width="1"/>
    <line x1="${centerX}" y1="${centerY}" x2="${maxPassion.x}" y2="${maxPassion.y}" stroke="#d1d5db" stroke-width="1"/>
    <line x1="${centerX}" y1="${centerY}" x2="${maxCommitment.x}" y2="${maxCommitment.y}" stroke="#d1d5db" stroke-width="1"/>

    <!-- Scale marks -->
    ${[0.2, 0.4, 0.6, 0.8, 1].map(ratio => `
      <circle cx="${centerX}" cy="${centerY - maxRadius * ratio}" r="2" fill="#9ca3af"/>
      <circle cx="${centerX - maxRadius * Math.cos(Math.PI / 6) * ratio}" cy="${centerY + (maxRadius * 0.5 + maxRadius * Math.sin(Math.PI / 6)) * ratio}" r="2" fill="#9ca3af"/>
      <circle cx="${centerX + maxRadius * Math.cos(Math.PI / 6) * ratio}" cy="${centerY + (maxRadius * 0.5 + maxRadius * Math.sin(Math.PI / 6)) * ratio}" r="2" fill="#9ca3af"/>
    `).join('')}

    <!-- Result triangle -->
    <polygon
      points="${intimacyPoint.x},${intimacyPoint.y} ${passionPoint.x},${passionPoint.y} ${commitmentPoint.x},${commitmentPoint.y}"
      fill="rgba(236, 72, 153, 0.3)"
      stroke="#ec4899"
      stroke-width="3"
    />

    <!-- Points -->
    <circle cx="${intimacyPoint.x}" cy="${intimacyPoint.y}" r="8" fill="#3b82f6"/>
    <circle cx="${passionPoint.x}" cy="${passionPoint.y}" r="8" fill="#ef4444"/>
    <circle cx="${commitmentPoint.x}" cy="${commitmentPoint.y}" r="8" fill="#22c55e"/>

    <!-- Labels -->
    <text x="${centerX}" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#2563eb">Intimidad</text>
    <text x="${centerX}" y="38" text-anchor="middle" font-size="12" fill="#3b82f6">${state.results.intimacy} pts</text>

    <text x="30" y="350" text-anchor="start" font-size="14" font-weight="bold" fill="#dc2626">Pasión</text>
    <text x="30" y="368" text-anchor="start" font-size="12" fill="#ef4444">${state.results.passion} pts</text>

    <text x="370" y="350" text-anchor="end" font-size="14" font-weight="bold" fill="#16a34a">Compromiso</text>
    <text x="370" y="368" text-anchor="end" font-size="12" fill="#22c55e">${state.results.commitment} pts</text>
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
    const margin = 20;
    let yPos = margin;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(236, 72, 153);
    doc.text('Escala del Modelo Triangular del Amor', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    doc.setFontSize(12);
    doc.setTextColor(128, 128, 128);
    doc.text('(Sternberg, 1997) \u2013 Adaptaci\u00f3n', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // User data
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Evaluaci\u00f3n de la relaci\u00f3n con: ${state.partnerName}`, margin, yPos);
    yPos += 6;

    if (state.userSex || state.userAge || state.relationshipMonths) {
      let dataLine = [];
      if (state.userSex) dataLine.push(`Sexo: ${state.userSex}`);
      if (state.userAge) dataLine.push(`Edad: ${state.userAge} a\u00f1os`);
      if (state.relationshipMonths) dataLine.push(`Tiempo de relaci\u00f3n: ${state.relationshipMonths} meses`);
      doc.text(dataLine.join('  |  '), margin, yPos);
      yPos += 6;
    }

    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, yPos);
    yPos += 15;

    // Draw triangular graph
    const graphCenterX = pageWidth / 2;
    const graphCenterY = yPos + 50;
    const graphRadius = 40;
    const maxScore = 135;

    const intimacyRatio = state.results.intimacy / maxScore;
    const passionRatio = state.results.passion / maxScore;
    const commitmentRatio = state.results.commitment / maxScore;

    // Max triangle vertices
    const maxIntimacy = { x: graphCenterX, y: graphCenterY - graphRadius };
    const maxPassion = { x: graphCenterX - graphRadius * Math.cos(Math.PI / 6), y: graphCenterY + graphRadius * 0.5 + graphRadius * Math.sin(Math.PI / 6) };
    const maxCommitment = { x: graphCenterX + graphRadius * Math.cos(Math.PI / 6), y: graphCenterY + graphRadius * 0.5 + graphRadius * Math.sin(Math.PI / 6) };

    // Result triangle vertices
    const intimacyPoint = { x: graphCenterX, y: graphCenterY - graphRadius * intimacyRatio };
    const passionPoint = {
      x: graphCenterX - graphRadius * Math.cos(Math.PI / 6) * passionRatio,
      y: graphCenterY + graphRadius * Math.sin(Math.PI / 6) * passionRatio + graphRadius * 0.5 * passionRatio
    };
    const commitmentPoint = {
      x: graphCenterX + graphRadius * Math.cos(Math.PI / 6) * commitmentRatio,
      y: graphCenterY + graphRadius * Math.sin(Math.PI / 6) * commitmentRatio + graphRadius * 0.5 * commitmentRatio
    };

    // Draw max triangle (dashed)
    doc.setDrawColor(200, 200, 200);
    doc.setLineDashPattern([2, 2], 0);
    doc.triangle(maxIntimacy.x, maxIntimacy.y, maxPassion.x, maxPassion.y, maxCommitment.x, maxCommitment.y, 'S');

    // Draw axes
    doc.setLineDashPattern([], 0);
    doc.setDrawColor(180, 180, 180);
    doc.line(graphCenterX, graphCenterY, maxIntimacy.x, maxIntimacy.y);
    doc.line(graphCenterX, graphCenterY, maxPassion.x, maxPassion.y);
    doc.line(graphCenterX, graphCenterY, maxCommitment.x, maxCommitment.y);

    // Draw result triangle (filled)
    doc.setDrawColor(236, 72, 153);
    doc.setFillColor(252, 231, 243);
    doc.triangle(intimacyPoint.x, intimacyPoint.y, passionPoint.x, passionPoint.y, commitmentPoint.x, commitmentPoint.y, 'FD');

    // Draw points
    doc.setFillColor(59, 130, 246);
    doc.circle(intimacyPoint.x, intimacyPoint.y, 2, 'F');
    doc.setFillColor(239, 68, 68);
    doc.circle(passionPoint.x, passionPoint.y, 2, 'F');
    doc.setFillColor(34, 197, 94);
    doc.circle(commitmentPoint.x, commitmentPoint.y, 2, 'F');

    // Labels
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.text('Intimidad', graphCenterX, graphCenterY - graphRadius - 8, { align: 'center' });
    doc.text(`${state.results.intimacy} pts`, graphCenterX, graphCenterY - graphRadius - 3, { align: 'center' });

    doc.setTextColor(239, 68, 68);
    doc.text('Pasi\u00f3n', maxPassion.x - 5, maxPassion.y + 8, { align: 'center' });
    doc.text(`${state.results.passion} pts`, maxPassion.x - 5, maxPassion.y + 13, { align: 'center' });

    doc.setTextColor(34, 197, 94);
    doc.text('Compromiso', maxCommitment.x + 5, maxCommitment.y + 8, { align: 'center' });
    doc.text(`${state.results.commitment} pts`, maxCommitment.x + 5, maxCommitment.y + 13, { align: 'center' });

    yPos = graphCenterY + graphRadius + 30;

    // Results section
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text('Resultados Obtenidos', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // Score boxes
    const boxWidth = 50;
    const boxHeight = 25;
    const boxSpacing = 10;
    const totalWidth = boxWidth * 3 + boxSpacing * 2;
    const startX = (pageWidth - totalWidth) / 2;

    // Intimacy box
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(startX, yPos, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text(state.results.intimacy.toString(), startX + boxWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Intimidad', startX + boxWidth / 2, yPos + 18, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(128, 128, 128);
    doc.text('de 135 m\u00e1x.', startX + boxWidth / 2, yPos + 23, { align: 'center' });

    // Passion box
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(startX + boxWidth + boxSpacing, yPos, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFontSize(16);
    doc.setTextColor(239, 68, 68);
    doc.text(state.results.passion.toString(), startX + boxWidth + boxSpacing + boxWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Pasi\u00f3n', startX + boxWidth + boxSpacing + boxWidth / 2, yPos + 18, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(128, 128, 128);
    doc.text('de 135 m\u00e1x.', startX + boxWidth + boxSpacing + boxWidth / 2, yPos + 23, { align: 'center' });

    // Commitment box
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(startX + (boxWidth + boxSpacing) * 2, yPos, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFontSize(16);
    doc.setTextColor(34, 197, 94);
    doc.text(state.results.commitment.toString(), startX + (boxWidth + boxSpacing) * 2 + boxWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Compromiso', startX + (boxWidth + boxSpacing) * 2 + boxWidth / 2, yPos + 18, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(128, 128, 128);
    doc.text('de 135 m\u00e1x.', startX + (boxWidth + boxSpacing) * 2 + boxWidth / 2, yPos + 23, { align: 'center' });

    yPos += boxHeight + 15;

    // Love type
    const loveType = getLoveType(state.results.intimacy, state.results.passion, state.results.commitment);

    doc.setFillColor(253, 242, 248);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 20, 3, 3, 'F');

    doc.setFontSize(12);
    doc.setTextColor(134, 25, 143);
    doc.text(`Tipo de amor: ${loveType.type}`, pageWidth / 2, yPos + 8, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(loveType.description, pageWidth / 2, yPos + 15, { align: 'center' });

    yPos += 30;

    // Interpretation guide
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text('Interpretaci\u00f3n de las puntuaciones:', margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.text('\u2022 15-45: Nivel bajo', margin + 5, yPos);
    yPos += 5;
    doc.text('\u2022 46-90: Nivel moderado', margin + 5, yPos);
    yPos += 5;
    doc.text('\u2022 91-135: Nivel alto', margin + 5, yPos);

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Escala del Modelo Triangular del Amor (Sternberg, 1997) \u2013 Adaptaci\u00f3n', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save PDF - platform-aware
    const fileName = `Resultados_Amor_Triangular_${state.partnerName.replace(/\s+/g, '_')}.pdf`;

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
    alert('Error al generar el PDF. Por favor, int\u00e9ntalo de nuevo.');
  }

  downloadPdfBtn.classList.remove('loading');
  downloadPdfBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    Descargar PDF
  `;
}

function resetTest() {
  state = {
    partnerName: '',
    userSex: '',
    userAge: '',
    relationshipMonths: '',
    answers: {},
    results: null
  };

  partnerNameInput.value = '';
  userSexSelect.value = '';
  userAgeInput.value = '';
  relationshipMonthsInput.value = '';
  startBtn.disabled = true;

  showScreen(startScreen);
}
