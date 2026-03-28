'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Swap this for your own image. Must be a full URL or a /public path.
const IMAGE_URL =
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=85&auto=format&fit=crop';

// The headline — split into lines for the staggered reveal
const LINES = ['Wood-fired.', 'Wildly', 'good.'];

// Subtext beneath the headline
const SUBTEXT = 'Brooklyn, New York — Est. 2008';

// ─────────────────────────────────────────────────────────────────────────────

export default function Hero3() {
  const sectionRef   = useRef(null);
  const imageRef     = useRef(null);
  const maskRefs     = useRef([]);   // overflow-hidden wrappers
  const wordRefs     = useRef([]);   // the actual moving text nodes
  const subtextRef   = useRef(null);
  const lineTopRef   = useRef(null);
  const lineBottomRef = useRef(null);
  const yearRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Thin horizontal rule slides in from left
      tl.fromTo(
        lineTopRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1 },
        0
      );

      // 2. Image scales up from slightly smaller + fades in
      tl.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' },
        0.1
      );

      // 3. Each headline word slides up from behind its mask
      tl.fromTo(
        wordRefs.current,
        { y: '105%', skewY: 3 },
        {
          y: '0%',
          skewY: 0,
          duration: 1.05,
          stagger: 0.13,
          ease: 'power4.out',
        },
        0.25
      );

      // 4. Subtext fades + rises
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      );

      // 5. Bottom rule + year
      tl.fromTo(
        lineBottomRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1 },
        0.7
      );
      tl.fromTo(
        yearRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Google Font — loaded inline so the component is self-contained */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400&display=swap');

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px 220px;
          opacity: 0.028;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-grain relative flex flex-col justify-between overflow-hidden"
        style={{
          minHeight: '100vh',
          backgroundColor: '#f0ebe2',
          padding: '3vw 4vw',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >

        {/* ── TOP RULE ── */}
        <div
          ref={lineTopRef}
          style={{
            height: '1px',
            backgroundColor: '#1a1714',
            opacity: 0.25,
            width: '100%',
          }}
        />

        {/* ── MAIN BODY ── */}
        <div
          className="relative flex flex-col"
          style={{ flex: 1, paddingTop: '3vw', paddingBottom: '3vw' }}
        >

          {/* ── HEADLINE ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              marginBottom: '1.5vw',
            }}
          >
            {LINES.map((line, i) => (
              <div
                key={i}
                // mask wrapper — overflow hidden clips the rising word
                ref={(el) => (maskRefs.current[i] = el)}
                style={{ overflow: 'hidden', lineHeight: 1 }}
              >
                <div
                  ref={(el) => (wordRefs.current[i] = el)}
                  style={{
                    display: 'block',
                    fontSize: 'clamp(72px, 11vw, 180px)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: '#1a1714',
                    // Italic on middle line for rhythm
                    fontStyle: i === 1 ? 'italic' : 'normal',
                    lineHeight: 1.02,
                    userSelect: 'none',
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* ── SUBTEXT ── */}
          <p
            ref={subtextRef}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(11px, 1vw, 14px)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1a1714',
              opacity: 0,            // GSAP animates this to 1
              marginBottom: '3vw',
            }}
          >
            {SUBTEXT}
          </p>

          {/* ── IMAGE ── 50 % viewport height, centered */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '52vh',
              overflow: 'hidden',
              borderRadius: '4px',
            }}
          >
            <img
              ref={imageRef}
              src={IMAGE_URL}
              alt="Wood-fired pizza"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 60%',
                display: 'block',
                opacity: 0,          // GSAP animates this to 1
              }}
            />
            {/* Warm vignette overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(240,235,226,0.18) 0%, rgba(240,235,226,0.0) 40%, rgba(26,23,20,0.28) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* ── BOTTOM RULE + YEAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            ref={lineBottomRef}
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#1a1714',
              opacity: 0.25,
            }}
          />
          <span
            ref={yearRef}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#1a1714',
              opacity: 0,
              textTransform: 'uppercase',
            }}
          >
            Bushwick
          </span>
        </div>
      </section>
    </>
  );
}