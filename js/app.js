import * as THREE from "three";

const STORAGE_KEY = "lotusboard-v1";
const WID = 68;
const LEN = 105;
const PAD = 4;
const PLANE_W = WID + PAD * 2;
const PLANE_H = LEN + PAD * 2;

const ROLE_LABEL = {
  KL: "Kaleci",
  SB: "Sol bek",
  STP: "Stoper",
  SĞB: "Sağ bek",
  DOS: "Ön libero",
  MO: "Merkez",
  OF: "On numara",
  SLK: "Sol kanat",
  SĞK: "Sağ kanat",
  SAN: "Santrafor",
};

const FORMATIONS = {
  "4-3-3": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.14, y: 0.24 },
    { role: "STP", x: 0.37, y: 0.2 },
    { role: "STP", x: 0.63, y: 0.2 },
    { role: "SĞB", x: 0.86, y: 0.24 },
    { role: "MO", x: 0.28, y: 0.46 },
    { role: "DOS", x: 0.5, y: 0.38 },
    { role: "MO", x: 0.72, y: 0.46 },
    { role: "SLK", x: 0.16, y: 0.72 },
    { role: "SAN", x: 0.5, y: 0.82 },
    { role: "SĞK", x: 0.84, y: 0.72 },
  ],
  "4-2-3-1": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.14, y: 0.24 },
    { role: "STP", x: 0.37, y: 0.2 },
    { role: "STP", x: 0.63, y: 0.2 },
    { role: "SĞB", x: 0.86, y: 0.24 },
    { role: "DOS", x: 0.38, y: 0.4 },
    { role: "DOS", x: 0.62, y: 0.4 },
    { role: "SLK", x: 0.16, y: 0.6 },
    { role: "OF", x: 0.5, y: 0.62 },
    { role: "SĞK", x: 0.84, y: 0.6 },
    { role: "SAN", x: 0.5, y: 0.82 },
  ],
  "4-4-2": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.14, y: 0.24 },
    { role: "STP", x: 0.37, y: 0.2 },
    { role: "STP", x: 0.63, y: 0.2 },
    { role: "SĞB", x: 0.86, y: 0.24 },
    { role: "SLK", x: 0.14, y: 0.5 },
    { role: "MO", x: 0.38, y: 0.46 },
    { role: "MO", x: 0.62, y: 0.46 },
    { role: "SĞK", x: 0.86, y: 0.5 },
    { role: "SAN", x: 0.38, y: 0.76 },
    { role: "SAN", x: 0.62, y: 0.76 },
  ],
  "4-1-4-1": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.14, y: 0.24 },
    { role: "STP", x: 0.37, y: 0.2 },
    { role: "STP", x: 0.63, y: 0.2 },
    { role: "SĞB", x: 0.86, y: 0.24 },
    { role: "DOS", x: 0.5, y: 0.38 },
    { role: "SLK", x: 0.14, y: 0.56 },
    { role: "MO", x: 0.38, y: 0.54 },
    { role: "MO", x: 0.62, y: 0.54 },
    { role: "SĞK", x: 0.86, y: 0.56 },
    { role: "SAN", x: 0.5, y: 0.8 },
  ],
  "3-5-2": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "STP", x: 0.28, y: 0.22 },
    { role: "STP", x: 0.5, y: 0.18 },
    { role: "STP", x: 0.72, y: 0.22 },
    { role: "SB", x: 0.12, y: 0.46 },
    { role: "MO", x: 0.32, y: 0.42 },
    { role: "DOS", x: 0.5, y: 0.36 },
    { role: "MO", x: 0.68, y: 0.42 },
    { role: "SĞB", x: 0.88, y: 0.46 },
    { role: "SAN", x: 0.38, y: 0.76 },
    { role: "SAN", x: 0.62, y: 0.76 },
  ],
  "3-4-3": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "STP", x: 0.3, y: 0.22 },
    { role: "STP", x: 0.5, y: 0.17 },
    { role: "STP", x: 0.7, y: 0.22 },
    { role: "SB", x: 0.14, y: 0.48 },
    { role: "MO", x: 0.38, y: 0.44 },
    { role: "MO", x: 0.62, y: 0.44 },
    { role: "SĞB", x: 0.86, y: 0.48 },
    { role: "SLK", x: 0.18, y: 0.74 },
    { role: "SAN", x: 0.5, y: 0.82 },
    { role: "SĞK", x: 0.82, y: 0.74 },
  ],
  "5-3-2": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.12, y: 0.32 },
    { role: "STP", x: 0.3, y: 0.2 },
    { role: "STP", x: 0.5, y: 0.16 },
    { role: "STP", x: 0.7, y: 0.2 },
    { role: "SĞB", x: 0.88, y: 0.32 },
    { role: "MO", x: 0.3, y: 0.48 },
    { role: "DOS", x: 0.5, y: 0.4 },
    { role: "MO", x: 0.7, y: 0.48 },
    { role: "SAN", x: 0.38, y: 0.76 },
    { role: "SAN", x: 0.62, y: 0.76 },
  ],
  "5-4-1": [
    { role: "KL", x: 0.5, y: 0.07 },
    { role: "SB", x: 0.12, y: 0.32 },
    { role: "STP", x: 0.3, y: 0.2 },
    { role: "STP", x: 0.5, y: 0.16 },
    { role: "STP", x: 0.7, y: 0.2 },
    { role: "SĞB", x: 0.88, y: 0.32 },
    { role: "SLK", x: 0.16, y: 0.5 },
    { role: "MO", x: 0.4, y: 0.46 },
    { role: "MO", x: 0.6, y: 0.46 },
    { role: "SĞK", x: 0.84, y: 0.5 },
    { role: "SAN", x: 0.5, y: 0.78 },
  ],
};

// Sıra varsayılan 4-3-3 slotlarıyla aynı: kaleci, bekler, orta saha, kanatlar, santrafor.
const HOME_NAMES = [
  ["Buffon", 1],
  ["R. Carlos", 3],
  ["Maldini", 4],
  ["Baresi", 5],
  ["Cafu", 2],
  ["Iniesta", 8],
  ["Makelele", 6],
  ["Zidane", 10],
  ["Ronaldo", 7],
  ["Pelé", 9],
  ["Messi", 11],
];

const LEGACY_HOME_NAMES = [
  "Emre Kaya",
  "Kerem Aydın",
  "Mert Demir",
  "Burak Şen",
  "Arda Koç",
  "Yusuf Aksoy",
  "Can Öz",
  "Hakan Polat",
  "Deniz Arslan",
  "Ali Kurt",
  "Okan Tekin",
];

const BENCH_NAMES = [
  ["Casillas", 13, "KL"],
  ["Puyol", 14, "STP"],
  ["Marcelo", 15, "SB"],
  ["Xavi", 17, "MO"],
  ["Maradona", 19, "OF"],
  ["Henry", 21, "SAN"],
  ["Giggs", 22, "SLK"],
];

const LEGACY_BENCH_NAMES = [
  "Serkan Yıldız",
  "Baran Çelik",
  "Cem Uçar",
  "Onur Akın",
  "Tolga Er",
  "Efe Sarı",
  "Kaan Bilgin",
];

// Sıra varsayılan rakip 4-4-2 slotlarıyla aynı.
const AWAY_NAMES = [
  ["Kahn", 1],
  ["A. Cole", 3],
  ["Cannavaro", 5],
  ["Nesta", 4],
  ["Lahm", 2],
  ["Ronaldinho", 11],
  ["Gerrard", 8],
  ["Scholes", 18],
  ["Figo", 7],
  ["Romário", 9],
  ["Cruyff", 14],
];

const $ = (id) => document.getElementById(id);

const els = {};
let state;
let ui;
let editBase = null;
const undoStack = [];
const redoStack = [];
let saveTimer = 0;
let toastTimer = 0;
let spaceDown = false;

let renderer;
let scene;
let camera;
let pitchMesh;
const raycaster = new THREE.Raycaster();
const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const ndc = new THREE.Vector2();
const hitPoint = new THREE.Vector3();

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roleGroup(role) {
  if (role === "KL") return "gk";
  if (role === "SB" || role === "STP" || role === "SĞB") return "def";
  if (role === "SLK" || role === "SĞK" || role === "SAN") return "fwd";
  return "mid";
}

function projectTeam(slots, side, view) {
  if (side === "home" && view === "lineup") {
    return slots.map((slot) => ({ role: slot.role, x: slot.x, y: slot.y }));
  }
  const ordered = [...new Set(slots.map((slot) => slot.y))].sort((a, b) => a - b);
  const groups = [];
  ordered.forEach((y) => {
    const last = groups[groups.length - 1];
    if (!last || y - last > 0.12) groups.push(y);
  });
  const lineOf = new Map();
  ordered.forEach((y) => {
    let index = 0;
    groups.forEach((start, groupIndex) => {
      if (y >= start) index = groupIndex;
    });
    lineOf.set(y, index);
  });
  const start = 0.075;
  const end = 0.45;
  return slots.map((slot) => {
    const index = lineOf.get(slot.y) || 0;
    const depth = groups.length === 1 ? (start + end) / 2 : start + (index / (groups.length - 1)) * (end - start);
    if (side === "home") return { role: slot.role, x: slot.x, y: depth };
    return { role: slot.role, x: 1 - slot.x, y: 1 - depth };
  });
}

function makePlayer(partial) {
  return {
    id: partial.id || uid(),
    name: partial.name,
    number: partial.number,
    role: partial.role,
    x: partial.x,
    y: partial.y,
    captain: !!partial.captain,
  };
}

function createDefault() {
  const formation = "4-3-3";
  const starters = FORMATIONS[formation].map((slot, index) => makePlayer({
    id: "h" + (index + 1),
    name: HOME_NAMES[index][0],
    number: HOME_NAMES[index][1],
    role: slot.role,
    x: slot.x,
    y: slot.y,
    captain: index === 9,
  }));
  const bench = BENCH_NAMES.map((row, index) => makePlayer({
    id: "b" + (index + 1),
    name: row[0],
    number: row[1],
    role: row[2],
    x: 0.5,
    y: 0.5,
  }));
  const opponents = projectTeam(FORMATIONS["4-4-2"], "away", "match").map((placed, index) => makePlayer({
    id: "a" + (index + 1),
    name: AWAY_NAMES[index][0],
    number: AWAY_NAMES[index][1],
    role: placed.role,
    x: placed.x,
    y: placed.y,
  }));
  return {
    v: 1,
    teamName: "Lotus FC",
    opponentName: "Rakip",
    formation,
    opponentFormation: "4-4-2",
    view: "lineup",
    orientation: "vertical",
    showOpponent: false,
    note: "",
    drawColor: "#f8fafc",
    ball: { x: 0.5, y: 0.52 },
    starters,
    bench,
    opponents,
    drawings: [],
  };
}

function upgradePlaceholderNames(players, legends, legacyNames) {
  if (players.length !== legends.length) return;
  const stillPlaceholder = players.every((player, index) => (
    legacyNames ? player.name === legacyNames[index] : player.name === "Rakip " + (index + 1)
  ));
  if (!stillPlaceholder) return;
  players.forEach((player, index) => {
    player.name = legends[index][0];
    player.number = legends[index][1];
  });
}

function cleanPlayer(raw, fallbackRole) {
  if (!raw || typeof raw !== "object") return null;
  const x = Number(raw.x);
  const y = Number(raw.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  const role = Object.prototype.hasOwnProperty.call(ROLE_LABEL, raw.role) ? raw.role : fallbackRole;
  return {
    id: String(raw.id || uid()),
    name: String(raw.name || "Oyuncu").slice(0, 24),
    number: clamp(Math.round(Number(raw.number) || 0), 0, 99),
    role,
    x: clamp(x, 0, 1),
    y: clamp(y, 0, 1),
    captain: !!raw.captain,
  };
}

function cleanDrawing(raw) {
  if (!raw || !["pass", "run", "zone"].includes(raw.type)) return null;
  const nums = ["x1", "y1", "x2", "y2"].map((key) => Number(raw[key]));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return {
    id: String(raw.id || uid()),
    type: raw.type,
    x1: nums[0],
    y1: nums[1],
    x2: nums[2],
    y2: nums[3],
    fromId: raw.fromId ? String(raw.fromId) : null,
    toId: raw.toId ? String(raw.toId) : null,
    fromBall: !!raw.fromBall,
    toBall: !!raw.toBall,
    color: typeof raw.color === "string" ? raw.color : "#f8fafc",
  };
}

function sanitize(data) {
  if (!data || data.v !== 1) return null;
  const starters = Array.isArray(data.starters)
    ? data.starters.map((p, i) => cleanPlayer(p, FORMATIONS["4-3-3"][i] ? FORMATIONS["4-3-3"][i].role : "MO")).filter(Boolean)
    : [];
  if (starters.length !== 11) return null;
  const opponents = Array.isArray(data.opponents)
    ? data.opponents.map((p) => cleanPlayer(p, "MO")).filter(Boolean)
    : [];
  const bench = Array.isArray(data.bench) ? data.bench.map((p) => cleanPlayer(p, "MO")).filter(Boolean).slice(0, 20) : [];
  upgradePlaceholderNames(starters, HOME_NAMES, LEGACY_HOME_NAMES);
  upgradePlaceholderNames(bench, BENCH_NAMES, LEGACY_BENCH_NAMES);
  const formation = FORMATIONS[data.formation] ? data.formation : "4-3-3";
  const opponentFormation = FORMATIONS[data.opponentFormation] ? data.opponentFormation : "4-4-2";
  let away = opponents.length === 11 ? opponents : null;
  if (away) upgradePlaceholderNames(away, AWAY_NAMES, null);
  if (!away) {
    away = createDefault().opponents;
    placeList(away, opponentFormation, "away", "match", true);
  }
  return {
    v: 1,
    teamName: String(data.teamName || "Lotus FC").slice(0, 32),
    opponentName: String(data.opponentName || "Rakip").slice(0, 32),
    formation,
    opponentFormation,
    view: data.view === "match" ? "match" : "lineup",
    orientation: data.orientation === "horizontal" ? "horizontal" : "vertical",
    showOpponent: !!data.showOpponent,
    note: String(data.note || "").slice(0, 2000),
    drawColor: typeof data.drawColor === "string" ? data.drawColor : "#f8fafc",
    ball: {
      x: clamp(Number(data.ball && data.ball.x) || 0.5, 0, 1),
      y: clamp(Number(data.ball && data.ball.y) || 0.5, 0, 1),
    },
    starters,
    bench,
    opponents: away,
    drawings: Array.isArray(data.drawings) ? data.drawings.map(cleanDrawing).filter(Boolean).slice(0, 80) : [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefault();
    return sanitize(JSON.parse(raw)) || createDefault();
  } catch (err) {
    return createDefault();
  }
}

function persistable() {
  return {
    v: 1,
    teamName: state.teamName,
    opponentName: state.opponentName,
    formation: state.formation,
    opponentFormation: state.opponentFormation,
    view: state.view,
    orientation: state.orientation,
    showOpponent: state.showOpponent,
    note: state.note,
    drawColor: state.drawColor,
    ball: { x: state.ball.x, y: state.ball.y },
    starters: state.starters,
    bench: state.bench,
    opponents: state.opponents,
    drawings: state.drawings,
  };
}

function beginUndo() {
  editBase = JSON.stringify(persistable());
}

function commitRemembered() {
  if (!editBase) return;
  const now = JSON.stringify(persistable());
  if (now !== editBase) {
    undoStack.push(editBase);
    if (undoStack.length > 60) undoStack.shift();
    redoStack.length = 0;
  }
  editBase = null;
  updateHistoryButtons();
}

function updateHistoryButtons() {
  els.undo.disabled = undoStack.length === 0;
  els.redo.disabled = redoStack.length === 0;
}

function restore(raw) {
  const next = sanitize(JSON.parse(raw));
  if (!next) return;
  state = next;
  ui.selection = null;
  ui.draft = null;
  ui.mode = null;
  syncControls();
  if (camera) frameCamera();
  updateHistoryButtons();
  commit();
}

function undo() {
  const raw = undoStack.pop();
  if (!raw) return;
  redoStack.push(JSON.stringify(persistable()));
  restore(raw);
  toast("Geri alındı");
}

function redo() {
  const raw = redoStack.pop();
  if (!raw) return;
  undoStack.push(JSON.stringify(persistable()));
  restore(raw);
  toast("İleri alındı");
}

function scheduleSave() {
  els.saveState.textContent = "Kaydediliyor";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 280);
}

function saveNow() {
  clearTimeout(saveTimer);
  try {
    syncDrawingAnchors();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable()));
    els.saveState.textContent = "Kaydedildi";
  } catch (err) {
    els.saveState.textContent = "Kayıt olmadı";
    toast("Kayıt yapılamadı");
  }
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1700);
}

function placeList(list, formationName, side, view, withRoles) {
  const slots = projectTeam(FORMATIONS[formationName], side, view);
  slots.forEach((slot, index) => {
    const player = list[index];
    if (!player) return;
    player.x = slot.x;
    player.y = slot.y;
    if (withRoles) player.role = slot.role;
  });
}

function pitchPlayers() {
  const list = state.starters.map((player) => ({ ...player, team: "home" }));
  if (state.showOpponent) {
    state.opponents.forEach((player) => list.push({ ...player, team: "away" }));
  }
  return list;
}

function findPlayer(id) {
  return [...state.starters, ...state.bench, ...state.opponents].find((player) => player.id === id) || null;
}

function pitchPlayerById(id) {
  return state.starters.find((player) => player.id === id)
    || state.opponents.find((player) => player.id === id)
    || null;
}

function selectedPlayer() {
  if (!ui.selection || ui.selection.type !== "player") return null;
  return findPlayer(ui.selection.id);
}

function nextNumber() {
  const numbers = [...state.starters, ...state.bench].map((player) => player.number);
  return clamp(Math.max(0, ...numbers) + 1, 1, 99);
}

function swapStarterWithBench(starterIndex, benchIndex) {
  syncDrawingAnchors();
  const slot = state.starters[starterIndex];
  const incoming = state.bench[benchIndex];
  const outgoing = state.starters[starterIndex];
  state.starters[starterIndex] = makePlayer({
    id: incoming.id,
    name: incoming.name,
    number: incoming.number,
    captain: incoming.captain,
    role: slot.role,
    x: slot.x,
    y: slot.y,
  });
  state.bench[benchIndex] = makePlayer({
    id: outgoing.id,
    name: outgoing.name,
    number: outgoing.number,
    captain: outgoing.captain,
    role: outgoing.role,
    x: 0.5,
    y: 0.5,
  });
}

function setCaptain(player) {
  const team = state.starters.includes(player) || state.bench.includes(player)
    ? [...state.starters, ...state.bench]
    : state.opponents;
  const next = !player.captain;
  team.forEach((item) => { item.captain = false; });
  player.captain = next;
}

function ballPreset(name) {
  const spots = {
    center: { x: 0.5, y: 0.5 },
    "own-pen": { x: 0.5, y: 11 / 105 },
    "opp-pen": { x: 0.5, y: 1 - 11 / 105 },
    "corner-l": { x: 0.03, y: 0.97 },
    "corner-r": { x: 0.97, y: 0.97 },
  };
  return spots[name];
}

function syncDrawingAnchors() {
  state.drawings.forEach((drawing) => {
    const start = resolvePoint(drawing, "start");
    const end = resolvePoint(drawing, "end");
    drawing.x1 = start.x;
    drawing.y1 = start.y;
    drawing.x2 = end.x;
    drawing.y2 = end.y;
  });
}

function resolvePoint(drawing, which) {
  if (which === "start" && drawing.fromBall) return { x: state.ball.x, y: state.ball.y };
  if (which === "end" && drawing.toBall) return { x: state.ball.x, y: state.ball.y };
  const id = which === "start" ? drawing.fromId : drawing.toId;
  const player = id ? pitchPlayerById(id) : null;
  if (player) return { x: player.x, y: player.y };
  return which === "start"
    ? { x: drawing.x1, y: drawing.y1 }
    : { x: drawing.x2, y: drawing.y2 };
}

function makePitchTexture() {
  const scale = 10;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(PLANE_W * scale);
  canvas.height = Math.round(PLANE_H * scale);
  const ctx = canvas.getContext("2d");
  const pxAcross = (meters) => (PAD + meters) * scale;
  const pxLen = (metersFromOwn) => (PAD + (LEN - metersFromOwn)) * scale;

  ctx.fillStyle = "#0d3320";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const bands = 12;
  const innerX = PAD * scale;
  const innerY = PAD * scale;
  const innerW = WID * scale;
  const innerH = LEN * scale;
  for (let i = 0; i < bands; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? "#1c7d3c" : "#166832";
    ctx.fillRect(innerX + (innerW / bands) * i, innerY, innerW / bands + 1, innerH);
  }

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;
  for (let i = 0; i < pixels.length; i += 16) {
    const noise = (Math.random() - 0.5) * 14;
    pixels[i] = clamp(pixels[i] + noise, 0, 255);
    pixels[i + 1] = clamp(pixels[i + 1] + noise, 0, 255);
    pixels[i + 2] = clamp(pixels[i + 2] + noise * 0.35, 0, 255);
  }
  ctx.putImageData(image, 0, 0);

  const vignette = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height * 0.25,
    canvas.width / 2,
    canvas.height / 2,
    canvas.height * 0.62
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.2)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
  ctx.strokeStyle = "rgba(255,255,255,0.94)";
  ctx.fillStyle = "rgba(255,255,255,0.94)";
  ctx.lineWidth = 2.6;
  ctx.shadowColor = "rgba(0,0,0,0.28)";
  ctx.shadowBlur = 2;

  function strokePoly(points) {
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = pxAcross(point[0]);
      const y = pxLen(point[1]);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  ctx.strokeRect(pxAcross(0), pxLen(LEN), WID * scale, LEN * scale);
  strokePoly([[0, 52.5], [WID, 52.5]]);
  ctx.beginPath();
  ctx.arc(pxAcross(34), pxLen(52.5), 9.15 * scale, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(pxAcross(34), pxLen(52.5), 3.2, 0, Math.PI * 2);
  ctx.fill();

  function area(goalAtOpponent, depth, width) {
    const line = goalAtOpponent ? LEN : 0;
    const far = goalAtOpponent ? LEN - depth : depth;
    const left = (WID - width) / 2;
    const right = (WID + width) / 2;
    strokePoly([[left, line], [left, far], [right, far], [right, line]]);
  }

  area(false, 16.5, 40.32);
  area(false, 5.5, 18.32);
  area(true, 16.5, 40.32);
  area(true, 5.5, 18.32);

  [[11, false], [LEN - 11, true]].forEach(([spot, opponent]) => {
    ctx.beginPath();
    ctx.arc(pxAcross(34), pxLen(spot), 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    if (opponent) {
      const y = pxLen(LEN - 16.5);
      ctx.rect(0, y, canvas.width, canvas.height - y);
    } else {
      ctx.rect(0, 0, canvas.width, pxLen(16.5));
    }
    ctx.clip();
    ctx.beginPath();
    ctx.arc(pxAcross(34), pxLen(spot), 9.15 * scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  const corners = [
    [0, 0, -Math.PI / 2, 0],
    [WID, 0, Math.PI, -Math.PI / 2],
    [0, LEN, 0, Math.PI / 2],
    [WID, LEN, Math.PI / 2, Math.PI],
  ];
  corners.forEach(([across, fromOwn, a0, a1]) => {
    ctx.beginPath();
    ctx.arc(pxAcross(across), pxLen(fromOwn), scale, a0, a1, false);
    ctx.stroke();
  });

  function goal(atOpponent) {
    const line = atOpponent ? LEN : 0;
    const back = atOpponent ? LEN + 2.2 : -2.2;
    const left = (WID - 7.32) / 2;
    const right = (WID + 7.32) / 2;
    ctx.beginPath();
    ctx.moveTo(pxAcross(left), pxLen(line));
    ctx.lineTo(pxAcross(left), pxLen(back));
    ctx.lineTo(pxAcross(right), pxLen(back));
    ctx.lineTo(pxAcross(right), pxLen(line));
    ctx.stroke();
  }
  goal(false);
  goal(true);

  ctx.shadowColor = "transparent";
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "600 14px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("KALE", pxAcross(34), pxLen(-2.35));
  ctx.fillText("RAKİP KALE", pxAcross(34), pxLen(LEN + 2.35));

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.anisotropy = 8;
  return texture;
}

function initPitch() {
  const root = els.root;
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x07140f, 1);
  renderer.domElement.className = "pitch-canvas";
  root.prepend(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
  const texture = makePitchTexture();
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  pitchMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(PLANE_W, PLANE_H),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  pitchMesh.rotation.x = -Math.PI / 2;
  scene.add(pitchMesh);
  frameCamera();

  const observer = new ResizeObserver(() => {
    frameCamera();
    renderView();
  });
  observer.observe(root);
}

function frameCamera() {
  const width = Math.max(1, els.root.clientWidth);
  const height = Math.max(1, els.root.clientHeight);
  const aspect = width / height;
  const fit = 1.08;
  const horizontal = state.orientation === "horizontal";
  const spanX = (horizontal ? PLANE_H : PLANE_W) * fit;
  const spanY = (horizontal ? PLANE_W : PLANE_H) * fit;
  let halfW;
  let halfH;
  if (aspect > spanX / spanY) {
    halfH = spanY / 2;
    halfW = halfH * aspect;
  } else {
    halfW = spanX / 2;
    halfH = halfW / aspect;
  }
  halfW /= ui.zoom;
  halfH /= ui.zoom;
  camera.left = ui.panX - halfW;
  camera.right = ui.panX + halfW;
  camera.top = ui.panZ + halfH;
  camera.bottom = ui.panZ - halfH;
  camera.position.set(0, 160, 0);
  camera.up.set(horizontal ? 1 : 0, 0, horizontal ? 0 : 1);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
}

function clampPan() {
  const limit = Math.max(WID, LEN) * 0.6;
  ui.panX = clamp(ui.panX, -limit, limit);
  ui.panZ = clamp(ui.panZ, -limit, limit);
}

function boardIsFullscreen() {
  return document.fullscreenElement === els.board || els.board.classList.contains("is-fullscreen");
}

function pitchToScreen(nx, ny) {
  const vector = new THREE.Vector3((0.5 - nx) * WID, 0, (ny - 0.5) * LEN);
  vector.project(camera);
  return {
    x: (vector.x * 0.5 + 0.5) * els.root.clientWidth,
    y: (-vector.y * 0.5 + 0.5) * els.root.clientHeight,
  };
}

function clientToWorld(clientX, clientY) {
  const rect = els.root.getBoundingClientRect();
  ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  if (!raycaster.ray.intersectPlane(ground, hitPoint)) return null;
  return hitPoint.clone();
}

function clientToPitch(clientX, clientY, limited) {
  const world = clientToWorld(clientX, clientY);
  if (!world) return null;
  const x = 0.5 - world.x / WID;
  const y = world.z / LEN + 0.5;
  if (limited && (x < -0.03 || x > 1.03 || y < -0.03 || y > 1.03)) return null;
  return {
    x: clamp(x, 0, 1),
    y: clamp(y, 0, 1),
    worldX: world.x,
    worldZ: world.z,
  };
}

function localPoint(event) {
  const rect = els.root.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function hitToken(local) {
  const ball = pitchToScreen(state.ball.x, state.ball.y);
  if (Math.hypot(ball.x - local.x, ball.y - local.y) < 22) return { type: "ball" };
    let best = null;
    let bestDistance = 32;
  pitchPlayers().forEach((player) => {
    const point = pitchToScreen(player.x, player.y);
    const distance = Math.hypot(point.x - local.x, point.y - local.y);
    if (distance < bestDistance) {
      best = player;
      bestDistance = distance;
    }
  });
  return best ? { type: "player", id: best.id, team: best.team } : null;
}

function anchorAt(clientX, clientY) {
  const local = {
    x: clientX - els.root.getBoundingClientRect().left,
    y: clientY - els.root.getBoundingClientRect().top,
  };
  const ball = pitchToScreen(state.ball.x, state.ball.y);
  if (Math.hypot(ball.x - local.x, ball.y - local.y) < 22) {
    return { x: state.ball.x, y: state.ball.y, id: null, toBall: true };
  }
  let best = null;
  let bestDistance = 30;
  pitchPlayers().forEach((player) => {
    const point = pitchToScreen(player.x, player.y);
    const distance = Math.hypot(point.x - local.x, point.y - local.y);
    if (distance < bestDistance) {
      best = player;
      bestDistance = distance;
    }
  });
  if (best) return { x: best.x, y: best.y, id: best.id, toBall: false };
  const pitch = clientToPitch(clientX, clientY, true);
  if (!pitch) return null;
  return { x: pitch.x, y: pitch.y, id: null, toBall: false };
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  const t = lengthSq === 0 ? 0 : clamp(((px - x1) * dx + (py - y1) * dy) / lengthSq, 0, 1);
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function hitDrawing(local) {
  for (let index = state.drawings.length - 1; index >= 0; index -= 1) {
    const drawing = state.drawings[index];
    if (drawing.type === "zone") {
      const a = pitchToScreen(drawing.x1, drawing.y1);
      const b = pitchToScreen(drawing.x2, drawing.y2);
      const left = Math.min(a.x, b.x);
      const right = Math.max(a.x, b.x);
      const top = Math.min(a.y, b.y);
      const bottom = Math.max(a.y, b.y);
      if (local.x >= left && local.x <= right && local.y >= top && local.y <= bottom) return drawing;
    } else {
      const start = pitchToScreen(resolvePoint(drawing, "start").x, resolvePoint(drawing, "start").y);
      const end = pitchToScreen(resolvePoint(drawing, "end").x, resolvePoint(drawing, "end").y);
      if (distToSegment(local.x, local.y, start.x, start.y, end.x, end.y) < 12) return drawing;
    }
  }
  return null;
}

const SHIRT_SVG = '<svg viewBox="0 0 100 108" aria-hidden="true"><path fill="var(--shirt)" d="M34 16 L22 21 L4 40 L16 52 L26 36 L26 92 Q26 102 38 102 H62 Q74 102 74 92 L74 36 L84 52 L96 40 L78 21 L66 16 Q50 32 34 16Z"/><path d="M8 38 L18 50" fill="none" stroke="var(--shirt-dark)" stroke-width="5" stroke-linecap="round"/><path d="M82 50 L92 38" fill="none" stroke="var(--shirt-dark)" stroke-width="5" stroke-linecap="round"/><path d="M40 18 L50 30 L60 18" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/></svg>';

function createJersey(number, captain) {
  const jersey = document.createElement("div");
  jersey.className = "jersey";
  jersey.innerHTML = SHIRT_SVG;
  const label = document.createElement("span");
  label.className = "shirt-number";
  label.textContent = String(number);
  jersey.appendChild(label);
  if (captain) {
    const mark = document.createElement("span");
    mark.className = "captain";
    mark.textContent = "C";
    jersey.appendChild(mark);
  }
  return jersey;
}

function renderTokens() {
  const layer = els.tokens;
  layer.replaceChildren();
  pitchPlayers().forEach((player) => {
    const point = pitchToScreen(player.x, player.y);
    const token = document.createElement("div");
    const selected = ui.selection && ui.selection.type === "player" && ui.selection.id === player.id;
    const snapped = ui.snapId === player.id;
    token.className = "token " + (player.team === "away" ? "away" : roleGroup(player.role))
      + (state.view === "match" ? " compact" : "")
      + (selected ? " selected" : "")
      + (snapped || ui.hoverId === player.id ? " hover" : "")
      + (player.role === "KL" ? " label-side" : "");
    token.style.left = point.x + "px";
    token.style.top = point.y + "px";
    token.dataset.tokenId = player.id;

    const jersey = createJersey(player.number, player.captain);
    const name = document.createElement("div");
    name.className = "nameplate";
    name.textContent = player.name;
    token.append(jersey, name);
    layer.appendChild(token);
  });

  const ballPoint = pitchToScreen(state.ball.x, state.ball.y);
  const ball = document.createElement("div");
  ball.className = "token ball-wrap" + (ui.selection && ui.selection.type === "ball" ? " selected" : "");
  ball.style.left = ballPoint.x + "px";
  ball.style.top = ballPoint.y + "px";
  ball.dataset.tokenId = "ball";
  ball.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id="lb-ball-base" cx="36%" cy="30%" r="72%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="42%" stop-color="#f5f5f4"/>
        <stop offset="100%" stop-color="#a8a29e"/>
      </radialGradient>
      <radialGradient id="lb-ball-rim" cx="50%" cy="48%" r="52%">
        <stop offset="58%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.42"/>
      </radialGradient>
      <radialGradient id="lb-ball-spec" cx="32%" cy="26%" r="32%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.92"/>
        <stop offset="55%" stop-color="#fff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="lb-ball-clip"><circle cx="50" cy="50" r="46"/></clipPath>
    </defs>
    <g clip-path="url(#lb-ball-clip)">
      <circle cx="50" cy="50" r="46" fill="url(#lb-ball-base)"/>
      <g fill="#161616" stroke="#0a0a0a" stroke-width="0.8" stroke-linejoin="round">
        <path d="M50 36.88 L62.48 45.95 L57.71 60.61 L42.29 60.61 L37.52 45.95Z"/>
        <path d="M78.18 24.33 L65.7 15.27 L67.31 -0.07 L81.4 -6.34 L93.88 2.72Z"/>
        <path d="M83.12 68.87 L87.88 54.2 L102.97 50.99 L113.29 62.46 L108.53 77.12Z"/>
        <path d="M42.29 87.33 L57.71 87.33 L65.42 100.69 L57.71 114.04 L42.29 114.04Z"/>
        <path d="M12.12 54.2 L16.88 68.87 L6.56 80.33 L-8.53 77.12 L-13.29 62.46Z"/>
        <path d="M34.3 15.27 L21.82 24.33 L7.73 18.06 L6.12 2.72 L18.6 -6.34Z"/>
      </g>
      <g fill="none" stroke="#1c1917" stroke-width="1.35" stroke-linejoin="round">
        <path d="M50 36.88 L62.48 45.95 L76.57 39.67 L78.18 24.33 L65.7 15.27 L51.61 21.54Z"/>
        <path d="M62.48 45.95 L57.71 60.61 L68.03 72.08 L83.12 68.87 L87.88 54.2 L77.56 42.74Z"/>
        <path d="M57.71 60.61 L42.29 60.61 L34.58 73.97 L42.29 87.33 L57.71 87.33 L65.42 73.97Z"/>
        <path d="M42.29 60.61 L37.52 45.95 L22.44 42.74 L12.12 54.2 L16.88 68.87 L31.97 72.08Z"/>
        <path d="M37.52 45.95 L50 36.88 L48.39 21.54 L34.3 15.27 L21.82 24.33 L23.43 39.67Z"/>
      </g>
      <circle cx="50" cy="50" r="46" fill="url(#lb-ball-rim)"/>
      <ellipse cx="36" cy="30" rx="16" ry="11" fill="url(#lb-ball-spec)"/>
    </g>
    <circle cx="50" cy="50" r="45.2" fill="none" stroke="#292524" stroke-width="1.6"/>
  </svg>`;
  layer.appendChild(ball);
}

function svgEl(name, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
  return el;
}

function renderDrawings() {
  const svg = els.draw;
  const width = Math.max(1, els.root.clientWidth);
  const height = Math.max(1, els.root.clientHeight);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  svg.replaceChildren();
  const items = ui.draft ? state.drawings.concat(ui.draft) : state.drawings;
  items.forEach((drawing) => {
    const color = drawing.color || "#f8fafc";
    if (drawing.type === "zone") {
      const a = pitchToScreen(drawing.x1, drawing.y1);
      const b = pitchToScreen(drawing.x2, drawing.y2);
      svg.appendChild(svgEl("rect", {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y),
        fill: color,
        "fill-opacity": "0.16",
        stroke: color,
        "stroke-width": "2",
      }));
      return;
    }
    const start = resolvePoint(drawing, "start");
    const end = resolvePoint(drawing, "end");
    const a = pitchToScreen(start.x, start.y);
    const b = pitchToScreen(end.x, end.y);
    svg.appendChild(svgEl("line", {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: color,
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "stroke-dasharray": drawing.type === "run" ? "7 6" : "0",
    }));
    if (drawing.type === "pass") {
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      const size = 12;
      const p1x = b.x + Math.cos(angle + 2.55) * size;
      const p1y = b.y + Math.sin(angle + 2.55) * size;
      const p2x = b.x + Math.cos(angle - 2.55) * size;
      const p2y = b.y + Math.sin(angle - 2.55) * size;
      svg.appendChild(svgEl("polygon", {
        points: b.x + "," + b.y + " " + p1x + "," + p1y + " " + p2x + "," + p2y,
        fill: color,
      }));
    } else {
      svg.appendChild(svgEl("circle", { cx: b.x, cy: b.y, r: 4, fill: color }));
    }
  });
}

function renderView() {
  if (!renderer) return;
  renderer.render(scene, camera);
  renderTokens();
  renderDrawings();
}

function renderLists() {
  els.squad.replaceChildren();
  state.starters.forEach((player, index) => {
    els.squad.appendChild(makeRow(player, "starter", index));
  });
  els.bench.replaceChildren();
  state.bench.forEach((player, index) => {
    els.bench.appendChild(makeRow(player, "bench", index));
  });
  els.benchCount.textContent = state.bench.length + " oyuncu";
}

function makeRow(player, kind, index) {
  const row = document.createElement("div");
  const selected = ui.selection && ui.selection.type === "player" && ui.selection.id === player.id;
  row.className = "row" + (selected ? " is-selected" : "");
  row.draggable = true;
  row.dataset.kind = kind;
  row.dataset.index = String(index);
  row.dataset.id = player.id;

  const badge = createJersey(player.number, false);
  badge.classList.add("mini", roleGroup(player.role));

  const text = document.createElement("div");
  text.className = "min-w-0";
  const name = document.createElement("div");
  name.className = "truncate text-sm font-semibold";
  name.textContent = player.name;
  const role = document.createElement("div");
  role.className = "truncate text-xs text-emerald-100/50";
  role.textContent = ROLE_LABEL[player.role] || player.role;
  if (player.captain) role.textContent += " · Kaptan";
  text.append(name, role);

  const actions = document.createElement("div");
  actions.className = "flex gap-1";
  if (kind === "bench") {
    const promote = document.createElement("button");
    promote.type = "button";
    promote.dataset.action = "promote";
    promote.className = "rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15";
    promote.textContent = "Al";
    promote.title = "Seçili ilk 11 oyuncusuyla değiştir";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.action = "remove";
    remove.className = "rounded-lg px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/10";
    remove.textContent = "Sil";
    actions.append(promote, remove);
  }
  row.append(badge, text, actions);
  return row;
}

function renderInspector() {
  const root = els.inspector;
  root.replaceChildren();
  const player = selectedPlayer();
  if (!player) {
    const empty = document.createElement("p");
    empty.className = "text-sm leading-6 text-emerald-100/60";
    empty.textContent = ui.selection && ui.selection.type === "ball"
      ? "Top seçili. Taşı aracıyla sürükleyebilir veya hazır konumlara bırakabilirsin."
      : "Sahadan bir oyuncu seç. İsim, numara, mevki ve kaptanlık buradan değişir.";
    root.appendChild(empty);
    return;
  }

  const onTeam = state.starters.includes(player) || state.bench.includes(player);
  const name = field("İsim", "text");
  name.input.value = player.name;
  name.input.maxLength = 24;
  name.input.addEventListener("focus", beginUndo);
  name.input.addEventListener("input", () => {
    player.name = name.input.value;
    renderLists();
    renderView();
    scheduleSave();
  });
  name.input.addEventListener("change", commitRemembered);

  const number = field("Numara", "number");
  number.input.min = "0";
  number.input.max = "99";
  number.input.value = String(player.number);
  number.input.addEventListener("focus", beginUndo);
  number.input.addEventListener("input", () => {
    player.number = clamp(Math.round(Number(number.input.value) || 0), 0, 99);
    renderLists();
    renderView();
    scheduleSave();
  });
  number.input.addEventListener("change", commitRemembered);

  const roleWrap = document.createElement("label");
  roleWrap.className = "mt-2 block text-xs text-emerald-100/50";
  roleWrap.textContent = "Mevki";
  const role = document.createElement("select");
  role.className = "mt-1 w-full rounded-xl border border-white/10 bg-[#0c1914] px-3 py-2 text-sm text-emerald-50";
  fillRoles(role);
  role.value = player.role;
  role.addEventListener("focus", beginUndo);
  role.addEventListener("change", () => {
    player.role = role.value;
    commitRemembered();
    renderLists();
    renderView();
    scheduleSave();
  });
  roleWrap.appendChild(role);

  const captain = document.createElement("button");
  captain.type = "button";
  captain.className = "mt-3 w-full rounded-xl bg-[#e4b15a] py-2 text-sm font-semibold text-[#1c1408]";
  captain.textContent = player.captain ? "Kaptanlığı kaldır" : (onTeam ? "Kaptan yap" : "Rakip kaptanı yap");
  captain.addEventListener("click", () => {
    beginUndo();
    setCaptain(player);
    commitRemembered();
    commit();
  });

  root.append(name.wrap, number.wrap, roleWrap, captain);

  if (state.bench.includes(player)) {
    const hint = document.createElement("p");
    hint.className = "mt-3 text-xs leading-5 text-emerald-100/50";
    hint.textContent = "Bu oyuncu yedekte. Sahaya almak için bir ilk 11 oyuncusu seçip Al düğmesini kullan.";
    root.appendChild(hint);
  }
}

function field(label, type) {
  const wrap = document.createElement("label");
  wrap.className = "mt-2 block text-xs text-emerald-100/50";
  wrap.textContent = label;
  const input = document.createElement("input");
  input.type = type;
  input.className = "mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-emerald-50 outline-none ring-[#e4b15a] focus:ring-2";
  wrap.appendChild(input);
  return { wrap, input };
}

function renderLabels() {
  const horizontal = state.orientation === "horizontal";
  els.root.classList.toggle("orientation-horizontal", horizontal);
  els.homeLabel.textContent = state.teamName || "Takım";
  els.awayLabel.textContent = state.view === "match" && state.showOpponent
    ? (state.opponentName || "Rakip")
    : (horizontal ? "Hücum yönü →" : "Hücum yönü ↑");
}

function updateToolUi() {
  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tool === ui.tool);
  });
  document.querySelectorAll("[data-color]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.color === state.drawColor);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  document.querySelectorAll("[data-orient]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.orient === state.orientation);
  });
  els.fullscreen.textContent = boardIsFullscreen() ? "Küçült" : "Tam ekran";
  els.showOpponent.checked = state.showOpponent;
  els.drawingCount.textContent = String(state.drawings.length);
  const cursors = { move: "grab", pass: "crosshair", run: "crosshair", zone: "crosshair", erase: "cell" };
  els.overlay.style.cursor = ui.mode === "pan" || ui.mode === "drag" ? "grabbing" : (cursors[ui.tool] || "default");
}

function commit() {
  renderLists();
  renderInspector();
  renderLabels();
  updateToolUi();
  renderView();
  scheduleSave();
}

function syncControls() {
  els.teamName.value = state.teamName;
  els.opponentName.value = state.opponentName;
  els.formation.value = state.formation;
  els.opponentFormation.value = state.opponentFormation;
  els.note.value = state.note;
  els.showOpponent.checked = state.showOpponent;
  if (!els.addNumber.value) els.addNumber.value = String(nextNumber());
}

function fillFormations(select) {
  Object.keys(FORMATIONS).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

function fillRoles(select) {
  Object.entries(ROLE_LABEL).forEach(([role, label]) => {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = label;
    select.appendChild(option);
  });
}

function setSelection(next) {
  ui.selection = next;
  renderLists();
  renderInspector();
  renderTokens();
}

function capturePointer(event) {
  try {
    els.overlay.setPointerCapture(event.pointerId);
  } catch (err) {
    /* Sentetik olaylarda yakalama gerekmez. */
  }
}

function onPointerDown(event) {
  if (event.button === 1 || event.button === 2 || spaceDown) {
    ui.mode = "pan";
    ui.last = { x: event.clientX, y: event.clientY };
    capturePointer(event);
    updateToolUi();
    return;
  }
  if (event.button !== 0) return;
  capturePointer(event);
  const local = localPoint(event);

  if (ui.tool === "erase") {
    const drawing = hitDrawing(local);
    if (!drawing) return;
    beginUndo();
    state.drawings = state.drawings.filter((item) => item.id !== drawing.id);
    commitRemembered();
    commit();
    return;
  }

  if (ui.tool === "move") {
    const hit = hitToken(local);
    if (!hit) {
      setSelection(null);
      ui.mode = null;
      return;
    }
    ui.mode = "drag";
    ui.drag = hit;
    ui.moved = false;
    beginUndo();
    setSelection(hit.type === "ball" ? { type: "ball" } : { type: "player", id: hit.id });
    updateToolUi();
    return;
  }

  const pitch = clientToPitch(event.clientX, event.clientY, true);
  if (!pitch) return;
  const anchor = ui.tool === "zone" ? { x: pitch.x, y: pitch.y, id: null, toBall: false } : anchorAt(event.clientX, event.clientY);
  if (!anchor) return;
  beginUndo();
  ui.mode = "draw";
  ui.snapId = anchor.id;
  ui.draft = {
    id: uid(),
    type: ui.tool,
    x1: anchor.x,
    y1: anchor.y,
    x2: anchor.x,
    y2: anchor.y,
    fromId: anchor.id,
    toId: null,
    fromBall: !!anchor.toBall,
    toBall: false,
    color: state.drawColor,
  };
  renderDrawings();
  renderTokens();
}

function onPointerMove(event) {
  if (!ui.mode && state.view === "match") {
    const hit = hitToken(localPoint(event));
    const hoverId = hit && hit.type === "player" ? hit.id : null;
    if (hoverId !== ui.hoverId) {
      ui.hoverId = hoverId;
      renderTokens();
    }
  }
  if (ui.mode === "pan") {
    const dx = event.clientX - ui.last.x;
    const dy = event.clientY - ui.last.y;
    ui.last = { x: event.clientX, y: event.clientY };
    const worldPerPxX = (camera.right - camera.left) / Math.max(1, els.root.clientWidth);
    const worldPerPxZ = (camera.top - camera.bottom) / Math.max(1, els.root.clientHeight);
    ui.panX -= dx * worldPerPxX;
    ui.panZ += dy * worldPerPxZ;
    clampPan();
    frameCamera();
    renderView();
    return;
  }
  if (ui.mode === "drag" && ui.drag) {
    const pitch = clientToPitch(event.clientX, event.clientY, false);
    if (!pitch) return;
    const x = clamp(pitch.x, 0.02, 0.98);
    const y = clamp(pitch.y, 0.02, 0.98);
    if (ui.drag.type === "ball") {
      state.ball.x = x;
      state.ball.y = y;
    } else {
      const player = findPlayer(ui.drag.id);
      if (player && (state.starters.includes(player) || state.opponents.includes(player))) {
        player.x = x;
        player.y = y;
      }
    }
    ui.moved = true;
    renderView();
    return;
  }
  if (ui.mode === "draw" && ui.draft) {
    if (ui.draft.type === "zone") {
      const pitch = clientToPitch(event.clientX, event.clientY, true);
      if (!pitch) return;
      ui.draft.x2 = pitch.x;
      ui.draft.y2 = pitch.y;
    } else {
      const anchor = anchorAt(event.clientX, event.clientY);
      if (!anchor) return;
      ui.draft.x2 = anchor.x;
      ui.draft.y2 = anchor.y;
      ui.draft.toId = anchor.id;
      ui.draft.toBall = !!anchor.toBall;
      ui.snapId = anchor.id;
    }
    renderDrawings();
    renderTokens();
  }
}

function onPointerUp() {
  if (ui.mode === "drag") {
    if (ui.moved) {
      syncDrawingAnchors();
      commitRemembered();
      scheduleSave();
    } else {
      editBase = null;
    }
  } else if (ui.mode === "draw" && ui.draft) {
    const draft = ui.draft;
    const length = Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1);
    if (length > 0.025) {
      state.drawings.push(draft);
      commitRemembered();
      commit();
    } else {
      editBase = null;
    }
  }
  ui.mode = null;
  ui.drag = null;
  ui.draft = null;
  ui.snapId = null;
  updateToolUi();
  renderView();
}

function onWheel(event) {
  event.preventDefault();
  const rect = els.root.getBoundingClientRect();
  const before = clientToWorld(event.clientX, event.clientY);
  ui.zoom = clamp(ui.zoom * Math.exp(-event.deltaY * 0.0011), 0.9, 2.8);
  frameCamera();
  if (before) {
    const projected = before.clone().project(camera);
    const ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const halfW = (camera.right - camera.left) / 2;
    const halfH = (camera.top - camera.bottom) / 2;
    ui.panX -= (ndcX - projected.x) * halfW;
    ui.panZ -= (ndcY - projected.y) * halfH;
    clampPan();
    frameCamera();
  }
  renderView();
}

function readDrag(event) {
  try {
    return JSON.parse(event.dataTransfer.getData("text/plain"));
  } catch (err) {
    return null;
  }
}

function bindLists() {
  [els.squad, els.bench].forEach((list) => {
    list.addEventListener("dragstart", (event) => {
      const row = event.target.closest(".row");
      if (!row || event.target.closest("button")) {
        event.preventDefault();
        return;
      }
      event.dataTransfer.setData("text/plain", JSON.stringify({
        kind: row.dataset.kind,
        index: Number(row.dataset.index),
      }));
      event.dataTransfer.effectAllowed = "move";
    });
    list.addEventListener("dragover", (event) => {
      if (event.target.closest(".row")) event.preventDefault();
    });
    list.addEventListener("drop", (event) => {
      const row = event.target.closest(".row");
      if (!row) return;
      event.preventDefault();
      const from = readDrag(event);
      if (!from || from.kind === row.dataset.kind) return;
      const starterIndex = from.kind === "starter" ? from.index : Number(row.dataset.index);
      const benchIndex = from.kind === "bench" ? from.index : Number(row.dataset.index);
      if (!state.starters[starterIndex] || !state.bench[benchIndex]) return;
      beginUndo();
      swapStarterWithBench(starterIndex, benchIndex);
      commitRemembered();
      ui.selection = { type: "player", id: state.starters[starterIndex].id };
      commit();
      toast("Kadro değişti");
    });
    list.addEventListener("click", (event) => {
      const row = event.target.closest(".row");
      if (!row) return;
      const index = Number(row.dataset.index);
      const action = event.target.closest("button") && event.target.closest("button").dataset.action;
      if (action === "remove") {
        beginUndo();
        const removed = state.bench.splice(index, 1)[0];
        if (ui.selection && removed && ui.selection.id === removed.id) ui.selection = null;
        commitRemembered();
        commit();
        return;
      }
      if (action === "promote") {
        if (!ui.selection || ui.selection.type !== "player") {
          toast("Önce ilk 11'den bir oyuncu seç");
          return;
        }
        const starterIndex = state.starters.findIndex((player) => player.id === ui.selection.id);
        if (starterIndex < 0) {
          toast("Değişim için sahadaki kendi oyuncunu seç");
          return;
        }
        beginUndo();
        swapStarterWithBench(starterIndex, index);
        commitRemembered();
        ui.selection = { type: "player", id: state.starters[starterIndex].id };
        commit();
        return;
      }
      setSelection({ type: "player", id: row.dataset.id });
    });
  });

  els.overlay.addEventListener("dragover", (event) => event.preventDefault());
  els.overlay.addEventListener("drop", (event) => {
    event.preventDefault();
    const from = readDrag(event);
    if (!from || from.kind !== "bench") return;
    const hit = hitToken(localPoint(event));
    if (!hit || hit.type !== "player" || hit.team !== "home") {
      toast("Yedeği kendi oyuncunun üzerine bırak");
      return;
    }
    const starterIndex = state.starters.findIndex((player) => player.id === hit.id);
    if (starterIndex < 0) return;
    beginUndo();
    swapStarterWithBench(starterIndex, from.index);
    commitRemembered();
    ui.selection = { type: "player", id: state.starters[starterIndex].id };
    commit();
  });
}

function bindStatic() {
  fillFormations(els.formation);
  fillFormations(els.opponentFormation);
  fillRoles(els.addRole);

  els.teamName.addEventListener("focus", beginUndo);
  els.teamName.addEventListener("input", () => {
    state.teamName = els.teamName.value;
    renderLabels();
    scheduleSave();
  });
  els.teamName.addEventListener("change", commitRemembered);

  els.opponentName.addEventListener("focus", beginUndo);
  els.opponentName.addEventListener("input", () => {
    state.opponentName = els.opponentName.value;
    renderLabels();
    scheduleSave();
  });
  els.opponentName.addEventListener("change", commitRemembered);

  els.note.addEventListener("focus", beginUndo);
  els.note.addEventListener("input", () => {
    state.note = els.note.value;
    scheduleSave();
  });
  els.note.addEventListener("change", commitRemembered);

  els.formation.addEventListener("change", () => {
    beginUndo();
    state.formation = els.formation.value;
    placeList(state.starters, state.formation, "home", state.view, true);
    commitRemembered();
    commit();
  });

  els.opponentFormation.addEventListener("change", () => {
    beginUndo();
    state.opponentFormation = els.opponentFormation.value;
    placeList(state.opponents, state.opponentFormation, "away", "match", true);
    commitRemembered();
    commit();
  });

  els.showOpponent.addEventListener("change", () => {
    if (els.showOpponent.checked && state.view !== "match") {
      applyView("match");
      return;
    }
    state.showOpponent = els.showOpponent.checked;
    commit();
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => applyView(button.dataset.view));
  });

  document.querySelectorAll("[data-orient]").forEach((button) => {
    button.addEventListener("click", () => setOrientation(button.dataset.orient));
  });

  els.fullscreen.addEventListener("click", toggleBoardFullscreen);
  document.addEventListener("fullscreenchange", () => {
    requestAnimationFrame(() => {
      if (camera) {
        frameCamera();
        renderView();
      }
      updateToolUi();
    });
  });

  els.relayout.addEventListener("click", () => {
    beginUndo();
    placeList(state.starters, state.formation, "home", state.view, false);
    if (state.view === "match") placeList(state.opponents, state.opponentFormation, "away", "match", false);
    commitRemembered();
    commit();
    toast("Formasyon noktalarına dizildi");
  });

  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.tool = button.dataset.tool;
      ui.draft = null;
      updateToolUi();
    });
  });

  document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.drawColor = button.dataset.color;
      updateToolUi();
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-ball]").forEach((button) => {
    button.addEventListener("click", () => {
      const spot = ballPreset(button.dataset.ball);
      if (!spot) return;
      beginUndo();
      state.ball.x = spot.x;
      state.ball.y = spot.y;
      ui.selection = { type: "ball" };
      commitRemembered();
      commit();
    });
  });

  els.clearDrawings.addEventListener("click", () => {
    if (!state.drawings.length) return;
    beginUndo();
    state.drawings = [];
    commitRemembered();
    commit();
  });

  els.addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = els.addName.value.trim();
    if (!name) {
      toast("Oyuncu adı gerekli");
      return;
    }
    if (state.bench.length >= 20) {
      toast("Yedek sınırı doldu");
      return;
    }
    const number = clamp(Math.round(Number(els.addNumber.value) || nextNumber()), 1, 99);
    beginUndo();
    state.bench.push(makePlayer({
      name,
      number,
      role: els.addRole.value || "MO",
      x: 0.5,
      y: 0.5,
    }));
    els.addName.value = "";
    els.addNumber.value = String(clamp(number + 1, 1, 99));
    commitRemembered();
    commit();
    toast("Yedek eklendi");
  });

  els.undo.addEventListener("click", undo);
  els.redo.addEventListener("click", redo);
  els.save.addEventListener("click", () => {
    saveNow();
    toast("Tahta kaydedildi");
  });
  els.exportBtn.addEventListener("click", () => {
    syncDrawingAnchors();
    const blob = new Blob([JSON.stringify(persistable(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lotusboard-kadro.json";
    link.click();
    URL.revokeObjectURL(link.href);
    toast("Dosya indirildi");
  });
  els.importBtn.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", async () => {
    const file = els.importFile.files && els.importFile.files[0];
    els.importFile.value = "";
    if (!file) return;
    try {
      const next = sanitize(JSON.parse(await file.text()));
      if (!next) {
        toast("Dosya bu tahtaya uymuyor");
        return;
      }
      beginUndo();
      state = next;
      commitRemembered();
      ui.selection = null;
      syncControls();
      if (camera) frameCamera();
      commit();
      toast("Kadro yüklendi");
    } catch (err) {
      toast("Dosya okunamadı");
    }
  });
  els.reset.addEventListener("click", () => {
    if (!window.confirm("Kadro, diziliş ve çizimler silinip varsayılan tahta gelsin mi?")) return;
    beginUndo();
    state = createDefault();
    commitRemembered();
    ui.selection = null;
    ui.zoom = 1;
    ui.panX = 0;
    ui.panZ = 0;
    syncControls();
    if (camera) frameCamera();
    commit();
    toast("Tahta sıfırlandı");
  });

  els.overlay.addEventListener("pointerleave", () => {
    if (ui.hoverId) {
      ui.hoverId = null;
      renderTokens();
    }
  });
  els.overlay.addEventListener("pointerdown", onPointerDown);
  els.overlay.addEventListener("pointermove", onPointerMove);
  els.overlay.addEventListener("pointerup", onPointerUp);
  els.overlay.addEventListener("pointercancel", onPointerUp);
  els.overlay.addEventListener("contextmenu", (event) => event.preventDefault());
  els.overlay.addEventListener("wheel", onWheel, { passive: false });

  els.zoomIn.addEventListener("click", () => {
    ui.zoom = clamp(ui.zoom * 1.12, 0.9, 2.8);
    frameCamera();
    renderView();
  });
  els.zoomOut.addEventListener("click", () => {
    ui.zoom = clamp(ui.zoom / 1.12, 0.9, 2.8);
    frameCamera();
    renderView();
  });
  els.zoomReset.addEventListener("click", () => {
    ui.zoom = 1;
    ui.panX = 0;
    ui.panZ = 0;
    frameCamera();
    renderView();
  });

  window.addEventListener("keydown", (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      if (event.key === "Escape") document.activeElement.blur();
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
      spaceDown = true;
      updateToolUi();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !event.shiftKey) {
      event.preventDefault();
      undo();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))) {
      event.preventDefault();
      redo();
      return;
    }
    const tools = { v: "move", p: "pass", k: "run", b: "zone", e: "erase" };
    const tool = tools[event.key.toLowerCase()];
    if (tool) {
      ui.tool = tool;
      ui.draft = null;
      updateToolUi();
    }
    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      toggleBoardFullscreen();
      return;
    }
    if (event.key === "Escape") {
      if (document.fullscreenElement || els.board.classList.contains("is-fullscreen")) {
        if (els.board.classList.contains("is-fullscreen")) {
          els.board.classList.remove("is-fullscreen");
          frameCamera();
          renderView();
          updateToolUi();
        }
        return;
      }
      ui.draft = null;
      ui.selection = null;
      renderInspector();
      renderLists();
      renderView();
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      spaceDown = false;
      updateToolUi();
    }
  });

  bindLists();
}

function setOrientation(orientation) {
  if (orientation !== "horizontal" && orientation !== "vertical") return;
  state.orientation = orientation;
  ui.zoom = 1;
  ui.panX = 0;
  ui.panZ = 0;
  if (camera) frameCamera();
  renderLabels();
  updateToolUi();
  renderView();
  scheduleSave();
}

async function toggleBoardFullscreen() {
  const node = els.board;
  if (document.fullscreenElement === node) {
    await document.exitFullscreen();
    return;
  }
  if (node.classList.contains("is-fullscreen")) {
    node.classList.remove("is-fullscreen");
    frameCamera();
    renderView();
    updateToolUi();
    return;
  }
  try {
    await node.requestFullscreen();
  } catch (err) {
    node.classList.add("is-fullscreen");
    frameCamera();
    renderView();
    updateToolUi();
  }
}

function applyView(view) {
  beginUndo();
  state.view = view;
  state.showOpponent = view === "match";
  placeList(state.starters, state.formation, "home", state.view, false);
  if (view === "match") placeList(state.opponents, state.opponentFormation, "away", "match", false);
  commitRemembered();
  commit();
}

function cacheElements() {
  els.root = $("pitch-root");
  els.draw = $("draw-layer");
  els.tokens = $("token-layer");
  els.overlay = $("board-overlay");
  els.squad = $("squad-list");
  els.bench = $("bench-list");
  els.benchCount = $("bench-count");
  els.inspector = $("inspector");
  els.teamName = $("team-name");
  els.opponentName = $("opponent-name");
  els.formation = $("formation");
  els.opponentFormation = $("opponent-formation");
  els.showOpponent = $("show-opponent");
  els.note = $("note");
  els.drawingCount = $("drawing-count");
  els.addForm = $("add-form");
  els.addName = $("add-name");
  els.addNumber = $("add-number");
  els.addRole = $("add-role");
  els.undo = $("undo-btn");
  els.redo = $("redo-btn");
  els.save = $("save-btn");
  els.exportBtn = $("export-btn");
  els.importBtn = $("import-btn");
  els.importFile = $("import-file");
  els.reset = $("reset-btn");
  els.saveState = $("save-state");
  els.clearDrawings = $("clear-drawings");
  els.relayout = $("relayout-btn");
  els.zoomIn = $("zoom-in");
  els.zoomOut = $("zoom-out");
  els.zoomReset = $("zoom-reset");
  els.homeLabel = $("home-label");
  els.awayLabel = $("away-label");
  els.board = $("board-section");
  els.fullscreen = $("fullscreen-btn");
}

function boot() {
  cacheElements();
  ui = {
    tool: "move",
    selection: null,
    mode: null,
    drag: null,
    draft: null,
    snapId: null,
    hoverId: null,
    moved: false,
    last: null,
    zoom: 1,
    panX: 0,
    panZ: 0,
  };
  state = loadState();
  bindStatic();
  syncControls();
  initPitch();
  commit();
  updateHistoryButtons();
}

boot();
