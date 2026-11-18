import { Hero } from "../components/Hero";
import { Philosophy } from "../components/Philosophy";
import { About } from "../components/About";
import { Classes } from "../components/Classes";
import { HumanCircle } from "../components/HumanCircle";
import { RetreatBanner } from "../components/RetreatBanner";
import { Testimonials } from "../components/Testimonials";
import { ReviewWidgets } from "../components/ReviewWidgets";
import { InstagramGallery } from "../components/InstagramGallery";
import { FAQ } from "../components/FAQ";
import { Newsletter } from "../components/Newsletter";

export function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <About />
      <Classes />
      <HumanCircle />
      <RetreatBanner />
      {/* <Testimonials />
      <ReviewWidgets />
      <InstagramGallery /> */}
      <FAQ />
      <Newsletter />
    </>
  );
}