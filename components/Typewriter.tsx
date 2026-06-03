import { useEffect, useState } from 'react';

export interface TypewriterProps {
  phrases: string[];
  typing?: number;
  deleting?: number;
  hold?: number;
  className?: string;
}

/** Types and deletes through a list of phrases, looping. */
export function Typewriter({ phrases, typing = 72, deleting = 36, hold = 1600, className }: TypewriterProps) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    setI(0);
    setTxt('');
    setDel(false);
  }, [phrases.join('|')]);

  useEffect(() => {
    const full = phrases[i % phrases.length];
    let timer: number | undefined;
    if (!del && txt === full) {
      timer = window.setTimeout(() => setDel(true), hold);
    } else if (del && txt === '') {
      setDel(false);
      setI((v) => (v + 1) % phrases.length);
    } else {
      timer = window.setTimeout(
        () => setTxt(full.slice(0, txt.length + (del ? -1 : 1))),
        del ? deleting : typing,
      );
    }
    return () => clearTimeout(timer);
  }, [txt, del, i, phrases, typing, deleting, hold]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true">
        {txt}
        <span className="tw-caret" />
      </span>
    </span>
  );
}
