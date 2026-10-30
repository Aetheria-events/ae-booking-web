import { Link } from 'react-router-dom';

/**
 * Aetheria Events monogram — two overlapping rounded bars forming an "A".
 * Traced from the supplied logo artwork and rebuilt as pure vector paths, so it
 * stays crisp at any size and can be recoloured with `variant`.
 */

const VIEW_BOX = '0 0 898.8 1000.0';

// The deep bar also carries the silhouette of the mark, so the mono version
// (watermarks, favicons) is a single path.
const BAR_DEEP =
  'M356.7 978.8C360.9 978.1 369.8 975.8 371.3 975.1C372.2 974.7 374.2 973.9 375.8 973.3C377.4 972.6 378.9 971.9 379.2 971.7C379.5 971.5 381.0 970.6 382.5 969.7C393.6 963.6 404.2 952.2 410.2 939.8C411.8 936.5 432.1 876.3 475.9 744.9C510.8 640.3 539.4 554.4 539.6 554.0C539.8 553.5 565.9 605.0 603.5 680.3C649.4 772.0 667.7 808.1 669.3 810.0C682.0 825.2 703.9 827.7 719.3 815.9C724.6 811.9 861.1 674.8 864.5 670.2C873.6 657.7 878.0 644.2 878.0 628.4C878.0 620.5 877.2 615.3 874.7 607.2C873.4 603.1 851.2 558.3 768.2 392.4L663.4 182.7L676.0 144.7C683.0 123.8 689.0 105.0 689.5 103.1C690.9 97.0 690.1 87.8 687.9 83.0C687.5 82.1 687.1 81.2 687.1 80.9C687.1 80.7 686.2 79.0 685.0 77.1C680.4 69.3 672.7 63.5 663.4 60.7C659.7 59.6 658.5 59.6 630.6 59.4L601.7 59.1L596.2 48.3C590.6 37.2 588.2 33.7 583.5 29.7C573.5 21.1 558.1 18.9 545.9 24.3C540.1 26.9 536.8 29.7 522.0 44.3L507.1 59.2L431.6 59.4C350.9 59.6 355.0 59.5 345.2 62.1C326.0 67.2 308.9 81.9 300.2 100.6C298.0 105.5 22.7 932.3 21.8 936.9C20.0 945.7 21.7 954.3 26.9 962.8C32.0 971.3 42.7 977.9 53.2 979.0C57.9 979.5 353.9 979.4 356.7 978.8Z';

const BAR_SKY =
  'M705.1 822.5C710.0 821.4 715.4 818.9 719.3 815.9C724.6 811.9 861.1 674.8 864.5 670.2C873.6 657.7 878.0 644.2 878.0 628.4C878.0 620.6 877.2 615.3 874.8 607.4C873.6 603.6 842.2 540.4 737.7 331.2L602.3 60.0L628.6 59.7L654.9 59.5L628.3 59.3L601.7 59.2L596.2 48.3C590.6 37.2 588.2 33.7 583.5 29.7C573.5 21.1 558.1 18.9 545.9 24.3C540.1 26.9 536.8 29.7 522.0 44.4L507.0 59.2L435.0 59.4L362.9 59.5L434.7 59.6L506.5 59.8L450.9 115.4C409.1 157.3 394.6 172.2 392.4 175.3C383.4 188.4 378.9 203.4 379.6 218.6C380.0 226.7 380.8 231.0 383.2 238.2C384.4 242.0 405.8 285.3 462.3 398.4C504.9 483.6 539.6 553.5 539.4 553.7C539.2 554.0 539.3 554.0 539.6 553.8C539.9 553.7 566.9 607.0 603.6 680.5C649.5 772.1 667.7 808.1 669.3 810.0C678.1 820.6 692.1 825.4 705.1 822.5Z';

export function LogoMark({ className = '', variant = 'color', title } ) {
  const mono = variant === 'mono';
  return (
    <svg
      className={`logo__mark ${className}`}
      viewBox={VIEW_BOX}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      <path d={BAR_DEEP} fill={mono ? 'currentColor' : '#004AAD'} fillRule="evenodd" />
      {!mono && <path d={BAR_SKY} fill="#38B6FF" fillRule="evenodd" />}
    </svg>
  );
}

export default function Logo({
  as = 'link',
  to = '/',
  variant = '',
  showSub = true,
  className = '',
  markVariant = 'color',
  ariaLabel = 'Aetheria Events — home',
}) {
  const inner = (
    <>
      <LogoMark variant={markVariant} />
      <span className="logo__type">
        <span className="logo__name">Aetheria</span>
        {showSub && <span className="logo__sub">Events</span>}
      </span>
    </>
  );

  const classes = ['logo', variant ? `logo--${variant}` : '', className].filter(Boolean).join(' ');

  if (as === 'link') {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  return <span className={classes}>{inner}</span>;
}
