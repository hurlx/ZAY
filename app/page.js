import Header from '../components/Navbar'
import React from 'react'
import Section2 from '../components/Section2'
import ShowcaseSection from '../components/Section3'
import TrustSection from '../components/Section4'
import ChefsSection from '../components/Section5'
import FeaturedSection from '../components/Section6'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const page = () => {
  return (
    <>
    <Header />
    <Hero />
    <ShowcaseSection />
    <Section2 />
    <TrustSection />
    <ChefsSection />
    <FeaturedSection />
    <Footer />
    </>
  )
}

export default page