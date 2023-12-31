//@ts-nocheck
"use client";
import Blog from "@/components/Blog/Blog";
import CompaniesSlider from "@/components/CompaniesSlider";
import CountriesSlider from "@/components/CountriesSlider";
import Faq from "@/components/Faq/Faq";
import HeroSectionComp from "@/components/HeroSection/HeroSectionComp";
import HeaderComp from "@/components/Navbar/HeaderComp";
import Newsletter from "@/components/Newsletter";
import Price from "@/components/Price/Price";
import ServicesSlider from "@/components/ServicesSlider";
import Testimonial from "@/components/Testimonial/Testimonial";
import VisaSlider from "@/components/VisaSlider";
import FooterComp from "@/components/FooterComp";
import AOS from 'aos';
import { useEffect } from "react";
import Features from "@/components/Features/Features";
import Services from "@/components/Services/Services";

export default function HomePage() {
  useEffect(() => {
    
    // Initialize AOS
    AOS.init();
  }, []);
  return (
    <div className="">
      <HeaderComp />
      <HeroSectionComp />
      <div className="container mx-auto flex flex-col my-3 px-4">
        <VisaSlider />
        <CompaniesSlider />
        <Services />
        <ServicesSlider />
        <CountriesSlider />
        <Features />
        <Price />
        <Testimonial />
        <Blog />
        <Faq />
        <Newsletter />
      </div>
      <FooterComp />
    </div>
  );
}
