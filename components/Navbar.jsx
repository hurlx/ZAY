  "use client"

  import { useState, useEffect, useRef } from "react"
  import gsap from "gsap"
  import MenuButton from "./menu-button"
  import SidebarMenu from "./sidebar-menu"
  import Link from "next/link"

  export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const logoRef = useRef(null)
    const headerRef = useRef(null)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }

    // Prevent scroll when menu is open
    useEffect(() => {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [isMenuOpen])

    // Logo color change when menu is open
    useEffect(() => {
      if (isMenuOpen) {
        gsap.to(logoRef.current, {
          color: "var(--background)",
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        gsap.to(logoRef.current, {
          color: "var(--foreground)",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }, [isMenuOpen])

    // Initial animation
    useEffect(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      )
    }, [])

    return (
      <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

        .style {
          font-family: 'EB Garamond', serif;
          color: rgba(255,255,255,0.22);
          font-size: 22px;
          letter-spacing: 0.3em;
          margin-bottom: 24px;
          display: block;
        }

        `}</style>
        <header
          ref={headerRef}
          className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-10"
        >
          {/* Logo */}
          <Link
            href="/"
            ref={logoRef}
            className="relative style z-50 text-2xl font-semibold text-foreground transition-colors"
          >
            ZAY
          </Link>

          {/* Menu Button */}
          <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </header>

        {/* Sidebar Menu */}
        <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
    )
  }
