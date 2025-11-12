import { HeroSection } from "@/components/landingpage/hero-section-1";
import { Cta4 } from "@/components/cta";
import Navbar from "@/components/landingpage/navbar";
import Footer from "@/components/landingpage/footer";
import { SectionMockupDemoPage } from "@/components/feature";
import { Features } from "@/components/ui/features";
import { faqItems } from "@/contants/index"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function Home() {
  return (
    <div>

      <Navbar />
      <HeroSection />
      <div className="flex bg-white dark:bg-black flex-col overflow-hidden pb-12 sm:pb-16 pt-16 sm:pt-20 md:pt-32">
        <SectionMockupDemoPage />
        <Features />
      </div>
      <section className="w-full py-20 sm:py-24 bg-black border-t border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about getting started with Bloggify
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline sm:text-lg font-semibold py-6 text-foreground hover:text-primary transition-colors duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Cta4 />
      <Footer />
    </div>
  );
}
