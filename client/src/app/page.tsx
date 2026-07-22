
import Hero from "@/components/HomeComponents/Hero"
import WhyWe from "@/components/HomeComponents/WhyWe"
import Instruction from "@/components/HomeComponents/Instruction"
import LoginHome from "@/components/HomeComponents/LoginHome";
import Header from "@/components/HomeComponents/Header";
import React from "react";
import Footer from "@/components/HomeComponents/Footer";

export default function Home() {
  return (
    <>
        <Header />
        <Hero/>
        <WhyWe/>
        <Instruction/>
        <LoginHome/>
        <Footer/>
    </>
  );
}
