import { useEffect, useRef } from 'react';

const words = [
  'Weddings',
  'Debuts',
  'Corporate evenings',
  'Milestones',
  'Private dinners',
  'Receptions',
];

const COPIES = 3;
const SPEED = 62; // pixels per second

/**
 * Running band of event types. The movement is driven in JavaScript rather than
 * by a CSS animation so it keeps running regardless of how the page is
 * rendered, pauses on hover, and always loops without a visible seam.
 */
export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame = 0;
    let offset = 0;
    let last = performance.now();
    let paused = false;

    const step = (now) => {
      const delta = Math.min(now - last, 64);
      last = now;

      if (!paused) {
        // one copy is exactly a third of the track, so wrapping at that point
        // repeats the same frame and the loop reads as continuous
        const copyWidth = track.scrollWidth / COPIES;
        if (copyWidth > 0) {
          offset = (offset + (SPEED * delta) / 1000) % copyWidth;
          track.style.transform = `translate3d(${-offset.toFixed(2)}px, 0, 0)`;
        }
      }

      frame = requestAnimationFrame(step);
    };

    if (!prefersReduced) frame = requestAnimationFrame(step);

    const hold = () => {
      paused = true;
    };
    const release = () => {
      paused = false;
      last = performance.now();
    };

    const band = track.parentElement;
    band.addEventListener('pointerenter', hold);
    band.addEventListener('pointerleave', release);
    band.addEventListener('focusin', hold);
    band.addEventListener('focusout', release);

    return () => {
      cancelAnimationFrame(frame);
      band.removeEventListener('pointerenter', hold);
      band.removeEventListener('pointerleave', release);
      band.removeEventListener('focusin', hold);
      band.removeEventListener('focusout', release);
    };
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {Array.from({ length: COPIES }, (_, group) => (
          <div className="marquee__group" key={group}>
            {words.map((word) => (
              <span className="marquee__pair" key={`${group}-${word}`}>
                <span className="marquee__item">{word}</span>
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
