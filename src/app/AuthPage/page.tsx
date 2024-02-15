"use client"
import Auth from "@/components/Auth/Auth";
import FooterComp from "@/components/FooterComp";
import Header from "@/components/Header";


const page = () => {
  
  return (
    <>
      <Header />
      <Auth/>
      <FooterComp />
    </>
  )
}

export default page