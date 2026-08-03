const VIEW_W = 960;
const VIEW_H = 540;
const PLAYER_W = 32;
const PLAYER_H = 46;
const STORAGE_KEY = "canopy-run-progress-v2";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const padLevel = (index) => String(index + 1).padStart(2, "0");

const platform = (x, y, w, type = "branch", extra = {}) => ({
  x,
  y,
  w,
  h: type === "ground" ? 86 : 18,
  type,
  ...extra,
});
const thorns = (x, y, w) => ({ x, y, w, h: 20 });
const firefly = (x, y) => ({ x, y });
const beetle = (x, y, min, max, flying = false) => ({ x, y, min, max, flying });

const LEVELS = [
  {
    id: "acorn-trail",
    name: "Acorn Trail",
    difficulty: "Gentle",
    tagline: "Pip's first climb.",
    description: "Warm roots, wide branches, and room to learn the ropes.",
    intro: "Find the lost fireflies and follow the lantern gate through Acorn Trail.",
    worldWidth: 2550,
    goalX: 2440,
    start: { x: 78, y: 424 },
    checkpoint: { x: 1320, y: 424 },
    palette: {
      skyTop: "#e7efe3",
      skyBottom: "#bdd3bf",
      far: "#a9c3aa",
      mid: "#7f9f83",
      leaf: "#527b62",
      leafDark: "#315747",
      wood: "#76573a",
      woodLight: "#9a744c",
      grass: "#4d7b5c",
      glow: "#f0b54c",
    },
    platforms: [
      platform(0, 470, 560, "ground"),
      platform(480, 392, 118),
      platform(610, 338, 112),
      platform(720, 470, 400, "ground"),
      platform(1015, 390, 125),
      platform(1152, 326, 112),
      platform(1240, 470, 470, "ground"),
      platform(1630, 390, 120),
      platform(1770, 337, 128),
      platform(1900, 470, 650, "ground"),
      platform(2070, 385, 116),
    ],
    hazards: [
      thorns(335, 450, 64),
      thorns(815, 450, 54),
      thorns(1470, 450, 70),
      thorns(2205, 450, 72),
    ],
    fireflies: [
      firefly(235, 405),
      firefly(658, 286),
      firefly(1080, 338),
      firefly(1540, 398),
      firefly(1835, 283),
      firefly(2150, 335),
    ],
    enemies: [beetle(900, 442, 885, 1020), beetle(2015, 442, 1980, 2150)],
  },
  {
    id: "mossy-heights",
    name: "Mossy Heights",
    difficulty: "Brisk",
    tagline: "The branches start to move.",
    description: "Swinging limbs and moss-slick gaps. Your new air dash will carry you.",
    intro: "Pip learned Air Dash! Cross the moving limbs and keep one dash ready for the long gaps.",
    worldWidth: 3240,
    goalX: 3130,
    start: { x: 72, y: 424 },
    checkpoint: { x: 1650, y: 424 },
    palette: {
      skyTop: "#dcebe3",
      skyBottom: "#9fc4b3",
      far: "#87ad9a",
      mid: "#5f8c73",
      leaf: "#396e54",
      leafDark: "#234f3c",
      wood: "#69523a",
      woodLight: "#8b704d",
      grass: "#3f7657",
      glow: "#f2bc4f",
    },
    platforms: [
      platform(0, 470, 500, "ground"),
      platform(520, 395, 104, "moving", { axis: "y", range: 55, speed: 1.45, phase: 0.2 }),
      platform(675, 330, 105),
      platform(820, 470, 390, "ground"),
      platform(1215, 390, 105, "moving", { axis: "x", range: 76, speed: 1.25, phase: 1.1 }),
      platform(1390, 335, 104),
      platform(1530, 470, 390, "ground"),
      platform(1830, 385, 92, "crumble"),
      platform(1960, 325, 104, "crumble"),
      platform(2095, 470, 340, "ground"),
      platform(2420, 372, 104, "moving", { axis: "y", range: 70, speed: 1.7, phase: 2.4 }),
      platform(2570, 315, 104),
      platform(2730, 470, 510, "ground"),
      platform(2885, 375, 110),
    ],
    hazards: [
      thorns(290, 450, 74),
      thorns(920, 450, 82),
      thorns(1670, 450, 74),
      thorns(2190, 450, 70),
      thorns(2855, 450, 66),
    ],
    fireflies: [
      firefly(280, 405),
      firefly(570, 310),
      firefly(730, 276),
      firefly(1270, 315),
      firefly(1740, 392),
      firefly(2010, 270),
      firefly(2490, 280),
    ],
    enemies: [
      beetle(990, 442, 960, 1110),
      beetle(1720, 442, 1650, 1810),
      beetle(2290, 442, 2160, 2345),
      beetle(2630, 270, 2520, 2685, true),
    ],
  },
  {
    id: "firefly-hollow",
    name: "Firefly Hollow",
    difficulty: "Tricky",
    tagline: "Trust the glow.",
    description: "A moonlit hollow of vanishing footholds and watchful moths.",
    intro: "The hollow keeps its paths in shadow. Follow the fireflies, and don't linger on cracked bark.",
    worldWidth: 3560,
    goalX: 3450,
    start: { x: 72, y: 424 },
    checkpoint: { x: 1780, y: 424 },
    palette: {
      skyTop: "#1d3638",
      skyBottom: "#34584e",
      far: "#2b4b45",
      mid: "#1e3e37",
      leaf: "#234c3d",
      leafDark: "#132d28",
      wood: "#4d4033",
      woodLight: "#705940",
      grass: "#34674e",
      glow: "#f4c85c",
    },
    platforms: [
      platform(0, 470, 470, "ground"),
      platform(470, 390, 98, "crumble"),
      platform(610, 325, 102, "crumble"),
      platform(755, 390, 112, "moving", { axis: "y", range: 58, speed: 1.6, phase: 0.5 }),
      platform(900, 470, 390, "ground"),
      platform(1210, 380, 100),
      platform(1340, 320, 94, "crumble"),
      platform(1475, 370, 100, "moving", { axis: "x", range: 82, speed: 1.5, phase: 1.7 }),
      platform(1670, 470, 430, "ground"),
      platform(2040, 380, 90, "crumble"),
      platform(2170, 310, 104, "crumble"),
      platform(2320, 365, 105, "moving", { axis: "y", range: 74, speed: 1.82, phase: 2.2 }),
      platform(2480, 470, 350, "ground"),
      platform(2780, 378, 100),
      platform(2905, 310, 105, "moving", { axis: "x", range: 62, speed: 1.85, phase: 0.8 }),
      platform(3060, 470, 500, "ground"),
    ],
    hazards: [
      thorns(240, 450, 68),
      thorns(1020, 450, 76),
      thorns(1805, 450, 90),
      thorns(2600, 450, 76),
      thorns(3250, 450, 90),
    ],
    fireflies: [
      firefly(190, 390),
      firefly(520, 330),
      firefly(660, 270),
      firefly(1248, 325),
      firefly(1530, 305),
      firefly(1870, 395),
      firefly(2220, 255),
      firefly(2945, 245),
    ],
    enemies: [
      beetle(1050, 442, 980, 1180),
      beetle(1410, 258, 1320, 1510, true),
      beetle(1870, 442, 1780, 1980),
      beetle(2390, 270, 2260, 2425, true),
      beetle(2680, 442, 2560, 2750),
      beetle(3180, 385, 3100, 3310, true),
    ],
  },
  {
    id: "storm-crown",
    name: "Storm Crown",
    difficulty: "Expert",
    tagline: "Claim the canopy.",
    description: "Fast limbs, sharp thorns, and one last climb beneath a summer storm.",
    intro: "The crown is close. Chain every move, trust Pip's dash, and light the oldest lantern in the forest.",
    worldWidth: 4140,
    goalX: 4030,
    start: { x: 72, y: 424 },
    checkpoint: { x: 2100, y: 424 },
    palette: {
      skyTop: "#607c87",
      skyBottom: "#9db7b6",
      far: "#718e8c",
      mid: "#4f716a",
      leaf: "#345f50",
      leafDark: "#203f37",
      wood: "#564638",
      woodLight: "#7b6146",
      grass: "#3a6b51",
      glow: "#f3c34d",
    },
    platforms: [
      platform(0, 470, 460, "ground"),
      platform(455, 378, 96, "moving", { axis: "x", range: 56, speed: 1.75, phase: 0.2 }),
      platform(610, 308, 96, "crumble"),
      platform(760, 390, 96, "moving", { axis: "y", range: 75, speed: 1.9, phase: 1.3 }),
      platform(910, 470, 350, "ground"),
      platform(1190, 370, 96, "crumble"),
      platform(1325, 305, 95, "moving", { axis: "x", range: 70, speed: 1.9, phase: 2.1 }),
      platform(1495, 365, 94, "crumble"),
      platform(1650, 470, 380, "ground"),
      platform(1980, 385, 95, "moving", { axis: "y", range: 72, speed: 2.05, phase: 0.8 }),
      platform(2140, 470, 350, "ground"),
      platform(2430, 370, 90, "crumble"),
      platform(2575, 300, 94, "moving", { axis: "x", range: 78, speed: 2.1, phase: 2.8 }),
      platform(2740, 380, 90, "crumble"),
      platform(2895, 470, 335, "ground"),
      platform(3175, 365, 96, "moving", { axis: "y", range: 68, speed: 2.15, phase: 1.7 }),
      platform(3340, 298, 94, "crumble"),
      platform(3500, 370, 96, "moving", { axis: "x", range: 72, speed: 2.2, phase: 0.4 }),
      platform(3660, 470, 480, "ground"),
    ],
    hazards: [
      thorns(260, 450, 76),
      thorns(1020, 450, 82),
      thorns(1770, 450, 90),
      thorns(2240, 450, 82),
      thorns(3000, 450, 84),
      thorns(3805, 450, 82),
    ],
    fireflies: [
      firefly(205, 395),
      firefly(500, 315),
      firefly(658, 250),
      firefly(980, 385),
      firefly(1368, 245),
      firefly(1810, 392),
      firefly(2210, 390),
      firefly(2615, 240),
      firefly(3390, 235),
    ],
    enemies: [
      beetle(1040, 442, 980, 1160),
      beetle(1380, 245, 1260, 1470, true),
      beetle(1810, 442, 1730, 1940),
      beetle(2300, 442, 2200, 2410),
      beetle(2780, 290, 2650, 2860, true),
      beetle(3080, 442, 2970, 3160),
      beetle(3450, 250, 3340, 3560, true),
      beetle(3840, 442, 3740, 3940),
    ],
  },
];

const RANKS = [
  { min: 0, max: 300, name: "Seedling", level: 1 },
  { min: 300, max: 600, name: "Branch Scout", level: 2 },
  { min: 600, max: 900, name: "Trail Ranger", level: 3 },
  { min: 900, max: 1200, name: "Canopy Keeper", level: 4 },
];

const canvas = $("#game-canvas");
const context = canvas.getContext("2d");
if (!context) throw new Error("Canvas rendering is unavailable in this browser.");

const dom = {
  overlay: $("#game-overlay"),
  overlayLevel: $("#overlay-level"),
  overlayDifficulty: $("#overlay-difficulty"),
  overlayTitle: $("#overlay-title"),
  overlayBody: $("#overlay-body"),
  overlayPrimary: $("#overlay-primary"),
  overlaySecondary: $("#overlay-secondary"),
  overlayResult: $("#overlay-result"),
  resultTime: $("#result-time"),
  resultFireflies: $("#result-fireflies"),
  resultMedal: $("#result-medal"),
  hudLevelNumber: $("#hud-level-number"),
  hudLevelName: $("#hud-level-name"),
  hudTime: $("#hud-time"),
  hudFireflies: $("#hud-fireflies"),
  hudFirefliesTotal: $("#hud-fireflies-total"),
  hudDash: $("#hud-dash"),
  rankName: $("#rank-name"),
  rankLevel: $("#rank-level"),
  xpLabel: $("#xp-label"),
  xpProgress: $("#xp-progress"),
  xpHint: $("#xp-hint"),
  routeNumber: $("#route-number"),
  routeName: $("#route-name"),
  routeDifficulty: $("#route-difficulty"),
  routeDescription: $("#route-description"),
  bestTime: $("#best-time"),
  bestMedal: $("#best-medal"),
  newRun: $("#new-run"),
  pauseRun: $("#pause-run"),
  soundToggle: $("#sound-toggle"),
  announcement: $("#game-announcement"),
  toast: $("#game-toast"),
};

let pixelRatio = 1;
let progress = loadProgress();
let selectedLevel = clamp(progress.unlocked - 1, 0, LEVELS.length - 1);
let audioContext = null;
let animationFrame = 0;
let previousFrame = performance.now();
let ambientTime = 0;
let toastTimer = 0;

const input = {
  left: false,
  right: false,
  jumpHeld: false,
  jumpQueued: false,
  dashQueued: false,
};

let state = makeState(selectedLevel, "ready");

function loadProgress() {
  const fallback = {
    unlocked: 1,
    records: LEVELS.map(() => null),
    sound: true,
  };
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || typeof stored !== "object") return fallback;
    const records = LEVELS.map((_, index) => {
      const record = stored.records?.[index];
      if (!record) return null;
      return {
        time: Number.isFinite(Number(record.time)) ? Number(record.time) : null,
        fireflies: clamp(Number(record.fireflies) || 0, 0, LEVELS[index].fireflies.length),
        medal: clamp(Number(record.medal) || 0, 0, 3),
      };
    });
    return {
      unlocked: clamp(Number(stored.unlocked) || 1, 1, LEVELS.length),
      records,
      sound: stored.sound !== false,
    };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The game stays fully playable when storage is unavailable.
  }
}

function totalXp() {
  return progress.records.reduce((sum, record) => sum + (record?.medal || 0) * 100, 0);
}

function currentRank() {
  const xp = totalXp();
  return RANKS.find((rank) => xp < rank.max) || RANKS[RANKS.length - 1];
}

function makeState(levelIndex, phase = "ready") {
  const level = LEVELS[levelIndex];
  return {
    phase,
    levelIndex,
    level,
    player: {
      x: level.start.x,
      y: level.start.y,
      previousY: level.start.y,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: true,
      airJumps: 1,
      coyote: 0.1,
      jumpBuffer: 0,
      dashReady: canDash(),
      dashTime: 0,
      landing: 0,
      runTime: 0,
      hurtTime: 0,
      invulnerable: 0,
    },
    platforms: level.platforms.map((item) => ({
      ...item,
      baseX: item.x,
      baseY: item.y,
      previousX: item.x,
      previousPlatformY: item.y,
      crumbleTimer: -1,
      fallen: false,
    })),
    hazards: level.hazards.map((item) => ({ ...item })),
    fireflies: level.fireflies.map((item, index) => ({ ...item, index, active: true, phase: index * 0.83 })),
    enemies: level.enemies.map((item, index) => ({
      ...item,
      baseY: item.y,
      direction: index % 2 ? -1 : 1,
      active: true,
      phase: index * 0.73,
    })),
    particles: [],
    lives: 3,
    collected: 0,
    deaths: 0,
    elapsed: 0,
    cameraX: 0,
    checkpointActive: false,
    checkpointX: level.start.x,
    checkpointY: level.start.y,
    screenShake: 0,
    metricTimer: 0,
    completionMedal: 0,
  };
}

function canDash() {
  return progress.unlocked >= 2;
}

function setupCanvas() {
  pixelRatio = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(VIEW_W * pixelRatio);
  canvas.height = Math.round(VIEW_H * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.imageSmoothingEnabled = true;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;
}

function medalString(count) {
  return "●".repeat(count) + "○".repeat(Math.max(0, 3 - count));
}

function calculateMedal(collected, total) {
  if (collected >= total) return 3;
  if (collected >= Math.ceil(total * 0.6)) return 2;
  return 1;
}

function updateInterface() {
  const level = LEVELS[selectedLevel];
  const record = progress.records[selectedLevel];
  const xp = totalXp();
  const rank = currentRank();
  const progressWithinRank = rank.max === rank.min ? 1 : (xp - rank.min) / (rank.max - rank.min);

  dom.routeNumber.textContent = padLevel(selectedLevel);
  dom.routeName.textContent = level.name;
  dom.routeDifficulty.textContent = level.difficulty;
  dom.routeDescription.textContent = level.description;
  dom.bestTime.textContent = record?.time ? formatTime(record.time) : "—";
  dom.bestMedal.textContent = medalString(record?.medal || 0);
  dom.hudLevelNumber.textContent = padLevel(selectedLevel);
  dom.hudLevelName.textContent = level.name;
  dom.hudFirefliesTotal.textContent = level.fireflies.length;

  dom.rankName.textContent = rank.name;
  dom.rankLevel.textContent = `Lv. ${rank.level}`;
  dom.xpLabel.textContent = `${xp} / ${rank.max} XP`;
  dom.xpProgress.style.width = `${clamp(progressWithinRank * 100, 0, 100)}%`;
  dom.xpHint.textContent = xp >= 1200 ? "Every route is glowing. Pip made it!" : "Earn route medals to help Pip grow.";

  $$(".route-card").forEach((card, index) => {
    const unlocked = index < progress.unlocked;
    const routeRecord = progress.records[index];
    const status = card.querySelector(".route-status");
    const recordMedal = card.querySelector(".route-record b");
    const recordTime = card.querySelector(".route-record em");
    card.disabled = !unlocked;
    card.classList.toggle("locked", !unlocked);
    card.classList.toggle("selected", index === selectedLevel);
    status.textContent = !unlocked ? "Locked" : routeRecord ? "Cleared" : "Ready";
    recordMedal.textContent = medalString(routeRecord?.medal || 0);
    recordTime.textContent = !unlocked
      ? `Finish route ${padLevel(index - 1)}`
      : routeRecord?.time
        ? `Best ${formatTime(routeRecord.time)}`
        : "Best —";
  });

  updateHud();
}

function updateHud() {
  dom.hudTime.textContent = formatTime(state.elapsed) === "—" ? "0:00.0" : formatTime(state.elapsed);
  dom.hudFireflies.textContent = state.collected;

  const dashLabel = dom.hudDash.querySelector("b");
  dom.hudDash.classList.remove("ready", "spent", "locked");
  if (!canDash()) {
    dom.hudDash.classList.add("locked");
    dashLabel.textContent = "Dash locked";
  } else if (state.player.dashReady) {
    dom.hudDash.classList.add("ready");
    dashLabel.textContent = "Dash ready";
  } else {
    dom.hudDash.classList.add("spent");
    dashLabel.textContent = "Dash spent";
  }
}

function setOverlay(kind) {
  const level = state.level;
  dom.overlay.classList.remove("hidden");
  dom.overlayLevel.textContent = `Route ${padLevel(state.levelIndex)}`;
  dom.overlayDifficulty.textContent = level.difficulty;
  dom.overlayResult.hidden = true;
  dom.overlaySecondary.hidden = true;

  if (kind === "ready") {
    dom.overlayTitle.textContent = level.tagline;
    dom.overlayBody.textContent = level.intro;
    dom.overlayPrimary.innerHTML = `Start route <span aria-hidden="true">→</span>`;
  } else if (kind === "paused") {
    dom.overlayTitle.textContent = "Pip is catching a breath.";
    dom.overlayBody.textContent = "The route and the clock are paused. Jump back in whenever you're ready.";
    dom.overlayPrimary.innerHTML = `Keep running <span aria-hidden="true">→</span>`;
  } else if (kind === "gameover") {
    dom.overlayTitle.textContent = "A muddy landing.";
    dom.overlayBody.textContent = "Pip is okay. Read the branch rhythm, save a dash for the gaps, and try the route again.";
    dom.overlayPrimary.innerHTML = `Try again <span aria-hidden="true">↻</span>`;
    dom.overlaySecondary.hidden = false;
  } else if (kind === "complete") {
    const isLast = state.levelIndex === LEVELS.length - 1;
    dom.overlayTitle.textContent = isLast ? "The crown is glowing!" : "Lantern lit. Route clear.";
    dom.overlayBody.textContent = isLast
      ? "Pip reached the oldest lantern in the forest. Replay the routes to complete every medal."
      : `${LEVELS[Math.min(state.levelIndex + 1, LEVELS.length - 1)].name} is now open. Pip's trail continues.`;
    dom.resultTime.textContent = formatTime(state.elapsed);
    dom.resultFireflies.textContent = `${state.collected}/${level.fireflies.length}`;
    dom.resultMedal.textContent = medalString(state.completionMedal);
    dom.overlayResult.hidden = false;
    dom.overlayPrimary.innerHTML = isLast
      ? `Run it again <span aria-hidden="true">↻</span>`
      : `Next route <span aria-hidden="true">→</span>`;
    dom.overlaySecondary.hidden = false;
  }
}

function hideOverlay() {
  dom.overlay.classList.add("hidden");
}

function selectLevel(index, scrollToGame = false) {
  if (index < 0 || index >= progress.unlocked || index >= LEVELS.length) return;
  selectedLevel = index;
  state = makeState(index, "ready");
  clearInput();
  setOverlay("ready");
  dom.pauseRun.disabled = true;
  dom.pauseRun.firstChild.textContent = "Pause ";
  updateInterface();
  announce(`${LEVELS[index].name} selected.`);
  if (scrollToGame) {
    $("#play").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function startRun() {
  state = makeState(selectedLevel, "playing");
  clearInput();
  hideOverlay();
  dom.pauseRun.disabled = false;
  dom.pauseRun.firstChild.textContent = "Pause ";
  updateInterface();
  canvas.focus({ preventScroll: true });
  tone(440, 0.07, 0.035);
  announce(`${state.level.name} started. Three hearts remaining.`);
}

function togglePause() {
  if (state.phase === "playing") {
    state.phase = "paused";
    clearInput();
    dom.pauseRun.firstChild.textContent = "Resume ";
    setOverlay("paused");
    announce("Run paused.");
  } else if (state.phase === "paused") {
    state.phase = "playing";
    dom.pauseRun.firstChild.textContent = "Pause ";
    hideOverlay();
    canvas.focus({ preventScroll: true });
    announce("Run resumed.");
  }
}

function finishLevel() {
  if (state.phase !== "playing") return;
  state.phase = "complete";
  state.completionMedal = calculateMedal(state.collected, state.fireflies.length);
  const oldRecord = progress.records[state.levelIndex];
  progress.records[state.levelIndex] = {
    time: !oldRecord?.time ? state.elapsed : Math.min(oldRecord.time, state.elapsed),
    fireflies: Math.max(oldRecord?.fireflies || 0, state.collected),
    medal: Math.max(oldRecord?.medal || 0, state.completionMedal),
  };
  const unlockedBefore = progress.unlocked;
  progress.unlocked = Math.max(progress.unlocked, Math.min(LEVELS.length, state.levelIndex + 2));
  saveProgress();
  burst(state.player.x + 16, state.player.y + 8, state.level.palette.glow, 42, 250, true);
  burst(state.level.goalX + 30, 285, "#fff4bd", 30, 210, false);
  tone(660, 0.12, 0.045);
  window.setTimeout(() => tone(880, 0.18, 0.04), 120);
  if (progress.unlocked > unlockedBefore && state.levelIndex === 0) {
    showToast("New move unlocked: Air Dash — press X or Shift");
  }
  setOverlay("complete");
  dom.pauseRun.disabled = true;
  updateInterface();
  announce(`${state.level.name} complete in ${formatTime(state.elapsed)} with a ${state.completionMedal} medal.`);
}

function chooseNextLevel() {
  if (state.phase === "complete" && state.levelIndex < LEVELS.length - 1) {
    selectLevel(state.levelIndex + 1);
    startRun();
  } else {
    startRun();
  }
}

function clearInput() {
  input.left = false;
  input.right = false;
  input.jumpHeld = false;
  input.jumpQueued = false;
  input.dashQueued = false;
}

function announce(message) {
  dom.announcement.textContent = message;
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => dom.toast.classList.remove("visible"), 2800);
}

function tone(frequency, duration = 0.08, gain = 0.03, type = "triangle") {
  if (!progress.sound) return;
  try {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return;
    audioContext ||= new AudioEngine();
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    volume.gain.setValueAtTime(gain, audioContext.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(volume).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch {
    // Sound is an optional layer.
  }
}

function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function playerHitbox() {
  return {
    x: state.player.x + 5,
    y: state.player.y + 4,
    w: PLAYER_W - 10,
    h: PLAYER_H - 7,
  };
}

function burst(x, y, color, count = 10, speed = 130, square = false) {
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.65;
    const velocity = speed * (0.35 + Math.random() * 0.75);
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 42,
      life: 0.4 + Math.random() * 0.55,
      maxLife: 0.95,
      color,
      size: 2 + Math.random() * 5,
      square,
    });
  }
  if (state.particles.length > 280) state.particles.splice(0, state.particles.length - 280);
}

function resetPlatforms() {
  state.platforms.forEach((item) => {
    item.x = item.baseX;
    item.y = item.baseY;
    item.previousX = item.baseX;
    item.previousPlatformY = item.baseY;
    item.crumbleTimer = -1;
    item.fallen = false;
  });
}

function hurtPlayer() {
  const player = state.player;
  if (state.phase !== "playing" || player.invulnerable > 0) return;

  state.lives -= 1;
  state.deaths += 1;
  state.screenShake = 14;
  burst(player.x + PLAYER_W / 2, player.y + PLAYER_H / 2, "#d8664e", 18, 220, true);
  tone(118, 0.2, 0.055, "sawtooth");

  if (state.lives <= 0) {
    state.phase = "gameover";
    player.hurtTime = 1;
    dom.pauseRun.disabled = true;
    setOverlay("gameover");
    announce("No hearts left. Try the route again.");
    updateHud();
    return;
  }

  Object.assign(player, {
    x: state.checkpointX,
    y: state.checkpointY,
    previousY: state.checkpointY,
    vx: 0,
    vy: 0,
    onGround: true,
    airJumps: 1,
    dashReady: canDash(),
    dashTime: 0,
    landing: 0,
    hurtTime: 0.45,
    invulnerable: 1.6,
  });
  state.cameraX = Math.max(0, player.x - 250);
  resetPlatforms();
  showToast(`${state.lives} ${state.lives === 1 ? "heart" : "hearts"} left`);
  announce(`${state.lives} hearts remaining.`);
}

function updateMovingPlatforms(dt) {
  state.platforms.forEach((item) => {
    item.previousX = item.x;
    item.previousPlatformY = item.y;
    if (item.type === "moving") {
      const offset = Math.sin(state.elapsed * item.speed + item.phase) * item.range;
      item.x = item.baseX + (item.axis === "x" ? offset : 0);
      item.y = item.baseY + (item.axis === "y" ? offset : 0);
    } else if (item.type === "crumble" && item.crumbleTimer >= 0 && !item.fallen) {
      item.crumbleTimer -= dt;
      if (item.crumbleTimer <= 0) {
        item.fallen = true;
        burst(item.x + item.w / 2, item.y + 8, state.level.palette.woodLight, 12, 105, true);
        tone(145, 0.08, 0.025, "square");
      }
    }
  });
}

function updatePlayer(dt) {
  const player = state.player;
  player.previousY = player.y;
  player.invulnerable = Math.max(0, player.invulnerable - dt);
  player.hurtTime = Math.max(0, player.hurtTime - dt);
  player.landing = Math.max(0, player.landing - dt);
  player.coyote = player.onGround ? 0.105 : Math.max(0, player.coyote - dt);
  player.jumpBuffer = input.jumpQueued ? 0.14 : Math.max(0, player.jumpBuffer - dt);
  input.jumpQueued = false;

  const direction = Number(input.right) - Number(input.left);
  if (direction) player.facing = direction;

  if (input.dashQueued && canDash() && player.dashReady && player.dashTime <= 0) {
    player.dashReady = false;
    player.dashTime = 0.17;
    player.vx = player.facing * 720;
    player.vy = 0;
    state.screenShake = 4;
    burst(player.x + PLAYER_W / 2, player.y + PLAYER_H / 2, "#8fc3a7", 10, 150, true);
    tone(240, 0.09, 0.04, "square");
  }
  input.dashQueued = false;

  if (player.dashTime > 0) {
    player.dashTime -= dt;
    player.vx = player.facing * 720;
    player.vy = 0;
    if (Math.random() < 0.82) {
      state.particles.push({
        x: player.x + PLAYER_W / 2 - player.facing * 18,
        y: player.y + PLAYER_H / 2 + (Math.random() - 0.5) * 14,
        vx: -player.facing * 55,
        vy: (Math.random() - 0.5) * 20,
        life: 0.24,
        maxLife: 0.24,
        color: "#a8d2b9",
        size: 5 + Math.random() * 4,
        square: false,
      });
    }
  } else {
    if (direction) {
      player.vx += direction * (player.onGround ? 2350 : 1380) * dt;
    } else {
      player.vx *= (player.onGround ? 0.0008 : 0.15) ** dt;
    }
    player.vx = clamp(player.vx, -325, 325);

    if (player.jumpBuffer > 0 && (player.coyote > 0 || player.airJumps > 0)) {
      const isAirJump = player.coyote <= 0;
      if (isAirJump) player.airJumps -= 1;
      player.vy = -660;
      player.onGround = false;
      player.coyote = 0;
      player.jumpBuffer = 0;
      burst(player.x + PLAYER_W / 2, player.y + PLAYER_H, "#c8ddca", 9, 100, false);
      tone(isAirJump ? 530 : 430, 0.07, 0.032);
    }

    const jumpGravity = input.jumpHeld && player.vy < 0 ? 0.56 : 1;
    player.vy = Math.min(980, player.vy + 1950 * jumpGravity * dt);
  }

  player.runTime += dt * (4.8 + Math.abs(player.vx) / 34);
  const wasGrounded = player.onGround;
  player.x = clamp(player.x + player.vx * dt, 0, state.level.worldWidth - PLAYER_W);
  player.y += player.vy * dt;
  player.onGround = false;

  const previousBottom = player.previousY + PLAYER_H;
  const currentBottom = player.y + PLAYER_H;
  for (const item of state.platforms) {
    if (item.fallen) continue;
    const horizontalOverlap = player.x + PLAYER_W > item.x + 3 && player.x < item.x + item.w - 3;
    const landed =
      player.vy >= 0 &&
      horizontalOverlap &&
      previousBottom <= item.y + 9 &&
      currentBottom >= item.y &&
      currentBottom <= item.y + 40;
    if (!landed) continue;

    player.y = item.y - PLAYER_H;
    player.vy = 0;
    player.onGround = true;
    player.airJumps = 1;
    player.dashReady = canDash();
    if (item.type === "moving") {
      player.x += item.x - item.previousX;
      player.y += item.y - item.previousPlatformY;
    }
    if (item.type === "crumble" && item.crumbleTimer < 0) item.crumbleTimer = 0.62;
    if (!wasGrounded) {
      player.landing = 0.18;
      burst(player.x + PLAYER_W / 2, player.y + PLAYER_H, "#89a78c", 7, 70, false);
      tone(165, 0.035, 0.016);
    }
    break;
  }

  const hitbox = playerHitbox();
  for (const hazard of state.hazards) {
    if (intersects(hitbox, hazard)) {
      hurtPlayer();
      return;
    }
  }

  for (const item of state.fireflies) {
    if (!item.active) continue;
    const dx = player.x + PLAYER_W / 2 - item.x;
    const dy = player.y + PLAYER_H / 2 - item.y;
    if (dx * dx + dy * dy < 34 * 34) {
      item.active = false;
      state.collected += 1;
      burst(item.x, item.y, state.level.palette.glow, 12, 145, false);
      tone(690 + state.collected * 22, 0.07, 0.035);
      if (state.collected === state.fireflies.length) showToast("Every firefly found — full medal ready!");
      updateHud();
    }
  }

  for (const enemy of state.enemies) {
    if (!enemy.active) continue;
    enemy.x += enemy.direction * (enemy.flying ? 112 : 84) * dt;
    if (enemy.flying) enemy.y = enemy.baseY + Math.sin(state.elapsed * 3.8 + enemy.phase) * 24;
    if (enemy.x < enemy.min || enemy.x > enemy.max) {
      enemy.direction *= -1;
      enemy.x = clamp(enemy.x, enemy.min, enemy.max);
    }
    const enemyBox = enemy.flying
      ? { x: enemy.x - 16, y: enemy.y - 11, w: 32, h: 23 }
      : { x: enemy.x, y: enemy.y, w: 31, h: 28 };
    if (!intersects(hitbox, enemyBox)) continue;
    if (player.vy > 90 && previousBottom <= enemyBox.y + 12) {
      enemy.active = false;
      player.vy = -450;
      burst(enemy.x, enemy.y, "#c95f49", 14, 175, true);
      tone(210, 0.07, 0.04, "square");
    } else {
      hurtPlayer();
      return;
    }
  }

  if (!state.checkpointActive && player.x >= state.level.checkpoint.x) {
    state.checkpointActive = true;
    state.checkpointX = state.level.checkpoint.x + 24;
    state.checkpointY = state.level.checkpoint.y;
    showToast("Lantern checkpoint lit");
    tone(610, 0.11, 0.035);
    announce("Checkpoint lit.");
  }

  if (player.y > VIEW_H + 120) {
    hurtPlayer();
    return;
  }

  if (player.x + PLAYER_W >= state.level.goalX) finishLevel();
}

function updateParticles(dt) {
  state.particles = state.particles.filter((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += 430 * dt;
    particle.life -= dt;
    return particle.life > 0;
  });
}

function updateGame(dt) {
  if (state.phase !== "playing") return;
  state.elapsed += dt;
  state.screenShake = Math.max(0, state.screenShake - 38 * dt);
  updateMovingPlatforms(dt);
  updatePlayer(dt);
  updateParticles(dt);

  const targetCamera = clamp(state.player.x - VIEW_W * 0.34, 0, state.level.worldWidth - VIEW_W);
  state.cameraX = lerp(state.cameraX, targetCamera, Math.min(1, dt * 6.2));

  state.metricTimer += dt;
  if (state.metricTimer >= 0.08) {
    state.metricTimer = 0;
    updateHud();
  }
}

function roundedRect(ctx, x, y, width, height, radius, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawCloud(ctx, x, y, scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 27 * scale, Math.PI, 0);
  ctx.arc(x + 31 * scale, y - 10 * scale, 35 * scale, Math.PI, 0);
  ctx.arc(x + 70 * scale, y, 25 * scale, Math.PI, 0);
  ctx.lineTo(x + 92 * scale, y + 18 * scale);
  ctx.lineTo(x - 26 * scale, y + 18 * scale);
  ctx.closePath();
  ctx.fill();
}

function drawBackground(ctx, time) {
  const { level, cameraX } = state;
  const palette = level.palette;
  const sky = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  sky.addColorStop(0, palette.skyTop);
  sky.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  if (state.levelIndex !== 2) {
    for (let index = -1; index < 7; index += 1) {
      const x = index * 230 - ((cameraX * 0.08) % 230);
      const y = 82 + (index % 3) * 34;
      drawCloud(ctx, x, y, 0.72 + (index % 2) * 0.18, "rgba(250,250,242,0.32)");
    }
  } else {
    ctx.fillStyle = "rgba(241, 231, 180, 0.2)";
    ctx.beginPath();
    ctx.arc(770 - cameraX * 0.025, 108, 56, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = palette.far;
  for (let index = -2; index < 11; index += 1) {
    const x = index * 150 - ((cameraX * 0.14) % 150);
    const width = 46 + (index % 3) * 10;
    ctx.beginPath();
    ctx.moveTo(x, VIEW_H);
    ctx.bezierCurveTo(x - 18, 400, x + width * 0.15, 220, x + width * 0.35, 112);
    ctx.bezierCurveTo(x + width * 0.55, 210, x + width + 10, 390, x + width, VIEW_H);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = palette.mid;
  for (let index = -2; index < 9; index += 1) {
    const x = index * 205 - ((cameraX * 0.24) % 205);
    ctx.beginPath();
    ctx.moveTo(x - 15, VIEW_H);
    ctx.bezierCurveTo(x + 12, 400, x - 30, 250, x + 22, 145);
    ctx.bezierCurveTo(x + 55, 260, x + 76, 410, x + 93, VIEW_H);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + 2, 230, 78, 34, -0.35, 0, Math.PI * 2);
    ctx.ellipse(x + 67, 270, 82, 37, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,255,246,0.1)";
  for (let index = 0; index < 14; index += 1) {
    const x = (index * 137 - cameraX * 0.31) % (VIEW_W + 100);
    const y = 160 + ((index * 83) % 260) + Math.sin(time * 0.7 + index) * 4;
    ctx.beginPath();
    ctx.ellipse(x, y, 4, 8, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state.levelIndex === 3) {
    ctx.strokeStyle = "rgba(229, 241, 239, 0.32)";
    ctx.lineWidth = 1.5;
    for (let index = 0; index < 70; index += 1) {
      const x = (index * 47 + time * 420) % (VIEW_W + 120) - 60;
      const y = (index * 79 + time * 690) % (VIEW_H + 80) - 40;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 8, y + 24);
      ctx.stroke();
    }
  }
}

function drawPlatform(ctx, item, time) {
  if (item.fallen) return;
  const palette = state.level.palette;
  const shake = item.type === "crumble" && item.crumbleTimer >= 0 && item.crumbleTimer < 0.25
    ? Math.sin(time * 58) * 3
    : 0;
  const x = item.x + shake;

  if (item.type === "ground") {
    ctx.fillStyle = palette.wood;
    ctx.beginPath();
    ctx.moveTo(x, item.y + 7);
    ctx.quadraticCurveTo(x + item.w * 0.2, item.y - 2, x + item.w * 0.38, item.y + 7);
    ctx.quadraticCurveTo(x + item.w * 0.7, item.y + 14, x + item.w, item.y + 5);
    ctx.lineTo(x + item.w, item.y + item.h);
    ctx.lineTo(x, item.y + item.h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.grass;
    ctx.beginPath();
    ctx.moveTo(x, item.y + 8);
    for (let blade = x; blade < x + item.w; blade += 14) {
      const height = 5 + ((blade / 14) % 3) * 2;
      ctx.lineTo(blade + 5, item.y - height);
      ctx.lineTo(blade + 10, item.y + 7);
    }
    ctx.lineTo(x + item.w, item.y + 10);
    ctx.lineTo(x, item.y + 10);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(28, 50, 40, 0.2)";
    ctx.lineWidth = 2;
    for (let mark = x + 34; mark < x + item.w; mark += 70) {
      ctx.beginPath();
      ctx.moveTo(mark, item.y + 28);
      ctx.quadraticCurveTo(mark + 12, item.y + 42, mark + 4, item.y + 63);
      ctx.stroke();
    }
    return;
  }

  const moving = item.type === "moving";
  const crumble = item.type === "crumble";
  roundedRect(
    ctx,
    x,
    item.y,
    item.w,
    item.h,
    8,
    moving ? "#d8a348" : palette.wood,
    "rgba(24,45,36,0.35)",
    2,
  );
  ctx.fillStyle = moving ? "#f1c567" : palette.grass;
  ctx.beginPath();
  ctx.roundRect(x + 3, item.y - 3, item.w - 6, 8, 5);
  ctx.fill();

  if (moving) {
    ctx.fillStyle = "rgba(255,255,235,0.45)";
    for (let dot = x + 15; dot < x + item.w - 5; dot += 24) {
      ctx.beginPath();
      ctx.arc(dot, item.y + 10, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (crumble) {
    ctx.strokeStyle = "rgba(35, 42, 31, 0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + item.w * 0.28, item.y + 2);
    ctx.lineTo(x + item.w * 0.38, item.y + 10);
    ctx.lineTo(x + item.w * 0.49, item.y + 4);
    ctx.lineTo(x + item.w * 0.6, item.y + 15);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(45, 77, 60, 0.42)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 12, item.y + item.h);
  ctx.bezierCurveTo(x + 8, item.y + 38, x + 26, item.y + 44, x + 20, item.y + 62);
  ctx.stroke();
}

function drawThorns(ctx, hazard) {
  const count = Math.max(2, Math.round(hazard.w / 18));
  const width = hazard.w / count;
  ctx.fillStyle = state.levelIndex === 3 ? "#e0b45c" : "#b95845";
  ctx.strokeStyle = "rgba(74, 42, 31, 0.45)";
  ctx.lineWidth = 1;
  for (let index = 0; index < count; index += 1) {
    ctx.beginPath();
    ctx.moveTo(hazard.x + index * width, hazard.y + hazard.h);
    ctx.quadraticCurveTo(hazard.x + (index + 0.43) * width, hazard.y + 4, hazard.x + (index + 0.5) * width, hazard.y);
    ctx.quadraticCurveTo(hazard.x + (index + 0.6) * width, hazard.y + 5, hazard.x + (index + 1) * width, hazard.y + hazard.h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function drawFirefly(ctx, item, time) {
  if (!item.active) return;
  const y = item.y + Math.sin(time * 3.4 + item.phase) * 6;
  const wing = Math.sin(time * 13 + item.phase) * 0.45;
  ctx.save();
  ctx.translate(item.x, y);
  ctx.fillStyle = `${state.level.palette.glow}35`;
  ctx.beginPath();
  ctx.arc(0, 0, 18 + Math.sin(time * 4 + item.phase) * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,240,0.8)";
  ctx.beginPath();
  ctx.ellipse(-5, -2, 7, 3, -0.55 - wing * 0.2, 0, Math.PI * 2);
  ctx.ellipse(5, -2, 7, 3, 0.55 + wing * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#433b24";
  ctx.beginPath();
  ctx.ellipse(0, 0, 3.5, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = state.level.palette.glow;
  ctx.beginPath();
  ctx.arc(0, 4, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBeetle(ctx, enemy, time) {
  if (!enemy.active) return;
  ctx.save();
  ctx.translate(enemy.x + (enemy.flying ? 0 : 15), enemy.y + (enemy.flying ? 0 : 14));
  ctx.scale(enemy.direction, 1);

  if (enemy.flying) {
    const flap = Math.sin(time * 17 + enemy.phase) * 0.65;
    ctx.fillStyle = "rgba(240,235,214,0.72)";
    ctx.beginPath();
    ctx.ellipse(-11, -5, 12, 5, -0.5 - flap, 0, Math.PI * 2);
    ctx.ellipse(9, -5, 12, 5, 0.5 + flap, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8e4b43";
    ctx.strokeStyle = "#432d2a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 1, 9, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f4d46b";
    ctx.beginPath();
    ctx.arc(3, 3, 2.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = "#382a28";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    const step = Math.sin(time * 10 + enemy.phase) * 3;
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(side * 6, 4);
      ctx.lineTo(side * (12 + step), 10);
      ctx.moveTo(side * 5, 8);
      ctx.lineTo(side * (11 - step), 15);
      ctx.stroke();
    });
    ctx.fillStyle = "#a85045";
    ctx.strokeStyle = "#432d2a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 2, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 11);
    ctx.stroke();
    ctx.fillStyle = "#f6f0dc";
    ctx.beginPath();
    ctx.arc(8, -1, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#25362f";
    ctx.beginPath();
    ctx.arc(9, -1, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCheckpoint(ctx, time) {
  const checkpoint = state.level.checkpoint;
  const lit = state.checkpointActive;
  ctx.save();
  ctx.translate(checkpoint.x, 470);
  ctx.strokeStyle = lit ? "#294f3f" : "rgba(42,67,56,0.55)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -82);
  ctx.stroke();
  ctx.fillStyle = lit ? state.level.palette.glow : "#aab6ae";
  ctx.beginPath();
  ctx.moveTo(2, -79);
  ctx.quadraticCurveTo(24, -72 + Math.sin(time * 3) * 2, 42, -62);
  ctx.quadraticCurveTo(25, -51, 2, -49);
  ctx.closePath();
  ctx.fill();
  if (lit) {
    ctx.fillStyle = `${state.level.palette.glow}30`;
    ctx.beginPath();
    ctx.arc(0, -77, 42 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawGoal(ctx, time) {
  const x = state.level.goalX;
  const glow = state.level.palette.glow;
  ctx.save();
  ctx.translate(x, 470);
  ctx.strokeStyle = "#233f35";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -138);
  ctx.quadraticCurveTo(30, -178, 62, -138);
  ctx.lineTo(62, 0);
  ctx.stroke();
  ctx.strokeStyle = "#6f8f75";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(1, -124);
  ctx.quadraticCurveTo(31, -155, 61, -124);
  ctx.stroke();

  const pulse = 1 + Math.sin(time * 3.2) * 0.06;
  ctx.save();
  ctx.translate(31, -126);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = `${glow}35`;
  ctx.beginPath();
  ctx.arc(0, 0, 35, 0, Math.PI * 2);
  ctx.fill();
  roundedRect(ctx, -12, -17, 24, 31, 7, "#3c4939", "#1e342c", 2);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, -1, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,230,0.78)";
  ctx.beginPath();
  ctx.arc(-2, -3, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.restore();
}

function drawPlayerShadow(ctx) {
  const player = state.player;
  let closest = 470;
  for (const item of state.platforms) {
    if (item.fallen || player.x + PLAYER_W < item.x || player.x > item.x + item.w || item.y < player.y) continue;
    closest = Math.min(closest, item.y);
  }
  const distance = clamp((closest - (player.y + PLAYER_H)) / 170, 0, 1);
  ctx.fillStyle = `rgba(20,37,30,${0.16 * (1 - distance * 0.55)})`;
  ctx.beginPath();
  ctx.ellipse(player.x + PLAYER_W / 2, closest + 3, 14 - distance * 5, 4 - distance * 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLimb(ctx, startX, startY, jointX, jointY, endX, endY, width, color) {
  ctx.strokeStyle = "#19352b";
  ctx.lineWidth = width + 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(jointX, jointY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(jointX, jointY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawPip(ctx, time) {
  const player = state.player;
  if (player.invulnerable > 0 && Math.floor(player.invulnerable * 14) % 2 === 0) return;

  const speed = clamp(Math.abs(player.vx) / 325, 0, 1);
  const run = player.runTime;
  const blink = Math.sin(time * 0.74) > 0.982;
  const dash = player.dashTime > 0;
  const hurt = player.hurtTime > 0;
  const victory = state.phase === "complete";
  const airborne = !player.onGround;
  const rising = player.vy < -40;
  const falling = player.vy > 80;
  const landingAmount = player.landing > 0 ? Math.sin((player.landing / 0.18) * Math.PI) : 0;
  const idleBob = player.onGround && speed < 0.08 ? Math.sin(time * 2.3) * 0.8 : 0;
  const runBob = player.onGround ? Math.abs(Math.sin(run)) * 1.5 * speed : 0;
  const lean = dash ? 0.24 : player.onGround ? player.vx / 1550 : clamp(player.vx / 1750, -0.18, 0.18);
  const scaleX = dash ? 1.12 : 1 + landingAmount * 0.12;
  const scaleY = dash ? 0.92 : 1 - landingAmount * 0.15;

  ctx.save();
  ctx.translate(player.x + PLAYER_W / 2, player.y + PLAYER_H - 2 + idleBob + runBob);
  ctx.rotate(lean);
  ctx.scale(player.facing * scaleX, scaleY);

  // Scarf: a broad ribbon with a soft, delayed wave makes Pip's motion readable.
  const scarfWave = Math.sin(time * 10 + run * 0.3) * (2 + speed * 3);
  const scarfLength = dash ? 38 : 23 + speed * 15;
  ctx.fillStyle = "#e7a33d";
  ctx.strokeStyle = "#704b29";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-7, -27);
  ctx.bezierCurveTo(-17, -28, -22 - scarfLength * 0.45, -26 + scarfWave, -scarfLength, -30 + scarfWave * 0.45);
  ctx.lineTo(-scarfLength + 2, -23 + scarfWave * 0.45);
  ctx.bezierCurveTo(-24, -21 + scarfWave, -16, -20, -7, -21);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pose calculations.
  let backFoot = { kneeX: -7, kneeY: -5, footX: -8, footY: 0 };
  let frontFoot = { kneeX: 7, kneeY: -5, footX: 8, footY: 0 };
  let backHand = { elbowX: -11, elbowY: -24, handX: -10, handY: -15 };
  let frontHand = { elbowX: 12, elbowY: -23, handX: 13, handY: -14 };

  if (player.onGround && speed >= 0.08) {
    const stride = Math.sin(run) * 10 * speed;
    const liftA = Math.max(0, Math.cos(run)) * 4 * speed;
    const liftB = Math.max(0, -Math.cos(run)) * 4 * speed;
    backFoot = { kneeX: -5 - stride * 0.35, kneeY: -8, footX: -9 - stride, footY: -liftA };
    frontFoot = { kneeX: 5 + stride * 0.35, kneeY: -8, footX: 9 + stride, footY: -liftB };
    backHand = { elbowX: -10 + stride * 0.42, elbowY: -23, handX: -12 + stride * 0.68, handY: -15 };
    frontHand = { elbowX: 10 - stride * 0.42, elbowY: -23, handX: 12 - stride * 0.68, handY: -15 };
  } else if (dash) {
    backFoot = { kneeX: -11, kneeY: -8, footX: -20, footY: -7 };
    frontFoot = { kneeX: -8, kneeY: -4, footX: -17, footY: 1 };
    backHand = { elbowX: 13, elbowY: -25, handX: 22, handY: -23 };
    frontHand = { elbowX: 15, elbowY: -19, handX: 24, handY: -17 };
  } else if (airborne) {
    if (rising) {
      backFoot = { kneeX: -10, kneeY: -10, footX: -15, footY: -5 };
      frontFoot = { kneeX: 9, kneeY: -11, footX: 15, footY: -7 };
      backHand = { elbowX: -13, elbowY: -25, handX: -17, handY: -33 };
      frontHand = { elbowX: 13, elbowY: -25, handX: 18, handY: -32 };
    } else if (falling) {
      backFoot = { kneeX: -8, kneeY: -5, footX: -11, footY: 2 };
      frontFoot = { kneeX: 8, kneeY: -5, footX: 11, footY: 2 };
      backHand = { elbowX: -14, elbowY: -23, handX: -19, handY: -18 };
      frontHand = { elbowX: 14, elbowY: -23, handX: 19, handY: -18 };
    }
  }

  if (victory) {
    const wave = Math.sin(time * 9) * 3;
    backFoot = { kneeX: -7, kneeY: -7, footX: -9, footY: 0 };
    frontFoot = { kneeX: 7, kneeY: -7, footX: 10, footY: 0 };
    backHand = { elbowX: -12, elbowY: -25, handX: -16, handY: -16 };
    frontHand = { elbowX: 13, elbowY: -31, handX: 11 + wave, handY: -43 };
  }

  // Back limbs.
  drawLimb(ctx, -5, -16, backFoot.kneeX, backFoot.kneeY, backFoot.footX, backFoot.footY, 4.5, "#865d3d");
  roundedRect(ctx, backFoot.footX - 5, backFoot.footY - 3, 10, 6, 3, "#263e34", "#172d26", 1.5);
  drawLimb(ctx, -8, -26, backHand.elbowX, backHand.elbowY, backHand.handX, backHand.handY, 4, "#c9854d");
  ctx.fillStyle = "#d99a61";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(backHand.handX, backHand.handY, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Tunic and little belt.
  ctx.fillStyle = dash ? "#477d63" : "#315f4a";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-10, -29);
  ctx.quadraticCurveTo(-14, -21, -11, -13);
  ctx.lineTo(-7, -10);
  ctx.quadraticCurveTo(0, -7, 8, -10);
  ctx.lineTo(11, -14);
  ctx.quadraticCurveTo(14, -22, 9, -29);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#d9a13f";
  roundedRect(ctx, -11, -17, 22, 4, 2, "#d9a13f");
  ctx.fillStyle = "#f2ca68";
  ctx.fillRect(-2, -17, 4, 4);

  // Front limbs.
  drawLimb(ctx, 5, -16, frontFoot.kneeX, frontFoot.kneeY, frontFoot.footX, frontFoot.footY, 4.8, "#9b6842");
  roundedRect(ctx, frontFoot.footX - 5, frontFoot.footY - 3, 10, 6, 3, "#2c473a", "#172d26", 1.5);
  drawLimb(ctx, 8, -26, frontHand.elbowX, frontHand.elbowY, frontHand.handX, frontHand.handY, 4.2, "#d18c52");
  ctx.fillStyle = "#e0a166";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(frontHand.handX, frontHand.handY, 3.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Ears sit behind the head and respond slightly to motion.
  const earTilt = clamp(player.vx / 900, -0.22, 0.22);
  ctx.save();
  ctx.translate(-7, -40);
  ctx.rotate(-0.28 - earTilt);
  ctx.fillStyle = "#cf8750";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 6.8, 10.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#e7ad79";
  ctx.beginPath();
  ctx.ellipse(0, 0.5, 3, 6.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.translate(9, -40);
  ctx.rotate(0.2 - earTilt);
  ctx.fillStyle = "#d89259";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 6.8, 10.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#edb47e";
  ctx.beginPath();
  ctx.ellipse(0, 0.5, 3, 6.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Head, cheek, fringe, and face.
  ctx.fillStyle = "#d89359";
  ctx.strokeStyle = "#173129";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(1, -34, 13.5, 12.5, 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#efbd84";
  ctx.beginPath();
  ctx.ellipse(7.5, -31, 7, 6, -0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#6c4a32";
  ctx.beginPath();
  ctx.moveTo(-10, -41);
  ctx.quadraticCurveTo(-3, -49, 3, -44);
  ctx.quadraticCurveTo(8, -48, 11, -41);
  ctx.quadraticCurveTo(2, -44, -3, -40);
  ctx.closePath();
  ctx.fill();

  if (hurt) {
    ctx.strokeStyle = "#23362f";
    ctx.lineWidth = 1.8;
    [-3, 6].forEach((eyeX) => {
      ctx.beginPath();
      ctx.moveTo(eyeX - 2, -35);
      ctx.lineTo(eyeX + 2, -31);
      ctx.moveTo(eyeX + 2, -35);
      ctx.lineTo(eyeX - 2, -31);
      ctx.stroke();
    });
  } else if (blink && !dash) {
    ctx.strokeStyle = "#1b352c";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-5, -33);
    ctx.lineTo(-1, -33);
    ctx.moveTo(4, -33);
    ctx.lineTo(8, -33);
    ctx.stroke();
  } else {
    ctx.fillStyle = "#f9f5e9";
    ctx.beginPath();
    ctx.ellipse(-2.5, -33.5, 3, 3.7, 0, 0, Math.PI * 2);
    ctx.ellipse(6.5, -33.5, 3, 3.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#173129";
    const pupilShift = dash ? 1.5 : 0.7;
    ctx.beginPath();
    ctx.arc(-1.5 + pupilShift, -33, 1.45, 0, Math.PI * 2);
    ctx.arc(7.5 + pupilShift, -33, 1.45, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#6b3d2c";
  ctx.beginPath();
  ctx.arc(13, -31, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6b3d2c";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  if (victory) {
    ctx.arc(6, -28, 4, 0.1, Math.PI - 0.2);
  } else if (falling) {
    ctx.arc(6.5, -27.5, 2, 0, Math.PI * 2);
  } else {
    ctx.arc(6, -29, 3.2, 0.1, Math.PI - 0.15);
  }
  ctx.stroke();

  // Scarf collar belongs in front of the face/body seam.
  ctx.strokeStyle = "#704b29";
  ctx.lineWidth = 1.4;
  roundedRect(ctx, -9, -26, 19, 6, 3, "#e7a33d", "#704b29", 1.4);
  ctx.restore();
}

function drawParticles(ctx) {
  state.particles.forEach((particle) => {
    ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
    ctx.fillStyle = particle.color;
    if (particle.square) {
      ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
}

function drawLives(ctx) {
  ctx.save();
  ctx.translate(19, VIEW_H - 24);
  for (let index = 0; index < 3; index += 1) {
    const active = index < state.lives;
    const x = index * 23;
    ctx.fillStyle = active ? "#d96750" : "rgba(28,45,38,0.22)";
    ctx.beginPath();
    ctx.moveTo(x, 4);
    ctx.bezierCurveTo(x - 9, -3, x - 11, 7, x, 14);
    ctx.bezierCurveTo(x + 11, 7, x + 9, -3, x, 4);
    ctx.fill();
  }
  ctx.restore();
}

function drawWorld(ctx, time) {
  const shakeX = state.screenShake ? (Math.random() - 0.5) * state.screenShake : 0;
  const shakeY = state.screenShake ? (Math.random() - 0.5) * state.screenShake * 0.55 : 0;
  ctx.save();
  ctx.translate(-state.cameraX + shakeX, shakeY);

  state.platforms.forEach((item) => drawPlatform(ctx, item, time));
  state.hazards.forEach((item) => drawThorns(ctx, item));
  drawCheckpoint(ctx, time);
  drawGoal(ctx, time);
  state.fireflies.forEach((item) => drawFirefly(ctx, item, time));
  state.enemies.forEach((item) => drawBeetle(ctx, item, time));
  drawPlayerShadow(ctx);
  drawParticles(ctx);
  drawPip(ctx, time);

  ctx.restore();
  drawLives(ctx);

  const routeProgress = clamp((state.player.x / state.level.goalX) * 100, 0, 100);
  ctx.fillStyle = "rgba(20,39,32,0.18)";
  ctx.fillRect(0, VIEW_H - 4, VIEW_W, 4);
  ctx.fillStyle = state.level.palette.glow;
  ctx.fillRect(0, VIEW_H - 4, (VIEW_W * routeProgress) / 100, 4);
}

function render(time) {
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, VIEW_W, VIEW_H);
  drawBackground(context, time);
  drawWorld(context, time);
}

function frame(now) {
  const dt = Math.min(0.033, (now - previousFrame) / 1000);
  previousFrame = now;
  ambientTime = now / 1000;
  updateGame(dt);
  render(ambientTime);
  animationFrame = requestAnimationFrame(frame);
}

function onKeyDown(event) {
  const controls = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "Space",
    "KeyA",
    "KeyD",
    "KeyW",
    "KeyX",
    "ShiftLeft",
    "ShiftRight",
    "Escape",
    "KeyR",
  ];
  if (controls.includes(event.code) && (state.phase === "playing" || canvas === document.activeElement)) {
    event.preventDefault();
  }
  if (event.code === "ArrowLeft" || event.code === "KeyA") input.left = true;
  if (event.code === "ArrowRight" || event.code === "KeyD") input.right = true;
  if (["ArrowUp", "KeyW", "Space"].includes(event.code) && !event.repeat) {
    input.jumpHeld = true;
    input.jumpQueued = true;
  }
  if (["KeyX", "ShiftLeft", "ShiftRight"].includes(event.code) && !event.repeat) input.dashQueued = true;
  if (event.code === "Escape" && !event.repeat) togglePause();
  if (event.code === "KeyR" && !event.repeat) startRun();
}

function onKeyUp(event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") input.left = false;
  if (event.code === "ArrowRight" || event.code === "KeyD") input.right = false;
  if (["ArrowUp", "KeyW", "Space"].includes(event.code)) input.jumpHeld = false;
}

function bindHoldButton(selector, down, up) {
  const button = $(selector);
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    down();
  });
  const release = (event) => {
    event.preventDefault();
    up();
  };
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", up);
}

function bindEvents() {
  window.addEventListener("keydown", onKeyDown, { passive: false });
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", clearInput);
  window.addEventListener("resize", setupCanvas);

  dom.overlayPrimary.addEventListener("click", () => {
    if (state.phase === "paused") togglePause();
    else if (state.phase === "complete") chooseNextLevel();
    else startRun();
  });
  dom.overlaySecondary.addEventListener("click", () => {
    selectLevel(selectedLevel);
    $("#routes").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  dom.newRun.addEventListener("click", startRun);
  dom.pauseRun.addEventListener("click", togglePause);
  dom.soundToggle.addEventListener("click", () => {
    progress.sound = !progress.sound;
    saveProgress();
    dom.soundToggle.setAttribute("aria-pressed", String(progress.sound));
    dom.soundToggle.innerHTML = progress.sound ? "Sound on <span aria-hidden=\"true\">♪</span>" : "Sound off <span aria-hidden=\"true\">×</span>";
    if (progress.sound) tone(560, 0.08, 0.035);
  });

  $$(".route-card").forEach((card) => {
    card.addEventListener("click", () => selectLevel(Number(card.dataset.level), true));
  });

  bindHoldButton("#touch-left", () => { input.left = true; }, () => { input.left = false; });
  bindHoldButton("#touch-right", () => { input.right = true; }, () => { input.right = false; });
  bindHoldButton(
    "#touch-jump",
    () => {
      input.jumpHeld = true;
      input.jumpQueued = true;
    },
    () => { input.jumpHeld = false; },
  );
  $("#touch-dash").addEventListener("pointerdown", (event) => {
    event.preventDefault();
    input.dashQueued = true;
  });
}

function initialize() {
  setupCanvas();
  bindEvents();
  dom.soundToggle.setAttribute("aria-pressed", String(progress.sound));
  dom.soundToggle.innerHTML = progress.sound ? "Sound on <span aria-hidden=\"true\">♪</span>" : "Sound off <span aria-hidden=\"true\">×</span>";
  updateInterface();
  setOverlay("ready");
  animationFrame = requestAnimationFrame(frame);
}

initialize();

window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame), { once: true });
