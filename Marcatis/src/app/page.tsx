import { HeroUnifiedStable } from "@/components/industrial/HeroUnifiedStable";
import { SectionCapabilities } from "@/components/industrial/SectionCapabilities";
import { SectionContact } from "@/components/industrial/SectionContact";
import { SectionLeistungen } from "@/components/industrial/SectionLeistungen";

export default function HomePage() {
  return (
    <>
      <HeroUnifiedStable />
      <SectionLeistungen />
      <section id="capabilities" className="w-full border-t border-white/10">
        <SectionCapabilities />
      </section>
      <SectionContact />
    </>
  );
}
