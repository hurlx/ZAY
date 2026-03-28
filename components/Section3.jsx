'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ROW_1 = [
  {
    client: 'Sport Chek',
    title: 'Notre équipement.\nNos Jeux.',
    category: 'Campagne publicitaire',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=85&auto=format&fit=crop',
    size: 'lg',
  },
  {
    client: 'CDPQ Infra',
    title: 'À portée\nde REM',
    category: 'Identité de marque',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=90&auto=format&fit=crop',
    size: 'sm',
  },
  {
    client: 'Ordre des ingénieurs',
    title: 'ing. : un titre\nfort et ambitieux',
    category: 'Campagne institutionnelle',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85&auto=format&fit=crop',
    size: 'md',
  },
  {
    client: 'Élections Québec',
    title: 'Le municipal\nvous parle',
    category: 'Campagne sociale',
    img: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&q=85&auto=format&fit=crop',
    size: 'lg',
  },
  {
    client: 'Musée de l\'Histoire',
    title: 'Rétro — la\nmusique populaire',
    category: 'Campagne culturelle',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=85&auto=format&fit=crop',
    size: 'sm',
  },
];

const ROW_2 = [
  {
    client: 'Mark\'s',
    title: 'La technologie,\nressentie.',
    category: 'Campagne de marque',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=85&auto=format&fit=crop',
    size: 'sm',
  },
  {
    client: 'Université de Montréal',
    title: 'L\'heure\nest brave',
    category: 'Campagne institutionnelle',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=90&auto=format&fit=crop',
    size: 'lg',
  },
  {
    client: 'L\'Équipeur',
    title: 'Un printemps agréable\nà ce point-là.',
    category: 'Campagne saisonnière',
    img: 'https://fantasycookery.com/wp-content/uploads/2021/02/DSCF7601-1024x683.jpg',
    size: 'md',
  },
  {
    client: 'Ordre des CPA',
    title: 'C\'PA mal\nfait pour toi',
    category: 'Campagne de recrutement',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmqD8-y9WACs9fQtw20XcfjtTqC4PxIqyFQ&s',
    size: 'sm',
  },
  {
    client: 'MBAM',
    title: 'Visitez comme\nbeau vous semble',
    category: 'Campagne culturelle',
    img: 'https://cdn.shopify.com/s/files/1/0402/2632/4647/files/image_93_480x480.png?v=1720184902',
    size: 'lg',
  },
];

// Mobile: interleave R1 + R2 so it flows naturally as one curated list
const MOBILE_CARDS = ROW_1.reduce((acc, card, i) => {
  acc.push(card);
  if (ROW_2[i]) acc.push(ROW_2[i]);
  return acc;
}, []);
// ─────────────────────────────────────────────────────────────────────────────

export default function ShowcaseSection() {
  const sectionRef = useRef(null);
  const row1Ref    = useRef(null);
  const row2Ref    = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      // Header reveals — same everywhere
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      );

      if (isMobile) {
        // ── MOBILE: each card fades + rises individually as it enters viewport ──
        sectionRef.current.querySelectorAll('.sc-card').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });

      } else {
        // ── DESKTOP: two rows drifting in opposite directions ──
        gsap.fromTo(row1Ref.current,
          { x: 0 },
          {
            x: '-12%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );

        gsap.fromTo(row2Ref.current,
          { x: '-6%' },
          {
            x: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );

        // Per-card image parallax
        sectionRef.current.querySelectorAll('.sc-img').forEach((img) => {
          gsap.fromTo(img,
            { y: '-8%' },
            {
              y: '8%',
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.sc-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lato:wght@300;400&display=swap');

        /* ─── SECTION ─── */
        .sc-section {
          background: #0d0d0d;
          padding: 120px 0 160px;
          overflow: hidden;
        }

        /* ─── HEADER ─── */
        .sc-header {
          padding: 0 6vw;
          margin-bottom: 80px;
        }
        .sc-label {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
          opacity: 0;
          display: block;
        }
        .sc-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5.5vw, 84px);
          font-weight: 400;
          color: #f5f3ee;
          line-height: 1.05;
          letter-spacing: -0.02em;
          max-width: 560px;
          opacity: 0;
        }
        .sc-heading em {
          font-style: italic;
          color: rgba(245,243,238,0.42);
        }

        /* ─── DESKTOP ROWS ─── */
        .sc-rows-desktop { display: block; }
        .sc-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 0 6vw;
          padding-right: 15vw;
          will-change: transform;
        }
        .sc-row-2 {
          margin-top: 20px;
          margin-left: 8vw;
        }

        /* ─── MOBILE GRID (hidden on desktop) ─── */
        .sc-grid-mobile { display: none; }

        /* ─── CARD SHARED ─── */
        .sc-card {
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 3px;
        }
        .sc-card.sm { width: 280px; height: 360px; }
        .sc-card.md { width: 380px; height: 440px; }
        .sc-card.lg { width: 480px; height: 520px; }

        .sc-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .sc-img {
          width: 100%;
          height: 116%;
          margin-top: -8%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: grayscale(25%) brightness(0.88);
        }
        .sc-card:hover .sc-img {
          transform: scale(1.05);
          filter: grayscale(0%) brightness(0.95);
        }

        .sc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(13,13,13,0.0)  0%,
            rgba(13,13,13,0.15) 35%,
            rgba(13,13,13,0.75) 70%,
            rgba(13,13,13,0.92) 100%
          );
          transition: background 0.5s ease;
        }
        .sc-card:hover .sc-overlay {
          background: linear-gradient(
            to bottom,
            rgba(13,13,13,0.0)  0%,
            rgba(13,13,13,0.10) 30%,
            rgba(13,13,13,0.65) 65%,
            rgba(13,13,13,0.88) 100%
          );
        }

        .sc-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px 24px 26px;
          z-index: 2;
        }
        .sc-client {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          margin-bottom: 8px;
          display: block;
        }
        .sc-title {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          font-size: clamp(17px, 1.8vw, 24px);
          color: #f5f3ee;
          line-height: 1.25;
          letter-spacing: -0.01em;
          white-space: pre-line;
          margin: 0 0 10px;
          transition: letter-spacing 0.35s ease;
        }
        .sc-card:hover .sc-title { letter-spacing: 0.005em; }

        .sc-accent-line {
          height: 1px;
          width: 32px;
          background: rgba(255,255,255,0.35);
          transition: width 0.4s ease, background 0.3s ease;
        }
        .sc-card:hover .sc-accent-line {
          width: 56px;
          background: rgba(255,255,255,0.7);
        }

        .sc-category {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.22);
          margin-top: 8px;
          display: block;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-card:hover .sc-category { opacity: 1; transform: translateY(0); }

        .sc-index {
          position: absolute;
          top: 16px; right: 18px;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          z-index: 2;
          transition: color 0.3s ease;
        }
        .sc-card:hover .sc-index { color: rgba(255,255,255,0.45); }

        /* ═══════════════════════════════════════
           MOBILE ≤ 767px
        ═══════════════════════════════════════ */
        @media (max-width: 767px) {

          .sc-section { padding: 64px 0 80px; }

          .sc-header {
            padding: 0 20px;
            margin-bottom: 44px;
          }

          /* Swap layouts */
          .sc-rows-desktop { display: none !important; }
          .sc-grid-mobile  {
            display: flex;
            flex-direction: column;
            /* 3px gap between cards gives a film-strip feel */
            gap: 3px;
          }

          /* All cards: full viewport width, hidden for GSAP reveal */
          .sc-card.sm,
          .sc-card.md,
          .sc-card.lg {
            width: 100%;
            border-radius: 0;
            flex-shrink: unset;
            opacity: 0; /* GSAP animates to 1 */
          }

          /* Tall cards: main feature feel */
          .sc-grid-mobile .sc-card:nth-child(odd)  { height: 68vw; max-height: 400px; }
          /* Short cards: breathing room, contrast */
          .sc-grid-mobile .sc-card:nth-child(even) { height: 52vw; max-height: 300px; }

          /* First card: cinematic full-screen opener */
          .sc-grid-mobile .sc-card:first-child {
            height: 90vw;
            max-height: 520px;
          }

          /* Text padding tighter on mobile */
          .sc-text { padding: 20px 18px 20px; }

          /* Title bigger — more readable on full-width */
          .sc-title { font-size: 20px; }

          /* Category always visible on mobile — no hover state */
          .sc-category {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }

          /* Accent line always shown */
          .sc-accent-line { width: 36px; }
        }
      `}</style>

      <section ref={sectionRef} className="sc-section">

        {/* Header */}
        <div className="sc-header">
          <span ref={labelRef} className="sc-label">Réalisations sélectionnées</span>
          <h2 ref={headingRef} className="sc-heading">
            Des idées qui<br /><em>transforment.</em>
          </h2>
        </div>

        {/* ── DESKTOP: two drifting rows ── */}
        <div className="sc-rows-desktop">
          <div ref={row1Ref} className="sc-row sc-row-1">
            {ROW_1.map((p, i) => (
              <Card key={`r1-${i}`} project={p} index={i + 1} />
            ))}
          </div>
          <div ref={row2Ref} className="sc-row sc-row-2">
            {ROW_2.map((p, i) => (
              <Card key={`r2-${i}`} project={p} index={i + 1} />
            ))}
          </div>
        </div>

        {/* ── MOBILE: single interleaved column ── */}
        <div className="sc-grid-mobile">
          {MOBILE_CARDS.map((p, i) => (
            <Card key={`m-${i}`} project={p} index={i + 1} />
          ))}
        </div>

      </section>
    </>
  );
}

function Card({ project, index }) {
  return (
    <div className={`sc-card ${project.size}`}>
      <div className="sc-img-wrap">
        <img className="sc-img" src={project.img} alt={project.title} loading="lazy" />
      </div>
      <div className="sc-overlay" />
      <span className="sc-index">{String(index).padStart(2, '0')}</span>
      <div className="sc-text">
        <span className="sc-client">{project.client}</span>
        <h3 className="sc-title">{project.title}</h3>
        <div className="sc-accent-line" />
        <span className="sc-category">{project.category}</span>
      </div>
    </div>
  );
}