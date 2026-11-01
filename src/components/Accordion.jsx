import { useId, useState } from 'react';

export default function Accordion({ items, defaultOpen = 0, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`faq ${className}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${uid}-${index}`;
        const buttonId = `faq-btn-${uid}-${index}`;

        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq__btn"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="faq__panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
            >
              <div className="faq__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
