import { Link } from 'react-router-dom';
import { formatPeso } from '../data/site';
import { Check, Minus } from './Icons';

export default function PlanCard({ plan, compact = false, ctaLabel = 'Choose this plan' }) {
  const features = compact ? plan.features.slice(0, 4) : plan.features;
  const excluded = compact ? [] : plan.notIncluded;

  return (
    <article className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
      {plan.badge && <span className="plan__badge badge">{plan.badge}</span>}

      <div className="plan__head">
        <h3 className="plan__name">{plan.name}</h3>
        <span className="plan__for">{plan.featured ? 'For the full experience' : 'Digital invitation'}</span>
      </div>

      <p className="plan__price">
        {formatPeso(plan.price)}
        <small>one-time</small>
      </p>

      <p className="plan__summary">{plan.summary}</p>

      <ul className="plan__list">
        {features.map((feature) => (
          <li key={feature}>
            <Check className="plan__tick" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
        {excluded.map((feature) => (
          <li className="is-muted" key={feature}>
            <Minus className="plan__cross" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="plan__foot">
        <Link
          to={`/booking?package=${plan.id}`}
          className={`btn ${plan.featured ? 'btn--gold' : 'btn--dark'} btn--block`}
        >
          {ctaLabel}
        </Link>
        <div className="plan__turnaround">
          <span>Delivered in</span>
          <strong>{plan.turnaround}</strong>
        </div>
      </div>
    </article>
  );
}
