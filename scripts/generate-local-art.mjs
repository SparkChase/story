import { mkdirSync, writeFileSync } from "node:fs";

const outDir = new URL("../public/art/", import.meta.url);

mkdirSync(outDir, { recursive: true });

const pages = [
  {
    id: 1,
    skyA: "#fff1d2",
    skyB: "#f7a889",
    ground: "#dfeecf",
    scene: sceneOne,
  },
  {
    id: 2,
    skyA: "#fff8de",
    skyB: "#cce8dc",
    ground: "#d9edcc",
    scene: sceneTwo,
  },
  {
    id: 3,
    skyA: "#fbe4ea",
    skyB: "#cdd9ef",
    ground: "#dce9d4",
    scene: sceneThree,
  },
  {
    id: 4,
    skyA: "#f7eeee",
    skyB: "#d6d3d6",
    ground: "#e8dfdc",
    scene: sceneFour,
  },
  {
    id: 5,
    skyA: "#ffe8d5",
    skyB: "#d7e4e6",
    ground: "#eddfcf",
    scene: sceneFive,
  },
  {
    id: 6,
    skyA: "#fff4c9",
    skyB: "#cceee4",
    ground: "#e8efc7",
    scene: sceneSix,
  },
  {
    id: 7,
    skyA: "#ffe5df",
    skyB: "#f7cbd5",
    ground: "#e8edcc",
    scene: sceneSeven,
  },
  {
    id: 8,
    skyA: "#fff5d9",
    skyB: "#d5efe6",
    ground: "#e7f1cf",
    scene: sceneEight,
  },
  {
    id: 9,
    skyA: "#17233c",
    skyB: "#6f5876",
    ground: "#bfc8b2",
    scene: sceneNine,
    night: true,
  },
];

for (const page of pages) {
  const output = new URL(`page-${String(page.id).padStart(2, "0")}.svg`, outDir);
  writeFileSync(output, renderPage(page), "utf8");
  console.log(`wrote ${output.pathname}`);
}

function renderPage(page) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img">
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${page.skyA}"/>
      <stop offset="1" stop-color="${page.skyB}"/>
    </linearGradient>
    <linearGradient id="warmGlow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff5ad"/>
      <stop offset="0.58" stop-color="#f7b66f"/>
      <stop offset="1" stop-color="#df7b86"/>
    </linearGradient>
    <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#99c77c"/>
      <stop offset="1" stop-color="#5f9f91"/>
    </linearGradient>
    <filter id="paper" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="${page.id + 11}" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.74 0 0 0 0 0.64 0 0 0 0 0.58 0 0 0 0.18 0" result="grain"/>
      <feBlend in="SourceGraphic" in2="grain" mode="multiply"/>
    </filter>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="1600" height="1000" fill="url(#sky)"/>
  ${page.night ? stars(72) : clouds()}
  <path d="M0 730 C260 650 420 760 640 700 C910 620 1070 735 1600 655 L1600 1000 L0 1000 Z" fill="${page.ground}"/>
  <path d="M0 780 C260 745 440 824 720 760 C960 705 1160 760 1600 724 L1600 1000 L0 1000 Z" fill="${page.night ? "#596d63" : "#f5ddb8"}" opacity="0.62"/>
  <g filter="url(#paper)">
    ${page.scene()}
  </g>
</svg>`;
}

function clouds() {
  return `
  <g opacity="0.34" fill="#fffaf4">
    <ellipse cx="238" cy="165" rx="92" ry="34"/>
    <ellipse cx="315" cy="154" rx="78" ry="30"/>
    <ellipse cx="1222" cy="128" rx="104" ry="34"/>
    <ellipse cx="1310" cy="142" rx="76" ry="26"/>
  </g>`;
}

function stars(count) {
  let output = "";
  for (let index = 0; index < count; index += 1) {
    const x = (index * 173) % 1510 + 35;
    const y = (index * 97) % 430 + 38;
    const size = index % 5 === 0 ? 4.4 : 2.6;
    const opacity = 0.34 + (index % 7) * 0.07;
    output += `<circle cx="${x}" cy="${y}" r="${size}" fill="#fff7cf" opacity="${opacity.toFixed(2)}"/>`;
  }
  return `<g>${output}</g>`;
}

function tree(x = 980, y = 312, scale = 1) {
  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-92 580 C-46 420 -56 210 -26 70 C-18 30 48 30 56 76 C74 190 58 392 118 580 Z" fill="#8a5a42"/>
    <path d="M-34 234 C-140 178 -214 112 -270 30" fill="none" stroke="#8a5a42" stroke-width="34" stroke-linecap="round"/>
    <path d="M42 220 C126 145 186 84 246 2" fill="none" stroke="#8a5a42" stroke-width="32" stroke-linecap="round"/>
    <path d="M4 150 C-18 78 -18 24 -6 -52" fill="none" stroke="#8a5a42" stroke-width="28" stroke-linecap="round"/>
    <g fill="url(#leaf)">
      <ellipse cx="-280" cy="12" rx="168" ry="120"/>
      <ellipse cx="-120" cy="-96" rx="184" ry="134"/>
      <ellipse cx="70" cy="-116" rx="202" ry="142"/>
      <ellipse cx="260" cy="-18" rx="170" ry="122"/>
      <ellipse cx="96" cy="40" rx="224" ry="126"/>
      <ellipse cx="-88" cy="42" rx="214" ry="124"/>
    </g>
    <ellipse cx="30" cy="314" rx="48" ry="64" fill="#5a3d32"/>
  </g>`;
}

function child(x, y, options = {}) {
  const {
    scale = 1,
    body = "#f18a8f",
    hair = "#493431",
    facing = 1,
    seated = false,
    blush = true,
    sad = false,
  } = options;
  const mouth = sad ? "M-10 30 Q0 22 10 30" : "M-11 25 Q0 34 12 25";
  const legs = seated
    ? `<path d="M-30 130 Q-70 152 -112 142" fill="none" stroke="#5b6f8f" stroke-width="18" stroke-linecap="round"/>
       <path d="M28 130 Q62 156 104 142" fill="none" stroke="#5b6f8f" stroke-width="18" stroke-linecap="round"/>`
    : `<path d="M-18 126 L-28 182" stroke="#5b6f8f" stroke-width="18" stroke-linecap="round"/>
       <path d="M22 126 L34 182" stroke="#5b6f8f" stroke-width="18" stroke-linecap="round"/>`;

  return `
  <g transform="translate(${x} ${y}) scale(${facing * scale} ${scale})">
    <path d="M-42 96 Q0 38 42 96 L34 142 Q0 162 -34 142 Z" fill="${body}"/>
    <circle cx="0" cy="0" r="48" fill="#ffd2b7"/>
    <path d="M-44 -4 C-38 -58 38 -64 46 -2 C26 -20 -24 -18 -44 -4 Z" fill="${hair}"/>
    <circle cx="-16" cy="8" r="5.8" fill="#3a2a2b"/>
    <circle cx="18" cy="8" r="5.8" fill="#3a2a2b"/>
    ${blush ? `<ellipse cx="-31" cy="22" rx="13" ry="8" fill="#f49a9d" opacity="0.72"/>
    <ellipse cx="33" cy="22" rx="13" ry="8" fill="#f49a9d" opacity="0.72"/>` : ""}
    <path d="${mouth}" fill="none" stroke="#7d4d49" stroke-width="4" stroke-linecap="round"/>
    <path d="M-38 94 Q-78 112 -94 146" fill="none" stroke="#ffd2b7" stroke-width="15" stroke-linecap="round"/>
    <path d="M38 94 Q78 112 94 146" fill="none" stroke="#ffd2b7" stroke-width="15" stroke-linecap="round"/>
    ${legs}
  </g>`;
}

function lily(x, y, options = {}) {
  return child(x, y, {
    body: "#f6a5aa",
    hair: "#4b302f",
    ...options,
  });
}

function xiaoYang(x, y, options = {}) {
  return child(x, y, {
    body: "#8eb6d8",
    hair: "#3b3435",
    ...options,
  });
}

function flowers() {
  let output = "";
  const colors = ["#d96578", "#edb45d", "#76ac97", "#e99aa4"];
  for (let index = 0; index < 44; index += 1) {
    const x = 70 + ((index * 97) % 1440);
    const y = 705 + ((index * 41) % 210);
    const color = colors[index % colors.length];
    output += `<g transform="translate(${x} ${y}) scale(${0.76 + (index % 4) * 0.12})">
      <circle cx="0" cy="0" r="6" fill="${color}"/>
      <circle cx="-8" cy="0" r="6" fill="${color}" opacity="0.72"/>
      <circle cx="8" cy="0" r="6" fill="${color}" opacity="0.72"/>
      <circle cx="0" cy="-8" r="6" fill="${color}" opacity="0.72"/>
      <circle cx="0" cy="8" r="6" fill="${color}" opacity="0.72"/>
      <circle cx="0" cy="0" r="3" fill="#fff2b8"/>
    </g>`;
  }
  return output;
}

function puzzlePiece(x, y, scale, fill, rotate = 0) {
  return `
  <path transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})"
    d="M-44 -34 H-10 C-14 -58 18 -58 14 -34 H46 V-2 C70 -8 70 28 46 22 V54 H-44 V24 C-68 30 -68 -8 -44 -2 Z"
    fill="${fill}" stroke="#fff6d8" stroke-width="7" stroke-linejoin="round"/>`;
}

function glow(x, y, rx = 210, ry = 150, color = "#fff2a2") {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}" opacity="0.45" filter="url(#soft)"/>`;
}

function sceneOne() {
  return `
    ${glow(520, 260, 290, 190, "#fff0a8")}
    ${tree(1010, 274, 1.12)}
    <path d="M120 742 C300 670 430 690 594 748" fill="none" stroke="#c99660" stroke-width="18" stroke-linecap="round" opacity="0.42"/>
    ${xiaoYang(635, 682, { scale: 1.08, seated: true, facing: 1 })}
    ${lily(765, 682, { scale: 1.08, seated: true, facing: -1 })}
    <path d="M698 794 Q706 806 714 794" fill="none" stroke="#ffd2b7" stroke-width="12" stroke-linecap="round"/>
    ${flowers()}
  `;
}

function sceneTwo() {
  return `
    <path d="M450 1000 C570 770 804 610 1140 526" fill="none" stroke="#f2ca95" stroke-width="250" stroke-linecap="round"/>
    <path d="M420 1000 C566 760 815 600 1184 500" fill="none" stroke="#fff0cf" stroke-width="148" stroke-linecap="round"/>
    ${tree(390, 292, 0.78)}
    ${tree(1210, 300, 0.74)}
    ${xiaoYang(704, 612, { scale: 1, facing: 1 })}
    ${lily(838, 612, { scale: 1, facing: -1 })}
    <path d="M765 760 Q775 770 788 760" fill="none" stroke="#ffd2b7" stroke-width="13" stroke-linecap="round"/>
    ${flowers()}
  `;
}

function sceneThree() {
  return `
    ${tree(1024, 260, 1.04)}
    ${glow(1058, 610, 120, 98, "#ffe98c")}
    ${puzzlePiece(1058, 614, 0.74, "#ffd861", -8)}
    ${lily(878, 636, { scale: 0.98, facing: 1 })}
    <g transform="translate(462 560)">
      <path d="M-62 240 C-42 120 -50 10 -26 -80 C-12 -132 50 -120 48 -70 C42 56 62 150 96 240 Z" fill="#80563f"/>
      <ellipse cx="-44" cy="-70" rx="108" ry="78" fill="#719f68"/>
      <ellipse cx="42" cy="-108" rx="120" ry="84" fill="#88b679"/>
      <ellipse cx="110" cy="-42" rx="96" ry="70" fill="#79a969"/>
    </g>
    ${xiaoYang(410, 662, { scale: 0.92, facing: 1, sad: true })}
    <g transform="translate(1250 705)">
      <ellipse cx="0" cy="38" rx="56" ry="32" fill="#fff3e6"/>
      <circle cx="-30" cy="0" r="30" fill="#fff3e6"/>
      <path d="M-54 -16 C-86 -78 -58 -92 -32 -28" fill="#fff3e6"/>
      <path d="M-20 -18 C-34 -90 -2 -96 8 -28" fill="#fff3e6"/>
      <circle cx="-40" cy="-6" r="4" fill="#493431"/>
      <circle cx="-52" cy="8" r="5" fill="#e88f9e" opacity="0.62"/>
    </g>
    ${flowers()}
  `;
}

function sceneFour() {
  return `
    <rect x="558" y="350" width="486" height="390" rx="34" fill="#b9b3b6"/>
    <rect x="612" y="400" width="378" height="278" rx="22" fill="#d8d2d3" opacity="0.8"/>
    ${xiaoYang(800, 558, { scale: 1.12, seated: true, sad: true, blush: false })}
    <g fill="none" stroke="#817b82" stroke-width="13" stroke-linecap="round" opacity="0.9">
      <path d="M320 274 C470 170 580 248 538 326 C500 400 646 412 636 514"/>
      <path d="M1120 258 C994 238 956 342 1048 386 C1130 426 1042 522 1136 584"/>
      <path d="M430 782 C510 684 646 724 626 626"/>
      <path d="M1210 760 C1118 648 1224 566 1102 500"/>
    </g>
    <g fill="#858089" opacity="0.64">
      <ellipse cx="356" cy="394" rx="82" ry="38"/>
      <ellipse cx="428" cy="386" rx="62" ry="32"/>
      <ellipse cx="1196" cy="410" rx="78" ry="36"/>
      <ellipse cx="1264" cy="418" rx="54" ry="28"/>
    </g>
  `;
}

function sceneFive() {
  return `
    <rect x="348" y="300" width="900" height="474" rx="32" fill="#c58d66"/>
    <path d="M296 334 L800 132 L1304 334 Z" fill="#8e5f57"/>
    <rect x="722" y="440" width="194" height="334" rx="18" fill="#704c44"/>
    <rect x="450" y="420" width="190" height="150" rx="18" fill="#9cc0c3"/>
    <rect x="976" y="420" width="190" height="150" rx="18" fill="#a8c5d2"/>
    <rect x="468" y="438" width="154" height="114" rx="12" fill="#dce9ed" opacity="0.72"/>
    <rect x="994" y="438" width="154" height="114" rx="12" fill="#1f2f45" opacity="0.52"/>
    ${lily(642, 666, { scale: 0.98, seated: true, sad: true })}
    ${xiaoYang(1080, 492, { scale: 0.72, seated: true, sad: true, blush: false })}
    <path d="M648 812 C744 842 858 846 966 814" fill="none" stroke="#f3c798" stroke-width="18" stroke-linecap="round"/>
  `;
}

function sceneSix() {
  return `
    ${tree(900, 236, 1.1)}
    ${glow(936, 618, 210, 164, "#fff28e")}
    ${puzzlePiece(860, 570, 0.62, "#ffd861", -18)}
    ${puzzlePiece(970, 568, 0.64, "#f5a3a5", 12)}
    ${puzzlePiece(916, 690, 0.7, "#8ecbb6", 4)}
    ${puzzlePiece(1058, 682, 0.58, "#f4c36b", -10)}
    ${lily(600, 650, { scale: 1.02, facing: 1 })}
    ${xiaoYang(738, 650, { scale: 1.02, facing: -1, sad: false })}
    <path d="M666 792 Q680 802 696 792" fill="none" stroke="#ffd2b7" stroke-width="14" stroke-linecap="round"/>
    ${flowers()}
  `;
}

function sceneSeven() {
  return `
    ${glow(820, 440, 360, 250, "#fff0a4")}
    ${tree(1120, 300, 0.82)}
    ${puzzlePiece(780, 500, 0.72, "#ffd861", -12)}
    ${puzzlePiece(890, 565, 0.6, "#89c7b5", 14)}
    ${puzzlePiece(700, 628, 0.54, "#f6a4a5", 8)}
    ${xiaoYang(610, 620, { scale: 1.22, facing: 1 })}
    ${lily(900, 620, { scale: 1.22, facing: -1 })}
    <ellipse cx="574" cy="640" rx="25" ry="15" fill="#e75d75" opacity="0.78"/>
    <ellipse cx="646" cy="640" rx="25" ry="15" fill="#e75d75" opacity="0.78"/>
    <path d="M656 740 C710 778 792 778 846 740" fill="none" stroke="#ffd2b7" stroke-width="15" stroke-linecap="round"/>
    ${flowers()}
  `;
}

function sceneEight() {
  return `
    ${tree(982, 256, 1.04)}
    <rect x="568" y="642" width="420" height="172" rx="30" fill="#e7c28a" stroke="#fff5d2" stroke-width="10"/>
    ${puzzlePiece(780, 720, 0.72, "#ffd861", 0)}
    ${puzzlePiece(674, 720, 0.66, "#f39aa0", -8)}
    ${puzzlePiece(886, 720, 0.66, "#88c5b4", 8)}
    ${glow(780, 718, 170, 110, "#fff4a8")}
    ${xiaoYang(596, 608, { scale: 1, seated: true, facing: 1 })}
    ${lily(970, 608, { scale: 1, seated: true, facing: -1 })}
    <path d="M714 752 Q744 730 780 720 Q820 730 850 752" fill="none" stroke="#ffd2b7" stroke-width="14" stroke-linecap="round"/>
    ${flowers()}
  `;
}

function sceneNine() {
  return `
    ${tree(1058, 296, 0.98)}
    ${glow(746, 564, 310, 210, "#ffd977")}
    <g opacity="0.26" fill="#fff7ee">
      <ellipse cx="250" cy="740" rx="170" ry="34"/>
      <ellipse cx="524" cy="704" rx="220" ry="42"/>
      <ellipse cx="1240" cy="744" rx="210" ry="38"/>
    </g>
    ${xiaoYang(688, 626, { scale: 1.12, facing: 1 })}
    ${lily(790, 626, { scale: 1.12, facing: -1 })}
    <path d="M646 746 C700 820 792 820 850 746" fill="none" stroke="#ffd2b7" stroke-width="26" stroke-linecap="round"/>
    <path d="M704 748 C736 790 776 790 808 748" fill="none" stroke="#f6a5aa" stroke-width="22" stroke-linecap="round"/>
    <path d="M558 850 C690 888 832 890 984 846" fill="none" stroke="#eed1a0" stroke-width="18" stroke-linecap="round" opacity="0.62"/>
  `;
}
