'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wrapRef       = useRef(null);
  const cardRef       = useRef(null);
  const topOrnRef     = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleRef      = useRef(null);
  const dividerRef    = useRef(null);
  const bodyRef       = useRef(null);
  const closingRef    = useRef(null);
  const botOrnRef     = useRef(null);
  const copyrightRef  = useRef(null);
  const roseRefsArr   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (delay = 0) => ({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 80%',
          once: true,
        },
        delay,
      });

      // Card rises and scales in
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', ...st(0) }
      );

      // Rose corners fade in
      gsap.fromTo(roseRefsArr.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out', stagger: 0.08, ...st(0.3) }
      );

      // Top ornament
      gsap.fromTo(topOrnRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', ...st(0.5) }
      );

      // Eyebrow
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', ...st(0.6) }
      );

      // Title — big handwritten line
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', ...st(0.72) }
      );

      // Divider draws
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', ...st(0.85) }
      );

      // Body paragraphs stagger
      const bodyLines = bodyRef.current?.querySelectorAll('.footer-body-line');
      if (bodyLines) {
        gsap.fromTo(bodyLines,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out', ...st(1.0) }
        );
      }

      // Closing line
      gsap.fromTo(closingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ...st(1.35) }
      );

      // Bottom ornament
      gsap.fromTo(botOrnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ...st(1.5) }
      );

      // Copyright below card
      gsap.fromTo(copyrightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ...st(1.7) }
      );

    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

        .footer-wrap {
          background-color: #e8e3d9;
          padding: 100px 6vw 60px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Tofu paper noise */
        .footer-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.04;
          pointer-events: none;
        }

        /* ── THE CARD ── */
        .footer-card {
          position: relative;
          width: 100%;
          max-width: 680px;
          background: #111010;
          border-radius: 4px;
          padding: clamp(48px, 7vw, 80px) clamp(36px, 6vw, 72px) clamp(48px, 7vw, 72px);
          text-align: center;
          opacity: 0;
          overflow: hidden;
          box-shadow:
            0 24px 80px rgba(28,21,16,0.18),
            0 4px 16px rgba(28,21,16,0.10);
        }

        /* Chalkboard horizontal lines */
        .footer-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.013) 3px,
            rgba(255,255,255,0.013) 4px
          );
          pointer-events: none;
        }

        /* Chalk noise */
        .footer-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.055;
          pointer-events: none;
        }

        /* all children above pseudo layers */
        .footer-card > * { position: relative; z-index: 1; }

        /* ── ROSE CORNERS ── */
        .footer-rose {
          position: absolute;
          z-index: 1;
          opacity: 0;
        }
        .footer-rose.tl { top: 0;    left: 0; }
        .footer-rose.tr { top: 0;    right: 0; transform: scaleX(-1); }
        .footer-rose.bl { bottom: 0; left: 0;  transform: scaleY(-1); }
        .footer-rose.br { bottom: 0; right: 0; transform: scale(-1);  }

        /* ── ORNAMENTS ── */
        .footer-orn {
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.22);
          font-size: 22px;
          letter-spacing: 0.3em;
          margin-bottom: 24px;
          display: block;
          opacity: 0;
        }

        /* ── EYEBROW ── */
        .footer-eyebrow {
          display: block;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 9.5px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
          opacity: 0;
        }

        /* ── TITLE — BIG SCRIPT ── */
        .footer-title {
          font-family: 'Pinyon Script', cursive;
          font-size: clamp(52px, 8vw, 96px);
          color: #f7f3ec;
          line-height: 1.05;
          margin: 0 0 28px;
          opacity: 0;
          text-shadow:
            0 2px 24px rgba(255,255,255,0.04),
            1px 1px 0 rgba(0,0,0,0.5);
          /* Subtle chalk texture */
          -webkit-font-smoothing: antialiased;
        }

        /* ── DIVIDER — ornamental swash ── */
        .footer-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 0 0 32px;
        }

        .footer-divider-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255,255,255,0.18) 40%,
            rgba(255,255,255,0.18) 60%,
            transparent
          );
        }

        .footer-divider-center {
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.22);
          font-size: 16px;
          letter-spacing: 0.5em;
          flex-shrink: 0;
        }

        /* ── BODY ── */
        .footer-body {
          margin-bottom: 36px;
        }

        .footer-body-line {
          font-family: 'EB Garamond', serif;
          font-size: clamp(14px, 1.4vw, 17px);
          color: rgba(255,255,255,0.52);
          line-height: 1.8;
          letter-spacing: 0.01em;
          display: block;
          opacity: 0;
        }

        .footer-body-line.em {
          font-style: italic;
          color: rgba(255,255,255,0.36);
          font-size: clamp(12px, 1.1vw, 14px);
          margin-top: 6px;
          letter-spacing: 0.05em;
        }

        /* ── CLOSING LINE — script ── */
        .footer-closing {
          font-family: 'Pinyon Script', cursive;
          font-size: clamp(28px, 3.5vw, 44px);
          color: rgba(255,255,255,0.55);
          line-height: 1.2;
          margin-bottom: 32px;
          display: block;
          opacity: 0;
        }

        /* ── BOTTOM ORNAMENT ── */
        .footer-bot-orn {
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.15);
          font-size: 18px;
          letter-spacing: 0.35em;
          display: block;
          opacity: 0;
        }

        /* ── COPYRIGHT — outside card ── */
        .footer-copyright {
          margin-top: 36px;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9a8878;
          opacity: 0;
          text-align: center;
        }
      `}</style>

      <footer ref={wrapRef} className="footer-wrap">
        <div ref={cardRef} className="footer-card">

          {/* ── Rose corners (SVG) ── */}
          {['tl','tr','bl','br'].map((pos, i) => (
            <div
              key={pos}
              className={`footer-rose ${pos}`}
              ref={(el) => (roseRefsArr.current[i] = el)}
            >
              <RoseSVG />
            </div>
          ))}

          {/* Top flourish */}
          <span ref={topOrnRef} className="footer-orn">❧ ✦ ❧</span>

          {/* Eyebrow */}
          <span ref={eyebrowRef} className="footer-eyebrow">
            — Thank you for being here —
          </span>

          {/* Main title */}
          <h2 ref={titleRef} className="footer-title">
            Until we meet again
          </h2>

          {/* Ornamental divider */}
          <div ref={dividerRef} className="footer-divider">
            <div className="footer-divider-line" />
            <span className="footer-divider-center">~ · ~</span>
            <div className="footer-divider-line" />
          </div>

          {/* Body text */}
          <div ref={bodyRef} className="footer-body">
            <span className="footer-body-line">
              Every table is a story we are grateful to be part of.
            </span>
            <span className="footer-body-line">
              Come hungry. Leave slowly.
            </span>
            <span className="footer-body-line em">
              — The Kitchen
            </span>
          </div>

          {/* Closing script */}
          <span ref={closingRef} className="footer-closing">
            Bon appétit, always.
          </span>

          {/* Bottom flourish */}
          <span ref={botOrnRef} className="footer-bot-orn">❧ ✦ ❧</span>

        </div>

        {/* Copyright outside card */}
        <p ref={copyrightRef} className="footer-copyright">
          © {new Date().getFullYear()} &nbsp;·&nbsp; All rights reserved
        </p>
      </footer>
    </>
  );
}

// ─── Rose corner SVG ─────────────────────────────────────────────────────────
function RoseSVG() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rose bloom */}
      <circle cx="28" cy="28" r="14" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      <circle cx="28" cy="28" r="9"  stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" fill="none"/>
      <circle cx="28" cy="28" r="5"  stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" fill="none"/>
      {/* Petals */}
      <path d="M28 14 Q34 20 28 22 Q22 20 28 14Z" stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" fill="none"/>
      <path d="M42 28 Q36 34 34 28 Q36 22 42 28Z" stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" fill="none"/>
      <path d="M28 42 Q22 36 28 34 Q34 36 28 42Z" stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" fill="none"/>
      <path d="M14 28 Q20 22 22 28 Q20 34 14 28Z" stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" fill="none"/>
      {/* Diagonal petals */}
      <path d="M38 18 Q36 26 30 24 Q32 16 38 18Z" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" fill="none"/>
      <path d="M38 38 Q30 36 32 30 Q40 32 38 38Z" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" fill="none"/>
      <path d="M18 38 Q20 30 26 32 Q24 40 18 38Z" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" fill="none"/>
      <path d="M18 18 Q26 20 24 26 Q16 24 18 18Z" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" fill="none"/>
      {/* Stem */}
      <path d="M28 42 Q32 68 20 90 Q14 110 8 130"
        stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* Leaves off stem */}
      <path d="M26 58 Q12 52 10 42 Q22 48 26 58Z"
        stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" fill="none"/>
      <path d="M22 76 Q36 68 40 58 Q28 66 22 76Z"
        stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" fill="none"/>
      <path d="M16 98 Q4 90 4 78 Q16 86 16 98Z"
        stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" fill="none"/>
      {/* Tendrils */}
      <path d="M24 64 Q18 60 20 54"
        stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      <path d="M18 90 Q24 88 26 82"
        stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      {/* Second small bud top-right area */}
      <circle cx="58" cy="14" r="7" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" fill="none"/>
      <path d="M58 7 Q62 11 58 13 Q54 11 58 7Z"  stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none"/>
      <path d="M65 14 Q61 18 59 14 Q61 10 65 14Z" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none"/>
      <path d="M51 14 Q55 10 57 14 Q55 18 51 14Z" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none"/>
      <path d="M58 21 Q54 17 58 15 Q62 17 58 21Z" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" fill="none"/>
    </svg>
  );
}