import { useEffect, useState } from 'react';

function diffFrom(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (!Number.isFinite(ms)) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const clamped = Math.max(0, ms);
  return {
    done: ms <= 0,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function Countdown({ target, label = 'Until the celebration' }) {
  const [time, setTime] = useState(() => diffFrom(target));

  useEffect(() => {
    setTime(diffFrom(target));
    const id = window.setInterval(() => setTime(diffFrom(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (time.done) {
    return (
      <div className="countdown">
        <p className="countdown__done">The day has arrived.</p>
      </div>
    );
  }

  const units = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <div className="countdown" role="timer" aria-label={label}>
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          <span className="countdown__value">{String(unit.value).padStart(2, '0')}</span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
      <span className="sr-only">
        {time.days} days, {time.hours} hours, {time.minutes} minutes and {time.seconds} seconds remaining.
      </span>
    </div>
  );
}
