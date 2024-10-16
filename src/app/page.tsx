import WelcomeCard from "@/components/mainPages/landing/WelcomeCard";
import AboutAzLanding from "@/components/mainPages/landing/AboutAzLanding";
import OurResponsive from "@/components/mainPages/landing/OurResponsive";
import SuggestedCarouselProvider from "@/components/mainPages/landing/SuggestedCarouselProvider";
import ProductsListLanding from "@/components/mainPages/landing/ProductsListLanding";
import ServicesListLandingPage from "@/components/mainPages/landing/ServicesListLandingPage";
import HotDealsLandingPage from "@/components/mainPages/landing/HotDealsLandingPage";
import OnSaleLandingPage from "@/components/mainPages/landing/OnSaleLandingPage";
import PreInvoiceLanding from "@/components/mainPages/landing/PreInvoiceLanding";
import LooksOurBenefitsLanding from "@/components/mainPages/landing/LookOurBenefitslanding";
import CommentsLanding from "@/components/mainPages/landing/CommentsLanding";
import Header from "@/components/mainPages/Header";
import Footer from "@/components/mainPages/Footer";
import React , { Suspense }from "react";

export default function Home() {
  return (
      <Suspense fallback={<></>} >


                <main className="text-primary-green-lg100 bg-secondary-red overflow-x-hidden">
                    <Header theme={'white-black'}/>
                    <WelcomeCard />
                    <AboutAzLanding />
                    <OurResponsive />
                    <SuggestedCarouselProvider />
                    <ProductsListLanding />
                    <ServicesListLandingPage />
                    <HotDealsLandingPage />
                    <LooksOurBenefitsLanding />
                    <OnSaleLandingPage />
                    <PreInvoiceLanding />
                    <CommentsLanding />

                    <Footer />
                </main>
      </Suspense>
  )
}
