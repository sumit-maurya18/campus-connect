// pages/index.js

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Internship from "@/components/Internship";
import Hackathons from "@/components/Hackathons";
import FullTimeOpenings from "@/components/FullTimeOpenings";
import LearningPrograms from "@/components/LearningPrograms";
import AboutUs from "@/components/AboutUs";
import OurTeam from "@/components/OurTeam";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="pt-16"> 
      <Navbar /> 
    
      <Hero />

      <Internship />

      <Hackathons />

      <FullTimeOpenings />

      <LearningPrograms />

      <AboutUs />

      <OurTeam />

      <Footer />
      
    </main>
  );
}