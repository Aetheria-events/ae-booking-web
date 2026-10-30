import { useId } from 'react';

/**
 * Original, code-drawn artwork used instead of stock photography.
 * Everything is generated from gradients and line work, so the site ships
 * without third-party image licences. Swap a frame for real event photography
 * by replacing <Artwork /> with an <img className="art" />.
 */

const palettes = {
  plum: {
    bg1: '#3A2044',
    bg2: '#0B0810',
    glow1: '#D08FA2',
    glow2: '#6B3F74',
    accent: '#EBD5A8',
    line: '#F0DCB6',
    moon: '#F7E9CE',
  },
  midnight: {
    bg1: '#1A2340',
    bg2: '#060911',
    glow1: '#93A1D6',
    glow2: '#41305F',
    accent: '#DCC08A',
    line: '#EBD8B2',
    moon: '#EFF0F7',
  },
  rose: {
    bg1: '#47232F',
    bg2: '#0E0A10',
    glow1: '#E7AEAE',
    glow2: '#8A555F',
    accent: '#F2D7B4',
    line: '#F4E2C9',
    moon: '#FCEFDE',
  },
  champagne: {
    bg1: '#3E2C1D',
    bg2: '#0D0A08',
    glow1: '#E0BF80',
    glow2: '#7A5530',
    accent: '#F5E3C4',
    line: '#F2E1C4',
    moon: '#FFF4DC',
  },
};

const stars = [
  [72, 92, 1.7],
  [156, 58, 1],
  [236, 122, 1.3],
  [330, 66, 1.5],
  [412, 112, 1.1],
  [498, 58, 1.4],
  [544, 156, 1],
  [64, 208, 1.1],
  [520, 244, 1.5],
  [112, 344, 1],
  [500, 396, 1.2],
  [56, 478, 1.3],
  [548, 522, 1.1],
  [92, 604, 1.2],
  [482, 660, 1.5],
  [178, 700, 1],
  [344, 726, 1.3],
  [416, 588, 0.9],
  [246, 214, 0.9],
  [388, 268, 1.1],
];

function Frame({ stroke, opacity = 0.35 }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth="0.8" opacity={opacity}>
      <rect x="18" y="18" width="564" height="724" rx="4" />
      <path d="M18 62V18h44M538 18h44v44M582 698v44h-44M62 742H18v-44" strokeWidth="1.3" />
      <path d="M299 18h2M299 742h2" strokeWidth="2" opacity="0.8" />
    </g>
  );
}

export default function Artwork({ variant = 'veil', palette = 'plum', className = '' }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const p = palettes[palette] || palettes.plum;

  const bgId = `bg${uid}`;
  const glowId = `glow${uid}`;
  const archId = `arch${uid}`;
  const vigId = `vig${uid}`;
  const softId = `soft${uid}`;
  const goldId = `gold${uid}`;
  const moonId = `moon${uid}`;
  const crownId = `crown${uid}`;

  return (
    <svg
      className={`art ${className}`}
      viewBox="0 0 600 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={bgId} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={p.bg1} />
          <stop offset="0.55" stopColor={p.bg2} />
          <stop offset="1" stopColor="#050409" />
        </linearGradient>

        <radialGradient id={glowId} cx="50%" cy="34%" r="66%">
          <stop offset="0" stopColor={p.glow1} stopOpacity="0.95" />
          <stop offset="0.38" stopColor={p.glow2} stopOpacity="0.62" />
          <stop offset="1" stopColor={p.glow2} stopOpacity="0" />
        </radialGradient>

        <radialGradient id={moonId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.moon} stopOpacity="0.85" />
          <stop offset="0.55" stopColor={p.glow1} stopOpacity="0.28" />
          <stop offset="1" stopColor={p.glow1} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={archId} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={p.line} stopOpacity="0.5" />
          <stop offset="0.42" stopColor={p.glow2} stopOpacity="0.42" />
          <stop offset="1" stopColor="#050409" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.accent} stopOpacity="0.95" />
          <stop offset="0.45" stopColor={p.line} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.glow1} stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id={crownId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.line} stopOpacity="0.7" />
          <stop offset="1" stopColor={p.line} stopOpacity="0" />
        </linearGradient>

        <radialGradient id={vigId} cx="50%" cy="42%" r="74%">
          <stop offset="0.48" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.62" />
        </radialGradient>

        <filter id={softId} x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      <rect width="600" height="760" fill={`url(#${bgId})`} />
      <ellipse cx="300" cy="270" rx="300" ry="280" fill={`url(#${glowId})`} />
      <ellipse cx="300" cy="188" rx="168" ry="140" fill={`url(#${moonId})`} />

      {/* faint celestial grid */}
      <g fill="none" stroke={p.line} opacity="0.1">
        <circle cx="300" cy="330" r="250" strokeWidth="0.7" />
        <circle cx="300" cy="330" r="196" strokeWidth="0.5" strokeDasharray="1 8" />
        <ellipse cx="300" cy="330" rx="250" ry="96" transform="rotate(-20 300 330)" strokeWidth="0.6" />
        <ellipse cx="300" cy="330" rx="118" ry="246" transform="rotate(34 300 330)" strokeWidth="0.5" />
      </g>

      {variant === 'veil' && (
        <g>
          {/* arch */}
          <path d="M144 760V352a156 156 0 0 1 312 0v408Z" fill={`url(#${archId})`} opacity="0.92" />
          <path d="M144 760V352a156 156 0 0 1 312 0v408" fill="none" stroke={`url(#${goldId})`} strokeWidth="1.6" opacity="0.85" />
          <path d="M162 760V356a138 138 0 0 1 276 0v404" fill="none" stroke={p.line} strokeWidth="0.7" opacity="0.32" />
          <path d="M118 760V340a182 182 0 0 1 364 0v420" fill="none" stroke={p.line} strokeWidth="0.5" opacity="0.16" />

          {/* radiating crown lines */}
          <g stroke={`url(#${crownId})`} strokeWidth="0.8">
            {Array.from({ length: 15 }).map((_, i) => {
              const angle = -88 + i * 12.6;
              const rad = (angle * Math.PI) / 180;
              const r1 = 168;
              const r2 = i % 3 === 0 ? 236 : 204;
              return (
                <line
                  key={angle}
                  x1={300 + Math.cos(rad) * r1}
                  y1={352 + Math.sin(rad) * r1}
                  x2={300 + Math.cos(rad) * r2}
                  y2={352 + Math.sin(rad) * r2}
                  opacity={i % 3 === 0 ? 0.5 : 0.24}
                />
              );
            })}
          </g>

          {/* hanging light strands */}
          <g stroke={p.line} fill="none" opacity="0.3">
            <path d="M196 210v210M182 250v130M210 292v104M404 210v210M418 250v130M390 292v104" strokeWidth="0.5" />
          </g>
          <g fill={p.accent}>
            {[
              [196, 424, 2.6],
              [182, 384, 2],
              [210, 400, 1.8],
              [404, 424, 2.6],
              [418, 384, 2],
              [390, 400, 1.8],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} opacity="0.75" />
            ))}
          </g>

          {/* foliage */}
          <g stroke={p.line} fill="none" opacity="0.4" strokeLinecap="round">
            <path d="M96 760c8-96 42-172 96-228" strokeWidth="1.1" />
            <path d="M504 760c-8-96-42-172-96-228" strokeWidth="1.1" />
            <path d="M120 700c-16-16-22-38-18-58" strokeWidth="0.7" />
            <path d="M480 700c16-16 22-38 18-58" strokeWidth="0.7" />
          </g>
          <g fill={p.line} opacity="0.42">
            <ellipse cx="118" cy="700" rx="20" ry="7" transform="rotate(-36 118 700)" />
            <ellipse cx="140" cy="644" rx="17" ry="6" transform="rotate(-30 140 644)" />
            <ellipse cx="166" cy="592" rx="14" ry="5.5" transform="rotate(-24 166 592)" />
            <ellipse cx="482" cy="700" rx="20" ry="7" transform="rotate(36 482 700)" />
            <ellipse cx="460" cy="644" rx="17" ry="6" transform="rotate(30 460 644)" />
            <ellipse cx="434" cy="590" rx="14" ry="5.5" transform="rotate(24 434 590)" />
          </g>

          {/* table horizon */}
          <path d="M0 690h600" stroke={p.line} strokeWidth="0.6" opacity="0.14" />
          <g fill={p.accent} opacity="0.5">
            <circle cx="84" cy="676" r="2.4" />
            <circle cx="516" cy="676" r="2.4" />
            <circle cx="138" cy="664" r="1.6" />
            <circle cx="462" cy="664" r="1.6" />
          </g>
        </g>
      )}

      {variant === 'orb' && (
        <g>
          <g fill="none" stroke={p.line} opacity="0.3">
            <ellipse cx="300" cy="352" rx="244" ry="94" transform="rotate(-18 300 352)" strokeWidth="0.9" />
            <ellipse cx="300" cy="352" rx="192" ry="72" transform="rotate(26 300 352)" strokeWidth="0.7" />
            <ellipse cx="300" cy="352" rx="272" ry="116" transform="rotate(64 300 352)" strokeWidth="0.6" strokeDasharray="2 7" />
          </g>

          {[196, 154, 112].map((r, i) => (
            <circle key={r} cx="300" cy="352" r={r} fill="none" stroke={`url(#${goldId})`} strokeWidth={i === 0 ? 1.4 : 0.7} opacity={0.55 - i * 0.12} />
          ))}

          <circle cx="300" cy="352" r="104" fill={`url(#${archId})`} opacity="0.96" />
          <circle cx="300" cy="352" r="104" fill="none" stroke={p.line} strokeWidth="0.8" opacity="0.4" />
          <circle cx="300" cy="352" r="44" fill={`url(#${goldId})`} opacity="0.92" />
          <circle cx="300" cy="352" r="44" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.7" />
          <path d="M282 352l12-16 12 16-12 16z" fill={p.bg2} opacity="0.55" />

          <circle cx="462" cy="286" r="7" fill={p.accent} opacity="0.9" />
          <circle cx="462" cy="286" r="15" fill="none" stroke={p.accent} strokeWidth="0.7" opacity="0.35" />
          <circle cx="158" cy="424" r="4" fill={p.line} opacity="0.85" />
          <circle cx="158" cy="424" r="10" fill="none" stroke={p.line} strokeWidth="0.6" opacity="0.3" />

          {/* plinth + drape */}
          <path d="M300 456c-42 16-72 8-72 8l16 66h112l16-66s-30 8-72-8Z" fill={p.bg2} opacity="0.5" />
          <path d="M228 664h144M210 700h180" stroke={p.line} strokeWidth="0.7" opacity="0.22" />
          <path d="M240 664c26 22 94 22 120 0" fill="none" stroke={`url(#${goldId})`} strokeWidth="1.2" opacity="0.6" />
        </g>
      )}

      {variant === 'bloom' && (
        <g transform="translate(0 24)">
          <g transform="translate(300 336)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <path
                key={deg}
                d="M0 0C-50-58-48-152 0-198C48-152 50-58 0 0Z"
                fill={`url(#${archId})`}
                stroke={p.line}
                strokeWidth="0.8"
                opacity="0.46"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
          <circle cx="300" cy="360" r="54" fill={`url(#${goldId})`} opacity="0.92" />
          <circle cx="300" cy="360" r="54" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.6" />
          <circle cx="300" cy="360" r="74" fill="none" stroke={p.line} strokeWidth="0.6" opacity="0.28" strokeDasharray="1 6" />
          <circle cx="300" cy="360" r="118" fill="none" stroke={p.line} strokeWidth="0.5" opacity="0.16" />
          <path d="M300 536c-38 66-36 118 0 168 36-50 38-102 0-168Z" fill={`url(#${archId})`} opacity="0.6" />
          <path d="M300 542v162" stroke={p.line} strokeWidth="0.7" opacity="0.35" />
          <g fill={p.accent} opacity="0.6">
            <circle cx="196" cy="470" r="2.4" />
            <circle cx="404" cy="470" r="2.4" />
            <circle cx="246" cy="530" r="1.8" />
            <circle cx="354" cy="530" r="1.8" />
          </g>
        </g>
      )}

      {variant === 'ribbon' && (
        <g>
          {/* draped silk */}
          <g strokeLinecap="round" fill="none" filter={`url(#${softId})`}>
            <path d="M-70 586C112 502 154 320 322 296s248 58 348 4" stroke={p.glow1} strokeWidth="86" opacity="0.3" />
            <path d="M-70 638C130 550 200 392 358 364s226 42 312 -18" stroke={p.glow2} strokeWidth="66" opacity="0.55" />
            <path d="M-70 520C120 438 214 286 372 276s230 68 300 26" stroke={p.glow1} strokeWidth="34" opacity="0.18" />
          </g>
          <g strokeLinecap="round" fill="none">
            <path d="M-70 588C114 504 158 326 322 302s246 56 344 4" stroke={`url(#${goldId})`} strokeWidth="14" opacity="0.6" />
            <path d="M-70 588C114 504 158 326 322 302s246 56 344 4" stroke={p.accent} strokeWidth="0.9" opacity="0.7" />
            <path d="M-70 648C132 562 202 406 360 378s222 40 306 -18" stroke={p.line} strokeWidth="1.3" opacity="0.5" />
            <path d="M-50 536C140 450 222 296 380 288s218 66 276 30" stroke={p.line} strokeWidth="0.8" opacity="0.28" />
          </g>

          {/* arch with crown rays */}
          <path d="M180 760V396a120 120 0 0 1 240 0v364Z" fill={`url(#${archId})`} opacity="0.55" />
          <path d="M180 760V396a120 120 0 0 1 240 0v364" fill="none" stroke={`url(#${goldId})`} strokeWidth="1.3" opacity="0.75" />
          <path d="M198 760V400a102 102 0 0 1 204 0v360" fill="none" stroke={p.line} strokeWidth="0.7" opacity="0.3" />
          <g stroke={`url(#${crownId})`} strokeWidth="0.8">
            {Array.from({ length: 11 }).map((_, i) => {
              const angle = -85 + i * 17;
              const rad = (angle * Math.PI) / 180;
              const r1 = 132;
              const r2 = i % 2 === 0 ? 192 : 164;
              return (
                <line
                  key={angle}
                  x1={300 + Math.cos(rad) * r1}
                  y1={396 + Math.sin(rad) * r1}
                  x2={300 + Math.cos(rad) * r2}
                  y2={396 + Math.sin(rad) * r2}
                  opacity={i % 2 === 0 ? 0.42 : 0.2}
                />
              );
            })}
          </g>
          <g fill={p.accent}>
            <circle cx="300" cy="252" r="3.4" opacity="0.9" />
            <circle cx="256" cy="272" r="2" opacity="0.6" />
            <circle cx="344" cy="272" r="2" opacity="0.6" />
          </g>

          {/* floor glow */}
          <ellipse cx="300" cy="742" rx="230" ry="26" fill={p.glow1} opacity="0.16" filter={`url(#${softId})`} />
        </g>
      )}

      <g fill={p.accent}>
        {stars.map(([cx, cy, r], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} opacity={0.28 + (i % 4) * 0.16} />
        ))}
      </g>

      <rect width="600" height="760" fill={`url(#${vigId})`} />
      <Frame stroke={p.line} opacity={0.22} />
    </svg>
  );
}
