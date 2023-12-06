import WelcomeCard from "@/components/mainPages/landing/WelcomeCard";
import AboutAzLanding from "@/components/mainPages/landing/AboutAzLanding";

export default function Home() {
  return (
    <main className="text-primary-green-lg100 bg-secondary-red">
        <WelcomeCard />
        <AboutAzLanding />
    </main>
  )
}
