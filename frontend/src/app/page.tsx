// pages/index.js

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Internship from "@/components/Internship"
import Hackathons from "@/components/Hackathons"
import FullTimeOpenings from "@/components/FullTimeOpenings"
import LearningPrograms from "@/components/LearningPrograms"


export default function Home() {
  return (
    <main className="pt-16"> 
      <Navbar /> 
    
      <Hero />

      <Internship />

      <Hackathons />

      <FullTimeOpenings />

      <LearningPrograms />
      
    </main>
  );
}