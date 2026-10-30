const words = [
  'Weddings',
  'Debuts',
  'Corporate evenings',
  'Milestones',
  'Private dinners',
  'Receptions',
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {words.map((word, index) => (
              <span key={`${group}-${word}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
                <span className={`marquee__item ${index % 3 === 1 ? 'marquee__item--accent' : ''}`}>
                  {word}
                </span>
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">
        Aetheria Events creates digital pages for weddings, debuts, corporate evenings, milestones,
        private dinners and receptions.
      </p>
    </div>
  );
}
