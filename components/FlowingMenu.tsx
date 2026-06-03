'use client';

import { useEffect, useRef, Fragment, type MouseEvent } from 'react';
import { gsap } from 'gsap';

export interface FlowMenuItemData {
  text: string;
  link: string;
}

export interface FlowingMenuProps {
  items: FlowMenuItemData[];
  /** Marquee scroll duration in seconds (lower = faster). */
  speed?: number;
  /** Accent colour for the hover marquee + chip. */
  accent?: string;
}

interface ItemProps extends FlowMenuItemData {
  idx: string;
  isFirst: boolean;
  speed: number;
  accent: string;
}

const DEFAULTS = { duration: 0.6, ease: 'expo' };

function MenuItem({ link, text, idx, isFirst, speed, accent }: ItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const reps = 6;

  const closestEdge = (mx: number, my: number, w: number, h: number): 'top' | 'bottom' => {
    const top = (mx - w / 2) ** 2 + my ** 2;
    const bot = (mx - w / 2) ** 2 + (my - h) ** 2;
    return top < bot ? 'top' : 'bottom';
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      const part = innerRef.current?.querySelector('.marquee-part') as HTMLElement | null;
      if (!part) return;
      const w = part.offsetWidth;
      if (!w) return;
      animRef.current?.kill();
      animRef.current = gsap.to(innerRef.current, { x: -w, duration: speed, ease: 'none', repeat: -1 });
    }, 60);
    return () => {
      clearTimeout(id);
      animRef.current?.kill();
    };
  }, [speed, text]);

  const enter = (ev: MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: DEFAULTS })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(innerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, innerRef.current], { y: '0%' }, 0);
  };

  const leave = (ev: MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: DEFAULTS })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(innerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const part = (
    <div className="marquee-part">
      <span>{text}</span>
      <span className="marquee-chip" style={{ background: accent }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 12 12 4M5.5 4H12v6.5" stroke="#1a120c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );

  return (
    <div className={`flow-item${isFirst ? ' first' : ''}`} ref={itemRef}>
      <a className="flow-link" href={link} onMouseEnter={enter} onMouseLeave={leave}>
        <span>{text}</span>
        <span className="flow-idx">{idx}</span>
      </a>
      <div className="flow-marquee" ref={marqueeRef}>
        <div className="flow-marquee-inner" ref={innerRef}>
          {Array.from({ length: reps }).map((_, i) => (
            <Fragment key={i}>{part}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/** FlowingMenu — big animated nav rows with a hover marquee (adapted from React Bits). */
export default function FlowingMenu({ items, speed = 16, accent = '#CB4E22' }: FlowingMenuProps) {
  return (
    <nav className="flowmenu">
      {items.map((it, i) => (
        <MenuItem
          key={i}
          {...it}
          idx={String(i + 1).padStart(2, '0')}
          isFirst={i === 0}
          speed={speed}
          accent={accent}
        />
      ))}
    </nav>
  );
}
