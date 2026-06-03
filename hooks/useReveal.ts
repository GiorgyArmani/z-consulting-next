import { useEffect } from 'react';

/**
 * Reveals `.reveal` elements as they scroll into view. Robust against
 * environments where IntersectionObserver callbacks don't fire: it does an
 * initial in-viewport pass, a scroll fallback and a hard failsafe timer so
 * content can never stay permanently hidden.
 */
export function useReveal(): void {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('in');
    const inView = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    const all = () => Array.from(document.querySelectorAll('.reveal'));

    all().forEach((el) => { if (inView(el)) reveal(el); });

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              reveal(e.target);
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      );
      all().forEach((el) => { if (!el.classList.contains('in')) io?.observe(el); });
    } catch {
      /* no IntersectionObserver support */
    }

    const onScroll = () =>
      all().forEach((el) => { if (!el.classList.contains('in') && inView(el)) reveal(el); });
    window.addEventListener('scroll', onScroll, { passive: true });

    const failsafe = window.setTimeout(() => all().forEach(reveal), 900);

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearTimeout(failsafe);
    };
  }, []);
}
