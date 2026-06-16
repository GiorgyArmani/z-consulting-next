'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { DATA } from '../data';
import { t } from '../lib/locale';
import { Arrow } from './Arrow';
import type { Lang } from '../types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** "Start a project" modal — collects an inquiry and emails it via /api/contact. */
export function ContactModal({
  lang,
  open,
  onClose,
}: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}) {
  const D = DATA.form;
  const [status, setStatus] = useState<Status>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Esc to close + scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Fresh form + focus each time it opens.
  useEffect(() => {
    if (open) {
      setStatus('idle');
      setFiles([]);
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 380);
      return () => clearTimeout(id);
    }
  }, [open]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    // Multipart so file attachments ride along with the text fields.
    const payload = new FormData(form);
    payload.set('lang', lang);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: payload });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFiles([]);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(e.target.files ?? []));
  }

  return (
    <div
      className={`cm-overlay${open ? ' open' : ''}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label={t(D.tag, lang)}
    >
      <div className="cm">
        <span className="cm-glow" aria-hidden="true" />
        <button className="cm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {status === 'sent' ? (
          <div className="cm-sent" role="status">
            <div className="cm-fx" aria-hidden="true">
              <svg viewBox="0 0 140 140" width="140" height="140" fill="none">
                {/* orbit ring that draws itself */}
                <circle className="cm-ring" cx="70" cy="70" r="56" stroke="currentColor" strokeWidth="1.5" />
                {/* motion trail */}
                <path className="cm-trail" d="M22 96 C 40 88, 52 80, 66 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
                {/* paper plane */}
                <g className="cm-plane">
                  <path
                    d="M58 76 L96 56 L74 90 L70 76 Z M70 76 L96 56"
                    fill="var(--accent)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </g>
                {/* success check pops in after the plane leaves */}
                <g className="cm-check">
                  <circle cx="70" cy="70" r="26" fill="var(--accent)" />
                  <path d="M59 70.5 L66.5 78 L81 61.5" stroke="#1a120c" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              </svg>
            </div>
            <h3>{t(D.sentH, lang)}</h3>
            <p>{t(D.sentP, lang)}</p>
            <button className="btn btn-accent" onClick={onClose}>
              {t(D.done, lang)}
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow cm-tag">{t(D.tag, lang)}</span>
            <h3 className="cm-title">{t(D.h2, lang)}</h3>
            <p className="cm-sub">{t(D.p, lang)}</p>

            <form className="cm-form" onSubmit={submit}>
              {/* Honeypot — hidden from real users. */}
              <input className="cm-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="cm-row">
                <div className="cm-field">
                  <label htmlFor="cm-name">{t(D.name, lang)}</label>
                  <input ref={firstFieldRef} id="cm-name" name="name" type="text" required maxLength={120} placeholder={t(D.namePh, lang)} />
                </div>
                <div className="cm-field">
                  <label htmlFor="cm-email">{t(D.email, lang)}</label>
                  <input id="cm-email" name="email" type="email" required maxLength={200} placeholder={t(D.emailPh, lang)} />
                </div>
              </div>

              <div className="cm-field">
                <label htmlFor="cm-company">{t(D.company, lang)}</label>
                <input id="cm-company" name="company" type="text" maxLength={160} placeholder={t(D.companyPh, lang)} />
              </div>

              <div className="cm-field">
                <label htmlFor="cm-message">{t(D.message, lang)}</label>
                <textarea id="cm-message" name="message" required maxLength={5000} rows={5} placeholder={t(D.messagePh, lang)} />
              </div>

              <div className="cm-field">
                <label htmlFor="cm-files">{t(D.attach, lang)}</label>
                <input
                  id="cm-files"
                  className="cm-file-input"
                  name="files"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.png,.jpg,.jpeg,.gif,.webp,image/*,application/pdf"
                  onChange={onFilesChange}
                />
                <label htmlFor="cm-files" className="cm-file">
                  <span className="cm-file-cta">📎 {t(D.attachCta, lang)}</span>
                  <span className="cm-file-hint">{t(D.attachHint, lang)}</span>
                </label>
                {files.length > 0 && (
                  <ul className="cm-file-list">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`}>
                        <span className="cm-file-name">{f.name}</span>
                        <span className="cm-file-size">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button className={`btn btn-accent cm-submit${status === 'sending' ? ' busy' : ''}`} type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    {t(D.sending, lang)} <span className="cm-spinner" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    {t(D.submit, lang)} <Arrow />
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="cm-error" role="alert">
                  {t(D.error, lang)} <a href={`mailto:${DATA.cta.email}`}>{DATA.cta.email}</a>
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
