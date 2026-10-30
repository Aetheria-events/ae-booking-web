export default function SectionHead({ eyebrow, title, children, center = false, className = '' }) {
  if (center) {
    return (
      <div className={`section-head section-head--center ${className}`}>
        {eyebrow && <p className="eyebrow eyebrow--center">{eyebrow}</p>}
        <h2>{title}</h2>
        {children}
      </div>
    );
  }

  return (
    <div className={`section-head ${className}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {children && <div className="lede">{children}</div>}
    </div>
  );
}
