import WelcomeCard from "@/components/mainPages/landing/WelcomeCard";
import AboutAzLanding from "@/components/mainPages/landing/AboutAzLanding";
import OurResponsive from "@/components/mainPages/landing/OurResponsive";

export default function Home() {
  return (
    <main className="text-primary-green-lg100 bg-secondary-red">
        <WelcomeCard />
        <AboutAzLanding />
        <OurResponsive />
    </main>
  )
}
