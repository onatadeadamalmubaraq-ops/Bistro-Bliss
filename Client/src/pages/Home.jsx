import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Amenities from "../components/Amenities";
import HoursSection from "../components/HoursSection";
import CTASection from "../components/CTASection";
import LocationSection from "../components/LocationSection";
import ReserveTable from "../components/ReserveTable";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Amenities />
      <HoursSection />
      <LocationSection />
      <CTASection />
    </>
  );
}