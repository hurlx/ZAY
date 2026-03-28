'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CHEFS = [
  {
    name: 'Élise Moreau',
    title: 'Chef de Cuisine',
    origin: 'Lyon, France',
    note: 'Trained under two Michelin-starred kitchens before finding her voice in silence and butter.',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=85&auto=format&fit=crop',
    tilt: '-4deg',
    accent: '#c9b99a',
  },
  {
    name: 'Kenji Watanabe',
    title: 'Pastry Architect',
    origin: 'Kyoto, Japan',
    note: 'Where precision meets poetry. Every dessert is a small act of restraint.',
    img: 'https://images.unsplash.com/photo-1730635250911-b787fbc7e90f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNoZWZzfGVufDB8fDB8fHww',
    tilt: '2.5deg',
    accent: '#a8b5a0',
  },
  {
    name: 'Mirela Voss',
    title: 'Head Sommelier',
    origin: 'Vienna, Austria',
    note: 'She reads a glass the way others read a room — instantly, completely, without mercy.',
    img: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&q=85&auto=format&fit=crop',
    tilt: '-2deg',
    accent: '#b8a898',
  },
  {
    name: 'Théo Blanchard',
    title: 'Fire & Ferment',
    origin: 'Bordeaux, France',
    note: 'Obsessed with what fire does to time. Everything he makes has been waiting.',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=85&auto=format&fit=crop',
    tilt: '3.5deg',
    accent: '#c4b08a',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ChefsSection() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const rulerRef    = useRef(null);
  const cardRefs    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      };

      // Ruler expands from center
      gsap.fromTo(rulerRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 1.3, ease: 'power3.inOut', ...trigger }
      );

      // Header text staggers in
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, subtitleRef.current],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.13, ...trigger }
      );

      // Cards: each rises from below with its own tilt applied AFTER entrance
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const finalTilt = CHEFS[i].tilt;

        gsap.fromTo(card,
          { opacity: 0, y: 80, rotate: 0, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            rotate: finalTilt,
            scale: 1,
            duration: 1.1,
            delay: 0.15 + i * 0.1,
            ease: 'power4.out',
            ...trigger,
          }
        );

        // Hover: straighten on enter, re-tilt on leave
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { rotate: '0deg', scale: 1.03, duration: 0.45, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotate: finalTilt, scale: 1, duration: 0.55, ease: 'power2.inOut' });
        });
      });

      // Subtle parallax on section scroll-through
      gsap.to(titleRef.current, {
        y: -30,
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant+Upright:wght@300;400;500&family=Lato:wght@300;400&display=swap');

        .chefs-section {
          position: relative;
          background-color: #e8e3d9;
          overflow: hidden;
          padding: 120px 0 140px;
        }

        /* Subtle paper texture */
        .chefs-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        .chefs-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        /* ── HEADER ── */
        .chefs-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .chefs-eyebrow {
          display: block;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #6b5e4e;
          margin-bottom: 22px;
          opacity: 0;
        }

        .chefs-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(52px, 7vw, 100px);
          color: #1c1510;
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
          opacity: 0;
        }

        .chefs-title em {
          font-style: italic;
          font-weight: 300;
          color: #6b5e4e;
        }

        .chefs-subtitle {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: #9a8878;
          margin-top: 20px;
          opacity: 0;
        }

        /* Thin ornamental rule */
        .chefs-rule {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 80px;
        }

        .chefs-rule-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(to right, transparent, #b5a898);
        }

        .chefs-rule-line.right {
          background: linear-gradient(to left, transparent, #b5a898);
        }

        .chefs-rule-diamond {
          width: 6px;
          height: 6px;
          border: 1px solid #b5a898;
          transform: rotate(45deg);
        }

        /* ── CARDS GRID ── */
        .chefs-grid {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: clamp(16px, 2.5vw, 36px);
          flex-wrap: wrap;
        }

        /* ── SINGLE CARD ── */
        .chef-card {
          flex-shrink: 0;
          width: clamp(200px, 20vw, 272px);
          cursor: pointer;
          position: relative;
          opacity: 0; /* GSAP reveals */
          transform-origin: bottom center;
          will-change: transform;
        }

        .chef-card-frame {
          position: relative;
          background: #f5f0e8;
          border-radius: 3px;
          padding: 10px 10px 0;
          box-shadow:
            0 4px 16px rgba(28,21,16,0.10),
            0 1px 3px rgba(28,21,16,0.06),
            inset 0 0 0 1px rgba(28,21,16,0.06);
        }

        /* Inner portrait area */
        .chef-img-wrap {
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 2px;
          position: relative;
        }

        .chef-img {
          width: 100%;
          height: 108%;
          margin-top: -4%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
          filter: sepia(18%) contrast(1.04);
        }

        .chef-card:hover .chef-img {
          transform: scale(1.05);
          filter: sepia(0%) contrast(1.06);
        }

        /* Overlay vignette inside photo */
        .chef-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 60%,
            rgba(28,21,16,0.3) 100%
          );
          pointer-events: none;
        }

        /* Accent colour bar at left edge of frame */
        .chef-card-accent {
          position: absolute;
          top: 10px;
          left: 0;
          width: 3px;
          height: calc(100% - 10px);
          border-radius: 3px 0 0 0;
          transition: height 0.4s ease;
        }

        /* Caption strip below photo, inside frame */
        .chef-caption {
          padding: 14px 6px 16px;
          border-top: 1px solid rgba(28,21,16,0.07);
          margin-top: 0;
        }

        .chef-caption-title {
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9a8878;
          margin-bottom: 5px;
        }

        .chef-caption-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(17px, 1.6vw, 21px);
          color: #1c1510;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        /* Bottom note — revealed on hover */
        .chef-note {
          position: absolute;
          bottom: -10px;
          left: 8px;
          right: 8px;
          background: #1c1510;
          color: #e8e3d9;
          padding: 12px 14px;
          border-radius: 2px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 12px;
          line-height: 1.55;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          z-index: 10;
          box-shadow: 0 8px 28px rgba(28,21,16,0.22);
        }

        .chef-card:hover .chef-note {
          opacity: 1;
          transform: translateY(0);
        }

        /* Origin tag on photo corner */
        .chef-origin {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(232,227,217,0.88);
          backdrop-filter: blur(4px);
          padding: 3px 8px;
          border-radius: 2px;
          font-family: 'Lato', sans-serif;
          font-size: 8.5px;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6b5e4e;
          z-index: 2;
        }

        /* Polaroid-style tape strip top */
        .chef-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 20px;
          background: rgba(210,200,185,0.65);
          border-radius: 2px;
          z-index: 3;
        }
      `}</style>

      <section ref={sectionRef} className="chefs-section">
        <div className="chefs-inner">

          {/* ── HEADER ── */}
          <div className="chefs-header">
            <span ref={eyebrowRef} className="chefs-eyebrow">
              — The People Behind the Plate —
            </span>

            <h2 ref={titleRef} className="chefs-title">
              Faces of the<br /><em>Kitchen</em>
            </h2>

            <p ref={subtitleRef} className="chefs-subtitle">
              Obsessive, restless, gifted. Each one arrived here by a different road.
            </p>
          </div>

          {/* ── ORNAMENTAL RULE ── */}
          <div className="chefs-rule">
            <div ref={rulerRef} style={{ display: 'contents' }}>
              <div className="chefs-rule-line" />
              <div className="chefs-rule-diamond" />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1 L9 17 M1 9 L17 9" stroke="#b5a898" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="2.5" fill="none" stroke="#b5a898" strokeWidth="1"/>
              </svg>
              <div className="chefs-rule-diamond" />
              <div className="chefs-rule-line right" />
            </div>
          </div>

          {/* ── CARDS ── */}
          <div className="chefs-grid">
            {CHEFS.map((chef, i) => (
              <div
                key={i}
                className="chef-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                {/* Polaroid tape */}
                <div className="chef-tape" />

                <div className="chef-card-frame">
                  {/* Accent bar */}
                  <div
                    className="chef-card-accent"
                    style={{ background: chef.accent }}
                  />

                  {/* Photo */}
                  <div className="chef-img-wrap">
                    <img
                      src={chef.img}
                      alt={chef.name}
                      className="chef-img"
                    />
                    {/* Origin badge */}
                    <span className="chef-origin">{chef.origin}</span>
                  </div>

                  {/* Caption */}
                  <div className="chef-caption">
                    <p className="chef-caption-title">{chef.title}</p>
                    <p className="chef-caption-name">{chef.name}</p>
                  </div>
                </div>

                {/* Hover note */}
                <div className="chef-note">"{chef.note}"</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}