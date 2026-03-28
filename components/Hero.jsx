'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Use gsap.context for safe React cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1. Subtle background zoom out on load
      tl.fromTo('.bg-media', 
        { scale: 1.15 }, 
        { scale: 1, duration: 2.5, ease: 'power3.out' },
        0
      )
      // 2. Navbar drops down with a stagger effect
      .fromTo('.nav-element', 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        0.5
      )
      // 3. Main center logo fades and scales up
      .fromTo('.hero-logo', 
        { y: 40, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5 },
        0.8
      );
    }, heroRef);
    
    return () => ctx.revert(); 
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#e8e3d9] text-[#222]">
      
      {/* Background Media Layer */}
      {/* Replace src with your actual video or high-res image */}

      {/* Center Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Replace with actual Azuki SVG logo */}
        <h1 className="hero-logo text-7xl md:text-9xl font-black uppercase text-[#222]">
          ZAI
        </h1>
      </div>

    </section>
  );
}