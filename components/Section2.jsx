'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG — swap these for your project ────────────────────────────────────
const IMAGE_URL =
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1400&q=85&auto=format&fit=crop';

// Two text lines — first sits above the image, second below (just like Roberta's)
const LINE_1 = 'Welcome';
const LINE_2 = 'to the table.';
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef   = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const imageRef     = useRef(null);
  const curtain1Ref  = useRef(null);
  const curtain2Ref  = useRef(null);
  const imageMaskRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
        defaults: { ease: 'none' },
      });

      // Image: scale up + fade in first
      tl.fromTo(
        imageRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0
      );

      // Image mask wipes away (top to bottom) as image enters
      tl.fromTo(
        imageMaskRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          transformOrigin: 'top center',
        },
        0
      );

      // LINE 1 curtain collapses right → reveals text left to right (writing)
      tl.fromTo(
        curtain1Ref.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.85,
          ease: 'power2.inOut',
          transformOrigin: 'right center',
        },
        0.15
      );

      // LINE 2 curtain — starts a bit after line 1 for staggered effect
      tl.fromTo(
        curtain2Ref.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.9,
          ease: 'power2.inOut',
          transformOrigin: 'right center',
        },
        0.75
      );

      // After both lines reveal: a very gentle settle (like ink settling)
      tl.fromTo(
        [line1Ref.current, line2Ref.current],
        { y: 8 },
        { y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
        '-=0.4'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

        .roberta-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #e8e3d9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 5rem;
        }

        /* Noise grain layer — gives that film texture Roberta's has */
        .roberta-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 250px 250px;
          opacity: 0.025;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <section ref={sectionRef} className="roberta-hero">

        {/* ── LINE 1 text + its white curtain ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            // negative margin so the text overlaps the image slightly
            marginBottom: '-0.06em',
            zIndex: 2,
          }}
        >
          <div
            ref={line1Ref}
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(72px, 13.5vw, 200px)',
              color: '#111',
              lineHeight: 1.08,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              padding: '0 3vw',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {LINE_1}
          </div>

          {/* White curtain — collapses right to left revealing text */}
          <div
            ref={curtain1Ref}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#e8e3d9',
              zIndex: 2,
              pointerEvents: 'none',
              // GSAP will animate transformOrigin: 'right center' scaleX 1→0
            }}
          />
        </div>

        {/* ── IMAGE — sandwiched between the two text lines ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '42vw',
            height: '50vh',
            maxWidth: '680px',
            minWidth: '280px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <img
            ref={imageRef}
            src={IMAGE_URL}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: 0,          // GSAP fades this in
            }}
          />
          {/* Image's own mask that wipes away top→bottom */}
          <div
            ref={imageMaskRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#e8e3d9',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── LINE 2 text + its white curtain ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '-0.06em',
            zIndex: 2,
          }}
        >
          <div
            ref={line2Ref}
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(72px, 13.5vw, 200px)',
              color: '#111',
              lineHeight: 1.08,
              whiteSpace: 'nowrap',
              userSelect: 'none',
              padding: '0 3vw',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {LINE_2}
          </div>

          {/* White curtain */}
          <div
            ref={curtain2Ref}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#e8e3d9',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        </div>

      </section>
    </>
  );
}