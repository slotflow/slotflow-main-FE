import About from "./About";
import Contact from "./Contact";
import AosAnimation from "@/components/common/AosAnimation";
import SectionOne from "@/components/common/landing/SectionOne";
import SectionPricing from "@/components/common/landing/SectionPricing";
import SectionReviews from "@/components/common/landing/SectionReviews";
import SectionFeatures from "@/components/common/landing/SectionFeatures";

const LandingPage = () => {

  return (
    <AosAnimation>
        <SectionOne />
        <SectionFeatures />
        <SectionPricing />
        <SectionReviews />
        <About />
        <Contact />
    </AosAnimation>
  )
}

export default LandingPage