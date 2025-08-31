import SectionFeatures from "@/components/common/landing/SectionFeatures"
import SectionOne from "@/components/common/landing/SectionOne"
import SectionPricing from "@/components/common/landing/SectionPricing"
import SectionReviews from "@/components/common/landing/SectionReviews"
import Contact from "./Contact"
import About from "./About"

const LandingPage = () => {

  return (
    <>
      <SectionOne />
      <SectionFeatures />
      <SectionPricing />
      <SectionReviews />
      <About />
      <Contact />
    </>
  )
}

export default LandingPage