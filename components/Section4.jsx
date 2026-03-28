'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const IMAGE_URL =
  'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=90&auto=format&fit=crop';

const EYEBROW  = 'Our Promise';
const TITLE    = 'Crafted with intention,\nserved with soul.';
const SUBTITLE = 'Every detail. Every ingredient. Every time.';

const LEFT_ITEMS = [
  {
    number: 'I',
    heading: 'Single-Origin',
    body: 'Sourced directly from family-run farms, traceable from soil to cup.',
  },
  {
    number: 'II',
    heading: 'Cold-Pressed Daily',
    body: 'Never stored, never compromised. Pressed at dawn, on your table by noon.',
  },
  {
    number: 'III',
    heading: 'No Additives',
    body: 'What you taste is exactly what it is. Nothing added, nothing hidden.',
  },
];

const RIGHT_ITEMS = [
  {
    number: 'IV',
    heading: 'Small Batches',
    body: 'We make less on purpose. Quality over volume, always.',
  },
  {
    number: 'V',
    heading: 'Seasonal Recipes',
    body: 'Our menu follows the harvest. Expect something new every few weeks.',
  },
  {
    number: 'VI',
    heading: 'Zero Waste Kitchen',
    body: 'Every peel, every stem has a second life. Sustainability isn\'t a label here.',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function TrustSection() {
  const sectionRef    = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const imgWrapRef    = useRef(null);
  const imgRef        = useRef(null);
  const dividerTopRef = useRef(null);
  const dividerBotRef = useRef(null);
  const leftRefs      = useRef([]);
  const rightRefs     = useRef([]);
  const botanicalRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (trigger, extra = {}) => ({
        scrollTrigger: { trigger, start: 'top 78%', once: true, ...extra },
      });

      // Top divider line draws in
      gsap.fromTo(dividerTopRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', ...st(sectionRef.current) }
      );

      // Eyebrow
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2, ...st(sectionRef.current) }
      );

      // Title words split reveal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.35, ...st(sectionRef.current) }
      );

      // Subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.55, ...st(sectionRef.current) }
      );

      // Centre image: scale up from slightly small + fade
      gsap.fromTo(imgWrapRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.4, ...st(sectionRef.current) }
      );

      // Left items stagger in from left
      gsap.fromTo(leftRefs.current,
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', stagger: 0.14, delay: 0.5,
          ...st(sectionRef.current),
        }
      );

      // Right items stagger in from right
      gsap.fromTo(rightRefs.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', stagger: 0.14, delay: 0.6,
          ...st(sectionRef.current),
        }
      );

      // Bottom divider
      gsap.fromTo(dividerBotRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.3, ...st(sectionRef.current) }
      );

      // Botanical corner pieces fade in last
      gsap.fromTo(botanicalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, delay: 0.6, ...st(sectionRef.current) }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400;600&family=EB+Garamond:wght@400;500&display=swap');

        .trust-section {
          position: relative;
          background-color: #111010;
          overflow: hidden;
          padding: 100px 0 110px;
        }

        /* Chalkboard texture via CSS noise */
        .trust-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.012) 2px,
              rgba(255,255,255,0.012) 4px
            );
          pointer-events: none;
          z-index: 0;
        }

        /* Second noise layer */
        .trust-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px;
          opacity: 0.055;
          pointer-events: none;
          z-index: 0;
        }

        .trust-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        /* ── HEADER ── */
        .trust-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .trust-eyebrow {
          display: inline-block;
          font-family: 'EB Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
          opacity: 0;
        }

        .trust-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 600;
          color: #f7f3ec;
          line-height: 1.2;
          white-space: pre-line;
          margin: 0 0 16px;
          opacity: 0;
          /* Subtle chalk texture on text */
          text-shadow:
            0 0 40px rgba(255,255,255,0.04),
            1px 1px 0 rgba(0,0,0,0.6);
        }

        .trust-subtitle {
          font-family: 'EB Garamond', serif;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          opacity: 0;
        }

        /* ── DIVIDERS ── */
        .trust-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255,255,255,0.18) 20%,
            rgba(255,255,255,0.18) 80%,
            transparent 100%
          );
          margin: 0 0 64px;
        }

        .trust-divider.bottom { margin: 64px 0 0; }

        /* ── BODY: 3 cols ── */
        .trust-body {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 48px;
          align-items: center;
        }

        /* ── CENTRE IMAGE ── */
        .trust-img-wrap {
          position: relative;
          width: clamp(220px, 24vw, 340px);
          flex-shrink: 0;
          opacity: 0;
        }

        .trust-img-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }

        .trust-img-ring-2 {
          position: absolute;
          inset: -36px;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,0.06);
          pointer-events: none;
        }

        .trust-img-inner {
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
        }

        .trust-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          /* Desaturate for the B&W aesthetic */
          filter: grayscale(100%) contrast(1.08) brightness(0.92);
          mix-blend-mode: luminosity;
        }

        /* Vignette on image */
        .trust-img-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(17,16,16,0.55) 100%
          );
          pointer-events: none;
        }

        /* ── TRUST ITEMS ── */
        .trust-col {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .trust-col.left  { text-align: right; align-items: flex-end; }
        .trust-col.right { text-align: left;  align-items: flex-start; }

        .trust-item {
          max-width: 280px;
          opacity: 0;
        }

        .trust-item-number {
          font-family: 'Caveat', cursive;
          font-size: 13px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
          display: block;
        }

        .trust-item-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(15px, 1.5vw, 20px);
          font-weight: 700;
          color: #f7f3ec;
          margin: 0 0 8px;
          letter-spacing: 0.01em;
        }

        .trust-item-body {
          font-family: 'EB Garamond', serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
        }

        /* Ornament between heading and body */
        .trust-item-ornament {
          display: block;
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.18);
          font-size: 18px;
          margin-bottom: 6px;
          line-height: 1;
        }

        /* ── BOTANICAL SVGs ── */
        .botanical-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }

        .botanical-corners svg {
          position: absolute;
          width: 200px;
          height: 200px;
        }

        .b-tl { top: 0;    left: 0; }
        .b-tr { top: 0;    right: 0; transform: scaleX(-1); }
        .b-bl { bottom: 0; left: 0;  transform: scaleY(-1); }
        .b-br { bottom: 0; right: 0; transform: scale(-1); }

        @media (max-width: 768px) {
          .trust-body {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .trust-img-wrap {
            margin: 0 auto;
          }
          .trust-col.left,
          .trust-col.right {
            text-align: left;
            align-items: flex-start;
          }
        }
      `}</style>

      <section ref={sectionRef} className="trust-section">

        {/* Botanical corner SVGs */}
        <div ref={botanicalRef} className="botanical-corners">
          <BotanicalCorner className="b-tl" />
          <BotanicalCorner className="b-tr" />
          <BotanicalCorner className="b-bl" />
          <BotanicalCorner className="b-br" />
        </div>

        <div className="trust-inner">

          {/* Header */}
          <div className="trust-header">
            <p ref={eyebrowRef} className="trust-eyebrow">— {EYEBROW} —</p>
            <h2 ref={titleRef} className="trust-title">{TITLE}</h2>
            <p ref={subtitleRef} className="trust-subtitle">{SUBTITLE}</p>
          </div>

          {/* Top divider */}
          <div ref={dividerTopRef} className="trust-divider" />

          {/* 3-column body */}
          <div className="trust-body">

            {/* Left column */}
            <div className="trust-col left">
              {LEFT_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="trust-item"
                  ref={(el) => (leftRefs.current[i] = el)}
                >
                  <span className="trust-item-number">{item.number}.</span>
                  <h3 className="trust-item-heading">{item.heading}</h3>
                  <span className="trust-item-ornament">✦</span>
                  <p className="trust-item-body">{item.body}</p>
                </div>
              ))}
            </div>

            {/* Centre image */}
            <div ref={imgWrapRef} className="trust-img-wrap">
              <div className="trust-img-ring" />
              <div className="trust-img-ring-2" />
              <div className="trust-img-inner">
                <img
                  ref={imgRef}
                  src={IMAGE_URL}
                  alt="Crafted drink"
                  className="trust-img"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="trust-col right">
              {RIGHT_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="trust-item"
                  ref={(el) => (rightRefs.current[i] = el)}
                >
                  <span className="trust-item-number">{item.number}.</span>
                  <h3 className="trust-item-heading">{item.heading}</h3>
                  <span className="trust-item-ornament">✦</span>
                  <p className="trust-item-body">{item.body}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom divider */}
          <div ref={dividerBotRef} className="trust-divider bottom" />

        </div>
      </section>
    </>
  );
}

// ─── Botanical corner SVG ─────────────────────────────────────────────────────
function BotanicalCorner({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main branch */}
      <path
        d="M10 190 Q40 140 80 100 Q120 60 170 20"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left leaves off branch */}
      <path d="M35 158 Q20 145 28 130 Q42 145 35 158Z" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      <path d="M52 138 Q35 122 45 106 Q60 122 52 138Z" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      <path d="M72 116 Q55 100 65 84  Q80 100 72 116Z" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      <path d="M95 90  Q78 74 90 58  Q103 74 95 90Z"  stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      {/* Right leaves off branch */}
      <path d="M42 148 Q55 135 70 142 Q55 155 42 148Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      <path d="M60 126 Q75 115 88 122 Q75 135 60 126Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      <path d="M82 102 Q97 90  110 98  Q97 111 82 102Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      <path d="M106 76 Q120 66 132 74  Q120 86 106 76Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      {/* Small berries */}
      <circle cx="30"  cy="170" r="2"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      <circle cx="48"  cy="150" r="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      <circle cx="100" cy="84"  r="2"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/>
      <circle cx="128" cy="56"  r="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
      {/* Corner vine tendrils */}
      <path
        d="M10 140 Q18 132 14 120"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M140 20 Q132 30 142 40"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}