import { RulerBar } from "@/components/canvas/RulerBar";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { AboutBento } from "@/components/sections/AboutBento";
import { ApproachChat } from "@/components/sections/ApproachChat";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CursorTag } from "@/components/canvas/CursorTag";

export default function Home() {
  return (
    <>
      <RulerBar />
      <Nav />
      <Hero />
      <Work />
      <AboutBento />
      <ApproachChat />
      <Services />
      <Contact />
      <Footer />
      <CursorTag />
    </>
  );
}
