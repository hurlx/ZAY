"use client"

import { useRef, useEffect, useCallback } from "react"
import gsap from "gsap"

const menuItems = [
  { label: "Menu", href: "#realisations" },
  { label: "Tables", href: "#approche" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#studio" },
  { label: "Carrières", href: "#carrieres" },
  { label: "Contact", href: "#contact" },
]

export default function SidebarMenu({ isOpen, onClose }) {
  const menuRef = useRef(null)
  const overlayRef = useRef(null)
  const itemsRef = useRef([])
  const footerRef = useRef(null)
  const tlRef = useRef(null)
  const isAnimatingRef = useRef(false)

  const animateOpen = useCallback(() => {
    if (isAnimatingRef.current) {
      gsap.killTweensOf([menuRef.current, overlayRef.current, footerRef.current, ...itemsRef.current])
    }
    isAnimatingRef.current = true

    // Show overlay
    gsap.set(overlayRef.current, { display: "block" })
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })

    // Animate menu panel
    gsap.to(menuRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power3.inOut",
    })

    // Animate menu items with stagger
    gsap.fromTo(
      itemsRef.current,
      {
        x: 60,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      }
    )

    // Animate footer
    gsap.fromTo(
      footerRef.current,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        delay: 0.6, 
        ease: "power3.out",
        onComplete: () => {
          isAnimatingRef.current = false
        }
      }
    )
  }, [])

  const animateClose = useCallback(() => {
    if (isAnimatingRef.current) {
      gsap.killTweensOf([menuRef.current, overlayRef.current, footerRef.current, ...itemsRef.current])
    }
    isAnimatingRef.current = true

    // Create a timeline for close animation
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" })
        isAnimatingRef.current = false
      }
    })

    // Hide footer first
    tl.to(footerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    }, 0)

    // Hide menu items with reverse stagger (bottom to top, mirroring the open)
    const reversedItems = [...itemsRef.current].reverse()
    tl.to(reversedItems, {
      x: 60,
      opacity: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power3.in",
    }, 0)

    // Animate menu panel out after items
    tl.to(menuRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power3.inOut",
    }, 0.4)

    // Hide overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }, 0.4)

    tlRef.current = tl
  }, [])

  useEffect(() => {
    if (isOpen) {
      animateOpen()
    } else {
      // Only animate close if menu was previously open (not on initial mount)
      if (menuRef.current && gsap.getProperty(menuRef.current, "x") !== "100%") {
        animateClose()
      }
    }
  }, [isOpen, animateOpen, animateClose])

  // Initial setup
  useEffect(() => {
    gsap.set(menuRef.current, { x: "100%" })
    gsap.set(overlayRef.current, { opacity: 0, display: "none" })
    gsap.set(itemsRef.current, { x: 60, opacity: 0 })
    gsap.set(footerRef.current, { y: 20, opacity: 0 })

    return () => {
      if (tlRef.current) {
        tlRef.current.kill()
      }
    }
  }, [])

  // Menu item hover animation
  const handleItemEnter = (index) => {
    gsap.to(itemsRef.current[index], {
      x: 16,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleItemLeave = (index) => {
    gsap.to(itemsRef.current[index], {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

        .style2 {
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.22);
          font-size: 22px;
          letter-spacing: 0.3em;
          margin-bottom: 24px;
          display: block;
        }

        `}</style>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <nav
        ref={menuRef}
        className="fixed right-0 top-0 z-45 flex h-full w-full flex-col justify-between bg-foreground px-8 py-24 sm:w-[480px] sm:px-12"
        aria-label="Main navigation"
      >
        <ul className="space-y-2 style2">
          {menuItems.map((item, index) => (
            <li key={item.label}>
              <a
                ref={(el) => (itemsRef.current[index] = el)}
                href={item.href}
                onMouseEnter={() => handleItemEnter(index)}
                onMouseLeave={() => handleItemLeave(index)}
                onClick={onClose}
                className="group relative block py-3 text-4xl font-light text-background transition-opacity hover:opacity-70 sm:text-5xl"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute -left-6 top-1/2 h-2 w-2 -translate-y-1/2 scale-0 bg-background opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div ref={footerRef} className="space-y-6 style2">
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-background/60 transition-colors hover:text-background"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-background/60 transition-colors hover:text-background"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-background/60 transition-colors hover:text-background"
            >
              Youtube
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
