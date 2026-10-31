import { useId } from 'react';

/**
 * Hero atmosphere: a night-time bedroom where a small glowing fairy drifts in,
 * touches the child's tablet, and the screen blooms into a luminous paradise.
 *
 * Two compositions are shipped — a wide one for desktop and a portrait one for
 * phones — because cropping a 16:10 scene down to 390px loses the story. Both
 * are pure SVG + CSS, so they cost no image bytes. Reduced-motion visitors get
 * a still frame.
 *
 * Used by the home page hero only.
 */

const STARS = [
  [92, 96, 1.6, 0], [188, 47, 1.1, 2.1], [286, 132, 1.9, 4.4], [372, 68, 1.2, 1.2],
  [468, 118, 1.4, 3.3], [556, 44, 1.7, 5.6], [646, 104, 1.1, 0.8], [742, 62, 1.5, 2.8],
  [836, 126, 1.2, 4.9], [928, 52, 1.8, 1.7], [1024, 110, 1.3, 3.9], [1118, 40, 1.5, 5.1],
  [1212, 96, 1.9, 2.4], [1310, 58, 1.1, 4.2], [1396, 122, 1.4, 0.5], [34, 214, 1.3, 3.1],
  [152, 268, 1.0, 5.4], [258, 208, 1.6, 1.4], [356, 292, 1.2, 3.6], [452, 226, 1.4, 0.9],
  [548, 306, 1.1, 2.6], [648, 240, 1.7, 4.7], [748, 300, 1.2, 1.9], [844, 232, 1.4, 3.8],
  [940, 310, 1.0, 5.8], [1038, 244, 1.6, 2.2], [1134, 326, 1.3, 4.1], [1230, 250, 1.5, 0.6],
  [1328, 316, 1.1, 3.4], [1414, 238, 1.4, 5.2], [70, 402, 1.2, 2.0], [176, 452, 1.5, 4.6],
  [282, 396, 1.0, 1.5], [388, 462, 1.3, 3.7], [1082, 452, 1.4, 0.4], [1188, 398, 1.1, 2.7],
  [1294, 458, 1.6, 4.8], [1398, 404, 1.2, 1.8],
];

const PETALS = [
  [1010, 300, 0.9, 0.0], [1090, 250, 0.7, 1.7], [1180, 320, 1.0, 3.2],
  [1270, 236, 0.8, 4.6], [1350, 330, 0.9, 2.4], [930, 236, 0.6, 5.3],
];

const FLOWERS = [
  [980, 640, 1.15, 0.2], [1128, 566, 0.78, 1.4], [1256, 668, 1.32, 2.6],
  [1046, 512, 0.62, 3.1], [1372, 546, 0.9, 0.9], [880, 700, 0.7, 2.2],
];

const PHONE_FLOWERS = [
  [70, 190, 1.5, 0], [150, 120, 1.8, 0.4], [240, 180, 1.5, 0.8],
  [320, 110, 1.8, 1.2], [110, 60, 1.6, 1.6],
];

const MARK_PATH =
  'M356.7 978.8C360.9 978.1 369.8 975.8 371.3 975.1C372.2 974.7 374.2 973.9 375.8 973.3C377.4 972.6 378.9 971.9 379.2 971.7C379.5 971.5 381.0 970.6 382.5 969.7C393.6 963.6 404.2 952.2 410.2 939.8C411.8 936.5 432.1 876.3 475.9 744.9C510.8 640.3 539.4 554.4 539.6 554.0C539.8 553.5 565.9 605.0 603.5 680.3C649.4 772.0 667.7 808.1 669.3 810.0C682.0 825.2 703.9 827.7 719.3 815.9C724.6 811.9 861.1 674.8 864.5 670.2C873.6 657.7 878.0 644.2 878.0 628.4C878.0 620.5 877.2 615.3 874.7 607.2C873.4 603.1 851.2 558.3 768.2 392.4L663.4 182.7L676.0 144.7C683.0 123.8 689.0 105.0 689.5 103.1C690.9 97.0 690.1 87.8 687.9 83.0C687.5 82.1 687.1 81.2 687.1 80.9C687.1 80.7 686.2 79.0 685.0 77.1C680.4 69.3 672.7 63.5 663.4 60.7C659.7 59.6 658.5 59.6 630.6 59.4L601.7 59.1L596.2 48.3C590.6 37.2 588.2 33.7 583.5 29.7C573.5 21.1 558.1 18.9 545.9 24.3C540.1 26.9 536.8 29.7 522.0 44.3L507.1 59.2L431.6 59.4C350.9 59.6 355.0 59.5 345.2 62.1C326.0 67.2 308.9 81.9 300.2 100.6C298.0 105.5 22.7 932.3 21.8 936.9C20.0 945.7 21.7 954.3 26.9 962.8C32.0 971.3 42.7 977.9 53.2 979.0C57.9 979.5 353.9 979.4 356.7 978.8Z';

export default function FairyScene({ className = '' }) {
  const uid = useId().replace(/:/g, '');
  const night = `n-${uid}`;
  const glow = `g-${uid}`;
  const screen = `s-${uid}`;
  const bloom = `b-${uid}`;

  return (
    <div className={`fairy-scene ${className}`} aria-hidden="true">
      {/* shared paint servers, referenced by both compositions */}
      <svg className="fairy-scene__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={night} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#03122c" />
            <stop offset="42%" stopColor="#062a52" />
            <stop offset="74%" stopColor="#073566" />
            <stop offset="100%" stopColor="#041b38" />
          </linearGradient>
          <radialGradient id={glow}>
            <stop offset="0%" stopColor="#eaf9ff" stopOpacity="0.95" />
            <stop offset="38%" stopColor="#7fd4ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38b6ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={screen}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="45%" stopColor="#a6dfff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38b6ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={bloom}>
            <stop offset="0%" stopColor="#d8f4ff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#5cc4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#004aad" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ---------------- wide composition ---------------- */}
      <svg
        className="fairy-scene__svg fairy-scene__svg--wide"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <rect width="1440" height="900" fill={`url(#${night})`} />

        <g className="fairy-scene__mark" transform="translate(120 30) scale(0.46)">
          <path d={MARK_PATH} fill="none" stroke="#7fd4ff" strokeWidth="6" strokeDasharray="14 12" opacity="0.5" />
        </g>

        <g className="fairy-scene__stars">
          {STARS.map(([cx, cy, r, delay], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#d8f1ff" style={{ animationDelay: `${delay}s` }} />
          ))}
        </g>

        <g className="fairy-scene__bloom" transform="translate(-330 -430) scale(0.95)">
          <ellipse cx="1120" cy="620" rx="420" ry="300" fill={`url(#${bloom})`} opacity="0.5" />
          <path d="M700 760C820 660 940 700 1040 640 1140 580 1250 612 1440 520V900H700Z" fill="#0a7fd4" opacity="0.34" />
          <path d="M780 830C900 740 1010 780 1120 720 1230 660 1330 690 1440 620V900H780Z" fill="#38b6ff" opacity="0.3" />
          {FLOWERS.map(([cx, cy, s, delay], i) => (
            <g
              key={i}
              className="fairy-scene__flower"
              transform={`translate(${cx} ${cy}) scale(${s * 1.7})`}
              style={{ animationDelay: `${delay}s` }}
            >
              {[0, 72, 144, 216, 288].map((rotation) => (
                <ellipse key={rotation} cx="0" cy="-15" rx="7.5" ry="15" fill="#bde9ff" opacity="0.78" transform={`rotate(${rotation})`} />
              ))}
              <circle cx="0" cy="0" r="5" fill="#ffffff" opacity="0.95" />
            </g>
          ))}
        </g>

        <g className="fairy-scene__petals" transform="translate(-240 -310) scale(0.9)">
          {PETALS.map(([cx, cy, s, delay], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={6 * s} ry={3 * s} fill="#a6dfff" opacity="0.5" style={{ animationDelay: `${delay}s` }} />
          ))}
        </g>

        {/* bedroom */}
        <g className="fairy-scene__bed">
          <g opacity="0.5">
            <rect x="1272" y="26" width="196" height="212" rx="16" fill="#0a3560" />
            <rect x="1284" y="38" width="172" height="188" rx="10" fill="#1d5c92" opacity="0.55" />
            <path d="M1370 38v188M1284 132h172" stroke="#0a3560" strokeWidth="7" />
            <circle cx="1420" cy="70" r="17" fill="#eaf7ff" opacity="0.9" />
          </g>
          <path d="M1290 40 1120 320h176l92-120z" fill="#9fdcff" opacity="0.05" />
          <ellipse cx="1108" cy="290" rx="210" ry="120" fill="#38b6ff" opacity="0.1" />

          <rect x="946" y="150" width="322" height="126" rx="22" fill="#0c3762" />
          <rect x="958" y="162" width="298" height="102" rx="16" fill="none" stroke="#2f73a8" strokeWidth="2" opacity="0.5" />

          <rect x="932" y="252" width="352" height="72" rx="22" fill="#12456f" />
          <rect x="1044" y="236" width="150" height="52" rx="20" fill="#2f7bad" opacity="0.85" />
          <rect x="1044" y="236" width="150" height="52" rx="20" fill="none" stroke="#7fc9ef" strokeWidth="1.6" opacity="0.5" />

          <path d="M1078 262c0-22 18-38 40-38s40 16 40 38Z" fill="#0a2e52" />
          <path d="M1116 224c14 0 26 8 32 20-8-6-20-9-32-9s-24 3-32 9c6-12 18-20 32-20Z" fill="#2b5f8c" />
          <path d="M1080 258c6-10 18-16 34-16" stroke="#8fd6ff" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.75" />

          <path d="M936 282h290c14 0 24 10 24 22 0 34-26 56-62 56H998c-36 0-62-22-62-56 0-12 10-22 24-22Z" fill="#17547f" />
          <path d="M936 282h290" stroke="#7fc9ef" strokeWidth="2.2" opacity="0.55" />
          <path d="M1000 358h180" stroke="#4a9cc9" strokeWidth="2" opacity="0.35" />

          <path d="M1160 296c20-10 34-22 44-38" stroke="#12456f" strokeWidth="19" strokeLinecap="round" fill="none" />
          <circle cx="1206" cy="256" r="10" fill="#1a5c8c" />

          <g className="fairy-scene__tablet" transform="translate(1218 214) rotate(-14)">
            <rect x="-27" y="-40" width="54" height="80" rx="8" fill="#08243f" />
            <rect x="-23" y="-36" width="46" height="72" rx="6" fill="#0d3455" />
            <rect className="fairy-scene__tablet-screen" x="-23" y="-36" width="46" height="72" rx="6" fill="#8ad9ff" />
            <g className="fairy-scene__tablet-glow">
              <circle cx="0" cy="0" r="132" fill={`url(#${screen})`} />
            </g>
          </g>
        </g>

        <Fairy glow={glow} />
      </svg>

      {/* ---------------- portrait composition ---------------- */}
      <svg
        className="fairy-scene__svg fairy-scene__svg--phone"
        viewBox="280 30 660 640"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <rect x="0" y="-80" width="1440" height="1100" fill={`url(#${night})`} />

        <g className="fairy-scene__stars">
          {STARS.slice(0, 22).map(([cx, cy, r, delay], i) => (
            <circle key={i} cx={cx} cy={cy} r={r * 1.3} fill="#d8f1ff" style={{ animationDelay: `${delay}s` }} />
          ))}
        </g>

        <g transform="translate(392 6)">
          <rect width="180" height="196" rx="14" fill="#0a3560" />
          <rect x="12" y="12" width="156" height="172" rx="9" fill="#1d5c92" opacity="0.5" />
          <path d="M90 12v172M12 98h156" stroke="#0a3560" strokeWidth="6" />
          <circle cx="138" cy="34" r="15" fill="#eaf7ff" opacity="0.85" />
        </g>

        {/* paradise */}
        <g className="fairy-scene__bloom" transform="translate(270 120) scale(0.6)">
          <ellipse cx="300" cy="230" rx="380" ry="230" fill={`url(#${bloom})`} opacity="0.6" />
          <path d="M0 300c90-70 180-40 260-90s180-30 340-110V420H0Z" fill="#0a7fd4" opacity="0.28" />
          <path d="M60 360c80-60 160-40 240-80s160-30 300-90V420H60Z" fill="#38b6ff" opacity="0.26" />
          {PHONE_FLOWERS.map(([cx, cy, s, delay], i) => (
            <g
              key={i}
              className="fairy-scene__flower"
              transform={`translate(${cx} ${cy}) scale(${s})`}
              style={{ animationDelay: `${delay}s` }}
            >
              {[0, 72, 144, 216, 288].map((rotation) => (
                <ellipse key={rotation} cx="0" cy="-15" rx="7.5" ry="15" fill="#bde9ff" opacity="0.8" transform={`rotate(${rotation})`} />
              ))}
              <circle cx="0" cy="0" r="5" fill="#ffffff" opacity="0.95" />
            </g>
          ))}
        </g>

        {/* bed */}
        <g className="fairy-scene__bed">
          <rect x="296" y="150" width="300" height="118" rx="20" fill="#0c3762" />
          <rect x="306" y="160" width="280" height="96" rx="14" fill="none" stroke="#2f73a8" strokeWidth="2" opacity="0.45" />
          <rect x="284" y="246" width="330" height="68" rx="20" fill="#12456f" />
          <rect x="392" y="230" width="142" height="50" rx="19" fill="#2f7bad" opacity="0.85" />
          <path d="M424 254c0-20 17-35 37-35s37 15 37 35Z" fill="#0a2e52" />
          <path d="M288 274h266c13 0 22 9 22 20 0 31-24 51-57 51H323c-33 0-57-20-57-51 0-11 9-20 22-20Z" fill="#17547f" />
          <path d="M288 274h266" stroke="#7fc9ef" strokeWidth="2" opacity="0.5" />
          <path d="M498 286c19-9 32-20 41-35" stroke="#12456f" strokeWidth="18" strokeLinecap="round" fill="none" />
          <circle cx="542" cy="249" r="9" fill="#1a5c8c" />

          <g className="fairy-scene__tablet" transform="translate(552 208) rotate(-14)">
            <rect x="-26" y="-38" width="52" height="76" rx="8" fill="#08243f" />
            <rect x="-22" y="-34" width="44" height="68" rx="6" fill="#0d3455" />
            <rect className="fairy-scene__tablet-screen" x="-22" y="-34" width="44" height="68" rx="6" fill="#8ad9ff" />
            <g className="fairy-scene__tablet-glow">
              <circle cx="0" cy="0" r="120" fill={`url(#${screen})`} />
            </g>
          </g>
        </g>

        <Fairy glow={glow} />
      </svg>
    </div>
  );
}

function Fairy({ glow }) {
  return (
    <g className="fairy-scene__fairy">
      <g className="fairy-scene__fairy-halo">
        <circle cx="0" cy="0" r="70" fill={`url(#${glow})`} />
      </g>
      <g className="fairy-scene__wings">
        <path className="fairy-scene__wing fairy-scene__wing--a" d="M-2 -4c-26-30-58-30-64-8 6 26 34 34 64 8Z" fill="#cdeeff" opacity="0.72" />
        <path className="fairy-scene__wing fairy-scene__wing--b" d="M2 -4c26-30 58-30 64-8-6 26-34 34-64 8Z" fill="#cdeeff" opacity="0.72" />
        <path className="fairy-scene__wing fairy-scene__wing--c" d="M-2 4c-22 26-50 26-56 6 6-22 30-30 56-6Z" fill="#a6dfff" opacity="0.5" />
        <path className="fairy-scene__wing fairy-scene__wing--d" d="M2 4c22 26 50 26 56 6-6-22-30-30-56-6Z" fill="#a6dfff" opacity="0.5" />
      </g>
      <ellipse cx="0" cy="2" rx="6.5" ry="15" fill="#ffffff" opacity="0.95" />
      <circle cx="0" cy="-16" r="7" fill="#ffffff" />
      <g className="fairy-scene__trail">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={-14 - i * 17}
            cy={i % 2 ? 7 : -7}
            r={3.4 - i * 0.42}
            fill="#d8f1ff"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </g>
    </g>
  );
}
