'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA — swap with your own items ─────────────────────────────────────────
const ITEMS = [
  {
    name: 'Cold Pressed Negroni',
    category: 'Signature Cocktail',
    note: 'Bitter, floral, unhurried.',
    year: '2019',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=700&q=88&auto=format&fit=crop',
    bg: '#d4c9b8',
  },
  {
    name: 'Saffron Bouillabaisse',
    category: 'House Specialty',
    note: 'A broth that takes three days to build.',
    year: '2021',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=88&auto=format&fit=crop',
    bg: '#c8bfaa',
  },
  {
    name: 'Dark Rye Sourdough',
    category: 'Bakery',
    note: 'Fermented 48 hours. Sliced to order.',
    year: '2018',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=88&auto=format&fit=crop',
    bg: '#bfb5a0',
  },
  {
    name: 'Smoked Duck Confit',
    category: 'Seasonal Plate',
    note: 'Cherry wood, low heat, patience.',
    year: '2022',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=88&auto=format&fit=crop',
    bg: '#c9bead',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function FeaturedSection() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef  = useRef(null);
  const cardRefs    = useRef([]);
  const numRefs     = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      };

      // Divider draws outward from center
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 1.3, ease: 'power3.inOut', ...st }
      );

      // Header cascade
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, subtitleRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, ...st }
      );

      // Cards: stagger rise from below
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.25,
          ...st,
        }
      );

      // Index numbers count up (visual only — CSS counter)
      gsap.fromTo(
        numRefs.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ...st,
        }
      );

      // Subtle parallax on section scroll
      gsap.to(titleRef.current, {
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Lato:wght@300;400&display=swap');

        .featured-section {
          position: relative;
          background-color: #e8e3d9;
          padding: 120px 0 140px;
          overflow: hidden;
        }

        /* Paper noise */
        .featured-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        .featured-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        /* ── HEADER ── */
        .featured-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          gap: 40px;
          margin-bottom: 64px;
        }

        .featured-header-left {}

        .featured-eyebrow {
          display: block;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #6b5e4e;
          margin-bottom: 18px;
          opacity: 0;
        }

        .featured-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(44px, 6vw, 88px);
          color: #1c1510;
          line-height: 1.0;
          letter-spacing: -0.025em;
          margin: 0;
          opacity: 0;
        }

        .featured-title em {
          font-style: italic;
          color: #6b5e4e;
        }

        .featured-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(16px, 1.5vw, 20px);
          color: #9a8878;
          line-height: 1.65;
          max-width: 380px;
          opacity: 0;
          /* aligns to bottom of the grid cell */
          align-self: end;
          padding-bottom: 6px;
        }

        /* ── THIN ORNAMENTAL DIVIDER ── */
        .featured-divider {
          width: 100%;
          margin-bottom: 72px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .featured-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #b5a898 40%, #b5a898 60%, transparent);
        }

        .featured-divider-glyph {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          color: #b5a898;
          line-height: 1;
          flex-shrink: 0;
        }

        /* ── GRID ── */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 2vw, 28px);
          align-items: end;
        }

        /* ── CARD ── */
        .featured-card {
          position: relative;
          cursor: pointer;
          opacity: 0;
        }

        /* Alternate card heights for rhythm */
        .featured-card:nth-child(1) .featured-card-img-wrap { aspect-ratio: 3/4.2; }
        .featured-card:nth-child(2) .featured-card-img-wrap { aspect-ratio: 3/3.6; }
        .featured-card:nth-child(3) .featured-card-img-wrap { aspect-ratio: 3/4.5; }
        .featured-card:nth-child(4) .featured-card-img-wrap { aspect-ratio: 3/3.8; }

        .featured-card-img-wrap {
          overflow: hidden;
          position: relative;
          border-radius: 3px;
        }

        .featured-card-img {
          width: 100%;
          height: 110%;
          margin-top: -5%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      filter 0.5s ease;
          filter: sepia(20%) contrast(1.05) brightness(0.97);
        }

        .featured-card:hover .featured-card-img {
          transform: scale(1.06);
          filter: sepia(0%) contrast(1.07);
        }

        /* Gradient overlay bottom of image */
        .featured-card-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 45%,
            rgba(28, 21, 16, 0.42) 100%
          );
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        /* Category badge — top-left corner on image */
        .featured-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #e8e3d9;
          background: rgba(28, 21, 16, 0.5);
          backdrop-filter: blur(6px);
          padding: 4px 9px;
          border-radius: 2px;
        }

        /* Year — bottom right corner on image */
        .featured-card-year {
          position: absolute;
          bottom: 14px;
          right: 14px;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 11px;
          color: rgba(232, 227, 217, 0.6);
          letter-spacing: 0.08em;
        }

        /* ── TEXT BELOW CARD ── */
        .featured-card-text {
          padding: 16px 2px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Index number */
        .featured-card-index {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 11px;
          color: #b5a898;
          letter-spacing: 0.08em;
          opacity: 0;
          margin-bottom: 2px;
        }

        /* Thin horizontal rule under index */
        .featured-card-rule {
          width: 28px;
          height: 1px;
          background: #c5bbb0;
          margin-bottom: 8px;
          transition: width 0.4s ease;
        }

        .featured-card:hover .featured-card-rule {
          width: 56px;
        }

        .featured-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(16px, 1.5vw, 21px);
          color: #1c1510;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0;
          transition: letter-spacing 0.35s ease;
        }

        .featured-card:hover .featured-card-name {
          letter-spacing: 0.01em;
        }

        .featured-card-note {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: #9a8878;
          line-height: 1.55;
          margin: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease;
        }

        .featured-card:hover .featured-card-note {
          max-height: 60px;
          opacity: 1;
        }

        @media (max-width: 900px) {
          .featured-header {
            grid-template-columns: 1fr;
          }
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 540px) {
          .featured-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="featured-section">
        <div className="featured-inner">

          {/* ── HEADER ── */}
          <div className="featured-header">
            <div className="featured-header-left">
              <span ref={eyebrowRef} className="featured-eyebrow">
                — From Our Kitchen —
              </span>
              <h2 ref={titleRef} className="featured-title">
                Chosen<br /><em>with care.</em>
              </h2>
            </div>
            <p ref={subtitleRef} className="featured-subtitle">
              A short list of the things that leave people
              unable to say anything at all — in the best way.
            </p>
          </div>

          {/* ── DIVIDER ── */}
          <div ref={dividerRef} className="featured-divider">
            <div className="featured-divider-line" />
            <span className="featured-divider-glyph">✦</span>
            <div className="featured-divider-line" />
          </div>

          {/* ── CARDS ── */}
          <div className="featured-grid">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className="featured-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                {/* Image */}
                <div className="featured-card-img-wrap">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="featured-card-img"
                    loading="lazy"
                  />
                  <span className="featured-card-badge">{item.category}</span>
                  <span className="featured-card-year">{item.year}</span>
                </div>

                {/* Text below */}
                <div className="featured-card-text">
                  <span
                    className="featured-card-index"
                    ref={(el) => (numRefs.current[i] = el)}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="featured-card-rule" />
                  <h3 className="featured-card-name">{item.name}</h3>
                  <p className="featured-card-note">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}