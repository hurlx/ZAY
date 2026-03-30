'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const WORD_LEFT  = 'EXPER';       // top-left piece
const WORD_RIGHT = 'IENCE';       // bottom-right piece
const DESC = 'Where every detail earns its place. A quiet obsession with flavour, craft, and the kind of hospitality that feels like memory.';
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef(null);

  // mask wrapper refs — overflow:hidden clips the upward slide
  const mask1Ref = useRef(null);
  const mask2Ref = useRef(null);
  const maskDescRef = useRef(null);

  // text node refs — these are what GSAP moves
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const descRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // All three elements start below their mask and slide UP — classic reveal
      gsap.set([text1Ref.current, text2Ref.current, descRef.current], {
        y: '110%',
      });

      tl
        .to(text1Ref.current, { y: '0%', duration: 1.15 }, 0)
        .to(text2Ref.current, { y: '0%', duration: 1.15 }, 0.18)
        .to(descRef.current,  { y: '0%', duration: 0.95 }, 0.38);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,900;1,6..96,400&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

        /* ── SECTION ── */
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background-color: #e8e3d9;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Paper grain */
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
          opacity: 0.038;
          pointer-events: none;
          z-index: 0;
        }

        /* ── LAYOUT WRAPPER ── */
        .hero-body {
          position: relative;
          z-index: 1;
          width: 100%;
          /* Vertical rhythm: controlled by line heights + gaps */
        }

        /* ── SHARED DISPLAY STYLE ── */
        .hero-word {
          font-family: 'Bodoni Moda', 'Georgia', serif;
          font-weight: 900;
          font-size: clamp(110px, 17vw, 260px);
          line-height: 0.88;
          color: #111010;
          letter-spacing: -0.025em;
          display: block;
          white-space: nowrap;
          -webkit-font-smoothing: antialiased;
        }

        /* ── MASK WRAPPERS — overflow:hidden clips the slide-up ── */
        .hero-mask {
          overflow: hidden;
          display: block;
        }

        /* ── LINE 1 — left side, slightly indented ── */
        .hero-line-1 {
          padding-left: clamp(16px, 3.5vw, 60px);
        }

        /* ── LINE 2 — offset right, sits just below line 1 ── */
        /* margin-top creates the staircase gap matching the inspiration image */
        .hero-line-2 {
          padding-left: clamp(100px, 28vw, 480px);
          /* Negative margin pulls line 2 UP, so it feels staggered not stacked */
          margin-top: clamp(-10px, -0.5vw, -4px);
        }

        /* ── DESCRIPTION — anchored under line 1 ── */
        .hero-desc-wrap {
          padding-left: clamp(16px, 3.5vw, 60px);
          padding-top: clamp(20px, 2.4vw, 38px);
          /* constrain width so it sits neatly under the left word only */
          max-width: clamp(280px, 36vw, 520px);
        }

        .hero-desc-mask {
          overflow: hidden;
        }

        .hero-desc {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(14px, 1.35vw, 19px);
          color: #1c1510;
          line-height: 1.72;
          letter-spacing: 0.01em;
          opacity: 0.72;
          display: block;
        }

        /* ── MOBILE ── */
        @media (max-width: 600px) {
          .hero-word {
            font-size: clamp(72px, 20vw, 120px);
          }
          .hero-line-2 {
            padding-left: clamp(60px, 22vw, 160px);
            margin-top: 0;
          }
          .hero-desc-wrap {
            max-width: 90vw;
            padding-top: 20px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="hero">
        <div className="hero-body">

          {/* ── LINE 1 — left piece ── */}
          <div className="hero-line-1">
            <div ref={mask1Ref} className="hero-mask">
              <span ref={text1Ref} className="hero-word">
                {WORD_LEFT}
              </span>
            </div>
          </div>

          {/* ── LINE 2 — right piece, staircase offset ── */}
          <div className="hero-line-2">
            <div ref={mask2Ref} className="hero-mask">
              <span ref={text2Ref} className="hero-word">
                {WORD_RIGHT}
              </span>
            </div>
          </div>

          {/* ── DESCRIPTION — under line 1 only ── */}
          <div className="hero-desc-wrap">
            <div ref={maskDescRef} className="hero-desc-mask">
              <span ref={descRef} className="hero-desc">
                {DESC}
              </span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}