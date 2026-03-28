"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function HeroSection() {
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      )

      // Animate line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", delay: 0.8 }
      )

      // Animate subheading
      gsap.fromTo(
        subheadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

        .style1 {
          margin-top: 36px;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 30px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9a8878;
          opacity: 0;
          text-align: center;
        }

        `}
        </style>

    <section className="flex min-h-screen flex-col items-center justify-center px-6 sm:px-10">
      <div className="max-w-4xl text-center">
        <h1
          ref={headingRef}
          className="text-balance style1 text-4xl font-light leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          The best decisions start with the right questions.
        </h1>

        <div
          ref={lineRef}
          className="mx-auto my-10 h-px w-24 origin-left bg-foreground/30"
        />

        <p
          ref={subheadingRef}
          className="mx-auto max-w-2xl style1 text-pretty text-lg text-foreground/60 sm:text-xl"
        >
          We dive deep into your real business challenges and goals to build strategies that deliver wins every single time.
        </p>
      </div>
    </section>
    </>
  )
}
