"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

export default function MenuButton({ isOpen, onClick }) {
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Animate to X
        gsap.to(topLineRef.current, {
          rotation: 45,
          y: 0,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power3.inOut",
        })
        gsap.to(bottomLineRef.current, {
          rotation: -45,
          y: 0,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power3.inOut",
        })
      } else {
        // Animate back to hamburger
        gsap.to(topLineRef.current, {
          rotation: 0,
          y: -4,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power3.inOut",
        })
        gsap.to(bottomLineRef.current, {
          rotation: 0,
          y: 4,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power3.inOut",
        })
      }
    })

    return () => ctx.revert()
  }, [isOpen])

  // Initial position setup
  useEffect(() => {
    gsap.set(topLineRef.current, { y: -4 })
    gsap.set(bottomLineRef.current, { y: 4 })
  }, [])

  // Hover animation
  const handleMouseEnter = () => {
    if (!isOpen) {
      gsap.to(topLineRef.current, {
        scaleX: 0.7,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    if (!isOpen) {
      gsap.to(topLineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(bottomLineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-[#e8e3d9] transition-colors duration-300"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative flex h-4 w-5 flex-col items-center justify-center">
        <span
          ref={topLineRef}
          className="absolute h-[2px] w-5 rounded-full bg-[#111]"
        />
        <span
          ref={bottomLineRef}
          className="absolute h-[2px] w-5 rounded-full bg-[#111]"
        />
      </div>
    </button>
  )
}
