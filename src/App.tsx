import type { FC } from "react";
import { Header } from "./components/Header.js";
import { HeroSection } from "./components/HeroSection.js";
import { ModelRoster } from "./components/ModelRoster.js";
import { RoutingPlaybooks } from "./components/RoutingPlaybooks.js";
import { Governance } from "./components/Governance.js";
import { Footer } from "./components/Footer.js";

export const App: FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
        <HeroSection />
        <ModelRoster />
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <RoutingPlaybooks />
          <Governance />
        </section>
      </main>
      <Footer />
    </div>
  );
};
