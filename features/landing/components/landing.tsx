
import { Features } from "./features";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { CTA } from "./cta";

export const Landing = () => {
  return (
    <div className="flex flex-col justify-items-center items-center space-y-0">
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </div>
  );
};
