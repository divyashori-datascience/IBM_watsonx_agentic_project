'use strict';

const express = require('express');
const path    = require('path');
const { PERSONAS, getQuestionsForTopic, getPersonaResponse, generateAnalystInsight, generateInsightReport } = require('./data/mockData');

const app  = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API: Generate questions ────────────────────────────────────────────────
app.post('/api/questions', (req, res) => {
  const { topic, num_questions = 2 } = req.body;
  const all = getQuestionsForTopic(topic);
  const n   = Math.min(Math.max(1, parseInt(num_questions) || 2), 3);
  res.json({ questions: all.slice(0, n) });
});

// ── API: Persona response ─────────────────────────────────────────────────
app.post('/api/persona-response', (req, res) => {
  const { persona, category, questionIndex } = req.body;
  const answer = getPersonaResponse(persona, category, questionIndex || 0);
  const meta   = PERSONAS[persona];
  res.json({ persona, name: meta?.name, answer });
});

// ── API: Analyst insight ──────────────────────────────────────────────────
app.post('/api/analyst', (req, res) => {
  const { question, questionIndex, selectedPersonas } = req.body;
  const insight = generateAnalystInsight(question, questionIndex, selectedPersonas);
  res.json(insight);
});

// ── API: Insight report ───────────────────────────────────────────────────
app.post('/api/insight-report', (req, res) => {
  const { selectedPersonas } = req.body;
  const report = generateInsightReport(selectedPersonas);
  res.json(report);
});

// ── API: Personas metadata ────────────────────────────────────────────────
app.get('/api/personas', (req, res) => res.json(PERSONAS));

// ── API: Studio (frontend calls this; falls back to local sim if unavailable) ──
app.post('/api/studio', (req, res) => {
  // Return 404 so the frontend gracefully falls back to its local simulation engine
  res.status(404).json({ error: 'Use local simulation' });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
